import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Building2 } from 'lucide-react';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const navigate = useNavigate ? useNavigate() : null;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Simple demo authentication
    setTimeout(() => {
      setLoading(false);
      // Replace with your real authentication logic
      if (
        form.email === 'admin@example.com' &&
        form.password === 'Admin'
      ) {
        setError('');
        if (navigate) navigate('/');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <Building2 size={28} />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your eBOSS account to manage your business permits.</p>
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
                autoComplete="current-password"
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

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/contact" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing in…' : <>Sign In <LogIn size={18} /></>}
          </button>
        </form>

        <div className="login-divider">
          <span>New to eBOSS?</span>
        </div>

        <div className="login-footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/contact">Contact the BOSS Office</Link> to get started.
          </p>
        </div>
      </div>
    </div>
  );
}
