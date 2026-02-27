import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Eye, Calendar, User, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MedicalRecords = () => {
  const records = [
    { id: 1, title: 'Annual Physical Examination', doctor: 'Dr. Sarah Johnson', date: '2024-05-10', type: 'Report', status: 'Final' },
    { id: 2, title: 'Blood Analysis - Lipid Profile', doctor: 'Lab Corp', date: '2024-04-22', type: 'Lab Result', status: 'Final' },
    { id: 3, title: 'Chest X-Ray', doctor: 'Radiology Dept', date: '2024-03-15', type: 'Imaging', status: 'Final' },
    { id: 4, title: 'Vaccination Record', doctor: 'General Clinic', date: '2024-01-05', type: 'Immunization', status: 'Updated' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Medical Records</h1>
              <p className="text-slate-500">Access and manage your complete health history.</p>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search records..."
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Record Name</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Provider</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map((record) => (
                    <motion.tr 
                      key={record.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                            <FileText size={20} />
                          </div>
                          <span className="font-bold text-slate-900">{record.title}</span>
                        </div>
                      </td>
                      <td className="p-6 text-slate-600">{record.doctor}</td>
                      <td className="p-6 text-slate-600">{record.date}</td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase">
                          {record.type}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="View">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Download">
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {records.length === 0 && (
              <div className="p-20 text-center">
                <FileText size={48} className="text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500">No medical records found.</p>
              </div>
            )}
          </div>

          <div className="mt-8 bg-blue-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Need a copy of your records?</h3>
              <p className="text-blue-100">You can request a certified digital copy of your entire medical history.</p>
            </div>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all whitespace-nowrap">
              Request Full History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
