
import React from 'react';
import { GraduationCap, Loader2, Sparkles } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between py-16 bg-[#0F172A] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="h-10"></div>

      {/* Brand Section */}
      <div className="flex flex-col items-center gap-10 relative z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-600 blur-[50px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative w-40 h-40 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[48px] flex items-center justify-center shadow-2xl">
            <GraduationCap className="w-24 h-24 text-blue-500" strokeWidth={1.5} />
            <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-amber-400 animate-bounce" />
          </div>
        </div>
        
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-black text-white tracking-tighter italic">EduSmart</h1>
          <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">Learn Faster. Smarter.</p>
        </div>
      </div>

      {/* Loader */}
      <div className="w-full flex flex-col items-center gap-12 relative z-10">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Khởi tạo hệ thống AI...</p>
        </div>
        
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest opacity-50">
          Vers. 2.0.0 • Distributed by AI Lab
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
