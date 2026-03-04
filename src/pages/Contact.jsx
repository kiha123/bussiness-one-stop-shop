import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section className="page-banner">
        <div className="banner-container">
          <h1>Contact Us</h1>
          <p>
            Have questions or need assistance? Reach out to the BOSS office.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container contact-grid">
          {/* Form */}
          <div className="contact-form-wrapper">
            <h2>Send Us a Message</h2>
            {submitted ? (
              <div className="form-success">
                <Send size={28} />
                <h3>Message Sent!</h3>
                <p>
                  Thank you for contacting us. We'll respond within 1–2 business
                  days.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Juan Dela Cruz"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="juan@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Business permit inquiry"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info-wrapper">
            <h2>Office Information</h2>
            <ul className="contact-details">
              <li>
                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <strong>Address</strong>
                  <p>City Hall, San Carlos City, Pangasinan 2420</p>
                </div>
              </li>
              <li>
                <div className="contact-detail-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <strong>Phone</strong>
                  <p>(075) 632-0001</p>
                </div>
              </li>
              <li>
                <div className="contact-detail-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <strong>Email</strong>
                  <p>boss@sancarlos.gov.ph</p>
                </div>
              </li>
              <li>
                <div className="contact-detail-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <strong>Office Hours</strong>
                  <p>Monday – Friday</p>
                  <p>8:00 AM – 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
