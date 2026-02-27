import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Search, Menu, X, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find a Doctor', path: '/doctors' },
    { name: 'Specialties', path: '/specialties' },
    { name: 'Book Appointment', path: '/book' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 sm:px-8 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex gap-4 sm:gap-6">
          <div className="flex items-center gap-1">
            <Phone size={14} className="text-blue-300" />
            <span>Emergency: 1066</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <MapPin size={14} className="text-blue-300" />
            <span>Find a Hospital</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="hover:text-blue-300 transition-colors">Login</Link>
          <Link to="/dashboard" className="hover:text-blue-300 transition-colors">Dashboard</Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="flex items-center gap-2 text-blue-600">
          <HeartPulse size={32} strokeWidth={2.5} />
          <span className="text-2xl font-bold tracking-tight text-slate-900">VITALIS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-blue-600",
                location.pathname === link.path ? "text-blue-600" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/pay" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
            Pay Online
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium p-2 rounded-lg",
                    location.pathname === link.path ? "bg-blue-50 text-blue-600" : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/pay" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white w-full py-3 rounded-xl font-semibold text-center">
                Pay Online
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


