/**
 * S.A.M.A.D.H.A.N — Google Sheets Public Transparency Ledger Sync Engine
 * Project S.E.W.A | UDSC Students' Union, University of Delhi
 * 
 * ============================================================================
 * SETUP & OPTIMIZATION GUIDE (UNDER 2 MINUTES):
 * ============================================================================
 * 1. Open your Google Spreadsheet:
 *    https://docs.google.com/spreadsheets/d/1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM/edit
 * 2. In Google Sheets, click: Extensions > Apps Script
 * 3. Delete any code in Code.gs and PASTE THIS ENTIRE FILE.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. Run "setupHeaders" or "formatSheetForComfortableViewing":
 *    - In the toolbar dropdown, select "formatSheetForComfortableViewing" > click "Run".
 *    - All 14 columns, cell heights, padding, and text wrapping will instantly auto-format!
 * 6. (Optional) Re-deploy if needed: Click "Deploy" > "Manage deployments" > Edit > New version > "Deploy".
 * 7. Refresh your Google Spreadsheet:
 *    A custom menu "🏛️ SAMADHAN Portal" will now appear in the top menu bar!
 *    You can click: "🏛️ SAMADHAN Portal" > "✨ Format Cells for Comfortable Viewing" anytime!
 * 
 * ============================================================================
 * VIEW-ONLY ENFORCEMENT (STUDENT PRIVACY & INTEGRITY):
 * Click the green "Share" button in Google Sheets:
 * - General Access: "Anyone with the link" -> "Viewer"
 * - This guarantees that visitors or unauthorized users can NEVER edit cells directly.
 * ============================================================================
 */

// Verified Executive Roster for Authenticated Status Updates (Firebase JWT Verified)
var AUTHORIZED_ADMINS = [
  "kartikeyatiwari03@gmail.com",
  "rawalsingh9800@gmail.com"
];

var VALID_LIFECYCLE_STAGES = [
  "SUBMITTED",
  "TRIAGED",
  "INVESTIGATING",
  "ACTION_PROPOSED",
  "RESOLVED",
  "WITHDRAWN_BY_STUDENT"
];

var VALID_CATEGORIES = [
  "ACADEMIC", "HOSTEL", "INFRASTRUCTURE", "HARASSMENT_RAGGING",
  "LIBRARY", "TRANSIT_SECURITY", "FINANCIAL", "OTHER"
];

var VALID_SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

var VALID_TRANSITIONS = {
  "SUBMITTED": ["TRIAGED", "INVESTIGATING", "WITHDRAWN_BY_STUDENT"],
  "TRIAGED": ["INVESTIGATING", "ACTION_PROPOSED", "RESOLVED", "WITHDRAWN_BY_STUDENT"],
  "INVESTIGATING": ["ACTION_PROPOSED", "RESOLVED", "WITHDRAWN_BY_STUDENT"],
  "ACTION_PROPOSED": ["RESOLVED", "INVESTIGATING", "WITHDRAWN_BY_STUDENT"],
  "RESOLVED": [],
  "WITHDRAWN_BY_STUDENT": []
};

// Public Firebase Web API Key for project udsc-samadhan-2026 (used only to verify Google ID tokens)
var FIREBASE_WEB_API_KEY = "AIzaSyADjPR2IKldTKQzsRoLrqU4l1iEXK0AlhU";

// Canonical Comfortable Column Specifications (Dimensions in Pixels)
var COLUMN_CONFIGS = [
  { index: 1,  name: "Timestamp (IST)",               width: 175, align: "center" },
  { index: 2,  name: "Tracking Token",                width: 190, align: "center", font: "Roboto Mono", weight: "bold", color: "#b45309" },
  { index: 3,  name: "Grievance Category",            width: 205, align: "center" },
  { index: 4,  name: "UDSC Department",               width: 250, align: "left"   },
  { index: 5,  name: "Subject Title",                 width: 270, align: "left",   weight: "bold" },
  { index: 6,  name: "Detailed Grievance Testimony",   width: 440, align: "left"   },
  { index: 7,  name: "Urgency / Severity",            width: 135, align: "center", weight: "bold" },
  { index: 8,  name: "Lifecycle Status",              width: 155, align: "center", weight: "bold" },
  { index: 9,  name: "Student Privacy Choice",        width: 215, align: "center" },
  { index: 10, name: "Complainant Identity",          width: 190, align: "left"   },
  { index: 11, name: "Student Institutional Email",   width: 225, align: "left"   },
  { index: 12, name: "Student Phone Number",          width: 155, align: "center" },
  { index: 13, name: "Statutory DPDP Consent",        width: 180, align: "center" },
  { index: 14, name: "SLA Resolution Target (IST)",   width: 180, align: "center" },
  { index: 15, name: "Official Union Action Notes",   width: 340, align: "left"   }
];

var FEEDBACK_SHEET_NAME = "Portal_Feedback";

var FEEDBACK_COLUMN_CONFIGS = [
  { index: 1, name: "Timestamp (IST)",             width: 175, align: "center" },
  { index: 2, name: "Feedback ID",                 width: 165, align: "center", font: "Roboto Mono", weight: "bold", color: "#b45309" },
  { index: 3, name: "UI / Clarity Score (1-5)",    width: 165, align: "center", weight: "bold" },
  { index: 4, name: "Overall UX Score (1-5)",      width: 165, align: "center", weight: "bold" },
  { index: 5, name: "UI / UX Focus Area",          width: 195, align: "center" },
  { index: 6, name: "UI / UX Observations",        width: 360, align: "left"   },
  { index: 7, name: "Requested Features",          width: 360, align: "left"   },
  { index: 8, name: "Context (Device • Lang • Tab)", width: 215, align: "center" }
];

function getPrimaryLedgerSheet_(ss) {
  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() !== FEEDBACK_SHEET_NAME) {
      return sheets[i];
    }
  }
  return sheets[0];
}

function protectSheetReadOnly_(sheet, description) {
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  for (var i = 0; i < protections.length; i++) {
    protections[i].remove();
  }
  var p = sheet.protect().setDescription(description);
  p.removeEditors(p.getEditors());
  if (p.canDomainEdit()) {
    p.setDomainEdit(false);
  }
}

function styleHeaderAndColumns_(sheet, configs) {
  var numCols = configs.length;
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 44);
  for (var i = 0; i < configs.length; i++) {
    sheet.setColumnWidth(configs[i].index, configs[i].width);
  }
  sheet.getRange(1, 1, 1, numCols)
    .setFontWeight("bold")
    .setFontSize(10)
    .setFontFamily("Inter")
    .setBackground("#0f172a")
    .setFontColor("#f59e0b")
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("center")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
}

function getOrCreateFeedbackSheet_(ss) {
  var sheet = ss.getSheetByName(FEEDBACK_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(FEEDBACK_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    var headers = [];
    for (var i = 0; i < FEEDBACK_COLUMN_CONFIGS.length; i++) {
      headers.push(FEEDBACK_COLUMN_CONFIGS[i].name);
    }
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    formatFeedbackSheetLayout_(sheet);
  }
  return sheet;
}

function formatFeedbackSheetLayout_(sheet) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!sheet) {
    sheet = getOrCreateFeedbackSheet_(ss);
  }
  var numCols = FEEDBACK_COLUMN_CONFIGS.length;
  var lastRow = sheet.getLastRow();
  sheet.setFrozenColumns(2);
  styleHeaderAndColumns_(sheet, FEEDBACK_COLUMN_CONFIGS);

  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, numCols)
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
      .setVerticalAlignment("top")
      .setFontFamily("Inter")
      .setFontSize(9.5)
      .setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);

    for (var j = 0; j < FEEDBACK_COLUMN_CONFIGS.length; j++) {
      var cfg = FEEDBACK_COLUMN_CONFIGS[j];
      var colRange = sheet.getRange(2, cfg.index, lastRow - 1, 1);
      colRange.setHorizontalAlignment(cfg.align);
      if (cfg.font) colRange.setFontFamily(cfg.font);
      if (cfg.weight) colRange.setFontWeight(cfg.weight);
      if (cfg.color) colRange.setFontColor(cfg.color);
    }

    for (var r = 2; r <= lastRow; r++) {
      sheet.setRowHeight(r, Math.max(sheet.getRowHeight(r) || 0, 48));
      sheet.getRange(r, 1, 1, numCols).setBackground(r % 2 === 0 ? "#ffffff" : "#f8fafc");
    }
  }

  try {
    protectSheetReadOnly_(sheet, 'S.A.M.A.D.H.A.N Portal UI/UX Feedback Tab — Protected');
  } catch (e) {}
}

function formatFeedbackSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateFeedbackSheet_(ss);
  formatFeedbackSheetLayout_(sheet);
}

/**
 * Custom Google Sheets Top Menu Integration
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🏛️ SAMADHAN Portal")
    .addItem("✨ Format Cells for Comfortable Viewing", "formatSheetForComfortableViewing")
    .addItem("💬 Format Portal Feedback Tab", "formatFeedbackSheet")
    .addItem("🧹 Scrub Historical PII & Testimonies (DPDP)", "sanitizeExistingPublicLedgerRows")
    .addItem("🔒 Enforce Read-Only Sheet Protection", "lockSheetReadOnly")
    .addItem("🔄 Reset Header Styles", "setupHeaders")
    .addToUi();
}

/**
 * One-Click Historical PII & Testimony Redaction (Preserves Case Rows, Metrics & Tracking)
 * Run once from Apps Script toolbar or via the "🏛️ SAMADHAN Portal" menu after migration.
 */
function sanitizeExistingPublicLedgerRows() {
  var sheet = getPrimaryLedgerSheet_(SpreadsheetApp.getActiveSpreadsheet());
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return;
  }

  for (var r = 2; r <= lastRow; r++) {
    var token = String(sheet.getRange(r, 2).getValue() || "").trim();
    if (!token) continue;

    var category = String(sheet.getRange(r, 3).getValue() || "").trim().toUpperCase();
    var privacyVal = String(sheet.getRange(r, 9).getValue() || "").trim().toUpperCase();
    var isAnon = privacyVal.indexOf("ANON") !== -1;

    if (category.indexOf("HARASS") !== -1 || category.indexOf("SAFETY") !== -1 || category.indexOf("POSH") !== -1) {
      sheet.getRange(r, 5).setValue("Confidential Safety / POSH Matter (Details Shielded)");
    }
    sheet.getRange(r, 6).setValue("[CONFIDENTIAL_TESTIMONY_WITHHELD_PUBLICLY]");
    sheet.getRange(r, 9).setValue(isAnon ? "ANONYMOUS (WHISTLEBLOWER SHIELD)" : "IDENTIFIED (PRIVATE CONF. SHIELDED)");
    sheet.getRange(r, 10).setValue(isAnon ? "ANONYMOUS (WHISTLEBLOWER SHIELDED)" : "[PROTECTED_BY_DPDP_PRIVACY_BOUNDARY]");
    sheet.getRange(r, 11).setValue("[REDACTED_PUBLIC_LEDGER]");
    sheet.getRange(r, 12).setValue("[REDACTED_PUBLIC_LEDGER]");
  }

  try {
    formatSheetLayout(sheet);
  } catch (e) {}
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast("Historical PII & raw testimonies redacted across " + (lastRow - 1) + " rows cleanly.", "🧹 DPDP Scrubbing Complete", 6);
  } catch (e) {}
}

/**
 * Enforces Read-Only Protection on the Spreadsheet
 * Prevents unauthorized or accidental cell modification.
 */
function lockSheetReadOnly() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getPrimaryLedgerSheet_(ss);
  protectSheetReadOnly_(sheet, 'S.A.M.A.D.H.A.N Immutable Public Transparency Ledger — Protected');
  var feedbackSheet = ss.getSheetByName(FEEDBACK_SHEET_NAME);
  if (feedbackSheet) {
    try {
      protectSheetReadOnly_(feedbackSheet, 'S.A.M.A.D.H.A.N Portal UI/UX Feedback Tab — Protected');
    } catch (e) {}
  }
  try {
    ss.toast('Ledger & Feedback tabs are locked and protected in read-only mode!', '🔒 Protection Enforced', 5);
  } catch (e) {}
}

/**
 * One-Click Layout Optimizer for Comfortable On-Screen Viewing
 */
function formatSheetForComfortableViewing() {
  var sheet = getPrimaryLedgerSheet_(SpreadsheetApp.getActiveSpreadsheet());
  formatSheetLayout(sheet);
}

/**
 * Core Formatting Engine
 * Applies generous column widths, dynamic text wrapping, comfortable row heights,
 * frozen navigation panes, and high-legibility typographic hierarchy.
 */
function formatSheetLayout(sheet) {
  if (!sheet) {
    sheet = getPrimaryLedgerSheet_(SpreadsheetApp.getActiveSpreadsheet());
  }
  
  var numCols = COLUMN_CONFIGS.length;
  var lastRow = sheet.getLastRow();
  
  // 1. Set generous column widths so each record is fully visible without clipping
  // 2. Freeze Navigation Panes (Header row + First two columns: Timestamp & Tracking Token)
  sheet.setFrozenColumns(2);
  
  // 3. Style Header Row (Row 1)
  styleHeaderAndColumns_(sheet, COLUMN_CONFIGS);
    
  // 4. Style All Data Rows (Row 2 onwards)
  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, numCols);
    
    // Set universal wrap strategy so multi-line text wraps gracefully
    dataRange
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
      .setVerticalAlignment("top")
      .setFontFamily("Inter")
      .setFontSize(9.5)
      .setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);
      
    // Apply column-specific alignments and typography
    for (var j = 0; j < COLUMN_CONFIGS.length; j++) {
      var colConfig = COLUMN_CONFIGS[j];
      var colRange = sheet.getRange(2, colConfig.index, lastRow - 1, 1);
      colRange.setHorizontalAlignment(colConfig.align);
      
      if (colConfig.font) {
        colRange.setFontFamily(colConfig.font);
      }
      if (colConfig.weight) {
        colRange.setFontWeight(colConfig.weight);
      }
      if (colConfig.color) {
        colRange.setFontColor(colConfig.color);
      }
    }
    
    // Apply comfortable minimum row height (48px) and alternating row backgrounds
    for (var r = 2; r <= lastRow; r++) {
      sheet.setRowHeight(r, Math.max(sheet.getRowHeight(r) || 0, 48));
      var rowRange = sheet.getRange(r, 1, 1, numCols);
      var privacyVal = String(sheet.getRange(r, 9).getValue() || "");
      
      if (privacyVal.indexOf("ANONYMOUS") !== -1) {
        // Highlight whistleblower shielded rows with a calm protective blue tint
        rowRange.setBackground("#eff6ff");
      } else {
        // Subtle alternating rows
        rowRange.setBackground(r % 2 === 0 ? "#ffffff" : "#f8fafc");
      }
    }
  }

  // 5. Automatically enforce sheet protection in read-only mode
  try {
    lockSheetReadOnly();
  } catch (e) {}
}

/**
 * Initializes Header Row and triggers Layout Formatting
 */
function setupHeaders() {
  var sheet = getPrimaryLedgerSheet_(SpreadsheetApp.getActiveSpreadsheet());
  var headers = [];
  for (var i = 0; i < COLUMN_CONFIGS.length; i++) {
    headers.push(COLUMN_CONFIGS[i].name);
  }
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  formatSheetLayout(sheet);
}

/**
 * Formula / CSV Injection Sanitizer (CWE-1236)
 * Neutralizes leading formula triggers (=, +, -, @, tab, return)
 */
function sanitizeSpreadsheetCell(val) {
  if (val === null || val === undefined) return "";
  var s = String(val);
  if (/^[=\+\-\@\t\r]/.test(s)) {
    return "'" + s;
  }
  return s;
}

/**
 * Verifies a Firebase Auth ID Token directly against Google Identity Platform
 * Ensures only verified, authorized UDSC Union Executives can modify grievance status/notes.
 */
function verifyAdminIdToken(idToken) {
  if (!idToken || typeof idToken !== "string" || idToken.length < 20) {
    return null;
  }
  try {
    var endpoint = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + FIREBASE_WEB_API_KEY;
    var resp = UrlFetchApp.fetch(endpoint, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ idToken: idToken }),
      muteHttpExceptions: true
    });
    if (resp.getResponseCode() !== 200) {
      return null;
    }
    var parsed = JSON.parse(resp.getContentText());
    if (!parsed.users || !parsed.users.length) {
      return null;
    }
    var user = parsed.users[0];
    var email = String(user.email || "").trim().toLowerCase();
    if (!user.emailVerified || AUTHORIZED_ADMINS.indexOf(email) === -1) {
      return null;
    }
    var defaultName = email === "rawalsingh9800@gmail.com" ? "Rawal Singh (President)" : "Kartikey Tiwari";
    return {
      email: email,
      displayName: user.displayName || defaultName
    };
  } catch (err) {
    return null;
  }
}

/**
 * Finds row index (1-based) by canonical Tracking Token in Column B
 */
function findRowByTrackToken(sheet, rawToken) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;
  var tokens = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  var target = String(rawToken || "").trim().toUpperCase();
  for (var i = 0; i < tokens.length; i++) {
    if (String(tokens[i][0] || "").trim().toUpperCase() === target) {
      return i + 2;
    }
  }
  return -1;
}

/**
 * Webhook Handler: Appends grievance records or updates status/notes for verified executives
 */
function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Malformed request: missing payload."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);

    // Anonymous Portal UI/UX Feedback & Feature Wishlist (Separate "Portal_Feedback" Tab)
    if (data.action === "submitFeedback") {
      var uiRating = Math.round(Number(data.uiRating));
      var uxRating = Math.round(Number(data.uxRating));
      if (isNaN(uiRating) || uiRating < 1 || uiRating > 5 || isNaN(uxRating) || uxRating < 1 || uxRating > 5) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Invalid feedback ratings: UI and UX ratings must be integers from 1 to 5."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      var feedbackSheet = getOrCreateFeedbackSheet_(ss);
      var rawFeedbackId = String(data.feedbackId || "").trim().toUpperCase();
      if (!/^FB-2026-[0-9A-Z]{4,10}$/.test(rawFeedbackId)) {
        rawFeedbackId = "FB-2026-" + Utilities.getUuid().replace(/-/g, "").slice(0, 6).toUpperCase();
      }

      var focusArea = sanitizeSpreadsheetCell(String(data.focusArea || "General UI/UX").trim().substring(0, 80));
      var uiNotes = sanitizeSpreadsheetCell(String(data.uiFeedback || "").trim().substring(0, 1000) || "No written UI/UX remarks provided.");
      var featureWishlist = sanitizeSpreadsheetCell(String(data.featureWishlist || "").trim().substring(0, 1000) || "None specified.");
      var portalContext = sanitizeSpreadsheetCell(String(data.context || "Web • EN").trim().substring(0, 120));
      var feedbackTimeIST = sanitizeSpreadsheetCell(data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

      var feedbackRow = [
        feedbackTimeIST,
        rawFeedbackId,
        uiRating + " / 5",
        uxRating + " / 5",
        focusArea,
        uiNotes,
        featureWishlist,
        portalContext
      ];

      feedbackSheet.appendRow(feedbackRow);
      var fbLastRow = feedbackSheet.getLastRow();
      var fbRowRange = feedbackSheet.getRange(fbLastRow, 1, 1, feedbackRow.length);
      fbRowRange
        .setFontSize(9.5)
        .setFontFamily("Inter")
        .setVerticalAlignment("top")
        .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
        .setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID)
        .setBackground(fbLastRow % 2 === 0 ? "#ffffff" : "#f8fafc");

      feedbackSheet.setRowHeight(fbLastRow, 52);
      for (var fc = 0; fc < FEEDBACK_COLUMN_CONFIGS.length; fc++) {
        var fCfg = FEEDBACK_COLUMN_CONFIGS[fc];
        var fCell = feedbackSheet.getRange(fbLastRow, fCfg.index);
        fCell.setHorizontalAlignment(fCfg.align);
        if (fCfg.font) fCell.setFontFamily(fCfg.font);
        if (fCfg.weight) fCell.setFontWeight(fCfg.weight);
        if (fCfg.color) fCell.setFontColor(fCfg.color);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        feedbackId: rawFeedbackId,
        message: "Portal UI/UX feedback logged to the Portal_Feedback tab."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getPrimaryLedgerSheet_(ss);
    if (sheet.getLastRow() === 0) {
      setupHeaders();
    }
    
    // Remote format trigger via POST (Authenticated Executives Only)
    if (data.action === "format" || data.action === "optimizeLayout") {
      var formatAdmin = verifyAdminIdToken(data.idToken);
      if (!formatAdmin) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Unauthorized: Google Identity verification required."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      formatSheetLayout(sheet);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Spreadsheet cell sizes, column widths, text wrapping, and row heights have been optimized for comfortable viewing on screen!"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Authenticated Status / Action Note Update from Admin Cockpit
    if (data.action === "updateStatus" || data.action === "addNote") {
      var adminUser = verifyAdminIdToken(data.idToken);
      if (!adminUser) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Unauthorized: valid Google Identity session required to update grievance status."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      var updateToken = String(data.trackToken || "").trim().toUpperCase();
      if (!/^UDSC-2026-[A-Z]{3,12}-(?:\d{3}|[0-9A-Z]{6,10})$/.test(updateToken)) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Invalid tracking token format."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      var targetRow = findRowByTrackToken(sheet, updateToken);
      if (targetRow === -1) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Tracking token not found in ledger."
        })).setMimeType(ContentService.MimeType.JSON);
      }

      if (data.action === "updateStatus" && data.status) {
        var currentStatus = String(sheet.getRange(targetRow, 8).getValue() || "SUBMITTED").trim().toUpperCase();
        var nextStatus = String(data.status).trim().toUpperCase();
        if (VALID_LIFECYCLE_STAGES.indexOf(nextStatus) === -1) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: "Invalid lifecycle status stage."
          })).setMimeType(ContentService.MimeType.JSON);
        }
        var allowedNext = VALID_TRANSITIONS[currentStatus] || [];
        if (currentStatus !== nextStatus && allowedNext.indexOf(nextStatus) === -1) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: "Invalid lifecycle transition from " + currentStatus + " to " + nextStatus + "."
          })).setMimeType(ContentService.MimeType.JSON);
        }
        sheet.getRange(targetRow, 8).setValue(nextStatus);
      }

      if (data.note) {
        var noteCell = sheet.getRange(targetRow, 15);
        var existingNotes = String(noteCell.getValue() || "").trim();
        var cleanNote = sanitizeSpreadsheetCell(String(data.note).substring(0, 400));
        var timestampIST = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        var formattedEntry = "[" + timestampIST + " | " + sanitizeSpreadsheetCell(adminUser.displayName) + "] " + cleanNote;
        var updatedNotes = existingNotes ? (existingNotes + "\n" + formattedEntry) : formattedEntry;
        noteCell.setValue(updatedNotes).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
        if (sheet.getRowHeight(targetRow) < 64) {
          sheet.setRowHeight(targetRow, 64);
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Record " + updateToken + " updated on Public Transparency Ledger by " + adminUser.email + "."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Strict Validation: Tracking Token format & duplicate-token guard for public intake submission
    var rawToken = String(data.trackToken || "").trim().toUpperCase();
    if (!/^UDSC-2026-[A-Z]{3,12}-(?:\d{3}|[0-9A-Z]{6,10})$/.test(rawToken)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Invalid tracking token format rejected by security filter."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (findRowByTrackToken(sheet, rawToken) !== -1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Duplicate tracking token rejected by idempotency filter."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var safeCategory = String(data.category || "OTHER").trim().toUpperCase();
    if (VALID_CATEGORIES.indexOf(safeCategory) === -1) safeCategory = "OTHER";

    var safeSeverity = String(data.severity || "MEDIUM").trim().toUpperCase();
    if (VALID_SEVERITIES.indexOf(safeSeverity) === -1) safeSeverity = "MEDIUM";

    // Strict DPDP Act 2023 Public Transparency Boundary:
    // Because the Google Sheet has Viewer sharing ("Anyone with link"), PII and raw confidential
    // testimonies MUST NEVER be written to this public ledger regardless of consent mode.
    var isAnon = Boolean(data.privacyMode && String(data.privacyMode).indexOf("ANONYMOUS") !== -1);
    var complainant = isAnon ? "ANONYMOUS (WHISTLEBLOWER SHIELDED)" : "[PROTECTED_BY_DPDP_PRIVACY_BOUNDARY]";
    var email = "[REDACTED_PUBLIC_LEDGER]";
    var phone = "[REDACTED_PUBLIC_LEDGER]";
    var privacyLabel = isAnon ? "ANONYMOUS (WHISTLEBLOWER SHIELD)" : "IDENTIFIED (PRIVATE CONF. SHIELDED)";
    var publicTitle = safeCategory === "HARASSMENT_RAGGING"
      ? "Confidential Safety / POSH Matter (Details Shielded)"
      : sanitizeSpreadsheetCell(String(data.title || "Student Grievance").substring(0, 120));
    var publicDesc = "[CONFIDENTIAL_TESTIMONY_WITHHELD_PUBLICLY]";

    var row = [
      sanitizeSpreadsheetCell(data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })),
      rawToken,
      sanitizeSpreadsheetCell(safeCategory),
      sanitizeSpreadsheetCell(String(data.department || "South Campus").substring(0, 100)),
      publicTitle,
      publicDesc,
      sanitizeSpreadsheetCell(safeSeverity),
      "SUBMITTED",
      privacyLabel,
      complainant,
      email,
      phone,
      "AFFIRMATIVE (SEC 6 COMPLIANT)",
      sanitizeSpreadsheetCell(String(data.slaDeadline || "").substring(0, 50)),
      ""
    ];
    
    sheet.appendRow(row);
    
    // Automatically format newly appended row for comfortable on-screen viewing
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, row.length);
    rowRange
      .setFontSize(9.5)
      .setFontFamily("Inter")
      .setVerticalAlignment("top")
      .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
      .setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);
      
    sheet.setRowHeight(lastRow, 48);
    
    for (var k = 0; k < COLUMN_CONFIGS.length; k++) {
      var col = COLUMN_CONFIGS[k];
      var cell = sheet.getRange(lastRow, col.index);
      cell.setHorizontalAlignment(col.align);
      if (col.font) cell.setFontFamily(col.font);
      if (col.weight) cell.setFontWeight(col.weight);
      if (col.color) cell.setFontColor(col.color);
    }
    
    if (isAnon) {
      rowRange.setBackground("#eff6ff");
    } else {
      rowRange.setBackground(lastRow % 2 === 0 ? "#ffffff" : "#f8fafc");
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Grievance record appended to immutable public transparency ledger with comfortable on-screen cell styling."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Web Healthcheck Endpoint
 * Formatting is restricted to authenticated POST requests or in-sheet menu execution.
 */
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    system: "S.A.M.A.D.H.A.N Public Transparency Ledger Sync Engine",
    body: "UDSC Students' Union, University of Delhi"
  })).setMimeType(ContentService.MimeType.JSON);
}
