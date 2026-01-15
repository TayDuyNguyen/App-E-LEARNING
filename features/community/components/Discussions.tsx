
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Plus, MessageSquare, 
  ThumbsUp, Pin, TrendingUp, ChevronRight, 
  Filter, MoreHorizontal, User, Calendar
} from 'lucide-react';
import { Discussion } from '../../../types/index';

interface DiscussionsScreenProps {
  onBack: () => void;
  onDiscussionClick: (discussion: Discussion) => void;
  onCreateClick: () => void;
}

const CATEGORIES = ["Tất cả", "UI/UX", "Development", "Q&A", "Career"];

const MOCK_DISCUSSIONS: Discussion[] = [
  {
    id: 'd1',
    title: "Làm thế nào để tối ưu Auto Layout trong Figma 2025?",
    content: "Mình đang gặp khó khăn khi xử lý các component phức tạp có nhiều layer lồng nhau...",
    author: { id: 'u1', name: "Hoàng Minh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang" },
    category: "UI/UX",
    repliesCount: 24,
    likesCount: 156,
    date: "2 giờ trước",
    isPinned: true,
    isTrending: true
  },
  {
    id: 'd2',
    title: "Nên học React hay Flutter trong năm nay?",
    content: "Chào mọi người, mình là newbie đang phân vân giữa web và mobile development...",
    author: { id: 'u2', name: "Thanh Trúc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Truc" },
    category: "Development",
    repliesCount: 42,
    likesCount: 89,
    date: "5 giờ trước",
    isTrending: true
  }
];

const DiscussionsScreen: React.FC<DiscussionsScreenProps> = ({ onBack, onDiscussionClick, onCreateClick }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDiscussions = MOCK_DISCUSSIONS.filter(d => 
    (activeCategory === "Tất cả" || d.category === activeCategory) &&
    (d.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight">Thảo luận</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cộng đồng EduSmart</p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className="relative group mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm kiếm chủ đề thảo luận..."
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-6 px-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white/5 text-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none pb-32">
        {filteredDiscussions.map((discussion) => (
          <div 
            key={discussion.id}
            onClick={() => onDiscussionClick(discussion)}
            className="bg-[#1E293B] border border-white/5 rounded-[32px] p-6 space-y-4 active:scale-[0.98] transition-all cursor-pointer group hover:bg-[#253249]"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img src={discussion.author.avatar} className="w-10 h-10 rounded-xl border border-white/10" alt={discussion.author.name} />
                <div>
                  <h4 className="text-sm font-black text-white italic">{discussion.author.name}</h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{discussion.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {discussion.isPinned && <Pin className="w-4 h-4 text-blue-500 fill-current" />}
                {discussion.isTrending && <TrendingUp className="w-4 h-4 text-rose-500" />}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-black text-white leading-tight tracking-tight group-hover:text-blue-400 transition-colors">
                {discussion.title}
              </h3>
              <p className="text-xs font-medium text-slate-400 line-clamp-2 leading-relaxed">
                {discussion.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-lg uppercase tracking-widest">
                {discussion.category}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black">{discussion.likesCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black">{discussion.repliesCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-6 z-[40]">
        <button 
          onClick={onCreateClick}
          className="bg-blue-600 text-white p-5 rounded-full shadow-2xl shadow-blue-900/40 active:scale-90 transition-all flex items-center justify-center"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default DiscussionsScreen;
