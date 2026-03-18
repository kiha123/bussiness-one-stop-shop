import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, User, ChevronDown, BarChart3 } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';
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

        <nav className={`navbar-nav ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User size={18} />
                <span>{user?.email || 'User'}</span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <BarChart3 size={16} />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary">
              <LogIn size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
