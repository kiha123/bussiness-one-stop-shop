import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import { getUserRoleFromEmail } from '../../utils';
import './Login.css';

const ADMIN_ROLES = ['Super Admin', 'BPLO Staff', 'Treasurer', 'Endorsing Office'];

function resolvePostAuthRoute(role, redirectTarget) {
  if (redirectTarget) return redirectTarget;
  if (ADMIN_ROLES.includes(role)) return '/admin/dashboard';
  return '/';
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  const navigate = useNavigate();
  const { login, register, signInWithGoogle, user, isAuthenticated, userRole } = useAuth();
  const redirectTarget = searchParams.get('redirectTo');
  const safeRedirectTarget = redirectTarget && redirectTarget.startsWith('/') ? redirectTarget : null;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(resolvePostAuthRoute(userRole, safeRedirectTarget), { replace: true });
    }
  }, [isAuthenticated, user, userRole, navigate, safeRedirectTarget]);

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
        navigate(resolvePostAuthRoute(getUserRoleFromEmail(form.email), safeRedirectTarget), { replace: true });
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

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle(safeRedirectTarget);
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
      toast.error(err.message || 'Google sign-in failed.');
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
                type="button"
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
                type="button"
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

                {isLogin && (
                  <>
                    <div className="login-divider oauth-divider">
                      <span>or continue with</span>
                    </div>

                    <button
                      type="button"
                      className="login-google"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                    >
                      <span className="google-mark" aria-hidden="true">
                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" focusable="false">
                          <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.12 6.05 29.32 4 24 4C12.95 4 4 12.95 4 24s8.95 20 20 20s20-8.95 20-20c0-1.34-.14-2.65-.39-3.92z" />
                          <path fill="#FF3D00" d="M6.31 14.69l6.57 4.82C14.66 15.11 18.96 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.12 6.05 29.32 4 24 4c-7.68 0-14.3 4.34-17.69 10.69z" />
                          <path fill="#4CAF50" d="M24 44c5.21 0 9.93-1.99 13.5-5.23l-6.23-5.27C29.19 35.09 26.72 36 24 36c-5.2 0-9.62-3.32-11.28-7.95l-6.52 5.02C9.55 39.56 16.21 44 24 44z" />
                          <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3c-.79 2.22-2.21 4.17-4.03 5.5l.01-.01l6.23 5.27C37.07 39.05 44 34 44 24c0-1.34-.14-2.65-.39-3.92z" />
                        </svg>
                      </span>
                      <span className="login-google-label">Sign in with Google</span>
                    </button>
                  </>
                )}
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
