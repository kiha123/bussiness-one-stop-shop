import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminApplications from '../../components/AdminApplications';
import AdminBusinessPermits from '../../components/AdminBusinessPermits';
import AdminPayments from '../../components/AdminPayments';
import AdminEndorsements from '../../components/AdminEndorsements';
import AdminUsers from '../../components/AdminUsers';
import AdminReports from '../../components/AdminReports';
import AdminAnnouncements from '../../components/AdminAnnouncements';
import AdminSettings from '../../components/AdminSettings';
import {
  BarChart3,
  ClipboardList,
  FileText,
  CreditCard,
  CheckSquare,
  Users,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Leaf,
  DollarSign,
  FileCheck,
  FileSignature,
  List,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock Data
const chartData = [
  { day: 'Tue', total: 45, approved: 38, rejected: 7 },
  { day: 'Wed', total: 52, approved: 44, rejected: 8 },
  { day: 'Thu', total: 48, approved: 41, rejected: 7 },
  { day: 'Fri', total: 61, approved: 52, rejected: 9 },
  { day: 'Sat', total: 55, approved: 47, rejected: 8 },
  { day: 'Sun', total: 67, approved: 57, rejected: 10 },
  { day: 'Mon', total: 72, approved: 61, rejected: 11 },
];

const pieData = [
  { name: 'Approved', value: 85 },
  { name: 'Pending', value: 10 },
  { name: 'Rejected', value: 5 },
];

const recentApplications = [
  { id: 1, name: 'Juan Dela Cruz', business: 'JDC Trading', status: 'approved', date: '2026-04-15' },
  { id: 2, name: 'Maria Santos', business: 'Santos Retail Co.', status: 'pending', date: '2026-04-14' },
  { id: 3, name: 'Carlos Reyes', business: 'Reyes Services', status: 'approved', date: '2026-04-13' },
  { id: 4, name: 'Ana Martinez', business: 'Martinez Imports', status: 'rejected', date: '2026-04-12' },
];

const colors = {
  approved: '#16a34a',
  pending: '#f59e0b',
  rejected: '#ef4444',
  total: '#22c55e',
};

const StatCard = ({ icon: Icon, label, value, trend, trendColor }) => (
  <div className="bg-white rounded-lg border-2 border-green-200 hover:shadow-boss-hover transition-all duration-300 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${trendColor === 'green' ? 'bg-green-100' : trendColor === 'amber' ? 'bg-amber-100' : trendColor === 'red' ? 'bg-red-100' : 'bg-emerald-100'}`}>
          <Icon className={`w-6 h-6 ${trendColor === 'green' ? 'text-green-600' : trendColor === 'amber' ? 'text-amber-600' : trendColor === 'red' ? 'text-red-600' : 'text-emerald-600'}`} />
        </div>
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-2">{label}</h3>
    <div className="flex items-baseline gap-2 mb-3">
      <span className="font-mono text-3xl font-bold text-gray-900">{value}</span>
    </div>
    <div className={`text-xs font-medium ${trendColor === 'green' ? 'text-green-600' : trendColor === 'amber' ? 'text-amber-600' : trendColor === 'red' ? 'text-red-600' : 'text-gray-600'}`}>
      {trend}
    </div>
  </div>
);

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, onSignOut }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'applications', label: 'Applications', icon: ClipboardList },
    { id: 'permits', label: 'Business Permits', icon: FileText },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'endorsements', label: 'Endorsements', icon: CheckSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[220px] bg-white border-r-2 border-green-200 flex flex-col transition-transform duration-300 z-50 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-green-200 flex items-center gap-2">
          <div className="p-2 bg-green-600 rounded-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-900">eBOSS Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map(({ id, label, icon: NavIcon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-200 border-2 ${
                  activeTab === id
                    ? 'bg-green-50 text-green-600 border-gray-900 shadow-sm'
                    : 'text-gray-500 border-transparent hover:text-gray-900 hover:bg-green-50 hover:border-green-200'
                }`}
              >
                <NavIcon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Sign Out */}
        <div className="px-3 py-4 border-t border-green-200">
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 left-6 lg:hidden z-30 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );
};

const tabLabels = {
  dashboard: 'Dashboard',
  applications: 'Applications',
  permits: 'Business Permits',
  payments: 'Payments',
  endorsements: 'Endorsements',
  users: 'Users',
  reports: 'Reports',
  announcements: 'Announcements',
  settings: 'Settings',
};

const Topbar = ({ userRole, activeTab }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-green-200 h-16 lg:pl-[220px] z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left */}
        <div className="hidden lg:block">
          <h2 className="text-2xl font-bold text-gray-900">{tabLabels[activeTab] || 'Admin Dashboard'}</h2>
          <p className="text-xs text-gray-500">Logged in as: {userRole}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notification */}
          <button className="relative p-2 hover:bg-green-50 rounded-lg transition-all">
            <Bell className="w-5 h-5 text-gray-500" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-600 rounded-full" />
          </button>

          {/* Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-green-50 rounded-lg transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                SA
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-200 py-2">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-green-50 transition-all">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-green-50 transition-all">
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentApplicationsTable = () => (
  <div className="bg-white rounded-lg border-2 border-green-200 p-6">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Applications</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-green-200">
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-500">Name</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-500">Business</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-500">Status</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-500">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentApplications.map((app) => (
            <tr key={app.id} className="border-b border-green-200 hover:bg-green-50 transition-all">
              <td className="py-3 px-4 font-medium text-sm text-gray-900">{app.name}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{app.business}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : app.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {app.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {app.status === 'pending' && <AlertCircle className="w-3.5 h-3.5" />}
                  {app.status === 'rejected' && <XCircle className="w-3.5 h-3.5" />}
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-boss-text-muted">{app.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="mt-4 px-4 py-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-all">
      View All →
    </button>
  </div>
);

const MiniStatTile = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-lg border-2 border-green-200 p-4 hover:shadow-boss-hover transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    </div>
    <h4 className="text-xs font-medium text-gray-500 mb-1">{label}</h4>
    <p className="font-mono text-xl font-bold text-gray-900">{value}</p>
  </div>
);

const renderAdminTab = (activeTab) => {
  switch (activeTab) {
    case 'applications':
      return <AdminApplications />;
    case 'permits':
      return <AdminBusinessPermits />;
    case 'payments':
      return <AdminPayments />;
    case 'endorsements':
      return <AdminEndorsements />;
    case 'users':
      return <AdminUsers />;
    case 'reports':
      return <AdminReports />;
    case 'announcements':
      return <AdminAnnouncements />;
    case 'settings':
      return <AdminSettings />;
    default:
      return null;
  }
};

export default function AdminDashboard() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500">You do not have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSignOut={handleSignOut}
      />

      {/* Topbar */}
      <Topbar userRole={userRole} activeTab={activeTab} />

      {/* Main Content */}
      <main className="lg:pl-[220px] pt-16">
        {activeTab === 'dashboard' && (
          <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-500">Welcome back! Here's your business permit platform overview.</p>
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={ClipboardList}
                label="Total Applications"
                value="342"
                trend="↑ 10% from last week"
                trendColor="green"
              />
              <StatCard
                icon={AlertCircle}
                label="Pending Review"
                value="3"
                trend="3 need attention"
                trendColor="amber"
              />
              <StatCard
                icon={CheckCircle2}
                label="Approved"
                value="291"
                trend="Approval rate: 85%"
                trendColor="green"
              />
              <StatCard
                icon={XCircle}
                label="Rejected"
                value="48"
                trend="+2 this week"
                trendColor="red"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Line Chart */}
              <div className="lg:col-span-2 bg-white rounded-lg border-2 border-green-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Applications Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '2px solid #bbf7d0',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke={colors.total}
                      strokeWidth={2}
                      dot={{ fill: colors.total, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Total"
                    />
                    <Line
                      type="monotone"
                      dataKey="approved"
                      stroke={colors.approved}
                      strokeWidth={2}
                      dot={{ fill: colors.approved, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Approved"
                    />
                    <Line
                      type="monotone"
                      dataKey="rejected"
                      stroke={colors.rejected}
                      strokeWidth={2}
                      dot={{ fill: colors.rejected, r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Rejected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-lg border-2 border-green-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Applications</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      <Cell fill={colors.approved} />
                      <Cell fill={colors.pending} />
                      <Cell fill={colors.rejected} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {pieData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: [colors.approved, colors.pending, colors.rejected][idx] }}
                        />
                        <span className="text-gray-500">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Applications & Mini Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentApplicationsTable />
              </div>

              {/* Mini Stats */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pending Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <MiniStatTile icon={DollarSign} label="For Payment" value="12" color="bg-green-600" />
                  <MiniStatTile icon={FileCheck} label="For Compliance" value="8" color="bg-amber-500" />
                  <MiniStatTile icon={FileSignature} label="For Endorsement" value="5" color="bg-green-700" />
                  <MiniStatTile icon={List} label="Today's Apps" value="24" color="bg-green-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && <div className="p-6 lg:p-8">{renderAdminTab(activeTab)}</div>}
      </main>
    </div>
  );
}
