
import React, { useState } from 'react';
import { 
  ArrowLeft, Trophy, Crown, Medal, UserPlus, 
  Share2, ChevronRight, Search, Zap, Flame, 
  Users, Globe, TrendingUp
} from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  score: string;
  trend: 'up' | 'down' | 'stable';
  isCurrentUser?: boolean;
}

interface LeaderboardScreenProps {
  onBack: () => void;
  onUserClick: (userId: string) => void;
}

const TIME_FILTERS = ["Tuần này", "Tháng này", "Tất cả"];

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Hoàng Minh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang", score: "12,450", trend: 'stable' },
  { rank: 2, name: "Thanh Trúc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Truc", score: "10,200", trend: 'up' },
  { rank: 3, name: "Duy Nam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam", score: "9,850", trend: 'down' },
  { rank: 4, name: "Lan Anh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lan", score: "8,900", trend: 'up' },
  { rank: 5, name: "Quốc Anh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuocAnh", score: "2,450", trend: 'up', isCurrentUser: true },
  { rank: 6, name: "Minh Tú", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tu", score: "7,100", trend: 'stable' },
  { rank: 7, name: "Ngọc Mai", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai", score: "6,800", trend: 'down' },
  { rank: 8, name: "Thế Vinh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vinh", score: "5,200", trend: 'up' },
];

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack, onUserClick }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'friends'>('global');
  const [activeFilter, setActiveFilter] = useState("Tuần này");

  const topThree = MOCK_LEADERBOARD.slice(0, 3);
  const remainingUsers = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight">Bảng xếp hạng</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Bạn đang đứng thứ #12
              </p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Global/Friends Toggle */}
        <div className="flex p-1 bg-[#1E293B] rounded-[20px] mb-5 border border-white/5">
          <button 
            onClick={() => setActiveTab('global')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'global' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            <Globe className="w-3.5 h-3.5" /> Toàn cầu
          </button>
          <button 
            onClick={() => setActiveTab('friends')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[16px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'friends' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500'}`}
          >
            <Users className="w-3.5 h-3.5" /> Bạn bè
          </button>
        </div>

        {/* Time Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {TIME_FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl whitespace-nowrap text-[9px] font-black uppercase tracking-widest transition-all ${
                activeFilter === filter 
                ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                : 'bg-white/5 text-slate-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-40">
        {/* Podium Section */}
        <div className="relative pt-10 pb-8 px-6 bg-gradient-to-b from-blue-900/20 to-transparent">
          <div className="flex justify-center items-end gap-2 h-64">
            {/* Rank 2 */}
            <div className="flex flex-col items-center gap-4 w-1/3 animate-in slide-in-from-bottom duration-700 delay-100">
              <div className="relative">
                <img src={topThree[1].avatar} className="w-16 h-16 rounded-[24px] border-4 border-slate-400 shadow-xl" alt="Rank 2" />
                <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-slate-400 rounded-full flex items-center justify-center text-slate-900 font-black text-xs border-2 border-[#0F172A]">2</div>
              </div>
              <div className="text-center h-24 w-full bg-[#1E293B]/60 backdrop-blur-md rounded-t-3xl border border-white/5 pt-4">
                <p className="text-[10px] font-black text-white truncate px-2">{topThree[1].name}</p>
                <p className="text-[9px] font-bold text-blue-400">{topThree[1].score} XP</p>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="flex flex-col items-center gap-4 w-1/3 animate-in slide-in-from-bottom duration-1000">
              <div className="relative mb-2">
                <Crown className="w-8 h-8 text-amber-500 fill-amber-500 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                <img src={topThree[0].avatar} className="w-20 h-20 rounded-[32px] border-4 border-amber-500 shadow-2xl" alt="Rank 1" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-[#0F172A] font-black text-sm border-2 border-[#0F172A]">1</div>
              </div>
              <div className="text-center h-32 w-full bg-gradient-to-t from-blue-600/40 to-indigo-600/40 backdrop-blur-md rounded-t-[32px] border border-white/10 pt-6">
                <p className="text-xs font-black text-white truncate px-2 uppercase tracking-tighter">{topThree[0].name}</p>
                <p className="text-[10px] font-black text-amber-400 mt-1">{topThree[0].score} XP</p>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="flex flex-col items-center gap-4 w-1/3 animate-in slide-in-from-bottom duration-700 delay-200">
              <div className="relative">
                <img src={topThree[2].avatar} className="w-14 h-14 rounded-[20px] border-4 border-amber-700 shadow-lg" alt="Rank 3" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center text-white font-black text-[10px] border-2 border-[#0F172A]">3</div>
              </div>
              <div className="text-center h-20 w-full bg-[#1E293B]/40 backdrop-blur-md rounded-t-2xl border border-white/5 pt-3">
                <p className="text-[9px] font-black text-white truncate px-2">{topThree[2].name}</p>
                <p className="text-[8px] font-bold text-blue-400">{topThree[2].score} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="px-6 space-y-3">
          {remainingUsers.map((user) => (
            <div 
              key={user.rank}
              onClick={() => onUserClick(user.name)}
              className={`flex items-center justify-between p-5 rounded-[28px] border transition-all active:scale-[0.98] cursor-pointer ${user.isCurrentUser ? 'bg-blue-600/20 border-blue-500/30 shadow-lg' : 'bg-[#1E293B] border-white/5'}`}
            >
              <div className="flex items-center gap-5">
                <span className={`text-sm font-black italic w-6 text-center ${user.isCurrentUser ? 'text-blue-400' : 'text-slate-600'}`}>{user.rank}</span>
                <img src={user.avatar} className="w-11 h-11 rounded-2xl border border-white/10" alt={user.name} />
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-white truncate flex items-center gap-2">
                    {user.name}
                    {user.isCurrentUser && <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">Bạn</span>}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    {user.trend === 'up' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : <TrendingUp className="w-3 h-3 text-rose-500 rotate-180" />}
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.trend === 'up' ? 'Đang tăng' : 'Đang giảm'}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-white italic">{user.score}</p>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Rank - Only if not in top list */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-6 z-40">
        <div className="bg-blue-600 rounded-[32px] p-5 flex items-center justify-between shadow-2xl shadow-blue-900/40 border border-blue-400/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-black text-xs">12</div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=QuocAnh" className="w-10 h-10 rounded-xl border-2 border-white/20" alt="Me" />
            <div>
              <p className="text-xs font-black text-white uppercase tracking-tight">Thứ hạng của bạn</p>
              <p className="text-[10px] font-bold text-blue-200">Cách hạng 11: 450 XP</p>
            </div>
          </div>
          <button className="p-3 bg-white/10 rounded-xl text-white">
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
