
import React, { useState } from 'react';
import { 
  ArrowLeft, User, Bell, Lock, Globe, Palette, 
  Trash2, HelpCircle, Info, ChevronRight, LogOut,
  Moon, Sun, Languages, Shield, Smartphone, 
  MessageSquare, Star, Database
} from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, onLogout }) => {
  const [notifications, setNotifications] = useState({
    system: true,
    social: true,
    reminder: false,
    ai_tutor: true
  });

  const [language, setLanguage] = useState('Tiếng Việt');
  const [theme, setTheme] = useState('Tối');

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight text-white">Cài đặt</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 pb-32 space-y-10">
        
        {/* Account Section */}
        <section className="space-y-4">
           <SectionTitle title="Tài khoản" />
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] overflow-hidden shadow-xl">
              <SettingsItem icon={<User className="text-blue-400" />} label="Đổi thông tin cá nhân" />
              <SettingsItem icon={<Lock className="text-amber-400" />} label="Thay đổi mật khẩu" />
              <SettingsItem icon={<Shield className="text-emerald-400" />} label="Xác thực 2 yếu tố" />
           </div>
        </section>

        {/* Notifications Section */}
        <section className="space-y-4">
           <SectionTitle title="Thông báo" />
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] p-2 overflow-hidden shadow-xl">
              <ToggleItem 
                icon={<Bell className="text-indigo-400" />} 
                label="Thông báo hệ thống" 
                enabled={notifications.system} 
                onToggle={() => setNotifications({...notifications, system: !notifications.system})}
              />
              <ToggleItem 
                icon={<MessageSquare className="text-pink-400" />} 
                label="Hoạt động cộng đồng" 
                enabled={notifications.social} 
                onToggle={() => setNotifications({...notifications, social: !notifications.social})}
              />
              <ToggleItem 
                icon={<Smartphone className="text-blue-400" />} 
                label="Lời nhắc học tập" 
                enabled={notifications.reminder} 
                onToggle={() => setNotifications({...notifications, reminder: !notifications.reminder})}
              />
           </div>
        </section>

        {/* Learning Preferences */}
        <section className="space-y-4">
           <SectionTitle title="Tùy chọn học tập" />
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] overflow-hidden shadow-xl">
              <SettingsItem icon={<Globe className="text-teal-400" />} label="Ngôn ngữ ứng dụng" value={language} />
              <SettingsItem icon={<Palette className="text-orange-400" />} label="Chủ đề giao diện" value={theme} />
           </div>
        </section>

        {/* System Section */}
        <section className="space-y-4">
           <SectionTitle title="Hệ thống" />
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] overflow-hidden shadow-xl">
              <SettingsItem icon={<Database className="text-slate-400" />} label="Xóa bộ nhớ đệm" />
              <SettingsItem icon={<Star className="text-amber-500" />} label="Đánh giá ứng dụng" />
              <SettingsItem icon={<HelpCircle className="text-blue-500" />} label="Trung tâm hỗ trợ" />
              <SettingsItem icon={<Info className="text-slate-500" />} label="Về EduSmart v2.0.0" />
           </div>
        </section>

        {/* Logout Button */}
        <div className="pt-4">
           <button 
             onClick={onLogout}
             className="w-full py-6 bg-rose-500/10 border border-rose-500/20 rounded-[32px] flex items-center justify-center gap-3 text-rose-500 font-black text-lg uppercase tracking-widest active:scale-95 transition-all shadow-2xl shadow-rose-900/10"
           >
              <LogOut className="w-6 h-6" />
              Đăng xuất ngay
           </button>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-6">{title}</h3>
);

const SettingsItem = ({ icon, label, value, onClick }: { icon: any, label: string, value?: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between px-7 py-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none group text-left"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[15px] font-black text-slate-200 italic tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-3">
       {value && <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{value}</span>}
       <ChevronRight className="w-5 h-5 text-slate-700" />
    </div>
  </button>
);

const ToggleItem = ({ icon, label, enabled, onToggle }: { icon: any, label: string, enabled: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between px-7 py-6 border-b border-white/5 last:border-none">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5">
        {icon}
      </div>
      <span className="text-[15px] font-black text-slate-200 italic tracking-tight">{label}</span>
    </div>
    <button 
      onClick={onToggle}
      className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${enabled ? 'bg-blue-600' : 'bg-slate-700'}`}
    >
       <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default SettingsScreen;
