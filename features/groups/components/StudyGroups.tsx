
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Plus, Users, 
  Target, ChevronRight, Globe, Lock,
  MoreVertical, ShieldCheck, TrendingUp
} from 'lucide-react';
import { StudyGroup } from '../../../types/index';

interface StudyGroupsScreenProps {
  onBack: () => void;
  onGroupClick: (group: StudyGroup) => void;
  onCreateClick: () => void;
}

const MOCK_GROUPS: StudyGroup[] = [
  {
    id: 'g1',
    name: "Cộng đồng Figma Việt Nam",
    description: "Nơi chia sẻ kiến thức, tài liệu và case study về Figma/UI/UX.",
    category: "Design",
    memberCount: 1240,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Figma",
    isJoined: true,
    goal: "Làm chủ Design System trong 3 tháng",
    recentActivity: "Hoàng Minh vừa đăng 1 tài liệu mới"
  },
  {
    id: 'g2',
    name: "React & Next.js Pro",
    description: "Nhóm thảo luận chuyên sâu về Frontend Architecture.",
    category: "Dev",
    memberCount: 850,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=React",
    isJoined: true,
    goal: "Xây dựng 5 dự án thực tế",
    recentActivity: "3 tin nhắn mới từ hôm qua"
  },
  {
    id: 'g3',
    name: "English for Designers",
    description: "Luyện tiếng Anh chuyên ngành thiết kế mỗi ngày.",
    category: "Language",
    memberCount: 2100,
    avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=English",
    isJoined: false,
    goal: "Giao tiếp thành thạo với client quốc tế"
  }
];

const StudyGroupsScreen: React.FC<StudyGroupsScreenProps> = ({ onBack, onGroupClick, onCreateClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'my' | 'discover'>('my');

  const myGroups = MOCK_GROUPS.filter(g => g.isJoined);
  const discoverGroups = MOCK_GROUPS.filter(g => !g.isJoined);

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight">Nhóm học tập</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kết nối cùng cộng đồng</p>
            </div>
          </div>
          <button onClick={onCreateClick} className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-900/40 active:scale-90 transition-transform">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative group mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm kiếm nhóm..."
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex p-1 bg-[#1E293B] rounded-[20px] border border-white/5">
          <button 
            onClick={() => setActiveTab('my')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'my' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Nhóm của tôi
          </button>
          <button 
            onClick={() => setActiveTab('discover')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'discover' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Khám phá
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none pb-32">
        {(activeTab === 'my' ? myGroups : discoverGroups).map((group) => (
          <div 
            key={group.id}
            onClick={() => onGroupClick(group)}
            className="bg-[#1E293B] border border-white/5 rounded-[32px] p-6 space-y-4 active:scale-[0.98] transition-all cursor-pointer group hover:bg-[#253249]"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center border border-white/10 shadow-lg overflow-hidden">
                  <img src={group.avatar} className="w-full h-full object-cover" alt={group.name} />
                </div>
                <div>
                  <h4 className="text-base font-black text-white italic tracking-tight">{group.name}</h4>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[9px] font-black text-blue-500 uppercase tracking-widest">
                      <Users className="w-3.5 h-3.5" /> {group.memberCount} thành viên
                    </span>
                    <span className="w-1 h-1 bg-slate-700 rounded-full" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{group.category}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-slate-500"><MoreVertical className="w-5 h-5" /></button>
            </div>

            <p className="text-xs font-medium text-slate-400 line-clamp-2 leading-relaxed">
              {group.description}
            </p>

            <div className="bg-white/2 border border-white/5 p-4 rounded-2xl flex items-center gap-3">
              <Target className="w-4 h-4 text-emerald-500" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Mục tiêu nhóm</p>
                <p className="text-[11px] font-black text-slate-300 italic">{group.goal}</p>
              </div>
            </div>

            {group.recentActivity && (
              <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-blue-400 italic">
                <TrendingUp className="w-3.5 h-3.5" />
                {group.recentActivity}
              </div>
            )}

            {!group.isJoined && (
              <button className="w-full py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                Tham gia nhóm
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroupsScreen;
