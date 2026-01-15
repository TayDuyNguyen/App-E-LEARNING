
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

interface RegisterScreenProps {
  onRegister: () => void;
  onGoToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onGoToLogin }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0F172A] animate-in slide-in-from-right duration-500 overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-none p-8">
        <div className="pt-12 pb-10">
          <h2 className="text-3xl font-black text-white mb-2 italic leading-tight text-left">Tạo tài khoản <br/>mới</h2>
          <p className="text-slate-400 font-medium text-sm text-left">Bắt đầu hành trình học tập thông minh ngay.</p>
        </div>

        <div className="space-y-6 pb-12">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block text-left">Họ và tên</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Nhập tên của bạn"
                className="w-full bg-[#1E293B] border border-white/5 rounded-[24px] pl-14 pr-6 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block text-left">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full bg-[#1E293B] border border-white/5 rounded-[24px] pl-14 pr-6 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 block text-left">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#1E293B] border border-white/5 rounded-[24px] pl-14 pr-6 py-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 px-1">
            <button 
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center flex-shrink-0 ${
                agreed ? 'bg-blue-600 border-blue-600' : 'border-slate-800'
              }`}
            >
              {agreed && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
            </button>
            <p className="text-xs font-bold text-slate-500 leading-relaxed text-left">
              Tôi đồng ý với các <span className="text-blue-500">Điều khoản dịch vụ</span> và <span className="text-blue-500">Chính sách quyền riêng tư</span> của EduSmart.
            </p>
          </div>

          <button 
            onClick={onRegister}
            disabled={!agreed}
            className="w-full bg-white text-[#0F172A] py-5 rounded-[32px] font-black text-lg shadow-xl active:scale-95 transition-all mt-4 disabled:bg-slate-800 disabled:text-slate-600"
          >
            Đăng ký ngay
          </button>

          <div className="py-6 text-center">
            <p className="text-sm font-bold text-slate-500">
              Đã có tài khoản? {' '}
              <button 
                onClick={onGoToLogin}
                className="text-blue-500 font-black hover:underline underline-offset-4"
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
