# S.A.M.A.D.H.A.N - 24/7 Grievance Redressal and Institutional Accountability Portal
### University of Delhi South Campus (UDSC)

> Full Form: S.A.M.A.D.H.A.N - Student Advocacy, Monitoring, Analytics and Digital Heeding of All Needs
> Root Initiative: Project S.E.W.A (Systematically Eliminating Worrisome Anomalies)
> Statutory Framework: Digital Personal Data Protection (DPDP) Act, 2023 (India) and UGC (Grievance Redressal of Students) Regulations, 2023
> Quality Standard: ISO 10002:2018 (Complaints Handling in Organizations)

---

## 1. Production Deployment Endpoints

* Student Grievance Portal and Public Telemetry: https://udsc-samadhan-portal.web.app
* Executive Admin Cockpit: https://udsc-samadhan-portal.web.app/admin
* Public Transparency Ledger: https://docs.google.com/spreadsheets/d/1bNGdmCG4k3tGBnZ4f5CmW_6V45KWI_XNVMNct_B22jM/preview

---

## 2. Technical Credits and Contributors

* Kartikey Tiwari (Lead System Architect)
  Vice-President, SDC Students' Union 2026/27 (M.Sc. Informatics, 1st Semester, Institute of Informatics and Communication, University of Delhi South Campus)
  Designed core full-stack portal architecture, DPDP Act 2023 statutory consent workflows, cryptographic tracking tokens, and Google Sheets bidirectional sync engine.

* Shraddha Choudhary (Ollama API Integration and Local NLP Pipeline)
 Central Councilor, SDC Students' Union 2026/27 (M.Sc. Informatics, 1st Semester, Institute of Informatics and Communication (IIC), University of Delhi South Campus)
  Engineered the Ollama API integration into this site. Implemented local model connectivity through Ollama endpoints (/api/generate and /v1/chat/completions) to handle automated grievance categorization, priority scoring, and natural language summary generation directly on local infrastructure. This local pipeline prevents student testimonies and personal details from leaving the campus network, satisfying DPDP Act 2023 data minimization requirements.

* UDSC Students' Union Executive Committee (2026/27)
  Institutional oversight, administrative validation, and liaison with University of Delhi South Campus departments and hostel administrations.

---

## 3. Executive Overview

S.A.M.A.D.H.A.N was built to resolve long-standing operational issues in university complaint systems:
* Frictionless Filing: Three-step intake wizard available in English and Hindi without complex captchas or arbitrary text limits.
* End-to-End Tracking: Unique alphanumeric tracking tokens (format: UDSC-2026-[CATEGORY]-[ID]) linked to a 5-stage milestone timeline.
* Privacy by Design: Whistleblower protection mode strips names, contact details, and IP data from student submissions.
* DPDP Act 2023 Compliance: Section 6 affirmative consent check, Section 12 Right to Erasure handling, and automatic post-resolution data scrubbing.
* Local Ollama Intelligence: On-premise text analysis through Ollama APIs, keeping student inputs private and isolated from third-party model providers.
* Cloud Isolation: Hosted on a dedicated Google Cloud project (udsc-samadhan-2026) with an independent database, avoiding quota competition or downtime from other campus utilities.

---

## 4. System Architecture and Local Ollama API Integration

```
                         Student Browser / Mobile PWA
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
   [Public Intake Wizard]                            [Live Tracking and Telemetry]
            │                                                   ▲
            ▼                                                   │
  Google Apps Script Webhook                                    │
            │                                                   │
            ▼                                                   │
  Google Sheets Public Ledger ──────────────────────────────────┘
  (Read-only CSV Sync Engine)
            │
            ▼
  [Local AI Classification Pipeline]
  Ollama API Endpoint: http://localhost:11434
  • Model: Llama 3.2 (Quantized local inference)
  • Tasks: Department routing, severity detection, summary generation
  • Privacy: Zero outbound cloud transmission of student text
            │
            ▼
  Executive Admin Cockpit (/admin)
  • Role-based access control with Google OAuth and Master Passkey
  • Live status advancement and case timeline logs
```

### Key Technical Subsystems

1. Ollama API Integration:
   The platform interfaces with Ollama instances running on local infrastructure. When a student lodges a grievance, the system formats the testimony into structured prompts dispatched to `POST /api/generate` or `POST /v1/chat/completions`. The model outputs a predicted department, suggested urgency level, and concise administrative summary without sending student personal identifiers outside the university environment.

2. Bidirectional Google Sheets Sync Engine:
   Submissions logged via Google Apps Script append to a view-only public spreadsheet. The frontend repository parses this ledger through an RFC 4180 compliant CSV parser on page load, tab navigation, and tracking lookups, keeping metrics synchronized across all client devices without requiring manual database maintenance.

3. Administrative Handover Protocol:
   A dual-custody cryptographic handshake ensures that executive administrative rights transition cleanly between outgoing and incoming student union representatives. The incoming officer must accept the statutory DPDP oath before administrative credentials update atomically.

---

## 5. Five-Stage Lifecycle Audit Flow

Grievances advance through five discrete milestones:

1. SUBMITTED: Complaint recorded, hashed, and issued a tracking token.
2. TRIAGED: Nodal officer reviews the file and assigns it to the relevant department desk.
3. INVESTIGATING: Department enquiry initiated, with timestamped progress notes.
4. ACTION PROPOSED: Remediation plan drafted and shared with the complainant.
5. RESOLVED: Action verified, issue closed, and 30-day statutory countdown for record sanitization started.

---

## 6. Automated Test Suite

A native verification suite validates DPDP consent rules, token uniqueness, SLA calculations, and administrative cryptographic protocols:

```powershell
node test-suite.js
```

### Verified Test Categories:
* Database isolation rules and access constraints
* DPDP Act 2023 Section 6 affirmative consent validation
* DPDP Act 2023 Section 8 whistleblower privacy and zero PII leakage
* DPDP Act 2023 Section 12 Right to Erasure scrubbing
* Alphanumeric token regex validation and collision resistance
* Statutory SLA deadline generation by urgency tier
* Public ledger CSV parsing engine and bidirectional data synchronization

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
