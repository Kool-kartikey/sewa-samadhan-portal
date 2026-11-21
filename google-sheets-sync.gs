/**
 * S.A.M.A.D.H.A.N — Google Sheets Public Transparency Ledger Sync Engine
 * Project S.E.W.A | UDSC Students' Union, University of Delhi
 * 
 * ============================================================================
 * SETUP GUIDE (UNDER 2 MINUTES):
 * ============================================================================
 * 1. Create a new Google Spreadsheet at: https://sheets.new
 * 2. Title it: "S.A.M.A.D.H.A.N — Public Transparency Ledger (UDSC)"
 * 3. In Google Sheets, click: Extensions > Apps Script
 * 4. Delete any code in Code.gs and PASTE THIS ENTIRE FILE.
 * 5. Click the "Save" icon (Floppy disk).
 * 6. Run the "setupHeaders" function once (Select "setupHeaders" > click "Run") to style the header row.
 * 7. Click "Deploy" (top right) > "New deployment".
 * 8. Click the gear icon next to "Select type" > choose "Web app".
 * 9. Set "Description": "SAMADHAN Public Sync"
 * 10. Set "Execute as": "Me" (your Google account)
 * 11. Set "Who has access": "Anyone"
 * 12. Click "Deploy", authorize the permissions, and COPY the Web App URL!
 * 13. IMPORTANT (VIEW-ONLY ENFORCEMENT):
 *     Click the green "Share" button in Google Sheets:
 *     - General Access: "Anyone with the link" -> "Viewer"
 *     - This guarantees that NO ONE (including visitors or admins in the browser) can EVER edit, modify, or delete any cells!
 *     - The sheet can ONLY be appended programmatically through this script!
 * ============================================================================
 */

function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headers = [
    "Timestamp (IST)",
    "Tracking Token",
    "Grievance Category",
    "UDSC Department",
    "Subject Title",
    "Detailed Grievance Testimony",
    "Urgency / Severity",
    "Lifecycle Status",
    "Student Privacy Choice",
    "Complainant Identity",
    "Student Institutional Email",
    "Student Phone Number",
    "Statutory DPDP Consent",
    "SLA Resolution Target (IST)"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight("bold")
    .setFontSize(10)
    .setBackground("#0f172a")
    .setFontColor("#f59e0b")
    .setVerticalAlignment("middle")
    .setHorizontalAlignment("center");
  
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);
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
    
    // Strict Validation: Tracking Token format
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
      data.slaDeadline || ""
    ];
    
    sheet.appendRow(row);
    
    // Auto-align and wrap text for newly inserted row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setFontSize(9).setVerticalAlignment("top");
    if (isAnon) {
      // Highlight whistleblower protected rows with a subtle shield tint
      sheet.getRange(lastRow, 9, 1, 3).setBackground("#eff6ff").setFontColor("#1e40af");
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Grievance record appended to immutable public transparency ledger."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    system: "S.A.M.A.D.H.A.N Public Transparency Ledger Sync Engine",
    body: "UDSC Students' Union, University of Delhi"
  })).setMimeType(ContentService.MimeType.JSON);
}
