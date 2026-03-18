import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-section">
            <div className="footer-brand">
              <Building2 size={32} />
              <div>
                <h3>eBOSS</h3>
                <p>San Carlos City, Pangasinan</p>
              </div>
            </div>
            <p className="footer-desc">
              Business One-Stop Shop — Simplifying business registration and
              permit processing for San Carlos City.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <nav className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/requirements">Requirements</Link>
              <Link to="/announcements">Announcements</Link>
              <Link to="/contact">Contact Us</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4>Contact Information</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={16} />
                <span>City Hall, San Carlos City, Pangasinan 2420</span>
              </li>
              <li>
                <Phone size={16} />
                <span>(075) 632-0001</span>
              </li>
              <li>
                <Mail size={16} />
                <span>eboss@sancarlos.gov.ph</span>
              </li>
              <li>
                <Clock size={16} />
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>  
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h4>Office Hours</h4>
            <ul className="footer-hours">
              <li>Monday - Thursday</li>
              <li>8:00 AM - 5:00 PM</li>
              <li className="mt-2">Friday</li>
              <li>8:00 AM - 4:00 PM</li>
              <li className="mt-2" style={{ color: '#ef4444' }}>Closed on Holidays</li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>&copy; 2025 Business Permits and Licensing Office. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
