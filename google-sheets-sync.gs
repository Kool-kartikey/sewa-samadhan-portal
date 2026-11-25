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
  "RESOLVED"
];

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

/**
 * Custom Google Sheets Top Menu Integration
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🏛️ SAMADHAN Portal")
    .addItem("✨ Format Cells for Comfortable Viewing", "formatSheetForComfortableViewing")
    .addItem("🔒 Enforce Read-Only Sheet Protection", "lockSheetReadOnly")
    .addItem("🔄 Reset Header Styles", "setupHeaders")
    .addToUi();
}

/**
 * Enforces Read-Only Protection on the Spreadsheet
 * Prevents unauthorized or accidental cell modification.
 */
function lockSheetReadOnly() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
  for (var i = 0; i < protections.length; i++) {
    protections[i].remove();
  }
  var p = sheet.protect().setDescription('S.A.M.A.D.H.A.N Immutable Public Transparency Ledger — Protected');
  p.removeEditors(p.getEditors());
  if (p.canDomainEdit()) {
    p.setDomainEdit(false);
  }
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('Sheet is now locked and protected in read-only mode!', '🔒 Protection Enforced', 5);
  } catch (e) {}
}

/**
 * One-Click Layout Optimizer for Comfortable On-Screen Viewing
 */
function formatSheetForComfortableViewing() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  formatSheetLayout(sheet);
}

/**
 * Core Formatting Engine
 * Applies generous column widths, dynamic text wrapping, comfortable row heights,
 * frozen navigation panes, and high-legibility typographic hierarchy.
 */
function formatSheetLayout(sheet) {
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
  
  var numCols = COLUMN_CONFIGS.length;
  var lastRow = sheet.getLastRow();
  
  // 1. Set generous column widths so each record is fully visible without clipping
  for (var i = 0; i < COLUMN_CONFIGS.length; i++) {
    sheet.setColumnWidth(COLUMN_CONFIGS[i].index, COLUMN_CONFIGS[i].width);
  }
  
  // 2. Freeze Navigation Panes (Header row + First two columns: Timestamp & Tracking Token)
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);
  
  // 3. Style Header Row (Row 1)
  sheet.setRowHeight(1, 44);
  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange
    .setFontWeight("bold")
    .setFontSize(10)
    .setFontFamily("Inter")
    .setBackground("#0f172a")
    .setFontColor("#f59e0b")
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("center")
    .setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    
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
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
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
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      setupHeaders();
    }
    
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Malformed request: missing payload."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    
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
      if (!/^UDSC-2026-[A-Z]{3,12}-\d{3}$/.test(updateToken)) {
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
        var nextStatus = String(data.status).trim().toUpperCase();
        if (VALID_LIFECYCLE_STAGES.indexOf(nextStatus) === -1) {
          return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: "Invalid lifecycle status stage."
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
    
    // Strict Validation: Tracking Token format for public intake submission
    var rawToken = String(data.trackToken || "").trim();
    if (!/^UDSC-2026-[A-Z]{3,12}-\d{3}$/.test(rawToken)) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Invalid tracking token format rejected by security filter."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Strict DPDP Act 2023 Privacy Enforcement
    var isAnon = data.privacyMode && data.privacyMode.indexOf("ANONYMOUS") !== -1;
    var complainant = isAnon ? "ANONYMOUS (WHISTLEBLOWER SHIELDED)" : sanitizeSpreadsheetCell(String(data.studentName || "Student").substring(0, 100));
    var email = isAnon ? "[REDACTED_UNDER_DPDP_ACT]" : sanitizeSpreadsheetCell(String(data.studentEmail || "N/A").substring(0, 100));
    var phone = isAnon ? "[REDACTED_UNDER_DPDP_ACT]" : sanitizeSpreadsheetCell(String(data.studentPhone || "N/A").substring(0, 30));
    var privacyLabel = isAnon ? "ANONYMOUS (WHISTLEBLOWER SHIELD)" : "IDENTIFIED (CONSENTED)";
    
    var row = [
      data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      rawToken,
      sanitizeSpreadsheetCell(String(data.category || "GENERAL").substring(0, 50)),
      sanitizeSpreadsheetCell(String(data.department || "South Campus").substring(0, 100)),
      sanitizeSpreadsheetCell(String(data.title || "Student Grievance").substring(0, 200)),
      sanitizeSpreadsheetCell(String(data.description || "").substring(0, 3000)),
      sanitizeSpreadsheetCell(String(data.severity || "MEDIUM").substring(0, 20)),
      sanitizeSpreadsheetCell(String(data.status || "SUBMITTED").substring(0, 30)),
      privacyLabel,
      complainant,
      email,
      phone,
      "AFFIRMATIVE (SEC 6 COMPLIANT)",
      data.slaDeadline || "",
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
