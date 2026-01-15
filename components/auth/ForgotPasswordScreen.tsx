
import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBackToLogin }) => {
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    // Simulate sending
    setIsSent(true);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-white animate-in fade-in slide-in-from-right duration-500">
      <div className="pt-8">
        <button 
          onClick={onBackToLogin}
          className="p-3 bg-slate-50 text-slate-600 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all active:scale-90"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-12 pb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Reset Password</h2>
        <p className="text-slate-500 font-medium">We'll send you a link to recover your access.</p>
      </div>

      {!isSent ? (
        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full bg-slate-50 border border-slate-100 rounded-[22px] pl-12 pr-4 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button 
            onClick={handleSend}
            className="w-full bg-indigo-600 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-indigo-100 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Send Reset Link
            <Send className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-300">
          <div className="bg-emerald-50 p-8 rounded-[40px] shadow-inner">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900">Check Your Email</h3>
            <p className="text-slate-500 font-medium px-4">
              We've sent a recovery link to your inbox. Please check your spam folder if you don't see it.
            </p>
          </div>
          <button 
            onClick={onBackToLogin}
            className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all mt-4"
          >
            Back to Login
          </button>
        </div>
      )}

      <div className="pb-8 text-center">
        <p className="text-sm font-bold text-slate-400">
          Need help? <span className="text-indigo-600 cursor-pointer">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
