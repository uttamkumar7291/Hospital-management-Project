import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, UserRound, Stethoscope, ChevronRight, ArrowRight, HeartPulse, MapPin, Phone } from 'lucide-react';
import { SPECIALTIES, DOCTORS } from '../constants';
import * as Icons from 'lucide-react';
import { DoctorDetailModal } from './DoctorDetailModal';
import { Doctor } from '../types';
import { messagesService } from '../services/messagesService';

const SpecialtyIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Activity;
  return <Icon className={className} />;
};

export const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/doctors?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/doctors');
    }
  };

  const handleSpecialtyClick = (specialtyId: string) => {
    navigate(`/specialties/${specialtyId}`);
  };

  const [newsletterEmail, setNewsletterEmail] = useState('uttamkumarchilous123@gmail.com');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    await messagesService.saveMessage({
      type: 'Newsletter',
      subject: 'Newsletter Subscription',
      to: newsletterEmail,
      content: 'Thank you for subscribing to the Vitalis Hospital newsletter!'
    });

    setSubscribed(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920&h=1080" 
            alt="Hospital Hallway" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
              World-Class Healthcare, <br />
              <span className="text-blue-400">Right at Your Fingertips.</span>
            </h1>
            <p className="text-lg text-blue-50 mb-8 max-w-lg">
              Experience the future of healthcare with Vitalis. Advanced technology, 
              compassionate care, and the world's best medical experts.
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link to="/doctors" className="bg-white text-blue-900 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-50 transition-all shadow-lg group">
                <UserRound className="text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Find a Doctor</span>
              </Link>
              <Link to="/book" className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-700 transition-all shadow-lg group">
                <Calendar className="text-white group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Book Appointment</span>
              </Link>
              <button onClick={() => {
                const el = document.getElementById('specialties');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} className="bg-white text-blue-900 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-blue-50 transition-all shadow-lg group text-left">
                <Stethoscope className="text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">View Specialties</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Bar Floating */}
      <div className="container mx-auto px-4 sm:px-8 -mt-12 relative z-20">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-4 items-center border border-slate-100">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for doctors, specialties, or symptoms..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="w-full md:w-64">
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none">
              <option>Select Location</option>
              <option>New York</option>
              <option>London</option>
              <option>Mumbai</option>
            </select>
          </div>
          <button type="submit" className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
            SEARCH
          </button>
        </form>
      </div>

      {/* Specialties Section */}
      <section id="specialties" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Our Specialties</h2>
              <p className="text-slate-600">Comprehensive care across all major medical fields.</p>
            </div>
            <Link to="/specialties" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {SPECIALTIES.map((spec) => (
              <motion.div 
                key={spec.id}
                whileHover={{ y: -5 }}
                onClick={() => handleSpecialtyClick(spec.id)}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <SpecialtyIcon name={spec.icon} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{spec.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Meet Our Experts</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our team of world-renowned doctors and specialists are dedicated to 
              providing you with the highest quality of care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DOCTORS.map((doc) => (
              <motion.div 
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                    ★ {doc.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-4">{doc.specialty}</p>
                  <div className="flex justify-between items-center text-sm text-slate-500 mb-6">
                    <span>{doc.experience} Exp</span>
                    <span>{doc.education}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedDoctor(doc)}
                      className="border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all text-sm"
                    >
                      View Profile
                    </button>
                    <Link 
                      to={`/book?doctorId=${doc.id}`}
                      className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-center text-sm"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DoctorDetailModal 
        doctor={selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
      />

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-blue-300">Years of Excellence</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-300">Expert Doctors</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-300">Happy Patients</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-300">Specialized Centers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pay Online Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 text-white flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            
            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-600/30">
                <Icons.ShieldCheck size={14} /> Secure Payments
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Pay Your Medical Bills Online</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Skip the queue and pay securely from the comfort of your home. 
                We support all major cards, UPI, and Net Banking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/pay" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2">
                  Pay Now <Icons.ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
                  <Icons.CreditCard className="text-blue-400" />
                  <span className="text-sm font-medium">Safe & Encrypted</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
                <Icons.CheckCircle2 className="text-green-500 mb-4" />
                <h4 className="font-bold mb-2">Instant Receipt</h4>
                <p className="text-xs text-slate-500">Get digital invoices immediately via email.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm mt-8">
                <Icons.Clock className="text-blue-400 mb-4" />
                <h4 className="font-bold mb-2">24/7 Access</h4>
                <p className="text-xs text-slate-500">Pay anytime, anywhere at your convenience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="bg-blue-600 rounded-[40px] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Stay Informed About Your Health</h2>
              <p className="text-blue-100 mb-10 text-lg">
                Subscribe to our newsletter for the latest health tips, medical breakthroughs, 
                and hospital updates.
              </p>
              {subscribed ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">Thank you for subscribing!</h3>
                  <p className="text-blue-100">A confirmation email has been sent to <span className="font-bold">{newsletterEmail}</span>.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:ring-2 focus:ring-white outline-none backdrop-blur-sm"
                  />
                  <button type="submit" className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl">
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 text-white mb-6">
                <HeartPulse size={32} className="text-blue-500" />
                <span className="text-2xl font-bold tracking-tight">VITALIS</span>
              </div>
              <p className="mb-6 leading-relaxed">
                Vitalis is a leading healthcare provider committed to delivering 
                exceptional patient care through innovation and compassion.
              </p>
              <div className="flex gap-4">
                {/* Social Icons Placeholder */}
<div className="flex gap-3">
  {/* Facebook */}
  <a 
    href="https://www.facebook.com/share/1AUsQWLr7y/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
      <Icons.Facebook size={18} className="text-white" />
    </div>
  </a>

  {/* Twitter (X) */}
  <a 
    href="https://x.com/UttamKumar85332" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
      <Icons.Twitter size={18} className="text-white" />
    </div>
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com/vedavirus?igsh=NGdxaXA0b3pyNnI1" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
      <Icons.Instagram size={18} className="text-white" />
    </div>
  </a>
</div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/doctors" className="hover:text-white transition-colors">Our Doctors</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Patient Care</h4>
              <ul className="space-y-4">
                <li><Link to="/book" className="hover:text-white transition-colors">Book Appointment</Link></li>
                <li><Link to="/emergency" className="hover:text-white transition-colors">Emergency Services</Link></li>
                <li><Link to="/insurance" className="hover:text-white transition-colors">Insurance Partners</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin size={20} className="text-blue-500 shrink-0" />
                  <span>123 Medical Plaza, Health City, NY 10001</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={20} className="text-blue-500 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex gap-3">
                  <Icons.Mail size={20} className="text-blue-500 shrink-0" />
                  <span>contact@vitalis.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p>© 2024 Vitalis Hospital Group. All rights reserved.</p>
              <p className="text-slate-500 text-xs">Website Developed & Owned by <span className="text-blue-400 font-bold">Er. Uttam Kumar</span></p>
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


