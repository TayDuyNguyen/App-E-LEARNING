
import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft, X, History, TrendingUp, ChevronRight } from 'lucide-react';
import { Course } from '../types';

interface SearchScreenProps {
  onBack: () => void;
  onCourseClick: (course: Course) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onCourseClick }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const history = ["UI Design", "React Pro", "Python for AI"];
  const hotTopics = ["Figma Masterclass", "Digital Marketing", "Prompt Engineering", "Flutter Flow"];

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] animate-in slide-in-from-bottom duration-300">
      <div className="p-5 flex items-center gap-4 border-b border-white/5">
        <button onClick={onBack} className="p-2 bg-[#1E293B] rounded-xl text-slate-300 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Tìm kiếm khóa học..." 
            className="w-full pl-10 pr-10 py-3 bg-[#1E293B] border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-white placeholder:text-slate-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Tìm kiếm gần đây</h3>
            <button className="text-[10px] font-bold text-blue-500">Xóa tất cả</button>
          </div>
          <div className="space-y-1">
            {history.map(item => (
              <div key={item} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-none group cursor-pointer" onClick={() => setQuery(item)}>
                <History className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-bold text-slate-300 flex-1">{item}</span>
                <ChevronRight className="w-4 h-4 text-slate-700" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
            Chủ đề phổ biến
          </h3>
          <div className="flex flex-wrap gap-2">
            {hotTopics.map(topic => (
              <button 
                key={topic}
                onClick={() => setQuery(topic)}
                className="px-5 py-2.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-black tracking-tight active:scale-95 transition-all border border-blue-500/20"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
