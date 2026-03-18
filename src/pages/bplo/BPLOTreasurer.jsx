import { useState } from "react";
import { BPLOStyles } from "../../modules/bplo/styles";
import { Dashboard, PaymentMonitoring, Reports } from "../../modules/bplo/pages";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "💼", section: "OVERVIEW" },
  { key: "payments", label: "Payment Monitoring", icon: "💰", badge: 2, section: "PAYMENTS" },
  { key: "reports", label: "Finance Reports", icon: "📊", section: "REPORTS" },
];

const PAGE_META = {
  dashboard: { title: "Treasurer Dashboard", subtitle: "Payment tracking and financial overview" },
  payments: { title: "Payment Monitoring", subtitle: "Track and verify payment transactions" },
  reports: { title: "Finance Reports", subtitle: "Revenue and payment analytics" },
};

export default function BPLOTreasurer() {
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
      case "dashboard": return <Dashboard {...props} treasurerMode />;
      case "payments": return <PaymentMonitoring {...props} />;
      case "reports": return <Reports {...props} />;
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
              <div className="brand-icon">💼</div>
              <div className="brand-text">
                <div className="brand-title">BPLO</div>
                <div className="brand-sub">Treasurer</div>
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
              <div className="user-avatar">TC</div>
              <div>
                <div className="user-name">Theresa Cruz</div>
                <div className="user-role">City Treasurer</div>
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
