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
    link: '/new-business',
    action: 'Start Application'
  },
  {
    icon: <FileCheck size={36} />,
    title: 'Renew Now',
    desc: 'Renew your existing business permit online. Avoid long lines and complete most steps from the comfort of your home or office.',
    link: '/renewal',
    action: 'Renew Now'
  },
  {
    icon: <ShieldCheck size={36} />,
    title: 'Verify Permit',
    desc: 'Verify the status and validity of a business permit. Useful for compliance checks, partnership due diligence, and public inquiries.',
    link: '/verification',
    action: 'Verify Permit'
  },
  {
    icon: <Search size={36} />,
    title: 'Track Application',
    desc: 'Track your application in real-time. Get updates on where your application is in the process and what actions are needed.',
    link: '/tracking',
    action: 'Track Application'
  },
  {
    icon: <Calculator size={36} />,
    title: 'Computes Fee',
    desc: 'Estimate your business permit and registration fees before submitting your application. No hidden charges, fully transparent.',
    link: '/fee-computation',
    action: 'Compute Fees'
  },
  {
    icon: <CalendarClock size={36} />,
    title: 'Book Appointment',
    desc: 'Schedule an appointment with the BOSS office for document submission, assessment, or consultation. Skip the wait.',
    link: '/appointment',
    action: 'Book Appointment'
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