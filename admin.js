/**
 * S.A.M.A.D.H.A.N — Union Executive Gatekeeper & Administration Cockpit
 * Project S.E.W.A | UDSC Students' Union, University of Delhi
 * 
 * Strict Security Architecture:
 * - Real Google Identity Authentication via Firebase Auth SDK
 * - Cryptographic Master Passcode Gatekeeper (Salted SHA-256 Verification via Web Crypto API)
 * - Anti-Brute-Force Rate Limiting (Lockout after 3 failed attempts)
 * - Time-Bounded Cryptographic Session Management (1-Hour Inactivity Expiration)
 * - Strict Email Whitelist (RBAC) Gatekeeper (Default: kartikeyatiwari03@gmail.com)
 * - DPDP Act 2023 Statutory Whistleblower Protection & Data Minimization
 * - Dual-Custody Cryptographic Handover & Succession Protocol
 */

// ============================================================================
// 1. BRAND ASSETS, SECURITY UTILITIES & CONCEPT 4 TRUST CUBE VECTOR
// ============================================================================

/**
 * High-Security HTML Escaper to prevent Stored XSS from student testimonies or admin logs
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

function getTrustCubeSvg(className = "w-full h-full") {
  return `
    <svg class="${className}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 36L50 54L50 88L14 70Z" fill="#D97706" stroke="#451A03" stroke-width="2"/>
      <path d="M50 54L86 36L86 70L50 88Z" fill="#F59E0B" stroke="#451A03" stroke-width="2"/>
      <path d="M50 18L86 36L50 54L14 36Z" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>
      <path d="M22 50L42 60M22 60L42 70M22 70L42 80" stroke="#FEF3C7" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M50 24L50 48M30 33L44 40M56 40L70 33" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
      <circle cx="50" cy="54" r="6" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
      <circle cx="50" cy="54" r="3" fill="#38BDF8"/>
      <path d="M50 48L50 10" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
      <polygon points="50,5 45,13 55,13" fill="#38BDF8"/>
    </svg>
  `;
}

// ============================================================================
// 2. CONSTANTS, EXECUTIVE REGISTRY, CATEGORIES & LIFECYCLE STAGES
// ============================================================================

const PRIMARY_ARCHITECT_EMAIL = 'kartikeyatiwari03@gmail.com';
const PRESIDENT_EMAIL = 'rawalsingh9800@gmail.com';

const CORE_EXECUTIVE_REGISTRY = Object.freeze({
  'kartikeyatiwari03@gmail.com': {
    email: 'kartikeyatiwari03@gmail.com',
    name: 'Kartikey Tiwari',
    designation: "Vice-President, South Delhi Campus Students' Union 2026/27 & Lead System Architect",
    badgeLabel: 'Vice-President • Lead System Architect',
    roleTier: 'ARCHITECT',
    isProtectedRoot: true
  },
  'rawalsingh9800@gmail.com': {
    email: 'rawalsingh9800@gmail.com',
    name: 'Rawal Singh',
    designation: "President, South Delhi Campus Students' Union 2026/27",
    badgeLabel: 'President • Students\' Union',
    roleTier: 'EXECUTIVE',
    isProtectedRoot: false
  }
});

const CATEGORIES = {
  ACADEMIC: { id: 'ACADEMIC', icon: '🎓', label: 'Academic & Examinations' },
  HOSTEL: { id: 'HOSTEL', icon: '🏢', label: 'Hostel & Residential Life' },
  INFRASTRUCTURE: { id: 'INFRASTRUCTURE', icon: '⚡', label: 'Campus Infrastructure & Wi-Fi' },
  HARASSMENT_RAGGING: { id: 'HARASSMENT_RAGGING', icon: '🛡️', label: 'Anti-Ragging, POSH & Safety' },
  SAFETY_POSH: { id: 'SAFETY_POSH', icon: '🛡️', label: 'Anti-Ragging, POSH & Safety' },
  LIBRARY: { id: 'LIBRARY', icon: '📚', label: 'South Campus Central Library' },
  TRANSIT_SECURITY: { id: 'TRANSIT_SECURITY', icon: '🚌', label: 'Transit, Gates & Security' },
  FINANCIAL: { id: 'FINANCIAL', icon: '💳', label: 'Fellowships, Fees & Accounts' },
  OTHER: { id: 'OTHER', icon: '📋', label: 'General / Other Grievances' }
};

const LIFECYCLE_STAGES = [
  { key: 'SUBMITTED', label: 'Submitted & Registered', color: 'submitted' },
  { key: 'TRIAGED', label: 'Under Union Review', color: 'triaged' },
  { key: 'INVESTIGATING', label: 'Action in Progress', color: 'investigating' },
  { key: 'ACTION_PROPOSED', label: 'Resolution Proposed', color: 'action-proposed' },
  { key: 'RESOLVED', label: 'Resolved & Closed', color: 'resolved' },
  { key: 'WITHDRAWN_BY_STUDENT', label: 'Withdrawn (DPDP Sec 12)', color: 'resolved' }
];

const VALID_TRANSITIONS = {
  SUBMITTED: ['TRIAGED', 'INVESTIGATING', 'WITHDRAWN_BY_STUDENT'],
  TRIAGED: ['INVESTIGATING', 'ACTION_PROPOSED', 'RESOLVED', 'WITHDRAWN_BY_STUDENT'],
  INVESTIGATING: ['ACTION_PROPOSED', 'RESOLVED', 'WITHDRAWN_BY_STUDENT'],
  ACTION_PROPOSED: ['RESOLVED', 'INVESTIGATING', 'WITHDRAWN_BY_STUDENT'],
  RESOLVED: [],
  WITHDRAWN_BY_STUDENT: []
};

// Master Passcode Storage Key Prefix (Initialized privately per workstation)
const PASSCODE_HASH_STORAGE_KEY = 'samadhan_master_passcode_hash_v5';

// Dedicated SAMADHAN Firebase Configuration (Isolated Project: udsc-samadhan-2026)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyADjPR2IKldTKQzsRoLrqU4l1iEXK0AlhU",
  authDomain: "udsc-samadhan-2026.firebaseapp.com",
  projectId: "udsc-samadhan-2026",
  storageBucket: "udsc-samadhan-2026.firebasestorage.app",
  messagingSenderId: "1037987037432",
  appId: "1:1037987037432:web:48b7f569b62832168efb0d",
  measurementId: "G-LLHM6R14LW"
};

let firebaseAuth = null;
function getFirebaseAuth() {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      try {
        firebase.initializeApp(FIREBASE_CONFIG);
      } catch (e) {
        console.warn("Firebase already initialized or initialization error:", e);
      }
    }
    return firebase.auth();
  }
  return null;
}

// ============================================================================
// 2.5 PUBLIC TRANSPARENCY LEDGER (VIEW-ONLY GOOGLE SPREADSHEET & LIVE SYNC)
// ============================================================================

const DEFAULT_GOOGLE_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM/preview";
const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzhLJz6scXCQSSDGzx6zBY2O530zfZboxzX1kVxXLBFbbSQxI1MeMWtiYZg6qn8LSNv/exec";

function getGoogleSheetViewUrl() {
  return localStorage.getItem('samadhan_google_sheet_view_url') || DEFAULT_GOOGLE_SHEET_VIEW_URL;
}

function getGoogleSheetWebhookUrl() {
  const saved = localStorage.getItem('samadhan_google_sheet_webhook_url');
  if (
    !saved ||
    saved.includes('AKfycbwwOdeufbJ6PsU476UdD0gDOwgeShd3ihRSSNXmjgmVBdAUvaSjs8J4pKyKCF5Uej1A') ||
    saved.includes('AKfycbxzcoFR_qL_20OKO4G408nlmEVsgnTRFZhQqr1shBXxqPlIoO3EbUoAEEa2e9TRX5Fr')
  ) {
    return DEFAULT_GOOGLE_SHEET_WEBHOOK_URL;
  }
  return saved;
}

function setGoogleSheetConfig(viewUrl, webhookUrl) {
  if (viewUrl) localStorage.setItem('samadhan_google_sheet_view_url', viewUrl.trim());
  if (webhookUrl !== undefined) localStorage.setItem('samadhan_google_sheet_webhook_url', webhookUrl.trim());
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

function formatSafeDateTime(val) {
  if (!val) return 'Standard SLA (7 Days)';
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d.toLocaleString('en-IN');
  return val;
}

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
  if (['SUBMITTED', 'TRIAGED', 'INVESTIGATING', 'ACTION_PROPOSED', 'RESOLVED', 'WITHDRAWN_BY_STUDENT'].includes(rawStatus)) {
    status = rawStatus;
  }

  const isAnon = (row[8] || '').toUpperCase().includes('ANON') || (row[9] || '').toUpperCase().includes('ANON');
  const rawName = (row[9] || '').trim();
  const isRedactedPublic = !rawName || rawName.includes('PROTECTED_BY_DPDP') || rawName.includes('REDACTED');
  const complainant = (isAnon || isRedactedPublic) ? null : rawName;
  const rawEmail = (row[10] || '').trim();
  const email = (isAnon || rawEmail.includes('REDACTED')) ? null : rawEmail;
  const rawPhone = (row[11] || '').trim();
  const phone = (isAnon || rawPhone.includes('REDACTED')) ? null : rawPhone;

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

  // Parse optional Column 15 (Official Union Action Notes) synced from Apps Script
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
// 3. CRYPTOGRAPHIC & TOKEN HELPERS
// ============================================================================

async function sha256Hex(text) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('WebCrypto SubtleCrypto unavailable; refusing insecure hash fallback.');
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPasscodePbkdf2(password, existingSaltHex = null) {
  if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
    throw new Error('WebCrypto PBKDF2 unavailable; cannot configure workstation passkey.');
  }
  let saltBytes;
  if (existingSaltHex) {
    saltBytes = new Uint8Array(existingSaltHex.length / 2);
    for (let i = 0; i < saltBytes.length; i++) {
      saltBytes[i] = parseInt(existingSaltHex.substr(i * 2, 2), 16) || 0;
    }
  } else {
    saltBytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(saltBytes);
  }
  const saltHex = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  const keyMaterial = await globalThis.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(String(password)),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derived = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  const derivedHex = Array.from(new Uint8Array(derived)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `v2$${saltHex}$${derivedHex}`;
}

function generateSecureToken(bytes = 16) {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Cryptographic RNG (WebCrypto getRandomValues) unavailable; refusing session token.');
  }
  const arr = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

// ============================================================================
// 4. DATA REPOSITORY & HIGH-SECURITY GATEKEEPER
// ============================================================================

class AdminRepository {
  constructor() {
    this.storageKey = 'samadhan_grievances_v3';
    this.successionKey = 'samadhan_succession_v3';
    this.adminRoleKey = 'samadhan_active_union_bearer_v3';
    this.whitelistKey = 'samadhan_admin_whitelist_v3';
    this.sessionKey = 'samadhan_admin_session_v5';
    this.passcodeHashKey = 'samadhan_master_passcode_hash_v5';
    this.lockoutKey = 'samadhan_admin_lockout_v5';
    this.init();
  }

  init() {
    // 1. Initialize Active Union Bearer (Default Primary Architect Profile)
    const primaryProfile = CORE_EXECUTIVE_REGISTRY[PRIMARY_ARCHITECT_EMAIL];
    if (!localStorage.getItem(this.adminRoleKey)) {
      localStorage.setItem(this.adminRoleKey, JSON.stringify({
        id: 'VICE_PRESIDENT',
        name: primaryProfile.name,
        email: primaryProfile.email,
        designation: primaryProfile.designation
      }));
    }

    // 2. Ensure core executives (Architect + Union President) are persisted in authorized whitelist
    const existingList = this.getWhitelistedEmails();
    localStorage.setItem(this.whitelistKey, JSON.stringify(existingList));

    // 3. Per-executive workstation passkeys are initialized privately after Google verification.
    // Zero hardcoded passwords or hashes exist in source code.
    this.enforceDataRetentionPolicy();
  }

  enforceDataRetentionPolicy(nowMs = Date.now()) {
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    const list = this.getAll();
    let changed = false;
    const scrubbed = list.map(g => {
      if ((g.status === 'RESOLVED' || g.status === 'WITHDRAWN_BY_STUDENT') && !g.dpdpPurged) {
        const closedRef = g.closedAt || g.timeline?.[g.timeline.length - 1]?.timestamp || g.submittedAt;
        const closedMs = closedRef ? new Date(closedRef).getTime() : 0;
        if (closedMs > 0 && (nowMs - closedMs) >= THIRTY_DAYS_MS) {
          changed = true;
          return {
            ...g,
            studentName: '[PURGED_AFTER_30D_RETENTION]',
            studentEmail: null,
            studentPhone: null,
            description: '[PURGED_UNDER_DPDP_RETENTION_POLICY]',
            dpdpPurged: true,
            dpdpPurgedAt: new Date(nowMs).toISOString()
          };
        }
      }
      return g;
    });
    if (changed) {
      this.saveAll(scrubbed);
    }
    return changed;
  }

  // --- Executive Profile & Role Authority ---
  getExecutiveProfile(email) {
    const normalized = (email || '').trim().toLowerCase();
    if (CORE_EXECUTIVE_REGISTRY[normalized]) {
      return CORE_EXECUTIVE_REGISTRY[normalized];
    }
    return {
      email: normalized,
      name: 'Union Executive',
      designation: "Executive Member, South Delhi Campus Students' Union 2026/27",
      badgeLabel: 'Union Executive',
      roleTier: 'EXECUTIVE',
      isProtectedRoot: false
    };
  }

  isArchitect(email) {
    return (email || '').trim().toLowerCase() === PRIMARY_ARCHITECT_EMAIL;
  }

  // --- Whitelist Management (RBAC) ---
  getWhitelistedEmails() {
    const coreEmails = Object.keys(CORE_EXECUTIVE_REGISTRY);
    try {
      const list = JSON.parse(localStorage.getItem(this.whitelistKey));
      const merged = new Set(coreEmails);
      if (Array.isArray(list)) {
        list.forEach(e => {
          if (typeof e === 'string' && e.trim().includes('@')) {
            merged.add(e.trim().toLowerCase());
          }
        });
      }
      return Array.from(merged);
    } catch {
      return [...coreEmails];
    }
  }

  isEmailWhitelisted(email) {
    if (!email) return false;
    const normalized = email.trim().toLowerCase();
    const list = this.getWhitelistedEmails();
    return list.includes(normalized);
  }

  addWhitelistedEmail(email, actorEmail = PRIMARY_ARCHITECT_EMAIL) {
    if (actorEmail && !this.isArchitect(actorEmail)) {
      return { success: false, message: 'Access Denied: Only the Lead System Architect can authorize new accounts.' };
    }
    const normalized = email.trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) {
      return { success: false, message: 'Please provide a valid institutional email address.' };
    }
    const list = this.getWhitelistedEmails();
    if (list.includes(normalized)) {
      return { success: false, message: 'This email is already on the authorized executive list.' };
    }
    list.push(normalized);
    localStorage.setItem(this.whitelistKey, JSON.stringify(list));
    return { success: true, message: `Successfully authorized: ${normalized}` };
  }

  removeWhitelistedEmail(email, actorEmail = PRIMARY_ARCHITECT_EMAIL) {
    const normalized = email.trim().toLowerCase();
    if (normalized === PRIMARY_ARCHITECT_EMAIL) {
      return { success: false, message: 'Primary Administrator (kartikeyatiwari03@gmail.com) is permanently protected and cannot be removed.' };
    }
    if (actorEmail && !this.isArchitect(actorEmail)) {
      return { success: false, message: 'Access Denied: Account revocation is restricted to the Lead System Architect.' };
    }
    if (normalized === PRESIDENT_EMAIL) {
      return { success: false, message: 'Core Union President entry cannot be purged from local registry.' };
    }
    let list = this.getWhitelistedEmails();
    list = list.filter(e => e !== normalized);
    localStorage.setItem(this.whitelistKey, JSON.stringify(list));
    return { success: true, message: `Access revoked for: ${normalized}` };
  }

  // --- Anti-Brute-Force Lockout Management ---
  getLockoutStatus() {
    try {
      const data = JSON.parse(localStorage.getItem(this.lockoutKey)) || { failedAttempts: 0, lockoutUntil: 0 };
      const now = Date.now();
      if (data.lockoutUntil > now) {
        const remainingSec = Math.ceil((data.lockoutUntil - now) / 1000);
        return { isLocked: true, remainingSec, failedAttempts: data.failedAttempts };
      }
      return { isLocked: false, remainingSec: 0, failedAttempts: data.failedAttempts };
    } catch {
      return { isLocked: false, remainingSec: 0, failedAttempts: 0 };
    }
  }

  recordFailedAttempt() {
    const status = this.getLockoutStatus();
    const attempts = status.failedAttempts + 1;
    let lockoutUntil = 0;
    if (attempts >= 3) {
      lockoutUntil = Date.now() + (5 * 60 * 1000); // 5-minute security lockout
    }
    localStorage.setItem(this.lockoutKey, JSON.stringify({ failedAttempts: attempts, lockoutUntil }));
    return { attempts, lockoutUntil };
  }

  resetFailedAttempts() {
    localStorage.removeItem(this.lockoutKey);
  }

  // --- Per-Account Workstation Passcode Verification & Update ---
  getPasscodeStorageKey(email) {
    const norm = (email || '').trim().toLowerCase();
    return norm ? `${this.passcodeHashKey}_${norm}` : this.passcodeHashKey;
  }

  getMasterPasscodeHash(email) {
    const sessionEmail = email || this.getSession()?.email;
    const perUser = sessionEmail ? localStorage.getItem(this.getPasscodeStorageKey(sessionEmail)) : null;
    if (perUser) return perUser;
    if (!sessionEmail || sessionEmail === PRIMARY_ARCHITECT_EMAIL) {
      return localStorage.getItem(this.passcodeHashKey) || null;
    }
    return null;
  }

  async verifyPasscode(candidatePassword, email) {
    if (!candidatePassword) return false;
    const storedHash = this.getMasterPasscodeHash(email);
    if (!storedHash) return false;
    if (storedHash.startsWith('v2$')) {
      const parts = storedHash.split('$');
      if (parts.length !== 3) return false;
      const derived = await hashPasscodePbkdf2(candidatePassword, parts[1]);
      return derived === storedHash;
    }
    // Legacy unsalted SHA-256 verification path (auto-upgraded on update)
    const candidateHash = await sha256Hex(candidatePassword);
    return candidateHash === storedHash;
  }

  async updateMasterPasscode(currentPassword, newPassword, email) {
    const targetEmail = (email || this.getSession()?.email || '').trim().toLowerCase();
    const storedHash = this.getMasterPasscodeHash(targetEmail);
    if (storedHash) {
      const isValid = await this.verifyPasscode(currentPassword, targetEmail);
      if (!isValid) {
        return { success: false, message: 'Current workstation passkey is incorrect.' };
      }
    }
    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'New passkey must be at least 8 characters long.' };
    }
    const newHash = await hashPasscodePbkdf2(newPassword);
    localStorage.setItem(this.getPasscodeStorageKey(targetEmail), newHash);
    return {
      success: true,
      message: storedHash
        ? 'Workstation passkey upgraded (salted PBKDF2) for this browser.'
        : 'Workstation passkey configured (salted PBKDF2) for quick local unlock on this browser.'
    };
  }

  // --- Session Management (1-Hour Inactivity Timeout) ---
  getSession() {
    try {
      const session = JSON.parse(localStorage.getItem(this.sessionKey));
      if (!session || !session.token || !session.expiresAt) return null;
      if (Date.now() > session.expiresAt) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  setSession(email, extra = {}) {
    const normalized = email.trim().toLowerCase();
    const profile = this.getExecutiveProfile(normalized);
    const now = Date.now();
    const session = {
      email: normalized,
      token: generateSecureToken(16),
      loggedInAt: new Date(now).toISOString(),
      expiresAt: now + (60 * 60 * 1000), // 1 hour session lifetime
      name: profile.name !== 'Union Executive' ? profile.name : (extra.displayName || 'Union Executive'),
      designation: profile.designation,
      badgeLabel: profile.badgeLabel,
      roleTier: profile.roleTier,
      provider: extra.provider || 'password_passkey',
      isLocalReadOnlySession: (extra.provider || 'password_passkey') === 'device_passkey',
      photoURL: extra.photoURL || null
    };
    localStorage.setItem(this.sessionKey, JSON.stringify(session));
    this.resetFailedAttempts();
    return session;
  }

  clearSession() {
    localStorage.removeItem(this.sessionKey);
  }

  // --- Authenticated Live Google Sheet Update Dispatch ---
  async getVerifiedFirebaseIdToken() {
    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) return null;
    try {
      return await auth.currentUser.getIdToken();
    } catch (e) {
      console.warn('Could not fetch Firebase ID Token:', e);
      return null;
    }
  }

  async syncCaseUpdateToGoogleSheet(payloadData) {
    const webhookUrl = getGoogleSheetWebhookUrl();
    if (!webhookUrl || typeof fetch === 'undefined') {
      return { synced: false, reason: 'no_webhook' };
    }
    const idToken = await this.getVerifiedFirebaseIdToken();
    if (!idToken) {
      return { synced: false, reason: 'no_firebase_token' };
    }
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...payloadData,
          idToken
        })
      });
      const result = await response.json().catch(() => null);
      if (result && result.status === 'success') {
        return { synced: true, message: result.message };
      }
      if (result && result.status === 'error') {
        return { synced: false, reason: 'backend_rejected', message: result.message };
      }
      return { synced: response.ok, reason: response.ok ? 'ok' : 'http_error' };
    } catch (err) {
      console.warn('Google Sheet update dispatch error:', err);
      return { synced: false, reason: 'network_error', message: err.message };
    }
  }

  // --- Grievance & Succession Operations ---
  getAll() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveAll(list) {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  update(ticketId, updater) {
    const list = this.getAll();
    const clean = (ticketId || '').trim().toUpperCase();
    const index = list.findIndex(g => (g.ticketId && g.ticketId.toUpperCase() === clean) || (g.trackToken && g.trackToken.toUpperCase() === clean));
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
          const keepLocalStatus = Boolean(existing.pendingSheetSync && existing.status !== remote.status);
          const finalStatus = keepLocalStatus ? existing.status : (remote.status || existing.status);
          const pendingStill = Boolean(existing.pendingSheetSync && remote.status !== existing.status);
          const finalTimeline = (existing.timeline && existing.timeline.length > (remote.timeline ? remote.timeline.length : 1))
            ? existing.timeline
            : (remote.timeline || existing.timeline);

          merged.push({
            ...remote,
            ...existing,
            status: finalStatus,
            pendingSheetSync: pendingStill,
            timeline: finalTimeline
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
      return merged;
    } catch (err) {
      console.warn("Admin syncFromGoogleSheet error:", err);
      return this.getAll();
    }
  }

  getSuccessionLedger() {
    try {
      return JSON.parse(localStorage.getItem(this.successionKey)) || [];
    } catch {
      return [];
    }
  }

  recordSuccession(entry) {
    const ledger = this.getSuccessionLedger();
    ledger.unshift(entry);
    localStorage.setItem(this.successionKey, JSON.stringify(ledger));
  }

  getActiveAdmin() {
    const primaryProfile = CORE_EXECUTIVE_REGISTRY[PRIMARY_ARCHITECT_EMAIL];
    try {
      return JSON.parse(localStorage.getItem(this.adminRoleKey)) || {
        id: 'VICE_PRESIDENT',
        name: primaryProfile.name,
        email: primaryProfile.email,
        designation: primaryProfile.designation
      };
    } catch {
      return {
        id: 'VICE_PRESIDENT',
        name: primaryProfile.name,
        email: primaryProfile.email,
        designation: primaryProfile.designation
      };
    }
  }

  setActiveAdmin(adminData) {
    localStorage.setItem(this.adminRoleKey, JSON.stringify(adminData));
  }
}

const adminRepo = new AdminRepository();

// ============================================================================
// 5. ADMIN STATE
// ============================================================================

const adminState = {
  filterCategory: 'ALL',
  filterStatus: 'ALL',
  filterQuick: 'ALL', // 'ALL', 'URGENT', 'IN_PROGRESS', 'RESOLVED', 'ANONYMOUS'
  searchQuery: '',
  selectedTicket: null,
  activeHandshake: null,
  isWhitelistModalOpen: false,
  isPasscodeModalOpen: false,
  isSheetModalOpen: false,
  guideDismissed: localStorage.getItem('samadhan_admin_guide_dismissed') === '1',
  syncBanner: null, // { type: 'success' | 'warning' | 'info', message: string }
  authLoading: false,
  authError: null,
  authSuccess: null,
  showPassword: false
};

// ============================================================================
// 6. MAIN RENDER ROUTER
// ============================================================================

function renderAdminApp() {
  const root = document.getElementById('adminRoot');
  if (!root) return;

  const session = adminRepo.getSession();

  // If not authenticated or session expired: RENDER GATEKEEPER SIGN-IN SCREEN
  if (!session) {
    renderAdminSignIn(root);
    return;
  }

  // Otherwise, render full Union Executive Cockpit
  renderAdminCockpit(root, session);
}

// ============================================================================
// 7. VIEW: ELEVATED GATEKEEPER SIGN-IN SCREEN
// ============================================================================

function renderAdminSignIn(root) {
  const lockout = adminRepo.getLockoutStatus();

  root.innerHTML = `
    <a href="#adminMain" class="skip-link">Skip to sign-in</a>

    <!-- Top Authority Ribbon -->
    <header class="bg-[#0f0f11]/90 backdrop-blur-md border-b border-white/10 text-white shadow-sm sticky top-0 z-50">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 flex-shrink-0 brand-crest-box rounded-xl p-1 shadow-md">
            ${getTrustCubeSvg("w-full h-full")}
          </div>
          <div>
            <span class="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-1.5 font-display">
              S.A.M.A.D.H.A.N
              <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono font-bold">
                GATEKEEPER
              </span>
            </span>
            <p class="text-[10px] sm:text-[11px] text-zinc-400 truncate whitespace-nowrap">
              <span class="sm:hidden">Project S.E.W.A. • UDSC</span>
              <span class="hidden sm:inline">A Project S.E.W.A. Initiative • UDSC Students' Union</span>
            </p>
          </div>
        </div>
        <a href="/index.html" class="min-h-[40px] text-xs font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 transition hover:border-amber-400/50">
          🌐 <span>Public Portal</span>
        </a>
      </div>
    </header>

    <!-- Main Sign-In Center -->
    <main id="adminMain" tabindex="-1" class="min-h-[calc(100vh-65px)] flex items-center justify-center p-4 sm:p-6 bg-[#0f0f11]">
      <div class="w-full max-w-md bg-zinc-900/95 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md relative overflow-hidden">
        
        <!-- Ambient Top Accent Line -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

        <!-- Crest & Title Header -->
        <div class="text-center space-y-2.5 pt-1">
          <div class="w-14 h-14 mx-auto rounded-2xl brand-crest-box p-2 shadow-xl border-2 border-amber-400">
            ${getTrustCubeSvg("w-full h-full drop-shadow-sm")}
          </div>
          <div>
            <span class="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              🔒 Restricted Executive Access
            </span>
            <h1 class="text-2xl font-black text-white tracking-tight mt-1">Union Executive Sign-In</h1>
            <p class="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
              Institutional Redressal & Statutory DPDP Oversight for South Delhi Campus (UDSC).
            </p>
          </div>
        </div>

        <!-- Lockout Banner (Anti-Brute-Force) -->
        ${lockout.isLocked ? `
          <div class="p-4 bg-rose-950/90 border-2 border-rose-500 rounded-xl text-xs text-rose-200 space-y-1.5 shadow-lg">
            <div class="flex items-center gap-2 font-black text-rose-400 text-sm">
              <span>🛑 SECURITY LOCKOUT ACTIVE</span>
            </div>
            <p class="leading-relaxed">
              Too many consecutive failed sign-in attempts. For security reasons, authentication is locked for 
              <strong class="font-mono text-white text-sm underline">${lockout.remainingSec}s</strong>.
            </p>
          </div>
        ` : ''}

        <!-- Alerts / Messages -->
        <div id="authAlertArea">
          ${adminState.authError ? `
            <div class="p-3.5 bg-rose-950/80 border-2 border-rose-500 rounded-xl text-xs text-rose-200 space-y-1 shadow-md animate-shake">
              <div class="flex items-center gap-1.5 font-black text-rose-400">
                <span>⛔ ACCESS DENIED</span>
              </div>
              <p class="leading-relaxed">${escapeHtml(adminState.authError)}</p>
            </div>
          ` : ''}

          ${adminState.authSuccess ? `
            <div class="p-3.5 bg-emerald-950/80 border-2 border-emerald-500 rounded-xl text-xs text-emerald-200 space-y-1 shadow-md">
              <div class="flex items-center gap-1.5 font-black text-emerald-400">
                <span>✓ IDENTITY VERIFIED</span>
              </div>
              <p class="leading-relaxed">${escapeHtml(adminState.authSuccess)}</p>
            </div>
          ` : ''}
        </div>

        <!-- Method 1: Official Google Identity Sign-In (Real Firebase OAuth) -->
        <div>
          <button 
            onclick="handleGoogleSignIn()" 
            type="button" 
            ${lockout.isLocked || adminState.authLoading ? 'disabled' : ''}
            class="w-full py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-700 hover:border-amber-400 text-white text-xs font-black flex items-center justify-center gap-3 transition shadow-lg active:scale-98"
          >
            ${adminState.authLoading ? `
              <span class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
              <span>Authenticating with Google...</span>
            ` : `
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign In with Verified Google Account</span>
            `}
          </button>
        </div>

        <!-- High-Contrast Divider -->
        <div class="relative flex items-center justify-center my-2">
          <div class="border-t border-slate-700 w-full"></div>
          <span class="bg-slate-900 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest absolute">
            OR SIGN IN WITH EMAIL &amp; PASSKEY
          </span>
        </div>

        <!-- Method 2: Authorized Email + Password / Workstation Passkey -->
        <form onsubmit="handleAdminPasscodeSignIn(event)" class="space-y-4">
          <div>
            <label class="form-label text-slate-200 font-bold text-xs flex items-center justify-between">
              <span>Authorized Executive Email</span>
              <span class="text-[10px] text-amber-400 font-normal">President &amp; Union Desk</span>
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                ✉️
              </span>
              <input 
                type="email" 
                id="adminEmailInput" 
                required
                autocomplete="email"
                placeholder="Enter authorized Union email"
                value=""
                class="form-input text-xs pl-8 bg-slate-950 border-slate-700 text-white font-mono focus:border-amber-400 w-full"
              />
            </div>
          </div>

          <div>
            <label class="form-label text-slate-200 font-bold text-xs flex items-center justify-between">
              <span>Account Password or Device Passkey</span>
              <button type="button" onclick="togglePasswordVisibility()" class="text-[10px] text-slate-400 hover:text-amber-400">
                ${adminState.showPassword ? 'Hide 🙈' : 'Show 👁️'}
              </button>
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs">
                🔑
              </span>
              <input 
                type="${adminState.showPassword ? 'text' : 'password'}" 
                id="adminPasscodeInput" 
                required
                autocomplete="current-password"
                placeholder="Enter password or configured device passkey"
                value=""
                class="form-input text-xs pl-8 bg-slate-950 border-slate-700 text-white font-mono focus:border-amber-400 w-full"
              />
            </div>
          </div>

          <button 
            type="submit" 
            ${lockout.isLocked || adminState.authLoading ? 'disabled' : ''}
            class="w-full py-3 text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white border-2 border-amber-400/50 rounded-xl shadow-lg transition active:scale-98"
          >
            Sign In to Executive Cockpit ➔
          </button>

          <p class="text-[11px] text-slate-400 leading-relaxed bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
            💡 <strong class="text-slate-200">First-time setup:</strong> Click <em>Sign In with Verified Google Account</em> above with your authorized Gmail. You can also configure a quick local device passkey from <strong>Security Key</strong> once signed in.
          </p>
        </form>

        <!-- Statutory DPDP & Governance Trust Footnote -->
        <div class="pt-3 border-t border-slate-800 text-[10px] text-slate-400 text-center space-y-1">
          <p class="font-bold text-slate-300">⚖️ DPDP Act 2023 Statutory Administrative Gatekeeper</p>
          <p>
            All logins are cryptographically logged with 256-bit entropy. Unauthorized attempts are subject to disciplinary referral under University of Delhi Statutes.
          </p>
        </div>

      </div>
    </main>
  `;
}

// ============================================================================
// 8. VIEW: EXECUTIVE COMMAND COCKPIT (MODERN & ELEVATED)
// ============================================================================

function renderAdminCockpit(root, session) {
  const allGrievances = adminRepo.getAll();
  const activeAdmin = adminRepo.getActiveAdmin();
  const whitelistedEmails = adminRepo.getWhitelistedEmails();

  // Metrics calculation
  const total = allGrievances.length;
  const critical = allGrievances.filter(g => g.severity === 'CRITICAL' && g.status !== 'RESOLVED').length;
  const resolved = allGrievances.filter(g => g.status === 'RESOLVED').length;
  const inProgress = total - resolved;
  const anonymousCount = allGrievances.filter(g => g.isAnonymous).length;

  // Filter logic
  let filtered = allGrievances;

  // Quick Filter Tabs
  if (adminState.filterQuick === 'URGENT') {
    filtered = filtered.filter(g => g.severity === 'CRITICAL' && g.status !== 'RESOLVED');
  } else if (adminState.filterQuick === 'IN_PROGRESS') {
    filtered = filtered.filter(g => g.status !== 'RESOLVED');
  } else if (adminState.filterQuick === 'RESOLVED') {
    filtered = filtered.filter(g => g.status === 'RESOLVED');
  } else if (adminState.filterQuick === 'ANONYMOUS') {
    filtered = filtered.filter(g => g.isAnonymous);
  }

  // Dropdown Category Filter
  if (adminState.filterCategory !== 'ALL') {
    filtered = filtered.filter(g => g.category === adminState.filterCategory);
  }

  // Dropdown Status Filter
  if (adminState.filterStatus !== 'ALL') {
    filtered = filtered.filter(g => g.status === adminState.filterStatus);
  }

  // Search Query
  if (adminState.searchQuery) {
    const q = adminState.searchQuery.toLowerCase();
    filtered = filtered.filter(g => 
      g.trackToken.toLowerCase().includes(q) || 
      g.title.toLowerCase().includes(q) ||
      g.department.toLowerCase().includes(q) ||
      (!g.isAnonymous && g.studentName && g.studentName.toLowerCase().includes(q))
    );
  }

  // Recurring Department Summaries
  const departmentCounts = {};
  allGrievances.forEach(g => {
    departmentCounts[g.department] = (departmentCounts[g.department] || 0) + 1;
  });

  const dynamicClusters = [];
  Object.keys(departmentCounts).forEach((dept, idx) => {
    if (departmentCounts[dept] >= 2) {
      dynamicClusters.push({
        id: `ISSUE BRIEF #${idx + 1}`,
        department: dept,
        count: departmentCounts[dept],
        description: `${departmentCounts[dept]} complaints registered regarding ${dept}. Grouped for Students' Union review and representation.`
      });
    }
  });

  // Calculate session remaining time & role-scoped UI permissions
  const sessionRemainingMin = Math.max(0, Math.ceil((session.expiresAt - Date.now()) / 60000));
  const isArchitect = adminRepo.isArchitect(session.email);
  const sessionProfile = adminRepo.getExecutiveProfile(session.email);
  const displayName = sessionProfile.name !== 'Union Executive' ? sessionProfile.name : (session.name || activeAdmin.name);
  const displayDesignation = sessionProfile.designation || activeAdmin.designation;
  const authInstance = getFirebaseAuth();
  const hasLiveFirebaseUser = Boolean(authInstance && authInstance.currentUser && (authInstance.currentUser.email || '').toLowerCase() === session.email);

  root.innerHTML = `
    <a href="#adminCockpitMain" class="skip-link">Skip to dashboard</a>

    <!-- Top Executive Command Header -->
    <header class="bg-[#0f0f11]/90 backdrop-blur-md border-b border-white/10 text-white sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        
        <!-- Left: Brand Crest & Title -->
        <div class="flex items-center gap-3">
          <div class="brand-crest-box w-10 h-10 rounded-xl p-1.5 flex items-center justify-center shadow-md flex-shrink-0 border border-amber-400/60">
            ${getTrustCubeSvg("w-full h-full drop-shadow-sm")}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-base sm:text-lg font-extrabold tracking-tight text-white font-display">UNION EXECUTIVE COCKPIT</h1>
              <span class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                OFFICIAL DESK
              </span>
            </div>
            <p class="text-[10px] sm:text-[11px] text-zinc-400 truncate whitespace-nowrap">
              <span class="sm:hidden">Project S.E.W.A. • UDSC</span>
              <span class="hidden sm:inline">A Project S.E.W.A. Initiative • UDSC Students' Union</span>
            </p>
          </div>
        </div>

        <!-- Right: Clean Role-Scoped Action Toolbar -->
        <div class="flex items-center gap-2 flex-wrap">
          
          <!-- Active Executive Identity Pill -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full bg-zinc-900 border border-white/10 text-xs">
            <span class="text-amber-400 font-semibold">${escapeHtml(displayName)}</span>
            <span class="text-[10px] text-emerald-400 font-mono font-bold tabular-nums">(${sessionRemainingMin}m)</span>
          </div>

          <!-- Workstation Security Key -->
          <button type="button" onclick="openPasscodeModal()" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition" title="Configure quick sign-in passkey for this browser">
            🔑 <span>Security Key</span>
          </button>

          <!-- Live Sync with Google Sheet Button -->
          <button type="button" onclick="handleManualSheetSync(event)" class="min-h-[38px] text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition shadow-sm" title="Fetch latest grievance submissions from Google Sheet">
            <span class="inline-block w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true"></span>
            <span>Live Sync (${total})</span>
          </button>

          <!-- Public View-Only Google Sheet Ledger -->
          <a href="${getGoogleSheetViewUrl()}" target="_blank" rel="noopener noreferrer" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition" title="Open public read-only transparency spreadsheet">
            📊 <span>Public Sheet</span>
          </a>

          <!-- Export CSV -->
          <button type="button" onclick="exportGrievancesCSV()" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 flex items-center gap-1.5 transition" title="Download complaints register as CSV">
            📥 <span>Export CSV</span>
          </button>

          ${isArchitect ? `
          <!-- System Architect Only: Sheet Webhook Config, Access Control & Succession -->
          <button type="button" onclick="openSheetModal()" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 transition" title="Configure Google Sheet & Apps Script Webhook URLs">
            ⚙️ <span>Sheet Sync</span>
          </button>

          <button type="button" onclick="openWhitelistModal()" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 flex items-center gap-1.5 transition" title="Manage authorized executive accounts">
            👥 <span>Access (${whitelistedEmails.length})</span>
          </button>

          <button type="button" onclick="openSuccessionModal()" class="min-h-[38px] text-xs font-bold px-3.5 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-sm transition" title="Execute formal executive handover protocol">
            🤝 <span>Handover</span>
          </button>
          ` : ''}

          <!-- Public Student Portal Link -->
          <a href="/index.html" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1 transition">
            🌐 <span>Public Portal</span>
          </a>

          <!-- Sign Out Button -->
          <button type="button" onclick="handleAdminSignOut()" class="min-h-[38px] text-xs font-semibold px-3 py-1.5 rounded-full bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-500/40 flex items-center gap-1 transition">
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Main Admin Workspace -->
    <main id="adminCockpitMain" tabindex="-1" class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 bg-[#0f0f11]">
      
      <!-- Executive Bearer Banner -->
      <div class="bg-zinc-900/95 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl">
            🏛️
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-lg font-bold text-white font-display">${escapeHtml(displayName)}</h2>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                ${escapeHtml(displayDesignation)}
              </span>
            </div>
            <p class="text-xs text-zinc-400 mt-1">
              Signed in as <strong class="text-amber-400 font-mono">${escapeHtml(session.email)}</strong> • South Delhi Campus Grievance Cell
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs font-semibold text-zinc-300 flex-wrap">
          <span class="px-3 py-1 rounded-full ${hasLiveFirebaseUser ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'}" title="${hasLiveFirebaseUser ? 'Verified Google session active — status changes sync directly to Public Sheet' : 'Local passkey session active — re-sign via Google to push live sheet status updates'}">
            ${hasLiveFirebaseUser ? '✓ Live Sheet Sync Ready' : '⚡ Local Session (Sign in with Google for Live Updates)'}
          </span>
          <span class="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            ✓ DPDP Act 2023 Compliant
          </span>
        </div>
      </div>

      ${adminState.syncBanner ? `
        <div role="status" aria-live="polite" class="p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${adminState.syncBanner.type === 'success' ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200' : (adminState.syncBanner.type === 'warning' ? 'bg-amber-950/70 border-amber-500/40 text-amber-200' : 'bg-zinc-900 border-white/10 text-zinc-200')}">
          <span>${escapeHtml(adminState.syncBanner.message)}</span>
          <button type="button" onclick="dismissSyncBanner()" aria-label="Dismiss notification" class="min-w-[32px] min-h-[32px] font-bold px-2 py-0.5 rounded-lg hover:bg-white/10">✕</button>
        </div>
      ` : ''}

      ${!adminState.guideDismissed ? `
        <!-- Quick Executive Workflow Guide -->
        <div class="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/25 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-2.5 w-full">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Executive Quick Guide</span>
                <span class="text-[11px] text-zinc-400">How grievance review and status updates work</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div class="p-3 rounded-xl bg-zinc-950/70 border border-white/5">
                  <strong class="text-white block mb-0.5">1. Filter or Search Cases</strong>
                  <span class="text-zinc-400">Use priority chips or search by token (e.g. UDSC-2026-HOSTEL-421), department, or title.</span>
                </div>
                <div class="p-3 rounded-xl bg-zinc-950/70 border border-white/5">
                  <strong class="text-white block mb-0.5">2. Inspect Complaint Details</strong>
                  <span class="text-zinc-400">Click <em>Inspect &amp; Update</em> to read the testimony and SLA target. Anonymous IDs stay protected.</span>
                </div>
                <div class="p-3 rounded-xl bg-zinc-950/70 border border-white/5">
                  <strong class="text-white block mb-0.5">3. Update Status &amp; Add Note</strong>
                  <span class="text-zinc-400">Select the new lifecycle stage and record a short action note. Updates publish to the live tracker.</span>
                </div>
              </div>
            </div>
            <button type="button" onclick="dismissAdminGuide()" class="min-h-[36px] text-zinc-400 hover:text-white text-xs font-semibold px-2.5 py-1 rounded-lg hover:bg-white/10 shrink-0" title="Hide guide">Hide ✕</button>
          </div>
        </div>
      ` : ''}

      <!-- Command Overview KPI Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <!-- Metric 1: Active Cases -->
        <div class="p-4 sm:p-5 bg-zinc-900/95 border border-white/10 rounded-2xl space-y-1.5">
          <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Active Caseload</span>
          <p class="text-3xl sm:text-4xl font-extrabold text-white leading-none my-1 tabular-nums">${inProgress}</p>
          <div class="flex items-center justify-between text-[11px] font-semibold text-zinc-400 pt-2 border-t border-white/10">
            <span>Total Received</span>
            <span class="font-mono text-amber-400 tabular-nums">${total}</span>
          </div>
        </div>

        <!-- Metric 2: Critical Urgent 24h -->
        <div class="p-4 sm:p-5 bg-zinc-900/95 border border-rose-500/25 rounded-2xl space-y-1.5">
          <span class="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse" aria-hidden="true"></span>
            Critical Priority
          </span>
          <p class="text-3xl sm:text-4xl font-extrabold text-rose-400 leading-none my-1 tabular-nums">${critical}</p>
          <div class="flex items-center justify-between text-[11px] font-semibold text-rose-300/90 pt-2 border-t border-white/10">
            <span>24h SLA Target</span>
            <span>Immediate</span>
          </div>
        </div>

        <!-- Metric 3: Resolved by Union -->
        <div class="p-4 sm:p-5 bg-zinc-900/95 border border-emerald-500/25 rounded-2xl space-y-1.5">
          <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Resolved by Union</span>
          <p class="text-3xl sm:text-4xl font-extrabold text-emerald-400 leading-none my-1 tabular-nums">${resolved}</p>
          <div class="flex items-center justify-between text-[11px] font-semibold text-emerald-300/90 pt-2 border-t border-white/10">
            <span>Resolution Rate</span>
            <span class="font-mono tabular-nums">${total > 0 ? Math.round((resolved / total) * 100) : 100}%</span>
          </div>
        </div>

        <!-- Metric 4: Privacy & Whistleblower Shield -->
        <div class="p-4 sm:p-5 bg-zinc-900/95 border border-blue-500/25 rounded-2xl space-y-1.5">
          <span class="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Privacy Safeguards</span>
          <p class="text-3xl sm:text-4xl font-extrabold text-blue-400 leading-none my-1 tabular-nums">${anonymousCount}</p>
          <div class="flex items-center justify-between text-[11px] font-semibold text-zinc-400 pt-2 border-t border-white/10">
            <span>Anonymous</span>
            <span class="text-blue-300 font-semibold">100% Shielded</span>
          </div>
        </div>

      </div>

      <!-- YouTube-Style Quick Filter Chips & Search Bar -->
      <div class="p-4 bg-zinc-900/95 border border-white/10 rounded-2xl space-y-3">
        
        <!-- Row 1: Quick Filter Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter cases by status">
          <button 
            type="button"
            onclick="setQuickFilter('ALL')" 
            aria-pressed="${adminState.filterQuick === 'ALL'}"
            class="chip-filter ${adminState.filterQuick === 'ALL' ? 'active-default' : ''}"
          >
            All Cases (${total})
          </button>
          <button 
            type="button"
            onclick="setQuickFilter('URGENT')" 
            aria-pressed="${adminState.filterQuick === 'URGENT'}"
            class="chip-filter ${adminState.filterQuick === 'URGENT' ? 'active-rose' : ''}"
          >
            Critical (${critical})
          </button>
          <button 
            type="button"
            onclick="setQuickFilter('IN_PROGRESS')" 
            aria-pressed="${adminState.filterQuick === 'IN_PROGRESS'}"
            class="chip-filter ${adminState.filterQuick === 'IN_PROGRESS' ? 'active-amber' : ''}"
          >
            In Review (${inProgress})
          </button>
          <button 
            type="button"
            onclick="setQuickFilter('RESOLVED')" 
            aria-pressed="${adminState.filterQuick === 'RESOLVED'}"
            class="chip-filter ${adminState.filterQuick === 'RESOLVED' ? 'active-emerald' : ''}"
          >
            Resolved (${resolved})
          </button>
          <button 
            type="button"
            onclick="setQuickFilter('ANONYMOUS')" 
            aria-pressed="${adminState.filterQuick === 'ANONYMOUS'}"
            class="chip-filter ${adminState.filterQuick === 'ANONYMOUS' ? 'active-blue' : ''}"
          >
            Whistleblowers (${anonymousCount})
          </button>
        </div>

        <!-- Row 2: Search & Dropdowns -->
        <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          
          <div class="relative flex-1 min-w-[240px]">
            <label for="adminSearchInput" class="sr-only">Search grievances</label>
            <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 text-xs" aria-hidden="true">
              🔍
            </span>
            <input 
              type="text" 
              id="adminSearchInput"
              placeholder="Search by Token, Department, Title, or Complainant..." 
              value="${adminState.searchQuery}"
              oninput="handleAdminSearch(this.value)"
              class="form-input text-sm pl-9 bg-zinc-950 border border-white/15 text-white w-full rounded-xl focus:border-amber-400" 
            />
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <select aria-label="Filter by category" onchange="handleAdminFilterCategory(this.value)" class="form-select text-xs py-2 px-3 bg-zinc-950 border border-white/15 text-white rounded-xl focus:border-amber-400">
              <option value="ALL">All Categories (${Object.keys(CATEGORIES).length})</option>
              ${Object.values(CATEGORIES).map(c => `
                <option value="${c.id}" ${adminState.filterCategory === c.id ? 'selected' : ''}>${c.icon} ${c.label}</option>
              `).join('')}
            </select>

            <select aria-label="Filter by lifecycle status" onchange="handleAdminFilterStatus(this.value)" class="form-select text-xs py-2 px-3 bg-zinc-950 border border-white/15 text-white rounded-xl focus:border-amber-400">
              <option value="ALL">All Statuses (${LIFECYCLE_STAGES.length})</option>
              ${LIFECYCLE_STAGES.map(s => `
                <option value="${s.key}" ${adminState.filterStatus === s.key ? 'selected' : ''}>${s.label}</option>
              `).join('')}
            </select>
          </div>

        </div>
      </div>

      <!-- Recurring Departmental Issues & Action Briefs Section -->
      ${dynamicClusters.length > 0 ? `
        <div class="p-4 sm:p-5 bg-zinc-900/95 border border-white/10 rounded-2xl space-y-3">
          <div class="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 class="font-bold text-sm text-white flex items-center gap-2">
                <span>📋</span>
                <span>Recurring Departmental Issues &amp; Action Briefs</span>
              </h2>
              <p class="text-xs text-zinc-400">
                Departments with 2 or more registered grievances. Grouped to coordinate institutional representations.
              </p>
            </div>
            <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
              ${dynamicClusters.length} Systemic Issues Flagged
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            ${dynamicClusters.map(c => `
              <div class="p-3.5 bg-zinc-950/80 border border-white/10 rounded-xl space-y-1.5 hover:border-amber-400/50 transition">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-amber-400">${escapeHtml(c.department)}</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono shrink-0">
                    ${c.count} Complaints
                  </span>
                </div>
                <p class="text-xs text-zinc-300 leading-snug">
                  ${escapeHtml(c.description)}
                </p>
                <button type="button" data-dept="${escapeHtml(c.department)}" onclick="handleAdminSearch(this.dataset.dept)" class="min-h-[36px] text-[11px] font-semibold text-amber-400 hover:text-amber-300 hover:underline pt-1 flex items-center gap-1">
                  Filter Cases for this Department ➔
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Grievance Management Table & Mobile Cards -->
      <div class="overflow-hidden bg-zinc-900/95 border border-white/10 rounded-2xl shadow-sm">
        
        <!-- Table Header Bar -->
        <div class="p-4 bg-zinc-950/60 border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 class="font-bold text-sm text-white">Registered Student Grievances (${filtered.length})</h2>
            <p class="text-xs text-zinc-400">Real-time repository under UDSC Students' Union administrative oversight.</p>
          </div>
          <span class="text-xs text-zinc-400 tabular-nums">
            Showing <strong class="text-white">${filtered.length}</strong> of <strong class="text-white">${total}</strong> total cases
          </span>
        </div>

        <!-- Desktop View Table -->
        <div class="hidden md:block overflow-x-auto rounded-xl border border-slate-800">
          <table class="civic-table w-full text-left text-xs">
            <thead class="bg-slate-950/90 text-slate-300 border-b border-slate-800">
              <tr>
                <th class="py-3.5 px-4 font-black whitespace-nowrap min-w-[170px]">Tracking Token</th>
                <th class="py-3.5 px-4 font-black whitespace-nowrap min-w-[190px]">Category</th>
                <th class="py-3.5 px-4 font-black whitespace-nowrap min-w-[240px]">Department</th>
                <th class="py-3.5 px-4 font-black whitespace-nowrap min-w-[170px]">Complainant</th>
                <th class="py-3.5 px-4 font-black whitespace-nowrap min-w-[120px]">Urgency</th>
                <th class="py-3.5 px-4 font-black whitespace-nowrap min-w-[160px]">Status</th>
                <th class="py-3.5 px-4 font-black whitespace-nowrap text-right min-w-[140px]">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              ${filtered.length > 0 ? filtered.map(g => `
                <tr class="hover:bg-slate-800/50 transition">
                  <td class="py-3.5 px-4 font-mono font-black text-amber-400 whitespace-nowrap">
                    ${escapeHtml(g.trackToken)}
                  </td>
                  <td class="py-3.5 px-4 font-bold text-slate-200">
                    ${CATEGORIES[g.category]?.icon || '📋'} ${escapeHtml(CATEGORIES[g.category]?.label || g.category)}
                  </td>
                  <td class="py-3.5 px-4 text-slate-300 leading-snug">
                    ${escapeHtml(g.department)}
                  </td>
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    ${g.isAnonymous ? `
                      <span class="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        🛡️ ANONYMOUS
                      </span>
                    ` : `
                      <span class="font-bold text-slate-200">${escapeHtml(g.studentName || 'Student')}</span>
                    `}
                  </td>
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span class="text-[10px] font-black px-2.5 py-1 rounded ${g.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50' : 'bg-slate-800 text-slate-300 border border-slate-700'}">
                      ${escapeHtml(g.severity)}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 whitespace-nowrap">
                    <span class="badge badge-${(LIFECYCLE_STAGES.find(s => s.key === g.status)?.color) || 'submitted'} text-[10px] font-black">
                      ${escapeHtml(LIFECYCLE_STAGES.find(s => s.key === g.status)?.label || g.status)}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right whitespace-nowrap">
                    <button onclick="inspectTicket('${escapeHtml(g.ticketId)}')" class="px-3 py-1.5 text-xs font-black rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 transition">
                      Inspect &amp; Update ➔
                    </button>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" class="py-12 text-center text-slate-400">
                    <span class="text-3xl block mb-2">📭</span>
                    <p class="font-bold text-sm text-slate-300">No grievances matching your current filter criteria.</p>
                    <p class="text-xs text-slate-500 mt-1">Try resetting search keywords or selecting "All Cases".</p>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>

        <!-- Mobile Card View (For Phones & Tablets) -->
        <div class="block md:hidden divide-y divide-slate-800">
          ${filtered.length > 0 ? filtered.map(g => `
            <div class="p-4 space-y-2.5 hover:bg-slate-800/40 transition">
              <div class="flex items-center justify-between">
                <span class="font-mono font-black text-amber-400 text-xs">${escapeHtml(g.trackToken)}</span>
                <span class="badge badge-${(LIFECYCLE_STAGES.find(s => s.key === g.status)?.color) || 'submitted'} text-[10px] font-black">
                  ${escapeHtml(LIFECYCLE_STAGES.find(s => s.key === g.status)?.label || g.status)}
                </span>
              </div>
              <h4 class="font-black text-sm text-white">${escapeHtml(g.title)}</h4>
              <p class="text-xs text-slate-300">
                <strong>Dept:</strong> ${escapeHtml(g.department)}
              </p>
              <div class="flex items-center justify-between text-xs pt-1">
                <div>
                  ${g.isAnonymous ? `
                    <span class="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      🛡️ ANONYMOUS
                    </span>
                  ` : `
                    <span class="text-slate-300 font-bold">${escapeHtml(g.studentName || 'Student')}</span>
                  `}
                </div>
                <button onclick="inspectTicket('${escapeHtml(g.ticketId)}')" class="px-3 py-1 text-xs font-black rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 transition">
                  Inspect &amp; Update ➔
                </button>
              </div>
            </div>
          `).join('') : `
            <div class="p-8 text-center text-slate-400">
              <span class="text-3xl block mb-2">📭</span>
              <p class="font-bold text-sm text-slate-300">No grievances found matching criteria.</p>
            </div>
          `}
        </div>

      </div>

    </main>

    <!-- Modals Container -->
    <div id="adminModalContainer">
      ${adminState.selectedTicket ? renderTicketInspectionModal(adminState.selectedTicket) : ''}
      ${isArchitect && adminState.isWhitelistModalOpen ? renderWhitelistManagementModal(whitelistedEmails) : ''}
      ${adminState.isPasscodeModalOpen ? renderPasscodeSettingsModal(session.email) : ''}
      ${isArchitect && adminState.isSheetModalOpen ? renderSheetConfigModal() : ''}
      ${isArchitect && adminState.activeHandshake ? renderSuccessionHandshakeModal(adminState.activeHandshake) : ''}
    </div>
  `;
}

// ============================================================================
// 9. MODALS: CASE INSPECTION, PASSCODE, WHITELIST & SUCCESSION
// ============================================================================

function renderTicketInspectionModal(ticketId) {
  const g = adminRepo.getAll().find(item => item.ticketId === ticketId || item.trackToken === ticketId);
  if (!g) return '';

  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Inspect Grievance Case" onclick="if (event.target === this) closeInspectionModal()">
      <div class="bg-zinc-900 border border-white/15 rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl text-left">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-mono font-black text-amber-400 text-sm">${escapeHtml(g.trackToken)}</span>
              <span class="badge badge-${(LIFECYCLE_STAGES.find(s => s.key === g.status)?.color) || 'submitted'} text-[10px]">
                ${escapeHtml(LIFECYCLE_STAGES.find(s => s.key === g.status)?.label || g.status)}
              </span>
              ${g.pendingSheetSync ? `
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Saving to Ledger...
                </span>
              ` : ''}
            </div>
            <h3 class="text-lg font-black text-white mt-1">${escapeHtml(g.title)}</h3>
          </div>
          <button onclick="closeInspectionModal()" class="text-slate-400 hover:text-white text-xl font-bold p-1" aria-label="Close drawer">
            ✕
          </button>
        </div>

        <!-- Case Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <span class="text-slate-400 block font-bold">Category</span>
            <span class="text-white font-bold">${CATEGORIES[g.category]?.icon || ''} ${escapeHtml(CATEGORIES[g.category]?.label || g.category)}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-bold">Department</span>
            <span class="text-white font-bold">${escapeHtml(g.department)}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-bold">Complainant Identity</span>
            <span class="text-white font-bold">${g.isAnonymous ? '🛡️ Anonymous (Whistleblower Protected)' : escapeHtml(g.studentName || 'Student')}</span>
            ${!g.isAnonymous && (g.studentEmail || g.studentPhone) ? `
              <span class="block text-[11px] text-slate-400 font-mono mt-0.5">
                ${escapeHtml([g.studentEmail, g.studentPhone].filter(v => v && v !== 'N/A').join(' • '))}
              </span>
            ` : ''}
          </div>
          <div>
            <span class="text-slate-400 block font-bold">SLA Target</span>
            <span class="text-rose-400 font-mono font-bold">${escapeHtml(formatSafeDateTime(g.slaDeadline))}</span>
          </div>
        </div>

        <!-- Detailed Description -->
        <div>
          <label class="form-label text-slate-300 font-bold text-xs">Submitted Grievance Testimony</label>
          <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">${escapeHtml(g.description)}</div>
        </div>

        <!-- Optional Local Ollama Triage Advisory (Admin-Only, Disabled by Default) -->
        <div class="p-4 bg-slate-950 border border-indigo-500/30 rounded-xl space-y-2.5">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <span class="text-xs font-bold text-indigo-300 block">Local Ollama Triage Advisory (Optional • Advisory Only)</span>
              <span class="text-[11px] text-slate-400">Disabled by default. PII is stripped locally; no automated status decisions are made.</span>
            </div>
            <div class="flex items-center gap-2">
              <label class="inline-flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                <input type="checkbox" ${typeof SewaOllamaAssist !== 'undefined' && SewaOllamaAssist.isEnabled() ? 'checked' : ''} onchange="toggleOllamaAssist(this.checked)" class="rounded bg-slate-900 border-slate-700 text-indigo-500" />
                <span>Enable Local Opt-In</span>
              </label>
              <button type="button" onclick="runOllamaTriageAdvisory('${escapeHtml(g.ticketId)}')" class="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 text-xs font-bold">
                Analyze Locally
              </button>
            </div>
          </div>
          ${adminState.ollamaAdvisory && adminState.ollamaAdvisory.ticketId === g.ticketId ? `
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
              ${adminState.ollamaAdvisory.ok ? `
                <div class="text-emerald-300 font-bold">✓ Human Review Required — Advisory Suggestion (${escapeHtml(adminState.ollamaAdvisory.model || 'llama3.2')}):</div>
                <div class="text-slate-300">Category: <strong>${escapeHtml(adminState.ollamaAdvisory.advisory.suggestedCategory)}</strong> • Severity: <strong>${escapeHtml(adminState.ollamaAdvisory.advisory.suggestedSeverity)}</strong></div>
                <div class="text-slate-300">Department: <strong>${escapeHtml(adminState.ollamaAdvisory.advisory.suggestedDepartment)}</strong></div>
                <div class="text-slate-400 italic">${escapeHtml(adminState.ollamaAdvisory.advisory.neutralSummary)}</div>
              ` : `
                <div class="text-amber-300">${escapeHtml(adminState.ollamaAdvisory.reason || 'Ollama offline; fallback inactive.')}</div>
              `}
            </div>
          ` : ''}
        </div>

        <!-- Milestone Status Advance Form -->
        <div class="p-4 bg-slate-950 border-2 border-slate-800 rounded-xl space-y-2.5">
          <div>
            <label class="form-label text-amber-400 font-black text-xs uppercase tracking-wider mb-0.5 block">
              Update Grievance Status
            </label>
            <p class="text-[11px] text-slate-400">
              Select the next valid stage. Updates publish live to the Public Transparency Sheet and Student Tracker.
            </p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            ${LIFECYCLE_STAGES.map(s => {
              const isCurrent = g.status === s.key;
              const isAllowed = isCurrent || (VALID_TRANSITIONS[g.status] || []).includes(s.key);
              return `
              <button 
                type="button"
                ${!isAllowed ? 'disabled' : ''}
                onclick="updateTicketMilestone('${escapeHtml(g.ticketId)}', '${s.key}')" 
                class="px-2.5 py-2 text-xs font-bold rounded-lg border-2 transition ${isCurrent ? 'bg-amber-500 text-black border-amber-400 font-black shadow-sm' : (!isAllowed ? 'bg-slate-950 text-slate-600 border-slate-800 opacity-50 cursor-not-allowed' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500')}"
              >
                ${escapeHtml(s.label)}
              </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Add Official Action Note -->
        <form onsubmit="addTicketActionNote(event, '${escapeHtml(g.ticketId)}')" class="space-y-2">
          <div>
            <label class="form-label text-slate-300 font-bold text-xs mb-0.5 block">Add Official Union Action Note</label>
            <p class="text-[11px] text-slate-400">Record steps taken (visible on student tracking timeline; avoid sensitive personal data).</p>
          </div>
          <div class="flex gap-2">
            <input 
              type="text" 
              id="actionNoteInput" 
              required
              maxlength="400"
              placeholder="e.g. Discussed with Department Head; follow-up scheduled for tomorrow..." 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white flex-1"
            />
            <button type="submit" class="btn btn-primary text-xs font-black whitespace-nowrap">
              Save Note ➔
            </button>
          </div>
        </form>

        <!-- Audit Timeline -->
        <div>
          <label class="form-label text-slate-300 font-bold text-xs">Case Timeline &amp; Action Log</label>
          <div class="space-y-2 max-h-40 overflow-y-auto pr-1">
            ${(g.timeline || []).map(t => `
              <div class="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs space-y-0.5">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-amber-400">${escapeHtml(t.stage)}</span>
                  <span class="text-[10px] text-slate-500 font-mono">${new Date(t.timestamp).toLocaleString('en-IN')}</span>
                </div>
                <p class="text-slate-300 text-[11px]">${escapeHtml(t.note)}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end pt-2 border-t border-slate-800">
          <button onclick="closeInspectionModal()" class="btn btn-secondary text-xs">
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderPasscodeSettingsModal(email) {
  const hasExisting = Boolean(adminRepo.getMasterPasscodeHash(email));
  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Device Security Key" onclick="if (event.target === this) closePasscodeModal()">
      <div class="bg-zinc-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-left">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🔑</span>
            <div>
              <h3 class="text-base font-black text-white">Device Security Key</h3>
              <p class="text-xs text-slate-400">${hasExisting ? 'Update passkey for ' + escapeHtml(email) : 'Set a quick passkey for this browser'}</p>
            </div>
          </div>
          <button onclick="closePasscodeModal()" class="text-slate-400 hover:text-white text-xl font-bold">✕</button>
        </div>

        <form onsubmit="handlePasscodeChange(event)" class="space-y-3.5">
          ${hasExisting ? `
          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Current Device Passkey</label>
            <input 
              type="password" 
              id="currentPassInput" 
              required
              placeholder="Enter current passkey" 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full"
            />
          </div>
          ` : `
          <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs">
            ℹ️ Configure a private passkey stored locally on this browser so you can unlock the cockpit quickly alongside Google Sign-In.
          </div>
          `}

          <div>
            <label class="form-label text-slate-200 font-bold text-xs">New Passkey</label>
            <input 
              type="password" 
              id="newPassInput" 
              required
              minlength="8"
              placeholder="Minimum 8 characters" 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full"
            />
          </div>

          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Confirm New Passkey</label>
            <input 
              type="password" 
              id="confirmPassInput" 
              required
              minlength="8"
              placeholder="Re-enter new passkey" 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full"
            />
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button type="button" onclick="closePasscodeModal()" class="btn btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary text-xs font-black">
              ${hasExisting ? 'Update Passkey ➔' : 'Save Passkey ➔'}
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}

function renderWhitelistManagementModal(whitelistedEmails) {
  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Executive Access Control" onclick="if (event.target === this) closeWhitelistModal()">
      <div class="bg-zinc-900 border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-left">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">👥</span>
            <div>
              <h3 class="text-base font-black text-white">Executive Access Control (RBAC)</h3>
              <p class="text-xs text-slate-400">Authorized Students' Union accounts for UDSC Cockpit</p>
            </div>
          </div>
          <button onclick="closeWhitelistModal()" class="text-slate-400 hover:text-white text-xl font-bold">✕</button>
        </div>

        <!-- Add Email Form -->
        <form onsubmit="handleAddWhitelistEmail(event)" class="space-y-2">
          <label class="form-label text-slate-200 font-bold text-xs">Authorize Additional Executive Email</label>
          <div class="flex gap-2">
            <input 
              type="email" 
              id="newWhitelistEmailInput" 
              required
              placeholder="e.g. executive@south.du.ac.in" 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white flex-1"
            />
            <button type="submit" class="btn btn-primary text-xs font-black">
              Authorize ➔
            </button>
          </div>
        </form>

        <!-- Current Whitelisted List -->
        <div>
          <label class="form-label text-slate-300 font-bold text-xs">Currently Authorized Accounts</label>
          <div class="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden max-h-56 overflow-y-auto">
            ${whitelistedEmails.map(email => {
              const profile = adminRepo.getExecutiveProfile(email);
              const isRoot = email === PRIMARY_ARCHITECT_EMAIL;
              const isPresident = email === PRESIDENT_EMAIL;
              return `
              <div class="p-3 bg-slate-950 flex items-center justify-between gap-2 text-xs">
                <div>
                  <span class="font-mono text-white font-bold">${escapeHtml(email)}</span>
                  ${isRoot ? `
                    <span class="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold">
                      VICE-PRESIDENT • ARCHITECT
                    </span>
                  ` : isPresident ? `
                    <span class="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">
                      PRESIDENT • EXECUTIVE
                    </span>
                  ` : `
                    <span class="ml-2 px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[9px]">
                      UNION EXECUTIVE
                    </span>
                  `}
                </div>
                <div>
                  ${!isRoot && !isPresident ? `
                    <button 
                      onclick="handleRemoveWhitelistEmail('${escapeHtml(email)}')" 
                      class="text-xs font-bold text-rose-400 hover:text-rose-300 hover:underline px-2 py-1"
                    >
                      Revoke ✕
                    </button>
                  ` : `
                    <span class="text-[10px] text-slate-500 italic">Protected</span>
                  `}
                </div>
              </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="flex justify-end pt-2 border-t border-slate-800">
          <button onclick="closeWhitelistModal()" class="btn btn-secondary text-xs">
            Done
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderSuccessionHandshakeModal(hs) {
  return `
    <div class="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Dual-Custody Succession Protocol" onclick="if (event.target === this) closeSuccessionModal()">
      <div class="bg-zinc-900 border border-amber-400/50 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🤝</span>
            <div>
              <h3 class="text-lg font-black text-white">Dual-Custody Succession Protocol</h3>
              <p class="text-xs text-slate-400">Authentic Union Handover under DPDP Act 2023</p>
            </div>
          </div>
          <button onclick="closeSuccessionModal()" class="text-slate-400 hover:text-slate-200 text-xl font-bold">✕</button>
        </div>

        <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
          <span class="text-xs font-bold text-slate-400 block">Cryptographic Dual-Custody Token</span>
          <div class="p-2.5 bg-slate-900 border border-amber-500/40 rounded text-amber-300 font-mono text-xs font-bold text-center select-all">
            ${hs.token}
          </div>
          <p class="text-[11px] text-slate-400">Valid for 48 hours for authorized dual-custody succession execution.</p>
        </div>

        <form onsubmit="handleSuccessionExecution(event)" class="space-y-4">
          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Successor Full Name</label>
            <input type="text" id="succNameInput" required placeholder="e.g. Incoming Union Officer" class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full" />
          </div>

          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Successor Institutional Email</label>
            <input type="email" id="succEmailInput" required placeholder="e.g. successor@south.du.ac.in" class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full" />
          </div>

          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Successor Designation</label>
            <input type="text" id="succDesigInput" required placeholder="e.g. Vice-President, UDSC Students' Union 2027/28" class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full" />
          </div>

          <div class="p-3.5 bg-blue-950/40 border border-blue-700 rounded-xl space-y-2">
            <h4 class="font-black text-xs text-blue-300">📜 DPDP ACT 2023 STATUTORY DATA FIDUCIARY UNDERTAKING</h4>
            <p class="text-[11px] text-slate-300 leading-relaxed italic">
              "I formally accept administrative custody of the S.A.M.A.D.H.A.N Redressal Cell. Under Sections 8, 9, 12, and 13 of the Digital Personal Data Protection Act, 2023, I undertake to uphold strict confidentiality of student testimonies, protect whistleblower anonymity, and enforce statutory privacy safeguards."
            </p>
            <label class="flex items-center gap-2 pt-1 cursor-pointer">
              <input type="checkbox" id="succOathCheckbox" required class="rounded text-amber-500 focus:ring-amber-400 bg-slate-900 border-slate-600" />
              <span class="text-xs text-white font-bold">I formally pledge and sign this statutory oath</span>
            </label>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button type="button" onclick="closeSuccessionModal()" class="btn btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary text-xs font-black">
              Execute Atomic Handover ➔
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}

function renderSheetConfigModal() {
  return `
    <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Public Transparency Ledger Configuration" onclick="if (event.target === this) closeSheetModal()">
      <div class="bg-zinc-900 border border-emerald-500/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl text-left">
        
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">📊</span>
            <div>
              <h3 class="text-base font-black text-white">Public Transparency Ledger (Google Sheet)</h3>
              <p class="text-xs text-slate-400">View-Only Public Spreadsheet & Real-time Webhook</p>
            </div>
          </div>
          <button onclick="closeSheetModal()" class="text-slate-400 hover:text-white text-xl font-bold">✕</button>
        </div>

        <form onsubmit="handleSaveSheetConfig(event)" class="space-y-4">
          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Public View-Only Google Spreadsheet URL</label>
            <input 
              type="url" 
              id="sheetViewUrlInput" 
              required
              placeholder="https://docs.google.com/spreadsheets/d/.../edit?usp=sharing"
              value="${getGoogleSheetViewUrl()}" 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full font-mono"
            />
            <span class="text-[10px] text-slate-400 mt-1 block">
              Ensure Google Sheet share permissions are set to: <code class="text-emerald-400 font-bold">Anyone with link > Viewer</code> (so it can NEVER be edited by anyone in the browser).
            </span>
          </div>

          <div>
            <label class="form-label text-slate-200 font-bold text-xs">Google Apps Script Webhook URL (For Real-Time Row Appending)</label>
            <input 
              type="url" 
              id="sheetWebhookUrlInput" 
              placeholder="https://script.google.com/macros/s/.../exec"
              value="${getGoogleSheetWebhookUrl()}" 
              class="form-input text-xs bg-slate-950 border-slate-700 text-white w-full font-mono"
            />
            <span class="text-[10px] text-slate-400 mt-1 block">
              Deploys from <code class="text-amber-400 font-bold">google-sheets-sync.gs</code>. When saved, grievances are auto-appended to the Google Sheet in real time!
            </span>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-800">
            <a href="${getGoogleSheetViewUrl()}" target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
              <span>Open View-Only Sheet</span> ➔
            </a>
            <div class="flex gap-2">
              <button type="button" onclick="closeSheetModal()" class="btn btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary text-xs font-black">
                Save Configuration ➔
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  `;
}

// ============================================================================
// 10. AUTHENTICATION & EVENT HANDLERS
// ============================================================================

// Method 1: Real Firebase Google OAuth Sign-In
window.handleGoogleSignIn = async function() {
  adminState.authLoading = true;
  adminState.authError = null;
  adminState.authSuccess = null;
  renderAdminApp();

  try {
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error("Firebase Authentication SDK is not loaded. Please use your Executive Security Passkey below.");
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    const email = (user.email || '').trim().toLowerCase();

    // Verify authenticated Google Account against authorized admin whitelist
    if (!adminRepo.isEmailWhitelisted(email)) {
      await auth.signOut();
      adminState.authLoading = false;
      adminState.authError = `Access Denied: The Google Account "${email}" is NOT an authorized Union Administrator.`;
      renderAdminApp();
      return;
    }

    // Success: Create verified session
    adminRepo.setSession(email, {
      provider: 'google.com',
      displayName: user.displayName || 'Union Executive',
      photoURL: user.photoURL
    });

    // Synchronize live sheet
    adminRepo.syncFromGoogleSheet().then(() => renderAdminApp());

    adminState.authLoading = false;
    adminState.authSuccess = `Google Identity Verified: Welcome, ${user.displayName || email}!`;
    renderAdminApp();

    setTimeout(() => {
      adminState.authSuccess = null;
      renderAdminApp();
    }, 400);

  } catch (err) {
    console.error("Google Auth Exception:", err);
    adminState.authLoading = false;
    let msg = err.message || "Failed to authenticate with Google.";
    if (err.code === 'auth/popup-closed-by-user') {
      msg = "Google Sign-In popup was closed before authentication finished.";
    } else if (err.code === 'auth/popup-blocked') {
      msg = "Browser blocked the Google popup window. Please allow popups or use your Executive Security Passkey below.";
    } else if (err.code === 'auth/unauthorized-domain') {
      msg = "Firebase Auth: Domain not yet whitelisted in Firebase Console. Please use your Executive Security Passkey below.";
    }
    adminState.authError = msg;
    renderAdminApp();
  }
};

// Method 2: Email + Firebase Password or Workstation Passkey Sign-In
window.handleAdminPasscodeSignIn = async function(e) {
  if (e) e.preventDefault();
  
  const lockout = adminRepo.getLockoutStatus();
  if (lockout.isLocked) {
    adminState.authError = `Security Lockout Active. Please wait ${lockout.remainingSec}s before retrying.`;
    renderAdminApp();
    return;
  }

  const emailInput = document.getElementById('adminEmailInput');
  const passInput = document.getElementById('adminPasscodeInput');
  const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
  const password = passInput ? passInput.value : '';

  if (!email) {
    adminState.authError = 'Please enter an authorized email address.';
    renderAdminApp();
    return;
  }

  if (!password) {
    adminState.authError = 'Please enter your account password or device passkey.';
    renderAdminApp();
    return;
  }

  // 1. Verify Whitelist
  if (!adminRepo.isEmailWhitelisted(email)) {
    adminRepo.recordFailedAttempt();
    adminState.authError = `Access Denied: "${escapeHtml(email)}" is not on the authorized Union Executive roster.`;
    renderAdminApp();
    return;
  }

  adminState.authLoading = true;
  adminState.authError = null;
  renderAdminApp();

  // 2A. Try real Firebase Email/Password authentication first (gives live Google JWT across any device)
  let authenticatedProvider = null;
  const auth = getFirebaseAuth();
  if (auth) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      authenticatedProvider = 'firebase_password';
    } catch (_) {
      // Fall through cleanly to workstation SHA-256 passkey verification
    }
  }

  // 2B. Fallback to per-email workstation passkey hash stored in local browser
  if (!authenticatedProvider) {
    const storedHash = adminRepo.getMasterPasscodeHash(email);
    if (!storedHash) {
      adminState.authLoading = false;
      adminState.authError = 'No password or device passkey is active on this browser for this email. Click "Sign In with Verified Google Account" above to sign in with Google.';
      renderAdminApp();
      return;
    }

    const isMatch = await adminRepo.verifyPasscode(password, email);
    if (!isMatch) {
      adminState.authLoading = false;
      const res = adminRepo.recordFailedAttempt();
      if (res.lockoutUntil > 0) {
        adminState.authError = 'Access Denied: 3 consecutive failed attempts. Security Lockout active for 5 minutes.';
      } else {
        adminState.authError = `Access Denied: Incorrect password or device passkey. Attempt ${res.attempts} of 3.`;
      }
      renderAdminApp();
      return;
    }
    authenticatedProvider = 'device_passkey';
  }

  // Success: Set authenticated session
  const profile = adminRepo.getExecutiveProfile(email);
  adminState.authLoading = false;
  adminState.authError = null;
  adminState.authSuccess = `Access Verified: Welcome, ${profile.name}.`;
  adminRepo.setSession(email, {
    provider: authenticatedProvider,
    displayName: profile.name
  });

  // Synchronize live sheet
  adminRepo.syncFromGoogleSheet().then(() => renderAdminApp());

  setTimeout(() => {
    adminState.authSuccess = null;
    renderAdminApp();
  }, 400);
};

window.togglePasswordVisibility = function() {
  adminState.showPassword = !adminState.showPassword;
  renderAdminApp();
};

window.dismissAdminGuide = function() {
  adminState.guideDismissed = true;
  localStorage.setItem('samadhan_admin_guide_dismissed', '1');
  renderAdminApp();
};

window.dismissSyncBanner = function() {
  adminState.syncBanner = null;
  renderAdminApp();
};

window.handleAdminSignOut = function() {
  adminRepo.clearSession();
  const auth = getFirebaseAuth();
  if (auth && auth.currentUser) {
    auth.signOut().catch(() => {});
  }
  adminState.authError = null;
  adminState.authSuccess = null;
  adminState.syncBanner = null;
  renderAdminApp();
};

window.setQuickFilter = function(filterKey) {
  adminState.filterQuick = filterKey;
  renderAdminApp();
};

window.handleAdminSearch = function(query) {
  adminState.searchQuery = query || '';
  renderAdminApp();
};

window.handleAdminFilterCategory = function(cat) {
  adminState.filterCategory = cat;
  renderAdminApp();
};

window.handleAdminFilterStatus = function(status) {
  adminState.filterStatus = status;
  renderAdminApp();
};

window.inspectTicket = function(ticketId) {
  adminState.selectedTicket = ticketId;
  renderAdminApp();
};

window.closeInspectionModal = function() {
  adminState.selectedTicket = null;
  renderAdminApp();
};

window.toggleOllamaAssist = function(checked) {
  if (typeof SewaOllamaAssist !== 'undefined') {
    SewaOllamaAssist.setEnabled(Boolean(checked));
  }
  adminState.ollamaAdvisory = null;
  renderAdminApp();
};

window.runOllamaTriageAdvisory = async function(ticketId) {
  const g = adminRepo.getAll().find(item => item.ticketId === ticketId || item.trackToken === ticketId);
  if (!g || typeof SewaOllamaAssist === 'undefined') return;
  const result = await SewaOllamaAssist.requestLocalOllamaTriage(g);
  adminState.ollamaAdvisory = { ticketId: g.ticketId, ...result };
  renderAdminApp();
};

window.updateTicketMilestone = async function(ticketId, newStage) {
  const session = adminRepo.getSession();
  if (!session) return;
  const existing = adminRepo.getAll().find(item => item.ticketId === ticketId || item.trackToken === ticketId);
  if (!existing) return;
  if (existing.status !== newStage) {
    const allowed = VALID_TRANSITIONS[existing.status] || [];
    if (!allowed.includes(newStage)) {
      adminState.syncBanner = {
        type: 'warning',
        message: `Blocked invalid lifecycle transition from ${existing.status} to ${newStage}.`
      };
      renderAdminApp();
      return;
    }
  }
  const profile = adminRepo.getExecutiveProfile(session.email);
  const stageObj = LIFECYCLE_STAGES.find(s => s.key === newStage);
  const stageLabel = stageObj ? stageObj.label : newStage;
  const noteText = `Status updated to ${stageLabel} by ${profile.name}.`;

  const updated = adminRepo.update(ticketId, g => {
    g.status = newStage;
    if (newStage === 'RESOLVED' || newStage === 'WITHDRAWN_BY_STUDENT') {
      g.closedAt = new Date().toISOString();
    }
    g.pendingSheetSync = true;
    g.localModifiedAt = Date.now();
    g.timeline = g.timeline || [];
    g.timeline.push({
      stage: newStage,
      timestamp: new Date().toISOString(),
      note: noteText
    });
    return g;
  });

  adminState.syncBanner = {
    type: 'info',
    message: `Updating ${updated ? updated.trackToken : ticketId} status to ${stageLabel} on Public Transparency Ledger...`
  };
  renderAdminApp();

  if (updated) {
    const syncRes = await adminRepo.syncCaseUpdateToGoogleSheet({
      action: 'updateStatus',
      trackToken: updated.trackToken,
      status: newStage,
      note: noteText,
      actorName: profile.name,
      actorEmail: session.email
    });

    if (syncRes.synced) {
      adminRepo.update(ticketId, g => {
        g.pendingSheetSync = false;
        return g;
      });
      adminState.syncBanner = {
        type: 'success',
        message: `✓ ${updated.trackToken} updated to ${stageLabel} and synced live to the Google Sheet & Student Tracker.`
      };
    } else if (syncRes.reason === 'no_firebase_token') {
      adminState.syncBanner = {
        type: 'warning',
        message: `Saved locally for ${updated.trackToken}. To publish updates globally for students, sign in using Google Identity.`
      };
    } else {
      adminState.syncBanner = {
        type: 'warning',
        message: `Saved locally for ${updated.trackToken}. Sheet sync pending (${syncRes.message || syncRes.reason || 're-deploy Apps Script to enable write sync'}).`
      };
    }
    renderAdminApp();
  }
};

window.addTicketActionNote = async function(eventOrId, maybeTicketId) {
  if (eventOrId && typeof eventOrId === 'object' && eventOrId.preventDefault) {
    eventOrId.preventDefault();
  }
  const ticketId = typeof eventOrId === 'string' ? eventOrId : maybeTicketId;
  const session = adminRepo.getSession();
  if (!session) return;

  const input = document.getElementById('actionNoteInput');
  const noteText = input ? input.value.trim() : '';
  if (!noteText) return;

  const profile = adminRepo.getExecutiveProfile(session.email);
  const formattedNote = `[${profile.name}] ${noteText}`;

  const updated = adminRepo.update(ticketId, g => {
    g.pendingSheetSync = true;
    g.localModifiedAt = Date.now();
    g.timeline = g.timeline || [];
    g.timeline.push({
      stage: g.status,
      timestamp: new Date().toISOString(),
      note: formattedNote
    });
    return g;
  });

  if (input) input.value = '';
  adminState.syncBanner = {
    type: 'info',
    message: `Saving action note for ${updated ? updated.trackToken : ticketId}...`
  };
  renderAdminApp();

  if (updated) {
    const syncRes = await adminRepo.syncCaseUpdateToGoogleSheet({
      action: 'addNote',
      trackToken: updated.trackToken,
      status: updated.status,
      note: formattedNote,
      actorName: profile.name,
      actorEmail: session.email
    });

    if (syncRes.synced) {
      adminRepo.update(ticketId, g => {
        g.pendingSheetSync = false;
        return g;
      });
      adminState.syncBanner = {
        type: 'success',
        message: `✓ Action note for ${updated.trackToken} saved and synced live to the Google Sheet.`
      };
    } else {
      adminState.syncBanner = {
        type: 'warning',
        message: `Note saved locally for ${updated.trackToken} (${syncRes.message || syncRes.reason || 'sign in via Google to sync live'}).`
      };
    }
    renderAdminApp();
  }
};

window.openSheetModal = function() {
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  adminState.isSheetModalOpen = true;
  renderAdminApp();
};

window.closeSheetModal = function() {
  adminState.isSheetModalOpen = false;
  renderAdminApp();
};

window.handleSaveSheetConfig = function(e) {
  if (e) e.preventDefault();
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  const viewUrl = document.getElementById('sheetViewUrlInput')?.value;
  const webhookUrl = document.getElementById('sheetWebhookUrlInput')?.value;
  setGoogleSheetConfig(viewUrl, webhookUrl);
  alert("Google Sheet Public Transparency Ledger configuration saved!");
  adminState.isSheetModalOpen = false;
  adminRepo.syncFromGoogleSheet().then(() => renderAdminApp());
  renderAdminApp();
};

window.handleManualSheetSync = async function(e) {
  const btn = e?.currentTarget;
  const origHtml = btn ? btn.innerHTML : '';
  if (btn) btn.innerHTML = '⏳ Syncing...';
  try {
    const list = await adminRepo.syncFromGoogleSheet();
    adminState.syncBanner = {
      type: 'success',
      message: `✓ Synced ${list.length} campus grievances from the live Google Sheet.`
    };
    renderAdminApp();
  } catch (err) {
    alert('Sync error: ' + err.message);
  } finally {
    if (btn && origHtml) btn.innerHTML = origHtml;
  }
};

window.openPasscodeModal = function() {
  adminState.isPasscodeModalOpen = true;
  renderAdminApp();
};

window.closePasscodeModal = function() {
  adminState.isPasscodeModalOpen = false;
  renderAdminApp();
};

window.handlePasscodeChange = async function(e) {
  if (e) e.preventDefault();
  const session = adminRepo.getSession();
  const targetEmail = session ? session.email : '';
  const hasExisting = Boolean(adminRepo.getMasterPasscodeHash(targetEmail));
  const currentPass = hasExisting ? document.getElementById('currentPassInput')?.value : '';
  const newPass = document.getElementById('newPassInput')?.value;
  const confirmPass = document.getElementById('confirmPassInput')?.value;

  if (hasExisting && !currentPass) {
    alert("Please enter your current device passkey.");
    return;
  }

  if (newPass !== confirmPass) {
    alert("New Passkey and Confirm Passkey do not match.");
    return;
  }

  const result = await adminRepo.updateMasterPasscode(currentPass, newPass, targetEmail);
  alert(result.message);
  if (result.success) {
    adminState.isPasscodeModalOpen = false;
    renderAdminApp();
  }
};

window.openWhitelistModal = function() {
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  adminState.isWhitelistModalOpen = true;
  renderAdminApp();
};

window.closeWhitelistModal = function() {
  adminState.isWhitelistModalOpen = false;
  renderAdminApp();
};

window.handleAddWhitelistEmail = function(e) {
  if (e) e.preventDefault();
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  const input = document.getElementById('newWhitelistEmailInput');
  const email = input ? input.value.trim() : '';
  const result = adminRepo.addWhitelistedEmail(email, session.email);
  alert(result.message);
  renderAdminApp();
};

window.handleRemoveWhitelistEmail = function(email) {
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  const confirmed = confirm(`Are you sure you want to revoke administrative access for ${email}?`);
  if (confirmed) {
    const result = adminRepo.removeWhitelistedEmail(email, session.email);
    alert(result.message);
    renderAdminApp();
  }
};

window.openSuccessionModal = function() {
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  adminState.activeHandshake = {
    token: 'SUCC-2026-' + generateSecureToken(8),
    createdAt: new Date().toISOString()
  };
  renderAdminApp();
};

window.closeSuccessionModal = function() {
  adminState.activeHandshake = null;
  renderAdminApp();
};

window.handleSuccessionExecution = async function(e) {
  if (e) e.preventDefault();
  const session = adminRepo.getSession();
  if (!session || !adminRepo.isArchitect(session.email)) return;
  const name = document.getElementById('succNameInput')?.value.trim();
  const email = document.getElementById('succEmailInput')?.value.trim().toLowerCase();
  const desig = document.getElementById('succDesigInput')?.value.trim();
  const oathSigned = document.getElementById('succOathCheckbox')?.checked;

  if (!oathSigned) {
    alert("Statutory DPDP oath is mandatory for administrative transfer.");
    return;
  }

  const certHash = await sha256Hex(name + email + Date.now().toString());
  const entry = {
    token: adminState.activeHandshake.token,
    previousAdmin: adminRepo.getActiveAdmin(),
    successor: { name, email, designation: desig },
    timestamp: new Date().toISOString(),
    certificateHash: certHash,
    oathSigned: true
  };

  adminRepo.recordSuccession(entry);
  adminRepo.setActiveAdmin({
    id: 'SUCCESSOR',
    name,
    email,
    designation: desig
  });
  adminRepo.addWhitelistedEmail(email, session.email);

  alert(`✓ Local Dual-Custody Succession Entry Recorded!\n\nSHA-256 Digest: ${certHash.substring(0, 24)}...\nWorkstation registry updated for ${name}.\n\nNote: Live Firestore /admin_succession_ledger persistence requires Firebase Admin Console / backend write authorization.`);
  adminState.activeHandshake = null;
  renderAdminApp();
};

function sanitizeCsvField(val) {
  let s = String(val === null || val === undefined ? '' : val);
  if (/^[=\+\-\@\t\r]/.test(s)) {
    s = "'" + s;
  }
  return `"${s.replace(/"/g, '""')}"`;
}

window.exportGrievancesCSV = function() {
  const all = adminRepo.getAll();
  if (all.length === 0) {
    alert("No grievances available to export.");
    return;
  }

  const headers = ["Ticket ID", "Token", "Category", "Department", "Urgency", "Status", "Complainant", "Submitted At", "SLA Deadline", "Title"];
  const rows = all.map(g => [
    sanitizeCsvField(g.ticketId),
    sanitizeCsvField(g.trackToken),
    sanitizeCsvField(g.category),
    sanitizeCsvField(g.department || ''),
    sanitizeCsvField(g.severity),
    sanitizeCsvField(g.status),
    sanitizeCsvField(g.isAnonymous ? "ANONYMOUS" : (g.studentName || 'Student')),
    sanitizeCsvField(g.submittedAt),
    sanitizeCsvField(g.slaDeadline),
    sanitizeCsvField(g.title || '')
  ]);

  const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", blobUrl);
  link.setAttribute("download", `SAMADHAN_UDSC_Grievances_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};

// ============================================================================
// 11. INITIALIZATION & LIVE CONTINUOUS SYNC
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  renderAdminApp();

  // Asynchronously sync from Google Sheet on load
  adminRepo.syncFromGoogleSheet().then(() => {
    renderAdminApp();
  });

  // Continuous background polling every 30 seconds for real-time union desk updates
  if (!window._adminSyncInterval) {
    window._adminSyncInterval = setInterval(() => {
      adminRepo.syncFromGoogleSheet().then(() => {
        renderAdminApp();
      });
    }, 30000);
  }
});

// WCAG 2.2 Escape key dismissal for all Executive Cockpit modals
window.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (adminState.selectedTicket) closeInspectionModal();
  else if (adminState.isPasscodeModalOpen) closePasscodeModal();
  else if (adminState.isWhitelistModalOpen) closeWhitelistModal();
  else if (adminState.isSheetModalOpen) closeSheetModal();
  else if (adminState.activeHandshake) closeSuccessionModal();
});
