import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Activity, 
  Clock, 
  Settings, 
  LogOut,
  Bell,
  User,
  Mail,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { messagesService, Message } from '../services/messagesService';
import { notificationsService, Notification } from '../services/notificationsService';
import { format, formatDistanceToNow } from 'date-fns';

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'messages'>('overview');
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [status, setStatus] = useState<{ emailService: boolean } | null>(null);
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [vitals, setVitals] = useState([
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'normal' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', trend: 'normal' },
    { label: 'Glucose', value: '95', unit: 'mg/dL', trend: 'normal' },
    { label: 'Weight', value: '70', unit: 'kg', trend: 'stable' },
  ]);

  useEffect(() => {
    setMessages(messagesService.getMessages());
    setNotifications(notificationsService.getNotifications());
    fetch('/api/config-status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ emailService: false }));
  }, []);

  const handleUpdateVitals = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newVitals = vitals.map(v => ({
      ...v,
      value: formData.get(v.label) as string || v.value
    }));
    setVitals(newVitals);
    notificationsService.addNotification({
      title: 'Vitals Updated',
      message: 'Your health vitals have been successfully updated in your profile.',
      type: 'success'
    });
    setNotifications(notificationsService.getNotifications());
    setShowVitalsModal(false);
  };

  const handleMarkAsRead = (id: string) => {
    notificationsService.markAsRead(id);
    setNotifications(notificationsService.getNotifications());
  };

  const handleMarkAllAsRead = () => {
    notificationsService.markAllAsRead();
    setNotifications(notificationsService.getNotifications());
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const appointments = [
    { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-06-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Michael Chen', date: '2024-06-22', time: '02:30 PM', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600">
            <Activity size={24} />
            <span className="text-xl font-bold tracking-tight text-slate-900">VITALIS</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 p-3 w-full rounded-xl font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-3 p-3 w-full rounded-xl font-medium transition-colors ${activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Mail size={20} /> Sent Messages
          </button>
          <Link to="/book" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <Calendar size={20} /> Appointments
          </Link>
          <Link to="/pay" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <CreditCard size={20} /> Pay Bills
          </Link>
          <Link to="/dashboard/profile" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <User size={20} /> Patient Profile
          </Link>
          <Link to="/dashboard/records" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <FileText size={20} /> Medical Records
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <Settings size={20} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-4 sm:p-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Patient Dashboard</h1>
            {status && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status.emailService ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${status.emailService ? 'bg-green-500' : 'bg-red-500'}`} />
                Email Service: {status.emailService ? 'Online' : 'Offline'}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl transition-colors relative ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-30 overflow-hidden"
                    >
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-slate-900">Notifications</h3>
                        <button 
                          onClick={handleMarkAllAsRead}
                          className="text-xs text-blue-600 font-bold hover:underline"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto divide-y divide-slate-50">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div 
                              key={n.id} 
                              onClick={() => handleMarkAsRead(n.id)}
                              className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 ${!n.read ? 'bg-blue-50/30' : ''}`}
                            >
                              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                                !n.read ? 'bg-blue-600' : 'bg-transparent'
                              }`} />
                              <div className="flex-1">
                                <p className={`text-sm mb-1 ${!n.read ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                                  {n.title}
                                </p>
                                <p className="text-xs text-slate-500 mb-2 leading-relaxed">{n.message}</p>
                                <p className="text-[10px] text-slate-400 font-medium">
                                  {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-12 text-center">
                            <Bell size={32} className="text-slate-200 mx-auto mb-2" />
                            <p className="text-sm text-slate-500">No notifications yet</p>
                          </div>
                        )}
                      </div>
                      <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                        <button className="text-xs text-slate-500 font-bold hover:text-blue-600 transition-colors">
                          View all activity
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <Link to="/dashboard/profile" className="flex items-center gap-3 pl-4 border-l border-slate-200 hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">Patient ID: #V-12345</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <User size={20} />
              </div>
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-8 space-y-8">
          {activeTab === 'overview' ? (
            <>
              {/* Welcome Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
              >
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">Welcome back, John!</h2>
                  <p className="text-blue-100 mb-6">You have 2 appointments scheduled for this month.</p>
                  <Link to="/book" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all inline-block">
                    Book New Appointment
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              </motion.div>

              {/* Vitals Grid */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">Your Vitals</h3>
                <button 
                  onClick={() => setShowVitalsModal(true)}
                  className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1"
                >
                  <Settings size={14} /> Update Vitals
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {vitals.map((v, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                  >
                    <p className="text-sm text-slate-500 mb-1">{v.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900">{v.value}</span>
                      <span className="text-xs text-slate-400">{v.unit}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs text-green-500">
                      <Activity size={12} />
                      <span>Normal Range</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Appointments List */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-slate-900">Upcoming Appointments</h3>
                    <Link to="/book" className="text-blue-600 text-sm font-bold hover:underline">See All</Link>
                  </div>
                  <div className="space-y-4">
                    {appointments.map((app) => (
                      <div key={app.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                            <Calendar size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{app.doctor}</h4>
                            <p className="text-sm text-slate-500">{app.date} • {app.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            app.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {app.status}
                          </span>
                          <button className="text-slate-400 hover:text-blue-600 transition-colors">
                            <Settings size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions / Reports */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Recent Reports</h3>
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Blood Test Results</p>
                          <p className="text-xs text-slate-500">June 10, 2024</p>
                        </div>
                      </div>
                      <Clock size={16} className="text-slate-300" />
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">X-Ray Report</p>
                          <p className="text-xs text-slate-500">May 28, 2024</p>
                        </div>
                      </div>
                      <Clock size={16} className="text-slate-300" />
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-6 text-white">
                    <h4 className="font-bold mb-2">Need Help?</h4>
                    <p className="text-sm text-slate-400 mb-4">Our support team is available 24/7 for your assistance.</p>
                    <Link to="/contact" className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                      Contact Support <Activity size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-slate-900">Sent Messages Log</h3>
                <p className="text-sm text-slate-500">Total: {messages.length} messages</p>
              </div>

              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            msg.type === 'Appointment' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                            {msg.type === 'Appointment' ? <Calendar size={20} /> : <Mail size={20} />}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{msg.subject}</h4>
                            <p className="text-xs text-slate-500">To: {msg.to} • {format(new Date(msg.timestamp), 'MMM dd, yyyy HH:mm')}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase">
                          {msg.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                        "{msg.content}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                  <Mail size={48} className="text-slate-200 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-slate-900">No messages sent yet</h4>
                  <p className="text-slate-500">Your sent appointments and inquiries will appear here.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      {/* Update Vitals Modal */}
      {showVitalsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowVitalsModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Update Your Vitals</h3>
            <form onSubmit={handleUpdateVitals} className="space-y-4">
              {vitals.map((v) => (
                <div key={v.label} className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{v.label} ({v.unit})</label>
                  <input 
                    name={v.label}
                    type="text" 
                    defaultValue={v.value}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowVitalsModal(false)}
                  className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg transition-all"
                >
                  Save Vitals
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
