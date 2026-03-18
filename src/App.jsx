import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, AdminRoute, Navbar, Footer } from './components/shared';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Requirements from './pages/public/Requirements';
import Announcements from './pages/public/Announcements';
import Contact from './pages/public/Contact';
import Login from './pages/auth/Login';
import NewRegistration from './pages/public/NewRegistration';
import Retirement from './pages/public/Retirement';
import Tracking from './pages/public/Tracking';
import Verification from './pages/public/Verification';
import FeeComputation from './pages/public/FeeComputation';
import Appointment from './pages/public/Appointment';
import BusinessOperation from './pages/public/BusinessOperation';
import LineOfBusiness from './pages/public/LineOfBusiness';
import Summary from './pages/public/Summary';
import AdminDashboard from './pages/admin/AdminDashboard';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <div className="app-layout">
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      <main className={`main-content ${isAdminPage ? 'admin-main' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/new-registration" element={<ProtectedRoute><NewRegistration /></ProtectedRoute>} />
          <Route path="/BusinessOperation" element={<ProtectedRoute><BusinessOperation /></ProtectedRoute>} />
          <Route path="/LineOfBusiness" element={<ProtectedRoute><LineOfBusiness /></ProtectedRoute>} />
          <Route path="/Summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
          <Route path="/services/retirement" element={<ProtectedRoute><Retirement /></ProtectedRoute>} />
          <Route path="/services/tracking" element={<Tracking />} />
          <Route path="/services/verification" element={<Verification />} />
          <Route path="/services/fee-computation" element={<FeeComputation />} />
          <Route path="/services/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
