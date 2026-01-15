
import React, { useState } from 'react';
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onGoToLogin }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-8 bg-white animate-in fade-in slide-in-from-right duration-500">
      <div className="pt-12 pb-10">
        <h2 className="text-3xl font-black text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500 font-medium">Start your learning journey today.</p>
      </div>

      <div className="space-y-5 flex-1">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Quốc Anh"
              className="w-full bg-slate-50 border border-slate-100 rounded-[22px] pl-12 pr-4 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="email" 
              placeholder="example@mail.com"
              className="w-full bg-slate-50 border border-slate-100 rounded-[22px] pl-12 pr-4 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-100 rounded-[22px] pl-12 pr-4 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2 px-1">
          <button 
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center flex-shrink-0 ${
              agreed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-200'
            }`}
          >
            {agreed && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </button>
          <p className="text-xs font-bold text-slate-400 leading-relaxed">
            I agree to Lumina Learn's <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy</span>.
          </p>
        </div>

        <button 
          onClick={onRegister}
          disabled={!agreed}
          className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all mt-4 disabled:bg-slate-300 disabled:shadow-none"
        >
          Create Account
        </button>
      </div>

      <div className="pb-8 text-center">
        <p className="text-sm font-bold text-slate-400">
          Already have an account? {' '}
          <button 
            onClick={onGoToLogin}
            className="text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
