import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const APPLICATIONS = [
  { id: "APP-2025-001", business: "Dagupan Bakeshop", owner: "Maria Santos", type: "Food & Beverage", date: "2025-01-10", status: "Pending", address: "123 Perez Blvd", amount: 3200 },
  { id: "APP-2025-002", business: "TechZone Computer Shop", owner: "Juan Dela Cruz", type: "Retail/IT", date: "2025-01-11", status: "Processing", address: "45 AB Fernandez Ave", amount: 5500 },
  { id: "APP-2025-003", business: "Sunrise Pharmacy", owner: "Elena Reyes", type: "Pharmacy", date: "2025-01-12", status: "Approved", address: "78 Herrero St", amount: 8900 },
  { id: "APP-2025-004", business: "Golden Dragon Restaurant", owner: "Carlos Lim", type: "Food & Beverage", date: "2025-01-13", status: "Rejected", address: "10 Galvez St", amount: 12000 },
  { id: "APP-2025-005", business: "Fil-Am Hardware", owner: "Pedro Villanueva", type: "Hardware/Construction", date: "2025-01-14", status: "Pending", address: "99 Burgos St", amount: 4500 },
  { id: "APP-2025-006", business: "Mariposa Beauty Salon", owner: "Luz Garcia", type: "Personal Services", date: "2025-01-14", status: "Processing", address: "33 Zamora Ave", amount: 2800 },
];

const BUSINESSES = [
  { id: "BIZ-001", name: "Dagupan Bakeshop", owner: "Maria Santos", address: "123 Perez Blvd", type: "Food & Beverage", permit: "BP-2024-001", validity: "2025-12-31", renewal: "Current", daysLeft: 355 },
  { id: "BIZ-002", name: "TechZone Computer Shop", owner: "Juan Dela Cruz", address: "45 AB Fernandez Ave", type: "Retail/IT", permit: "BP-2024-002", validity: "2025-03-31", renewal: "Due Soon", daysLeft: 21 },
  { id: "BIZ-003", name: "Sunrise Pharmacy", owner: "Elena Reyes", address: "78 Herrero St", type: "Pharmacy", permit: "BP-2024-003", validity: "2024-12-31", renewal: "Expired", daysLeft: 0 },
  { id: "BIZ-004", name: "Fil-Am Hardware", owner: "Pedro Villanueva", address: "99 Burgos St", type: "Hardware", permit: "BP-2024-004", validity: "2025-11-30", renewal: "Current", daysLeft: 324 },
  { id: "BIZ-005", name: "Golden Dragon Restaurant", owner: "Carlos Lim", address: "10 Galvez St", type: "Food & Beverage", permit: "BP-2024-005", validity: "2025-06-30", renewal: "Current", daysLeft: 141 },
];

const PAYMENTS = [
  { id: "PAY-001", biz: "Dagupan Bakeshop", app: "APP-2025-001", amount: 3200, top: "TOP-2025-001", status: "Waiting for Payment", date: null, treasurer: null },
  { id: "PAY-002", biz: "TechZone Computer Shop", app: "APP-2025-002", amount: 5500, top: "TOP-2025-002", status: "Payment Submitted", date: "Jan 13, 2025", treasurer: null },
  { id: "PAY-003", biz: "Sunrise Pharmacy", app: "APP-2025-003", amount: 8900, top: "TOP-2025-003", status: "Payment Verified", date: "Jan 12, 2025", treasurer: "T. Cruz" },
  { id: "PAY-004", biz: "Golden Dragon Restaurant", app: "APP-2025-004", amount: 12000, top: "TOP-2025-004", status: "Waiting for Payment", date: null, treasurer: null },
  { id: "PAY-005", biz: "Fil-Am Hardware", app: "APP-2025-005", amount: 4500, top: "TOP-2025-005", status: "Payment Submitted", date: "Jan 15, 2025", treasurer: null },
];

const ANNOUNCEMENTS = [
  { id: 1, type: "deadline", title: "Business Permit Renewal Deadline", body: "All business establishments are reminded that the renewal deadline is January 31, 2025. Late renewals will incur a 25% surcharge.", date: "Jan 5, 2025", author: "BPLO Admin", pinned: true },
  { id: 2, type: "maintenance", title: "System Maintenance Schedule", body: "The BPLO online portal will be undergoing scheduled maintenance on January 18, 2025 from 10:00 PM to 2:00 AM. Please complete transactions before that time.", date: "Jan 8, 2025", author: "IT Department", pinned: false },
  { id: 3, type: "policy", title: "Updated Zoning Requirements for Food Establishments", body: "Effective February 1, 2025, all food-related businesses must submit updated sanitary inspection certificates alongside their renewal applications.", date: "Jan 10, 2025", author: "BPLO Head", pinned: false },
  { id: 4, type: "deadline", title: "Fire Safety Inspection Schedule", body: "The Bureau of Fire Protection will conduct area-wide fire safety inspections from January 20–25. Ensure all fire exits and extinguishers are accessible.", date: "Jan 12, 2025", author: "BFP Liaison", pinned: true },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const APP_COUNTS = [24, 31, 28, 35, 40, 38, 33, 29, 27, 32, 45, 52];
const REVENUE = [48000, 62000, 55000, 71000, 80000, 76000, 66000, 59000, 54000, 64000, 90000, 104000];

const PERMIT_DATA = {
  "BP-2025-001": { biz: "Dagupan Bakeshop", owner: "Maria Santos", address: "123 Perez Blvd, Dagupan City", type: "Food & Beverage", issued: "Jan 15, 2025", expires: "Dec 31, 2025", valid: true },
  "BP-2025-002": { biz: "TechZone Computer Shop", owner: "Juan Dela Cruz", address: "45 AB Fernandez Ave, Dagupan City", type: "Retail/IT", issued: "Jan 14, 2025", expires: "Dec 31, 2025", valid: true },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

export function StatusBadge({ status }) {
  const map = {
    "Pending": "badge-pending",
    "Processing": "badge-processing",
    "Approved": "badge-approved",
    "Rejected": "badge-rejected",
    "Payment Verified": "badge-approved",
    "Payment Submitted": "badge-processing",
    "Waiting for Payment": "badge-pending",
    "Current": "badge-approved",
    "Due Soon": "badge-pending",
    "Expired": "badge-expired",
  };
  return <span className={`badge ${map[status] || "badge-pending"}`}>{status}</span>;
}

export function MiniChart({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="chart-bar-wrap">
      {data.map((v, i) => (
        <div key={i} className="chart-bar-col">
          <div className={`chart-bar ${color || ""}`} style={{ height: `${(v / max) * 100}%` }} title={v} />
          <span className="chart-label">{MONTHS[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

export function Dashboard({ setPage, treasurerMode }) {
  if (treasurerMode) {
    return (
      <div>
        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { label: "Total Collected", value: "₱104K", change: "+15% vs last month", dir: "up", icon: "💰", color: "gold" },
            { label: "Pending Verification", value: "₱12.5K", change: "+2 applications", dir: "up", icon: "⏳", color: "red" },
            { label: "Verified Payments", value: "38", change: "+8% vs last month", dir: "up", icon: "✅", color: "green" },
          ].map(s => (
            <div key={s.label} className={`stat-card ${s.color}`}>
              <div className={`stat-icon ${s.color}`}>{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.dir}`}>{s.dir === "up" ? "▲" : "▼"} {s.change}</div>
            </div>
          ))}
        </div>

        <div className="grid-2" style={{ marginBottom: 16 }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Revenue Trend</span>
              <span style={{ fontSize: 12, color: "var(--gray-400)" }}>2025</span>
            </div>
            <div className="card-body"><MiniChart data={REVENUE} color="gold" /></div>
          </div>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Payment Status</span>
            </div>
            <div className="card-body">
              <div className="payment-row">
                <div>Waiting for Payment</div>
                <div className="payment-amount">₱18.2K</div>
              </div>
              <div className="payment-row">
                <div>Submitted</div>
                <div className="payment-amount">₱12.5K</div>
              </div>
              <div className="payment-row">
                <div>Verified</div>
                <div className="payment-amount">₱73.3K</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="stats-grid">
        {[
          { label: "Total Applications", value: "52", change: "+12% vs last month", dir: "up", icon: "📋", color: "gold" },
          { label: "Permits Issued", value: "38", change: "+8% vs last month", dir: "up", icon: "📄", color: "teal" },
          { label: "Revenue Collected", value: "₱104K", change: "+15% vs last month", dir: "up", icon: "💰", color: "green" },
          { label: "Pending Reviews", value: "14", change: "-3 from yesterday", dir: "down", icon: "⏳", color: "red" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.dir}`}>{s.dir === "up" ? "▲" : "▼"} {s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Monthly Applications</span>
            <span style={{ fontSize: 12, color: "var(--gray-400)" }}>2025</span>
          </div>
          <div className="card-body"><MiniChart data={APP_COUNTS} /></div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Revenue Summary (₱)</span>
            <span style={{ fontSize: 12, color: "var(--gray-400)" }}>2025</span>
          </div>
          <div className="card-body"><MiniChart data={REVENUE} color="gold" /></div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Applications</span>
          <button className="btn btn-outline btn-sm" onClick={() => setPage("applications")}>View All</button>
        </div>
        <table>
          <thead><tr><th>App ID</th><th>Business</th><th>Owner</th><th>Type</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {APPLICATIONS.slice(0, 5).map(a => (
              <tr key={a.id}>
                <td><strong>{a.id}</strong></td>
                <td>{a.business}</td>
                <td>{a.owner}</td>
                <td>{a.type}</td>
                <td>{a.date}</td>
                <td><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Applications({ toast }) {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [apps, setApps] = useState(APPLICATIONS);

  const filtered = apps.filter(a =>
    (filter === "All" || a.status === filter) &&
    (a.business.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id, status) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    toast(`Application ${id} marked as ${status}`);
    setSelected(null);
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input type="search" placeholder="Search application ID or business name..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["All", "Pending", "Processing", "Approved", "Rejected"].map(s => (
          <button key={s} className={`btn ${filter === s ? "btn-primary" : "btn-outline"} btn-sm`} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="card">
        <table>
          <thead><tr><th>App ID</th><th>Business Name</th><th>Owner</th><th>Type</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} onClick={() => setSelected(a)}>
                <td><strong>{a.id}</strong></td>
                <td>{a.business}</td>
                <td>{a.owner}</td>
                <td>{a.type}</td>
                <td>{a.date}</td>
                <td>₱{a.amount.toLocaleString()}</td>
                <td><StatusBadge status={a.status} /></td>
                <td onClick={e => e.stopPropagation()}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-success btn-sm" onClick={() => updateStatus(a.id, "Approved")}>✓</button>
                    <button className="btn btn-danger btn-sm" onClick={() => updateStatus(a.id, "Rejected")}>✗</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Application Details — {selected.id}</span>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row" style={{ marginBottom: 16 }}>
                <div className="permit-field"><div className="permit-field-label">Business Name</div><div className="permit-field-value">{selected.business}</div></div>
                <div className="permit-field"><div className="permit-field-label">Owner</div><div className="permit-field-value">{selected.owner}</div></div>
                <div className="permit-field"><div className="permit-field-label">Business Type</div><div className="permit-field-value">{selected.type}</div></div>
                <div className="permit-field"><div className="permit-field-label">Address</div><div className="permit-field-value">{selected.address}</div></div>
                <div className="permit-field"><div className="permit-field-label">Date Filed</div><div className="permit-field-value">{selected.date}</div></div>
                <div className="permit-field"><div className="permit-field-label">Amount</div><div className="permit-field-value">₱{selected.amount.toLocaleString()}</div></div>
              </div>
              <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Current Status</div>
              <StatusBadge status={selected.status} />
              <div className="section-divider" />
              <div style={{ marginBottom: 12, fontWeight: 600, fontSize: 13 }}>Approval Timeline</div>
              <ul className="timeline">
                {[
                  { label: "Application Submitted", time: selected.date, state: "done" },
                  { label: "Document Review", time: "In progress", state: selected.status === "Pending" ? "active" : "done" },
                  { label: "Endorsement to Offices", time: "Awaiting", state: ["Approved", "Processing"].includes(selected.status) ? "done" : "waiting" },
                  { label: "Payment Verification", time: "Awaiting", state: selected.status === "Approved" ? "done" : "waiting" },
                  { label: "Permit Issuance", time: "Awaiting", state: selected.status === "Approved" ? "done" : "waiting" },
                ].map((t, i) => (
                  <li key={i} className="timeline-item">
                    <div className={`timeline-dot ${t.state}`}>{t.state === "done" ? "✓" : t.state === "active" ? "●" : "○"}</div>
                    <div className="timeline-info">
                      <div className="timeline-title">{t.label}</div>
                      <div className="timeline-time">{t.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-danger" onClick={() => updateStatus(selected.id, "Rejected")}>Reject</button>
              <button className="btn btn-gold" onClick={() => updateStatus(selected.id, "Approved")}>Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Endorsements({ toast, endorsementMode }) {
  const [appId, setAppId] = useState("APP-2025-002");
  const [offices, setOffices] = useState({ sanitary: false, bfp: false, obo: false });
  const [sent, setSent] = useState({ sanitary: "Approved", bfp: "Processing", obo: "Pending" });

  const toggleOffice = (key) => setOffices(prev => ({ ...prev, [key]: !prev[key] }));

  const sendEndorsements = () => {
    const selected = Object.entries(offices).filter(([, v]) => v).map(([k]) => k);
    if (!selected.length) return toast("Please select at least one office");
    toast(`Endorsements sent to ${selected.length} office(s)`);
    setOffices({ sanitary: false, bfp: false, obo: false });
  };

  const officeList = [
    { key: "sanitary", name: "Sanitary Office", icon: "🏥" },
    { key: "bfp", name: "Bureau of Fire Protection", icon: "🔥" },
    { key: "obo", name: "Office of the Building Official", icon: "🏗️" },
  ];

  if (endorsementMode) {
    return (
      <div className="card">
        <div className="card-header"><span className="card-title">Endorsement Review Queue</span></div>
        <table>
          <thead><tr><th>App ID</th><th>Business</th><th>Office</th><th>Sent Date</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {[
              { app: "APP-2025-001", biz: "Dagupan Bakeshop", office: "Sanitary Office", date: "Jan 10, 2025", status: "Pending" },
              { app: "APP-2025-002", biz: "TechZone Computer Shop", office: "Fire Safety", date: "Jan 11, 2025", status: "Reviewing" },
              { app: "APP-2025-003", biz: "Sunrise Pharmacy", office: "Building Official", date: "Jan 12, 2025", status: "Approved" },
              { app: "APP-2025-005", biz: "Fil-Am Hardware", office: "Sanitary Office", date: "Jan 14, 2025", status: "Pending" },
            ].map(item => (
              <tr key={`${item.app}-${item.office}`}>
                <td><strong>{item.app}</strong></td>
                <td>{item.biz}</td>
                <td>{item.office}</td>
                <td>{item.date}</td>
                <td><StatusBadge status={item.status === "Reviewing" ? "Processing" : item.status} /></td>
                <td>
                  {item.status === "Pending" && (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-success btn-sm" onClick={() => toast("Endorsement approved")}>✓</button>
                      <button className="btn btn-danger btn-sm" onClick={() => toast("Endorsement rejected")}>✗</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid-2">
      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header"><span className="card-title">Forward Application</span></div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Application ID</label>
              <input type="text" value={appId} onChange={e => setAppId(e.target.value)} style={{ paddingLeft: 12 }} placeholder="Enter APP ID..." />
            </div>
            <div className="form-group">
              <label className="form-label">Select Offices to Endorse</label>
              <div className="checkbox-group">
                {officeList.map(o => (
                  <div key={o.key} className={`checkbox-item ${offices[o.key] ? "checked" : ""}`} onClick={() => toggleOffice(o.key)}>
                    <div className="check-box">{offices[o.key] ? "✓" : ""}</div>
                    <span style={{ fontSize: 18 }}>{o.icon}</span>
                    {o.name}
                  </div>
                ))}
              </div>
            </div>
            <button className="btn btn-gold" style={{ width: "100%" }} onClick={sendEndorsements}>
              📤 Send Endorsements
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Approval Status Tracker</span></div>
        <div className="card-body">
          <div style={{ marginBottom: 14, fontSize: 13, color: "var(--gray-400)" }}>Tracking: <strong style={{ color: "var(--navy)" }}>APP-2025-002 — TechZone Computer Shop</strong></div>
          <div className="endorsement-status">
            {officeList.map(o => (
              <div key={o.key} className="endorse-office">
                <div className="endorse-office-info">
                  <div className="office-icon">{o.icon}</div>
                  <div>
                    <div className="office-name">{o.name}</div>
                    <div className="office-sent">Sent: Jan 12, 2025</div>
                  </div>
                </div>
                <StatusBadge status={sent[o.key]} />
              </div>
            ))}
          </div>
          <div className="section-divider" />
          <div style={{ fontSize: 12.5, color: "var(--gray-400)", textAlign: "center" }}>
            2 of 3 offices approved · Overall: <strong style={{ color: "var(--gold)" }}>Processing</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PermitProcessing({ toast }) {
  const [showPermit, setShowPermit] = useState(false);
  const [permitNum] = useState("BP-2025-" + String(Math.floor(Math.random() * 900) + 100));

  return (
    <div className="grid-2">
      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header"><span className="card-title">Generate Business Permit</span></div>
          <div className="card-body">
            {[
              ["Application Reference", "APP-2025-003"],
              ["Business Name", "Sunrise Pharmacy"],
              ["Owner", "Elena Reyes"],
              ["Business Type", "Pharmacy"],
              ["Address", "78 Herrero St, Dagupan City"],
              ["Validity", "January 1 – December 31, 2025"],
            ].map(([label, val]) => (
              <div key={label} className="form-group">
                <label className="form-label">{label}</label>
                <input type="text" defaultValue={val} style={{ paddingLeft: 12 }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-outline" style={{ flex: 1 }}>Save Draft</button>
              <button className="btn btn-gold" style={{ flex: 1 }} onClick={() => { setShowPermit(true); toast("Permit generated! ✅"); }}>
                Generate Permit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {showPermit ? (
          <div className="card">
            <div className="card-header">
              <span className="card-title">Permit Preview</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-outline btn-sm" onClick={() => toast("Permit PDF downloaded!")}>⬇ Download PDF</button>
                <button className="btn btn-gold btn-sm" onClick={() => toast("Permit issued & record saved!")}>Issue Permit</button>
              </div>
            </div>
            <div className="card-body">
              <div className="permit-preview">
                <div className="permit-watermark">OFFICIAL</div>
                <div className="permit-header-band">
                  <span style={{ fontSize: 22 }}>🏛️</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>CITY OF DAGUPAN</div>
                    <div style={{ fontSize: 11, opacity: 0.7 }}>Business Permits and Licensing Office</div>
                  </div>
                </div>
                <div className="permit-body-title">BUSINESS PERMIT</div>
                <div className="permit-subtitle">This certifies that the following business is hereby licensed</div>
                <div style={{ fontSize: 20, fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--navy)", padding: "12px 0" }}>
                  Sunrise Pharmacy
                </div>
                <div className="permit-fields">
                  {[
                    ["Permit No.", permitNum],
                    ["Owner", "Elena Reyes"],
                    ["Business Type", "Pharmacy"],
                    ["Address", "78 Herrero St"],
                    ["Date Issued", "Jan 15, 2025"],
                    ["Expires", "Dec 31, 2025"],
                  ].map(([l, v]) => (
                    <div key={l} className="permit-field">
                      <div className="permit-field-label">{l}</div>
                      <div className="permit-field-value">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="qr-placeholder">📷</div>
                <div style={{ fontSize: 11, color: "var(--gray-400)" }}>Scan QR Code to verify permit authenticity</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body" style={{ textAlign: "center", padding: "60px 24px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>No Permit Generated Yet</div>
              <div style={{ fontSize: 13, color: "var(--gray-400)" }}>Fill in the form and click "Generate Permit" to preview</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PaymentMonitoring({ toast }) {
  const [payments, setPayments] = useState(PAYMENTS);

  const verify = (id) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: "Payment Verified", treasurer: "T. Cruz" } : p));
    toast("Payment verified by Treasurer");
  };

  return (
    <div>
      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        {[
          { label: "Waiting for Payment", count: payments.filter(p => p.status === "Waiting for Payment").length, icon: "⏳", color: "gold" },
          { label: "Payment Submitted", count: payments.filter(p => p.status === "Payment Submitted").length, icon: "📬", color: "teal" },
          { label: "Payment Verified", count: payments.filter(p => p.status === "Payment Verified").length, icon: "✅", color: "green" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.count}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <table>
          <thead><tr><th>Payment ID</th><th>Business</th><th>TOP No.</th><th>Amount</th><th>Payment Date</th><th>Verified By</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td><strong>{p.id}</strong></td>
                <td>{p.biz}</td>
                <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.top}</td>
                <td style={{ fontWeight: 600 }}>₱{p.amount.toLocaleString()}</td>
                <td>{p.date || <span style={{ color: "var(--gray-400)" }}>—</span>}</td>
                <td>{p.treasurer || <span style={{ color: "var(--gray-400)" }}>—</span>}</td>
                <td><StatusBadge status={p.status} /></td>
                <td>
                  {p.status === "Payment Submitted" && (
                    <button className="btn btn-success btn-sm" onClick={() => verify(p.id)}>Verify</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BusinessRecords({ toast }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = BUSINESSES.filter(b =>
    (filter === "All" || b.renewal === filter) &&
    (b.name.toLowerCase().includes(search.toLowerCase()) || b.owner.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input type="search" placeholder="Search business name or owner..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["All", "Current", "Due Soon", "Expired"].map(s => (
          <button key={s} className={`btn ${filter === s ? "btn-primary" : "btn-outline"} btn-sm`} onClick={() => setFilter(s)}>{s}</button>
        ))}
        <button className="btn btn-outline btn-sm" onClick={() => toast("Report exported to Excel")}>⬇ Export</button>
      </div>

      <div className="card">
        <table>
          <thead><tr><th>Permit No.</th><th>Business Name</th><th>Owner</th><th>Address</th><th>Type</th><th>Validity</th><th>Days Left</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} onClick={() => setSelected(b)}>
                <td><strong style={{ fontFamily: "monospace", fontSize: 12 }}>{b.permit}</strong></td>
                <td><strong>{b.name}</strong></td>
                <td>{b.owner}</td>
                <td>{b.address}</td>
                <td>{b.type}</td>
                <td>{b.validity}</td>
                <td>
                  <div>{b.daysLeft > 0 ? `${b.daysLeft} days` : "Expired"}</div>
                  <div className="expiry-bar">
                    <div className="expiry-fill" style={{
                      width: `${Math.min(100, (b.daysLeft / 365) * 100)}%`,
                      background: b.daysLeft > 60 ? "var(--green)" : b.daysLeft > 0 ? "var(--gold)" : "var(--red)"
                    }} />
                  </div>
                </td>
                <td><StatusBadge status={b.renewal} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Business Record — {selected.name}</span>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="permit-fields">
                {[["Business Name", selected.name], ["Owner", selected.owner], ["Address", selected.address], ["Type", selected.type], ["Permit No.", selected.permit], ["Validity", selected.validity]].map(([l, v]) => (
                  <div key={l} className="permit-field"><div className="permit-field-label">{l}</div><div className="permit-field-value">{v}</div></div>
                ))}
              </div>
              <div className="section-divider" />
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Permit History</div>
              {["2023", "2024", "2025"].map(y => (
                <div key={y} className="payment-row">
                  <div>
                    <div className="payment-biz">Permit Year {y}</div>
                    <div style={{ fontSize: 12, color: "var(--gray-400)" }}>Issued Jan 15, {y}</div>
                  </div>
                  <StatusBadge status={y === "2025" ? "Approved" : "Approved"} />
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-gold" onClick={() => { toast("Renewal initiated"); setSelected(null); }}>Initiate Renewal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Reports({ toast }) {
  const [reportType, setReportType] = useState("monthly");

  return (
    <div>
      <div className="tabs">
        {[["daily", "📅 Daily"], ["monthly", "📆 Monthly"], ["permits", "📄 Permits"], ["revenue", "💰 Revenue"]].map(([k, l]) => (
          <div key={k} className={`tab ${reportType === k ? "active" : ""}`} onClick={() => setReportType(k)}>{l}</div>
        ))}
      </div>

      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { label: "Applications Today", value: "7", icon: "📋", color: "gold" },
          { label: "Permits This Month", value: "52", icon: "📄", color: "teal" },
          { label: "Total Issued (YTD)", value: "428", icon: "🗂️", color: "green" },
          { label: "Revenue (YTD)", value: "₱729K", icon: "💵", color: "red" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <span className="card-title">Monthly Business Registrations — 2025</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-outline btn-sm" onClick={() => toast("Report exported as PDF")}>⬇ PDF</button>
            <button className="btn btn-outline btn-sm" onClick={() => toast("Report exported as Excel")}>⬇ Excel</button>
          </div>
        </div>
        <div className="card-body">
          <MiniChart data={APP_COUNTS} />
          <div className="section-divider" />
          <table>
            <thead><tr><th>Month</th><th>Applications</th><th>Approved</th><th>Rejected</th><th>Revenue</th></tr></thead>
            <tbody>
              {MONTHS.map((m, i) => (
                <tr key={m}>
                  <td>{m} 2025</td>
                  <td>{APP_COUNTS[i]}</td>
                  <td style={{ color: "var(--green)" }}>{Math.round(APP_COUNTS[i] * 0.78)}</td>
                  <td style={{ color: "var(--red)" }}>{Math.round(APP_COUNTS[i] * 0.22)}</td>
                  <td>₱{REVENUE[i].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function Announcements({ toast }) {
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", type: "deadline" });

  const post = () => {
    if (!form.title || !form.body) return toast("Please fill in all fields");
    setAnnouncements(prev => [{ id: Date.now(), ...form, date: "Jan 16, 2025", author: "BPLO Staff", pinned: false }, ...prev]);
    setShowModal(false);
    setForm({ title: "", body: "", type: "deadline" });
    toast("Announcement posted ✅");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button className="btn btn-gold" onClick={() => setShowModal(true)}>+ New Announcement</button>
      </div>

      {announcements.map(a => (
        <div key={a.id} className={`announcement-card ann-type-${a.type}`}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div className="ann-title">{a.pinned ? "📌 " : ""}{a.title}</div>
            <span style={{ fontSize: 11, color: "var(--gray-400)", flexShrink: 0, marginLeft: 12 }}>{a.date}</span>
          </div>
          <div className="ann-body">{a.body}</div>
          <div className="ann-meta">
            <span>👤 {a.author}</span>
            <span style={{ textTransform: "capitalize" }}>🏷 {a.type}</span>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Post Announcement</span>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={{ paddingLeft: 12 }} placeholder="Announcement title..." />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="deadline">📅 Renewal Deadline</option>
                  <option value="maintenance">🛠 System Maintenance</option>
                  <option value="policy">📜 Policy Update</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea rows={5} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} style={{ paddingLeft: 12, width: "100%", resize: "vertical" }} placeholder="Write your announcement here..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-gold" onClick={post}>Post Announcement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PermitVerification({ toast }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const verify = () => {
    if (!input.trim()) return;
    setSearched(true);
    const found = PERMIT_DATA[input.toUpperCase()] || Object.values(PERMIT_DATA).find(p => p.biz.toLowerCase().includes(input.toLowerCase()));
    setResult(found || null);
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto" }}>
      <div className="verify-box">
        <h3>🔎 Permit Verification</h3>
        <p>Enter a permit number, business name, or scan QR code</p>
        <div className="verify-input-wrap">
          <input type="text" placeholder="e.g. BP-2025-001 or Business Name" value={input} onChange={e => { setInput(e.target.value); setSearched(false); setResult(null); }} onKeyDown={e => e.key === "Enter" && verify()} />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "center" }}>
          <button className="btn btn-gold" onClick={verify} style={{ minWidth: 140 }}>Verify Permit</button>
          <button className="btn btn-outline" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }} onClick={() => toast("QR Scanner activated")}>📷 Scan QR</button>
        </div>
      </div>

      {searched && (
        result ? (
          <div className="verify-result">
            <div className="verify-check">✅</div>
            <div className="verify-biz">{result.biz}</div>
            <div className="verify-detail">Owner: {result.owner}</div>
            <div className="verify-detail">Type: {result.type}</div>
            <div className="verify-detail">Address: {result.address}</div>
            <div className="section-divider" style={{ margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 2 }}>Issued</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{result.issued}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "var(--gray-400)", marginBottom: 2 }}>Expires</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "var(--green)" }}>{result.expires}</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}><span className="badge badge-approved">Valid Permit</span></div>
          </div>
        ) : (
          <div className="verify-result invalid">
            <div className="verify-check">❌</div>
            <div className="verify-biz" style={{ color: "var(--red)" }}>Permit Not Found</div>
            <div className="verify-detail">No matching permit found for "{input}". The permit may be invalid, expired, or not yet issued.</div>
            <div style={{ marginTop: 12 }}><span className="badge badge-rejected">Invalid / Not Found</span></div>
          </div>
        )
      )}

      {!searched && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header"><span className="card-title">Recently Verified</span></div>
          <div className="card-body">
            {[
              { biz: "Sunrise Pharmacy", permit: "BP-2025-003", time: "2 minutes ago" },
              { biz: "Fil-Am Hardware", permit: "BP-2025-004", time: "1 hour ago" },
              { biz: "TechZone Computer Shop", permit: "BP-2025-002", time: "3 hours ago" },
            ].map(v => (
              <div key={v.permit} className="payment-row" style={{ cursor: "pointer" }} onClick={() => { setInput(v.permit); setResult(PERMIT_DATA[v.permit] || null); setSearched(true); }}>
                <div>
                  <div className="payment-biz">{v.biz}</div>
                  <div style={{ fontSize: 12, color: "var(--gray-400)" }}>{v.permit}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--gray-400)" }}>{v.time}</span>
                  <span className="badge badge-approved">Valid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
