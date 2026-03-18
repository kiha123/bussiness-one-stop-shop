import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User, ChevronDown, BarChart3 } from 'lucide-react';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      setMenuOpen(false);
      setDropdownOpen(false);
    } catch (err) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="eBOSS Logo" className="navbar-logo" />
          <div className="navbar-brand-text">
            <span className="brand-title">Business Permit</span>
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
          {isAuthenticated && user ? (
            <div className="auth-menu">
              <div className="user-dropdown">
                <button 
                  className="user-dropdown-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User size={16} />
                  <span className="user-email">{user.email}</span>
                  <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
                </button>
                
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    {isAdmin && (
                      <NavLink
                        to="/admin/dashboard"
                        className="dropdown-item admin-link"
                        onClick={() => {
                          setDropdownOpen(false);
                          setMenuOpen(false);
                        }}
                      >
                        <BarChart3 size={14} />
                        <span>Admin Dashboard</span>
                      </NavLink>
                    )}
                    <button 
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `nav-link nav-login ${isActive ? 'active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <LogIn size={16} /> Sign In
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
