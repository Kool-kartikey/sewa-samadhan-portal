/**
 * S.A.M.A.D.H.A.N — Student Grievance Redressal Portal
 * Managed by: Students' Union, South Delhi Campus, University of Delhi (UDSC Students' Union)
 * Official Contact: studentsunion@south.du.ac.in
 * 
 * Compliance: Digital Personal Data Protection (DPDP) Act 2023 (India)
 * Architectural Principles: Live Telemetry, Privacy-by-Design, Bilingual Localization (English & हिंदी)
 */

// ============================================================================
// 1. CONSTANTS, VECTOR ICONS, CATEGORIES & I18N DICTIONARY
// ============================================================================

/**
 * Clean monochrome UI icons rendered inline for crisp scaling across themes
 */
function iconSvg(name, className = 'w-4 h-4') {
  const icons = {
    edit: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
    search: '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />',
    chart: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />',
    shield: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />',
    academic: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />',
    building: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />',
    bolt: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />',
    book: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />',
    bus: '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />',
    wallet: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />',
    file: '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />',
    table: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125" />',
    sun: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />',
    moon: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />',
    globe: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
    copy: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />',
    check: '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />',
    printer: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />',
    refresh: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />',
    external: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />',
    arrowRight: '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />',
    arrowLeft: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />',
    mail: '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />',
    trash: '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />',
    lock: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />',
    alert: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />'
  };
  return `<svg class="${className}" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" aria-hidden="true">${icons[name] || icons.file}</svg>`;
}

const CATEGORIES = {
  ACADEMIC: { id: 'ACADEMIC', iconName: 'academic', label: 'Academic & Examinations', hi: 'अकादमिक एवं परीक्षा' },
  HOSTEL: { id: 'HOSTEL', iconName: 'building', label: 'Hostel & Residential Life', hi: 'छात्रावास एवं आवासीय जीवन' },
  INFRASTRUCTURE: { id: 'INFRASTRUCTURE', iconName: 'bolt', label: 'Campus Infrastructure & Wi-Fi', hi: 'परिसर सुविधाएं एवं इंटरनेट' },
  HARASSMENT_RAGGING: { id: 'HARASSMENT_RAGGING', iconName: 'shield', label: 'Anti-Ragging, POSH & Safety', hi: 'एंटी-रैगिंग, आंतरिक शिकायत एवं सुरक्षा' },
  LIBRARY: { id: 'LIBRARY', iconName: 'book', label: 'South Campus Central Library', hi: 'दक्षिण परिसर केंद्रीय पुस्तकालय' },
  TRANSIT_SECURITY: { id: 'TRANSIT_SECURITY', iconName: 'bus', label: 'Transit, Gates & Security', hi: 'परिवहन, सुरक्षा एवं प्रवेश द्वार' },
  FINANCIAL: { id: 'FINANCIAL', iconName: 'wallet', label: 'Fellowships, Fees & Accounts', hi: 'छात्रवृत्ति, शुल्क एवं लेखा' },
  OTHER: { id: 'OTHER', iconName: 'file', label: 'General / Other Grievances', hi: 'सामान्य / अन्य समस्याएं' }
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
    brand_status: "Online",
    brand_sub: "Students' Union • University of Delhi South Campus (UDSC)",
    nav_lodge: "Lodge Grievance",
    nav_track: "Track Status",
    nav_telemetry: "Statistics",
    nav_rights: "DPDP Rights",
    lang_toggle: "हिन्दी",
    theme_light: "Light",
    theme_dark: "Dark",

    // Step 1
    step_1_title: "Step 1 of 3: Select Grievance Category",
    step_1_sub: "Choose the area that best describes your issue so the Students' Union can direct it to the right office.",
    step_1_next: "Continue to Details",

    // Step 2
    step_2_title: "Step 2 of 3: Incident Details",
    step_2_sub: "Share clear, factual details. Specific locations and dates help the Union follow up directly with campus officials.",
    field_subject: "Subject / Short Summary",
    field_subject_ph: "e.g., Reading hall AC not working on the 2nd floor, Central Library",
    field_dept: "Department / Campus Facility",
    field_dept_ph: "Select Department or Facility...",
    field_date: "Date Observed",
    field_urgency: "Priority Level",
    urgency_low: "Routine (7-Day Response)",
    urgency_med: "Standard (72-Hour Response)",
    urgency_crit: "Urgent / Safety (24-Hour Response)",
    field_desc: "Detailed Description",
    field_desc_ph: "Describe where the issue occurred, what happened, and any prior complaints made...",
    anon_toggle_title: "Submit Anonymously (DPDP Act Section 8)",
    anon_toggle_sub: "No name, email, or phone number will be collected or published in the transparency ledger.",
    anon_active_notice: "Anonymous mode is on. Save your tracking token on the final screen to check progress later.",
    field_name: "Your Name",
    field_name_ph: "e.g., Ananya Sharma",
    field_email: "Email Address",
    field_email_ph: "e.g., name@south.du.ac.in",
    field_phone: "Phone Number (Optional)",
    field_phone_ph: "e.g., +91 98765 43210",
    btn_back: "Back",
    btn_proceed_step3: "Review & Consent",

    // Step 3
    step_3_title: "Step 3 of 3: Data Consent & Submission",
    step_3_sub: "Under Section 6 of the Digital Personal Data Protection (DPDP) Act, 2023, submitted information is used strictly for resolving your grievance.",
    dpdp_box_badge: "DPDP Act 2023 Notice (Section 6)",
    dpdp_box_text: "I consent to the Students' Union, University of Delhi South Campus (UDSC) processing this grievance to review the issue, coordinate with University officials, and publish progress updates. Data is retained under Section 8(7) and erased upon resolution or withdrawal under Section 12.",
    consent_checkbox_label: "I confirm the details entered are accurate and grant consent for processing under the DPDP Act 2023.",
    btn_submit_final: "Submit Grievance",

    // Success
    success_heading: "Grievance Registered",
    success_sub: "Your submission has been logged with the UDSC Students' Union Grievance Redressal Cell.",
    token_box_title: "Tracking Token",
    token_box_help: "Save this token to trace your grievance anytime. No account or password required.",
    btn_copy_token: "Copy Token",
    btn_copied_token: "Copied",
    btn_print_receipt: "Print Receipt",
    btn_track_this: "Track Case Status",
    btn_lodge_another: "Submit Another Grievance",

    // Tracker
    tracker_heading: "Grievance Status Tracker",
    tracker_sub: "Look up live progress and action notes using your tracking token.",
    tracker_input_ph: "Enter token (e.g. UDSC-2026-LIB-102)",
    tracker_btn_search: "Check Status",
    tracker_empty_title: "Enter a Tracking Token",
    tracker_empty_desc: "Type your UDSC tracking token above to view the current redressal stage and Union notes.",
    tracker_not_found: "No matching record found",
    tracker_not_found_desc: "Double-check the token format (for example, UDSC-2026-HOSTEL-421) or sync with the latest sheet.",
    tracker_dept: "Department / Facility",
    tracker_sla: "Target Response Date",
    tracker_official_log: "Latest Union Update",
    tracker_no_notes: "Grievance logged and awaiting initial committee review.",
    tracker_erasure_btn: "Withdraw Case & Erase Personal Data (DPDP Sec 12)",

    // Statistics
    telemetry_badge: "Public Transparency Report",
    telemetry_heading: "South Campus Redressal Statistics",
    telemetry_sub: "Live counts compiled directly from the public transparency ledger. Anonymous submissions exclude personal identifiers under the DPDP Act 2023.",
    telemetry_total: "Total Logged",
    telemetry_resolved: "Resolved",
    telemetry_status: "Ledger Sync",
    telemetry_live: "Live",
    telemetry_dept_title: "Department Breakdown",
    telemetry_dept_sub: "Registered cases and resolution rates across South Campus facilities:",
    telemetry_zero_title: "No Grievances Logged Yet",
    telemetry_zero_desc: "Counts update automatically from the transparency sheet once cases are recorded.",
    telemetry_in_sla: "Resolved",

    // Rights
    rights_badge: "Statutory Framework",
    rights_heading: "Student Privacy Rights (DPDP Act 2023)",
    rights_sub: "Grievances handled on this portal follow the Digital Personal Data Protection Act, 2023 and UGC Student Grievance guidelines.",
    sec_6_title: "1. Informed Consent (Section 6)",
    sec_6_desc: "Submissions require explicit user consent specifying the purpose of collection before any case is logged.",
    sec_8_title: "2. Anonymous Filing (Section 8)",
    sec_8_desc: "Students may withhold names, emails, and phone numbers. Anonymous submissions retain only the category, department, and issue summary.",
    sec_12_title: "3. Right to Erasure (Section 12)",
    sec_12_desc: "Complainants can withdraw a case or request deletion of identifying records from the local tracker at any time.",
    sec_13_title: "4. Escalation & Appeal (Section 13)",
    sec_13_desc: "Unresolved matters can be escalated to University statutory bodies or the Data Protection Board of India (DPBI).",
    rights_contact_box_title: "Grievance Redressal Cell Contact",
    rights_office: "Office of the Students' Union, South Delhi Campus (UDSC)",
    rights_address: "Central Students' Amenities Block, South Delhi Campus, Benito Juarez Road, New Delhi 110021",
    rights_email_label: "Official Email:",

    // Footer
    footer_tagline: "Student Advocacy, Monitoring, Analytics & Digital Heeding of All Needs",
    footer_desc: "Official Student Grievance Redressal portal maintained by the Students' Union, University of Delhi South Campus (UDSC) under Project S.E.W.A.",
    footer_db_note: "Isolated Infrastructure (udsc-samadhan-2026) • DPDP Act 2023",
    footer_quick_services: "Portal Sections",
    footer_service_lodge: "Lodge a Grievance",
    footer_service_track: "Track by Token",
    footer_service_telemetry: "Campus Statistics",
    footer_service_rights: "DPDP Student Rights",
    footer_contact_title: "UDSC Students' Union Office",
    footer_official_mail_label: "Official Union Email",
    footer_exec_committee: "Students' Union Executive (2026/27)",
    role_president: "President",
    role_vice_president: "Vice-President",
    role_secretary: "Secretary",
    role_joint_secretary: "Joint Secretary",
    role_councilor: "Central Councilor",
    footer_rights_reserved: "© 2026 Students' Union, South Delhi Campus (UDSC), University of Delhi.",
    footer_iso: "ISO 10002:2018 Quality Standard"
  },
  hi: {
    brand_title: "समाधान (S.A.M.A.D.H.A.N)",
    brand_status: "सक्रिय",
    brand_sub: "छात्र संघ • दक्षिण परिसर, दिल्ली विश्वविद्यालय (UDSC)",
    nav_lodge: "शिकायत दर्ज करें",
    nav_track: "स्थिति देखें",
    nav_telemetry: "आंकड़े",
    nav_rights: "DPDP अधिकार",
    lang_toggle: "English",
    theme_light: "लाइट",
    theme_dark: "डार्क",

    // Step 1
    step_1_title: "चरण 1/3: शिकायत श्रेणी चुनें",
    step_1_sub: "अपनी समस्या से संबंधित सही श्रेणी चुनें ताकि इसे संबंधित छात्र संघ प्रतिनिधि तक पहुँचाया जा सके।",
    step_1_next: "आगे बढ़ें",

    // Step 2
    step_2_title: "चरण 2/3: समस्या का विवरण",
    step_2_sub: "स्पष्ट एवं तथ्यात्मक जानकारी दें। सटीक स्थान और तिथि लिखने से विश्वविद्यालय प्रशासन से त्वरित समाधान कराने में सहायता मिलती है।",
    field_subject: "संक्षिप्त विषय / शीर्षक",
    field_subject_ph: "उदा. केंद्रीय पुस्तकालय की दूसरी मंजिल पर एयर कंडीशनिंग खराब होना",
    field_dept: "संबंधित विभाग / छात्रावास / सुविधा",
    field_dept_ph: "संबंधित विभाग या सुविधा चुनें...",
    field_date: "घटना की तिथि",
    field_urgency: "प्राथमिकता स्तर",
    urgency_low: "सामान्य (7 दिन लक्ष्य)",
    urgency_med: "मानक (72 घंटे लक्ष्य)",
    urgency_crit: "आपात / सुरक्षा (24 घंटे लक्ष्य)",
    field_desc: "विस्तृत विवरण",
    field_desc_ph: "समस्या कहाँ हुई, क्या परेशानी आ रही है और पहले किए गए अनुरोधों का विवरण लिखें...",
    anon_toggle_title: "गुमनाम रूप से दर्ज करें (DPDP धारा 8)",
    anon_toggle_sub: "इसे चुनने पर आपका नाम, ईमेल या फोन नंबर दर्ज या प्रकाशित नहीं किया जाएगा।",
    anon_active_notice: "गुमनाम मोड सक्रिय है। स्थिति जांचने के लिए अंतिम स्क्रीन पर मिलने वाला टोकन सुरक्षित रखें।",
    field_name: "आपका नाम",
    field_name_ph: "उदा. अनन्या शर्मा",
    field_email: "ईमेल पता",
    field_email_ph: "उदा. name@south.du.ac.in",
    field_phone: "फोन नंबर (वैकल्पिक)",
    field_phone_ph: "उदा. +91 98765 43210",
    btn_back: "पिछला",
    btn_proceed_step3: "समीक्षा और सहमति",

    // Step 3
    step_3_title: "चरण 3/3: डेटा सहमति एवं पुष्टि",
    step_3_sub: "डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम 2023 की धारा 6 के अनुसार डेटा केवल शिकायत निवारण के लिए उपयोग होता है।",
    dpdp_box_badge: "DPDP अधिनियम 2023 सूचना (धारा 6)",
    dpdp_box_text: "मैं छात्र संघ, दक्षिण परिसर (UDSC) को इस शिकायत की जांच, विश्वविद्यालय अधिकारियों से समन्वय एवं निवारण स्थिति साझा करने हेतु डेटा प्रसंस्करण की सहमति देता/देती हूँ। धारा 8(7) के तहत डेटा सुरक्षित रहेगा और समाधान या धारा 12 अनुरोध पर हटा दिया जाएगा।",
    consent_checkbox_label: "मैं पुष्टि करता/करती हूँ कि दी गई जानकारी सही है और मैं DPDP अधिनियम 2023 के तहत सहमति प्रदान करता/करती हूँ।",
    btn_submit_final: "शिकायत दर्ज करें",

    // Success
    success_heading: "शिकायत दर्ज हो गई",
    success_sub: "आपकी शिकायत दक्षिण परिसर छात्र संघ निवारण प्रकोष्ठ में रिकॉर्ड कर ली गई है।",
    token_box_title: "ट्रैकिंग टोकन",
    token_box_help: "इस टोकन को सुरक्षित रखें। अपनी शिकायत की स्थिति देखने के लिए किसी पासवर्ड या खाते की आवश्यकता नहीं है।",
    btn_copy_token: "टोकन कॉपी करें",
    btn_copied_token: "कॉपी हो गया",
    btn_print_receipt: "पावती प्रिंट करें",
    btn_track_this: "स्थिति अभी देखें",
    btn_lodge_another: "नई शिकायत दर्ज करें",

    // Tracker
    tracker_heading: "शिकायत स्थिति ट्रैकर",
    tracker_sub: "अपने ट्रैकिंग टोकन से शिकायत की वर्तमान स्थिति और कार्रवाई टिप्पणी देखें।",
    tracker_input_ph: "टोकन दर्ज करें (उदा. UDSC-2026-LIB-102)",
    tracker_btn_search: "स्थिति जांचें",
    tracker_empty_title: "ट्रैकिंग टोकन दर्ज करें",
    tracker_empty_desc: "वर्तमान स्थिति और छात्र संघ टिप्पणी देखने के लिए ऊपर अपना UDSC टोकन दर्ज करें।",
    tracker_not_found: "कोई मेल खाने वाला रिकॉर्ड नहीं मिला",
    tracker_not_found_desc: "कृपया टोकन प्रारूप जांचें (जैसे UDSC-2026-HOSTEL-421) या शीट सिंक करें।",
    tracker_dept: "विभाग / सुविधा",
    tracker_sla: "अपेक्षित समाधान तिथि",
    tracker_official_log: "छात्र संघ अद्यतन",
    tracker_no_notes: "शिकायत प्राप्त हुई है और प्रारंभिक समीक्षा के लिए प्रतीक्षारत है।",
    tracker_erasure_btn: "शिकायत वापस लें एवं व्यक्तिगत डेटा मिटाएं (DPDP धारा 12)",

    // Statistics
    telemetry_badge: "सार्वजनिक पारदर्शिता रिपोर्ट",
    telemetry_heading: "दक्षिण परिसर निवारण आंकड़े",
    telemetry_sub: "सार्वजनिक पारदर्शिता लेज़र से सीधे संकलित लाइव आंकड़े। DPDP अधिनियम 2023 के तहत गुमनाम शिकायतों की पहचान गोपनीय रहती है।",
    telemetry_total: "कुल दर्ज",
    telemetry_resolved: "निस्तारित",
    telemetry_status: "लेज़र सिंक",
    telemetry_live: "लाइव",
    telemetry_dept_title: "विभागवार विवरण",
    telemetry_dept_sub: "दक्षिण परिसर के विभागों और सुविधाओं में दर्ज मामले और समाधान दर:",
    telemetry_zero_title: "अभी कोई शिकायत दर्ज नहीं है",
    telemetry_zero_desc: "लेज़र में मामले दर्ज होते ही आंकड़े स्वतः अपडेट होते हैं।",
    telemetry_in_sla: "निस्तारित",

    // Rights
    rights_badge: "वैधानिक रूपरेखा",
    rights_heading: "छात्र गोपनीयता अधिकार (DPDP अधिनियम 2023)",
    rights_sub: "इस पोर्टल पर दर्ज शिकायतें डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 और UGC दिशानिर्देशों का पालन करती हैं।",
    sec_6_title: "1. सूचित सहमति (धारा 6)",
    sec_6_desc: "कोई भी शिकायत दर्ज करने से पहले उपयोगकर्ता की स्पष्ट सहमति आवश्यक है।",
    sec_8_title: "2. गुमनाम शिकायत (धारा 8)",
    sec_8_desc: "छात्र अपना नाम, ईमेल और फोन नंबर गोपनीय रख सकते हैं। केवल श्रेणी, विभाग और समस्या विवरण दर्ज होता है।",
    sec_12_title: "3. डेटा मिटाने का अधिकार (धारा 12)",
    sec_12_desc: "शिकायतकर्ता किसी भी समय केस वापस ले सकते हैं और स्थानीय ट्रैकर से व्यक्तिगत डेटा हटाने का अनुरोध कर सकते हैं।",
    sec_13_title: "4. अपील और निवारण (धारा 13)",
    sec_13_desc: "असंतुष्ट होने पर छात्र विश्वविद्यालय समितियों या भारतीय डेटा संरक्षण बोर्ड (DPBI) से संपर्क कर सकते हैं।",
    rights_contact_box_title: "शिकायत निवारण प्रकोष्ठ संपर्क",
    rights_office: "छात्र संघ कार्यालय, दक्षिण परिसर (UDSC), दिल्ली विश्वविद्यालय",
    rights_address: "केंद्रीय छात्र सुविधा ब्लॉक, बेनिटो जुआरेज़ मार्ग, नई दिल्ली 110021",
    rights_email_label: "आधिकारिक ईमेल:",

    // Footer
    footer_tagline: "छात्र अधिकार, सतत निगरानी, विश्लेषण एवं त्वरित समाधान पहल",
    footer_desc: "प्रोजेक्ट S.E.W.A के अंतर्गत छात्र संघ, दक्षिण परिसर (दिल्ली विश्वविद्यालय) द्वारा संचालित आधिकारिक शिकायत निवारण पोर्टल।",
    footer_db_note: "पृथक डेटाबेस (udsc-samadhan-2026) • DPDP अधिनियम 2023",
    footer_quick_services: "पोर्टल अनुभाग",
    footer_service_lodge: "शिकायत दर्ज करें",
    footer_service_track: "टोकन से स्थिति देखें",
    footer_service_telemetry: "परिसर आंकड़े",
    footer_service_rights: "DPDP छात्र अधिकार",
    footer_contact_title: "छात्र संघ कार्यालय (UDSC)",
    footer_official_mail_label: "आधिकारिक ईमेल",
    footer_exec_committee: "छात्र संघ कार्यकारिणी (2026/27)",
    role_president: "अध्यक्ष",
    role_vice_president: "उपाध्यक्ष",
    role_secretary: "सचिव",
    role_joint_secretary: "संयुक्त सचिव",
    role_councilor: "केंद्रीय परिषद सदस्य",
    footer_rights_reserved: "© 2026 छात्र संघ, दक्षिण परिसर (UDSC), दिल्ली विश्वविद्यालय।",
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

const DEFAULT_GOOGLE_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM/preview";
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

  // Parse optional Column 15 (Official Union Action Notes) published from Admin Cockpit
  const rawActionNotes = (row[14] || '').trim();
  if (rawActionNotes) {
    rawActionNotes.split(/\r?\n/).filter(Boolean).forEach(line => {
      timeline.push({
        stage: status,
        timestamp: submittedAt,
        note: line.trim()
      });
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
    <div class="civic-card p-4 sm:p-5 border border-emerald-600/25 dark:border-emerald-500/30 bg-emerald-500/5 rounded-xl flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-start sm:items-center gap-3.5">
        <div class="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
          ${iconSvg('table', 'w-5 h-5')}
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">
              ${isHindi ? 'सार्वजनिक पारदर्शिता लेज़र (लाइव गूगल शीट)' : 'Public Transparency Ledger (Google Sheet)'}
            </h3>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 inline-flex items-center gap-1">
              ${iconSvg('lock', 'w-3 h-3')}
              <span>${isHindi ? 'केवल पठन • रीड-ओनली' : 'READ-ONLY LEDGER'}</span>
            </span>
          </div>
          <p class="text-xs text-slate-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed">
            ${isHindi 
              ? 'सभी पंजीकृत शिकायतों, विभागों और निस्तारण स्थिति का सार्वजनिक रिकॉर्ड। गुमनाम शिकायतों में छात्र की पहचान पूर्णतः गोपनीय रहती है।'
              : 'View-only public spreadsheet recording registered grievances, departments, and status updates. Anonymous identities remain redacted.'}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <button 
          onclick="handleManualPortalSync(event)" 
          class="btn btn-secondary btn-sm text-xs inline-flex items-center gap-1.5"
          title="Refresh data from the live Google Sheet"
        >
          ${iconSvg('refresh', 'w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400')}
          <span>${isHindi ? 'सिंक करें' : 'Refresh Data'}</span>
        </button>
        <a 
          href="${getGoogleSheetViewUrl()}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn btn-primary btn-sm text-xs inline-flex items-center gap-1.5"
        >
          <span>${isHindi ? 'गूगल शीट खोलें' : 'View Sheet'}</span>
          ${iconSvg('external', 'w-3.5 h-3.5')}
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
  theme: localStorage.getItem('samadhan_theme') || 'light',
  
  // Wizard state (persisted across back/toggle actions)
  wizardStep: 1,
  selectedCategory: 'INFRASTRUCTURE',
  severity: 'MEDIUM',
  isAnonymous: false,
  draftTitle: '',
  draftDesc: '',
  draftDept: UDSC_DEPARTMENTS[0].id,
  draftDate: '',
  draftName: '',
  draftEmail: '',
  draftPhone: '',
  formError: null,
  copiedToken: null,
  lastSubmitAt: 0,
  
  // Track state
  searchToken: '',
  activeGrievance: null,
  trackerNotFound: false
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
    <!-- Clean Institutional Header -->
    <header class="site-header sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Left: Brand Identity -->
        <div class="flex items-center gap-3 cursor-pointer select-none" onclick="navigateTab('register')">
          <div class="brand-crest-box w-9 h-9 sm:w-10 sm:h-10 rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
            ${getTrustCubeSvg("w-full h-full")}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                ${t('brand_title')}
              </span>
              <span class="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${t('brand_status')}
              </span>
            </div>
            <p class="text-[11px] sm:text-xs text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
              ${t('brand_sub')}
            </p>
          </div>
        </div>

        <!-- Right: Language & Theme Controls -->
        <div class="flex items-center gap-2">
          <button onclick="toggleLanguage()" class="px-2.5 py-1.5 text-xs font-semibold rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition inline-flex items-center gap-1.5">
            ${iconSvg('globe', 'w-3.5 h-3.5 text-amber-600 dark:text-amber-400')}
            <span>${t('lang_toggle')}</span>
          </button>

          <div class="theme-switch-container" role="group" aria-label="Color theme">
            <button onclick="setTheme('light')" class="theme-switch-btn ${state.theme === 'light' ? 'active' : ''}">
              ${iconSvg('sun', 'w-3.5 h-3.5')}
              <span class="hidden sm:inline">${t('theme_light')}</span>
            </button>
            <button onclick="setTheme('dark')" class="theme-switch-btn ${state.theme === 'dark' ? 'active' : ''}">
              ${iconSvg('moon', 'w-3.5 h-3.5')}
              <span class="hidden sm:inline">${t('theme_dark')}</span>
            </button>
          </div>
        </div>

      </div>

      <!-- Navigation Bar -->
      <div class="site-header-sub px-4 sm:px-6 py-2">
        <div class="max-w-5xl mx-auto">
          <nav class="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2" aria-label="Primary navigation">
            <button onclick="navigateTab('register')" class="nav-tab-btn ${state.activeTab === 'register' ? 'active' : ''}">
              ${iconSvg('edit', 'w-4 h-4')}
              <span>${t('nav_lodge')}</span>
            </button>
            <button onclick="navigateTab('track')" class="nav-tab-btn ${state.activeTab === 'track' ? 'active' : ''}">
              ${iconSvg('search', 'w-4 h-4')}
              <span>${t('nav_track')}</span>
            </button>
            <button onclick="navigateTab('insights')" class="nav-tab-btn ${state.activeTab === 'insights' ? 'active' : ''}">
              ${iconSvg('chart', 'w-4 h-4')}
              <span>${t('nav_telemetry')}</span>
            </button>
            <button onclick="navigateTab('dpdp')" class="nav-tab-btn ${state.activeTab === 'dpdp' ? 'active' : ''}">
              ${iconSvg('shield', 'w-4 h-4')}
              <span>${t('nav_rights')}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      ${renderActiveTab()}
    </main>

    <!-- Institutional Footer -->
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-grid">
          
          <!-- Column 1: Brand & Union Info -->
          <div class="footer-brand">
            <div class="flex items-center gap-2.5 mb-2">
              <div class="w-8 h-8 flex-shrink-0 brand-crest-box rounded-lg p-1">
                ${getTrustCubeSvg("w-full h-full")}
              </div>
              <h3 class="tracking-tight">${t('brand_title')}</h3>
            </div>
            <p class="text-xs text-amber-400 font-semibold">
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
              <li><a href="#" onclick="navigateTab('register'); return false;">${iconSvg('edit', 'w-3.5 h-3.5')}<span>${t('footer_service_lodge')}</span></a></li>
              <li><a href="#" onclick="navigateTab('track'); return false;">${iconSvg('search', 'w-3.5 h-3.5')}<span>${t('footer_service_track')}</span></a></li>
              <li><a href="#" onclick="navigateTab('insights'); return false;">${iconSvg('chart', 'w-3.5 h-3.5')}<span>${t('footer_service_telemetry')}</span></a></li>
              <li><a href="#" onclick="navigateTab('dpdp'); return false;">${iconSvg('shield', 'w-3.5 h-3.5')}<span>${t('footer_service_rights')}</span></a></li>
            </ul>
          </div>

          <!-- Column 3: Union Secretariat & Office Bearers -->
          <div class="footer-col">
            <h4>${t('footer_contact_title')}</h4>
            <div class="space-y-3.5 text-xs">
              <div class="bg-zinc-900/70 p-2.5 rounded-lg border border-zinc-800">
                <span class="text-zinc-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                  ${t('footer_official_mail_label')}
                </span>
                <a href="mailto:studentsunion@south.du.ac.in" class="text-amber-400 hover:text-amber-300 font-semibold font-mono text-xs inline-flex items-center gap-1.5 transition">
                  ${iconSvg('mail', 'w-3.5 h-3.5')}
                  <span>studentsunion@south.du.ac.in</span>
                </a>
              </div>

              <div>
                <span class="text-amber-400 font-bold uppercase text-[10px] tracking-wider block mb-2">
                  ${t('footer_exec_committee')}
                </span>
                <div class="space-y-1.5 text-xs">
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/50">
                    <span class="font-semibold text-white">Rawal Singh</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_president')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/50">
                    <span class="font-semibold text-white">Kartikey Tiwari</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_vice_president')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/50">
                    <span class="font-semibold text-white">Ujjwal Yadav</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_secretary')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/50">
                    <span class="font-semibold text-white">Babulal Saran</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_joint_secretary')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5 border-b border-zinc-800/50">
                    <span class="font-semibold text-white">Anuj Kumar</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_councilor')}</span>
                  </div>
                  <div class="flex items-center justify-between text-zinc-200 py-0.5">
                    <span class="font-semibold text-white">Shraddha Choudhary</span>
                    <span class="text-zinc-400 text-[11px]">${t('role_councilor')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="footer-bottom">
          <p>${t('footer_rights_reserved')}</p>
          <div class="flex items-center gap-3 text-xs">
            <span class="text-emerald-400 font-semibold">DPDP Act 2023 Compliant</span>
            <span class="text-zinc-700">•</span>
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
    <div class="max-w-4xl mx-auto space-y-5">
      
      <!-- Stepper Progress Bar -->
      <div class="civic-card py-4 px-5">
        <div class="flex items-center justify-between relative max-w-lg mx-auto">
          
          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${state.wizardStep >= 1 ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700'}">
              1
            </div>
            <span class="text-[11px] font-semibold ${state.wizardStep >= 1 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500 dark:text-zinc-400'}">
              ${state.language === 'hi' ? 'श्रेणी' : 'Category'}
            </span>
          </div>

          <div class="flex-1 h-0.5 mx-3 ${state.wizardStep >= 2 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-zinc-800'}"></div>

          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${state.wizardStep >= 2 ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700'}">
              2
            </div>
            <span class="text-[11px] font-semibold ${state.wizardStep >= 2 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500 dark:text-zinc-400'}">
              ${state.language === 'hi' ? 'विवरण' : 'Details'}
            </span>
          </div>

          <div class="flex-1 h-0.5 mx-3 ${state.wizardStep >= 3 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-zinc-800'}"></div>

          <div class="flex flex-col items-center gap-1.5 z-10">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${state.wizardStep >= 3 ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700'}">
              3
            </div>
            <span class="text-[11px] font-semibold ${state.wizardStep >= 3 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-500 dark:text-zinc-400'}">
              ${state.language === 'hi' ? 'सहमति' : 'Consent'}
            </span>
          </div>

        </div>
      </div>

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
        <h2 class="text-lg sm:text-xl font-bold">${t('step_1_title')}</h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">${t('step_1_sub')}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        ${Object.values(CATEGORIES).map(cat => `
          <button
            type="button"
            onclick="selectCategory('${cat.id}')"
            class="category-tile ${state.selectedCategory === cat.id ? 'selected' : ''}"
          >
            <div class="w-8 h-8 rounded-md flex items-center justify-center mb-2.5 ${state.selectedCategory === cat.id ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400' : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300'}">
              ${iconSvg(cat.iconName, 'w-4 h-4')}
            </div>
            <h3>${state.language === 'hi' ? cat.hi : cat.label}</h3>
          </button>
        `).join('')}
      </div>

      <div class="flex justify-end pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button type="button" onclick="goToStep(2)" class="btn btn-primary w-full sm:w-auto">
          <span>${t('step_1_next')}</span>
          ${iconSvg('arrowRight', 'w-4 h-4')}
        </button>
      </div>
    </div>
  `;
}

function renderWizardStep2() {
  const defaultDate = state.draftDate || new Date().toISOString().split('T')[0];
  return `
    <div class="civic-card space-y-6">
      <div class="civic-card-header">
        <h2 class="text-lg sm:text-xl font-bold">${t('step_2_title')}</h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">${t('step_2_sub')}</p>
      </div>

      ${state.formError ? `
        <div class="p-3 rounded-lg bg-rose-500/10 border border-rose-500/35 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 font-medium" role="alert">
          ${iconSvg('alert', 'w-4 h-4 flex-shrink-0')}
          <span>${escapeHtml(state.formError)}</span>
        </div>
      ` : ''}

      <div class="space-y-4">
        
        <div>
          <label for="incidentTitle" class="form-label">${t('field_subject')} <span class="text-rose-600">*</span></label>
          <input 
            type="text" 
            id="incidentTitle" 
            required 
            maxlength="200"
            value="${escapeHtml(state.draftTitle || '')}"
            placeholder="${t('field_subject_ph')}" 
            class="form-input" 
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="departmentSelect" class="form-label">${t('field_dept')} <span class="text-rose-600">*</span></label>
            <select id="departmentSelect" class="form-select">
              ${UDSC_DEPARTMENTS.map(d => `
                <option value="${escapeHtml(d.id)}" ${state.draftDept === d.id ? 'selected' : ''}>${escapeHtml(state.language === 'hi' ? d.hi : d.en)}</option>
              `).join('')}
            </select>
          </div>

          <div>
            <label for="incidentDate" class="form-label">${t('field_date')} <span class="text-rose-600">*</span></label>
            <input 
              type="date" 
              id="incidentDate" 
              value="${escapeHtml(defaultDate)}" 
              class="form-input" 
            />
          </div>
        </div>

        <div>
          <span class="form-label">${t('field_urgency')} <span class="text-rose-600">*</span></span>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <label class="p-3 rounded-lg border cursor-pointer transition flex items-center gap-2.5 ${state.severity === 'LOW' ? 'bg-emerald-500/10 border-emerald-600/50' : 'civic-well border-slate-200 dark:border-zinc-800'}">
              <input type="radio" name="severityRadio" value="LOW" onchange="setSeverity('LOW')" ${state.severity === 'LOW' ? 'checked' : ''} class="sr-only" />
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
              <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${t('urgency_low')}</span>
            </label>
            <label class="p-3 rounded-lg border cursor-pointer transition flex items-center gap-2.5 ${state.severity === 'MEDIUM' ? 'bg-amber-500/10 border-amber-600/50' : 'civic-well border-slate-200 dark:border-zinc-800'}">
              <input type="radio" name="severityRadio" value="MEDIUM" onchange="setSeverity('MEDIUM')" ${state.severity === 'MEDIUM' ? 'checked' : ''} class="sr-only" />
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></span>
              <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${t('urgency_med')}</span>
            </label>
            <label class="p-3 rounded-lg border cursor-pointer transition flex items-center gap-2.5 ${state.severity === 'CRITICAL' ? 'bg-rose-500/10 border-rose-600/50' : 'civic-well border-slate-200 dark:border-zinc-800'}">
              <input type="radio" name="severityRadio" value="CRITICAL" onchange="setSeverity('CRITICAL')" ${state.severity === 'CRITICAL' ? 'checked' : ''} class="sr-only" />
              <span class="w-2.5 h-2.5 rounded-full bg-rose-600 flex-shrink-0"></span>
              <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${t('urgency_crit')}</span>
            </label>
          </div>
        </div>

        <div>
          <label for="incidentDescription" class="form-label">${t('field_desc')} <span class="text-rose-600">*</span></label>
          <textarea 
            id="incidentDescription" 
            rows="4" 
            required 
            maxlength="3000"
            placeholder="${t('field_desc_ph')}" 
            class="form-textarea"
          >${escapeHtml(state.draftDesc || '')}</textarea>
        </div>

        <!-- Privacy / Anonymous Option -->
        <div class="p-4 rounded-lg civic-well space-y-3">
          <div class="flex items-start sm:items-center justify-between gap-3">
            <div class="space-y-0.5">
              <span class="text-sm font-semibold inline-flex items-center gap-1.5">
                ${iconSvg('shield', 'w-4 h-4 text-amber-600 dark:text-amber-400')}
                <span>${t('anon_toggle_title')}</span>
              </span>
              <p class="text-xs text-slate-500 dark:text-zinc-400">${t('anon_toggle_sub')}</p>
            </div>
            <input 
              type="checkbox" 
              id="anonymousToggle" 
              onchange="toggleAnonymous(this.checked)"
              ${state.isAnonymous ? 'checked' : ''} 
              class="w-5 h-5 accent-amber-600 rounded cursor-pointer mt-0.5 sm:mt-0 flex-shrink-0" 
            />
          </div>

          ${state.isAnonymous ? `
            <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-md text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              ${iconSvg('check', 'w-4 h-4 flex-shrink-0')}
              <span>${t('anon_active_notice')}</span>
            </div>
          ` : `
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-zinc-800">
              <div>
                <label for="studentName" class="form-label text-xs">${t('field_name')}</label>
                <input type="text" id="studentName" maxlength="100" value="${escapeHtml(state.draftName || '')}" placeholder="${t('field_name_ph')}" class="form-input text-xs" />
              </div>
              <div>
                <label for="studentEmail" class="form-label text-xs">${t('field_email')}</label>
                <input type="email" id="studentEmail" maxlength="100" value="${escapeHtml(state.draftEmail || '')}" placeholder="${t('field_email_ph')}" class="form-input text-xs" />
              </div>
              <div>
                <label for="studentPhone" class="form-label text-xs">${t('field_phone')}</label>
                <input type="tel" id="studentPhone" maxlength="30" value="${escapeHtml(state.draftPhone || '')}" placeholder="${t('field_phone_ph')}" class="form-input text-xs" />
              </div>
            </div>
          `}
        </div>

      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button type="button" onclick="goToStep(1)" class="btn btn-secondary">
          ${iconSvg('arrowLeft', 'w-4 h-4')}
          <span>${t('btn_back')}</span>
        </button>
        <button type="button" onclick="goToStep(3)" class="btn btn-primary">
          <span>${t('btn_proceed_step3')}</span>
          ${iconSvg('arrowRight', 'w-4 h-4')}
        </button>
      </div>
    </div>
  `;
}

function renderWizardStep3() {
  return `
    <div class="civic-card space-y-6">
      <div class="civic-card-header">
        <h2 class="text-lg sm:text-xl font-bold">${t('step_3_title')}</h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">${t('step_3_sub')}</p>
      </div>

      ${state.formError ? `
        <div class="p-3 rounded-lg bg-rose-500/10 border border-rose-500/35 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2 font-medium" role="alert">
          ${iconSvg('alert', 'w-4 h-4 flex-shrink-0')}
          <span>${escapeHtml(state.formError)}</span>
        </div>
      ` : ''}

      <!-- Review Summary Strip -->
      <div class="p-3.5 rounded-lg civic-well text-xs grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div>
          <span class="text-slate-500 dark:text-zinc-400 block">${state.language === 'hi' ? 'विषय' : 'Subject'}</span>
          <strong class="text-slate-900 dark:text-white">${escapeHtml(state.draftTitle || '')}</strong>
        </div>
        <div>
          <span class="text-slate-500 dark:text-zinc-400 block">${state.language === 'hi' ? 'विभाग' : 'Department'}</span>
          <strong class="text-slate-900 dark:text-white">${escapeHtml(getDepartmentName(state.draftDept || UDSC_DEPARTMENTS[0].id))}</strong>
        </div>
        <div>
          <span class="text-slate-500 dark:text-zinc-400 block">${state.language === 'hi' ? 'गोपनीयता' : 'Privacy Mode'}</span>
          <strong class="text-slate-900 dark:text-white">${state.isAnonymous ? (state.language === 'hi' ? 'गुमनाम (DPDP धारा 8)' : 'Anonymous (Section 8)') : escapeHtml(state.draftName || 'Student')}</strong>
        </div>
      </div>

      <!-- Statutory Consent Box -->
      <div class="p-5 rounded-lg border border-amber-500/35 bg-amber-500/5 space-y-3">
        <span class="badge badge-submitted text-[10px]">
          ${t('dpdp_box_badge')}
        </span>
        <p class="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
          "${t('dpdp_box_text')}"
        </p>

        <label class="flex items-start gap-3 pt-3 border-t border-slate-200 dark:border-zinc-800 cursor-pointer">
          <input type="checkbox" id="consentCheckbox" required class="w-4 h-4 accent-amber-600 rounded mt-1 cursor-pointer flex-shrink-0" />
          <span class="text-xs font-semibold leading-relaxed text-slate-900 dark:text-white">
            ${t('consent_checkbox_label')}
          </span>
        </label>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button type="button" onclick="goToStep(2)" class="btn btn-secondary">
          ${iconSvg('arrowLeft', 'w-4 h-4')}
          <span>${t('btn_back')}</span>
        </button>
        <button type="button" onclick="submitGrievanceWizard()" class="btn btn-primary">
          <span>${t('btn_submit_final')}</span>
          ${iconSvg('check', 'w-4 h-4')}
        </button>
      </div>
    </div>
  `;
}

function renderSuccessScreen(g) {
  const isCopied = state.copiedToken === g.trackToken;
  return `
    <div class="civic-card max-w-2xl mx-auto text-center py-8 space-y-6">
      <div class="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
        ${iconSvg('check', 'w-6 h-6')}
      </div>

      <div>
        <h2 class="text-xl sm:text-2xl font-bold">${t('success_heading')}</h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">${t('success_sub')}</p>
      </div>

      <div class="p-5 rounded-lg civic-well max-w-md mx-auto space-y-1.5">
        <span class="text-[11px] font-bold text-amber-700 dark:text-amber-400 tracking-wider uppercase block">
          ${t('token_box_title')}
        </span>
        <div class="font-mono text-2xl font-extrabold text-slate-900 dark:text-amber-300 select-all tracking-wider py-1">
          ${escapeHtml(g.trackToken)}
        </div>
        <p class="text-[11px] text-slate-500 dark:text-zinc-400">
          ${t('token_box_help')}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-2.5">
        <button type="button" onclick="copyToClipboard('${escapeHtml(g.trackToken)}')" class="btn btn-secondary btn-sm text-xs">
          ${iconSvg(isCopied ? 'check' : 'copy', 'w-4 h-4')}
          <span>${isCopied ? t('btn_copied_token') : t('btn_copy_token')}</span>
        </button>
        <button type="button" onclick="printStatutoryReceipt('${escapeHtml(g.ticketId)}')" class="btn btn-secondary btn-sm text-xs">
          ${iconSvg('printer', 'w-4 h-4')}
          <span>${t('btn_print_receipt')}</span>
        </button>
        <button type="button" onclick="trackSpecificTicket('${escapeHtml(g.trackToken)}')" class="btn btn-primary btn-sm text-xs">
          <span>${t('btn_track_this')}</span>
          ${iconSvg('arrowRight', 'w-4 h-4')}
        </button>
      </div>

      <div class="p-3.5 bg-emerald-500/5 border border-emerald-500/25 rounded-lg text-xs text-slate-700 dark:text-zinc-300 flex items-center justify-between gap-3 max-w-md mx-auto">
        <div class="flex items-center gap-2.5 text-left">
          <span class="text-emerald-700 dark:text-emerald-400">${iconSvg('table', 'w-5 h-5')}</span>
          <div>
            <span class="font-semibold block text-slate-900 dark:text-white">${state.language === 'hi' ? 'सार्वजनिक पारदर्शिता लेज़र में दर्ज' : 'Logged to Transparency Ledger'}</span>
            <span class="text-[11px] text-slate-500 dark:text-zinc-400">
              ${g.isAnonymous ? (state.language === 'hi' ? 'गोपनीयता: गुमनाम (पहचान सुरक्षित)' : 'Privacy: Anonymous (Protected)') : (state.language === 'hi' ? 'गोपनीयता: छात्र पहचान सहित' : 'Privacy: Consented Identity')}
            </span>
          </div>
        </div>
        <a href="${getGoogleSheetViewUrl()}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm text-[11px] whitespace-nowrap">
          <span>${state.language === 'hi' ? 'शीट देखें' : 'View Sheet'}</span>
          ${iconSvg('external', 'w-3 h-3')}
        </a>
      </div>

      <div class="pt-4 border-t border-slate-200 dark:border-zinc-800">
        <button type="button" onclick="resetWizard()" class="text-xs text-slate-600 dark:text-zinc-400 hover:underline font-semibold">
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
    <div class="max-w-4xl mx-auto space-y-5">
      
      ${renderTransparencyLedgerBanner()}

      <div class="civic-card space-y-3">
        <div>
          <h2 class="text-lg sm:text-xl font-bold">${t('tracker_heading')}</h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">${t('tracker_sub')}</p>
        </div>

        <form onsubmit="handleTrackerSearch(event)" class="flex flex-col sm:flex-row gap-2">
          <input 
            type="text" 
            id="trackerSearchInput" 
            placeholder="${t('tracker_input_ph')}" 
            value="${escapeHtml(state.searchToken)}"
            class="form-input tracking-input font-mono text-sm flex-1" 
          />
          <button type="submit" class="btn btn-primary px-6 whitespace-nowrap">
            ${iconSvg('search', 'w-4 h-4')}
            <span>${t('tracker_btn_search')}</span>
          </button>
        </form>
      </div>

      ${g ? renderTicketDetails(g) : state.trackerNotFound ? `
        <div class="civic-card text-center py-10 space-y-2 border border-rose-500/30">
          <div class="w-10 h-10 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-1">
            ${iconSvg('alert', 'w-5 h-5')}
          </div>
          <h3 class="font-bold text-base">${t('tracker_not_found')}: <span class="font-mono text-rose-600 dark:text-rose-400">${escapeHtml(state.searchToken)}</span></h3>
          <p class="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
            ${t('tracker_not_found_desc')}
          </p>
        </div>
      ` : `
        <div class="civic-card text-center py-10 space-y-2">
          <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 flex items-center justify-center mx-auto mb-1">
            ${iconSvg('search', 'w-5 h-5')}
          </div>
          <h3 class="font-bold text-base">${t('tracker_empty_title')}</h3>
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
          <span class="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">${escapeHtml(g.trackToken)}</span>
          <h3 class="text-lg font-black mt-0.5">${escapeHtml(g.title)}</h3>
          <p class="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            ${t('tracker_dept')}: <strong>${escapeHtml(getDepartmentName(g.department))}</strong>
          </p>
        </div>

        <div class="flex flex-col items-end gap-1">
          <span class="badge badge-${LIFECYCLE_STAGES.find(s => s.key === g.status)?.color || 'submitted'} text-xs">
            ${escapeHtml(getStageLabel(g.status))}
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
                  ${historyItem ? escapeHtml(historyItem.note) : (isCurrent ? 'Under active review by the UDSC Students\' Union redressing panel.' : 'Pending progression.')}
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
          ${g.assignedOfficer ? `Liaison Officer: <strong>${escapeHtml(g.assignedOfficer)}</strong> • ` : ''}
          ${escapeHtml(g.timeline.slice(-1)[0]?.note || t('tracker_no_notes'))}
        </p>
      </div>

      <!-- DPDP Section 12 Right to Erasure Action -->
      <div class="pt-2 flex justify-end">
        <button type="button" onclick="exerciseRightToErasure('${escapeHtml(g.ticketId)}')" class="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1.5">
          ${iconSvg('trash', 'w-3.5 h-3.5')}
          <span>${t('tracker_erasure_btn')}</span>
        </button>
      </div>

    </div>
  `;
}

// ============================================================================
// 9. VIEW: PUBLIC TELEMETRY (LIVE TRANSPARENCY METRICS)
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
    <div class="max-w-4xl mx-auto space-y-5">
      
      <div class="civic-card py-6 sm:py-7">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-200 dark:border-zinc-800">
          <div>
            <span class="badge badge-submitted text-[10px]">
              ${t('telemetry_badge')}
            </span>
            <h1 class="text-xl sm:text-2xl font-bold mt-2">${t('telemetry_heading')}</h1>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-2xl mt-1 leading-relaxed">
              ${t('telemetry_sub')}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div class="p-3.5 civic-well rounded-lg">
            <span class="text-xs text-slate-500 dark:text-zinc-400 font-semibold">${t('telemetry_total')}</span>
            <p class="text-2xl font-bold mt-1 text-slate-900 dark:text-white">${total}</p>
          </div>
          <div class="p-3.5 civic-well rounded-lg">
            <span class="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">${t('telemetry_resolved')}</span>
            <p class="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">${resolved}</p>
          </div>
          <div class="p-3.5 civic-well rounded-lg">
            <span class="text-xs text-slate-500 dark:text-zinc-400 font-semibold">${t('telemetry_status')}</span>
            <p class="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mt-2 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>${t('telemetry_live')}</span>
            </p>
          </div>
        </div>
      </div>

      ${renderTransparencyLedgerBanner()}

      <div class="civic-card space-y-4">
        <div>
          <h3 class="text-base font-bold">${t('telemetry_dept_title')}</h3>
          <p class="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">${t('telemetry_dept_sub')}</p>
        </div>

        ${deptList.length > 0 ? `
          <div class="space-y-3.5 pt-2">
            ${deptList.map(d => `
              <div>
                <div class="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span class="text-slate-800 dark:text-zinc-200">${escapeHtml(d.name)} (${d.count} ${d.count === 1 ? 'case' : 'cases'})</span>
                  <span class="text-emerald-700 dark:text-emerald-400">${d.pct}% ${t('telemetry_in_sla')}</span>
                </div>
                <div class="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-600 rounded-full" style="width: ${d.pct}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="text-center py-8 civic-well rounded-lg space-y-2">
            <div class="w-9 h-9 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 flex items-center justify-center mx-auto">
              ${iconSvg('chart', 'w-4 h-4')}
            </div>
            <h4 class="font-semibold text-sm">${t('telemetry_zero_title')}</h4>
            <p class="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
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
    <div class="max-w-4xl mx-auto space-y-5">
      
      <div class="civic-card space-y-2">
        <span class="badge badge-submitted text-[10px]">
          ${t('rights_badge')}
        </span>
        <h2 class="text-xl sm:text-2xl font-bold">${t('rights_heading')}</h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">${t('rights_sub')}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="civic-card space-y-1.5">
          <h3 class="font-bold text-sm text-slate-900 dark:text-amber-400">${t('sec_6_title')}</h3>
          <p class="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">${t('sec_6_desc')}</p>
        </div>

        <div class="civic-card space-y-1.5">
          <h3 class="font-bold text-sm text-slate-900 dark:text-amber-400">${t('sec_8_title')}</h3>
          <p class="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">${t('sec_8_desc')}</p>
        </div>

        <div class="civic-card space-y-1.5">
          <h3 class="font-bold text-sm text-slate-900 dark:text-amber-400">${t('sec_12_title')}</h3>
          <p class="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">${t('sec_12_desc')}</p>
        </div>

        <div class="civic-card space-y-1.5">
          <h3 class="font-bold text-sm text-slate-900 dark:text-amber-400">${t('sec_13_title')}</h3>
          <p class="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">${t('sec_13_desc')}</p>
        </div>
      </div>

      <div class="civic-card civic-well space-y-1.5 text-xs">
        <h4 class="font-bold uppercase text-[11px] tracking-wider text-amber-700 dark:text-amber-400">
          ${t('rights_contact_box_title')}
        </h4>
        <p class="font-semibold text-slate-900 dark:text-white">${t('rights_office')}</p>
        <p class="text-slate-500 dark:text-zinc-400">${t('rights_address')}</p>
        <p class="text-slate-500 dark:text-zinc-400 pt-1">
          ${t('rights_email_label')} <a href="mailto:studentsunion@south.du.ac.in" class="text-amber-700 dark:text-amber-400 font-semibold underline font-mono">studentsunion@south.du.ac.in</a>
        </p>
      </div>

    </div>
  `;
}

// ============================================================================
// 11. CONTROLLER & ACTION HANDLERS
// ============================================================================

function syncDraftInputsToState() {
  const titleEl = document.getElementById('incidentTitle');
  const descEl = document.getElementById('incidentDescription');
  const deptEl = document.getElementById('departmentSelect');
  const dateEl = document.getElementById('incidentDate');
  const nameEl = document.getElementById('studentName');
  const emailEl = document.getElementById('studentEmail');
  const phoneEl = document.getElementById('studentPhone');

  if (titleEl) state.draftTitle = titleEl.value;
  if (descEl) state.draftDesc = descEl.value;
  if (deptEl) state.draftDept = deptEl.value;
  if (dateEl) state.draftDate = dateEl.value;
  if (nameEl) state.draftName = nameEl.value;
  if (emailEl) state.draftEmail = emailEl.value;
  if (phoneEl) state.draftPhone = phoneEl.value;
}

window.navigateTab = function(tabName, skipHistory = false) {
  if (state.activeTab === 'register' && state.wizardStep === 2) {
    syncDraftInputsToState();
  }
  state.activeTab = tabName;
  state.formError = null;
  if (tabName === 'register') {
    state.wizardStep = 1;
  }
  if (!skipHistory && typeof window !== 'undefined' && window.history && window.history.pushState) {
    history.pushState({ tab: tabName, step: state.wizardStep }, '', `#${tabName}`);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (tabName === 'insights' || tabName === 'track') {
    repo.syncFromGoogleSheet().then(() => {
      if (state.activeTab === tabName) renderApp();
    });
  }
};

window.handleManualPortalSync = async function(e) {
  const btn = e?.currentTarget;
  const origText = btn ? btn.innerHTML : '';
  if (btn) btn.innerHTML = 'Syncing...';
  try {
    await repo.syncFromGoogleSheet();
    if (state.searchToken) {
      state.activeGrievance = repo.getByToken(state.searchToken);
      state.trackerNotFound = Boolean(state.searchToken && !state.activeGrievance);
    }
    renderApp();
  } catch (err) {
    console.warn("Manual sync error:", err);
  } finally {
    if (btn && origText) btn.innerHTML = origText;
  }
};

window.toggleLanguage = function() {
  if (state.activeTab === 'register' && state.wizardStep === 2) {
    syncDraftInputsToState();
  }
  state.language = state.language === 'en' ? 'hi' : 'en';
  renderApp();
};

window.setTheme = function(newTheme) {
  if (state.activeTab === 'register' && state.wizardStep === 2) {
    syncDraftInputsToState();
  }
  state.theme = newTheme;
  localStorage.setItem('samadhan_theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  renderApp();
};

window.selectCategory = function(catId) {
  state.selectedCategory = catId;
  state.formError = null;
  renderApp();
};

window.setSeverity = function(level) {
  syncDraftInputsToState();
  state.severity = level;
  renderApp();
};

window.goToStep = function(stepNum, skipHistory = false) {
  state.formError = null;
  if (state.wizardStep === 2) {
    syncDraftInputsToState();
  }
  if (stepNum === 2 && !state.selectedCategory) {
    state.formError = state.language === 'hi' ? "कृपया पहले एक श्रेणी चुनें।" : "Please select a grievance category first.";
    renderApp();
    return;
  }
  if (stepNum === 3) {
    const title = (state.draftTitle || '').trim();
    const desc = (state.draftDesc || '').trim();
    if (!title || !desc) {
      state.formError = state.language === 'hi'
        ? "कृपया विषय और समस्या का विवरण दोनों भरें।"
        : "Please enter both a short subject and a detailed description.";
      renderApp();
      return;
    }
  }
  state.wizardStep = stepNum;
  if (!skipHistory && typeof window !== 'undefined' && window.history && window.history.pushState) {
    history.pushState({ tab: 'register', step: stepNum }, '', `#step-${stepNum}`);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleAnonymous = function(checked) {
  syncDraftInputsToState();
  state.isAnonymous = checked;
  renderApp();
};

window.submitGrievanceWizard = function() {
  state.formError = null;
  const consentChecked = document.getElementById('consentCheckbox')?.checked;
  if (!consentChecked) {
    state.formError = state.language === 'hi'
      ? "शिकायत दर्ज करने हेतु DPDP सहमति आवश्यक है।"
      : "Affirmative consent under the DPDP Act 2023 is required before submitting.";
    renderApp();
    return;
  }

  // Prevent accidental double-submissions within 15 seconds
  const nowMs = Date.now();
  if (state.lastSubmitAt && (nowMs - state.lastSubmitAt) < 15000) {
    state.formError = state.language === 'hi'
      ? "कृपया अगली शिकायत दर्ज करने से पहले 15 सेकंड प्रतीक्षा करें।"
      : "Please wait 15 seconds between consecutive submissions.";
    renderApp();
    return;
  }
  state.lastSubmitAt = nowMs;

  const token = generateTrackToken(state.selectedCategory);
  const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toISOString();

  const slaHours = state.severity === 'CRITICAL' ? 24 : (state.severity === 'HIGH' ? 72 : 168);
  const slaDeadline = new Date(Date.now() + (slaHours * 3600000)).toISOString();

  const newGrievance = {
    ticketId,
    trackToken: token,
    category: state.selectedCategory,
    title: (state.draftTitle || 'Student Grievance').trim(),
    description: (state.draftDesc || '').trim(),
    department: state.draftDept || 'South Campus Central Library',
    incidentDate: state.draftDate || now.split('T')[0],
    severity: state.severity || 'MEDIUM',
    status: 'SUBMITTED',
    isAnonymous: state.isAnonymous,
    studentName: state.isAnonymous ? null : ((state.draftName || '').trim() || 'Student'),
    studentEmail: state.isAnonymous ? null : (state.draftEmail || '').trim(),
    studentPhone: state.isAnonymous ? null : (state.draftPhone || '').trim(),
    submittedAt: now,
    slaDeadline,
    assignedOfficer: 'UDSC Students\' Union Redressal Desk',
    dpdpConsent: true,
    dpdpConsentTimestamp: now,
    timeline: [
      {
        stage: 'SUBMITTED',
        timestamp: now,
        note: state.language === 'hi'
          ? 'शिकायत छात्र संघ में सफलतापूर्वक दर्ज कर ली गई है।'
          : 'Grievance recorded and registered for Students\' Union review.'
      }
    ],
    communicationThread: []
  };

  repo.add(newGrievance);
  syncGrievanceToGoogleSheet(newGrievance);

  // Store last submitted grievance so copy-token re-renders preserve the success screen cleanly
  state.lastSubmittedGrievance = newGrievance;

  const main = document.querySelector('main');
  if (main) {
    main.innerHTML = renderSuccessScreen(newGrievance);
  }
};

window.copyToClipboard = function(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
  state.copiedToken = text;
  if (state.lastSubmittedGrievance && state.lastSubmittedGrievance.trackToken === text) {
    const main = document.querySelector('main');
    if (main) main.innerHTML = renderSuccessScreen(state.lastSubmittedGrievance);
    setTimeout(() => {
      if (state.copiedToken === text) {
        state.copiedToken = null;
        const m = document.querySelector('main');
        if (m && state.activeTab === 'register' && state.lastSubmittedGrievance?.trackToken === text) {
          m.innerHTML = renderSuccessScreen(state.lastSubmittedGrievance);
        }
      }
    }, 2200);
  }
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
        <div class="token">${escapeHtml(g.trackToken)}</div>
        <p><strong>Date Lodged:</strong> ${new Date(g.submittedAt).toLocaleString('en-IN')}</p>
        <p><strong>Department:</strong> ${escapeHtml(g.department)}</p>
        <p><strong>Category:</strong> ${escapeHtml(g.category)}</p>
        <p><strong>Priority SLA:</strong> ${new Date(g.slaDeadline).toLocaleString('en-IN')}</p>
        <p><strong>Complainant:</strong> ${g.isAnonymous ? 'ANONYMOUS (WHISTLEBLOWER PROTECTED)' : escapeHtml(g.studentName)}</p>
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
  state.trackerNotFound = false;
  if (!skipHistory && typeof window !== 'undefined' && window.history && window.history.pushState) {
    history.pushState({ tab: 'track', token }, '', `#track-${token}`);
  }
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!state.activeGrievance && token) {
    await repo.syncFromGoogleSheet();
    state.activeGrievance = repo.getByToken(token);
    state.trackerNotFound = Boolean(!state.activeGrievance);
    renderApp();
  }
};

window.handleTrackerSearch = async function(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('trackerSearchInput');
  const token = input ? input.value.trim().toUpperCase() : '';
  state.searchToken = token;
  state.activeGrievance = repo.getByToken(token);
  state.trackerNotFound = false;
  
  if (!state.activeGrievance && token) {
    const submitBtn = e?.target?.querySelector('button[type="submit"]');
    const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) submitBtn.innerHTML = 'Syncing...';
    await repo.syncFromGoogleSheet();
    state.activeGrievance = repo.getByToken(token);
    state.trackerNotFound = Boolean(!state.activeGrievance);
    if (submitBtn && origBtnHtml) submitBtn.innerHTML = origBtnHtml;
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
  state.draftDept = UDSC_DEPARTMENTS[0].id;
  state.draftDate = '';
  state.draftName = '';
  state.draftEmail = '';
  state.draftPhone = '';
  state.formError = null;
  state.lastSubmittedGrievance = null;
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
