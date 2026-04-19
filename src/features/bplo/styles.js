export const BPLOStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy: #0B1C3D;
    --navy-mid: #132347;
    --navy-light: #1E3461;
    --gold: #E8A020;
    --gold-light: #F5B93A;
    --gold-pale: #FFF3DC;
    --teal: #0EA5A0;
    --teal-light: #E6F7F7;
    --red: #E03E3E;
    --red-light: #FEE8E8;
    --green: #1BA672;
    --green-light: #E5F7F0;
    --gray-50: #F8F9FC;
    --gray-100: #EEF1F8;
    --gray-200: #D8DDEA;
    --gray-400: #8A94B0;
    --gray-600: #4A5270;
    --gray-800: #1E2340;
    --white: #FFFFFF;
    --sidebar-w: 260px;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { font-family: var(--font-body); background: var(--gray-50); color: var(--gray-800); }

  .app { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: var(--sidebar-w);
    background: var(--navy);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
    overflow: hidden;
  }
  .sidebar::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(232,160,32,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .sidebar-brand {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .brand-icon {
    width: 38px; height: 38px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(232,160,32,0.35);
  }
  .brand-text { line-height: 1; }
  .brand-title {
    font-family: var(--font-display);
    font-size: 16px; font-weight: 800;
    color: var(--white);
    letter-spacing: 0.5px;
  }
  .brand-sub {
    font-size: 10px; font-weight: 500;
    color: rgba(255,255,255,0.4);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 2px;
  }
  .sidebar-section {
    padding: 16px 12px 4px;
    font-size: 10px;
    font-weight: 600;
    color: rgba(255,255,255,0.25);
    letter-spacing: 1.8px;
    text-transform: uppercase;
  }
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px;
    margin: 2px 8px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    color: rgba(255,255,255,0.55);
    font-size: 13.5px;
    font-weight: 500;
    position: relative;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.85); }
  .nav-item.active {
    background: linear-gradient(135deg, rgba(232,160,32,0.2), rgba(232,160,32,0.08));
    color: var(--gold-light);
    border: 1px solid rgba(232,160,32,0.2);
  }
  .nav-item.active .nav-dot {
    width: 6px; height: 6px;
    background: var(--gold);
    border-radius: 50%;
    position: absolute;
    right: 14px;
    box-shadow: 0 0 8px var(--gold);
  }
  .nav-icon { font-size: 16px; width: 20px; text-align: center; }
  .nav-badge {
    margin-left: auto;
    background: var(--red);
    color: white;
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 20px;
    min-width: 18px;
    text-align: center;
  }
  .sidebar-footer {
    margin-top: auto;
    padding: 16px;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .user-card {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    background: rgba(255,255,255,0.05);
    border-radius: 10px;
  }
  .user-avatar {
    width: 34px; height: 34px;
    background: linear-gradient(135deg, var(--teal), #0BC5BF);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: white;
  }
  .user-name { font-size: 12.5px; font-weight: 600; color: white; }
  .user-role { font-size: 10.5px; color: rgba(255,255,255,0.35); }

  /* MAIN */
  .main { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; }

  .topbar {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    padding: 14px 28px;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 50;
  }
  .page-title {
    font-family: var(--font-display);
    font-size: 20px; font-weight: 700;
    color: var(--navy);
  }
  .page-subtitle { font-size: 12px; color: var(--gray-400); margin-top: 1px; }
  .topbar-actions { display: flex; align-items: center; gap: 10px; }
  .notif-btn {
    width: 38px; height: 38px;
    border: 1px solid var(--gray-200);
    border-radius: 10px; background: white;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 16px; position: relative;
    transition: all 0.2s;
  }
  .notif-btn:hover { background: var(--gray-50); }
  .notif-dot {
    position: absolute; top: 8px; right: 8px;
    width: 7px; height: 7px; background: var(--red);
    border-radius: 50%; border: 1.5px solid white;
  }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    font-family: var(--font-body);
    font-size: 13px; font-weight: 600;
    cursor: pointer; border: none;
    transition: all 0.2s;
  }
  .btn-primary {
    background: var(--navy);
    color: white;
  }
  .btn-primary:hover { background: var(--navy-light); transform: translateY(-1px); }
  .btn-gold {
    background: linear-gradient(135deg, var(--gold), var(--gold-light));
    color: var(--navy);
    box-shadow: 0 4px 12px rgba(232,160,32,0.3);
  }
  .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(232,160,32,0.4); }
  .btn-outline {
    background: white;
    color: var(--gray-600);
    border: 1px solid var(--gray-200);
  }
  .btn-outline:hover { background: var(--gray-50); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-danger { background: var(--red); color: white; }
  .btn-success { background: var(--green); color: white; }
  .btn-teal { background: var(--teal); color: white; }

  .page-content { padding: 24px 28px; flex: 1; }

  /* STAT CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: white;
    border-radius: 14px;
    padding: 20px;
    border: 1px solid var(--gray-200);
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,28,61,0.08); }
  .stat-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }
  .stat-card.gold::after { background: linear-gradient(90deg, var(--gold), var(--gold-light)); }
  .stat-card.teal::after { background: linear-gradient(90deg, var(--teal), #0BC5BF); }
  .stat-card.green::after { background: linear-gradient(90deg, var(--green), #2DD4A0); }
  .stat-card.red::after { background: linear-gradient(90deg, var(--red), #F87171); }
  .stat-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 12px;
  }
  .stat-icon.gold { background: var(--gold-pale); }
  .stat-icon.teal { background: var(--teal-light); }
  .stat-icon.green { background: var(--green-light); }
  .stat-icon.red { background: var(--red-light); }
  .stat-value {
    font-family: var(--font-display);
    font-size: 28px; font-weight: 800;
    color: var(--navy); line-height: 1;
  }
  .stat-label { font-size: 12px; color: var(--gray-400); margin-top: 4px; font-weight: 500; }
  .stat-change {
    font-size: 11px; font-weight: 600; margin-top: 8px;
    display: flex; align-items: center; gap: 4px;
  }
  .stat-change.up { color: var(--green); }
  .stat-change.down { color: var(--red); }

  /* TABLES */
  .card {
    background: white;
    border-radius: 14px;
    border: 1px solid var(--gray-200);
    overflow: hidden;
  }
  .card-header {
    padding: 18px 20px;
    border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; justify-content: space-between;
  }
  .card-title {
    font-family: var(--font-display);
    font-size: 15px; font-weight: 700;
    color: var(--navy);
  }
  .card-body { padding: 20px; }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    padding: 10px 14px;
    background: var(--gray-50);
    font-size: 11px; font-weight: 700;
    color: var(--gray-400);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    text-align: left;
    border-bottom: 1px solid var(--gray-200);
  }
  tbody tr {
    border-bottom: 1px solid var(--gray-100);
    transition: background 0.15s;
    cursor: pointer;
  }
  tbody tr:hover { background: var(--gray-50); }
  tbody tr:last-child { border-bottom: none; }
  td { padding: 12px 14px; font-size: 13px; color: var(--gray-600); }
  td strong { color: var(--gray-800); font-weight: 600; }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px; font-weight: 600;
  }
  .badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; }
  .badge-pending { background: #FFF3DC; color: #B56700; }
  .badge-pending::before { background: var(--gold); }
  .badge-approved { background: var(--green-light); color: #0D7A4F; }
  .badge-approved::before { background: var(--green); }
  .badge-rejected { background: var(--red-light); color: #B02020; }
  .badge-rejected::before { background: var(--red); }
  .badge-processing { background: var(--teal-light); color: #066966; }
  .badge-processing::before { background: var(--teal); }
  .badge-verified { background: #E8F0FE; color: #1A56DB; }
  .badge-verified::before { background: #3B82F6; }
  .badge-expired { background: #F3F4F6; color: #6B7280; }
  .badge-expired::before { background: #9CA3AF; }

  /* SEARCH / FILTER BAR */
  .filter-bar {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .search-wrap {
    position: relative; flex: 1; min-width: 200px;
  }
  .search-icon {
    position: absolute; left: 12px; top: 50%;
    transform: translateY(-50%);
    color: var(--gray-400); font-size: 14px;
  }
  input[type="text"], input[type="search"], select, textarea {
    font-family: var(--font-body);
    padding: 9px 12px 9px 36px;
    border: 1px solid var(--gray-200);
    border-radius: 8px;
    font-size: 13px;
    color: var(--gray-800);
    background: white;
    width: 100%;
    outline: none;
    transition: border-color 0.2s;
  }
  input[type="text"]:focus, input[type="search"]:focus, select:focus, textarea:focus {
    border-color: var(--navy-light);
    box-shadow: 0 0 0 3px rgba(30,52,97,0.08);
  }
  select, textarea { padding-left: 12px; }

  /* GRID LAYOUTS */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(11,28,61,0.5);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex; align-items: center; justify-content: center;
  }
  .modal {
    background: white;
    border-radius: 16px;
    width: 560px; max-width: 95vw;
    max-height: 90vh; overflow-y: auto;
    box-shadow: 0 24px 60px rgba(11,28,61,0.2);
  }
  .modal-header {
    padding: 22px 24px;
    border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; background: white; z-index: 1;
  }
  .modal-title {
    font-family: var(--font-display);
    font-size: 17px; font-weight: 700; color: var(--navy);
  }
  .modal-close {
    width: 32px; height: 32px;
    border-radius: 8px; border: 1px solid var(--gray-200);
    background: white; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--gray-400);
    transition: all 0.2s;
  }
  .modal-close:hover { background: var(--gray-50); }
  .modal-body { padding: 24px; }
  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--gray-100);
    display: flex; gap: 10px; justify-content: flex-end;
  }

  /* FORM */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--gray-600); margin-bottom: 6px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .checkbox-group { display: flex; flex-direction: column; gap: 8px; }
  .checkbox-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    border: 1px solid var(--gray-200);
    border-radius: 8px; cursor: pointer;
    transition: all 0.2s;
    font-size: 13px; color: var(--gray-600);
  }
  .checkbox-item.checked {
    border-color: var(--navy-light);
    background: rgba(30,52,97,0.04);
    color: var(--navy);
  }
  .checkbox-item input { display: none; }
  .check-box {
    width: 18px; height: 18px;
    border: 2px solid var(--gray-200);
    border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    flex-shrink: 0;
  }
  .checkbox-item.checked .check-box {
    background: var(--navy);
    border-color: var(--navy);
    color: white;
  }

  /* TIMELINE */
  .timeline { list-style: none; }
  .timeline-item {
    display: flex; gap: 14px;
    padding-bottom: 20px;
    position: relative;
  }
  .timeline-item::before {
    content: '';
    position: absolute;
    left: 16px; top: 32px;
    bottom: 0; width: 2px;
    background: var(--gray-200);
  }
  .timeline-item:last-child::before { display: none; }
  .timeline-dot {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
    border: 2px solid transparent;
  }
  .timeline-dot.done { background: var(--green-light); border-color: var(--green); }
  .timeline-dot.active { background: var(--gold-pale); border-color: var(--gold); }
  .timeline-dot.waiting { background: var(--gray-100); border-color: var(--gray-200); }
  .timeline-info { flex: 1; }
  .timeline-title { font-size: 13.5px; font-weight: 600; color: var(--gray-800); }
  .timeline-time { font-size: 11.5px; color: var(--gray-400); margin-top: 2px; }

  /* PERMIT */
  .permit-preview {
    border: 3px solid var(--navy);
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    background: white;
    position: relative;
    overflow: hidden;
  }
  .permit-watermark {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 80px; opacity: 0.03;
    font-family: var(--font-display);
    font-weight: 900;
    pointer-events: none;
    transform: rotate(-30deg);
    color: var(--navy);
  }
  .permit-header-band {
    background: var(--navy);
    color: white;
    padding: 12px 20px;
    margin: -28px -28px 20px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .permit-body-title {
    font-family: var(--font-display);
    font-size: 22px; font-weight: 800;
    color: var(--navy); margin-bottom: 4px;
  }
  .permit-subtitle { font-size: 13px; color: var(--gray-400); margin-bottom: 16px; }
  .permit-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left; margin: 16px 0; }
  .permit-field { padding: 8px 12px; background: var(--gray-50); border-radius: 8px; }
  .permit-field-label { font-size: 10px; font-weight: 600; color: var(--gray-400); text-transform: uppercase; letter-spacing: 0.8px; }
  .permit-field-value { font-size: 13px; font-weight: 600; color: var(--navy); margin-top: 2px; }
  .qr-placeholder {
    width: 80px; height: 80px;
    border: 2px solid var(--gray-200);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 30px; margin: 0 auto 8px;
    background: var(--gray-50);
  }

  /* ANNOUNCEMENT */
  .announcement-card {
    border-radius: 12px;
    padding: 16px 18px;
    border-left: 4px solid;
    background: white;
    margin-bottom: 10px;
    border: 1px solid var(--gray-200);
    border-left: 4px solid var(--gold);
    transition: box-shadow 0.2s;
  }
  .announcement-card:hover { box-shadow: 0 4px 16px rgba(11,28,61,0.07); }
  .ann-title { font-size: 14px; font-weight: 600; color: var(--navy); }
  .ann-body { font-size: 13px; color: var(--gray-600); margin-top: 4px; line-height: 1.5; }
  .ann-meta { font-size: 11px; color: var(--gray-400); margin-top: 8px; display: flex; gap: 12px; }
  .ann-type-maintenance { border-left-color: var(--teal); }
  .ann-type-policy { border-left-color: #8B5CF6; }
  .ann-type-deadline { border-left-color: var(--red); }

  /* CHARTS (SVG bars) */
  .chart-bar-wrap { display: flex; align-items: flex-end; gap: 6px; height: 80px; margin-top: 8px; }
  .chart-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .chart-bar {
    width: 100%;
    border-radius: 5px 5px 0 0;
    background: linear-gradient(to top, var(--navy), var(--navy-light));
    min-height: 4px;
    transition: opacity 0.2s;
    cursor: pointer;
  }
  .chart-bar:hover { opacity: 0.8; }
  .chart-bar.gold { background: linear-gradient(to top, var(--gold), var(--gold-light)); }
  .chart-label { font-size: 10px; color: var(--gray-400); }

  /* PAYMENT */
  .payment-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0; border-bottom: 1px solid var(--gray-100);
  }
  .payment-row:last-child { border-bottom: none; }
  .payment-biz { font-size: 13.5px; font-weight: 600; color: var(--navy); }
  .payment-amount { font-family: var(--font-display); font-size: 15px; font-weight: 700; color: var(--navy); }

  /* PERMIT VERIFY */
  .verify-box {
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    border-radius: 16px; padding: 28px;
    color: white; text-align: center;
    margin-bottom: 20px;
  }
  .verify-box h3 { font-family: var(--font-display); font-size: 20px; font-weight: 800; margin-bottom: 6px; }
  .verify-box p { font-size: 13px; opacity: 0.6; margin-bottom: 20px; }
  .verify-input-wrap { position: relative; }
  .verify-input-wrap input {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 14px; font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    width: 100%;
  }
  .verify-input-wrap input::placeholder { color: rgba(255,255,255,0.35); letter-spacing: 1px; }
  .verify-result {
    border-radius: 12px; padding: 20px;
    border: 2px solid var(--green);
    background: var(--green-light);
    text-align: center;
  }
  .verify-result.invalid { border-color: var(--red); background: var(--red-light); }
  .verify-check { font-size: 32px; margin-bottom: 8px; }
  .verify-biz { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--navy); }
  .verify-detail { font-size: 12.5px; color: var(--gray-600); margin-top: 4px; }

  /* ENDORSEMENT */
  .endorsement-status {
    display: flex; flex-direction: column; gap: 10px;
  }
  .endorse-office {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px;
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    background: white;
  }
  .endorse-office-info { display: flex; align-items: center; gap: 12px; }
  .office-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; background: var(--gray-100);
  }
  .office-name { font-size: 13.5px; font-weight: 600; color: var(--navy); }
  .office-sent { font-size: 12px; color: var(--gray-400); }

  /* RECORDS */
  .expiry-bar { height: 4px; border-radius: 2px; background: var(--gray-200); margin-top: 4px; }
  .expiry-fill { height: 100%; border-radius: 2px; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--navy);
    color: white;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 13.5px; font-weight: 500;
    box-shadow: 0 8px 24px rgba(11,28,61,0.25);
    z-index: 999;
    display: flex; align-items: center; gap: 10px;
    animation: slideIn 0.3s ease;
    border-left: 4px solid var(--gold);
  }
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Tabs */
  .tabs { display: flex; gap: 4px; margin-bottom: 20px; background: var(--gray-100); padding: 4px; border-radius: 10px; width: fit-content; }
  .tab {
    padding: 8px 16px; border-radius: 8px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: var(--gray-600);
    transition: all 0.2s;
  }
  .tab.active { background: white; color: var(--navy); font-weight: 600; box-shadow: 0 2px 8px rgba(11,28,61,0.08); }

  /* Reports */
  .report-stat { text-align: center; padding: 16px; }
  .report-stat .value { font-family: var(--font-display); font-size: 36px; font-weight: 800; color: var(--navy); }
  .report-stat .label { font-size: 12px; color: var(--gray-400); margin-top: 4px; }

  .section-divider { height: 1px; background: var(--gray-200); margin: 20px 0; }

  /* scrollbar */
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--gray-200); border-radius: 10px; }
`;
