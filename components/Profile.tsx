
import React from 'react';
import { Settings, Shield, BadgeCheck, LogOut, ChevronRight, Award, Flame, Zap, Trophy } from 'lucide-react';

interface ProfileProps {
  user: {
    name: string;
    avatar: string;
    level: number;
    xp: number;
  };
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="p-6 space-y-10 bg-[#0F172A] min-h-full pb-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center py-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-600 blur-[40px] opacity-20 rounded-full scale-150"></div>
          <img src={user.avatar} alt={user.name} className="relative w-32 h-32 rounded-[48px] border-4 border-white/10 shadow-2xl" />
          <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-2xl border-4 border-[#0F172A] shadow-lg">
            <BadgeCheck className="w-5 h-5" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-2">{user.name}</h2>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 mb-6">
          <Zap className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Level {user.level} Designer</span>
        </div>
        
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <span>Tiến độ Level {user.level + 1}</span>
            <span className="text-blue-400">{user.xp} / 3000 XP</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" style={{ width: '75%' }} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1E293B] p-5 rounded-[32px] border border-white/5 flex flex-col gap-2">
          <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
          <p className="text-2xl font-black text-white">7 Ngày</p>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Chuỗi hiện tại</p>
        </div>
        <div className="bg-[#1E293B] p-5 rounded-[32px] border border-white/5 flex flex-col gap-2">
          <Trophy className="w-6 h-6 text-amber-500 fill-amber-500" />
          <p className="text-2xl font-black text-white">12 Cúp</p>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Thành tựu</p>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-[#1E293B] rounded-[40px] border border-white/5 overflow-hidden shadow-xl">
        <MenuButton icon={<Award className="text-blue-400" />} label="Lịch sử học tập" />
        <MenuButton icon={<Shield className="text-emerald-400" />} label="Bảo mật tài khoản" />
        <MenuButton icon={<Settings className="text-slate-400" />} label="Cài đặt ứng dụng" />
        <MenuButton icon={<LogOut className="text-rose-500" />} label="Đăng xuất" isDanger onClick={onLogout} />
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, isDanger = false, onClick }: { icon: any, label: string, isDanger?: boolean, onClick?: () => void }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none group">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={`text-[15px] font-black tracking-tight ${isDanger ? 'text-rose-500' : 'text-slate-200'}`}>{label}</span>
    </div>
    {!isDanger && <ChevronRight className="w-5 h-5 text-slate-600" />}
  </button>
);

export default Profile;
