import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BookAppointment } from './components/BookAppointment';
import { HealthAssistant } from './components/HealthAssistant';
import { Doctors } from './components/Doctors';
import { Contact } from './components/Contact';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { PatientProfile } from './components/PatientProfile';
import { MedicalRecords } from './components/MedicalRecords';
import { Settings } from './components/Settings';
import { SpecialtyDetail } from './components/SpecialtyDetail';
import { Specialties } from './components/Specialties';
import { Payment } from './components/Payment';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {!isDashboard && !isAuth && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/specialties/:id" element={<SpecialtyDetail />} />
          <Route path="/pay" element={<Payment />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<PatientProfile />} />
          <Route path="/dashboard/records" element={<MedicalRecords />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
      {!isDashboard && !isAuth && <HealthAssistant />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
