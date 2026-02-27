import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Droplet, 
  ShieldAlert, 
  Heart, 
  Edit2, 
  Save,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState({
    name: 'John Doe',
    age: 32,
    gender: 'Male',
    bloodGroup: 'O+',
    dob: '1992-05-15',
    email: 'uttamkumarchilous123@gmail.com',
    phone: '+1 (555) 987-6543',
    address: '456 Wellness Ave, Health City, NY 10002',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1 (555) 111-2222'
    },
    medicalHistory: {
      allergies: ['Peanuts', 'Penicillin'],
      conditions: ['Mild Asthma'],
      medications: ['Albuterol (as needed)']
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would call an API
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
              <ChevronLeft size={20} />
              Back to Dashboard
            </Link>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all shadow-md ${
                isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditing ? <><Save size={18} /> Save Details</> : <><Edit2 size={18} /> Edit Profile</>}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100 text-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 relative">
                  <User size={64} />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-slate-100 text-blue-600 hover:bg-blue-50">
                      <Edit2 size={16} />
                    </button>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{patient.name}</h2>
                <p className="text-slate-500 mb-6">Patient ID: #V-12345</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Blood Group</p>
                    <div className="flex items-center justify-center gap-1 text-red-500 font-bold">
                      <Droplet size={14} />
                      {patient.bloodGroup}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Age</p>
                    <div className="text-slate-900 font-bold">{patient.age} Yrs</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 p-8 rounded-[32px] shadow-lg text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <ShieldAlert size={20} />
                  Emergency Contact
                </h3>
                <div className="space-y-3 text-blue-100 text-sm">
                  <p><span className="opacity-60">Name:</span> <span className="font-bold text-white">{patient.emergencyContact.name}</span></p>
                  <p><span className="opacity-60">Relation:</span> <span className="font-bold text-white">{patient.emergencyContact.relation}</span></p>
                  <p><span className="opacity-60">Phone:</span> <span className="font-bold text-white">{patient.emergencyContact.phone}</span></p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="md:col-span-2 space-y-8">
              {/* Personal Details */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Full Name</p>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={patient.name} 
                        onChange={(e) => setPatient({...patient, name: e.target.value})}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="font-medium text-slate-900">{patient.name}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Date of Birth</p>
                    <p className="font-medium text-slate-900">{patient.dob}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                    <div className="flex items-center gap-2 text-slate-900">
                      <Mail size={14} className="text-slate-400" />
                      {patient.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Phone Number</p>
                    <div className="flex items-center gap-2 text-slate-900">
                      <Phone size={14} className="text-slate-400" />
                      {patient.phone}
                    </div>
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase">Residential Address</p>
                    <div className="flex items-center gap-2 text-slate-900">
                      <MapPin size={14} className="text-slate-400 shrink-0" />
                      {patient.address}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Medical History */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-[32px] shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Heart size={20} className="text-red-500" />
                  Medical History
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Known Allergies</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalHistory.allergies.map((a, i) => (
                        <span key={i} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold border border-red-100">
                          {a}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-3 py-1 border-2 border-dashed border-slate-200 text-slate-400 rounded-full text-xs font-bold hover:border-blue-500 hover:text-blue-500 transition-all">
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.medicalHistory.conditions.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">Current Medications</p>
                    <ul className="space-y-2">
                      {patient.medicalHistory.medications.map((m, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
