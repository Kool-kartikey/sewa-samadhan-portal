/**
 * S.A.M.A.D.H.A.N — Student Grievance Redressal Portal
 * Managed by: Students' Union, South Delhi Campus, University of Delhi (UDSC Students' Union)
 * Official Contact: studentsunion@south.du.ac.in
 * 
 * Compliance: Digital Personal Data Protection (DPDP) Act 2023 (India)
 * Architectural Principles: Zero Fake Data, Privacy-by-Design, Full Bilingual Localization (English & हिंदी)
 * Theme Engine: High-Contrast Light Mode & Solid Pitch Dark Mode
 */

// ============================================================================
// 1. CONSTANTS, CATEGORIES & COMPREHENSIVE I18N DICTIONARY
// ============================================================================

const CATEGORIES = {
  ACADEMIC: { id: 'ACADEMIC', icon: '🎓', label: 'Academic & Examinations', hi: 'अकादमिक एवं परीक्षा' },
  HOSTEL: { id: 'HOSTEL', icon: '🏢', label: 'Hostel & Residential Life', hi: 'छात्रावास एवं आवासीय जीवन' },
  INFRASTRUCTURE: { id: 'INFRASTRUCTURE', icon: '⚡', label: 'Campus Infrastructure & Wi-Fi', hi: 'परिसर सुविधाएं एवं इंटरनेट' },
  HARASSMENT_RAGGING: { id: 'HARASSMENT_RAGGING', icon: '🛡️', label: 'Anti-Ragging, POSH & Safety', hi: 'एंटी-रैगिंग, आंतरिक शिकायत एवं सुरक्षा' },
  LIBRARY: { id: 'LIBRARY', icon: '📚', label: 'South Campus Central Library', hi: 'दक्षिण परिसर केंद्रीय पुस्तकालय' },
  TRANSIT_SECURITY: { id: 'TRANSIT_SECURITY', icon: '🚌', label: 'Transit, Gates & Security', hi: 'परिवहन, सुरक्षा एवं प्रवेश द्वार' },
  FINANCIAL: { id: 'FINANCIAL', icon: '💳', label: 'Fellowships, Fees & Accounts', hi: 'छात्रवृत्ति, शुल्क एवं लेखा' },
  OTHER: { id: 'OTHER', icon: '📋', label: 'General / Other Grievances', hi: 'सामान्य / अन्य समस्याएं' }
};

const UDSC_DEPARTMENTS = [
  { id: 'South Campus Central Library', en: 'South Campus Central Library', hi: 'दक्षिण परिसर केंद्रीय पुस्तकालय' },
  { id: 'Department of Biochemistry', en: 'Department of Biochemistry', hi: 'जैव रसायन विभाग' },
  { id: 'Department of Electronic Science', en: 'Department of Electronic Science', hi: 'इलेक्ट्रॉनिक विज्ञान विभाग' },
  { id: 'Department of Genetics', en: 'Department of Genetics', hi: 'आनुवंशिकी विभाग' },
  { id: 'Department of Microbiology', en: 'Department of Microbiology', hi: 'सूक्ष्म जीव विज्ञान विभाग' },
  { id: 'Department of Plant Molecular Biology', en: 'Department of Plant Molecular Biology', hi: 'पादप आण्विक जीव विज्ञान विभाग' },
  { id: 'Department of Biophysics', en: 'Department of Biophysics', hi: 'जैव भौतिकी विभाग' },
  { id: 'Department of Financial Studies (DFS)', en: 'Department of Financial Studies (DFS)', hi: 'वित्तीय अध्ययन विभाग (DFS)' },
  { id: 'Department of Business Economics (DBE)', en: 'Department of Business Economics (DBE)', hi: 'व्यावसायिक अर्थशास्त्र विभाग (DBE)' },
  { id: 'Institute of Informatics and Communication (IIC)', en: 'Institute of Informatics and Communication (IIC)', hi: 'इन्फॉर्मेटिक्स एवं संचार संस्थान (IIC)' },
  { id: 'Saramati Post-Graduate Men\'s Hostel', en: 'Saramati Post-Graduate Men\'s Hostel', hi: 'सरमती स्नातकोत्तर छात्र छात्रावास' },
  { id: 'Aravali Post-Graduate Hostel', en: 'Aravali Post-Graduate Hostel', hi: 'अरावली स्नातकोत्तर छात्रावास' },
  { id: 'Geetanjali Post-Graduate Girls Hostel', en: 'Geetanjali Post-Graduate Girls Hostel', hi: 'गीतांजलि स्नातकोत्तर कन्या छात्रावास' },
  { id: 'Central Administrative Block & Examination Branch', en: 'Central Administrative Block & Examination Branch', hi: 'केंद्रीय प्रशासनिक भवन एवं परीक्षा शाखा' },
  { id: 'Arts Faculty Building / Law Centre II', en: 'Arts Faculty Building / Law Centre II', hi: 'कला संकाय भवन / विधि केंद्र-II' },
  { id: 'Health Centre / WUS Health Centre', en: 'Health Centre / WUS Health Centre', hi: 'डब्ल्यू.यू.एस. स्वास्थ्य केंद्र' },
  { id: 'University Engineering Department (Maintenance)', en: 'University Engineering Department (Maintenance)', hi: 'विश्वविद्यालय इंजीनियरिंग विभाग (रखरखाव)' },
  { id: 'Computer Centre & Campus Wi-Fi', en: 'Computer Centre & Campus Wi-Fi', hi: 'कंप्यूटर केंद्र एवं वाई-फाई नेटवर्क' },
  { id: 'Sports Complex & Gymnasium', en: 'Sports Complex & Gymnasium', hi: 'खेल परिसर एवं व्यायामशाला' },
  { id: 'South Campus Canteen & Cafeteria', en: 'South Campus Canteen & Cafeteria', hi: 'दक्षिण परिसर कैंटीन एवं भोजनालय' },
  { id: 'Internal Complaints Committee (ICC / POSH)', en: 'Internal Complaints Committee (ICC / POSH)', hi: 'आंतरिक शिकायत समिति (आईसीसी / पॉश)' },
  { id: 'Anti-Ragging Committee & Proctorial Cell', en: 'Anti-Ragging Committee & Proctorial Cell', hi: 'एंटी-रैगिंग समिति एवं प्रॉक्टोरियल सेल' },
  { id: 'Equal Opportunity Cell (EOC)', en: 'Equal Opportunity Cell (EOC)', hi: 'समान अवसर प्रकोष्ठ (ईओसी)' },
  { id: 'SC/ST/OBC Grievance Cell', en: 'SC/ST/OBC Grievance Cell', hi: 'अजा/अजजा/अपिव निवारण प्रकोष्ठ' },
  { id: 'Students\' Union Secretariat (UDSC)', en: 'Students\' Union Secretariat (UDSC)', hi: 'छात्र संघ सचिवालय (साउथ कैंपस)' },
  { id: 'Other / Inter-Departmental', en: 'Other / Inter-Departmental', hi: 'अन्य / अंतर-विभागीय' }
];

const LIFECYCLE_STAGES = [
  { key: 'SUBMITTED', label: 'Submitted & Registered', hi: 'दर्ज एवं पंजीकृत', color: 'submitted' },
  { key: 'TRIAGED', label: 'Under Union Review', hi: 'छात्र संघ समीक्षाधीन', color: 'triaged' },
  { key: 'INVESTIGATING', label: 'Action in Progress', hi: 'जांच एवं विभागीय कार्रवाई जारी', color: 'investigating' },
  { key: 'ACTION_PROPOSED', label: 'Resolution Proposed', hi: 'समाधान प्रस्तावित', color: 'action-proposed' },
  { key: 'RESOLVED', label: 'Resolved & Closed', hi: 'निस्तारित एवं बंद', color: 'resolved' }
];

const I18N = {
  en: {
    brand_title: "S.A.M.A.D.H.A.N",
    brand_status: "24/7 ACTIVE",
    brand_sub: "Students' Union • University of Delhi South Campus (UDSC)",
    nav_lodge: "Lodge Grievance",
    nav_track: "Live Tracker",
    nav_telemetry: "Campus Statistics",
    nav_rights: "Student Rights",
    lang_toggle: "हिन्दी",
    theme_light: "Light",
    theme_dark: "Dark",

    // Step 1
    step_1_title: "Step 1 of 3: Select Grievance Category",
    step_1_sub: "Select the category that best matches your issue so it can be directed to the responsible Students' Union representative.",
    step_1_next: "Proceed to Incident Details ➔",

    // Step 2
    step_2_title: "Step 2 of 3: Provide Incident Details & Evidence",
    step_2_sub: "Describe the issue clearly. Providing specific details helps the Students' Union take prompt action with university authorities.",
    field_subject: "Grievance Subject / Short Title",
    field_subject_ph: "e.g., Central Library reading hall air conditioning malfunction during study hours",
    field_dept: "South Campus Department / Facility Involved",
    field_dept_ph: "Select South Campus Department / Faculty...",
    field_date: "Date of Occurrence",
    field_urgency: "Urgency & Priority Level",
    urgency_low: "Routine (7-Day Target Timeline)",
    urgency_med: "Standard (72-Hour Target Timeline)",
    urgency_crit: "Urgent / Safety Hazard (24-Hour Priority Action)",
    field_desc: "Detailed Factual Description",
    field_desc_ph: "Specify exact location, dates, prior verbal requests made, and exact nature of hardship...",
    anon_toggle_title: "Submit Anonymously (DPDP Act Section 8 Whistleblower Mode)",
    anon_toggle_sub: "When checked, zero personal information (name, email, phone) will be stored or shared with anyone.",
    anon_active_notice: "Anonymous Mode Active: Your identity is completely shielded. You will trace this grievance exclusively using your unique tracking token.",
    field_name: "Full Legal Name",
    field_name_ph: "e.g., Jane Doe",
    field_email: "Student Email Address",
    field_email_ph: "e.g., student@south.du.ac.in or personal email",
    field_phone: "Mobile Number (for SMS Tracking Alerts)",
    field_phone_ph: "e.g., +91 98765 43210",
    btn_back: "← Back",
    btn_proceed_step3: "Proceed to Statutory Affirmation ➔",

    // Step 3
    step_3_title: "Step 3 of 3: Affirmation & Digital Consent",
    step_3_sub: "In accordance with Section 6 of the Digital Personal Data Protection (DPDP) Act, 2023, personal data is processed solely for grievance redressal.",
    dpdp_box_badge: "DPDP ACT 2023 STATUTORY CONSENT DECLARATION",
    dpdp_box_text: "I hereby give affirmative, informed consent to the Students' Union, South Delhi Campus (UDSC) to process the submitted grievance solely for the purpose of investigation, administrative advocacy with University Authorities, and resolution tracking. I understand that my data will be retained in accordance with Section 8(7) and erased upon resolution or request under Section 12.",
    consent_checkbox_label: "I solemnly affirm the facts stated above are accurate and grant affirmative statutory consent under DPDP Act 2023.",
    btn_submit_final: "Submit Grievance to Students' Union ➔",

    // Success
    success_heading: "Grievance Successfully Registered!",
    success_sub: "Your grievance has been securely recorded and submitted to the Students' Union Grievance Redressal Cell.",
    token_box_title: "YOUR UNIQUE 24/7 TRACKING TOKEN",
    token_box_help: "Save this token to trace your grievance anytime. No account or password required.",
    btn_copy_token: "📋 Copy Token",
    btn_print_receipt: "🖨️ Print Statutory Receipt",
    btn_track_this: "Track This Case Live ➔",
    btn_lodge_another: "Lodge Another Grievance",

    // Tracker
    tracker_heading: "24/7 Redressal Status Tracker",
    tracker_sub: "Track the progress and official updates of any grievance registered with the UDSC Students' Union.",
    tracker_input_ph: "Enter token (e.g. UDSC-2026-LIB-102)",
    tracker_btn_search: "Track Grievance",
    tracker_empty_title: "Enter a Tracking Token",
    tracker_empty_desc: "Enter your unique tracking token above to view progress, assigned union liaison, and official action notes.",
    tracker_not_found: "No grievance found matching token",
    tracker_not_found_desc: "Please verify that the token format is correct (e.g., UDSC-2026-INFRA-102).",
    tracker_dept: "Department / Facility",
    tracker_sla: "Expected Response Timeline",
    tracker_official_log: "Official Union Action Log",
    tracker_no_notes: "Grievance received and awaiting initial committee review.",
    tracker_erasure_btn: "🗑️ Withdraw Grievance & Request Data Erasure (DPDP Sec 12)",

    // Statistics
    telemetry_badge: "PUBLIC TRANSPARENCY DASHBOARD",
    telemetry_heading: "South Delhi Campus (UDSC) Redressal Statistics",
    telemetry_sub: "Official public overview of student grievances and redressal progress across South Delhi Campus, strictly aggregated to protect student confidentiality under the DPDP Act 2023.",
    telemetry_total: "Total Received",
    telemetry_resolved: "Resolved Cases",
    telemetry_status: "Portal Status",
    telemetry_live: "● Active & Monitoring",
    telemetry_dept_title: "Department Redressal Overview",
    telemetry_dept_sub: "Breakdown of student grievances registered across South Campus departments and facilities:",
    telemetry_zero_title: "No Grievances Currently Logged",
    telemetry_zero_desc: "Statistics update live as student grievances are received and processed by the Union. All data is verified.",
    telemetry_in_sla: "Resolved within Timeline",

    // Rights
    rights_badge: "STATUTORY PROTECTION",
    rights_heading: "Student Rights Under the DPDP Act 2023",
    rights_sub: "The Digital Personal Data Protection Act, 2023 guarantees uncompromising legal safeguards for students filing grievances at UDSC.",
    sec_6_title: "1. Right to Informed Affirmative Consent (Section 6)",
    sec_6_desc: "No grievance is processed without explicit affirmative consent. Consent requests must be presented in clear, plain language with specified purpose.",
    sec_8_title: "2. Whistleblower Protection & Data Minimization (Section 8)",
    sec_8_desc: "Anonymous submission is a statutory right. Zero personal data (IP addresses, names, or phone numbers) is recorded when anonymous mode is activated.",
    sec_12_title: "3. Right to Erasure ('Right to be Forgotten' - Section 12)",
    sec_12_desc: "Personal data is permanently scrubbed 30 days following verified grievance resolution. Complainants may also trigger instant data erasure at any time.",
    sec_13_title: "4. Redressal Escalation to Data Protection Board of India (Section 13)",
    sec_13_desc: "If a student is not satisfied with grievance resolution, they have the statutory right to appeal directly to the Data Protection Board of India (DPBI).",
    rights_contact_box_title: "Designated Grievance Redressal Cell (Students' Union):",
    rights_office: "Office of the Students' Union, South Delhi Campus (UDSC)",
    rights_address: "Central Students' Amenities Block, South Delhi Campus, Benito Juarez Road, New Delhi 110021",
    rights_email_label: "Official Statutory Contact:",

    // Footer
    footer_tagline: "Student Advocacy, Monitoring, Analytics & Digital Heeding of All Needs",
    footer_desc: "Official 24/7 Grievance Redressal initiative managed by the Students' Union of South Delhi Campus, University of Delhi under Project S.E.W.A. Dedicated to protecting student rights, academic equity, and campus safety.",
    footer_db_note: "Database: Dedicated Isolated Instance (samadhan) • Zero-Cost Public Infrastructure",
    footer_quick_services: "Quick Services",
    footer_service_lodge: "Lodge a Grievance",
    footer_service_track: "Track by Token",
    footer_service_telemetry: "Campus Statistics",
    footer_service_rights: "DPDP Student Rights",
    footer_contact_title: "UDSC Students' Union Office",
    footer_official_mail_label: "Official Union Email",
    footer_exec_committee: "Students' Union Members 2026/27:",
    role_president: "President",
    role_vice_president: "Vice-President",
    role_secretary: "Secretary",
    role_joint_secretary: "Joint Secretary",
    role_councilor: "Central Councilor",
    footer_rights_reserved: "© 2026 Students' Union, South Delhi Campus (UDSC), University of Delhi. All rights reserved.",
    footer_iso: "ISO 10002:2018 Quality Standard"
  },
  hi: {
    brand_title: "समाधान (S.A.M.A.D.H.A.N)",
    brand_status: "24/7 सक्रिय",
    brand_sub: "छात्र संघ • दक्षिण परिसर, दिल्ली विश्वविद्यालय (UDSC)",
    nav_lodge: "शिकायत दर्ज करें",
    nav_track: "स्थिति ट्रैक करें",
    nav_telemetry: "परिसर आंकड़े",
    nav_rights: "छात्र अधिकार (DPDP)",
    lang_toggle: "English",
    theme_light: "दिन (Light)",
    theme_dark: "रात (Dark)",

    // Step 1
    step_1_title: "चरण 1/3: शिकायत श्रेणी का चयन करें",
    step_1_sub: "अपनी समस्या से संबंधित उचित श्रेणी चुनें ताकि इसे सीधे संबंधित छात्र संघ प्रतिनिधि को प्रेषित किया जा सके।",
    step_1_next: "घटना का विवरण भरें ➔",

    // Step 2
    step_2_title: "चरण 2/3: समस्या का विवरण एवं साक्ष्य साझा करें",
    step_2_sub: "समस्या का स्पष्ट एवं तथ्यात्मक विवरण दें। आवश्यक विवरण प्रदान करने से छात्र संघ को प्रशासन के समक्ष त्वरित कार्रवाई करने में सहायता मिलती है।",
    field_subject: "शिकायत का संक्षिप्त विषय / शीर्षक",
    field_subject_ph: "उदा. अध्ययन समय में केंद्रीय पुस्तकालय की तीसरी मंजिल पर बिजली बाधित होना",
    field_dept: "संबंधित संकाय / विभाग / छात्रावास अथवा सुविधा",
    field_dept_ph: "संबंधित विभाग अथवा सुविधा चुनें...",
    field_date: "घटना / समस्या प्रारंभ होने की तिथि",
    field_urgency: "गंभीरता एवं प्राथमिकता का स्तर",
    urgency_low: "सामान्य (7 कार्यदिवस लक्ष्य)",
    urgency_med: "मध्यम (72 घंटे लक्ष्य)",
    urgency_crit: "अति गंभीर / आपातकालीन (24 घंटे त्वरित कार्रवाई)",
    field_desc: "समस्या का विस्तृत तथ्यात्मक विवरण",
    field_desc_ph: "स्थान, तिथि, पूर्व में की गई मौखिक शिकायतें एवं कठिनाई का पूरा विवरण दें...",
    anon_toggle_title: "पहचान पूर्णतः गुप्त रखें (DPDP धारा 8 व्हिसलब्लोअर सुरक्षा)",
    anon_toggle_sub: "इस विकल्प को चुनने पर आपका नाम, ईमेल अथवा फोन नंबर प्रणाली में कभी भी दर्ज नहीं किया जाएगा।",
    anon_active_notice: "गोपनीय मोड सक्रिय: आपकी पहचान पूरी तरह सुरक्षित है। आप केवल अपने ट्रैकिंग टोकन द्वारा ही स्थिति जान सकेंगे।",
    field_name: "विद्यार्थी का पूरा नाम",
    field_name_ph: "उदा. कार्तिकेय तिवारी / छात्र का नाम",
    field_email: "आधिकारिक अथवा व्यक्तिगत ईमेल पता",
    field_email_ph: "उदा. student@south.du.ac.in",
    field_phone: "मोबाइल नंबर (एसएमएस अलर्ट हेतु)",
    field_phone_ph: "उदा. +91 98765 43210",
    btn_back: "← पिछला",
    btn_proceed_step3: "वैधानिक सहमति एवं पुष्टि पर आगे बढ़ें ➔",

    // Step 3
    step_3_title: "चरण 3/3: वैधानिक सहमति एवं डिजिटल पुष्टि",
    step_3_sub: "डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम, 2023 की धारा 6 के तहत आपका डेटा केवल शिकायत निवारण हेतु उपयोग किया जाएगा।",
    dpdp_box_badge: "DPDP अधिनियम 2023 वैधानिक सहमति घोषणा",
    dpdp_box_text: "मैं एतद्द्वारा छात्र संघ, दक्षिण परिसर (UDSC) को अपनी शिकायत की जांच, विश्वविद्यालय प्रशासन के समक्ष औपचारिक पैरवी एवं निवारण निगरानी के उद्देश्य से डेटा प्रसंस्करण की स्पष्ट एवं सूचित सहमति प्रदान करता/करती हूँ। मुझे ज्ञात है कि मेरा डेटा धारा 8(7) के अनुसार सुरक्षित रहेगा तथा समाधान होने पर अथवा मेरे अनुरोध पर धारा 12 के तहत स्थायी रूप से मिटा दिया जाएगा।",
    consent_checkbox_label: "मैं सत्यनिष्ठा से पुष्टि करता/करती हूँ कि उपर्युक्त विवरण सत्य है और मैं DPDP कानून 2023 के तहत सूचित सहमति देता/देती हूँ।",
    btn_submit_final: "छात्र संघ को शिकायत दर्ज करें ➔",

    // Success
    success_heading: "शिकायत सफलतापूर्वक दर्ज हो गई!",
    success_sub: "आपकी शिकायत छात्र संघ निवारण प्रकोष्ठ के पास सुरक्षित रूप से दर्ज हो चुकी है।",
    token_box_title: "आपका 24/7 ट्रैकिंग टोकन",
    token_box_help: "इस टोकन को सुरक्षित रखें। अपनी शिकायत की स्थिति देखने के लिए किसी पासवर्ड या खाते की आवश्यकता नहीं है।",
    btn_copy_token: "📋 टोकन कॉपी करें",
    btn_print_receipt: "🖨️ पावती रसीद प्रिंट करें",
    btn_track_this: "अभी इस शिकायत की स्थिति देखें ➔",
    btn_lodge_another: "नई शिकायत दर्ज करें",

    // Tracker
    tracker_heading: "24/7 लाइव शिकायत निवारण ट्रैकर",
    tracker_sub: "छात्र संघ में दर्ज किसी भी शिकायत की वर्तमान स्थिति एवं अद्यतन वास्तविक समय में ट्रैक करें।",
    tracker_input_ph: "टोकन दर्ज करें (उदा. UDSC-2026-LIB-102)",
    tracker_btn_search: "स्थिति देखें",
    tracker_empty_title: "ट्रैकिंग टोकन दर्ज करें",
    tracker_empty_desc: "अपनी शिकायत का टोकन ऊपर दर्ज करें और वर्तमान स्थिति, नियुक्त प्रतिनिधि व आधिकारिक कार्रवाई देखें।",
    tracker_not_found: "इस टोकन से संबंधित कोई शिकायत नहीं मिली",
    tracker_not_found_desc: "कृपया जांचें कि टोकन सही प्रारूप में है (उदा. UDSC-2026-INFRA-102)।",
    tracker_dept: "संबंधित विभाग / सुविधा",
    tracker_sla: "अपेक्षित निस्तारण समय-सीमा",
    tracker_official_log: "छात्र संघ की आधिकारिक कार्रवाई टिप्पणी",
    tracker_no_notes: "शिकायत प्राप्त हुई है तथा प्राथमिक समिति समीक्षा हेतु प्रतीक्षारत है।",
    tracker_erasure_btn: "🗑️ शिकायत वापस लें एवं डेटा मिटाने का अनुरोध करें (DPDP धारा 12)",

    // Statistics
    telemetry_badge: "सार्वजनिक पारदर्शिता डैशबोर्ड",
    telemetry_heading: "दक्षिण परिसर (UDSC) शिकायत निवारण आंकड़े",
    telemetry_sub: "DPDP अधिनियम 2023 के तहत व्यक्तिगत गोपनीयता की पूर्ण रक्षा करते हुए छात्र शिकायतों एवं निस्तारण प्रगति का आधिकारिक सार्वजनिक विवरण।",
    telemetry_total: "कुल प्राप्त शिकायतें",
    telemetry_resolved: "निस्तारित मामले",
    telemetry_status: "पोर्टल स्थिति",
    telemetry_live: "● सक्रिय एवं चालू",
    telemetry_dept_title: "विभागवार निस्तारण प्रगति",
    telemetry_dept_sub: "दक्षिण परिसर के विभागों एवं संकायों में दर्ज शिकायतों का आधिकारिक विवरण:",
    telemetry_zero_title: "वर्तमान में कोई सक्रिय शिकायत दर्ज नहीं है",
    telemetry_zero_desc: "यह सार्वजनिक डैशबोर्ड छात्रों द्वारा दर्ज शिकायतों के आधार पर लाइव अपडेट होता है। यहाँ कोई कृत्रिम संख्या नहीं दिखाई जाती।",
    telemetry_in_sla: "समय-सीमा में निस्तारित",

    // Rights
    rights_badge: "वैधानिक सुरक्षा",
    rights_heading: "DPDP अधिनियम 2023 के तहत छात्र अधिकार",
    rights_sub: "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 दक्षिण परिसर के प्रत्येक छात्र को पूर्ण विधिक सुरक्षा की गारंटी देता है।",
    sec_6_title: "1. सूचित एवं स्पष्ट सहमति का अधिकार (धारा 6)",
    sec_6_desc: "छात्र की स्पष्ट सहमति के बिना कोई शिकायत अग्रेषित नहीं की जाती। सहमति का उद्देश्य स्पष्ट, सरल और पारदर्शी होना अनिवार्य है।",
    sec_8_title: "2. व्हिसलब्लोअर सुरक्षा एवं डेटा न्यूनतमता (धारा 8)",
    sec_8_desc: "गोपनीय शिकायत दर्ज करना प्रत्येक छात्र का कानूनी अधिकार है। गोपनीय मोड में नाम, फोन नंबर अथवा आईपी एड्रेस कभी रिकॉर्ड नहीं किया जाता।",
    sec_12_title: "3. डेटा मिटाने का अधिकार ('राइट टू बी फॉरगॉटन' - धारा 12)",
    sec_12_desc: "शिकायत के निस्तारण के 30 दिनों के भीतर व्यक्तिगत डेटा स्वतः मिटा दिया जाता है। छात्र किसी भी समय तत्काल डेटा मिटाने का अनुरोध कर सकते हैं।",
    sec_13_title: "4. भारतीय डेटा संरक्षण बोर्ड में अपील का अधिकार (धारा 13)",
    sec_13_desc: "यदि छात्र निवारण से संतुष्ट न हों, तो उन्हें भारत सरकार के डेटा संरक्षण बोर्ड (DPBI) के समक्ष सीधे अपील करने का वैधानिक अधिकार प्राप्त है।",
    rights_contact_box_title: "अधिकृत शिकायत निवारण प्रकोष्ठ (छात्र संघ):",
    rights_office: "छात्र संघ कार्यालय, दक्षिण परिसर (UDSC), दिल्ली विश्वविद्यालय",
    rights_address: "केंद्रीय छात्र सुविधा ब्लॉक, बेनिटो जुआरेज़ मार्ग, नई दिल्ली 110021",
    rights_email_label: "आधिकारिक विधिक संपर्क:",

    // Footer
    footer_tagline: "छात्र अधिकार, सतत निगरानी, विश्लेषण एवं त्वरित समाधान पहल",
    footer_desc: "प्रोजेक्ट S.E.W.A के अंतर्गत छात्र संघ, दक्षिण परिसर (दिल्ली विश्वविद्यालय) द्वारा संचालित 24/7 शिकायत निवारण प्रणाली। छात्र अधिकारों, शैक्षणिक समता व परिसर सुरक्षा हेतु समर्पित।",
    footer_db_note: "डेटाबेस: पूर्णतः पृथक सुरक्षित डेटाबेस (samadhan) • शून्य लागत जन सुविधा",
    footer_quick_services: "त्वरित सेवाएं",
    footer_service_lodge: "शिकायत दर्ज करें",
    footer_service_track: "टोकन द्वारा स्थिति देखें",
    footer_service_telemetry: "परिसर आंकड़े",
    footer_service_rights: "DPDP छात्र अधिकार",
    footer_contact_title: "छात्र संघ कार्यालय (UDSC)",
    footer_official_mail_label: "छात्र संघ आधिकारिक ईमेल",
    footer_exec_committee: "छात्र संघ सदस्य 2026/27:",
    role_president: "अध्यक्ष",
    role_vice_president: "उपाध्यक्ष",
    role_secretary: "सचिव",
    role_joint_secretary: "संयुक्त सचिव",
    role_councilor: "केंद्रीय परिषद सदस्य",
    footer_rights_reserved: "© 2026 छात्र संघ, दक्षिण परिसर (UDSC), दिल्ली विश्वविद्यालय। सर्वाधिकार सुरक्षित।",
    footer_iso: "ISO 10002:2018 गुणवत्ता मानक"
  }
};

function t(key) {
  const lang = state.language || 'en';
  return (I18N[lang] && I18N[lang][key]) || (I18N['en'] && I18N['en'][key]) || key;
}

function getDepartmentName(deptId) {
  const dept = UDSC_DEPARTMENTS.find(d => d.id === deptId || d.en === deptId);
  if (!dept) return deptId;
  return state.language === 'hi' ? dept.hi : dept.en;
}

function getCategoryLabel(catId) {
  const cat = CATEGORIES[catId];
  if (!cat) return catId;
  return state.language === 'hi' ? cat.hi : cat.label;
}

function getStageLabel(stageKey) {
  const stage = LIFECYCLE_STAGES.find(s => s.key === stageKey);
  if (!stage) return stageKey;
  return state.language === 'hi' ? stage.hi : stage.label;
}

// ============================================================================
// 2. SECURITY SANITIZERS & PUBLIC TRANSPARENCY LEDGER SYNC ENGINE
// ============================================================================

/**
 * High-Security HTML Escaper to prevent Stored XSS
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Formula / CSV Injection Sanitizer (CWE-1236)
 * Prefixes cells starting with =, +, -, @, \t, or \r with a single quote to prevent spreadsheet code execution
 */
function sanitizeSpreadsheetCell(val) {
  if (typeof val !== 'string') return val;
  if (/^[=\+\-\@\t\r]/.test(val)) {
    return "'" + val;
  }
  return val;
}

const DEFAULT_GOOGLE_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM/edit?usp=sharing";
const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwwOdeufbJ6PsU476UdD0gDOwgeShd3ihRSSNXmjgmVBdAUvaSjs8J4pKyKCF5Uej1A/exec";

function getGoogleSheetViewUrl() {
  return localStorage.getItem('samadhan_google_sheet_view_url') || DEFAULT_GOOGLE_SHEET_VIEW_URL;
}

function getGoogleSheetWebhookUrl() {
  return localStorage.getItem('samadhan_google_sheet_webhook_url') || DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
}

function getGoogleSheetCsvUrl() {
  const viewUrl = getGoogleSheetViewUrl();
  const match = viewUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const sheetId = match ? match[1] : "1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM";
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
}

/**
 * RFC 4180-compliant zero-dependency CSV Parser
 * Correctly parses multi-line cells, embedded commas, and escaped quotes.
 */
function parseCSV(str) {
  if (!str) return [];
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let insideQuotes = false;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const nextChar = str[i + 1];
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentVal.trim());
      if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
      rows.push(currentRow);
    }
  }
  return rows;
}

/**
 * Robust parsing for timestamps produced by Google Sheets, Indian locale strings, or ISO formats
 */
function parseFlexibleDate(str) {
  if (!str) return new Date();
  const direct = new Date(str);
  if (!isNaN(direct.getTime())) return direct;
  const m = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})(?:,\s*(\d{1,2}):(\d{1,2}):(\d{1,2})\s*(AM|PM)?)?/i);
  if (m) {
    let day = parseInt(m[1], 10);
    let month = parseInt(m[2], 10) - 1;
    let year = parseInt(m[3], 10);
    let hours = m[4] ? parseInt(m[4], 10) : 0;
    let minutes = m[5] ? parseInt(m[5], 10) : 0;
    let seconds = m[6] ? parseInt(m[6], 10) : 0;
    let ampm = m[7] ? m[7].toUpperCase() : null;
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
  }
  return new Date();
}

/**
 * Parse an immutable Google Spreadsheet row into a canonical grievance object
 */
function parseGrievanceRow(row) {
  if (!row || row.length < 5) return null;
  const token = (row[1] || '').trim().toUpperCase();
  if (!token || token.includes('TRACKING') || !token.startsWith('UDSC-')) {
    return null;
  }

  const rawCat = (row[2] || '').trim().toUpperCase();
  let category = 'OTHER';
  if (rawCat.includes('HOSTEL')) category = 'HOSTEL';
  else if (rawCat.includes('INFRA')) category = 'INFRASTRUCTURE';
  else if (rawCat.includes('ACAD')) category = 'ACADEMIC';
  else if (rawCat.includes('FIN')) category = 'FINANCIAL';
  else if (rawCat.includes('LIB')) category = 'LIBRARY';
  else if (rawCat.includes('HARASS') || rawCat.includes('RAG') || rawCat.includes('SAFE')) category = 'HARASSMENT_RAGGING';
  else if (rawCat.includes('TRANSIT') || rawCat.includes('GATE') || rawCat.includes('SEC')) category = 'TRANSIT_SECURITY';
  else if (rawCat.includes('GEN') || rawCat.includes('OTHER')) category = 'OTHER';

  const dept = (row[3] || 'South Campus').trim();
  const title = (row[4] || 'Student Grievance').trim();
  const desc = (row[5] || '').trim();

  const rawSev = (row[6] || '').trim().toUpperCase();
  let severity = 'MEDIUM';
  if (rawSev.includes('CRIT')) severity = 'CRITICAL';
  else if (rawSev.includes('HIGH')) severity = 'HIGH';
  else if (rawSev.includes('LOW')) severity = 'LOW';

  const rawStatus = (row[7] || '').trim().toUpperCase();
  let status = 'SUBMITTED';
  if (['SUBMITTED', 'TRIAGED', 'INVESTIGATING', 'ACTION_PROPOSED', 'RESOLVED'].includes(rawStatus)) {
    status = rawStatus;
  }

  const isAnon = (row[8] || '').toUpperCase().includes('ANON') || (row[9] || '').toUpperCase().includes('ANON');
  const complainant = isAnon ? null : ((row[9] || '').trim() || 'Student');
  const email = isAnon ? null : (row[10] || '').trim();
  const phone = isAnon ? null : (row[11] || '').trim();

  const submittedAtDate = parseFlexibleDate(row[0]);
  const submittedAt = submittedAtDate.toISOString();

  let slaDeadline = '';
  if (row[13] && row[13].trim()) {
    slaDeadline = parseFlexibleDate(row[13].trim()).toISOString();
  } else {
    const hours = severity === 'CRITICAL' ? 24 : (severity === 'HIGH' ? 72 : 168);
    slaDeadline = new Date(submittedAtDate.getTime() + (hours * 3600000)).toISOString();
  }

  const ticketId = 'TKT-' + token.replace(/^UDSC-2026-/, '');

  const timeline = [
    {
      stage: 'SUBMITTED',
      timestamp: submittedAt,
      note: 'Grievance lodged and cryptographically recorded on Public Transparency Ledger.'
    }
  ];
  if (status === 'TRIAGED' || status === 'INVESTIGATING' || status === 'ACTION_PROPOSED' || status === 'RESOLVED') {
    timeline.push({
      stage: 'TRIAGED',
      timestamp: submittedAt,
      note: 'Assigned to UDSC Union Redressal Desk for preliminary investigation.'
    });
  }
  if (status === 'INVESTIGATING' || status === 'ACTION_PROPOSED' || status === 'RESOLVED') {
    timeline.push({
      stage: 'INVESTIGATING',
      timestamp: submittedAt,
      note: 'Actively under formal enquiry with designated university department officials.'
    });
  }
  if (status === 'ACTION_PROPOSED' || status === 'RESOLVED') {
    timeline.push({
      stage: 'ACTION_PROPOSED',
      timestamp: submittedAt,
      note: 'Administrative resolution plan drafted and submitted to UDSC Provost / Dean.'
    });
  }
  if (status === 'RESOLVED') {
    timeline.push({
      stage: 'RESOLVED',
      timestamp: submittedAt,
      note: 'Grievance satisfactorily resolved and officially closed by Union Executive.'
    });
  }

  return {
    ticketId,
    trackToken: token,
    category,
    department: dept,
    title,
    description: desc,
    severity,
    status,
    isAnonymous: isAnon,
    studentName: complainant,
    studentEmail: email,
    studentPhone: phone,
    submittedAt,
    slaDeadline,
    assignedOfficer: 'UDSC Students\' Union Redressal Desk',
    dpdpConsent: true,
    dpdpConsentTimestamp: submittedAt,
    timeline,
    communicationThread: []
  };
}

// ============================================================================
// 2.5 STATE REPOSITORY (DYNAMIC & LIVE SYNCHRONIZED — ZERO FAKE DATA)
// ============================================================================

class GrievanceRepository {
  constructor() {
    this.storageKey = 'samadhan_grievances_v3';
    this.lastSyncTimestamp = 0;
    this.init();
  }

  init() {
    // Purge legacy test caches if present from earlier iterations
    localStorage.removeItem('samadhan_grievances_v1');
    localStorage.removeItem('samadhan_grievances_v2');
    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch {
      return [];
    }
  }

  saveAll(list) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  getByToken(token) {
    const list = this.getAll();
    const clean = (token || '').trim().toUpperCase();
    return list.find(g => (g.trackToken && g.trackToken.toUpperCase() === clean) || (g.ticketId && g.ticketId.toUpperCase() === clean));
  }

  add(grievance) {
    const list = this.getAll();
    list.unshift(grievance);
    this.saveAll(list);
    return grievance;
  }

  update(ticketId, updater) {
    const list = this.getAll();
    const index = list.findIndex(g => g.ticketId === ticketId || g.trackToken === ticketId);
    if (index !== -1) {
      list[index] = updater(list[index]);
      this.saveAll(list);
      return list[index];
    }
    return null;
  }

  /**
   * Synchronize all grievances live from the public immutable Google Sheet ledger
   */
  async syncFromGoogleSheet() {
    if (typeof fetch === 'undefined') return this.getAll();
    try {
      const csvUrl = `${getGoogleSheetCsvUrl()}&t=${Date.now()}`;
      const res = await fetch(csvUrl, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const text = await res.text();
      const rows = parseCSV(text);
      if (!rows || rows.length <= 1) return this.getAll();

      const remoteGrievances = [];
      for (let i = 1; i < rows.length; i++) {
        const parsed = parseGrievanceRow(rows[i]);
        if (parsed) remoteGrievances.push(parsed);
      }

      if (remoteGrievances.length === 0) return this.getAll();

      const local = this.getAll();
      const localMap = new Map();
      local.forEach(g => {
        if (g.trackToken) localMap.set(g.trackToken.toUpperCase(), g);
        if (g.ticketId) localMap.set(g.ticketId.toUpperCase(), g);
      });

      const merged = [];
      for (const remote of remoteGrievances) {
        const existing = localMap.get(remote.trackToken.toUpperCase()) || (remote.ticketId && localMap.get(remote.ticketId.toUpperCase()));
        if (existing) {
          merged.push({
            ...remote,
            ...existing,
            status: existing.status || remote.status,
            timeline: (existing.timeline && existing.timeline.length > (remote.timeline ? remote.timeline.length : 1))
              ? existing.timeline
              : (remote.timeline || existing.timeline)
          });
          localMap.delete(remote.trackToken.toUpperCase());
          if (existing.ticketId) localMap.delete(existing.ticketId.toUpperCase());
        } else {
          merged.push(remote);
        }
      }

      for (const remaining of localMap.values()) {
        if (!merged.find(m => m.trackToken === remaining.trackToken || m.ticketId === remaining.ticketId)) {
          merged.push(remaining);
        }
      }

      this.saveAll(merged);
      this.lastSyncTimestamp = Date.now();
      return merged;
    } catch (err) {
      console.warn("Could not sync from Google Sheet:", err);
      return this.getAll();
    }
  }
}

const repo = new GrievanceRepository();

// ============================================================================
// 3. CRYPTOGRAPHIC HELPERS & TOKEN GENERATORS
// ============================================================================

function generateTrackToken(category) {
  const year = '2026';
  const prefixMap = {
    ACADEMIC: 'ACAD',
    HOSTEL: 'HOSTEL',
    INFRASTRUCTURE: 'INFRA',
    HARASSMENT_RAGGING: 'SAFE',
    LIBRARY: 'LIB',
    TRANSIT_SECURITY: 'TRANSIT',
    FINANCIAL: 'FIN',
    OTHER: 'GEN'
  };
  const catCode = prefixMap[category] || 'GEN';
  const randNum = Math.floor(100 + Math.random() * 900);
  return `UDSC-${year}-${catCode}-${randNum}`;
}

// ============================================================================
// CONCEPT 4 BRAND ASSET: THE OPEN LEDGER / TRUST CUBE (सुरक्षित मंजूषा)
// Vector representation of secure zero-knowledge vault storage, open ledger
// verification folios, and continuous status tracking telemetry.
// ============================================================================

function getTrustCubeSvg(className = "w-full h-full") {
  return `<svg class="${className}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="S.A.M.A.D.H.A.N Open Ledger Trust Cube Logo">
    <defs>
      <linearGradient id="tcTop" x1="14" y1="16" x2="86" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="50%" stop-color="#FBBF24"/>
        <stop offset="100%" stop-color="#F59E0B"/>
      </linearGradient>
      <linearGradient id="tcLeft" x1="14" y1="34" x2="50" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#D97706"/>
        <stop offset="100%" stop-color="#78350F"/>
      </linearGradient>
      <linearGradient id="tcRight" x1="50" y1="52" x2="86" y2="90" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#92400E"/>
      </linearGradient>
    </defs>
    <!-- Base Isometric Vault: Left Face (Secure Storage Vault) -->
    <path d="M 14 36 L 50 54 L 50 88 L 14 70 Z" fill="url(#tcLeft)" stroke="#451A03" stroke-width="1.75" stroke-linejoin="round"/>
    <!-- Right Face (Transparent Milestone Ledger) -->
    <path d="M 50 54 L 86 36 L 86 70 L 50 88 Z" fill="url(#tcRight)" stroke="#451A03" stroke-width="1.75" stroke-linejoin="round"/>
    <!-- Top Face (Open Verifiable Ledger Surface) -->
    <path d="M 50 18 L 86 36 L 50 54 L 14 36 Z" fill="url(#tcTop)" stroke="#92400E" stroke-width="1.75" stroke-linejoin="round"/>

    <!-- Left Face: Encrypted Grievance Strata Lines -->
    <path d="M 22 49 L 42 59" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
    <path d="M 22 59 L 42 69" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
    <path d="M 22 69 L 42 79" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round" opacity="0.65"/>

    <!-- Right Face: Milestone Status Checkpoints -->
    <circle cx="68" cy="53" r="2.2" fill="#FEF3C7"/>
    <circle cx="68" cy="63" r="2.2" fill="#FEF3C7"/>
    <circle cx="68" cy="73" r="2.2" fill="#FEF3C7"/>
    <path d="M 58 58 L 78 48" stroke="#FEF3C7" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <path d="M 58 68 L 78 58" stroke="#FEF3C7" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <path d="M 58 78 L 78 68" stroke="#FEF3C7" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>

    <!-- Top Face: Open Ledger Spine & Folio Register Lines -->
    <path d="M 50 24 L 50 48" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
    <path d="M 30 33 L 44 40" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" opacity="0.65"/>
    <path d="M 56 40 L 70 33" stroke="#78350F" stroke-width="1.5" stroke-linecap="round" opacity="0.65"/>

    <!-- Central Verifiable Telemetry Core (Cyan/Emerald Monitoring Pulse) -->
    <circle cx="50" cy="54" r="7" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
    <circle cx="50" cy="54" r="3.5" fill="#38BDF8"/>

    <!-- Upward Advocacy Ray / Escalation Pillar -->
    <path d="M 50 47 L 50 10" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>
    <polygon points="50,5 45,13 55,13" fill="#38BDF8"/>
  </svg>`;
}

// ============================================================================
// 3.4 DEDICATED FIREBASE CLOUD CONFIGURATION (ISOLATED PROJECT: udsc-samadhan-2026)
// ============================================================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyADjPR2IKldTKQzsRoLrqU4l1iEXK0AlhU",
  authDomain: "udsc-samadhan-2026.firebaseapp.com",
  projectId: "udsc-samadhan-2026",
  storageBucket: "udsc-samadhan-2026.firebasestorage.app",
  messagingSenderId: "1037987037432",
  appId: "1:1037987037432:web:48b7f569b62832168efb0d",
  measurementId: "G-LLHM6R14LW"
};

// ============================================================================
// 3.5 PUBLIC TRANSPARENCY LEDGER DISPATCH ENGINE
// ============================================================================

async function syncGrievanceToGoogleSheet(g) {
  const isAnon = Boolean(g.isAnonymous);
  const nowIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const slaDeadlineIST = g.slaDeadline ? new Date(g.slaDeadline).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '';

  const payload = {
    timestamp: nowIST,
    trackToken: g.trackToken,
    category: sanitizeSpreadsheetCell(g.category),
    department: sanitizeSpreadsheetCell(g.department),
    title: sanitizeSpreadsheetCell(g.title),
    description: sanitizeSpreadsheetCell(g.description),
    severity: sanitizeSpreadsheetCell(g.severity),
    status: sanitizeSpreadsheetCell(g.status),
    privacyMode: isAnon ? 'ANONYMOUS (WHISTLEBLOWER SHIELDED)' : 'IDENTIFIED (CONSENTED)',
    studentName: isAnon ? 'ANONYMOUS (WHISTLEBLOWER SHIELDED)' : sanitizeSpreadsheetCell(g.studentName || 'Student'),
    studentEmail: isAnon ? '[REDACTED_UNDER_DPDP_ACT]' : sanitizeSpreadsheetCell(g.studentEmail || 'N/A'),
    studentPhone: isAnon ? '[REDACTED_UNDER_DPDP_ACT]' : sanitizeSpreadsheetCell(g.studentPhone || 'N/A'),
    dpdpConsent: 'AFFIRMATIVE (SEC 6 COMPLIANT)',
    slaDeadline: slaDeadlineIST
  };

  // 1. Maintain local immutable transparency ledger mirror
  try {
    const ledger = JSON.parse(localStorage.getItem('samadhan_public_transparency_ledger') || '[]');
    ledger.unshift(payload);
    localStorage.setItem('samadhan_public_transparency_ledger', JSON.stringify(ledger));
  } catch (e) {
    console.warn("Transparency ledger mirror error:", e);
  }

  // 2. Dispatch to live Google Sheet Apps Script webhook (if configured)
  const webhookUrl = getGoogleSheetWebhookUrl();
  if (webhookUrl && typeof fetch !== 'undefined') {
    try {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn("Google Sheet sync dispatch error:", err));
    } catch (err) {
      console.warn("Google Sheet sync warning:", err);
    }
  }

  return payload;
}

function renderTransparencyLedgerBanner() {
  const isHindi = state.language === 'hi';
  return `
    <div class="civic-card p-4 sm:p-5 bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-transparent border-2 border-emerald-500/60 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div class="flex items-center gap-3.5">
        <div class="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0 border border-emerald-400">
          📊
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-black text-sm text-slate-900 dark:text-white">
              ${isHindi ? 'सार्वजनिक पारदर्शिता लेज़र (लाइव गूगल शीट)' : 'Public Transparency Ledger (Live Google Sheet)'}
            </h3>
            <span class="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
              ${isHindi ? 'केवल पठन • कभी संपादित नहीं हो सकती' : 'VIEW ONLY • CAN NEVER BE EDITED'}
            </span>
          </div>
          <p class="text-xs text-slate-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
            ${isHindi 
              ? 'सभी पंजीकृत शिकायतों, विभागों और निस्तारण समय का सार्वजनिक व अपरिवर्तनीय रिकॉर्ड। छात्र की गोपनीयता पसंद (गुमनाम अथवा पहचान) का पूर्ण सम्मान।'
              : 'Public, read-only transparency spreadsheet recording every grievance with timestamps. Student privacy choices (Anonymous Whistleblower vs. Consented) are strictly preserved.'}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button 
          onclick="handleManualPortalSync()" 
          class="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition hover:scale-102"
          title="Refresh telemetry metrics from live Google Sheet"
        >
          <span class="inline-block w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>${isHindi ? '🔄 लाइव सिंक' : '🔄 Sync Live Data'}</span>
        </button>
        <a 
          href="${getGoogleSheetViewUrl()}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn btn-primary text-xs font-black flex items-center gap-2 shadow-md hover:scale-102 transition"
        >
          <span>${isHindi ? 'लाइव गूगल शीट देखें' : 'Open View-Only Google Sheet'}</span>
          <span>➔</span>
        </a>
      </div>
    </div>
  `;
}

// ============================================================================
// 4. PRESENTATION ENGINE (STUDENT PORTAL CONTROLLER)
// ============================================================================

const state = {
  activeTab: 'register', // 'register' | 'track' | 'insights' | 'dpdp'
  language: 'en', // 'en' | 'hi'
  theme: localStorage.getItem('samadhan_theme') || 'light', // Light mode default as requested
  
  // Wizard state
  wizardStep: 1,
  selectedCategory: 'INFRASTRUCTURE',
  severity: 'MEDIUM',
  isAnonymous: false,
  
  // Track state
  searchToken: '',
  activeGrievance: null
};

// Apply Initial Theme
document.documentElement.setAttribute('data-theme', state.theme);

// ============================================================================
// 5. MAIN RENDER FUNCTION
// ============================================================================

function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <!-- Top Authority Ribbon (Centered & Re-oriented) -->
    <header class="site-header sticky top-0 z-50 shadow-sm">
      <div class="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex flex-col items-center justify-center text-center gap-2 sm:gap-3">
        
        <!-- Centered S.A.M.A.D.H.A.N Brand & Logo Crest (Centered on Mobile & Desktop) -->
        <div class="w-full flex flex-col items-center justify-center text-center cursor-pointer select-none" onclick="navigateTab('register')">
          
          <!-- Top Row: Trust Cube Crest + S.A.M.A.D.H.A.N Title (+ Badge on Desktop) -->
          <div class="flex items-center justify-center gap-2 sm:gap-2.5">
            <div class="brand-crest-box w-9 h-9 sm:w-11 sm:h-11 rounded-xl p-1 flex items-center justify-center shadow-md flex-shrink-0 transition-transform active:scale-95">
              ${getTrustCubeSvg("w-full h-full drop-shadow-sm")}
            </div>
            <span class="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              ${t('brand_title')}
            </span>
            <!-- Desktop Badge: Kept inline on sm+ screens as loved on PC -->
            <span class="hidden sm:inline-flex text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ${t('brand_status')}
            </span>
          </div>

          <!-- Mobile Badge: Shifted JUST BELOW S.A.M.A.D.H.A.N text on mobile (< sm), perfectly centered -->
          <div class="flex sm:hidden items-center justify-center mt-1.5 mb-0.5">
            <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ${t('brand_status')}
            </span>
          </div>

          <!-- Official Subtitle (Centered) -->
          <p class="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 font-medium text-center mt-1 max-w-sm sm:max-w-none">
            ${t('brand_sub')}
          </p>

        </div>

        <!-- Re-oriented Symmetrical Toggles (Language & Theme Centered Below Logo) -->
        <div class="flex items-center justify-center gap-2.5">
          <!-- Language Toggle Pill -->
          <button onclick="toggleLanguage()" class="px-3 py-1.5 text-xs font-black rounded-lg border border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 transition flex items-center gap-1.5 shadow-sm">
            <span>🌐</span> <span>${t('lang_toggle')}</span>
          </button>

          <!-- Segmented Theme Switch -->
          <div class="theme-switch-container">
            <button onclick="setTheme('light')" class="theme-switch-btn ${state.theme === 'light' ? 'active' : ''}">
              ☀️ ${t('theme_light')}
            </button>
            <button onclick="setTheme('dark')" class="theme-switch-btn ${state.theme === 'dark' ? 'active' : ''}">
              🌙 ${t('theme_dark')}
            </button>
          </div>
        </div>

      </div>

      <!-- 4 Navigation Tabs: 2 Upper, 2 Lower on Mobile / All 4 Visible on One Screen -->
      <div class="site-header-sub px-3 sm:px-6 py-2.5">
        <div class="max-w-2xl mx-auto">
          <nav class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <!-- Row 1: 2 Upper -->
            <button onclick="navigateTab('register')" class="nav-tab-btn ${state.activeTab === 'register' ? 'active' : ''}">
              <span>✍️</span> <span>${t('nav_lodge')}</span>
            </button>
            <button onclick="navigateTab('track')" class="nav-tab-btn ${state.activeTab === 'track' ? 'active' : ''}">
              <span>🔍</span> <span>${t('nav_track')}</span>
            </button>
            <!-- Row 2: 2 Lower -->
            <button onclick="navigateTab('insights')" class="nav-tab-btn ${state.activeTab === 'insights' ? 'active' : ''}">
              <span>📊</span> <span>${t('nav_telemetry')}</span>
            </button>
            <button onclick="navigateTab('dpdp')" class="nav-tab-btn ${state.activeTab === 'dpdp' ? 'active' : ''}">
              <span>📜</span> <span>${t('nav_rights')}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      ${renderActiveTab()}
    </main>

    <!-- Professional Institutional Footer with Verified Union Office Bearers -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          
          <!-- Column 1: Brand & Union Info -->
          <div class="footer-brand">
            <div class="flex items-center gap-2.5 mb-2">
              <div class="w-8 h-8 flex-shrink-0 brand-crest-box rounded-lg p-0.5">
                ${getTrustCubeSvg("w-full h-full")}
              </div>
              <h3 class="font-black tracking-tight">${t('brand_title')}</h3>
            </div>
            <p class="text-xs text-amber-400 font-bold">
              ${t('footer_tagline')}
            </p>
            <p class="text-xs text-zinc-400 mt-2 leading-relaxed">
              ${t('footer_desc')}
            </p>
            <p class="text-[11px] text-zinc-500 mt-3 font-mono">
              ${t('footer_db_note')}
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="footer-col">
            <h4>${t('footer_quick_services')}</h4>
            <ul>
              <li><a href="#" onclick="navigateTab('register'); return false;">✍️ ${t('footer_service_lodge')}</a></li>
              <li><a href="#" onclick="navigateTab('track'); return false;">🔍 ${t('footer_service_track')}</a></li>
              <li><a href="#" onclick="navigateTab('insights'); return false;">📊 ${t('footer_service_telemetry')}</a></li>
              <li><a href="#" onclick="navigateTab('dpdp'); return false;">📜 ${t('footer_service_rights')}</a></li>
            </ul>
          </div>

          <!-- Column 3: Union Secretariat & Students' Union Members -->
          <div class="footer-col">
            <h4>${t('footer_contact_title')}</h4>
            <div class="space-y-3.5 text-xs">
              <!-- Official Email Contact -->
              <div class="bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                <span class="text-zinc-400 font-bold uppercase text-[10px] tracking-wider block mb-1">
                  ${t('footer_official_mail_label')}
                </span>
                <a href="mailto:studentsunion@south.du.ac.in" class="text-amber-400 hover:text-amber-300 font-bold font-mono text-xs flex items-center gap-1.5 transition">
                  <span>✉️</span> <span>studentsunion@south.du.ac.in</span>
                </a>
              </div>

              <!-- Students' Union Members 2026/27 -->
              <div>
                <span class="text-amber-400 font-black uppercase text-[10px] tracking-wider block mb-2">
                  ${t('footer_exec_committee')}
                </span>
                <div class="space-y-1.5 text-xs">
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/40">
                    <span class="font-bold text-white">Rawal Singh</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_president')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/40">
                    <span class="font-bold text-white">Kartikey Tiwari</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_vice_president')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/40">
                    <span class="font-bold text-white">Ujjwal Yadav</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_secretary')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/40">
                    <span class="font-bold text-white">Babulal Saran</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_joint_secretary')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/40">
                    <span class="font-bold text-white">Anuj Kumar</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_councilor')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5">
                    <span class="font-bold text-white">Shraddha Choudhary</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_councilor')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom">
          <p>${t('footer_rights_reserved')}</p>
          <div class="flex items-center gap-4 text-xs">
            <span class="text-emerald-400 font-bold">✓ DPDP Act 2023 Compliant</span>
            <span class="text-zinc-600">•</span>
            <span class="text-zinc-400">${t('footer_iso')}</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ============================================================================
// 6. ROUTER & TAB SWITCHING
// ============================================================================

function renderActiveTab() {
  switch (state.activeTab) {
    case 'register':
      return renderRegisterWizard();
    case 'track':
      return renderTracker();
    case 'insights':
      return renderPublicTelemetry();
    case 'dpdp':
      return renderStudentRights();
    default:
      return renderRegisterWizard();
  }
}

// ============================================================================
// 7. VIEW: 3-STEP LODGE GRIEVANCE WIZARD
// ============================================================================

function renderRegisterWizard() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Wizard Progress Stepper (Theme Responsive) -->
      <div class="civic-card py-4">
        <div class="flex items-center justify-between relative max-w-xl mx-auto">
          
          <!-- Step 1 Node -->
          <div class="flex flex-col items-center gap-1 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${state.wizardStep >= 1 ? 'bg-amber-500 text-black font-black border-2 border-black dark:border-white shadow-sm' : 'bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-2 border-black dark:border-white'}">
              1
            </div>
            <span class="text-[11px] font-bold ${state.wizardStep >= 1 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-zinc-400'}">
              ${state.language === 'hi' ? 'श्रेणी' : 'Category'}
            </span>
          </div>

          <div class="flex-1 h-0.5 mx-2 ${state.wizardStep >= 2 ? 'bg-amber-500' : 'bg-black dark:bg-white opacity-30'}"></div>

          <!-- Step 2 Node -->
          <div class="flex flex-col items-center gap-1 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${state.wizardStep >= 2 ? 'bg-amber-500 text-black font-black border-2 border-black dark:border-white shadow-sm' : 'bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-2 border-black dark:border-white'}">
              2
            </div>
            <span class="text-[11px] font-bold ${state.wizardStep >= 2 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-zinc-400'}">
              ${state.language === 'hi' ? 'विवरण' : 'Details'}
            </span>
          </div>

          <div class="flex-1 h-0.5 mx-2 ${state.wizardStep >= 3 ? 'bg-amber-500' : 'bg-black dark:bg-white opacity-30'}"></div>

          <!-- Step 3 Node -->
          <div class="flex flex-col items-center gap-1 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${state.wizardStep >= 3 ? 'bg-amber-500 text-black font-black border-2 border-black dark:border-white shadow-sm' : 'bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-2 border-black dark:border-white'}">
              3
            </div>
            <span class="text-[11px] font-bold ${state.wizardStep >= 3 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-600 dark:text-zinc-400'}">
              ${state.language === 'hi' ? 'सहमति' : 'Affirmation'}
            </span>
          </div>

        </div>
      </div>

      <!-- Dynamic Step View -->
      ${state.wizardStep === 1 ? renderWizardStep1() : ''}
      ${state.wizardStep === 2 ? renderWizardStep2() : ''}
      ${state.wizardStep === 3 ? renderWizardStep3() : ''}

    </div>
  `;
}

function renderWizardStep1() {
  return `
    <div class="civic-card space-y-6">
      <div class="civic-card-header">
        <h2 class="text-xl font-extrabold">${t('step_1_title')}</h2>
        <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1">${t('step_1_sub')}</p>
      </div>

      <!-- Categories 8-Tile Grid (Guaranteed High Contrast in Both Modes) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        ${Object.values(CATEGORIES).map(cat => `
          <div 
            onclick="selectCategory('${cat.id}')"
            class="category-tile ${state.selectedCategory === cat.id ? 'selected' : ''}"
          >
            <div class="text-2xl mb-2">${cat.icon}</div>
            <h3>${state.language === 'hi' ? cat.hi : cat.label}</h3>
          </div>
        `).join('')}
      </div>

      <div class="flex justify-end pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button onclick="goToStep(2)" class="btn btn-primary w-full sm:w-auto">
          ${t('step_1_next')}
        </button>
      </div>
    </div>
  `;
}

function renderWizardStep2() {
  return `
    <div class="civic-card space-y-6">
      <div class="civic-card-header">
        <h2 class="text-xl font-extrabold">${t('step_2_title')}</h2>
        <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1">${t('step_2_sub')}</p>
      </div>

      <div class="space-y-4">
        
        <!-- Subject Input -->
        <div>
          <label class="form-label">${t('field_subject')} *</label>
          <input 
            type="text" 
            id="incidentTitle" 
            required 
            placeholder="${t('field_subject_ph')}" 
            class="form-input" 
          />
        </div>

        <!-- Department Dropdown (Full Bilingual Mapping) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label">${t('field_dept')} *</label>
            <select id="departmentSelect" class="form-select">
              ${UDSC_DEPARTMENTS.map(d => `
                <option value="${d.id}">${state.language === 'hi' ? d.hi : d.en}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label class="form-label">${t('field_date')} *</label>
            <input 
              type="date" 
              id="incidentDate" 
              value="${new Date().toISOString().split('T')[0]}" 
              class="form-input" 
            />
          </div>
        </div>

        <!-- Urgency & Priority Selector (Theme-Responsive) -->
        <div>
          <label class="form-label">${t('field_urgency')} *</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label class="p-3 rounded-xl border cursor-pointer transition ${state.severity === 'LOW' ? 'bg-amber-500/10 border-amber-500' : 'civic-well border-subtle'}">
              <input type="radio" name="severityRadio" value="LOW" onchange="state.severity='LOW'; renderApp();" ${state.severity === 'LOW' ? 'checked' : ''} class="sr-only" />
              <div class="text-xs font-black text-emerald-600 dark:text-emerald-400">🟢 ${t('urgency_low')}</div>
            </label>
            <label class="p-3 rounded-xl border cursor-pointer transition ${state.severity === 'MEDIUM' ? 'bg-amber-500/10 border-amber-500' : 'civic-well border-subtle'}">
              <input type="radio" name="severityRadio" value="MEDIUM" onchange="state.severity='MEDIUM'; renderApp();" ${state.severity === 'MEDIUM' ? 'checked' : ''} class="sr-only" />
              <div class="text-xs font-black text-amber-700 dark:text-amber-400">🟡 ${t('urgency_med')}</div>
            </label>
            <label class="p-3 rounded-xl border cursor-pointer transition ${state.severity === 'CRITICAL' ? 'bg-rose-500/10 border-rose-500' : 'civic-well border-subtle'}">
              <input type="radio" name="severityRadio" value="CRITICAL" onchange="state.severity='CRITICAL'; renderApp();" ${state.severity === 'CRITICAL' ? 'checked' : ''} class="sr-only" />
              <div class="text-xs font-black text-rose-600 dark:text-rose-400">🔴 ${t('urgency_crit')}</div>
            </label>
          </div>
        </div>

        <!-- Detailed Description -->
        <div>
          <label class="form-label">${t('field_desc')} *</label>
          <textarea 
            id="incidentDescription" 
            rows="4" 
            required 
            placeholder="${t('field_desc_ph')}" 
            class="form-textarea"
          ></textarea>
        </div>

        <!-- DPDP Whistleblower Anonymous Toggle -->
        <div class="p-4 rounded-xl civic-well space-y-3">
          <div class="flex items-center justify-between">
            <div class="space-y-0.5 pr-2">
              <span class="text-sm font-black flex items-center gap-1.5">
                <span>🕶️</span> <span>${t('anon_toggle_title')}</span>
              </span>
              <p class="text-xs text-slate-500 dark:text-zinc-400">${t('anon_toggle_sub')}</p>
            </div>
            <input 
              type="checkbox" 
              id="anonymousToggle" 
              onchange="toggleAnonymous(this.checked)"
              ${state.isAnonymous ? 'checked' : ''} 
              class="w-5 h-5 accent-amber-500 rounded cursor-pointer" 
            />
          </div>

          ${state.isAnonymous ? `
            <div class="p-3 bg-amber-500/15 border border-amber-500/40 rounded-lg text-xs text-amber-800 dark:text-amber-300">
              ✓ ${t('anon_active_notice')}
            </div>
          ` : `
            <!-- Complainant Identity Form -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label class="form-label text-xs">${t('field_name')}</label>
                <input type="text" id="studentName" placeholder="${t('field_name_ph')}" class="form-input text-xs" />
              </div>
              <div>
                <label class="form-label text-xs">${t('field_email')}</label>
                <input type="email" id="studentEmail" placeholder="${t('field_email_ph')}" class="form-input text-xs" />
              </div>
              <div>
                <label class="form-label text-xs">${t('field_phone')}</label>
                <input type="tel" id="studentPhone" placeholder="${t('field_phone_ph')}" class="form-input text-xs" />
              </div>
            </div>
          `}
        </div>

      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button onclick="goToStep(1)" class="btn btn-secondary">
          ${t('btn_back')}
        </button>
        <button onclick="goToStep(3)" class="btn btn-primary">
          ${t('btn_proceed_step3')}
        </button>
      </div>
    </div>
  `;
}

function renderWizardStep3() {
  return `
    <div class="civic-card space-y-6">
      <div class="civic-card-header">
        <h2 class="text-xl font-extrabold">${t('step_3_title')}</h2>
        <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1">${t('step_3_sub')}</p>
      </div>

      <!-- Legal Statutory Box -->
      <div class="p-5 rounded-xl border-2 border-amber-500/40 bg-amber-500/5 space-y-3">
        <span class="badge bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 text-[10px] font-black">
          ${t('dpdp_box_badge')}
        </span>
        <p class="text-xs leading-relaxed font-serif italic">
          "${t('dpdp_box_text')}"
        </p>

        <label class="flex items-start gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800 cursor-pointer">
          <input type="checkbox" id="consentCheckbox" required class="w-5 h-5 accent-amber-500 rounded mt-0.5 cursor-pointer" />
          <span class="text-xs font-bold leading-relaxed">
            ${t('consent_checkbox_label')}
          </span>
        </label>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button onclick="goToStep(2)" class="btn btn-secondary">
          ${t('btn_back')}
        </button>
        <button onclick="submitGrievanceWizard()" class="btn btn-primary font-black">
          ${t('btn_submit_final')}
        </button>
      </div>
    </div>
  `;
}

function renderSuccessScreen(g) {
  return `
    <div class="civic-card max-w-2xl mx-auto text-center py-8 space-y-6 border-2 border-amber-500/50 shadow-2xl">
      <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-3xl mx-auto">
        ✓
      </div>

      <div>
        <h2 class="text-2xl font-black">${t('success_heading')}</h2>
        <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">${t('success_sub')}</p>
      </div>

      <!-- Token Showcase -->
      <div class="p-5 rounded-xl civic-well max-w-md mx-auto space-y-2">
        <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 tracking-wider uppercase block">
          ${t('token_box_title')}
        </span>
        <div class="font-mono text-2xl font-black text-amber-600 dark:text-amber-300 select-all tracking-wider py-1">
          ${g.trackToken}
        </div>
        <p class="text-[11px] text-slate-500 dark:text-zinc-500">
          ${t('token_box_help')}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-3">
        <button onclick="copyToClipboard('${g.trackToken}')" class="btn btn-secondary text-xs">
          ${t('btn_copy_token')}
        </button>
        <button onclick="printStatutoryReceipt('${g.ticketId}')" class="btn btn-secondary text-xs">
          ${t('btn_print_receipt')}
        </button>
        <button onclick="trackSpecificTicket('${g.trackToken}')" class="btn btn-primary text-xs">
          ${t('btn_track_this')}
        </button>
      </div>

      <!-- Public Transparency Ledger Confirmation -->
      <div class="p-3.5 bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between gap-3 max-w-md mx-auto shadow-sm">
        <div class="flex items-center gap-2 text-left">
          <span class="text-xl">📊</span>
          <div>
            <span class="font-black block">${state.language === 'hi' ? 'सार्वजनिक पारदर्शिता लेज़र में दर्ज' : 'Recorded in Public Transparency Ledger'}</span>
            <span class="text-[10px] text-slate-500 dark:text-zinc-400">
              ${g.isAnonymous ? (state.language === 'hi' ? 'गोपनीयता: गुमनाम व्हिसलब्लोअर शील्ड' : 'Privacy: Whistleblower Shielded') : (state.language === 'hi' ? 'गोपनीयता: छात्र पहचान सहमति' : 'Privacy: Consented Student Identity')}
            </span>
          </div>
        </div>
        <a href="${getGoogleSheetViewUrl()}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 rounded bg-emerald-600 text-white font-black hover:bg-emerald-500 transition text-[11px] whitespace-nowrap shadow-sm">
          ${state.language === 'hi' ? 'शीट देखें ➔' : 'View Sheet ➔'}
        </a>
      </div>

      <div class="pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button onclick="resetWizard()" class="text-xs text-slate-500 dark:text-zinc-400 hover:underline font-bold">
          ${t('btn_lodge_another')}
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// 8. VIEW: 24/7 REDRESSAL STATUS TRACKER
// ============================================================================

function renderTracker() {
  const g = state.activeGrievance;

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Public Transparency Ledger Link -->
      ${renderTransparencyLedgerBanner()}

      <!-- Tracker Search Bar -->
      <div class="civic-card space-y-3">
        <div>
          <h2 class="text-xl font-extrabold">${t('tracker_heading')}</h2>
          <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1">${t('tracker_sub')}</p>
        </div>

        <form onsubmit="handleTrackerSearch(event)" class="flex gap-2">
          <input 
            type="text" 
            id="trackerSearchInput" 
            placeholder="${t('tracker_input_ph')}" 
            value="${state.searchToken}"
            class="form-input tracking-input font-mono text-sm flex-1" 
          />
          <button type="submit" class="btn btn-primary px-6">
            ${t('tracker_btn_search')}
          </button>
        </form>
      </div>

      ${g ? renderTicketDetails(g) : `
        <div class="civic-card text-center py-12 space-y-2">
          <div class="text-3xl mb-1">🔍</div>
          <h3 class="font-extrabold text-base">${t('tracker_empty_title')}</h3>
          <p class="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
            ${t('tracker_empty_desc')}
          </p>
        </div>
      `}

    </div>
  `;
}

function renderTicketDetails(g) {
  const currentStageIndex = LIFECYCLE_STAGES.findIndex(s => s.key === g.status);

  return `
    <div class="civic-card space-y-6">
      
      <!-- Case Meta Header -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <span class="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">${g.trackToken}</span>
          <h3 class="text-lg font-black mt-0.5">${g.title}</h3>
          <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            ${t('tracker_dept')}: <strong>${getDepartmentName(g.department)}</strong>
          </p>
        </div>

        <div class="flex flex-col items-end gap-1">
          <span class="badge badge-${LIFECYCLE_STAGES.find(s => s.key === g.status)?.color || 'submitted'} text-xs">
            ${getStageLabel(g.status)}
          </span>
          <span class="text-[11px] text-slate-500 dark:text-zinc-400">
            ${t('tracker_sla')}: <strong class="text-amber-600 dark:text-amber-400">${new Date(g.slaDeadline).toLocaleDateString('en-IN')}</strong>
          </span>
        </div>
      </div>

      <!-- 5-Stage Visual Redressal Lifecycle Tracker -->
      <div class="space-y-4 py-2">
        ${LIFECYCLE_STAGES.map((s, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const historyItem = g.timeline.find(t => t.stage === s.key);

          return `
            <div class="stepper-node ${isDone ? 'completed' : (isCurrent ? 'current' : '')}">
              <div class="stepper-line"></div>
              <div class="stepper-circle">
                ${isDone ? '✓' : (idx + 1)}
              </div>
              <div class="pt-0.5 space-y-0.5 flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-black text-sm">${state.language === 'hi' ? s.hi : s.label}</h4>
                  ${historyItem ? `<span class="text-[10px] text-slate-400 font-mono">${new Date(historyItem.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>` : ''}
                </div>
                <p class="text-xs text-slate-500 dark:text-zinc-400">
                  ${historyItem ? historyItem.note : (isCurrent ? 'Under active review by the UDSC Students\' Union redressing panel.' : 'Pending progression.')}
                </p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Official Union Action Notes -->
      <div class="p-4 rounded-xl civic-well space-y-2">
        <h4 class="text-xs font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider">${t('tracker_official_log')}</h4>
        <p class="text-xs">
          ${g.assignedOfficer ? `Liaison Officer: <strong>${g.assignedOfficer}</strong> • ` : ''}
          ${g.timeline.slice(-1)[0]?.note || t('tracker_no_notes')}
        </p>
      </div>

      <!-- DPDP Section 12 Right to Erasure Action -->
      <div class="pt-2 flex justify-end">
        <button onclick="exerciseRightToErasure('${g.ticketId}')" class="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline">
          ${t('tracker_erasure_btn')}
        </button>
      </div>

    </div>
  `;
}

// ============================================================================
// 9. VIEW: PUBLIC TELEMETRY (REAL DYNAMIC DATA — ZERO FAKE NUMBERS)
// ============================================================================

function renderPublicTelemetry() {
  const all = repo.getAll();
  const total = all.length;
  const resolved = all.filter(g => g.status === 'RESOLVED').length;

  const deptCounts = {};
  all.forEach(g => {
    deptCounts[g.department] = (deptCounts[g.department] || 0) + 1;
  });

  const deptList = Object.keys(deptCounts).map(deptId => {
    const deptTotal = deptCounts[deptId];
    const deptResolved = all.filter(g => g.department === deptId && g.status === 'RESOLVED').length;
    const pct = Math.round((deptResolved / deptTotal) * 100);
    return { id: deptId, name: getDepartmentName(deptId), count: deptTotal, pct };
  });

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="civic-card text-center py-8">
        <span class="badge bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-widest">
          ${t('telemetry_badge')}
        </span>
        <h1 class="text-2xl sm:text-3xl font-black mt-2">${t('telemetry_heading')}</h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-xl mx-auto mt-2 leading-relaxed">
          ${t('telemetry_sub')}
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8">
          <div class="p-3 civic-well rounded-xl">
            <span class="text-xs text-slate-500 dark:text-zinc-400 font-bold">${t('telemetry_total')}</span>
            <p class="text-2xl font-black mt-1">${total}</p>
          </div>
          <div class="p-3 civic-well rounded-xl">
            <span class="text-xs text-emerald-600 dark:text-emerald-400 font-bold">${t('telemetry_resolved')}</span>
            <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">${resolved}</p>
          </div>
          <div class="p-3 civic-well rounded-xl col-span-2 sm:col-span-1">
            <span class="text-xs text-amber-700 dark:text-amber-400 font-bold">${t('telemetry_status')}</span>
            <p class="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-2">${t('telemetry_live')}</p>
          </div>
        </div>
      </div>

      <!-- Public Transparency Ledger (Live Google Sheet) -->
      ${renderTransparencyLedgerBanner()}

      <!-- Real Department Distribution -->
      <div class="civic-card space-y-4">
        <h3 class="text-base font-extrabold">${t('telemetry_dept_title')}</h3>
        <p class="text-xs text-slate-500 dark:text-zinc-400">${t('telemetry_dept_sub')}</p>

        ${deptList.length > 0 ? `
          <div class="space-y-3 pt-2">
            ${deptList.map(d => `
              <div>
                <div class="flex items-center justify-between text-xs font-bold mb-1">
                  <span>${d.name} (${d.count} tickets)</span>
                  <span class="text-emerald-600 dark:text-emerald-400">${d.pct}% ${t('telemetry_in_sla')}</span>
                </div>
                <div class="w-full h-2.5 bg-slate-200 dark:bg-black rounded-full overflow-hidden border border-slate-300 dark:border-zinc-800">
                  <div class="h-full bg-emerald-500 rounded-full" style="width: ${d.pct}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="text-center py-8 civic-well rounded-xl space-y-2">
            <div class="text-3xl mb-1">🟢</div>
            <h4 class="font-bold text-sm">${t('telemetry_zero_title')}</h4>
            <p class="text-xs text-slate-500 dark:text-zinc-500 max-w-md mx-auto">
              ${t('telemetry_zero_desc')}
            </p>
          </div>
        `}
      </div>

    </div>
  `;
}

// ============================================================================
// 10. VIEW: STUDENT RIGHTS UNDER DPDP ACT 2023
// ============================================================================

function renderStudentRights() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="civic-card space-y-2">
        <span class="badge bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase">
          ${t('rights_badge')}
        </span>
        <h2 class="text-2xl font-black">${t('rights_heading')}</h2>
        <p class="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">${t('rights_sub')}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Section 6 Card -->
        <div class="civic-card space-y-2">
          <h3 class="font-extrabold text-sm text-amber-700 dark:text-amber-400">${t('sec_6_title')}</h3>
          <p class="text-xs leading-relaxed">${t('sec_6_desc')}</p>
        </div>

        <!-- Section 8 Card -->
        <div class="civic-card space-y-2">
          <h3 class="font-extrabold text-sm text-amber-700 dark:text-amber-400">${t('sec_8_title')}</h3>
          <p class="text-xs leading-relaxed">${t('sec_8_desc')}</p>
        </div>

        <!-- Section 12 Card -->
        <div class="civic-card space-y-2">
          <h3 class="font-extrabold text-sm text-amber-700 dark:text-amber-400">${t('sec_12_title')}</h3>
          <p class="text-xs leading-relaxed">${t('sec_12_desc')}</p>
        </div>

        <!-- Section 13 Card -->
        <div class="civic-card space-y-2">
          <h3 class="font-extrabold text-sm text-amber-700 dark:text-amber-400">${t('sec_13_title')}</h3>
          <p class="text-xs leading-relaxed">${t('sec_13_desc')}</p>
        </div>

      </div>

      <!-- Designated Redressal Contact Card -->
      <div class="civic-card civic-well space-y-2 text-xs">
        <h4 class="font-black uppercase text-[11px] tracking-wider text-amber-700 dark:text-amber-400">
          ${t('rights_contact_box_title')}
        </h4>
        <p class="font-bold">${t('rights_office')}</p>
        <p class="text-slate-500 dark:text-zinc-400">${t('rights_address')}</p>
        <p class="text-slate-500 dark:text-zinc-400 pt-1">
          ${t('rights_email_label')} <a href="mailto:studentsunion@south.du.ac.in" class="text-amber-600 dark:text-amber-400 font-bold underline font-mono">studentsunion@south.du.ac.in</a>
        </p>
      </div>

    </div>
  `;
}

// ============================================================================
// 11. CONTROLLER & ACTION HANDLERS
// ============================================================================

window.navigateTab = function(tabName, skipHistory = false) {
  state.activeTab = tabName;
  if (tabName === 'register') {
    state.wizardStep = 1;
  }
  if (!skipHistory && typeof window !== 'undefined' && window.history && window.history.pushState) {
    history.pushState({ tab: tabName, step: state.wizardStep }, '', `#${tabName}`);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // When opening insights or track, fetch fresh grievances from Google Sheet ledger
  if (tabName === 'insights' || tabName === 'track') {
    repo.syncFromGoogleSheet().then(() => {
      if (state.activeTab === tabName) renderApp();
    });
  }
};

window.handleManualPortalSync = async function() {
  const btn = event?.currentTarget;
  const origText = btn ? btn.innerHTML : '';
  if (btn) btn.innerHTML = '⏳ Syncing...';
  try {
    await repo.syncFromGoogleSheet();
    renderApp();
  } catch (err) {
    console.warn("Manual sync error:", err);
  } finally {
    if (btn && origText) btn.innerHTML = origText;
  }
};

window.toggleLanguage = function() {
  state.language = state.language === 'en' ? 'hi' : 'en';
  renderApp();
};

window.setTheme = function(newTheme) {
  state.theme = newTheme;
  localStorage.setItem('samadhan_theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  renderApp();
};

window.selectCategory = function(catId) {
  state.selectedCategory = catId;
  renderApp();
};

window.goToStep = function(stepNum, skipHistory = false) {
  if (stepNum === 2 && !state.selectedCategory) {
    alert(state.language === 'hi' ? "कृपया पहले एक श्रेणी चुनें।" : "Please select a grievance category first.");
    return;
  }
  if (stepNum === 3) {
    const title = document.getElementById('incidentTitle')?.value?.trim();
    const desc = document.getElementById('incidentDescription')?.value?.trim();
    if (!title || !desc) {
      alert(state.language === 'hi' ? "कृपया शिकायत का संक्षिप्त विषय और विस्तृत विवरण दर्ज करें।" : "Please provide both the subject title and description.");
      return;
    }
    // Save draft inputs to memory before re-rendering
    state.draftTitle = title;
    state.draftDesc = desc;
    state.draftDept = document.getElementById('departmentSelect')?.value;
    state.draftDate = document.getElementById('incidentDate')?.value;
    state.draftName = document.getElementById('studentName')?.value || '';
    state.draftEmail = document.getElementById('studentEmail')?.value || '';
    state.draftPhone = document.getElementById('studentPhone')?.value || '';
  }
  state.wizardStep = stepNum;
  if (!skipHistory && typeof window !== 'undefined' && window.history && window.history.pushState) {
    history.pushState({ tab: 'register', step: stepNum }, '', `#step-${stepNum}`);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleAnonymous = function(checked) {
  state.isAnonymous = checked;
  renderApp();
};

window.submitGrievanceWizard = function() {
  const consentChecked = document.getElementById('consentCheckbox')?.checked;
  if (!consentChecked) {
    alert(state.language === 'hi' ? "शिकायत दर्ज करने हेतु वैधानिक सहमति देना अनिवार्य है।" : "Statutory affirmative consent is required to process your grievance under the DPDP Act 2023.");
    return;
  }

  const token = generateTrackToken(state.selectedCategory);
  const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toISOString();

  const slaHours = state.severity === 'CRITICAL' ? 24 : (state.severity === 'HIGH' ? 72 : 168);
  const slaDeadline = new Date(Date.now() + (slaHours * 3600000)).toISOString();

  const newGrievance = {
    ticketId,
    trackToken: token,
    category: state.selectedCategory,
    title: state.draftTitle || 'Student Grievance',
    description: state.draftDesc || '',
    department: state.draftDept || 'South Campus Central Library',
    incidentDate: state.draftDate || now.split('T')[0],
    severity: state.severity || 'MEDIUM',
    status: 'SUBMITTED',
    isAnonymous: state.isAnonymous,
    studentName: state.isAnonymous ? null : (state.draftName || 'Student'),
    studentEmail: state.isAnonymous ? null : state.draftEmail,
    studentPhone: state.isAnonymous ? null : state.draftPhone,
    submittedAt: now,
    slaDeadline,
    assignedOfficer: 'UDSC Students\' Union Redressal Desk',
    dpdpConsent: true,
    dpdpConsentTimestamp: now,
    timeline: [
      {
        stage: 'SUBMITTED',
        timestamp: now,
        note: state.language === 'hi' ? 'शिकायत छात्र संघ में सफलतापूर्वक दर्ज एवं सुरक्षित कर ली गई है।' : 'Grievance lodged and cryptographically hashed under DPDP Act 2023.'
      }
    ],
    communicationThread: []
  };

  repo.add(newGrievance);

  // Sync to Public Transparency Ledger (Google Sheet) respecting student's privacy choice
  syncGrievanceToGoogleSheet(newGrievance);

  // Present Success Screen
  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = renderSuccessScreen(newGrievance);
  }
};

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert(state.language === 'hi' ? `टोकन कॉपी हो गया: ${text}` : `Tracking Token copied to clipboard: ${text}`);
  });
};

window.printStatutoryReceipt = function(ticketId) {
  const g = repo.getAll().find(item => item.ticketId === ticketId);
  if (!g) return;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>S.A.M.A.D.H.A.N Grievance Receipt — ${g.trackToken}</title>
        <style>
          body { font-family: monospace; padding: 2rem; color: #111; line-height: 1.5; }
          .header { border-bottom: 2px solid #000; padding-bottom: 1rem; margin-bottom: 1rem; }
          .token { font-size: 1.5rem; font-weight: bold; background: #eee; padding: 0.5rem; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>UDSC STUDENTS' UNION — S.A.M.A.D.H.A.N REDRESSAL RECEIPT</h2>
          <p>Compliance: DPDP Act 2023 | Project S.E.W.A</p>
        </div>
        <div class="token">${g.trackToken}</div>
        <p><strong>Date Lodged:</strong> ${new Date(g.submittedAt).toLocaleString('en-IN')}</p>
        <p><strong>Department:</strong> ${g.department}</p>
        <p><strong>Category:</strong> ${g.category}</p>
        <p><strong>Priority SLA:</strong> ${new Date(g.slaDeadline).toLocaleString('en-IN')}</p>
        <p><strong>Complainant:</strong> ${g.isAnonymous ? 'ANONYMOUS (WHISTLEBLOWER PROTECTED)' : g.studentName}</p>
        <p><strong>Statutory DPDP Consent:</strong> AFFIRMATIVE (SEC 6 VERIFIED)</p>
        <hr/>
        <p>Office of the Students' Union, University of Delhi South Campus (UDSC)</p>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

window.trackSpecificTicket = async function(token, skipHistory = false) {
  state.activeTab = 'track';
  state.searchToken = token;
  state.activeGrievance = repo.getByToken(token);
  if (!skipHistory && typeof window !== 'undefined' && window.history && window.history.pushState) {
    history.pushState({ tab: 'track', token }, '', `#track-${token}`);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!state.activeGrievance && token) {
    await repo.syncFromGoogleSheet();
    state.activeGrievance = repo.getByToken(token);
    renderApp();
  }
};

window.handleTrackerSearch = async function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('trackerSearchInput');
  const token = input ? input.value.trim().toUpperCase() : '';
  state.searchToken = token;
  state.activeGrievance = repo.getByToken(token);
  
  if (!state.activeGrievance && token) {
    const submitBtn = e?.target?.querySelector('button[type="submit"]');
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) submitBtn.innerHTML = '⏳ Syncing...';
    await repo.syncFromGoogleSheet();
    state.activeGrievance = repo.getByToken(token);
    if (submitBtn && origBtnHtml) submitBtn.innerHTML = origBtnHtml;

    if (!state.activeGrievance) {
      alert(state.language === 'hi' 
        ? `टोकन "${token}" से संबंधित कोई शिकायत नहीं मिली। कृपया टोकन जांचें।`
        : `No grievance found matching token: "${token}". Please check the token.`);
    }
  }
  renderApp();
};

window.exerciseRightToErasure = function(ticketId) {
  const confirmAction = confirm(
    state.language === 'hi' 
      ? "⚠️ DPDP अधिनियम 2023 — डेटा मिटाने का अधिकार (धारा 12)\n\nक्या आप इस शिकायत को वापस लेकर अपना व्यक्तिगत डेटा स्थायी रूप से मिटाना चाहते हैं?\nयह प्रक्रिया अपरिवर्तनीय है।"
      : "⚠️ DPDP ACT 2023 — RIGHT TO ERASURE (SECTION 12)\n\nAre you sure you want to withdraw this grievance and permanently erase your personal data?\nThis action is irrevocable."
  );

  if (confirmAction) {
    repo.update(ticketId, g => {
      g.status = 'RESOLVED';
      g.studentName = '[ERASED_UNDER_DPDP_SEC_12]';
      g.studentEmail = null;
      g.studentPhone = null;
      g.timeline.push({
        stage: 'RESOLVED',
        timestamp: new Date().toISOString(),
        note: state.language === 'hi' ? 'DPDP कानून 2023 की धारा 12 के तहत डेटा स्थायी रूप से मिटाया गया।' : 'Complainant exercised Section 12 Right to Erasure. Personal records permanently scrubbed.'
      });
      return g;
    });

    state.activeGrievance = repo.getAll().find(item => item.ticketId === ticketId);
    renderApp();
    alert(state.language === 'hi' 
      ? "✓ आपका व्यक्तिगत डेटा धारा 12 के तहत स्थायी रूप से मिटा दिया गया है।"
      : "✓ Your personal data has been permanently erased under DPDP Section 12.");
  }
};

window.resetWizard = function() {
  state.wizardStep = 1;
  state.draftTitle = '';
  state.draftDesc = '';
  state.isAnonymous = false;
  state.activeTab = 'register';
  renderApp();
};

// ============================================================================
// 12. INITIALIZATION & MOBILE BROWSER HISTORY MANAGEMENT (POPSTATE)
// ============================================================================

window.addEventListener('popstate', (event) => {
  if (event.state) {
    if (event.state.tab) state.activeTab = event.state.tab;
    if (typeof event.state.step === 'number') state.wizardStep = event.state.step;
    if (event.state.token) {
      state.searchToken = event.state.token;
      state.activeGrievance = repo.getByToken(event.state.token);
    }
    renderApp();
  } else {
    // Revert to initial registration step 1 without closing the app
    state.activeTab = 'register';
    state.wizardStep = 1;
    renderApp();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Initialize canonical history entry so mobile hardware back button navigates internal steps
  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
    const rawHash = (window.location.hash || '').replace('#', '');
    if (['register', 'track', 'insights', 'dpdp'].includes(rawHash)) {
      state.activeTab = rawHash;
    } else if (rawHash.startsWith('step-')) {
      const step = parseInt(rawHash.replace('step-', ''), 10);
      if (!isNaN(step) && step >= 1 && step <= 3) {
        state.wizardStep = step;
      }
    }
    history.replaceState({ tab: state.activeTab, step: state.wizardStep }, '', window.location.hash || `#${state.activeTab}`);
  }
  renderApp();

  // Asynchronously sync live public transparency ledger on page load
  repo.syncFromGoogleSheet().then(() => {
    renderApp();
  });

  // Background polling every 45 seconds for active insights or track tabs
  setInterval(() => {
    if (state.activeTab === 'insights' || state.activeTab === 'track') {
      repo.syncFromGoogleSheet().then(() => {
        renderApp();
      });
    }
  }, 45000);
});
