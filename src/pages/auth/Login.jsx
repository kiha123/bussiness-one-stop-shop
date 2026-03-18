import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Building2, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import './Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  const navigate = useNavigate();
  const { login, register, user, isAuthenticated, userRole } = useAuth();
  const validAdminRoles = ['Super Admin', 'BPLO Staff', 'Treasurer', 'Endorsing Office'];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (validAdminRoles.includes(userRole)) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, userRole, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        toast.success('Login successful!');
        // Auto-redirect staff to admin dashboard
        setTimeout(() => {
          const email = form.email.toLowerCase();
          // Determine role from email
          let userRoleTemp = 'User';
          if (email === 'admin@boss.com') userRoleTemp = 'Super Admin';
          else if (email === 'staff@bplo.gov.ph') userRoleTemp = 'BPLO Staff';
          else if (email === 'treasurer@payment.gov.ph') userRoleTemp = 'Treasurer';
          else if (email === 'endorsing@sanitary.gov.ph') userRoleTemp = 'Endorsing Office';
          else if (email.includes('admin')) userRoleTemp = 'Super Admin';
          else if (email.includes('bplo') || email.includes('staff')) userRoleTemp = 'BPLO Staff';
          else if (email.includes('treasurer') || email.includes('payment')) userRoleTemp = 'Treasurer';
          else if (email.includes('endorsing') || email.includes('sanitary') || email.includes('fire') || email.includes('building')) userRoleTemp = 'Endorsing Office';
          
          if (validAdminRoles.includes(userRoleTemp)) {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 500);
      } else {
        await register(form.email, form.password);
        toast.success('Registration successful! Check your email to verify.');
        setIsLogin(true);
        setForm({ email: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      toast.error(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Image/Hero */}
        <div className="login-hero">
          <img src="/hero.avif" alt="E-Governance" className="hero-image" />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="login-logo-container">
              <img src={logo} alt="eBOSS Logo" className="hero-logo" />
            </div>
            <h2>Welcome to eBOSS</h2>
            <p>Manage your business permits and applications with ease</p>
            <div className="hero-features">
              <div className="feature">
                <span>✓</span> Quick Application Process
              </div>
              <div className="feature">
                <span>✓</span> Real-time Tracking
              </div>
              <div className="feature">
                <span>✓</span> Secure & Reliable
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="login-form-wrapper">
          <div className="login-card">
            <div className="login-header">
              <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p>
                {isLogin
                  ? 'Sign in to your eBOSS account to manage your business permits.'
                  : 'Register for an account to start your business application.'}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="auth-tabs">
              <button
                className={`auth-tab ${isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(true);
                  setForm({ email: '', password: '', confirmPassword: '' });
                  setError('');
                }}
              >
                Sign In
              </button>
              <button
                className={`auth-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => {
                  setIsLogin(false);
                  setForm({ email: '', password: '', confirmPassword: '' });
                  setError('');
                }}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="login-error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-field">
                <label htmlFor="email">Email Address</label>
                <div className="login-input-wrapper">
                  <Mail size={18} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="password">Password</label>
                <div className="login-input-wrapper">
                  <Lock size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="login-field">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="login-input-wrapper">
                    <Lock size={18} />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirm(!showConfirm)}
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="login-options">
                  <Link to="/contact" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>
              )}

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? (
                  isLogin ? 'Signing in…' : 'Creating account…'
                ) : (
                  <>
                    {isLogin ? (
                      <>
                        Sign In <LogIn size={18} />
                      </>
                    ) : (
                      <>
                        Create Account <LogIn size={18} />
                      </>
                    )}
                  </>
                )}
              </button>
            </form>

            {isLogin && (
              <>
                <div className="login-divider">
                  <span>Need help?</span>
                </div>
                <div className="login-footer">
                  <p>
                    Contact the <Link to="/contact">BOSS Office</Link> for assistance.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
