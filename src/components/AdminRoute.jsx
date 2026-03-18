import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminRoute({ children }) {
  const { isAuthenticated, isLoading, userRole } = useAuth();

  // Valid admin roles that can access the dashboard
  const validAdminRoles = ['Super Admin', 'BPLO Staff', 'Treasurer', 'Endorsing Office'];

  if (isLoading) {
    return (
      <div className="section-container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth?redirectTo=${window.location.pathname}`} replace />;
  }

  // Check if user has a valid admin role
  if (!validAdminRoles.includes(userRole)) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem', 
        background: '#fee2e2', 
        border: '2px solid #fecaca',
        borderRadius: '8px',
        margin: '2rem'
      }}>
        <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Access Denied</h2>
        <p style={{ color: '#7f1d1d', marginBottom: '1.5rem' }}>
          You do not have permission to access the admin dashboard.
        </p>
        <a href="/" style={{ 
          color: '#dc2626', 
          textDecoration: 'none',
          fontWeight: 600,
          borderBottom: '2px solid #dc2626',
          paddingBottom: '0.25rem'
        }}>
          Return to Home
        </a>
      </div>
    );
  }

  return children;
}
