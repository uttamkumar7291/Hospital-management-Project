import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, AlertCircle, Calendar, ArrowRight, Activity } from 'lucide-react';
import { SPECIALTIES, DOCTORS } from '../constants';
import * as Icons from 'lucide-react';

const SpecialtyIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Activity;
  return <Icon className={className} />;
};

export const SpecialtyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const specialty = useMemo(() => 
    SPECIALTIES.find(s => s.id === id), 
  [id]);

  const specialtyDoctors = useMemo(() => 
    DOCTORS.filter(d => d.specialty === specialty?.name),
  [specialty]);

  if (!specialty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Specialty Not Found</h2>
        <p className="text-slate-500 mb-6">The specialty you are looking for does not exist or has been moved.</p>
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <section className="bg-blue-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors font-medium"
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20">
              <SpecialtyIcon name={specialty.icon} className="text-white w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{specialty.name}</h1>
              <p className="text-blue-200 text-lg max-w-2xl">{specialty.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">About {specialty.name}</h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {specialty.longDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-blue-600" />
                    Common Symptoms
                  </h3>
                  <ul className="space-y-3">
                    {specialty.symptoms?.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 size={18} className="text-green-500 mt-1 shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-blue-600" />
                    Procedures & Treatments
                  </h3>
                  <ul className="space-y-3">
                    {specialty.procedures?.map((proc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 size={18} className="text-blue-500 mt-1 shrink-0" />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Doctors in this specialty */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Our {specialty.name} Specialists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialtyDoctors.map((doc) => (
                  <motion.div 
                    key={doc.id}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 group"
                  >
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-20 h-20 rounded-2xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{doc.name}</h4>
                      <p className="text-sm text-slate-500 mb-2">{doc.education}</p>
                      <Link 
                        to={`/book?doctorId=${doc.id}`}
                        className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline"
                      >
                        Book Appointment <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Book a Consultation</h3>
              <p className="text-blue-100 mb-8">
                Schedule an appointment with one of our {specialty.name.toLowerCase()} experts today.
              </p>
              <Link 
                to={`/book?specialty=${specialty.name}`}
                className="w-full bg-white text-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-lg"
              >
                <Calendar size={20} />
                Book Now
              </Link>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Other Specialties</h3>
              <div className="space-y-4">
                {SPECIALTIES.filter(s => s.id !== id).slice(0, 4).map((s) => (
                  <Link 
                    key={s.id}
                    to={`/specialties/${s.id}`}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                  >
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <SpecialtyIcon name={s.icon} className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">{s.name}</span>
                  </Link>
                ))}
                <Link to="/doctors" className="block text-center text-blue-600 font-bold text-sm mt-4 hover:underline">
                  View All Departments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
