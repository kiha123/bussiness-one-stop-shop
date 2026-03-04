import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Building2, LogIn } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/requirements', label: 'Requirements' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <Building2 size={28} strokeWidth={2} />
          <div className="navbar-brand-text">
            <span className="brand-title">eBOSS</span>
            <span className="brand-sub">San Carlos City, Pangasinan</span>
          </div>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link nav-login ${isActive ? 'active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <LogIn size={16} /> Sign In
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
