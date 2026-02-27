import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';
import { messagesService } from '../services/messagesService';
import { notificationsService } from '../services/notificationsService';

export const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'uttamkumarchilous123@gmail.com',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await messagesService.saveMessage({
      type: 'Inquiry',
      subject: `Contact Inquiry: ${formData.subject}`,
      to: formData.email,
      content: formData.message
    });

    notificationsService.addNotification({
      title: 'Inquiry Sent',
      message: `Your inquiry regarding "${formData.subject}" has been sent to our team.`,
      type: 'info'
    });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 sm:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team for any 
            medical inquiries or hospital assistance.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-8 -mt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Call Us</p>
                    <p className="font-bold text-slate-900">+1 (555) 123-4567</p>
                    <p className="text-xs text-blue-600 font-medium">Emergency: 1066</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Email Us</p>
                    <p className="font-bold text-slate-900">contact@vitalis.com</p>
                    <p className="text-xs text-slate-400">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Visit Us</p>
                    <p className="font-bold text-slate-900">123 Medical Plaza</p>
                    <p className="text-xs text-slate-400">Health City, NY 10001</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 h-48 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="text-slate-300 mb-2" size={32} />
                  <p className="text-xs text-slate-500 font-medium">
                    {import.meta.env.VITE_GOOGLE_MAPS_API_KEY 
                      ? "Interactive Map Loading..." 
                      : "Interactive Map (Requires API Key)"}
                  </p>
                </div>
                {import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=Hospital,New+York`}
                  ></iframe>
                )}
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mon - Fri</span>
                  <span className="font-bold">08:00 - 20:00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span>Saturday</span>
                  <span className="font-bold">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-bold">Emergency Only</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-4">Website Owner</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                  UK
                </div>
                <div>
                  <p className="font-bold">Er. Uttam Kumar</p>
                  <p className="text-xs text-slate-400">Founder & Lead Engineer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 h-full">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Globe size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h2>
                  <p className="text-slate-600 max-w-md">
                    Thank you for reaching out. Our team has received your message 
                    and a copy of the details has been sent to <span className="font-bold text-blue-600">uttamkumarchilous123@gmail.com</span>.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-blue-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Subject</label>
                      <input 
                        required
                        type="text" 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message</label>
                      <textarea 
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your message here..."
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
