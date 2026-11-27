/**
 * PRATIBADDHA (प्रतिबद्ध) — Grounded UDSC Civic Assistant ("Hallucination Killer")
 * A Project S.E.W.A. Initiative • UDSC Students' Union, University of Delhi
 *
 * Three-Layer Deterministic & Grounded Retrieval Architecture:
 *   Layer 1: Live Grievance Token Lookup (Transparency Ledger) + Portal Feedback Intake
 *   Layer 2: Pre-RAG Verified Fact Guardrails (UDSC Director, SDC Students' Union 2026/27, IIC, DPDP)
 *   Layer 3: Client-Side BM25 Lexical Retrieval over curated UDSC / .south.du.ac.in corpus
 *            with strict anti-hallucination abstention threshold (never guesses unverified facts).
 */
(function (rootScope) {
  'use strict';

  const KB_VERSION = '1.1.0';
  const BM25_THRESHOLD = 2.2;

  const STOPWORDS = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do', 'does', 'for',
    'from', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'our',
    'please', 'tell', 'that', 'the', 'their', 'this', 'to', 'us', 'was', 'what',
    'when', 'where', 'which', 'who', 'whom', 'why', 'will', 'with', 'you', 'your',
    'kaun', 'kya', 'hai', 'hain', 'ka', 'ki', 'ke', 'ko', 'mein', 'par', 'se'
  ]);

  const VERIFIED_FACTS = {
    director_udsc: {
      keywords: ['director', 'joint director', 'rajni', 'abbi', 'dir_udsc', 'udsc head', 'south campus head', 'निदेशक'],
      en: {
        title: 'Directorate of South Delhi Campus (UDSC)',
        body: [
          '• **Director, South Delhi Campus:** Prof. Rajni Abbi',
          '• **Joint Director, South Delhi Campus:** Prof. Sanjeev Singh',
          '• **Official Email:** dir_udsc@du.ac.in',
          '• **South Campus Office Tel:** +91-11-24116427, +91-11-24113045 (Extn. 7114)',
          '• **North Campus Office Tel:** +91-11-27662865 (Extn. 1217)',
          '• **Office:** University of Delhi South Campus, Benito Juarez Road, New Delhi – 110021'
        ].join('\n'),
        sourceLabel: 'DU Official Directory — Director South Campus',
        sourceUrl: 'https://www.du.ac.in/index.php?page=director-south-campus'
      },
      hi: {
        title: 'दक्षिण दिल्ली परिसर (UDSC) निदेशालय',
        body: [
          '• **निदेशक (Director), दक्षिण दिल्ली परिसर:** प्रो. रजनी अब्बी (Prof. Rajni Abbi)',
          '• **संयुक्त निदेशक (Joint Director):** प्रो. संजीव सिंह (Prof. Sanjeev Singh)',
          '• **आधिकारिक ईमेल:** dir_udsc@du.ac.in',
          '• **दक्षिण परिसर कार्यालय फ़ोन:** +91-11-24116427, +91-11-24113045 (एक्सटेंशन 7114)',
          '• **मुख्य परिसर फ़ोन:** +91-11-27662865 (एक्सटेंशन 1217)',
          '• **पता:** दिल्ली विश्वविद्यालय दक्षिण परिसर, बेनिटो जुआरेज़ मार्ग, नई दिल्ली – 110021'
        ].join('\n'),
        sourceLabel: 'दिल्ली विश्वविद्यालय आधिकारिक पृष्ठ — निदेशक दक्षिण परिसर',
        sourceUrl: 'https://www.du.ac.in/index.php?page=director-south-campus'
      }
    },
    union_2026_27: {
      keywords: [
        'president', 'vice president', 'vice-president', 'secretary', 'joint secretary',
        'councilor', 'councillor', 'union', 'sdscsu', 'udscsu', 'office bearer',
        'rawal', 'kartikey', 'ujjwal', 'babulal', 'anuj', 'shraddha', '2026/27', '2026-27',
        'अध्यक्ष', 'उपाध्यक्ष', 'सचिव', 'संयुक्त सचिव', 'छात्र संघ', 'परिषद'
      ],
      en: {
        title: "South Delhi Campus Students' Union (2026/27)",
        body: [
          '• **President:** Rawal Singh',
          '• **Vice-President (& Lead System Architect, S.A.M.A.D.H.A.N):** Kartikey Tiwari',
          '• **Secretary:** Ujjwal Yadav',
          '• **Joint Secretary:** Babulal Saran',
          '• **Central Councilors:** Anuj Kumar & Shraddha Choudhary',
          '• **Official Union Email:** studentsunion@south.du.ac.in'
        ].join('\n'),
        sourceLabel: 'S.A.M.A.D.H.A.N Official Union Directory (2026/27)',
        sourceUrl: 'https://udsc-samadhan-portal.web.app/#register'
      },
      hi: {
        title: 'दक्षिण दिल्ली परिसर छात्र संघ कार्यकारिणी (2026/27)',
        body: [
          '• **अध्यक्ष (President):** रावल सिंह (Rawal Singh)',
          '• **उपाध्यक्ष (Vice-President एवं मुख्य प्रणाली वास्तुकार):** कार्तिकेय तिवारी (Kartikey Tiwari)',
          '• **सचिव (Secretary):** उज्ज्वल यादव (Ujjwal Yadav)',
          '• **संयुक्त सचिव (Joint Secretary):** बाबूलाल सारण (Babulal Saran)',
          '• **केंद्रीय परिषद सदस्य (Central Councilors):** अनुज कुमार एवं श्रद्धा चौधरी',
          '• **आधिकारिक ईमेल:** studentsunion@south.du.ac.in'
        ].join('\n'),
        sourceLabel: 'समाधान आधिकारिक छात्र संघ विवरण (2026/27)',
        sourceUrl: 'https://udsc-samadhan-portal.web.app/#register'
      }
    },
    du_leadership: {
      keywords: ['vice chancellor', 'vice-chancellor', 'yogesh singh', 'registrar', 'vikas gupta', 'proctor', 'कुलपति', 'कुलसचिव', 'प्रॉक्टर'],
      en: {
        title: 'University of Delhi Statutory Leadership',
        body: [
          '• **Vice-Chancellor:** Prof. Yogesh Singh',
          '• **Registrar:** Dr. Vikas Gupta (registrar@du.ac.in | 011-27667853 Ext. 1116)',
          '• **Proctor:** Prof. Manoj Kumar Singh (proctor@du.ac.in)',
          '• **Proctorial Board (South Campus):** Dr. Koteswara Rao Peta (krao@south.du.ac.in)'
        ].join('\n'),
        sourceLabel: 'University of Delhi Official Administration Directory',
        sourceUrl: 'https://www.du.ac.in/index.php?page=proctor'
      },
      hi: {
        title: 'दिल्ली विश्वविद्यालय प्रमुख पदाधिकारी',
        body: [
          '• **कुलपति (Vice-Chancellor):** प्रो. योगेश सिंह',
          '• **कुलसचिव (Registrar):** डॉ. विकास गुप्ता (registrar@du.ac.in | 011-27667853)',
          '• **प्रॉक्टर (Proctor):** प्रो. मनोज कुमार सिंह (proctor@du.ac.in)',
          '• **दक्षिण परिसर प्रॉक्टोरियल प्रतिनिधि:** डॉ. कोटेश्वर राव पेटा (krao@south.du.ac.in)'
        ].join('\n'),
        sourceLabel: 'दिल्ली विश्वविद्यालय आधिकारिक प्रशासनिक निर्देशिका',
        sourceUrl: 'https://www.du.ac.in/index.php?page=proctor'
      }
    },
    iic_udsc: {
      keywords: ['iic', 'informatics', 'cypsi', 'iicoffice', 'msc informatics', 'इन्फॉर्मेटिक्स'],
      en: {
        title: 'Institute of Informatics & Communication (IIC), UDSC',
        body: [
          '• **Head of Department:** Prof. Sanjeev Singh',
          '• **Established:** 1997 (University of Delhi South Campus, Benito Juarez Road, New Delhi – 110021)',
          '• **Programmes:** M.Sc. (Informatics) & Ph.D.',
          '• **Contact:** iicoffice@south.du.ac.in | Tel: 011-24157397 (9 am – 5 pm)',
          '• **Committees:** Anti-Ragging, Sexual Harassment / ICC, Student Grievance, Anti-Smoking & Caste Discrimination committees'
        ].join('\n'),
        sourceLabel: 'Official IIC Portal (iic.du.ac.in / iic.ac.in)',
        sourceUrl: 'https://iic.du.ac.in/'
      },
      hi: {
        title: 'इन्फॉर्मेटिक्स एवं संचार संस्थान (IIC), दक्षिण परिसर',
        body: [
          '• **विभागाध्यक्ष (HOD):** प्रो. संजीव सिंह',
          '• **स्थापना:** 1997 (बेनिटो जुआरेज़ मार्ग, दक्षिण दिल्ली परिसर, नई दिल्ली – 110021)',
          '• **पाठ्यक्रम:** M.Sc. (Informatics) एवं Ph.D.',
          '• **संपर्क:** iicoffice@south.du.ac.in | फ़ोन: 011-24157397 (सुबह 9 से शाम 5 बजे)',
          '• **समितियां:** एंटी-रैगिंग, आंतरिक शिकायत (ICC), छात्र शिकायत एवं भेदभाव निवारण समितियां'
        ].join('\n'),
        sourceLabel: 'आधिकारिक IIC पोर्टल (iic.du.ac.in)',
        sourceUrl: 'https://iic.du.ac.in/'
      }
    },
    campus_hostels: {
      keywords: ['south campus', 'benito juarez', 'metro', 'durgabai', 'hostel', 'geetanjali', 'saramati', 'aravalli', 'health centre', 'छात्रावास', 'मेडिकल', 'मेट्रो'],
      en: {
        title: 'South Delhi Campus Overview, Transit & Hostels',
        body: [
          '• **Campus:** Started in 1973; moved to its 69-acre (28 hectare) campus at Benito Juarez Marg, near Dhaula Kuan in 1984.',
          '• **Nearest Metro:** Durgabai Deshmukh South Campus (Pink Line).',
          '• **Hostels on South Campus:** Geetanjali Hostel (Women), Saramati Hostel (Men), and Aravalli P.G. Men’s Hostel.',
          '• **Key Facilities:** South Campus Central Library, Health Centre, Bank, Post Office & DTC Pass Section.'
        ].join('\n'),
        sourceLabel: 'DU Official South Campus Profile',
        sourceUrl: 'https://www.du.ac.in/index.php?page=south-campus'
      },
      hi: {
        title: 'दक्षिण दिल्ली परिसर, मेट्रो व छात्रावास जानकारी',
        body: [
          '• **स्थापना व परिसर:** 1973 में प्रारंभ; 1984 में बेनिटो जुआरेज़ मार्ग (धौला कुआँ के पास, 69 एकड़ परिसर) में स्थानांतरित।',
          '• **निकटतम मेट्रो:** दुर्गाबाई देशमुख साउथ कैंपस (पिंक लाइन)।',
          '• **प्रमुख छात्रावास:** गीतांजलि छात्रावास (महिला), सारामती छात्रावास (पुरुष) एवं अरावली पी.जी. पुरुष छात्रावास।',
          '• **सुविधाएं:** केंद्रीय पुस्तकालय, स्वास्थ्य केंद्र, बैंक, डाकघर एवं DTC पास अनुभाग।'
        ].join('\n'),
        sourceLabel: 'दिल्ली विश्वविद्यालय आधिकारिक दक्षिण परिसर पृष्ठ',
        sourceUrl: 'https://www.du.ac.in/index.php?page=south-campus'
      }
    },
    portal_guide: {
      keywords: ['how to file', 'lodge grievance', 'submit complaint', 'anonymous', 'dpdp', 'erasure', 'sla', 'timeline', 'कैसे दर्ज', 'शिकायत कैसे', 'गुमनाम', 'अधिकार'],
      en: {
        title: 'Filing & Privacy Guide (DPDP Act 2023)',
        body: [
          '• **3-Step Filing:** Pick Category ➔ Add Incident & Department details (toggle **Anonymous Mode** under DPDP Sec 8 if desired) ➔ Accept Sec 6 Consent.',
          '• **SLA Response Targets:** Critical/Safety = `24h` | High = `72h` | Standard = `7 Days`.',
          '• **Section 12 Erasure:** You can withdraw and scrub your local identifiers anytime from the **Track** tab.'
        ].join('\n'),
        sourceLabel: 'S.A.M.A.D.H.A.N DPDP Framework',
        sourceUrl: 'https://udsc-samadhan-portal.web.app/#dpdp'
      },
      hi: {
        title: 'शिकायत दर्ज करने व DPDP गोपनीयता दिशानिर्देश',
        body: [
          '• **3-चरणीय प्रक्रिया:** श्रेणी चुनें ➔ घटना व विभाग लिखें (गोपनीय रहने के लिए **गुमनाम मोड** चालू करें) ➔ धारा 6 सहमति देकर सबमिट करें।',
          '• **समाधान समय-सीमा (SLA):** आपात/सुरक्षा = `24 घंटे` | उच्च = `72 घंटे` | सामान्य = `7 दिन`।',
          '• **धारा 12 डेटा मिटाना:** आप ट्रैकर टैब से कभी भी अपनी स्थानीय पहचान हटा सकते हैं।'
        ].join('\n'),
        sourceLabel: 'समाधान DPDP अधिनियम 2023 रूपरेखा',
        sourceUrl: 'https://udsc-samadhan-portal.web.app/#dpdp'
      }
    }
  };

  function tokenize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
      .split(/\s+/)
      .filter(tok => tok.length >= 2 && !STOPWORDS.has(tok));
  }

  function buildBm25Index(chunks) {
    const docs = Array.isArray(chunks) ? chunks : [];
    const df = Object.create(null);
    const docTokens = [];
    let totalLen = 0;

    for (let i = 0; i < docs.length; i++) {
      const combined = `${docs[i].title || ''} ${docs[i].text || ''}`;
      const toks = tokenize(combined);
      docTokens.push(toks);
      totalLen += toks.length;
      const unique = new Set(toks);
      unique.forEach(t => {
        df[t] = (df[t] || 0) + 1;
      });
    }

    return {
      docs,
      docTokens,
      df,
      avgDl: docs.length > 0 ? totalLen / docs.length : 1,
      n: docs.length
    };
  }

  function searchBm25(index, query, topK = 2) {
    if (!index || !index.n) return [];
    const qTokens = tokenize(query);
    if (!qTokens.length) return [];

    const k1 = 1.5;
    const b = 0.75;
    const results = [];

    for (let i = 0; i < index.n; i++) {
      const dToks = index.docTokens[i];
      const dl = dToks.length || 1;
      const tfMap = Object.create(null);
      for (let j = 0; j < dToks.length; j++) {
        tfMap[dToks[j]] = (tfMap[dToks[j]] || 0) + 1;
      }

      let score = 0;
      let matchedTerms = 0;
      const seenQuery = new Set();

      for (let q = 0; q < qTokens.length; q++) {
        const term = qTokens[q];
        if (seenQuery.has(term)) continue;
        seenQuery.add(term);

        const tf = tfMap[term] || 0;
        if (!tf) continue;
        matchedTerms++;

        const docFreq = index.df[term] || 0;
        const idf = Math.log((index.n - docFreq + 0.5) / (docFreq + 0.5) + 1);
        const tfNorm = (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (dl / index.avgDl)));
        score += idf * tfNorm;
      }

      const uniqueQueryCount = seenQuery.size || 1;
      const coverage = matchedTerms / uniqueQueryCount;
      const passesGate = uniqueQueryCount >= 2
        ? (matchedTerms >= 2 && coverage >= 0.4 && score >= 4.5)
        : (matchedTerms === 1 && score >= 4.0);

      if (passesGate) {
        results.push({ doc: index.docs[i], score, matchedTerms, coverage });
      }
    }

    results.sort((aRes, bRes) => bRes.score - aRes.score);
    return results.slice(0, topK);
  }

  function detectTrackingToken(query) {
    const m = String(query || '').toUpperCase().match(/\bUDSC-2026-[A-Z]{2,12}-(?:[0-9]{3}|[0-9A-Z]{4,10})\b/);
    return m ? m[0] : null;
  }

  function matchStaticFact(query, lang) {
    const qLower = String(query || '').toLowerCase();
    const safeLang = lang === 'hi' ? 'hi' : 'en';

    if (/\b(hello|hi|hey|namaste|pranam|नमस्ते|प्रणाम|good morning|good evening)\b/i.test(qLower) && qLower.length < 40) {
      return {
        grounded: true,
        sourceType: 'GREETING',
        title: safeLang === 'hi' ? 'नमस्ते! मैं प्रतिबद्ध हूँ' : 'Namaste! I am Pratibaddha',
        text: safeLang === 'hi'
          ? 'मैं UDSC छात्र संघ (समाधान पोर्टल) का सत्यापित सहायक हूँ। आप मुझसे:\n• किसी **शिकायत का स्टेटस / अपडेट** (`UDSC-2026-...` टोकन भेजकर)\n• **दक्षिण परिसर निदेशक / छात्र संघ 2026/27** व विभाग की जानकारी\n• पोर्टल के लिए **UI/UX प्रतिक्रिया या सुझाव** साझा कर सकते हैं।'
          : 'I am the grounded UDSC Students\' Union assistant on S.A.M.A.D.H.A.N. Ask me about:\n• **Grievance updates / status** (paste your `UDSC-2026-...` token)\n• **Director of South Delhi Campus** & **SDC Students\' Union 2026/27** office bearers\n• Campus departments / IIC / hostels, or **submit portal UI/UX feedback**.',
        actions: [
          { type: 'prompt', label: safeLang === 'hi' ? 'निदेशक व छात्र संघ' : 'Director & Union 2026/27', value: 'Who is the Director of South Delhi Campus and Students Union 2026/27?' },
          { type: 'open_feedback', label: safeLang === 'hi' ? 'UI/UX प्रतिक्रिया दें' : 'Rate UI/UX (1–5)' }
        ]
      };
    }

    let bestKey = null;
    let bestHits = 0;
    const keys = Object.keys(VERIFIED_FACTS);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const kws = VERIFIED_FACTS[k].keywords;
      let hits = 0;
      for (let j = 0; j < kws.length; j++) {
        if (qLower.includes(kws[j])) {
          hits += kws[j].includes(' ') ? 2 : 1;
        }
      }
      if (hits > bestHits) {
        bestHits = hits;
        bestKey = k;
      }
    }

    if (bestKey && bestHits > 0) {
      const fact = VERIFIED_FACTS[bestKey][safeLang];
      return {
        grounded: true,
        sourceType: 'VERIFIED_FACT',
        factKey: bestKey,
        title: fact.title,
        text: fact.body,
        sourceLabel: fact.sourceLabel,
        sourceUrl: fact.sourceUrl
      };
    }
    return null;
  }

  function isFeedbackIntent(query) {
    const q = String(query || '').toLowerCase();
    return /\b(feedback|suggest|suggestion|feature|wishlist|rate|rating|ui|ux|review)\b/i.test(q) ||
      /(प्रतिक्रिया|सुझाव|रेटिंग|फ़ीडबैक|सुविधा)/.test(q);
  }

  function isGrievanceStatusIntent(query) {
    const q = String(query || '').toLowerCase();
    return /\b(status|track|tracker|update|updates|complaint|grievance|ticket|token)\b/i.test(q) ||
      /(स्थिति|स्टेटस|शिकायत|टोकन|अपडेट|कार्रवाई)/.test(q);
  }

  function formatGrievanceReply(grievance, lang) {
    const safeLang = lang === 'hi' ? 'hi' : 'en';
    if (!grievance) return null;
    const notes = grievance.notes && grievance.notes !== 'Pending Admin Review'
      ? grievance.notes
      : (safeLang === 'hi' ? 'शिकायत प्राप्त हुई है और समीक्षा के लिए लंबित है।' : 'Grievance recorded and awaiting committee review.');
    const privacyText = grievance.isAnonymous
      ? (safeLang === 'hi' ? 'गुमनाम (पहचान सुरक्षित)' : 'Anonymous (Identity Shielded)')
      : (safeLang === 'hi' ? 'सहमति सहित (गोपनीय)' : 'Consented (Protected)');

    return {
      grounded: true,
      sourceType: 'LIVE_LEDGER',
      title: `${grievance.trackToken} — ${grievance.status}`,
      text: safeLang === 'hi'
        ? `• **वर्तमान स्थिति:** ${grievance.status}\n• **विभाग:** ${grievance.department}\n• **गोपनीयता:** ${privacyText}\n• **नवीनतम छात्र संघ टिप्पणी:** ${notes}`
        : `• **Current Stage:** ${grievance.status}\n• **Department:** ${grievance.department}\n• **Privacy Shield:** ${privacyText}\n• **Official Union Action Notes:** ${notes}`,
      actions: [
        { type: 'track_token', label: safeLang === 'hi' ? 'पूर्ण टाइमलाइन खोलें' : 'Open Full Timeline', token: grievance.trackToken }
      ]
    };
  }

  function formatAbstentionReply(lang) {
    const safeLang = lang === 'hi' ? 'hi' : 'en';
    return {
      grounded: false,
      sourceType: 'ABSTAIN',
      title: safeLang === 'hi' ? 'सत्यापित जानकारी उपलब्ध नहीं' : 'Not Verified in UDSC Sources',
      text: safeLang === 'hi'
        ? 'गलत या अनुमानित जानकारी से बचने के लिए मैं केवल सत्यापित दक्षिण परिसर (UDSC / `.south.du.ac.in` / `du.ac.in`) और समाधान रिकॉर्ड से उत्तर देता हूँ। इस विषय पर सत्यापित उत्तर नहीं मिला।\n\n• **सहायता ईमेल:** studentsunion@south.du.ac.in / dir_udsc@du.ac.in\n• यदि यह पोर्टल सुधार सुझाव है, तो नीचे प्रतिक्रिया फॉर्म खोलें।'
        : 'To guarantee zero hallucinations, Pratibaddha answers strictly from verified South Delhi Campus (`du.ac.in` / `iic.du.ac.in` / `.south.du.ac.in`) records and your live grievance ledger. No verified match was found for this question.\n\n• **Official Contacts:** studentsunion@south.du.ac.in • dir_udsc@du.ac.in\n• Want to suggest a portal feature or report a bug? Open Feedback below.',
      actions: [
        { type: 'open_feedback', label: safeLang === 'hi' ? 'प्रतिक्रिया / सुझाव भेजें' : 'Submit Suggestion / Feedback' }
      ]
    };
  }

  function answerQuery(query, options) {
    const opts = options || {};
    const lang = opts.lang === 'hi' ? 'hi' : 'en';
    const trimmed = String(query || '').trim();
    if (!trimmed) {
      return formatAbstentionReply(lang);
    }

    // Layer 1A: Exact Grievance Token Detection
    const token = detectTrackingToken(trimmed);
    if (token) {
      if (typeof opts.lookupToken === 'function') {
        const record = opts.lookupToken(token);
        if (record) {
          return formatGrievanceReply(record, lang);
        }
      }
      return {
        grounded: false,
        sourceType: 'TOKEN_NOT_FOUND',
        tokenChecked: token,
        title: lang === 'hi' ? `टोकन ${token} नहीं मिला` : `Token ${token} Not Found`,
        text: lang === 'hi'
          ? `सार्वजनिक पारदर्शिता लेज़र में **${token}** नहीं मिला। कृपया टोकन जांचें या "ट्रैक" टैब में **Refresh Data** पर क्लिक करें।`
          : `No record matching **${token}** was found in the synced Transparency Ledger. Double-check the token or sync the tracker.`,
        actions: [
          { type: 'track_token', label: lang === 'hi' ? 'ट्रैकर टैब में खोजें' : 'Search in Tracker Tab', token }
        ]
      };
    }

    // Layer 2: Deterministic Verified Institutional Facts (Director, Union 2026/27, IIC, Campus, DPDP Guide)
    const staticHit = matchStaticFact(trimmed, lang);
    if (staticHit) {
      return staticHit;
    }

    // Layer 1B: Feedback / Suggestion Intent
    if (isFeedbackIntent(trimmed)) {
      return {
        grounded: true,
        sourceType: 'FEEDBACK_FLOW',
        title: lang === 'hi' ? 'पोर्टल प्रतिक्रिया व सुझाव (1–5 रेटिंग)' : 'Share Portal Feedback & Feature Ideas',
        text: lang === 'hi'
          ? 'आप नीचे दिए गए बटन से 1–5 UI/UX रेटिंग व नई सुविधा का सुझाव भेज सकते हैं — यह सीधे छात्र संघ के **Portal_Feedback** टैब में सुरक्षित रूप से दर्ज होगा।'
          : 'Tap the button below to submit your **1–5 UI & UX ratings**, interface observations, and feature requests directly to the Union\'s **Portal_Feedback** tab.',
        actions: [
          { type: 'open_feedback', label: lang === 'hi' ? '1–5 प्रतिक्रिया फॉर्म खोलें' : 'Open 1–5 Feedback Form' }
        ]
      };
    }

    // Layer 1C: General Grievance Status Prompt (without token)
    if (isGrievanceStatusIntent(trimmed)) {
      return {
        grounded: true,
        sourceType: 'STATUS_PROMPT',
        title: lang === 'hi' ? 'शिकायत स्थिति जांचें' : 'Check Live Grievance Status',
        text: lang === 'hi'
          ? 'कृपया अपना **ट्रैकिंग टोकन** (उदाहरण: `UDSC-2026-INFRA-482190`) यहीं चैट में भेजें, या नीचे बटन दबाकर ट्रैकर टैब खोलें।'
          : 'Paste your **Tracking Token** right here in chat (for example, `UDSC-2026-INFRA-482190`) and I will fetch the live status and Union Action Notes, or open the Tracker tab below.',
        actions: [
          { type: 'navigate', label: lang === 'hi' ? 'स्थिति ट्रैकर खोलें' : 'Go to Tracker Tab', tab: 'track' }
        ]
      };
    }

    // Layer 3: Grounded BM25 Retrieval over crawled UDSC corpus
    if (opts.bm25Index) {
      const hits = searchBm25(opts.bm25Index, trimmed, 2);
      if (hits.length > 0) {
        const top = hits[0].doc;
        const snippet = String(top.text || '').replace(/\n+/g, ' • ').slice(0, 520);
        return {
          grounded: true,
          sourceType: 'BM25_CORPUS',
          score: Number(hits[0].score.toFixed(2)),
          title: top.title || 'Verified UDSC Record',
          text: snippet + (top.text.length > 520 ? '...' : ''),
          sourceLabel: top.domain || 'Official UDSC Source',
          sourceUrl: top.url
        };
      }
    }

    return formatAbstentionReply(lang);
  }

  const exported = {
    KB_VERSION,
    BM25_THRESHOLD,
    VERIFIED_FACTS,
    tokenize,
    buildBm25Index,
    searchBm25,
    detectTrackingToken,
    matchStaticFact,
    answerQuery
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exported;
  }
  if (rootScope) {
    rootScope.PratibaddhaEngine = exported;
  }
})(typeof window !== 'undefined' ? window : globalThis);
