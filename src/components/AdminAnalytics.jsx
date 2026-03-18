import { useState, useEffect } from "react";

const styles = `
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

function StatusBadge({ status }) {
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

function MiniChart({ data, color }) {
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

function Dashboard({ setPage }) {
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

function Applications({ toast }) {
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

function Endorsements({ toast }) {
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

function PermitProcessing({ toast }) {
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

function PaymentMonitoring({ toast }) {
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

function BusinessRecords({ toast }) {
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

function Reports({ toast }) {
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

function Announcements({ toast }) {
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

function PermitVerification({ toast }) {
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

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

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

export default function AdminAnalytics() {
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
      <style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-badge">
              <div className="brand-icon">🏛️</div>
              <div className="brand-text">
                <div className="brand-title">BPLO</div>
                <div className="brand-sub">Dagupan City</div>
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
                <div className="user-role">BPLO Staff</div>
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
