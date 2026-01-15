
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Github, Chrome } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
  onGoToRegister: () => void;
  onGoToForgot: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGoToRegister, onGoToForgot }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0F172A] animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Scrollable container for the entire form content */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-8">
        <div className="pt-10 pb-12">
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight mb-3 italic text-left">Chào mừng <br/>trở lại! 👋</h2>
          <p className="text-slate-400 font-medium text-left">Tiếp tục hành trình chinh phục tri thức.</p>
        </div>

        <div className="space-y-8 pb-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 block text-left">Địa chỉ Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="email" 
                placeholder="tenban@email.com"
                className="w-full bg-[#1E293B] border border-white/5 rounded-[28px] pl-14 pr-6 py-5 text-white font-bold placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 block text-left">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className="w-full bg-[#1E293B] border border-white/5 rounded-[28px] pl-14 pr-14 py-5 text-white font-bold placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/30 transition-all outline-none"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end px-1">
            <button onClick={onGoToForgot} className="text-xs font-black text-blue-500 uppercase tracking-widest">
              Quên mật khẩu?
            </button>
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl shadow-2xl shadow-blue-900/40 active:scale-95 transition-all mt-4"
          >
            Đăng nhập ngay
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="bg-[#0F172A] px-6 text-slate-600">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-[#1E293B] border border-white/5 py-4 rounded-[24px] font-black text-white hover:bg-[#2A374F] transition-colors active:scale-95 text-xs uppercase tracking-widest">
              <Chrome className="w-4 h-4 text-blue-400" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 bg-[#1E293B] border border-white/5 py-4 rounded-[24px] font-black text-white hover:bg-[#2A374F] transition-colors active:scale-95 text-xs uppercase tracking-widest">
              <Github className="w-4 h-4" />
              Github
            </button>
          </div>

          <div className="py-8 text-center">
            <p className="text-sm font-bold text-slate-500">
              Chưa có tài khoản? {' '}
              <button onClick={onGoToRegister} className="text-blue-500 font-black underline-offset-4 hover:underline">
                Đăng ký miễn phí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
