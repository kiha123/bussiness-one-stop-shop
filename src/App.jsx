import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Requirements from './pages/Requirements';
import Announcements from './pages/Announcements';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NewRegistration from './pages/NewRegistration';
import Retirement from './pages/Retirement';
import Tracking from './pages/Tracking';
import Verification from './pages/Verification';
import FeeComputation from './pages/FeeComputation';
import Appointment from './pages/Appointment';
import BusinessOperation from './pages/BusinessOperation';
import LineOfBusiness from './pages/LineOfBusiness';
import Summary from './pages/Summary';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
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
        </Routes>
      </main>
      <Footer />
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
