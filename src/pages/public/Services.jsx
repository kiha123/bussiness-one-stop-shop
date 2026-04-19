import { Link } from 'react-router-dom';
import {
  ClipboardList,
  FileCheck,
  ShieldCheck,
  Search,
  Calculator,
  CalendarClock,
  ChevronRight,
} from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <ClipboardList size={36} />,
    title: 'Start Application',
    desc: 'Start your business in San Carlos City. Register online and submit your requirements through our digital platform for faster processing.',
    link: '/services/new-registration',
    action: 'Start Application'
  },
  {
    icon: <ShieldCheck size={36} />,
    title: 'Verify Permit',
    desc: 'Verify the status and validity of a business permit. Useful for compliance checks, partnership due diligence, and public inquiries.',
    link: '/services/verification',
    action: 'Verify Permit'
  },
  {
    icon: <Search size={36} />,
    title: 'Track Application',
    desc: 'Track your application in real-time. Get updates on where your application is in the process and what actions are needed.',
    link: '/services/tracking',
    action: 'Track Application'
  },
  {
    icon: <Calculator size={36} />,
    title: 'Computes Fee',
    desc: 'Estimate your business permit and registration fees before submitting your application. No hidden charges, fully transparent.',
    link: '/services/fee-computation',
    action: 'Compute Fees'
  },
  {
    icon: <CalendarClock size={36} />,
    title: 'Book Appointment',
    desc: 'Schedule an appointment with the BOSS office for document submission, assessment, or consultation. Skip the wait.',
    link: '/services/appointment',
    action: 'Book Appointment'
  },
  {
    icon: <FileCheck size={36} />,
    title: 'Retire Business',
    desc: 'Close or retire your existing business permit. Process your retirement application online and complete the necessary steps without visiting the office.',
    link: '/services/retirement',
    action: 'Retire Now'
  },
];

export default function Services() {
  return (
    <div className="services-page">
      <section className="page-banner">
        <div className="banner-container">
          <h1>Our Services</h1>
          <p>
            Everything you need for business registration and permit processing
            — accessible online.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="services-page-grid">
            {services.map((s) => (
              <div key={s.title} className="sp-card">
                <div className="sp-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to={s.link} className="sp-link">
                  {s.action} <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
