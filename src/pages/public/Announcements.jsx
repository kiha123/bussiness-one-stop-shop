import { AlertTriangle, Pin } from 'lucide-react';
import './Announcements.css';

const featured = {
  date: 'February 28, 2026',
  title: 'Business Permit Renewal Deadline Extended to March 31, 2026',
  body: 'In response to numerous requests from the business community, the City Government of San Carlos has extended the deadline for business permit renewal to March 31, 2026. All business owners are encouraged to renew their permits before the deadline to avoid penalties and surcharges. Visit the BOSS office or use the eBOSS portal to complete your renewal online.',
};

const announcements = [
  {
    date: 'February 15, 2026',
    title: 'New Online Payment Channels Now Available',
    body: 'Business owners can now pay permit fees via GCash, Maya, and online bank transfer directly through the eBOSS portal.',
  },
  {
    date: 'January 20, 2026',
    title: 'Saturday Office Hours Starting February',
    body: 'The BOSS office will now be open on Saturdays from 8:00 AM to 12:00 PM to accommodate more applicants.',
  },
  {
    date: 'January 10, 2026',
    title: 'Free Business Registration Seminar',
    body: 'Join our free seminar on January 25 at the City Hall Auditorium. Learn about the requirements, processes, and incentives for new businesses.',
  },
  {
    date: 'December 18, 2025',
    title: 'eBOSS Portal Maintenance Notice',
    body: 'The eBOSS portal will undergo scheduled maintenance on December 20, 2025 from 10 PM to 6 AM. Online services will be temporarily unavailable.',
  },
  {
    date: 'December 5, 2025',
    title: 'Updated Fee Schedule for 2026',
    body: 'The updated business permit fee schedule for 2026 has been published. View the new rates on the eBOSS portal or visit the BOSS office.',
  },
  {
    date: 'November 15, 2025',
    title: 'BOSS Office Relocation Completed',
    body: 'The BOSS office has been relocated to the 2nd Floor, City Hall Annex Building. All services are now available at the new location.',
  },
];

export default function Announcements() {
  return (
    <div className="announcements-page">
      <section className="page-banner">
        <div className="banner-container">
          <h1>Announcements</h1>
          <p>
            Stay informed about updates, deadlines, and important notices from
            the BOSS office.
          </p>
        </div>
      </section>

      {/* Deadline Banner */}
      <section className="deadline-banner">
        <div className="section-container deadline-inner">
          <AlertTriangle size={22} />
          <span>
            <strong>Reminder:</strong> The deadline for Business Permit Renewal
            is <strong>March 31, 2026</strong>. Avoid penalties — renew now!
          </span>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          {/* Featured */}
          <div className="featured-announcement">
            <div className="featured-badge">
              <Pin size={14} /> Featured
            </div>
            <span className="ann-date">{featured.date}</span>
            <h2>{featured.title}</h2>
            <p>{featured.body}</p>
          </div>

          {/* Grid */}
          <div className="ann-grid">
            {announcements.map((a) => (
              <article key={a.title} className="ann-card">
                <span className="ann-date">{a.date}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
