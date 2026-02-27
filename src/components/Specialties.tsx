import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Activity, HeartPulse, Brain, Bone, Baby, Dna, Stethoscope } from 'lucide-react';
import { SPECIALTIES } from '../constants';
import * as Icons from 'lucide-react';

const SpecialtyIcon = ({ name, className }: { name: string, className?: string }) => {
  const Icon = (Icons as any)[name] || Icons.Activity;
  return <Icon className={className} />;
};

export const Specialties = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Medical Specialties</h1>
            <p className="text-lg text-slate-600">
              Vitalis Hospital provides comprehensive care across a wide range of medical fields. 
              Explore our specialized departments and find the expert care you need.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIALTIES.map((spec, idx) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-100 flex flex-col group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <SpecialtyIcon name={spec.icon} className="text-blue-600 group-hover:text-white w-8 h-8 transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{spec.name}</h3>
              <p className="text-slate-500 mb-8 flex-1 leading-relaxed">
                {spec.description}
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {spec.symptoms?.slice(0, 3).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {s}
                    </span>
                  ))}
                </div>
                
                <Link 
                  to={`/specialties/${spec.id}`}
                  className="flex items-center justify-between w-full p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all font-bold text-slate-700"
                >
                  <span>Explore Department</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-blue-900 rounded-[40px] p-12 md:p-20 text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Not sure which specialty you need?</h2>
            <p className="text-blue-200 mb-10 text-lg">
              Our patient care coordinators are available 24/7 to help you find the right doctor 
              and department for your specific health concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl">
                Contact Coordinator
              </Link>
              <Link to="/doctors" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all border border-blue-500/50">
                Browse All Doctors
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
