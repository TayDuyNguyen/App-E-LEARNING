
import React, { useState } from 'react';
import { 
  PlayCircle, Trophy, Clock, Flame, Zap, Search, 
  LayoutGrid, Cpu, Palette, Calculator, ChevronRight, 
  BookOpen, Star, RefreshCcw, BookMarked 
} from 'lucide-react';
import { Course } from '../../../types/index';

interface DashboardProps {
  onCourseClick: (course: Course) => void;
  onOpenSearch: () => void;
  onVocabClick: () => void;
}

const CATEGORIES = [
  { name: 'Thiết kế', icon: <Palette className="w-5 h-5" />, color: 'bg-pink-500/10 text-pink-400' },
  { name: 'Lập trình', icon: <Cpu className="w-5 h-5" />, color: 'bg-blue-500/10 text-blue-400' },
  { name: 'Kinh doanh', icon: <LayoutGrid className="w-5 h-5" />, color: 'bg-emerald-500/10 text-emerald-400' },
  { name: 'Toán học', icon: <Calculator className="w-5 h-5" />, color: 'bg-amber-500/10 text-amber-400' },
];

const DUMMY_COURSE: Course = {
  id: 'dummy-1',
  title: "UI/UX Figma Masterclass 2024",
  category: "Thiết kế",
  image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800",
  price: "$49.00",
  oldPrice: "$99.00",
  rating: 4.9,
  reviewCount: 1240,
  progress: 65,
  lessonsCount: 24,
  instructor: {
    name: "Sarah Jenkins",
    role: "Lead UI Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Chuyên gia thiết kế với hơn 10 năm kinh nghiệm."
  },
  description: "Khóa học này sẽ giúp bạn làm chủ Figma từ cơ bản đến nâng cao.",
  outcomes: ["Làm chủ Auto Layout 4.0", "Xây dựng Design System"],
  requirements: ["Kiến thức cơ bản về sử dụng máy tính"],
  curriculum: [],
  reviews: []
};

const Dashboard: React.FC<DashboardProps> = ({ onCourseClick, onOpenSearch, onVocabClick }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="flex flex-col bg-[#0F172A] min-h-full pb-40">
      <div 
        onClick={handleRefresh}
        className={`flex items-center justify-center py-2 transition-all duration-300 overflow-hidden ${isRefreshing ? 'h-12 opacity-100' : 'h-0 opacity-0'}`}
      >
        <RefreshCcw className="w-5 h-5 text-blue-500 animate-spin" />
      </div>

      <div className="p-6 space-y-8 animate-in fade-in duration-700">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Chào Quốc Anh! 👋</h2>
            <p className="text-slate-400 text-sm font-medium">Hôm nay bạn muốn học gì?</p>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-2xl border border-amber-500/20 active:scale-95 transition-transform cursor-pointer shadow-lg shadow-amber-900/10 flex-shrink-0">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span className="text-sm font-black italic">7 Ngày</span>
          </div>
        </div>

        <div className="relative group cursor-pointer" onClick={onOpenSearch}>
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
            <Search className="text-slate-500 w-5 h-5 group-hover:text-blue-500 transition-colors" />
          </div>
          <div className="w-full pl-14 pr-6 py-5 bg-[#1E293B] border border-white/5 rounded-[28px] text-slate-500 font-bold shadow-sm transition-all group-hover:bg-[#253249]">
            Tìm kiếm bài học...
          </div>
        </div>

        <div 
          onClick={onVocabClick}
          className="bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 p-6 rounded-[32px] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-tight leading-none mb-1">Mỗi ngày 5 từ mới</h4>
              <p className="text-[10px] font-bold text-slate-400">Bạn đã học được 120 từ vựng</p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-white group-hover:bg-blue-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] flex flex-col gap-2 relative overflow-hidden group">
            <BookOpen className="w-10 h-10 absolute -right-2 -top-2 opacity-10" />
            <p className="text-2xl font-black text-white leading-none">12</p>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Khóa học</p>
          </div>
          <div className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] flex flex-col gap-2 relative overflow-hidden group">
            <Trophy className="w-10 h-10 absolute -right-2 -top-2 opacity-10" />
            <p className="text-2xl font-black text-white leading-none">2.4k</p>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Điểm XP</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <button key={cat.name} className="flex flex-col items-center gap-2 group">
              <div className={`w-full aspect-square rounded-[22px] ${cat.color} flex items-center justify-center border border-white/5 shadow-inner group-active:scale-90 transition-all`}>
                {cat.icon}
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter text-center line-clamp-1">{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-white tracking-tight text-lg">Đang tiếp tục</h3>
            <button className="text-blue-500 text-xs font-black uppercase tracking-widest flex items-center gap-1">
              Xem hết <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-6 px-6 snap-x snap-mandatory">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                onClick={() => onCourseClick(DUMMY_COURSE)}
                className="min-w-[280px] flex-shrink-0 snap-start bg-[#1E293B] border border-white/5 p-4 rounded-[28px] shadow-lg flex items-center gap-4 active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                  <PlayCircle className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-slate-100 mb-2 truncate uppercase tracking-tight">UI/UX Masterclass</h4>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all" style={{ width: i === 1 ? '65%' : '32%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
