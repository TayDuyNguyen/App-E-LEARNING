
import React, { useState } from 'react';
import { 
  Settings, Shield, BadgeCheck, LogOut, 
  ChevronRight, Award, Flame, Zap, Trophy, 
  Edit3, BookOpen, Clock, Heart, HelpCircle, 
  FileCheck, Star, Activity, Sparkles
} from 'lucide-react';

interface ProfileProps {
  user: {
    name: string;
    avatar: string;
    level: number;
    xp: number;
  };
  onLogout: () => void;
  onEditClick: () => void;
}

type ProfileTab = 'courses' | 'achievements' | 'activity' | 'settings';

const ProfileScreen: React.FC<ProfileProps> = ({ user, onLogout, onEditClick }) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('courses');

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white animate-in fade-in duration-500 overflow-y-auto scrollbar-none">
      {/* Profile Header */}
      <div className="p-8 pt-12 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none"></div>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-600 blur-[40px] opacity-20 rounded-full scale-150"></div>
          <div className="relative group">
            <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-[48px] border-4 border-white/10 shadow-2xl group-hover:scale-105 transition-transform" />
            <button 
              onClick={onEditClick}
              className="absolute bottom-0 right-0 p-2.5 bg-blue-600 rounded-2xl border-4 border-[#0F172A] text-white shadow-lg active:scale-90 transition-all z-10"
            >
              <Edit3 className="w-4.5 h-4.5" />
            </button>
          </div>
          <div className="absolute -top-2 -left-2 bg-amber-500 text-white p-1.5 rounded-xl border-4 border-[#0F172A] shadow-lg animate-bounce">
             <Sparkles className="w-3 h-3 fill-current" />
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-black tracking-tight italic">{user.name}</h2>
            <BadgeCheck className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Premium Member • Gold Class</p>
        </div>
        
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
            <span>Tiến độ Level {user.level + 1}</span>
            <span className="text-blue-400">{user.xp} / 3000 XP</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden shadow-inner p-0.5 border border-white/5">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" style={{ width: '75%' }} />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 grid grid-cols-3 gap-3 mb-10">
        <StatItem icon={<BookOpen className="text-blue-500" />} label="Khóa học" value="12" />
        <StatItem icon={<Flame className="text-orange-500" />} label="Chuỗi" value="7 Ngày" />
        <StatItem icon={<Zap className="text-amber-500" />} label="Điểm XP" value="2.4k" />
      </div>

      {/* Tabs Navigation */}
      <div className="px-6 flex gap-8 border-b border-white/5 mb-8 sticky top-0 bg-[#0F172A]/90 backdrop-blur-xl z-20 overflow-x-auto scrollbar-none whitespace-nowrap">
        <TabButton id="courses" label="Khóa học" active={activeTab === 'courses'} onClick={setActiveTab} />
        <TabButton id="achievements" label="Thành tựu" active={activeTab === 'achievements'} onClick={setActiveTab} />
        <TabButton id="activity" label="Hoạt động" active={activeTab === 'activity'} onClick={setActiveTab} />
        <TabButton id="settings" label="Cài đặt" active={activeTab === 'settings'} onClick={setActiveTab} />
      </div>

      {/* Tab Content Area */}
      <div className="px-6 pb-40 min-h-[400px]">
        {activeTab === 'courses' && (
          <div className="space-y-4 animate-in fade-in duration-500">
             <div className="flex items-center justify-between mb-2 px-1">
               <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Đang học gần đây</h3>
               <button className="text-[10px] font-black text-blue-500 uppercase">Tất cả</button>
             </div>
             {[1, 2].map(i => (
               <div key={i} className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer">
                 <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden flex-shrink-0">
                    <img src={`https://images.unsplash.com/photo-${i === 1 ? '1586717791821-3f44a563dc4c' : '1633356122544-f134324a6cee'}?w=200`} className="w-full h-full object-cover opacity-60" alt="" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <h4 className="text-sm font-black text-white truncate italic uppercase tracking-tight">{i === 1 ? 'UI/UX Masterclass' : 'React Pro Patterns'}</h4>
                   <div className="flex items-center gap-2 mt-1.5">
                     <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500" style={{ width: i === 1 ? '65%' : '32%' }} />
                     </div>
                     <span className="text-[9px] font-black text-slate-500">{i === 1 ? '65%' : '32%'}</span>
                   </div>
                 </div>
                 <ChevronRight className="w-5 h-5 text-slate-700" />
               </div>
             ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
            {[
              { label: 'Cú đêm', icon: <Trophy className="text-amber-500" />, level: 'LV.3' },
              { label: 'Siêu tốc', icon: <Zap className="text-blue-500" />, level: 'LV.5' },
              { label: 'Bền bỉ', icon: <Flame className="text-orange-500" />, level: 'LV.2' },
              { label: 'Vô địch', icon: <Star className="text-emerald-500" />, level: 'LV.1' },
            ].map((badge, idx) => (
              <div key={idx} className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 text-center">
                 <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shadow-inner">
                    {React.cloneElement(badge.icon as any, { className: 'w-7 h-7' })}
                 </div>
                 <div>
                    <p className="text-xs font-black text-white uppercase tracking-tight">{badge.label}</p>
                    <span className="text-[9px] font-bold text-slate-500">{badge.level}</span>
                 </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {[1, 2, 3].map(i => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-[15px] top-10 bottom-[-16px] w-0.5 bg-slate-800 last:hidden" />
                <div className="absolute left-0 top-1.5 w-[32px] h-[32px] bg-[#1E293B] border border-white/5 rounded-full flex items-center justify-center text-blue-500 shadow-xl z-10">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="bg-[#1E293B]/40 border border-white/5 p-4 rounded-2xl">
                  <h5 className="text-xs font-black text-slate-200 tracking-tight">Hoàn thành bài tập "Layout Pro"</h5>
                  <p className="text-[9px] font-bold text-slate-600 uppercase mt-1 tracking-widest">{i} ngày trước • +50 XP</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-[#1E293B] rounded-[40px] border border-white/5 overflow-hidden shadow-xl animate-in fade-in duration-500">
            <MenuButton icon={<Shield className="text-emerald-400" />} label="Bảo mật tài khoản" />
            <MenuButton icon={<FileCheck className="text-blue-400" />} label="Chứng chỉ của tôi" />
            <MenuButton icon={<HelpCircle className="text-amber-400" />} label="Trung tâm hỗ trợ" />
            <MenuButton icon={<LogOut className="text-rose-500" />} label="Đăng xuất" isDanger onClick={onLogout} />
          </div>
        )}
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] flex flex-col items-center gap-2 shadow-xl hover:bg-[#253249] transition-colors group">
    <div className="p-2.5 bg-white/5 rounded-2xl mb-1 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <div className="text-center">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-sm font-black text-white italic leading-none">{value}</p>
    </div>
  </div>
);

const TabButton = ({ id, label, active, onClick }: { id: ProfileTab, label: string, active: boolean, onClick: (id: ProfileTab) => void }) => (
  <button
    onClick={() => onClick(id)}
    className={`pb-4 text-[10px] font-black uppercase tracking-widest relative transition-all ${
      active ? 'text-blue-500' : 'text-slate-500'
    }`}
  >
    {label}
    {active && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />}
  </button>
);

const MenuButton = ({ icon, label, isDanger = false, onClick }: { icon: any, label: string, isDanger?: boolean, onClick?: () => void }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-6 py-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none group text-left">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className={`text-[15px] font-black tracking-tight italic ${isDanger ? 'text-rose-500' : 'text-slate-200'}`}>{label}</span>
    </div>
    {!isDanger && <ChevronRight className="w-5 h-5 text-slate-600" />}
  </button>
);

export default ProfileScreen;
