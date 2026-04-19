import { useState } from "react";
import { BPLOStyles } from "../../features/bplo/styles";
import {
  Dashboard,
  Applications,
  Endorsements,
  PermitProcessing,
  PaymentMonitoring,
  BusinessRecords,
  Reports,
  Announcements,
  PermitVerification,
} from "../../features/bplo/pages.jsx";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "📊", section: "OVERVIEW" },
  { key: "applications", label: "Applications", icon: "📋", badge: 6, section: "OPERATIONS" },
  { key: "endorsements", label: "Endorsement Fwding", icon: "📤", section: "OPERATIONS" },
  { key: "permits", label: "Permit Processing", icon: "📄", section: "OPERATIONS" },
  { key: "payments", label: "Payment Monitoring", icon: "💰", badge: 2, section: "OPERATIONS" },
  { key: "records", label: "Business Records", icon: "🗂️", section: "RECORDS" },
  { key: "reports", label: "Reports", icon: "📈", section: "RECORDS" },
  { key: "announcements", label: "Announcements", icon: "📢", section: "COMMUNICATION" },
  { key: "verification", label: "Permit Verification", icon: "🔎", section: "TOOLS" },
];

const PAGE_META = {
  dashboard: { title: "Dashboard", subtitle: "Business Permits & Licensing Office — Dagupan City" },
  applications: { title: "Applications", subtitle: "Review and process business permit applications" },
  endorsements: { title: "Endorsement Forwarding", subtitle: "Forward applications to partner offices" },
  permits: { title: "Permit Processing", subtitle: "Generate and issue business permits" },
  payments: { title: "Payment Monitoring", subtitle: "Track and verify payment transactions" },
  records: { title: "Business Records", subtitle: "Registered business directory and permit history" },
  reports: { title: "Reports & Analytics", subtitle: "Generate and export statistical reports" },
  announcements: { title: "Announcements", subtitle: "Post notices and updates for stakeholders" },
  verification: { title: "Permit Verification", subtitle: "Verify permit authenticity by number or QR code" },
};

export default function BPLOAdmin() {
  const [page, setPage] = useState("dashboard");
  const [toastMsg, setToastMsg] = useState(null);

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const sections = [...new Set(NAV.map(n => n.section))];

  const renderPage = () => {
    const props = { toast, setPage };
    switch (page) {
      case "dashboard": return <Dashboard {...props} />;
      case "applications": return <Applications {...props} />;
      case "endorsements": return <Endorsements {...props} />;
      case "permits": return <PermitProcessing {...props} />;
      case "payments": return <PaymentMonitoring {...props} />;
      case "records": return <BusinessRecords {...props} />;
      case "reports": return <Reports {...props} />;
      case "announcements": return <Announcements {...props} />;
      case "verification": return <PermitVerification {...props} />;
      default: return null;
    }
  };

  return (
    <>
      <style>{BPLOStyles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-badge">
              <div className="brand-icon">🏛️</div>
              <div className="brand-text">
                <div className="brand-title">BPLO</div>
                <div className="brand-sub">Admin Panel</div>
              </div>
            </div>
          </div>

          {sections.map(sec => (
            <div key={sec}>
              <div className="sidebar-section">{sec}</div>
              {NAV.filter(n => n.section === sec).map(n => (
                <div key={n.key} className={`nav-item ${page === n.key ? "active" : ""}`} onClick={() => setPage(n.key)}>
                  <span className="nav-icon">{n.icon}</span>
                  {n.label}
                  {n.badge && page !== n.key && <span className="nav-badge">{n.badge}</span>}
                  {page === n.key && <span className="nav-dot" />}
                </div>
              ))}
            </div>
          ))}

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">JS</div>
              <div>
                <div className="user-name">Jose Santos</div>
                <div className="user-role">BPLO Administrator</div>
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div>
              <div className="page-title">{PAGE_META[page]?.title}</div>
              <div className="page-subtitle">{PAGE_META[page]?.subtitle}</div>
            </div>
            <div className="topbar-actions">
              <button className="notif-btn"><span>🔔</span><span className="notif-dot" /></button>
              <button className="btn btn-gold btn-sm" onClick={() => setPage("applications")}>+ New Application</button>
            </div>
          </div>

          <div className="page-content">
            {renderPage()}
          </div>
        </main>

        {toastMsg && (
          <div className="toast">
            <span>✅</span> {toastMsg}
          </div>
        )}
      </div>
    </>
  );
}
