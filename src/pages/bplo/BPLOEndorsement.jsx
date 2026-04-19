import { useState } from "react";
import { BPLOStyles } from "../../features/bplo/styles";
import { Endorsements } from "../../features/bplo/pages.jsx";

const NAV = [
  { key: "endorsements", label: "Endorsement Tracking", icon: "📤", badge: 4, section: "OPERATIONS" },
];

const PAGE_META = {
  endorsements: { title: "Endorsement Tracking", subtitle: "Monitor application endorsements from partner offices" },
};

export default function BPLOEndorsement() {
  const [page, setPage] = useState("endorsements");
  const [toastMsg, setToastMsg] = useState(null);

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const sections = [...new Set(NAV.map(n => n.section))];

  const renderPage = () => {
    const props = { toast, setPage };
    switch (page) {
      case "endorsements": return <Endorsements {...props} endorsementMode />;
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
              <div className="brand-icon">🏥</div>
              <div className="brand-text">
                <div className="brand-title">BPLO</div>
                <div className="brand-sub">Endorsement</div>
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
              <div className="user-avatar">RM</div>
              <div>
                <div className="user-name">Robert Martinez</div>
                <div className="user-role">Sanitary Office</div>
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
