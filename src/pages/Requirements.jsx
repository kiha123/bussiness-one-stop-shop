import { CheckSquare, Square } from 'lucide-react';
import './Requirements.css';

const categories = [
  {
    id: 'new',
    title: 'New Business Registration',
    items: [
      { label: 'Barangay Business Clearance', required: true },
      { label: 'DTI Certificate of Business Name Registration (for sole proprietorship)', required: true },
      { label: 'SEC Registration (for corporation/partnership)', required: true },
      { label: 'CDA Registration (for cooperative)', required: false },
      { label: 'Contract of Lease or Land Title (proof of business address)', required: true },
      { label: 'Community Tax Certificate (Cedula)', required: true },
      { label: 'Government-issued ID of the owner/authorized representative', required: true },
      { label: 'Locational Clearance / Zoning Clearance', required: true },
      { label: 'Fire Safety Inspection Certificate (FSIC)', required: true },
      { label: 'Sanitary Permit (for food-related businesses)', required: false },
      { label: 'SSS, PhilHealth, Pag-IBIG employer registration (if with employees)', required: false },
    ],
  },
  {
    id: 'renewal',
    title: 'Business Renewal',
    items: [
      { label: 'Previous year\'s Business Permit (photocopy)', required: true },
      { label: 'Barangay Business Clearance (current year)', required: true },
      { label: 'Community Tax Certificate (Cedula)', required: true },
      { label: 'Fire Safety Inspection Certificate (FSIC)', required: true },
      { label: 'Sanitary Permit (if applicable)', required: false },
      { label: 'Tax clearance or proof of payment of local taxes', required: true },
      { label: 'Audited Financial Statement or ITR', required: true },
      { label: 'Updated DTI/SEC/CDA Registration (if amended)', required: false },
    ],
  },
  {
    id: 'additional',
    title: 'Additional Permits',
    items: [
      { label: 'Environmental Compliance Certificate (for manufacturing)', required: false },
      { label: 'Electrical Permit', required: false },
      { label: 'Mechanical Permit', required: false },
      { label: 'Building Permit (for new construction/renovation)', required: false },
      { label: 'Occupancy Permit', required: false },
      { label: 'Health Certificate (for food handlers)', required: false },
      { label: 'PNP Clearance (for businesses selling firearms, ammunition, etc.)', required: false },
      { label: 'Special Permits (e.g., liquor, tobacco, fireworks)', required: false },
    ],
  },
];

export default function Requirements() {
  return (
    <div className="requirements-page">
      <section className="page-banner">
        <div className="banner-container">
          <h1>Requirements</h1>
          <p>
            Prepare your documents ahead of time. Here's everything you need for
            each type of application.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="req-legend">
            <span className="legend-item">
              <CheckSquare size={16} className="legend-required" /> Required
            </span>
            <span className="legend-item">
              <Square size={16} className="legend-conditional" /> Conditional / If Applicable
            </span>
          </div>

          <div className="req-categories">
            {categories.map((cat) => (
              <div key={cat.id} className="req-category">
                <h2>{cat.title}</h2>
                <ul className="req-list">
                  {cat.items.map((item) => (
                    <li key={item.label} className="req-item">
                      {item.required ? (
                        <CheckSquare size={18} className="req-icon required" />
                      ) : (
                        <Square size={18} className="req-icon conditional" />
                      )}
                      <span>{item.label}</span>
                      {item.required && <span className="req-badge">Required</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
