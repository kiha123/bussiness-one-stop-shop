import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessApplicationForm from './pages/BusinessApplicationForm';
// ...other imports

export default function AppApplication() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/application" element={<BusinessApplicationForm />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}
