
import React, { useState } from 'react';
import { 
  ArrowLeft, Users, Target, MessageSquare, 
  Share2, MoreVertical, Send, ShieldCheck,
  Zap, Calendar, Plus, ChevronRight
} from 'lucide-react';
import { StudyGroup } from '../../../types/index';

interface GroupDetailScreenProps {
  group: StudyGroup;
  onBack: () => void;
}

const GroupDetailScreen: React.FC<GroupDetailScreenProps> = ({ group, onBack }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'chat'>('feed');

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      <div className="relative h-64 flex-none">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-blue-900/40 z-0" />
        <img src={group.avatar} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/50 z-10" />
        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <button onClick={onBack} className="p-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="p-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-20 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
              {group.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-black text-slate-300 uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" /> {group.memberCount} Members
            </span>
          </div>
          <h1 className="text-3xl font-black italic tracking-tight text-white leading-tight">
            {group.name}
          </h1>
        </div>
      </div>

      <div className="flex px-6 border-b border-white/5 bg-[#0F172A] sticky top-0 z-30">
        {(['feed', 'members', 'chat'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest relative transition-all ${activeTab === tab ? 'text-blue-500' : 'text-slate-500'}`}
          >
            {tab === 'feed' ? 'Hoạt động' : tab === 'members' ? 'Thành viên' : 'Chat nhóm'}
            {activeTab === tab && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-20">
        {activeTab === 'feed' && (
          <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <div className="bg-gradient-to-br from-emerald-600/20 to-blue-600/10 border border-emerald-500/20 p-8 rounded-[40px] space-y-4 relative overflow-hidden">
               <ShieldCheck className="absolute -right-4 -top-4 w-32 h-32 opacity-5 text-emerald-500" />
               <div className="flex items-center gap-3 text-emerald-400">
                  <Target className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Mục tiêu học tập</span>
               </div>
               <p className="text-xl font-black italic text-white leading-tight">{group.goal}</p>
               <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Tiến độ: 65% Hoàn thành <ChevronRight className="w-3.5 h-3.5" />
               </div>
            </div>

            <div className="space-y-6">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Cập nhật mới</h3>
               {[1, 2].map(i => (
                 <div key={i} className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] flex gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                       <Zap className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="space-y-2">
                       <p className="text-sm font-medium text-slate-300">
                         <span className="font-black text-white italic">Hoàng Minh</span> đã hoàn thành bài thi thử Design System và đạt hạng S!
                       </p>
                       <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">15 phút trước</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'members' && (
           <div className="p-6 space-y-6 animate-in fade-in duration-500">
              <button className="w-full flex items-center justify-center gap-3 py-5 bg-blue-600/10 border border-dashed border-blue-500/30 rounded-3xl text-[11px] font-black text-blue-500 uppercase tracking-widest hover:bg-blue-600/20 transition-all">
                <Plus className="w-4 h-4" /> Mời bạn bè tham gia
              </button>
              <div className="grid gap-4">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className="flex items-center justify-between p-4 bg-[#1E293B] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-4">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} className="w-10 h-10 rounded-xl" alt="" />
                         <div>
                            <h5 className="text-sm font-black text-white italic">Thành viên {i}</h5>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Level {10 + i}</p>
                         </div>
                      </div>
                      <button className="text-slate-600"><ChevronRight className="w-5 h-5" /></button>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {activeTab === 'chat' && (
           <div className="h-[400px] flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                 <MessageSquare className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white italic">Phòng chat đang mở</h4>
                <p className="text-xs text-slate-500 font-medium">Bạn có thể thảo luận trực tiếp cùng mọi người tại đây.</p>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 active:scale-95 transition-all">
                Mở khung chat
              </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetailScreen;
