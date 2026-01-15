
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowLeft, X, History, TrendingUp, 
  ChevronRight, Mic, Filter, BookOpen, MessageSquare, 
  User, Sparkles, Star, Play, Ghost, ExternalLink
} from 'lucide-react';
import { Course, Discussion } from '../../types/index';
import { MOCK_COURSES, MOCK_DISCUSSIONS } from '../../data/mockData';

interface SearchScreenProps {
  onBack: () => void;
  onCourseClick?: (course: Course) => void;
  onDiscussionClick?: (discussion: Discussion) => void;
}

type SearchTab = 'all' | 'courses' | 'discussions' | 'people';

const RECENT_SEARCHES = ["UI Design System", "React Pro Patterns", "Figma Auto Layout"];
const TRENDING_TOPICS = [
  { text: "Prompt Engineering", icon: <Sparkles className="w-3 h-3" /> },
  { text: "Flutter Flow 4.0", icon: <TrendingUp className="w-3 h-3" /> },
  { text: "Career Roadmap", icon: <Star className="w-3 h-3" /> },
  { text: "English for IT", icon: <BookOpen className="w-3 h-3" /> }
];

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onCourseClick, onDiscussionClick }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [history, setHistory] = useState(RECENT_SEARCHES);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length > 0) {
      setIsSearching(true);
      if (!history.includes(text)) {
        setHistory([text, ...history.slice(0, 4)]);
      }
    } else {
      setIsSearching(false);
    }
  };

  const clearQuery = () => {
    setQuery('');
    setIsSearching(false);
    inputRef.current?.focus();
  };

  const removeHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    setHistory(history.filter(h => h !== item));
  };

  const renderInitialState = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Recent Searches */}
      {history.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tìm kiếm gần đây</h3>
            <button onClick={() => setHistory([])} className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Xóa hết</button>
          </div>
          <div className="space-y-1">
            {history.map(item => (
              <div 
                key={item} 
                onClick={() => handleSearch(item)}
                className="flex items-center gap-4 py-4 px-2 border-b border-white/5 last:border-none group cursor-pointer hover:bg-white/2 rounded-2xl transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1E293B] flex items-center justify-center text-slate-500 group-hover:text-blue-500">
                  <History className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-300 flex-1">{item}</span>
                <button 
                  onClick={(e) => removeHistoryItem(e, item)}
                  className="p-2 text-slate-700 hover:text-rose-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div className="space-y-5">
        <div className="flex items-center gap-2 px-1">
          <TrendingUp className="w-4 h-4 text-rose-500" />
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Chủ đề xu hướng</h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {TRENDING_TOPICS.map(topic => (
            <button 
              key={topic.text}
              onClick={() => handleSearch(topic.text)}
              className="flex items-center gap-2 px-5 py-3 bg-[#1E293B] hover:bg-[#253249] border border-white/5 rounded-full text-xs font-black tracking-tight active:scale-95 transition-all"
            >
              <span className="text-blue-500">{topic.icon}</span>
              {topic.text}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Discovery */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-[32px] space-y-3 cursor-pointer group hover:bg-blue-600/20 transition-all">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
             <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black italic">Khóa học mới</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Khám phá 12 bài giảng mới</p>
        </div>
        <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-[32px] space-y-3 cursor-pointer group hover:bg-indigo-600/20 transition-all">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
             <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-black italic">Hỏi đáp AI</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Hỏi gia sư Lumina 24/7</p>
        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    // Filter logic simulated here
    const results = {
      courses: MOCK_COURSES.filter(c => c.title.toLowerCase().includes(query.toLowerCase())),
      discussions: MOCK_DISCUSSIONS.filter(d => d.title.toLowerCase().includes(query.toLowerCase())),
      people: [
        { id: 'u1', name: 'Hoàng Minh', role: 'Mentor UI/UX', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang' },
        { id: 'u2', name: 'Thanh Trúc', role: 'Senior Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Truc' },
      ].filter(u => u.name.toLowerCase().includes(query.toLowerCase()))
    };

    const hasResults = results.courses.length > 0 || results.discussions.length > 0 || results.people.length > 0;

    if (!hasResults) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6 animate-in zoom-in-95 duration-500">
           <div className="relative">
             <div className="absolute inset-0 bg-slate-500/5 blur-3xl rounded-full scale-150"></div>
             <Ghost className="w-20 h-20 text-slate-700 relative z-10" />
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-black italic">Không tìm thấy kết quả</h3>
             <p className="text-slate-500 text-xs font-medium max-w-[220px] mx-auto leading-relaxed">
               Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả nhé!
             </p>
           </div>
           <button onClick={clearQuery} className="text-[10px] font-black text-blue-500 uppercase tracking-widest border border-blue-500/20 px-6 py-3 rounded-xl hover:bg-blue-500/5 transition-colors">Thử lại ngay</button>
        </div>
      );
    }

    return (
      <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/5 -mx-6 px-6 sticky top-0 bg-[#0F172A] z-10 pt-2">
          {(['all', 'courses', 'discussions', 'people'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[10px] font-black uppercase tracking-widest relative transition-all ${activeTab === tab ? 'text-blue-500' : 'text-slate-500'}`}
            >
              {tab === 'all' ? 'Tất cả' : tab === 'courses' ? 'Khóa học' : tab === 'discussions' ? 'Thảo luận' : 'Học viên'}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Courses Section */}
        {(activeTab === 'all' || activeTab === 'courses') && results.courses.length > 0 && (
          <section className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Khóa học ({results.courses.length})</h4>
            <div className="space-y-4">
              {results.courses.map(course => (
                <div 
                  key={course.id} 
                  onClick={() => onCourseClick?.(course)}
                  className="bg-[#1E293B] border border-white/5 p-4 rounded-[28px] flex gap-4 active:scale-[0.98] transition-all cursor-pointer group hover:bg-[#253249]"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h5 className="text-sm font-black text-white truncate italic uppercase tracking-tight">{course.title}</h5>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">{course.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                       <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-[10px] font-black">{course.rating}</span>
                       </div>
                       <span className="text-xs font-black text-blue-400">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Discussions Section */}
        {(activeTab === 'all' || activeTab === 'discussions') && results.discussions.length > 0 && (
          <section className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Thảo luận ({results.discussions.length})</h4>
            <div className="space-y-3">
              {results.discussions.map(disc => (
                <div 
                  key={disc.id} 
                  onClick={() => onDiscussionClick?.(disc)}
                  className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] space-y-3 active:scale-[0.98] transition-all cursor-pointer hover:bg-[#253249]"
                >
                  <h5 className="text-sm font-black text-slate-200 tracking-tight leading-tight line-clamp-1 italic">{disc.title}</h5>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <img src={disc.author.avatar} className="w-5 h-5 rounded-full" alt="" />
                       <span className="text-[9px] font-bold text-slate-500 uppercase">{disc.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                       <MessageSquare className="w-3 h-3" />
                       <span className="text-[9px] font-black">{disc.repliesCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* People Section */}
        {(activeTab === 'all' || activeTab === 'people') && results.people.length > 0 && (
          <section className="space-y-4 pb-10">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Mọi người ({results.people.length})</h4>
            <div className="grid grid-cols-2 gap-3">
              {results.people.map(person => (
                <div key={person.id} className="bg-[#1E293B] border border-white/5 p-4 rounded-[32px] flex flex-col items-center text-center gap-3 active:scale-95 transition-all cursor-pointer">
                  <img src={person.avatar} className="w-14 h-14 rounded-2xl border-2 border-white/5" alt="" />
                  <div>
                    <h5 className="text-xs font-black text-white italic tracking-tight">{person.name}</h5>
                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] animate-in slide-in-from-bottom duration-300 overflow-hidden">
      {/* Search Bar Header */}
      <div className="p-6 pb-4 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-[#1E293B] rounded-2xl text-slate-300 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Tìm kiếm mọi thứ..." 
              className="w-full pl-11 pr-11 py-4 bg-[#1E293B] border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500/20 text-sm font-bold text-white placeholder:text-slate-600 transition-all outline-none"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            />
            {query ? (
              <button 
                onClick={clearQuery} 
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-blue-500 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button className="p-3.5 bg-white/5 rounded-2xl text-slate-400">
             <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-none pb-32">
        {isSearching ? renderResults() : renderInitialState()}
      </div>
    </div>
  );
};

export default SearchScreen;
