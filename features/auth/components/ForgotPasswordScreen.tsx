
import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordScreenProps {
  onBackToLogin: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBackToLogin }) => {
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSent(true);
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-[#0F172A] animate-in fade-in slide-in-from-right duration-500">
      <div className="pt-8">
        <button 
          onClick={onBackToLogin}
          className="p-3 bg-white/5 text-slate-400 rounded-2xl border border-white/5 hover:bg-white/10 transition-all active:scale-90"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="pt-12 pb-10">
        <h2 className="text-3xl font-black text-white mb-2 italic">Reset Password</h2>
        <p className="text-slate-400 font-medium">We'll send you a link to recover your access.</p>
      </div>

      {!isSent ? (
        <div className="space-y-8 flex-1">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Registered Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full bg-[#1E293B] border border-white/5 rounded-[22px] pl-12 pr-4 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <button 
            onClick={handleSend}
            className="w-full bg-blue-600 text-white py-5 rounded-[28px] font-black text-lg shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            Send Reset Link
            <Send className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-300">
          <div className="bg-emerald-500/10 p-8 rounded-[40px] border border-emerald-500/20">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-white italic">Check Your Email</h3>
            <p className="text-slate-400 font-medium px-4">
              We've sent a recovery link to your inbox. Please check your spam folder if you don't see it.
            </p>
          </div>
          <button 
            onClick={onBackToLogin}
            className="w-full bg-white text-[#0F172A] py-5 rounded-[28px] font-black text-lg active:scale-95 transition-all mt-4"
          >
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordScreen;
