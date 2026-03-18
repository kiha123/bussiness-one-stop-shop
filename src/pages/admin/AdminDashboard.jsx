import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminStats from '../../components/AdminStats';
import AdminAnalytics from '../../components/AdminAnalytics';
import AdminApplications from '../../components/AdminApplications';
import AdminRenewals from '../../components/AdminRenewals';
import AdminAppointments from '../../components/AdminAppointments';
import AdminBusinessPermits from '../../components/AdminBusinessPermits';
import AdminPayments from '../../components/AdminPayments';
import AdminEndorsements from '../../components/AdminEndorsements';
import AdminUsers from '../../components/AdminUsers';
import AdminReports from '../../components/AdminReports';
import AdminAnnouncements from '../../components/AdminAnnouncements';
import AdminPermitVerification from '../../components/AdminPermitVerification';
import AdminSettings from '../../components/AdminSettings';
import { 
  BarChart3, TrendingUp, ClipboardList, Users, Calendar, LogOut, Menu, X, 
  FileText, CreditCard, CheckSquare, Bell, Search, Settings, BookOpen 
} from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Role-based access control
  const rolePermissions = {
    'Super Admin': ['dashboard', 'applications', 'permits', 'payments', 'endorsements', 'users', 'reports', 'announcements', 'verification', 'settings'],
    'BPLO Staff': ['dashboard', 'applications', 'permits', 'announcements', 'verification', 'renewals'],
    'Treasurer': ['dashboard', 'payments', 'reports'],
    'Endorsing Office': ['dashboard', 'endorsements', 'verification']
  };

  const allowedTabs = rolePermissions[userRole] || [];

  if (!userRole) {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You do not have permission to access the admin dashboard.</p>
      </div>
    );
  }

  // All available navigation items
  const allNavigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Overview & Statistics'
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: ClipboardList,
      description: 'Business Applications'
    },
    {
      id: 'permits',
      label: 'Business Permits',
      icon: FileText,
      description: 'Permit Management'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: CreditCard,
      description: 'Payment Transactions'
    },
    {
      id: 'endorsements',
      label: 'Endorsements',
      icon: CheckSquare,
      description: 'Office Endorsements'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User Management'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: TrendingUp,
      description: 'Analytics & Reports'
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Bell,
      description: 'System Announcements'
    },
    {
      id: 'verification',
      label: 'Permit Verification',
      icon: Search,
      description: 'Verify Permits'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System Configuration'
    }
  ];

  // Filter navigation items based on user role
  const navigationItems = allNavigationItems.filter(item => allowedTabs.includes(item.id));

  // If active tab is not allowed, reset to dashboard
  if (!allowedTabs.includes(activeTab)) {
    setActiveTab('dashboard');
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <BarChart3 size={24} />
            <div>
              <span className="brand-text">eBOSS Admin</span>
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                {userRole}
              </p>
            </div>
          </div>
          <button
            className="sidebar-toggle-mobile"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon size={20} />
                <div className="nav-item-text">
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-desc">{item.description}</span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-header">
          <div className="header-top">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1>Admin Dashboard</h1>
              <p style={{ margin: '0', color: '#64748b', fontSize: '0.9rem' }}>
                Logged in as: <strong>{userRole}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">
          {activeTab === 'dashboard' && <AdminStats />}
          {activeTab === 'applications' && <AdminApplications />}
          {activeTab === 'permits' && <AdminBusinessPermits />}
          {activeTab === 'payments' && <AdminPayments />}
          {activeTab === 'endorsements' && <AdminEndorsements />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'reports' && <AdminReports />}
          {activeTab === 'announcements' && <AdminAnnouncements />}
          {activeTab === 'verification' && <AdminPermitVerification />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
