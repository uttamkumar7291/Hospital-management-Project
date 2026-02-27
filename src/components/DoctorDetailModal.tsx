import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Calendar, MapPin, Award, BookOpen, Clock } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export const DoctorDetailModal = ({ doctor, onClose }: DoctorDetailModalProps) => {
  if (!doctor) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur p-2 rounded-full text-slate-900 hover:bg-white shadow-md transition-all"
          >
            <X size={24} />
          </button>

          {/* Left: Image & Gallery */}
          <div className="w-full md:w-2/5 bg-slate-100 relative">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {doctor.gallery && doctor.gallery.length > 1 && (
              <div className="absolute bottom-6 left-6 right-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {doctor.gallery.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Content */}
          <div className="flex-1 p-8 md:p-12 overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-2 uppercase tracking-wider">
                <Award size={16} />
                {doctor.specialty} Specialist
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{doctor.name}</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={18} fill="currentColor" />
                  {doctor.rating} ({doctor.reviews} Reviews)
                </div>
                <div className="text-slate-400">|</div>
                <div className="text-slate-600 font-medium">{doctor.experience} Experience</div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" />
                  Biography
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {doctor.bio || `${doctor.name} is a highly skilled ${doctor.specialty} specialist with extensive experience in providing top-tier medical care.`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award size={18} className="text-blue-600" />
                    Education
                  </h4>
                  <p className="text-sm text-slate-600">{doctor.education}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Clock size={18} className="text-blue-600" />
                    Availability
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map((day, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-50">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => window.location.href = `/book?doctorId=${doctor.id}`}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  Book Appointment Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
