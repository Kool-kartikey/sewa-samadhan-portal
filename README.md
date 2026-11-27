# 🏛️ S.A.M.A.D.H.A.N — 24/7 Grievance Redressal & Institutional Accountability Portal
### A Project S.E.W.A. Initiative • University of Delhi South Campus (UDSC)

> **Full Form:** **S.A.M.A.D.H.A.N** — *Student Advocacy, Monitoring, Analytics and Digital Heeding of All Needs*  
> **Root Initiative:** **A Project S.E.W.A. Initiative** (*Systematically Eliminating Worrisome Anomalies*)  
> **Portal Release:** `v5.7.1`  
> **Statutory Framework:** Digital Personal Data Protection (DPDP) Act, 2023 (India) & UGC (Grievance Redressal of Students) Regulations, 2023  
> **Quality Standard:** ISO 10002:2018 (Complaints Handling in Organizations)

<p align="center">
  <img src="https://img.shields.io/badge/Initiative-Project%20S.E.W.A.-d97706?style=for-the-badge&logo=shield&logoColor=white" alt="A Project S.E.W.A. Initiative" />
  <img src="https://img.shields.io/badge/Compliance-DPDP%20Act%202023-10b981?style=for-the-badge" alt="DPDP Act 2023 Compliant" />
  <img src="https://img.shields.io/badge/Standard-ISO%2010002%3A2018-3b82f6?style=for-the-badge" alt="ISO 10002:2018" />
  <img src="https://img.shields.io/badge/Cost-100%25%20Free%20Tier%20(Spark)-0f172a?style=for-the-badge" alt="Zero Cloud Cost" />
</p>

---

## 1. Production Deployment Endpoints

* Student Grievance Portal and Public Telemetry: https://udsc-samadhan-portal.web.app
* Executive Admin Cockpit: https://udsc-samadhan-portal.web.app/admin
* Public Transparency Ledger: https://docs.google.com/spreadsheets/d/1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM/preview

> **Firebase Auth Domain Requirement:** Because `udsc-samadhan-portal.web.app` is a secondary Firebase Hosting site under project `udsc-samadhan-2026`, `udsc-samadhan-portal.web.app` must be listed under **Firebase Console ➔ Authentication ➔ Settings ➔ Authorized domains** (with the Google provider enabled) for executive Google OAuth sign-in.

---

## 2. Technical Credits and Contributors

* Kartikey Tiwari (Lead System Architect)
  Vice-President, SDC Students' Union 2026/27 (M.Sc. Informatics, 1st Semester, Institute of Informatics and Communication, University of Delhi South Campus)
  Designed core full-stack portal architecture, DPDP Act 2023 statutory consent workflows, cryptographic tracking tokens, dual-executive RBAC safeguards, and the Google Sheets bidirectional sync engine.

* **Shraddha Choudhary** (*AI/Ollama Triage Concept & Admin Opt-In Specification*)
  Central Councilor, SDC Students' Union 2026/27 (M.Sc. Informatics, Institute of Informatics and Communication (IIC), University of Delhi South Campus)
  Designed the local Ollama triage concept (`ollama-assist.js`) to keep analysis on local infrastructure. **Audit Status Clarification:** At initial baseline audit, zero live Ollama code existed (`NOT IMPLEMENTED`); during security remediation, a safe **Admin-Only, Opt-In, Disabled-by-Default Advisory Module (`ollama-assist.js`)** was added with PII stripping, prompt-injection delimiters, strict JSON allowlist validation, and deterministic unreachable fallback (`IMPLEMENTED AND TESTED` via local mock assertions; live local Ollama daemon execution is `IMPLEMENTED BUT NOT RUNTIME-VERIFIED`). Because browsers enforce HTTPS-to-HTTP mixed-content blocks and `localhost` isolation, a deployed HTTPS web portal (`udsc-samadhan-portal.web.app`) cannot silently treat `http://127.0.0.1:11434` as a shared multi-user cloud backend.

* UDSC Students' Union Executive Committee (2026/27)
  Institutional oversight, administrative validation, and liaison with University of Delhi South Campus departments and hostel administrations.

---

## 3. Executive Overview

S.A.M.A.D.H.A.N was built to resolve long-standing operational issues in university complaint systems:
* Frictionless Filing & Draft Recovery: Three-step intake wizard available in English and Hindi without complex captchas or arbitrary text limits, backed by local draft auto-save so progress survives accidental refreshes.
* Modern Civic Interface (`v5.7.1`): Crisp hairline light/dark surface system (`styles.css`), monochrome inline SVG icon system (`app.js`), mobile hardware back-button SPA history integration, and tightened institutional copy.
* End-to-End Tracking: Unique alphanumeric tracking tokens (format: `UDSC-2026-[CATEGORY]-[ID]`) linked to a 5-stage milestone timeline and Official Union Action Notes.
* Privacy by Design: Whistleblower protection mode strips names, contact details, and IP data from student submissions.
* DPDP Act 2023 Compliance: Section 6 affirmative consent check, Section 12 Right to Erasure handling, and automatic post-resolution data scrubbing.
* Dual-Executive RBAC Cockpit (`/admin`): Role-scoped workspace separating day-to-day Union grievance review, status updates, official action notes, CSV export, and public sheet access for the Students' Union President from protected root architectural controls (`isProtectedRoot`) reserved for the Vice-President & Lead System Architect.
* Local Ollama Intelligence: On-premise text analysis through Ollama APIs, keeping student inputs private and isolated from third-party model providers.
* Cloud Isolation: Hosted on a dedicated Google Cloud project (`udsc-samadhan-2026`) with independent Firestore rules (`firestore.samadhan.rules`), avoiding quota competition or downtime from other campus utilities.

---

## 4. Hardened Architecture, Privacy Boundary & Verification Status

* **Public Transparency Ledger Boundary (`IMPLEMENTED AND TESTED` in code/GS):** The view-only Google Sheet (`google-sheets-sync.gs`) excludes complainant identifiers (`studentName`, `studentEmail`, `studentPhone`) and confidential raw testimonies (`[CONFIDENTIAL_TESTIMONY_WITHHELD_PUBLICLY]`), while enforcing duplicate `trackToken` rejection and strict status transitions (`VALID_TRANSITIONS`). *(Note: Existing live Google Apps Script deployments must be manually updated with the latest `google-sheets-sync.gs` and historical sheet rows audited before production reliance.)*
* **Firestore Security Rules (`IMPLEMENTED AND TESTED` on local emulator):** `firestore.samadhan.rules` blocks public/student reads of `/grievances`, removes unauthenticated `communicationThread` / withdrawal updates, enforces DPDP consent & anonymous null-PII checks, and isolates `/admin_roles` reads to Admins or the doc owner. Currently `app.js` / `admin.js` operate against Google Sheets + Firebase Auth rather than reading `/grievances` directly from Firestore.
* **Admin Authentication & Cryptography (`IMPLEMENTED AND TESTED`):** Firebase Google OAuth issues verified ID Tokens for Google Sheet mutations (`verifyAdminIdToken`); optional local workstation quick-unlock passkeys use salted PBKDF2-HMAC-SHA256 (`100,000` iterations) flagged as local read-only sessions; CSV exports use `Blob` URLs (`exportGrievancesCSV`); `enforceDataRetentionPolicy()` purges resolved/withdrawn local cases after 30 days.
* **Local Ollama Advisory (`ollama-assist.js`, `admin.html` only):** Opt-in, disabled by default (`IMPLEMENTED AND TESTED` with mock fetch; live Ollama runtime `IMPLEMENTED BUT NOT RUNTIME-VERIFIED`), strips PII before inference, enforces `<UNTRUSTED_STUDENT_SUBMISSION>` delimiters, validates strict allowlisted JSON schemas, requires human confirmation, and never auto-modifies statuses.
* **Automated Verification:** `node test-suite.js` (`30 / 30 TESTS PASSED`) plus emulator verification via `SEWA Canteen` `vitest.rules.config.js` (`samadhan.rules.test.js`).

---

## 7. Running Locally

To run the application locally:

```powershell
node server.js 3000
```

Open http://127.0.0.1:3000 in your browser to access:
1. Registration Wizard: Test student submissions in standard and anonymous whistleblower modes.
2. Status Tracker: Enter tracking tokens (for example, UDSC-2026-HOSTEL-421) to view lifecycle timelines.
3. Executive Cockpit: Open /admin to test administrative triage and ledger synchronization.
4. Campus Insights: View departmental resolution metrics and public statistics.
