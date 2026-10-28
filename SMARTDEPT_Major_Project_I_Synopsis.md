# SDM COLLEGE OF ENGINEERING & TECHNOLOGY
## DHAVALAGIRI, DHARWAD – 580 002
### Department of Computer Science and Engineering

---

# VII SEMESTER MAJOR PROJECT – I SYNOPSIS

## On

# SMARTDEPT: A Role-Based Departmental Activity Management and Workflow Automation System for Engineering Institutions

---

## Submitted By

| Sl. No. | USN | Name | Signature |
|---------|-----|------|-----------|
| 1 | [USN] | [Student Name 1] | |
| 2 | [USN] | [Student Name 2] | |
| 3 | [USN] | [Student Name 3] | |
| 4 | [USN] | [Student Name 4] | |

---

**Under the Guidance of**

[Prof./Dr. Guide Name]
[Designation]
Department of Computer Science and Engineering
SDM College of Engineering & Technology, Dharwad

**August 2026**

---

## REVIEWER(S) REPORT

**Project Title:** SMARTDEPT: A Role-Based Departmental Activity Management and Workflow Automation System for Engineering Institutions

**Department:** Computer Science and Engineering | **Academic Year:** 2026–27 | **Semester:** VII

The project proposal submitted by the above-mentioned students has been reviewed and the following decision has been arrived at:

| # | Reviewer Decision | Mark (✓) |
|---|---|---|
| 1 | Accepted the project proposal as it is | |
| 2 | Accepted with suggested modifications | |
| 3 | Project proposal rejected | |

**Reviewer Remarks:**

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

**Date:** _______________

| Project Guide / Supervisor | Internal Examiner | HOD |
|---|---|---|
| | | |
| Signature & Date | Signature & Date | Signature & Date |

---

## TABLE OF CONTENTS

| Chapter | Title | Page |
|---------|-------|------|
| | Abstract | 4 |
| 1 | Introduction | 5 |
| 1.1 | Background | 5 |
| 1.2 | Existing Problem | 5 |
| 1.3 | Proposed System | 6 |
| 1.4 | Problem Statement | 7 |
| 1.5 | Significance | 7 |
| 2 | Objectives | 8 |
| 3 | Literature Review | 9 |
| 4 | Methodology | 12 |
| 4.1 | Overall System Architecture | 12 |
| 4.2 | User Roles and Access Control | 13 |
| 4.3 | Authentication Flow | 14 |
| 4.4 | Authorization and RBAC | 17 |
| 4.5 | Functional Modules | 17 |
| 4.6 | Database Design | 23 |
| 4.7 | API Architecture | 24 |
| 4.8 | Frontend Architecture | 25 |
| 4.9 | Backend Architecture | 27 |
| 4.10 | System Workflows | 28 |
| 4.11 | Validation and Error Handling | 29 |
| 4.12 | Security Considerations | 30 |
| 5 | Expected Outcomes | 31 |
| 6 | Project Scope | 32 |
| 6.1 | Functional Scope | 32 |
| 6.2 | User Scope | 32 |
| 6.3 | Technical Scope | 33 |
| 6.4 | System Architecture Description | 33 |
| 6.5 | Current Limitations | 34 |
| 6.6 | Future Enhancements | 35 |
| 7 | Resources Required | 36 |
| 8 | References | 38 |

---

## ABSTRACT

Engineering colleges manage a large number of academic activities — workshops, seminars, guest lectures, hackathons, industrial visits, and faculty development programmes — each requiring coordination across multiple stakeholders, including students, faculty, the Head of Department (HOD), and administration. Currently, this coordination relies heavily on manual processes: paper-based proposal forms, email chains for approvals, and disconnected spreadsheets for tracking attendance and budgets. These fragmented workflows cause delays, communication gaps, and difficulty in generating reports required for accreditation bodies such as NBA and NAAC.

SMARTDEPT is a web-based departmental activity management and workflow automation system designed to address these problems in a single, centralised platform. The system provides role-specific interfaces for four user categories — System Administrator, HOD, Faculty, and Student — each with distinct navigation, access permissions, and responsibilities derived from a server-side database. Authentication is implemented using a two-step email OTP flow backed by a REST API, with passwords replaced entirely by time-limited, cryptographically generated one-time codes verified against bcrypt hashes stored in PostgreSQL.

The core features include an Activity Management system supporting 14 activity types with an 8-stage lifecycle, a configurable Workflow Automation Engine that determines required approvers based on budget thresholds and activity attributes, role-specific dashboards with data visualisation charts, and structured views for Calendar, Attendance, Resources, Budget, Reports, Analytics, Notifications, and Documents.

The system is built using React 19 with Vite on the frontend and Python FastAPI with an async PostgreSQL backend. This synopsis describes the design, architecture, and current implementation state of SMARTDEPT as developed for the VII Semester Major Project.

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background

Engineering institutions in India handle a substantial volume of co-curricular and academic activities each semester. The Computer Science and Engineering department of a typical college may conduct workshops, Faculty Development Programmes (FDPs), guest lectures, technical competitions, and industrial visits every academic semester. Each activity involves proposal creation, multi-level approval, resource allocation, attendance tracking, budget accounting, and documentation for accreditation purposes.

As departments grow in size and the number of activities increases, coordinating these processes through informal channels — physical files, emails, and telephone calls — becomes impractical. Faculty members spend considerable time on administrative coordination rather than academic work. HODs lack a consolidated view of department activities, making it difficult to exercise oversight or produce timely reports. Students have limited visibility into upcoming activities and their own participation records.

Digital management systems have been widely adopted in enterprise software, but purpose-built platforms for engineering department administration remain uncommon in the Indian academic context. SMARTDEPT was conceived to bridge this gap by providing a structured, role-aware web application tailored to the specific workflows of an engineering department.

### 1.2 Existing Problem

The following problems were identified in the conventional department management process:

- **Fragmented information:** Activity details, approval status, attendance records, and budget data are maintained in separate files and spreadsheets, with no single source of truth.

- **Manual approval workflows:** Activity proposals are routed through email or physical files, making it difficult to track approval status or enforce consistent approval chains. The correct set of approvers for a given activity is often determined informally.

- **Inconsistent access control:** There is no enforced mechanism to prevent a faculty member from accessing HOD-level information, or to ensure that a student only sees information relevant to them.

- **Difficulty in activity lifecycle management:** An activity moves through multiple stages — from proposal to completion to report generation — but there is no system to track or enforce these stages.

- **Accreditation reporting overhead:** Generating reports for NBA, NAAC, or NIRF requires manual compilation from multiple sources, which is time-consuming and error-prone.

- **No centralised notification system:** Stakeholders are informed of approvals, rejections, or upcoming events through informal channels, leading to missed communications.

- **Insecure or absent authentication:** Departmental systems often rely on simple username-password logins that are shared or left unsecured, creating security risks.

### 1.3 Proposed System

SMARTDEPT proposes a centralised, role-based web application that integrates the complete lifecycle of departmental activity management. The key characteristics of the proposed system are:

**1. Role-based access:** Four distinct roles — Admin, HOD, Faculty, and Student — are defined in the database. Each role receives a corresponding sidebar navigation, dashboard, and module access that cannot be altered by the user.

**2. Secure passwordless authentication:** Users log in using their registered email address. The backend validates the email against the user database, generates a cryptographically secure 6-digit OTP, hashes it with bcrypt, and sends it to the user's email via SMTP. The user's role is retrieved from the database upon successful verification and embedded in a signed JWT. The frontend never determines or modifies the user's role.

**3. Activity management:** Faculty can create activity proposals through a multi-step creation wizard covering basic information, schedule, participation, budget, resources, documents, and approval workflow. Created activities follow an 8-stage lifecycle.

**4. Configurable workflow engine:** The system includes a rule engine that evaluates each activity's budget, activity type, and attributes against configurable rules to determine the required approval chain. Administrators can enable, disable, and modify rules from the Admin panel without modifying source code.

**5. Dashboard visualisations:** Each role receives a dashboard with relevant KPI statistics and Recharts-based interactive charts for trends and distributions.

**6. Structured section views:** Separate pages for Calendar, Attendance, Resources, Budget, Reports, Analytics, Notifications, Documents, and AI Insights are accessible to roles as permitted by their access configuration.

### 1.4 Problem Statement

Engineering departments lack an integrated digital platform for managing academic activities, enforcing multi-level approval workflows, tracking attendance and budgets, and generating accreditation-ready reports — all while enforcing role-based access control so that each user category sees only the information and actions appropriate to their position in the institution's hierarchy.

### 1.5 Significance

SMARTDEPT addresses the above problem in the following ways:

- It reduces the time spent by faculty and HODs on administrative coordination by automating the activity proposal, routing, and approval process.
- It provides each role with a purpose-built interface, eliminating the confusion of a single interface used by all users.
- It establishes a database-backed audit trail of all activities, approvals, and rejections, supporting accreditation documentation.
- Its configurable workflow engine allows institutional rules — such as budget thresholds for escalation to the Principal — to be updated without code changes.
- Its passwordless OTP authentication removes the risk of weak or shared passwords, a common security problem in academic systems.

---

## CHAPTER 2: OBJECTIVES

The following objectives were established based on the actual implemented functionality of the SMARTDEPT system:

1. **Centralised activity repository:** Provide a single platform where all departmental activities are created, tracked, and archived, covering 14 defined activity types across a full 8-stage lifecycle (Draft → Submitted → Under Review → Approved → Scheduled → Ongoing → Completed → Report Generated).

2. **Role-based access control:** Implement server-side role determination so that each of the four user types (Admin, HOD, Faculty, Student) sees only the navigation sections, dashboards, and actions relevant to their role, with no ability to escalate privileges from the frontend.

3. **Secure passwordless authentication:** Implement a two-step OTP-based login flow where the OTP is generated using Python's `secrets` module, hashed with bcrypt before storage, never returned in any API response, expired after 10 minutes, limited to 5 verification attempts, and invalidated after successful use.

4. **Configurable multi-level approval workflow:** Implement a rule engine that evaluates activity attributes (budget amount, external speaker flag, external venue flag, and activity type) against configurable rules to determine the required approval chain dynamically.

5. **Role-specific dashboards with data visualisation:** Provide each role with a dashboard showing relevant KPI cards and Recharts-based interactive charts for activity trends, budget utilisation, and participation statistics.

6. **Structured module views:** Implement dedicated views for Calendar, Attendance, Resources, Budget, Reports, Analytics, Notifications, Documents, and Settings, with visibility controlled by the logged-in user's role.

7. **Activity creation wizard:** Provide a multi-step form covering seven sections — Basic Information, Schedule, Participation, Budget, Resources, Documents, and Approval Workflow — for creating new activity proposals.

8. **Activity detail view:** Present a nine-tab activity detail page covering Overview, Timeline, Approvals, Participants, Attendance, Budget, Documents, Feedback, and Reports for each activity.

9. **Approval management interface:** Provide an approvals queue with risk assessment, approval timeline visualisation, and action modal for Approve, Reject, and Request Changes actions with mandatory comments.

10. **Reduce manual administrative effort:** Automate notification dispatch upon approval status changes, provide structured report templates for accreditation formats (NBA, NAAC, NIRF), and maintain a structured document vault.

---

## CHAPTER 3: LITERATURE REVIEW

### 3.1 Academic Management Systems

Digitisation of academic administration has been an active area of development in educational technology. Research examining Learning Management System (LMS) adoption in higher education has consistently found that centralised digital platforms significantly reduce administrative overhead and improve stakeholder communication. However, adoption is often hindered by poorly designed role-based systems and one-size-fits-all interfaces that fail to serve different user categories effectively [1]. SMARTDEPT addresses this by providing distinct, role-constrained interfaces for each of its four user categories.

Enterprise Student Information Systems (SIS) such as Ellucian Banner and Oracle PeopleSoft integrate student records, course management, and administrative workflows for universities. However, these platforms are designed for university-wide operations, carry high licensing and configuration costs, and do not address the specific operational workflows of a single department — such as activity proposals, departmental approval chains, and faculty workload tracking. SMARTDEPT occupies this more specific niche of department-level operational management.

### 3.2 Role-Based Access Control (RBAC)

The foundational model for RBAC was formalised by Sandhu et al. (1996) in "Role-Based Access Control Models," published in IEEE Computer [2]. The paper established the RBAC96 model comprising four components: users, roles, permissions, and sessions. In this model, permissions are assigned to roles rather than directly to individual users, and users are assigned to roles by administrators. This design significantly simplifies access management as the number of users grows.

SMARTDEPT implements a simplified RBAC model aligned with RBAC0 (flat RBAC): users are assigned exactly one role stored in the PostgreSQL `users` table, and every API request validates the role by re-fetching the user record from the database rather than trusting the frontend or the JWT payload alone. Ferraiolo et al. (2001) elaborated RBAC in the NIST standard publication "Proposed NIST Standard for Role-Based Access Control" [3], which specifies the principle of least privilege — each role receives the minimum set of permissions required for its responsibilities. SMARTDEPT's navigation configuration applies this principle by granting each role only the sidebar sections and API endpoints appropriate to their function.

### 3.3 Workflow and Approval Systems

Van der Aalst and van Hee (2002) provide a comprehensive treatment of workflow management systems in their book *Workflow Management: Models, Methods, and Systems* [4], identifying conditional routing — where the next step in a process depends on the attributes of the current work item — as a core requirement of practical workflow systems. SMARTDEPT's `evaluateWorkflow()` function implements exactly this pattern: it evaluates each activity's budget amount, external speaker flag, external venue flag, and activity type against a configurable rule set to dynamically construct the required approval chain.

Ly et al. (2015), in a review of compliance monitoring in workflow systems published in *Information Systems* [5], emphasise the importance of audit trails — chronological records of all decisions and state transitions — for regulatory compliance. SMARTDEPT addresses this through the `ApprovalTimeline` component, which records each approval step with the approver's name, timestamp, status, and comment. This structure is appropriate for accreditation documentation, though persistent database storage of these records is identified as a future enhancement in the current build.

### 3.4 Secure Authentication in Web Applications

The OWASP Authentication Cheat Sheet [6] specifies best practices for web authentication, including multi-factor authentication, rate limiting of authentication attempts, secure token storage, and avoidance of predictable token generation. SMARTDEPT implements several of these practices: OTPs are generated using Python's `secrets` module (a cryptographically secure pseudorandom number generator), hashed with bcrypt before database storage, limited to 5 verification attempts, subject to a 60-second resend cooldown, and invalidated immediately after successful use. The JWT is stored in `localStorage` with token validation on every page load via the `/auth/me` endpoint.

JSON Web Tokens (JWT) as an authentication mechanism are specified in RFC 7519 (Jones et al., 2015) [7]. The SMARTDEPT backend uses the `python-jose` library to create and verify HS256-signed JWTs. The token payload contains the user's UUID (`sub` claim) and role from the database (`role` claim), along with issued-at (`iat`) and expiry (`exp`) claims. The token expiry is configured via an environment variable, defaulting to 480 minutes.

### 3.5 RESTful API Design

Fielding (2000), in his doctoral dissertation introducing Representational State Transfer (REST) [8], established REST as an architectural style for distributed systems using HTTP methods to operate on resources identified by URLs. SMARTDEPT's FastAPI backend follows RESTful conventions: `POST /auth/request-otp` and `POST /auth/verify-otp` handle the two-step authentication flow, `GET /auth/me` returns the current user, and the `/users/` endpoints handle user management under ADMIN-only authorization.

FastAPI [9] is a modern Python web framework built on Starlette and Pydantic that supports asynchronous request handling via Python's `asyncio`. Its automatic OpenAPI documentation, type-validated request/response bodies via Pydantic schemas, and dependency injection system for authentication middleware make it well-suited for this project's requirements.

### 3.6 Identified Research and Implementation Gap

The reviewed literature and existing systems address individual aspects of academic management — RBAC, workflow routing, secure authentication, and REST API design — separately. No single open-source system integrates all of these components specifically for the operational management of activities at the engineering department level, with the Indian accreditation context (NBA, NAAC, NIRF) in mind.

Existing enterprise systems are disproportionately complex and costly for a single department. SMARTDEPT addresses this gap by combining:

- Department-specific activity types and lifecycle stages reflecting Indian engineering college operations
- A configurable approval engine whose rules mirror common institutional policies (budget thresholds, external speakers, industrial visits)
- A role-specific UI that serves four distinct stakeholder categories without requiring separate applications
- A passwordless authentication approach suited to a context where users may not reliably maintain passwords for infrequently used administrative systems

---

## CHAPTER 4: METHODOLOGY

### 4.1 Overall System Architecture

SMARTDEPT follows a three-tier client-server architecture with a clear separation between the presentation layer (React frontend), the application layer (FastAPI backend), and the data layer (PostgreSQL database).

```
┌──────────────────────────────────────────────────────────────┐
│  USER (Browser — Chrome/Firefox/Edge)                        │
└─────────────────────┬────────────────────────────────────────┘
                      │ HTTP / HTTPS
┌─────────────────────▼────────────────────────────────────────┐
│  FRONTEND  (React 19 + Vite 8)   Port: 5173                  │
│  ┌──────────────┐  ┌─────────────┐  ┌───────────────────┐   │
│  │ AuthContext  │  │ SidebarCtx  │  │  WorkflowContext   │   │
│  └──────────────┘  └─────────────┘  └───────────────────┘   │
│  Pages: LoginPage, Dashboard(HOD/Faculty/Student/Admin),     │
│         ActivitiesPage, ApprovalsPage, SectionViews          │
│  API Client: fetch wrapper with Bearer JWT injection          │
└─────────────────────┬────────────────────────────────────────┘
                      │ REST API — JSON / Bearer JWT
                      │ CORS: localhost:5173 ↔ localhost:8000
┌─────────────────────▼────────────────────────────────────────┐
│  BACKEND  (Python 3.10 + FastAPI + Uvicorn)  Port: 8000      │
│  /auth/* router      /users/* router (Admin only)            │
│  get_current_user()  require_roles()  factory dependency     │
│  security.py: generate_otp | hash_otp | create_access_token  │
│  email_service.py: aiosmtplib async SMTP email delivery      │
└─────────────────────┬────────────────────────────────────────┘
                      │ asyncpg (async PostgreSQL driver)
┌─────────────────────▼────────────────────────────────────────┐
│  DATABASE  (PostgreSQL 14+)                                   │
│  ┌─────────────────────────┐  ┌──────────────────────────┐   │
│  │ TABLE: users            │  │ TABLE: otp_records        │   │
│  │  id UUID PK             │  │  id UUID PK              │   │
│  │  name VARCHAR(255)      │  │  email VARCHAR(255) idx  │   │
│  │  email VARCHAR UNIQUE   │  │  otp_hash VARCHAR(255)   │   │
│  │  role ENUM              │  │  expires_at TIMESTAMPTZ  │   │
│  │  department VARCHAR     │  │  attempts INTEGER        │   │
│  │  usn_or_employee_id     │  │  is_used BOOLEAN         │   │
│  │  is_verified BOOLEAN    │  │  created_at TIMESTAMPTZ  │   │
│  │  is_active BOOLEAN      │  │  last_sent_at TIMESTAMPTZ│   │
│  │  created_at TIMESTAMPTZ │  └──────────────────────────┘   │
│  │  updated_at TIMESTAMPTZ │                                  │
│  │  last_login TIMESTAMPTZ │                                  │
│  └─────────────────────────┘                                  │
└──────────────────────────────────────────────────────────────┘
```

### 4.2 User Roles and Access Control

Four roles are defined as a PostgreSQL Enum (`UserRole`) in the database. A user's role is assigned by the administrator at account creation and cannot be changed by the user themselves.

| Role | Responsibilities | Accessible Modules |
|------|---|---|
| **ADMIN** | System-wide user management; creating/deactivating accounts; configuring workflow rules; system oversight | Dashboard, Activities, Approvals, Calendar, Attendance, Resources, Budget, Reports, Analytics, AI Insights, Notifications, Documents, User Management, Department Management, Role Management, System Configuration, Audit Logs, Settings |
| **HOD** | Department-level oversight; final approval authority; department budget and resource management; department analytics | Dashboard, Activities, Approvals, Calendar, Attendance, Resources, Budget, Reports, Analytics, AI Insights, Notifications, Documents, Settings |
| **FACULTY** | Activity proposal creation; first-level approval actions; attendance management; report access | Dashboard, Activities, Approvals, Calendar, Attendance, Resources, Documents, Reports, AI Insights, Notifications, Settings |
| **STUDENT** | View upcoming activities; track personal attendance; access resources and documents; receive notifications | Dashboard, Activities, Calendar, Attendance, Resources, Documents, AI Insights, Notifications, Settings |

The sidebar navigation displayed to each user is determined by the `user.role` value received from the server after login. The `NAVIGATION_BY_ROLE` configuration object in `Sidebar.jsx` maps each database role to grouped navigation sections. The frontend contains no mechanism for the user to change or override their role assignment.

### 4.3 Authentication Flow

The system implements a two-step, passwordless authentication flow. No passwords are stored anywhere in the system.

#### Step 1 — Request OTP (`POST /auth/request-otp`)

```
User enters college email address on LoginPage
       ↓
Frontend calls POST /auth/request-otp  with { email }
       ↓
Backend: validate email domain against ALLOWED_DOMAINS list
  → If domain not allowed: HTTP 400, X-Error-Code: DOMAIN_NOT_ALLOWED
       ↓
Backend: query users table — does this email exist? Is account active?
  → If not found: HTTP 404  (USER_NOT_FOUND)
  → If inactive:  HTTP 403
       ↓
Backend: check otp_records for existing unused record for this email
  → If last_sent_at is within 60 seconds: HTTP 429 with cooldown remaining
  → If old unused OTPs exist: DELETE them before issuing a new one
       ↓
Backend: raw_otp = secrets.choice(digits) × 6  [cryptographically secure]
         otp_hash = bcrypt.hash(raw_otp)        [bcrypt — not MD5/SHA]
         expires_at = now() + 10 minutes
       ↓
Backend: INSERT otp_records row
         { email, otp_hash, expires_at, attempts=0, is_used=False }
       ↓
Backend: await send_otp_email(email, raw_otp, user.name)
         → HTML email via aiosmtplib (async SMTP)
         → If SMTP not configured: print to console (dev fallback)
       ↓
del raw_otp   ← plaintext discarded from server memory
       ↓
Response: { message: "OTP sent", cooldown_seconds: 60 }
          [OTP is NEVER present in the API response body]
```

#### Step 2 — Verify OTP (`POST /auth/verify-otp`)

```
User enters 6-digit OTP from email inbox
       ↓
Frontend calls POST /auth/verify-otp  with { email, otp }
       ↓
Backend: fetch latest unused otp_record for email
  → If none: generic "Invalid or expired OTP" error
       ↓
Check: now() > expires_at?
  → If expired: delete record, return error
       ↓
Check: otp_record.attempts >= 5 (OTP_MAX_ATTEMPTS)?
  → If exceeded: delete record, return HTTP 429
       ↓
bcrypt.verify(submitted_otp, otp_record.otp_hash)
  → If wrong: otp_record.attempts += 1, return error + remaining count
       ↓
OTP correct:
  otp_record.is_used = True  [invalidated immediately — one-time use]
       ↓
Fetch user from users table by email
  → Confirm user.is_active
  → If first login: user.is_verified = True
  → user.last_login = now()
       ↓
Create signed JWT:
  payload = { sub: user.id (UUID),
              role: user.role  (from DB — NOT from request),
              iat: now(), exp: now() + 480 minutes }
  Algorithm: HS256  |  Key: JWT_SECRET_KEY from environment
       ↓
Return: { access_token, token_type: "bearer",
          expires_in: 28800,
          user: { id, name, email, role, department,
                  usn_or_employee_id, is_verified, last_login } }
```

#### Token Validation on Subsequent Requests (`GET /auth/me`)

On every application page load, the frontend checks localStorage for a stored token. If found, it calls `GET /auth/me` with the token. The `get_current_user()` dependency on the backend:
1. Decodes the JWT and extracts the user UUID (`sub` claim)
2. Queries the `users` table by UUID
3. Returns the live database user object

The role returned is always from the current database record — meaning any role change made by an Admin takes effect on the user's next request, without requiring a new login.

### 4.4 Authorization and RBAC

Backend route protection uses FastAPI's dependency injection:

- **`get_current_user()`** — validates the Bearer JWT and returns the database `User` object. Applied to all protected routes.
- **`require_roles(*roles)`** — a factory that generates a dependency accepting only specific roles. Example: `Depends(require_roles(UserRole.ADMIN))` is applied to all `/users/` endpoints.

On the frontend, the `App.jsx` `AuthGate` component renders `LoginPage` when `isAuthenticated` is false. Once authenticated, `MainContent` uses `user.role` from `AuthContext` to select the correct dashboard. `Sidebar.jsx` uses the same `user.role` to select the correct navigation group from `NAVIGATION_BY_ROLE`. There is no client-side state that allows role elevation.

### 4.5 Functional Modules

The following modules are present in the codebase. Implementation status is noted honestly for each.

---

**4.5.1 Authentication Module** — *Fully implemented: backend + frontend integrated*

- Two-step email OTP login with animated step transitions (email entry → OTP entry → success screen)
- Six-digit OTP input component with auto-submit on completion
- JWT issuance, localStorage persistence, and validation on app load
- `AuthContext` providing global `user`, `isAuthenticated`, `isLoading`, `login()`, `logout()`
- `AuthGate` blocking all application access until authenticated
- Topbar profile menu showing real user name, role, email, and department; working Sign Out button

---

**4.5.2 Dashboard Module** — *Fully implemented frontend UI; data sourced from mockData.js (not live API)*

Four role-specific dashboards:

- **HOD Dashboard:** Six KPI stat cards (Total Activities, Pending Approvals, Upcoming Events, Budget Utilization, Student Participation, Faculty Workload); monthly activity trend area chart; budget utilisation grouped bar chart; upcoming activities data table with venue and lead faculty columns; pending approvals table with inline approve/reject quick actions; faculty workload bar chart; student participation area chart; recent activity timeline component; rotating AI Insights panel with four sample insights
- **Faculty Dashboard:** Activity proposal summary cards; workload area chart; accreditation report links (NBA, NAAC); student verification request panel
- **Student Dashboard:** Activity points progress bar with tier levels; registered activities list; attendance rate donut chart; certificate display section; upcoming events mini calendar; notifications panel
- **Admin Dashboard:** System telemetry KPI cards; resource allocation donut chart; recent audit log table; approval hierarchy display; embedded Admin Workflow Configurator panel

---

**4.5.3 Activity Management Module** — *Fully implemented frontend UI; not connected to backend API*

- **`ActivitiesPage.jsx`:** List view with search bar, category filter dropdown, status filter tabs; activity cards with title, status badge, date, venue, coordinator; "Create Activity" button launching wizard
- **`ActivityCreationWizard.jsx`:** 7-step tabbed form — (1) Basic Info: title, description, category (14 types), coordinator, department, academic year, semester; (2) Schedule: date range, start/end time, venue; (3) Participation: target students, maximum participants, eligibility criteria; (4) Budget: estimated budget, funding source; (5) Resources: required room, equipment, transport, other; (6) Documents: proposal upload, permission letter, supporting docs; (7) Approval Workflow: auto-determined chain from rule engine
- **`ActivityDetailPage.jsx`:** 9-tab detail view — Overview (hero card, key facts), Timeline (creation/approval history), Approvals (chain with status), Participants (enrolled list with QR check-in modal), Attendance (session records), Budget (allocated vs. spent), Documents (file list), Feedback (rating panel), Reports (export options)
- **`ActivityLifecycleBar.jsx`:** 8-stage interactive progress pipeline — Draft → Submitted → Under Review → Approved → Scheduled → Ongoing → Completed → Report Generated
- 14 defined activity types: Workshop, Seminar, Guest Lecture, FDP, Hackathon, Technical Competition, Industrial Visit, Club Activity, Department Meeting, Parent Meeting, Placement Activity, Training Program, Project Review, Other

Activity data is stored in frontend React state and `activityManagementData.js`. No backend CRUD API for activities exists in the current version.

---

**4.5.4 Approvals Module** — *Fully implemented frontend UI; in-memory state only (not persisted to database)*

- **`ApprovalsPage.jsx`:** Approval queue with four KPI stats (total/pending/approved/rejected counts); filter tabs; data table with risk badge (Low/Medium/High/Critical), requester, activity type, budget, status; per-row quick approve/reject buttons
- **`ApprovalDetailView.jsx`:** Full approval workspace: activity hero card, requester profile, automated risk assessment panel listing triggered rules and risk factors, documents list, full approval timeline
- **`ApprovalTimeline.jsx`:** Vertical timeline showing each required approver with role icon, status icon, timestamp, and comment
- **`ApprovalActionModal.jsx`:** Modal for Approve, Reject, and Request Changes with optional/required comment text area
- Approval actions dispatch notifications to `WorkflowContext.workflowNotifications` state, which `NotificationPanel.jsx` reads and displays in the topbar notification drawer

---

**4.5.5 Workflow Engine** — *Implemented as frontend JavaScript rule evaluator in `workflowEngineData.js`*

`evaluateWorkflow(activity, rules)` evaluates five configurable rules:

| Rule ID | Condition | Required Approvers | Risk Level |
|---------|---|---|---|
| RULE-001 | Budget ≤ ₹10,000 | Faculty Coordinator, HOD | Low |
| RULE-002 | Budget > ₹10,000 | Faculty Coordinator, HOD, Principal/Admin, Finance & Accounts | High |
| RULE-003 | Has external speaker | Faculty Coordinator, HOD, Principal/Admin | Medium |
| RULE-004 | Off-campus / external venue | Faculty Coordinator, HOD, Principal/Admin | Medium |
| RULE-005 | Industrial Visit activity type | Faculty Coordinator, HOD, Principal/Admin, Transport & Safety Officer | High |

The `AdminWorkflowConfigurator.jsx` allows Admin to toggle rules, edit thresholds, and test the engine in a live simulator sandbox. Rule changes are applied to React state and do not persist across page reloads in the current implementation.

---

**4.5.6 Calendar Module** — *Partially implemented: UI with static data, no interactive calendar grid*

Displays upcoming bookings from the `UPCOMING_ACTIVITIES` mock array and a static venue availability matrix (Main Auditorium A, Seminar Halls, Innovation Hub, HPC Lab). No date-picker, calendar grid component, or backend connection is implemented.

---

**4.5.7 Attendance Module** — *Partially implemented: UI with static records, no recording functionality*

Displays a table of static session attendance records (session name, date, present/total count, sync rate, capture mode). A "Generate Session QR" button exists in the UI. No actual QR code generation, scanning, or database-backed attendance recording is implemented.

---

**4.5.8 Resources Module** — *Partially implemented: UI with static asset cards*

Displays five static resource cards (auditorium, GPU cluster, lab spaces) with availability status badges. A "Register Asset" button is present. No CRUD operations or backend connection.

---

**4.5.9 Budget Module** — *Partially implemented: chart and summary with static data from mockData.js*

Displays a grouped bar chart (allocated vs. spent by category) and a fiscal summary card. All figures are static constants. No backend budget API.

---

**4.5.10 Reports Module** — *Partially implemented: static report list; download buttons show browser alert*

Lists four report templates (NBA Criterion 4, NAAC Metric 3.3.2, NIRF Research Output, Q3 Audit). Download buttons call `alert()` as a placeholder. No actual PDF generation or file download is implemented.

---

**4.5.11 Analytics Module** — *Partially implemented: charts with static data from mockData.js*

Displays a 12-month longitudinal activity trend area chart and an accreditation readiness bar chart. No backend analytics queries.

---

**4.5.12 Notifications Module** — *Partially implemented: two sources, neither persisted*

- Static notification cards in `SectionViews.jsx` (three hardcoded items)
- Dynamic in-memory notifications from `WorkflowContext` dispatched by approval actions, displayed in the topbar notification drawer via `NotificationPanel.jsx`

---

**4.5.13 Documents Module** — *Partially implemented: static file list; download buttons show browser alert*

Lists four static document cards. Upload/download interactions call `alert()`. No file storage integration.

---

**4.5.14 AI Insights Module** — *UI/mock only: pre-written text strings displayed as insight cards*

Displays a grid of static insight cards from the `AI_INSIGHTS` array in `mockData.js`. Each card has a title, message text, and action button (triggering `alert()`). No machine learning model, statistical analysis, or AI API integration is implemented. The label reflects intended future functionality.

---

**4.5.15 Settings Module** — *Partially implemented: form fields displayed; no submission handler*

Two settings cards: Approval Routing Thresholds (three input fields) and System Notifications (static toggle badges). No backend connection.

---

**4.5.16 Admin-Only Sub-sections** — *Navigation items only; no views implemented*

User Management, Department Management, Role Management, System Configuration, and Audit Logs appear in the Admin sidebar. `SectionViews.jsx` returns `null` for these section IDs — no views are rendered.

---

**4.5.17 Command Palette** — *Fully implemented frontend feature*

Triggered by Ctrl+K globally. Additional keyboard shortcuts: N (New Activity), A (Approvals), C (Calendar), R (Reports). Renders a modal overlay with a search input and quick-navigation action list using `CommandPaletteContext`.

---

### 4.6 Database Design

The database uses **PostgreSQL** accessed via **SQLAlchemy** (async). Tables are created automatically on startup via `Base.metadata.create_all`.

**Table: `users`**

| Column | Type | Constraints | Description |
|--------|------|---|---|
| `id` | UUID | PK, indexed | System-generated identifier |
| `name` | VARCHAR(255) | NOT NULL | Full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, indexed | Login email |
| `role` | ENUM | NOT NULL | STUDENT / FACULTY / HOD / ADMIN |
| `department` | VARCHAR(255) | nullable | Department name |
| `usn_or_employee_id` | VARCHAR(100) | UNIQUE, nullable | USN for students, Employee ID for staff |
| `is_verified` | BOOLEAN | NOT NULL, default False | True after first successful OTP login |
| `is_active` | BOOLEAN | NOT NULL, default True | False = cannot log in |
| `created_at` | TIMESTAMPTZ | server default now() | Account creation time |
| `updated_at` | TIMESTAMPTZ | server default, on update | Last modification time |
| `last_login` | TIMESTAMPTZ | nullable | Last successful authentication |

**Table: `otp_records`**

| Column | Type | Constraints | Description |
|--------|------|---|---|
| `id` | UUID | PK | Record identifier |
| `email` | VARCHAR(255) | NOT NULL, indexed | Email the OTP was issued for |
| `otp_hash` | VARCHAR(255) | NOT NULL | bcrypt hash — plaintext never stored |
| `created_at` | TIMESTAMPTZ | server default | OTP creation time |
| `expires_at` | TIMESTAMPTZ | NOT NULL | now() + 10 minutes |
| `attempts` | INTEGER | NOT NULL, default 0 | Failed verification count |
| `is_used` | BOOLEAN | NOT NULL, default False | True immediately after successful use |
| `last_sent_at` | TIMESTAMPTZ | server default | Used to enforce 60-second resend cooldown |

`seed.py` populates initial user accounts: 1 Admin, 1 HOD, 2 Faculty, 3 Students. It checks for existing records before inserting to support idempotent re-runs.

### 4.7 API Architecture

**Authentication Router (`/auth`)**

| Method | Endpoint | Auth | Description |
|--------|---|---|---|
| POST | `/auth/request-otp` | None | Validate email; generate hashed OTP; send email |
| POST | `/auth/verify-otp` | None | Verify OTP hash; issue JWT; return user profile |
| GET | `/auth/me` | Bearer JWT | Re-fetch user from DB; return current profile |
| POST | `/auth/logout` | Bearer JWT | Server acknowledgement; client discards token |

**Users Router (`/users`)** — Admin role required for all endpoints

| Method | Endpoint | Description |
|--------|---|---|
| GET | `/users/` | List all users |
| POST | `/users/` | Create a new user account |
| PATCH | `/users/{user_id}` | Update name, department, or active status |

**Health Check**

| Method | Endpoint | Description |
|--------|---|---|
| GET | `/` | Returns service name, version, and status |

All responses are JSON. Request bodies are validated by Pydantic v2 schemas. Error responses include a structured `detail` string and a custom `X-Error-Code` header. Interactive documentation is served at `/docs` (Swagger UI) and `/redoc`.

### 4.8 Frontend Architecture

**Technology:** React 19, Vite 8, JavaScript (ESM), CSS Custom Properties (no CSS framework)

**Directory Structure:**
```
app/src/
├── api/
│   └── client.js              ← fetch wrapper with automatic JWT header injection
├── contexts/
│   ├── AuthContext.jsx         ← user, isAuthenticated, isLoading, login(), logout()
│   ├── SidebarContext.jsx      ← isCollapsed, activeNav, isMobileOpen
│   ├── ThemeContext.jsx        ← light/dark theme toggle
│   ├── CommandPaletteContext.jsx
│   └── WorkflowContext.jsx    ← approval state and notification dispatch
├── pages/
│   ├── LoginPage.jsx           ← two-step OTP login UI
│   ├── DashboardHOD.jsx
│   ├── DashboardFaculty.jsx
│   ├── DashboardStudent.jsx
│   ├── DashboardAdmin.jsx
│   ├── ActivitiesPage.jsx
│   ├── ApprovalsPage.jsx
│   └── SectionViews.jsx       ← router for all non-dashboard sections
├── components/
│   ├── layout/                 ← Sidebar, Topbar, AppShell, Breadcrumbs
│   ├── activities/             ← ActivityCreationWizard, ActivityDetailPage,
│   │                              ActivityLifecycleBar
│   ├── workflow/               ← ApprovalTimeline, ApprovalActionModal,
│   │                              ApprovalDetailView, AdminWorkflowConfigurator
│   ├── charts/                 ← AreaChartWidget, BarChartWidget, DonutChartWidget
│   ├── ui/                     ← 15 primitives: Avatar, Badge, Button, Card,
│   │                              ConfirmDialog, Drawer, EmptyState, ErrorState,
│   │                              Input, Modal, Skeleton, StatCard, Table, Tabs,
│   │                              Timeline
│   ├── CommandPalette.jsx
│   ├── NotificationPanel.jsx
│   └── NewActivityModal.jsx
├── data/
│   ├── mockData.js             ← static datasets for dashboards and section views
│   ├── activityManagementData.js
│   └── workflowEngineData.js
└── styles/
    ├── tokens.css              ← CSS custom properties (design system)
    ├── themes.css              ← light/dark variable overrides
    ├── reset.css
    ├── animations.css
    ├── components.css
    └── layout.css
```

**Routing approach:** Conditional rendering model — no URL-based routes for protected views. `App.jsx` renders `LoginPage` when unauthenticated, or `AppShell` + `MainContent` when authenticated. Within `MainContent`, `activeNav` from `SidebarContext` determines which page renders.

**Styling:** Pure CSS with custom properties. `tokens.css` defines the design system (colors, spacing, radius, shadows). `themes.css` overrides variables under `[data-theme="dark"]`. Animation is handled by Framer Motion.

### 4.9 Backend Architecture

**Technology:** Python 3.10, FastAPI, Uvicorn (ASGI server)

| Module | Responsibility |
|--------|---|
| `main.py` | FastAPI app, CORS, router registration, lifespan DB table auto-creation |
| `config.py` | pydantic-settings `Settings` class loading all values from `.env` file |
| `database.py` | Async SQLAlchemy engine, `AsyncSessionLocal`, `get_db()` dependency |
| `models.py` | ORM models: `User`, `OTPRecord`; `UserRole` enum |
| `schemas.py` | Pydantic v2 schemas: `RequestOTPRequest`, `VerifyOTPRequest`, `TokenResponse`, `UserPublic`, `UserCreate`, `UserUpdate`, `ErrorResponse` |
| `security.py` | `generate_otp()`, `hash_otp()`, `verify_otp_hash()`, `create_access_token()`, `decode_access_token()` |
| `email_service.py` | HTML OTP email builder and `send_otp_email()` via aiosmtplib |
| `dependencies.py` | `get_current_user()` JWT validation dependency; `require_roles()` factory |
| `routers/auth.py` | `/auth/*` endpoints |
| `routers/users.py` | `/users/*` endpoints (Admin only) |
| `seed.py` | Database seeding script |

### 4.10 System Workflows

**Login Workflow:**
```
User opens http://localhost:5173
     ↓
AuthContext checks localStorage for 'smartdept_token'
  → Token exists: GET /auth/me → validate + fetch fresh user from DB
  → No token: render LoginPage
     ↓
Step 1: email entry → POST /auth/request-otp
  → Success: show OTP entry step with resend countdown
  → Error: show domain/account message
     ↓
Step 2: 6-digit OTP → POST /auth/verify-otp (auto-submits on digit 6)
  → Success: store token → brief success animation (name + role badge)
             AuthGate renders AppShell
  → Error: show remaining attempts / request new OTP
     ↓
Sidebar reads user.role → selects NAVIGATION_BY_ROLE[role]
MainContent reads user.role → renders correct dashboard component
```

**Activity Proposal Workflow (current frontend state):**
```
Faculty clicks "+ Create Activity"  (or Ctrl+K → N)
     ↓
ActivityCreationWizard (7 steps) → on submit:
  evaluateWorkflow(activity) determines required approvers
  Activity stored in frontend state, status = 'draft'
     ↓
Activity appears in ActivitiesPage list
Clicking → ActivityDetailPage (9 tabs)
     ↓
HOD opens ApprovalsPage → selects pending request → ApprovalDetailView
HOD clicks "Approve" → ApprovalActionModal (comment entry)
     ↓
WorkflowContext.approveRequest() → updates in-memory state
NotificationPanel shows dispatch notification in topbar drawer
```

### 4.11 Validation and Error Handling

**Backend:**
- Pydantic v2 schemas validate all request bodies with type checking and field constraints (e.g., `otp` field enforces `pattern=r"^\d{6}$"`)
- `EmailStr` from `pydantic[email]` validates email syntax before any database query
- Domain whitelist validation applied before user lookup to prevent unnecessary DB queries
- OTP error messages are kept generic to avoid confirming whether an email exists in the system

**Frontend:**
- Email `<input type="email" required>` provides browser-native format validation
- OTP input enforces numeric-only characters; auto-submits on the 6th digit
- `try/catch` blocks around all API calls surface structured error messages
- `client.js` parses `X-Error-Code` and `X-Cooldown-Remaining` response headers for machine-readable error handling

**UI error states:**
`ErrorState.jsx` and `EmptyState.jsx` are reusable components for structured error display. `Skeleton.jsx` provides loading placeholder animations for async content.

### 4.12 Security Considerations

| Security Requirement | Implementation in Codebase |
|---|---|
| No hardcoded OTPs | `secrets.choice()` generates OTP at runtime per request |
| OTP not in API response | Response contains only a confirmation message and cooldown duration |
| No plaintext OTP storage | Only bcrypt hash stored in `otp_records.otp_hash`; plaintext deleted after email send (`del raw_otp`) |
| OTP expiry | `expires_at = now() + 10 minutes`; checked before every verification |
| Attempt limiting | Max 5 attempts; record deleted on exceeding limit |
| Resend cooldown | 60-second cooldown enforced via `last_sent_at` comparison |
| One-time OTP use | `is_used = True` set immediately on successful verification |
| Role from database only | JWT `sub` contains user UUID; user re-fetched from DB on every protected request |
| No frontend role trust | `require_roles()` dependency validates role from DB object, not JWT payload |
| Secrets in environment | `JWT_SECRET_KEY`, `SMTP_PASSWORD`, `DATABASE_URL` loaded from `.env` via pydantic-settings |
| `.env` in `.gitignore` | `.env` gitignored; only `.env.example` (no real values) is tracked |
| CORS restriction | Only `FRONTEND_URL`, `localhost:5173`, `localhost:5174` allowed as origins |

---

## CHAPTER 5: EXPECTED OUTCOMES

Upon completion of the planned development phases, SMARTDEPT is expected to produce the following outcomes:

1. **Centralised department information:** All activity records, approval decisions, attendance data, and budget figures accessible from a single platform, eliminating parallel spreadsheets and email threads.

2. **Reduced manual coordination effort:** Activity proposals submitted digitally through the creation wizard and routed automatically to the correct approvers by the workflow engine, removing manual email forwarding and follow-up.

3. **Enforced and auditable approval chains:** Every approval or rejection recorded with the approver's identity, timestamp, and comment, creating an audit trail suitable for institutional reporting.

4. **Role-appropriate interfaces:** Each user sees only the modules and actions appropriate to their position — a student will not encounter budget management screens; a faculty member will not see system administration panels.

5. **Improved accreditation readiness:** Activity records, attendance data, budget utilisation, and participant lists structured in a format suitable for NBA, NAAC, and NIRF documentation, reducing compilation effort at accreditation time.

6. **Secure and low-friction authentication:** College email OTP login removes password management overhead and the risk of shared or weak passwords, which is a common security concern in academic systems.

7. **Department-level visibility for HOD:** Consolidated view of all department activities, pending approvals, budget utilisation, and faculty workload from a single dashboard.

8. **Configurable institutional policies:** Admin can adjust workflow approval rules from the Admin Workflow Configurator without requiring code changes or developer involvement.

---

## CHAPTER 6: PROJECT SCOPE

### 6.1 Functional Scope

The current implementation covers:
- Secure passwordless email OTP authentication with JWT session management
- Role-based navigation and dashboard rendering for four user types
- Activity management with 14 activity types, 8-stage lifecycle, 7-step creation wizard, 9-tab detail view
- Frontend rule engine for approval chain determination based on budget and activity attributes
- Approval queue management with risk assessment and action modals
- Configurable workflow rule management (Admin panel)
- Section views for Calendar, Attendance, Resources, Budget, Reports, Analytics, Notifications, Documents, Settings, and AI Insights (with static or in-memory data)
- User management API (backend implemented; no frontend view yet)
- Global command palette with keyboard shortcuts
- Light/dark theme toggle

### 6.2 User Scope

| Role | Primary Use Cases in Current Build |
|------|---|
| **Admin** | Login; view Admin dashboard; access Workflow Configurator; user management via API (no frontend UI) |
| **HOD** | Login; view HOD dashboard with KPIs and charts; approve/reject activities; navigate HOD-visible sections |
| **Faculty** | Login; view Faculty dashboard; create activity proposals via wizard; navigate Faculty-visible sections |
| **Student** | Login; view Student dashboard with points and attendance; navigate Student-visible sections |

### 6.3 Technical Scope

| Layer | Technology | Version |
|-------|---|---|
| Frontend framework | React | 19.2.8 |
| Build tool | Vite | 8.2.2 |
| Frontend language | JavaScript (JSX, ES modules) | — |
| Animation | Framer Motion | 13.1.1 |
| Icons | Lucide React | 1.34.0 |
| Charts | Recharts | 3.10.1 |
| Backend language | Python | 3.10.11 |
| Backend framework | FastAPI | latest |
| ASGI server | Uvicorn (standard) | latest |
| ORM | SQLAlchemy (async) | latest |
| DB driver | asyncpg | latest |
| Database | PostgreSQL | 14+ |
| JWT | python-jose (HS256) | latest |
| OTP hashing | passlib (bcrypt) | latest |
| Email | aiosmtplib | latest |
| Settings | pydantic-settings | latest |
| Validation | Pydantic v2 | latest |

### 6.4 System Architecture Description

**Presentation Tier:** React SPA served by Vite (dev) or as static files (production). Communicates with the backend exclusively via REST API calls with a Bearer JWT token. No server-side rendering.

**Application Tier:** FastAPI on Uvicorn. Handles authentication, input validation, OTP business logic, role-based routing, and database interaction via async SQLAlchemy sessions.

**Data Tier:** PostgreSQL with two tables (`users`, `otp_records`). Accessed via `asyncpg` through SQLAlchemy's async engine.

Frontend (port 5173) and backend (port 8000) run separately in development, with CORS configured for cross-origin requests. In production, both could be served from the same domain using a reverse proxy such as Nginx with HTTPS.

### 6.5 Current Limitations

The following limitations are present in the current implementation and are documented honestly:

1. **No activity CRUD API:** Activity creation, update, and retrieval are not backed by database API endpoints. All activity data resets on page refresh.

2. **No approval persistence:** Approval actions update only React state in `WorkflowContext`. They are not saved to the database.

3. **No real attendance recording:** The Attendance module displays static records. No QR code generation, scanning, or database-backed recording is implemented.

4. **No resource booking database:** Resources module lists static assets with no reservation functionality.

5. **No live budget tracking:** All budget figures are static constants from `mockData.js`.

6. **No document file storage:** Upload/download buttons trigger `alert()` calls. No file storage backend is integrated.

7. **No AI/ML implementation:** "AI Insights" displays pre-written text strings. No model, statistical pipeline, or AI API is used.

8. **Admin sub-sections missing:** User Management, Department Management, Role Management, System Configuration, and Audit Logs are navigation items only with no rendered views.

9. **JWT in localStorage:** Functional for demonstration, but HttpOnly cookies would provide stronger XSS protection in a production deployment.

10. **No automated test suite:** No unit, integration, or end-to-end tests are present.

### 6.6 Future Enhancements

The following are proposed as future development work, not as features of the current system:

1. **Activity management API:** Complete CRUD endpoints for activities, connecting the creation wizard and detail page to the database.
2. **Approval persistence API:** Database-backed approval records with a full history table.
3. **Real-time notifications:** WebSocket-based push notifications (FastAPI supports WebSockets natively).
4. **QR-based attendance recording:** Scannable session QR codes with database-backed attendance logging.
5. **File storage integration:** Document upload and download using local or cloud object storage.
6. **Data-driven AI analytics:** Trend analysis and workload anomaly detection using historical activity data and Python data science libraries.
7. **Mobile progressive web app:** PWA or React Native companion for QR scanning and mobile notifications.
8. **Cloud deployment:** Static CDN frontend, containerised backend, managed PostgreSQL, with HTTPS.
9. **Automated test suite:** pytest backend tests and Playwright/Vitest frontend tests.
10. **Actual report generation:** PDF generation for NBA, NAAC, and NIRF templates using ReportLab or WeasyPrint.

---

## CHAPTER 7: RESOURCES REQUIRED

### A. Hardware Requirements

| Resource | Minimum Specification |
|---|---|
| Development Computer | Dual-core 64-bit CPU |
| RAM | 8 GB |
| Storage | 10 GB free (project + Node modules + Python packages + PostgreSQL data) |
| Network | Broadband internet (for package installation and SMTP email) |
| Browser | Chrome 100+ / Firefox 100+ / Edge 100+ |

### B. Software Requirements

| Category | Software | Version | Purpose |
|---|---|---|---|
| Operating System | Windows 10/11 (or Linux/macOS) | — | Development platform |
| Code Editor | Visual Studio Code | Latest | IDE |
| Runtime (Frontend) | Node.js | 18 LTS or 20 LTS | npm and Vite |
| Package Manager | npm | 9+ | Frontend dependencies |
| Frontend Framework | React | 19.2.8 | UI development |
| Build Tool | Vite | 8.2.2 | Dev server and production build |
| Animation | Framer Motion | 13.1.1 | Animations |
| Chart Library | Recharts | 3.10.1 | Dashboard charts |
| Icon Library | Lucide React | 1.34.0 | UI icons |
| Backend Language | Python | 3.10.11 | Backend development |
| Backend Framework | FastAPI | Latest | REST API |
| ASGI Server | Uvicorn | Latest | Running FastAPI |
| Database | PostgreSQL | 14+ | Persistent storage |
| ORM | SQLAlchemy (async) | Latest | Database access |
| JWT | python-jose | Latest | Token creation/verification |
| Hashing | passlib (bcrypt) | Latest | OTP hashing |
| Email | aiosmtplib | Latest | Async SMTP |
| Settings | pydantic-settings | Latest | Environment configuration |
| Validation | Pydantic v2 | Latest | Request/response schemas |

### C. Development Resources

| Resource | Tool | Purpose |
|---|---|---|
| Version Control | Git | Source code management |
| Code Repository | GitHub (or local) | Collaboration and backup |
| API Documentation | FastAPI /docs (Swagger UI) | Exploring and testing endpoints |
| Database Management | pgAdmin 4 or DBeaver | PostgreSQL administration |
| Environment Config | `.env` + `.env.example` | Separating secrets from source code |
| OTP Testing (dev) | Backend console output | Testing OTP flow without SMTP |

---

## CHAPTER 8: REFERENCES

[1] R. S. Sandhu, E. J. Coyne, H. L. Feinstein, and C. E. Youman, "Role-based access control models," *IEEE Computer*, vol. 29, no. 2, pp. 38–47, Feb. 1996. doi: 10.1109/2.485845

[2] D. F. Ferraiolo, R. Sandhu, S. Gavrila, D. R. Kuhn, and R. Chandramouli, "Proposed NIST standard for role-based access control," *ACM Transactions on Information and System Security*, vol. 4, no. 3, pp. 224–274, Aug. 2001. doi: 10.1145/501978.501980

[3] W. M. P. van der Aalst and K. M. van Hee, *Workflow Management: Models, Methods, and Systems*. Cambridge, MA: MIT Press, 2002.

[4] T. Ly, F. Maggi, M. Montali, S. Rinderle-Ma, and W. M. P. van der Aalst, "Compliance monitoring in business processes: Functionalities, application, and tool-support," *Information Systems*, vol. 54, pp. 209–234, Dec. 2015. doi: 10.1016/j.is.2015.02.007

[5] R. T. Fielding, "Architectural styles and the design of network-based software architectures," Ph.D. dissertation, Dept. of Information and Computer Science, Univ. of California, Irvine, 2000. [Online]. Available: https://ics.uci.edu/~fielding/pubs/dissertation/top.htm

[6] M. Jones, J. Bradley, and N. Sakimura, "JSON Web Token (JWT)," IETF, RFC 7519, May 2015. [Online]. Available: https://tools.ietf.org/html/rfc7519

[7] Open Web Application Security Project (OWASP), "Authentication Cheat Sheet," OWASP Foundation, 2023. [Online]. Available: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html

[8] S. Ramírez, "FastAPI — Modern, Fast Web Framework for Building APIs with Python," 2018–present. [Online]. Available: https://fastapi.tiangolo.com/

[9] M. Bayer, "SQLAlchemy — The Python SQL Toolkit and Object Relational Mapper," 2006–present. [Online]. Available: https://docs.sqlalchemy.org/

[10] PostgreSQL Global Development Group, "PostgreSQL 14 Documentation," 2021. [Online]. Available: https://www.postgresql.org/docs/14/

[11] Meta Open Source, "React — The Library for Web and Native User Interfaces," v19, 2024. [Online]. Available: https://react.dev/

[12] E. You et al., "Vite — Next Generation Frontend Tooling," v8, 2024. [Online]. Available: https://vitejs.dev/

[13] Recharts Development Team, "Recharts — A Composable Charting Library Built on React Components," 2023. [Online]. Available: https://recharts.org/

[14] Framer, "Framer Motion — Production-Ready Motion Library for React," 2024. [Online]. Available: https://www.framer.com/motion/

[15] Python Software Foundation, "secrets — Generate Secure Random Numbers for Managing Secrets," Python 3.10 Docs. [Online]. Available: https://docs.python.org/3/library/secrets.html

[16] passlib Contributors, "passlib — Password Hashing Library for Python." [Online]. Available: https://passlib.readthedocs.io/

---

*Document prepared by the project team under the guidance of [Guide Name]*
*Department of Computer Science and Engineering*
*SDM College of Engineering & Technology, Dhavalagiri, Dharwad – 580 002*
*August 2026*
