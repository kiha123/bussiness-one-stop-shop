import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

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

  if (!validAdminRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
