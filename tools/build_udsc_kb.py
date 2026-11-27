"""
S.A.M.A.D.H.A.N / Pratibaddha (प्रतिबद्ध) — Official UDSC & .south.du.ac.in Knowledge Corpus Builder
Crawls allowlisted UDSC & South Campus institutional URLs with strict domain & boilerplate filtering,
extracts clean readable sections, and generates:
  - pratibaddha-kb.json (compact BM25-ready static corpus served on Firebase Hosting)
  - tools/udsc_crawl_report.txt (human-verifiable audit dump)
"""

from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
import json
import os
import re
import time
import urllib.request

ALLOWED_HOSTS = {"du.ac.in", "www.du.ac.in", "iic.du.ac.in", "iic.ac.in", "www.iic.ac.in"}

SEED_URLS = [
    "https://www.du.ac.in/index.php?page=director-south-campus",
    "https://www.du.ac.in/index.php?page=south-campus",
    "https://www.du.ac.in/index.php?page=students-grievance-redressal",
    "https://www.du.ac.in/index.php?page=Hostels-at-University-of-Delhi",
    "https://www.du.ac.in/index.php?page=administration",
    "https://www.du.ac.in/index.php?page=vice-chancellor",
    "https://www.du.ac.in/index.php?page=registrar",
    "https://iic.du.ac.in/",
    "https://iic.ac.in/",
    "https://iic.ac.in/about/",
    "https://iic.ac.in/contact-us/",
    "https://iic.ac.in/msc-informatics/",
    "https://iic.ac.in/phd/",
    "https://iic.ac.in/anti-ragging-committee/",
    "https://iic.ac.in/sexual-harassment-committee/",
    "https://south.du.ac.in/",
]

DU_PAGE_ALLOWLIST = {
    "director-south-campus",
    "south-campus",
    "students-grievance-redressal",
    "hostels-at-university-of-delhi",
    "administration",
    "vice-chancellor",
    "registrar",
    "proctor",
    "internal-complaints-committee",
    "equal-opportunity-cell",
}

MAX_PAGES = 30
USER_AGENT = "Mozilla/5.0 (compatible; SEWA-Pratibaddha-Indexer/1.0; +https://udsc-samadhan-portal.web.app)"


class CleanHtmlParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self._skip_depth = 0
        self.title_parts = []
        self._in_title = False
        self.text_parts = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        tag_l = tag.lower()
        if tag_l in ("script", "style", "noscript", "svg", "iframe", "nav", "footer"):
            self._skip_depth += 1
            return
        if tag_l == "title":
            self._in_title = True
        if tag_l == "a":
            attr_map = dict(attrs)
            href = (attr_map.get("href") or "").strip()
            if href and not href.startswith(("#", "javascript:", "mailto:", "tel:")):
                self.links.append(href)
        if tag_l in ("p", "div", "li", "tr", "h1", "h2", "h3", "h4", "br", "td", "th", "section"):
            self.text_parts.append("\n")

    def handle_endtag(self, tag):
        tag_l = tag.lower()
        if tag_l in ("script", "style", "noscript", "svg", "iframe", "nav", "footer") and self._skip_depth > 0:
            self._skip_depth -= 1
        if tag_l == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._skip_depth > 0:
            return
        cleaned = re.sub(r"\s+", " ", data)
        if not cleaned.strip():
            return
        if "[email" in cleaned.lower() and "protected]" in cleaned.lower():
            return
        if self._in_title:
            self.title_parts.append(cleaned.strip())
        self.text_parts.append(cleaned)


def is_allowed_host(host: str) -> bool:
    h = (host or "").lower().split(":")[0]
    return h in ALLOWED_HOSTS or h == "south.du.ac.in" or h.endswith(".south.du.ac.in")


def is_udsc_relevant_url(url: str) -> bool:
    parsed = urlparse(url)
    host = (parsed.netloc or "").lower().split(":")[0]
    if not is_allowed_host(host):
        return False
    lower_u = url.lower()
    if any(lower_u.endswith(ext) for ext in (".pdf", ".jpg", ".jpeg", ".png", ".gif", ".zip", ".doc", ".docx", ".xls", ".xlsx")):
        return False
    if host.endswith("south.du.ac.in") or host in ("iic.ac.in", "www.iic.ac.in"):
        return True
    if host == "iic.du.ac.in":
        return parsed.path in ("", "/")
    if host in ("du.ac.in", "www.du.ac.in"):
        m = re.search(r"[?&]page=([^&]+)", lower_u)
        return bool(m and m.group(1) in DU_PAGE_ALLOWLIST)
    return False


def fetch_page(url: str, timeout: int = 18):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        final_url = resp.geturl()
        ctype = (resp.headers.get("Content-Type") or "").lower()
        if "text/html" not in ctype and "xhtml" not in ctype and ctype:
            return None
        raw = resp.read(2_500_000).decode("utf-8", errors="ignore")
        return final_url, raw


def extract_focused_text(raw_parts, domain: str):
    joined = "".join(raw_parts)
    if "du.ac.in" in domain and "iic.du.ac.in" not in domain:
        marker_idx = joined.find("You are here:")
        if marker_idx != -1:
            joined = joined[marker_idx:]
        for stop_marker in (
            "Want to know more about University of Delhi?",
            "Spotlight",
            "Advertisement No.",
            "Latest @ DU",
            "Upcoming Events",
            "© Copyrights - University of Delhi",
            "Notice Regarding Refund",
        ):
            s_idx = joined.find(stop_marker)
            if s_idx > 120:
                joined = joined[:s_idx]
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in joined.splitlines()]
    lines = [
        ln for ln in lines
        if len(ln) >= 3
        and "Share this" not in ln
        and "You are here:" not in ln
        and "View CollegesView Departments" not in ln
        and "[has_child]" not in ln
        and "[subitem]" not in ln
    ]
    deduped = []
    seen = set()
    for ln in lines:
        if ln in seen and len(ln) < 65:
            continue
        seen.add(ln)
        deduped.append(ln)
    return "\n".join(deduped)


def chunk_text(text: str, max_chars: int = 850, overlap: int = 100):
    if len(text) < 40:
        return []
    if len(text) <= max_chars:
        return [text]
    chunks = []
    start = 0
    while start < len(text):
        end = min(len(text), start + max_chars)
        if end < len(text):
            split_at = text.rfind(" ", start + int(max_chars * 0.65), end)
            if split_at > start:
                end = split_at
        piece = text[start:end].strip()
        if len(piece) >= 40:
            chunks.append(piece)
        if end >= len(text):
            break
        start = max(0, end - overlap)
    return chunks


def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    kb_path = os.path.join(root_dir, "pratibaddha-kb.json")
    report_path = os.path.join(root_dir, "tools", "udsc_crawl_report.txt")

    queue = list(SEED_URLS)
    visited = set()
    pages = []
    errors = []

    while queue and len(visited) < MAX_PAGES:
        url = queue.pop(0).split("#")[0]
        if url in visited or not is_udsc_relevant_url(url):
            continue
        visited.add(url)
        try:
            res = fetch_page(url)
            if not res:
                continue
            final_url, html = res
            domain = urlparse(final_url).netloc.lower()
            parser = CleanHtmlParser()
            parser.feed(html)
            title = " ".join(parser.title_parts).strip() or domain
            clean_txt = extract_focused_text(parser.text_parts, domain)
            if len(clean_txt) >= 80:
                pages.append({
                    "url": final_url,
                    "domain": domain,
                    "title": title,
                    "text": clean_txt,
                })
            for href in parser.links:
                abs_url = urljoin(final_url, href).split("#")[0]
                if abs_url not in visited and is_udsc_relevant_url(abs_url):
                    queue.append(abs_url)
        except Exception as exc:
            errors.append(f"{url} -> {exc}")

    chunks = []
    for p_idx, page in enumerate(pages):
        for c_idx, piece in enumerate(chunk_text(page["text"])):
            chunks.append({
                "id": f"udsc-{p_idx+1}-{c_idx+1}",
                "title": page["title"][:160],
                "url": page["url"],
                "domain": page["domain"],
                "text": piece,
            })

    kb_payload = {
        "schemaVersion": "1.1.0",
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "scope": ["*.south.du.ac.in", "du.ac.in (UDSC & Admin Pages)", "iic.du.ac.in", "iic.ac.in"],
        "pageCount": len(pages),
        "chunkCount": len(chunks),
        "chunks": chunks,
    }
    with open(kb_path, "w", encoding="utf-8") as f:
        json.dump(kb_payload, f, ensure_ascii=False, indent=2)

    with open(report_path, "w", encoding="utf-8") as f:
        f.write(f"CLEAN CRAWL REPORT ({kb_payload['generatedAt']})\n")
        f.write(f"Pages scraped: {len(pages)}, Chunks built: {len(chunks)}, Errors: {len(errors)}\n\n")
        for err in errors:
            f.write(f"ERROR: {err}\n")
        for p in pages:
            f.write(f"\n[{p['domain']}] {p['title']} -> {p['url']} ({len(p['text'])} chars)\n")
            f.write("  PREVIEW: " + p["text"][:320].replace("\n", " | ") + "\n")

    print(f"CLEAN DONE: pages={len(pages)}, chunks={len(chunks)}, errors={len(errors)}")


if __name__ == "__main__":
    main()
