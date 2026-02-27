import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DOCTORS } from '../constants';
import { format } from 'date-fns';
import { messagesService } from '../services/messagesService';
import { notificationsService } from '../services/notificationsService';

export const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const initialDoctorId = searchParams.get('doctorId') || '';

  const [step, setStep] = useState(initialDoctorId ? 2 : 1);
  const [formData, setFormData] = useState({
    doctorId: initialDoctorId,
    date: '',
    time: '',
    name: 'John Doe',
    phone: '+1 (555) 987-6543',
    email: 'uttamkumarchilous123@gmail.com',
    reason: ''
  });

  const [useProfile, setUseProfile] = useState(true);

  useEffect(() => {
    if (initialDoctorId) {
      setFormData(prev => ({ ...prev, doctorId: initialDoctorId }));
      setStep(2);
    }
  }, [initialDoctorId]);

  const selectedDoctor = DOCTORS.find(d => d.id === formData.doctorId);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to simulated sent messages AND send real email
    await messagesService.saveMessage({
      type: 'Appointment',
      subject: `Appointment Confirmed: ${selectedDoctor?.name}`,
      to: formData.email,
      content: `Your appointment with ${selectedDoctor?.name} is scheduled for ${formData.date} at ${formData.time}. Reason: ${formData.reason}`
    });

    // Add to notifications
    notificationsService.addNotification({
      title: 'Appointment Booked',
      message: `Your appointment with ${selectedDoctor?.name} for ${formData.date} at ${formData.time} has been successfully booked.`,
      type: 'success'
    });

    setStep(4); // Success step
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {[1, 2, 3].map((s) => (
              <div 
                key={s}
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-8 md:p-12">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Select a Specialist</h2>
                    <p className="text-slate-600">Choose the doctor you'd like to consult with.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {DOCTORS.map((doc) => (
                      <div 
                        key={doc.id}
                        onClick={() => {
                          setFormData({ ...formData, doctorId: doc.id });
                          handleNext();
                        }}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${
                          formData.doctorId === doc.id 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                        }`}
                      >
                        <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900">{doc.name}</h4>
                          <p className="text-blue-600 text-sm">{doc.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose Date & Time</h2>
                    <p className="text-slate-600">Select your preferred slot for {selectedDoctor?.name}.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="block font-bold text-slate-700">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={format(new Date(), 'yyyy-MM-dd')}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="block font-bold text-slate-700">Select Time</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setFormData({ ...formData, time: t })}
                            className={`p-3 text-sm rounded-xl font-medium transition-all ${
                              formData.time === t 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-8">
                    <button onClick={handleBack} className="text-slate-600 font-bold px-8 py-3">Back</button>
                    <button 
                      onClick={handleNext} 
                      disabled={!formData.date || !formData.time}
                      className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Patient Information</h2>
                    <p className="text-slate-600">Please provide your details to confirm the booking.</p>
                  </div>

                  {/* Patient Profile Summary */}
                  <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <User size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">Logged in as {formData.name}</h4>
                        <p className="text-sm text-slate-500">Using details from your patient profile</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setUseProfile(!useProfile)}
                      className="text-blue-600 text-sm font-bold hover:underline"
                    >
                      {useProfile ? 'Edit Details' : 'Use Profile'}
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        disabled={useProfile}
                        placeholder="John Doe"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        disabled={useProfile}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-slate-700">Reason for Visit</label>
                      <textarea 
                        rows={4}
                        required
                        placeholder="Briefly describe your symptoms or reason for visit..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 flex justify-between pt-8">
                      <button type="button" onClick={handleBack} className="text-slate-600 font-bold px-8 py-3">Back</button>
                      <button 
                        type="submit"
                        className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h2>
                  <p className="text-slate-600 mb-10 max-w-md mx-auto">
                    Your appointment with {selectedDoctor?.name} has been scheduled for {formData.date} at {formData.time}. 
                    A confirmation email has been sent to <span className="font-bold text-blue-600">uttamkumarchilous123@gmail.com</span>.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-2xl max-w-sm mx-auto mb-10 text-left space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Doctor</span>
                      <span className="font-bold text-slate-900">{selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date</span>
                      <span className="font-bold text-slate-900">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Time</span>
                      <span className="font-bold text-slate-900">{formData.time}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl"
                  >
                    Back to Home
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
