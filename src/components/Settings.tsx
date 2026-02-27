import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard, HelpCircle, ChevronRight, Save } from 'lucide-react';

export const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing & Insurance', icon: CreditCard },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    activeSection === section.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon size={20} />
                    <span className="font-bold text-sm">{section.label}</span>
                  </div>
                  <ChevronRight size={16} className={activeSection === section.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div 
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 md:p-12"
              >
                {activeSection === 'profile' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Profile Settings</h2>
                      <p className="text-slate-500">Manage your personal information and how it's displayed.</p>
                    </div>

                    <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
                      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                        JD
                      </div>
                      <div className="space-y-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all">
                          Change Photo
                        </button>
                        <button className="text-slate-500 px-4 py-2 text-sm font-bold hover:text-red-500 transition-all">
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Display Name</label>
                        <input type="text" defaultValue="John Doe" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input type="email" defaultValue="uttamkumarchilous123@gmail.com" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Language</label>
                        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                          <option>English</option>
                          <option>Hindi</option>
                          <option>Spanish</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Timezone</label>
                        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500">
                          <option>GMT+5:30 (India)</option>
                          <option>GMT-5:00 (EST)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">
                        <Save size={18} />
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Notification Preferences</h2>
                      <p className="text-slate-500">Choose how and when you want to be notified.</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: 'Appointment Reminders', desc: 'Get notified about upcoming appointments' },
                        { label: 'Lab Results', desc: 'Receive alerts when new lab results are available' },
                        { label: 'Health Tips', desc: 'Occasional health and wellness suggestions' },
                        { label: 'Security Alerts', desc: 'Notifications about account login and security' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                          <div>
                            <p className="font-bold text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                          </div>
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection !== 'profile' && activeSection !== 'notifications' && (
                  <div className="py-20 text-center">
                    <SettingsIcon size={48} className="text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">Coming Soon</h3>
                    <p className="text-slate-500">This settings module is currently under development.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
