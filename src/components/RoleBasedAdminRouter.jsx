import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { BPLOAdmin, BPLOTreasurer, BPLOEndorsement } from '../pages/bplo';

/**
 * RoleBasedAdminRouter
 * Conditionally renders the appropriate dashboard based on user role
 */
export function RoleBasedAdminRouter() {
  const { userRole } = useAuth();

  // Route based on user role
  switch (userRole) {
    case 'BPLO Staff':
      return <BPLOAdmin />;
    case 'Treasurer':
      return <BPLOTreasurer />;
    case 'Endorsing Office':
      return <BPLOEndorsement />;
    case 'Super Admin':
    default:
      return <AdminDashboard />;
  }
}
