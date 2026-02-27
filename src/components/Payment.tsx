import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Wallet, Building2, User, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationsService } from '../services/notificationsService';

export const Payment = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: 'John Doe',
    billId: 'INV-' + Math.floor(Math.random() * 90000 + 10000),
    amount: '1500',
    email: 'uttamkumarchilous123@gmail.com'
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setStep(3); // Success step

    notificationsService.addNotification({
      title: 'Payment Successful',
      message: `Your payment of ₹${formData.amount} for Bill ${formData.billId} has been processed successfully.`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Online Payment Portal</h1>
            <p className="text-slate-600">Securely pay your hospital bills and consultation fees online.</p>
          </div>

          <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left Panel: Summary */}
              <div className="lg:col-span-2 bg-blue-900 p-8 md:p-12 text-white">
                <div className="flex items-center gap-2 mb-12">
                  <ShieldCheck className="text-blue-400" size={24} />
                  <span className="font-bold tracking-wider text-sm uppercase">Secure Checkout</span>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">Patient Name</p>
                    <p className="text-xl font-bold">{formData.patientName}</p>
                  </div>
                  <div>
                    <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">Invoice Number</p>
                    <p className="text-xl font-bold">{formData.billId}</p>
                  </div>
                  <div className="pt-8 border-t border-blue-800">
                    <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-2">Total Amount</p>
                    <p className="text-4xl font-bold">₹{formData.amount}</p>
                  </div>
                </div>

                <div className="mt-20 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-sm text-blue-200 leading-relaxed italic">
                    "Your health is our priority. Thank you for choosing Vitalis Hospital."
                  </p>
                  <p className="mt-4 text-xs font-bold text-blue-400">— Er. Uttam Kumar, Owner</p>
                </div>
              </div>

              {/* Right Panel: Payment Form */}
              <div className="lg:col-span-3 p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-2xl font-bold text-slate-900">Select Payment Method</h2>
                      <div className="space-y-4">
                        <button 
                          onClick={() => setPaymentMethod('card')}
                          className={`w-full p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <CreditCard size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-slate-900">Credit / Debit Card</p>
                            <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
                          </div>
                        </button>

                        <button 
                          onClick={() => setPaymentMethod('upi')}
                          className={`w-full p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Wallet size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-slate-900">UPI Payment</p>
                            <p className="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                          </div>
                        </button>

                        <button 
                          onClick={() => setPaymentMethod('netbanking')}
                          className={`w-full p-6 rounded-3xl border-2 flex items-center gap-4 transition-all ${paymentMethod === 'netbanking' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                        >
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'netbanking' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Building2 size={24} />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-slate-900">Net Banking</p>
                            <p className="text-xs text-slate-500">All major Indian banks</p>
                          </div>
                        </button>
                      </div>

                      <button 
                        disabled={!paymentMethod}
                        onClick={() => setStep(2)}
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50"
                      >
                        Continue to Pay <ArrowRight size={20} />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-900">
                          <ArrowRight className="rotate-180" size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-slate-900">Payment Details</h2>
                      </div>

                      <form onSubmit={handlePayment} className="space-y-6">
                        {paymentMethod === 'card' && (
                          <>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase">Card Number</label>
                              <div className="relative">
                                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Expiry Date</label>
                                <input required type="text" placeholder="MM/YY" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">CVV</label>
                                <input required type="password" placeholder="***" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            </div>
                          </>
                        )}

                        {paymentMethod === 'upi' && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">UPI ID</label>
                            <input required type="text" placeholder="username@upi" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" />
                            <p className="text-[10px] text-slate-400">Enter your VPA / UPI ID to receive a payment request on your app.</p>
                          </div>
                        )}

                        {paymentMethod === 'netbanking' && (
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Select Bank</label>
                            <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                              <option>State Bank of India</option>
                              <option>HDFC Bank</option>
                              <option>ICICI Bank</option>
                              <option>Axis Bank</option>
                              <option>Kotak Mahindra Bank</option>
                            </select>
                          </div>
                        )}

                        <div className="pt-8">
                          <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50"
                          >
                            {isLoading ? (
                              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>Pay ₹{formData.amount} Now</>
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h2>
                      <p className="text-slate-600 mb-10 max-w-sm mx-auto">
                        Your payment has been processed. A digital receipt has been sent to your email.
                      </p>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-10 text-left space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Transaction ID</span>
                          <span className="font-bold text-slate-900">TXN{Math.floor(Math.random() * 1000000000)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Amount Paid</span>
                          <span className="font-bold text-slate-900">₹{formData.amount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Date & Time</span>
                          <span className="font-bold text-slate-900">{new Date().toLocaleString()}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate('/dashboard')}
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl"
                      >
                        Go to Dashboard
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} />
              <span className="text-sm font-medium">PCI-DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
