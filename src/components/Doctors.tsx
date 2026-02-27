import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Star, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { DOCTORS, SPECIALTIES } from '../constants';
import { cn } from '../lib/utils';
import { DoctorDetailModal } from './DoctorDetailModal';
import { Doctor } from '../types';

export const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const query = searchParams.get('q') || '';
  const specialtyFilter = searchParams.get('specialty') || 'All';

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(query.toLowerCase()) || 
                           doc.specialty.toLowerCase().includes(query.toLowerCase());
      const matchesSpecialty = specialtyFilter === 'All' || doc.specialty === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    });
  }, [query, specialtyFilter]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Find a Specialist</h1>
            <p className="text-slate-600">Browse through our network of world-class medical experts.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search name or specialty..."
                value={query}
                onChange={(e) => setSearchParams({ q: e.target.value, specialty: specialtyFilter })}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              />
            </div>
            <select 
              value={specialtyFilter}
              onChange={(e) => setSearchParams({ q: query, specialty: e.target.value })}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm appearance-none min-w-[160px]"
            >
              <option value="All">All Specialties</option>
              {SPECIALTIES.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map((doc) => (
              <motion.div 
                key={doc.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> {doc.rating}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{doc.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-4">{doc.specialty}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} />
                      <span>{doc.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      <span>Main Campus, NY</span>
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setSelectedDoctor(doc)}
                      className="border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all text-sm"
                    >
                      Profile
                    </button>
                    <Link 
                      to={`/book?doctorId=${doc.id}`}
                      className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-center text-sm"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => setSearchParams({})}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <DoctorDetailModal 
        doctor={selectedDoctor} 
        onClose={() => setSelectedDoctor(null)} 
      />
    </div>
  );
};
