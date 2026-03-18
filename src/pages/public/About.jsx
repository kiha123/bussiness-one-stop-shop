import {
  Target,
  Eye,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
} from 'lucide-react';
import './About.css';

const benefits = [
  'Apply for permits anytime, anywhere',
  'Track your application in real-time',
  'Reduce processing time significantly',
  'Secure and transparent transactions',
  'Eliminate unnecessary paperwork',
  'Get SMS and email notifications',
];

export default function About() {
  return (
    <div className="about">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-container">
          <h1>About eBOSS</h1>
          <p>
            Learn about San Carlos City's Business One-Stop Shop and how we
            serve the business community.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="section-container about-overview">
          <h2 className="section-title">Business One-Stop Shop</h2>
          <p>
            The Business One-Stop Shop (BOSS) of San Carlos City, Pangasinan is
            a unified facility established under the Ease of Doing Business Act
            (RA 11032). It brings together all government agencies involved in
            business registration and permit processing into a single location,
            streamlining the process for business owners and investors in the
            city.
          </p>
          <p>
            Through <strong>eBOSS</strong>, the city's digital platform,
            applicants can now initiate and complete most steps of the business
            permit application online — reducing visits, cutting processing
            time, and promoting transparency in local government transactions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-alt">
        <div className="section-container mv-grid">
          <div className="mv-card">
            <Target size={36} className="mv-icon" />
            <h3>Our Mission</h3>
            <p>
              To provide a fast, efficient, and transparent business
              registration and permit processing system that supports local
              entrepreneurs and attracts investment in San Carlos City.
            </p>
          </div>
          <div className="mv-card">
            <Eye size={36} className="mv-icon" />
            <h3>Our Vision</h3>
            <p>
              To be a model local government unit in the Philippines for
              business-friendly governance, leveraging technology to deliver
              quality public service.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="section-container">
          <h2 className="section-title">Benefits of Online Application</h2>
          <p className="section-subtitle">
            eBOSS makes business registration convenient, transparent, and
            efficient.
          </p>
          <div className="benefits-grid">
            {benefits.map((b) => (
              <div key={b} className="benefit-item">
                <CheckCircle2 size={20} className="benefit-check" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="section section-alt">
        <div className="section-container office-grid">
          <div className="office-info">
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Office Information
            </h2>
            <ul className="office-list">
              <li>
                <Building2 size={18} />
                <div>
                  <strong>Business Permits &amp; Licensing Office</strong>
                  <br />
                  City Hall, San Carlos City, Pangasinan 2420
                </div>
              </li>
              <li>
                <Clock size={18} />
                <div>
                  <strong>Office Hours</strong>
                  <br />
                  Monday – Friday, 8:00 AM – 5:00 PM
                </div>
              </li>
              <li>
                <Phone size={18} />
                <div>
                  <strong>Phone</strong>
                  <br />
                  (075) 632-0001
                </div>
              </li>
              <li>
                <Mail size={18} />
                <div>
                  <strong>Email</strong>
                  <br />
                  boss@sancarlos.gov.ph
                </div>
              </li>
            </ul>
          </div>

          <div className="office-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.00041594249!2d120.34205417437263!3d15.933370943062153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339144cb38b3e42f%3A0x273f46496a26517b!2sSan%20Carlos%20City%20Business%20One%20Stop%20Shop!5e1!3m2!1sen!2sph!4v1772833004095!5m2!1sen!2sph" 
              width="600" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
