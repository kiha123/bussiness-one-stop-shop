import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Search,
  ClipboardList,
  FileCheck,
  Clock,
  Building,
  BarChart3,
  Users,
  Megaphone,
  ChevronRight,
  Zap,
  Shield,
  Heart,
  UserPlus,
  FileSearch,
  Building2,
  Calculator,
  CreditCard,
  QrCode,
} from 'lucide-react';
import './Home.css';

const stats = [
  { icon: <Building size={28} />, value: '3,240+', label: 'Registered Businesses' },
  { icon: <Clock size={28} />, value: '3–5 Days', label: 'Avg. Processing Time' },
  { icon: <BarChart3 size={28} />, value: '1,870', label: 'Online Applications This Year' },
];

const services = [
  {
    icon: <ClipboardList size={32} />,
    title: 'New Business Registration',
    desc: 'Register your new business quickly with our streamlined online process.',
  },
  {
    icon: <FileCheck size={32} />,
    title: 'Business Renewal',
    desc: 'Renew your business permit online without the hassle of long queues.',
  },
  {
    icon: <Search size={32} />,
    title: 'Permit Verification',
    desc: 'Verify the authenticity and status of any business permit.',
  },
  {
    icon: <Users size={32} />,
    title: 'Online Tracking',
    desc: 'Track your application status in real-time from anywhere.',
  },
];

const steps = [
  {
    num: '1',
    icon: <UserPlus size={28} />,
    title: 'Online Application',
    desc: 'Business owner registers, fills out the application form, uploads required documents, and submits the application.',
  },
  {
    num: '2',
    icon: <FileSearch size={28} />,
    title: 'BPLO Review',
    desc: 'BPLO staff reviews application details and validates all submitted documents.',
  },
  {
    num: '3',
    icon: <Building2 size={28} />,
    title: 'Office Endorsement',
    desc: 'Application is forwarded to endorsing offices (Sanitary, BFP, OBO) for compliance inspection and approval.',
  },
  {
    num: '4',
    icon: <Calculator size={28} />,
    title: 'Fee Assessment',
    desc: 'System automatically computes fees and generates Tax Order of Payment.',
  },
  {
    num: '5',
    icon: <CreditCard size={28} />,
    title: 'Payment',
    desc: 'Applicant pays via online or over-the-counter payment options.',
  },
  {
    num: '6',
    icon: <QrCode size={28} />,
    title: 'Permit Release',
    desc: 'System generates official receipt and business permit with QR code verification.',
  },
];

const announcements = [
  {
    date: 'Feb 28, 2026',
    title: 'Business Permit Renewal Deadline Extended',
    summary: 'The deadline for business permit renewal has been extended to March 31, 2026.',
  },
  {
    date: 'Feb 15, 2026',
    title: 'New Online Payment Channels Available',
    summary: 'You can now pay your business permit fees through GCash, Maya, and online bank transfer.',
  },
  {
    date: 'Jan 20, 2026',
    title: 'BOSS Office Schedule Update',
    summary: 'Starting February, the BOSS office will be open on Saturdays from 8 AM to 12 PM.',
  },
];

const whyUs = [
  {
    icon: <Zap size={28} />,
    title: 'Fast & Efficient',
    desc: 'No more long lines. Our digital platform cuts processing time significantly so you can focus on your business.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Secure & Transparent',
    desc: 'Every transaction is tracked and secured. Know exactly where your application stands at all times.',
  },
  {
    icon: <Heart size={28} />,
    title: 'We Actually Care',
    desc: "This isn't just a system — it's our commitment to making business registration accessible and fair for everyone.",
  },
];

export default function Home() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-tags">
            <span>Fast Processing</span>
            <span>Online Application</span>
            <span>Transparent & Fair</span>
          </div>
          <h1>
            Simplifying Business<br />
            <span className="hero-accent">Registration</span> in San Carlos City
          </h1>
          <p className="hero-sub">
            We're modernizing how businesses register and renew permits — making the
            process faster, easier, and fully transparent for every entrepreneur.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary">
              Apply Now <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn btn-outline">
              Track Application <Search size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats" ref={(el) => (sectionRefs.current[0] = el)}>
        <div className="section-container stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon">{s.icon}</div>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Snippet */}
      <section className="section" ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="section-container about-snippet">
          <span className="section-label">Who We Are</span>
          <div className="about-snippet-content">
            <h2>A Government Service<br />Built on <span className="text-accent">Purpose</span></h2>
            <div className="about-snippet-text">
              <p>
                The eBOSS was built on a simple belief: government services should be
                accessible, efficient, and deeply transparent. We're not a massive
                bureaucracy — we're a dedicated team that genuinely cares about
                getting it right.
              </p>
              <p>
                Whether it's a new business registration or a permit renewal, we bring
                the same level of attention and honesty to every transaction.
              </p>
              <Link to="/about" className="btn btn-outline-sm" style={{ marginTop: '1rem' }}>
                Get to Know Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section section-alt" ref={(el) => (sectionRefs.current[2] = el)}>
        <div className="section-container">
          <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Services</span>
          <h2 className="section-title">How We Can Help</h2>
          <p className="section-subtitle">
            From initial application to final permit, we're with you every step of the way.
          </p>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">
                  Learn More <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section" ref={(el) => (sectionRefs.current[3] = el)}>
        <div className="section-container">
          <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Why Us</span>
          <h2 className="section-title">What Makes Us Different</h2>
          <p className="section-subtitle">
            We're not trying to be the biggest — just a government service that genuinely
            cares about doing great work.
          </p>
          <div className="why-grid">
            {whyUs.map((w) => (
              <div key={w.title} className="why-card">
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="section section-alt" ref={(el) => (sectionRefs.current[4] = el)}>
        <div className="section-container">
          <div className="section-header-row">
            <div>
              <span className="section-label">Updates</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Latest Announcements</h2>
              <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
                Stay updated on important notices and deadlines.
              </p>
            </div>
            <Link to="/announcements" className="btn btn-outline-sm">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="announcements-grid">
            {announcements.map((a) => (
              <article key={a.title} className="announcement-card">
                <span className="announcement-date">{a.date}</span>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section" ref={(el) => (sectionRefs.current[5] = el)}>
        <div className="section-container">
          <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From application to permit — here's the complete flow of the system.
          </p>
          <div className="steps-flow">
            {steps.map((s, i) => (
              <div key={s.num} className="step-flow-item">
                <div className="step-flow-card">
                  <div className="step-flow-icon">{s.icon}</div>
                  <span className="step-flow-num">Step {s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="step-flow-connector"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" ref={(el) => (sectionRefs.current[6] = el)}>
        <div className="section-container cta-inner">
          <span className="section-label">Let's Connect</span>
          <h2>Have a Business<br />to Register?</h2>
          <p>
            We'd love to help. Whether you're ready to start or just exploring
            options, let's get you going. No pressure — just a smooth, digital process.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary">
              Get in Touch <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn btn-outline">
              Browse Our Services <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
