# BOSS System - Visual Table of Contents (VTOC)

## Hierarchical Structure

```
                                    0.0
                                   HOME
                                    |
        __________________________|__________________________
        |           |            |            |            |
       1.0         2.0          3.0          4.0          5.0
     LOG IN    PUBLIC PAGES   BUSINESS    ADMIN PANEL    BPLO OFFICE
                            SERVICES
        |           |            |            |            |
        |         2.1          3.1          4.1          5.1
        |      ANNOUNCEMENTS TRACKING    DASHBOARD    ADMIN PORTAL
        |          |            |            |            |
      1.1        2.2          3.2          4.2          5.2
    LOGIN      APPOINTMENTS NEW REGISTER APPLICATIONS  TREASURER
    FORM        |            |            |            PORTAL
        |       2.3          3.3          4.3          |
        |      SERVICES    RENEWAL     RENEWALS       5.3
        |        |        MANAGEMENT      |       ENDORSEMENT
        |       2.4         |            4.4       OFFICER
        |      CONTACT   3.4 PERMIT      |
        |        |      TRACKING      APPOINTMENTS
        |       2.5         |            |
        |      ABOUT      3.5 FEE        4.5
        |        |      COMPUTATION      |
    1.2      2.6         |           REPORTS
  VERIFY    BUSINESS    3.6            |
  LOGIN      SEARCH     VERIFICATION   4.6
             |                      USERS
            2.7                       |
          LINE OF                    4.7
          BUSINESS                 SETTINGS
```

---

## Detailed Section Breakdown

### 1.0 AUTHENTICATION
- **1.1** Login Form
  - Email Inrd Link
- **1.2** Session Verification
  - Token Validation
  - Auto-redirect if authenticated

---

### 2.0 PUBLIC PAGES
- **2.1** City Announcements
  - View All Announcements
  - Filter by Category
  - Search Announcements
  - View Details
  
- **2.2** Appointments
  - Book Appointment
  - View Existing Appointments
  - Schedule Management
  - Confirmation Emails
  
- **2.3** Services
  - Service Categories
  - Requirements
  - Processing Times
  - Fees Information
  
- **2.4** Contact Directory
  - Office Locations
  - Contact Information
  - Department Details
  - Hours of Operation
  
- **2.5** About
  - City Information
  - Mission & Vision
  - History
  - FAQs
  
- **2.6** Search Existing Business
  - Business Lookup
  - Status Verification
  - Permit Information
  - Contact Details
  
- **2.7** Line of Business
  - Categories
  - Descriptions
  - Requirements per Category

---

### 3.0 BUSINESS SERVICES
- **3.1** Application Tracking
  - Current Status
  - History
  - Document Status
  - Timeline View
  
- **3.2** New Business Registration
  - Registration Form
  - Business Details
  - Owner Information
  - Document Upload
  - Application Submission
  - Approval Status
  
- **3.3** Renewal Management
  - View Renewals
  - Renewal Forms
  - Permit Information
  - Expiration Dates
  - Submit Renewal
  
- **3.4** Permit Tracking
  - Active Permits
  - Inactive Permits
  - Issue Dates
  - Expiration Dates
  - Verification Options
  
- **3.5** Fee Computation
  - Calculate Fees
  - Fee Breakdown
  - Tax Calculations
  - Payment Methods
  
- **3.6** Application Verification
  - Verify Status
  - Get License Copy
  - Certificate Generation
  - Download Documents

---

### 4.0 ADMIN PANEL
- **4.1** Dashboard
  - Key Metrics
  - Statistics Overview
  - Quick Actions
  - System Health
  
- **4.2** Applications Management
  - View All Applications
  - Filter & Search
  - Approve Applications
  - Reject Applications
  - Request Additional Info
  - Add Comments
  - Change Status
  
- **4.3** Renewals Management
  - View All Renewals
  - Filter by Status
  - Approve Renewals
  - Process Fees
  - Generate Documents
  
- **4.4** Appointments Management
  - View Calendar
  - Mark Complete
  - Cancel Appointments
  - Reschedule
  - Send Notifications
  
- **4.5** Reports & Analytics
  - Application Reports
  - Renewal Reports
  - Revenue Reports
  - Performance Metrics
  - Export Data
  
- **4.6** User Management
  - View Users
  - Manage Permissions
  - Activate/Deactivate
  - Reset Passwords
  - Audit Log
  
- **4.7** Settings
  - System Configuration
  - Email Templates
  - Notification Settings
  - Application Workflow
  - Fee Structures

---

### 5.0 BPLO OFFICE (Business Permits & Licensing Office)
- **5.1** Admin Portal
  - Workflow Management
  - Process Overview
  - Task Queue
  - Approval Authority
  
- **5.2** Treasurer Portal
  - Payment Processing
  - Revenue Tracking
  - Financial Reports
  - Payment Verification
  - Receipts
  
- **5.3** Endorsement Officer
  - Endorsement Processing
  - Document Review
  - Certification
  - Approval/Rejection
  - Status Updatesput
  - Password Input
  - Submit & Validation
  - Forgot Passwo

---

## Component Mapping

| Section | Component | File |
|---------|-----------|------|
| 0.0 | Home/Landing | App.jsx |
| 1.0 | Authentication | `/pages/auth/` |
| 1.1 | Login Form | Login.jsx |
| 2.0 | Public Pages | `/pages/public/` |
| 2.1 | Announcements | Announcements.jsx |
| 2.2 | Appointments | Appointment.jsx |
| 2.3 | Services | Home.jsx (section) |
| 2.4 | Contact | Contact.jsx |
| 2.5 | About | About.jsx |
| 2.6 | Search Business | SearchExistingBusiness.jsx |
| 2.7 | Line of Business | LineOfBusiness.jsx |
| 3.0 | Business Services | `/pages/public/` |
| 3.1 | Tracking | Tracking.jsx |
| 3.2 | New Registration | NewRegistration.jsx |
| 3.3 | Renewal | Renewal.jsx |
| 3.4 | Permit Tracking | Tracking.jsx |
| 3.5 | Fee Computation | FeeComputation.jsx |
| 3.6 | Verification | Verification.jsx |
| 4.0 | Admin Panel | `/pages/admin/` |
| 4.1 | Dashboard | AdminDashboard.jsx |
| 4.2 | Applications | AdminApplications.jsx |
| 4.3 | Renewals | AdminRenewals.jsx |
| 4.4 | Appointments | AdminAppointments.jsx |
| 4.5 | Reports | AdminReports.jsx |
| 4.6 | Users | AdminUsers.jsx |
| 4.7 | Settings | AdminSettings.jsx |
| 5.0 | BPLO Office | `/pages/bplo/` |
| 5.1 | Admin Portal | BPLOAdmin.jsx |
| 5.2 | Treasurer Portal | BPLOTreasurer.jsx |
| 5.3 | Endorsement Officer | BPLOEndorsement.jsx |

---

## Navigation Flow

```
Entry Point (HOME 0.0)
    ├─→ Public User
    │   ├─→ 2.0 Public Pages (Announcements, Services, About)
    │   ├─→ 3.0 Business Services (Register, Renew, Track)
    │   └─→ 1.0 Log In (if action requires auth)
    │
    ├─→ Authenticated Business User
    │   ├─→ 3.0 Business Services (Full Access)
    │   ├─→ 2.0 Public Pages (Limited Access)
    │   └─→ Logout
    │
    ├─→ Admin User (admin@boss.com)
    │   ├─→ 4.0 Admin Panel (Full Access)
    │   ├─→ 2.0 & 3.0 Public/Business (View Only)
    │   └─→ Logout
    │
    └─→ BPLO Officers
        ├─→ 5.0 BPLO Office (Role-Based Access)
        ├─→ 4.0 Admin Panel (Limited)
        └─→ Logout
```

---

## Access Control Matrix

| Section | Public | Auth User | Admin | BPLO |
|---------|--------|-----------|-------|------|
| **2.0** Public Pages | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **3.0** Business Services | ✅ Limited | ✅ Full | ✅ Full | ✅ View |
| **4.0** Admin Panel | ❌ | ❌ | ✅ Full | ✅ Limited |
| **5.0** BPLO Office | ❌ | ❌ | ✅ View | ✅ Full |
| **1.0** Authentication | ✅ | ✅ | ✅ | ✅ |

---

## File Structure Reference

```
boss_project/src/
├── pages/
│   ├── public/               (2.0-2.7 Public Pages)
│   │   ├── Home.jsx          (0.0/2.0)
│   │   ├── Announcements.jsx (2.1)
│   │   ├── Appointment.jsx   (2.2)
│   │   ├── Contact.jsx       (2.4)
│   │   ├── About.jsx         (2.5)
│   │   ├── SearchExistingBusiness.jsx (2.6)
│   │   ├── LineOfBusiness.jsx (2.7)
│   │   ├── NewRegistration.jsx (3.2)
│   │   ├── Renewal.jsx       (3.3)
│   │   ├── Tracking.jsx      (3.1/3.4)
│   │   ├── FeeComputation.jsx (3.5)
│   │   └── Verification.jsx  (3.6)
│   │
│   ├── auth/                 (1.0 Authentication)
│   │   └── Login.jsx         (1.1)
│   │
│   ├── admin/                (4.0 Admin Panel)
│   │   ├── AdminDashboard.jsx (4.1)
│   │   ├── AdminApplications.jsx (4.2)
│   │   ├── AdminRenewals.jsx (4.3)
│   │   ├── AdminAppointments.jsx (4.4)
│   │   ├── AdminReports.jsx  (4.5)
│   │   ├── AdminUsers.jsx    (4.6)
│   │   └── AdminSettings.jsx (4.7)
│   │
│   └── bplo/                 (5.0 BPLO Office)
│       ├── BPLOAdmin.jsx     (5.1)
│       ├── BPLOTreasurer.jsx (5.2)
│       └── BPLOEndorsement.jsx (5.3)
│
├── components/
│   ├── shared/               (Layout & Auth)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   └── common/               (Reusable UI)
│       ├── StatusBadge.jsx
│       └── MiniChart.jsx
│
├── modules/
│   ├── admin/                (Admin Logic)
│   └── bplo/                 (BPLO Logic)
│       ├── styles.js
│       ├── pages.js
│       └── data.js
│
└── App.jsx (Root - 0.0)
```

---

**Last Updated:** March 17, 2026  
**System:** BOSS (Business Operations Support System)
