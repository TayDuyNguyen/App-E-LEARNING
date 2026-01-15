
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Bookmark, Trash2, Share2, 
  ChevronRight, BookOpen, MessageSquare, GraduationCap, 
  PlayCircle, WifiOff, FolderPlus, MoreVertical
} from 'lucide-react';
import { Course, Vocabulary, Discussion, Lesson } from '../../../types/index';
import { MOCK_COURSES, MOCK_VOCABULARY, MOCK_DISCUSSIONS } from '../../../data/mockData';

interface BookmarksScreenProps {
  onBack: () => void;
  onCourseClick: (course: Course) => void;
  onVocabClick: (vocab: Vocabulary) => void;
  onDiscussionClick: (discussion: Discussion) => void;
}

type BookmarkTab = 'courses' | 'lessons' | 'vocabulary' | 'discussions';

const BookmarksScreen: React.FC<BookmarksScreenProps> = ({ 
  onBack, onCourseClick, onVocabClick, onDiscussionClick 
}) => {
  const [activeTab, setActiveTab] = useState<BookmarkTab>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-150"></div>
        <div className="w-24 h-24 rounded-[40px] bg-[#1E293B] border border-white/5 flex items-center justify-center text-slate-700 relative z-10">
          <Bookmark className="w-12 h-12" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-black text-white italic">Chưa có mục nào được lưu</h3>
        <p className="text-slate-500 text-xs font-medium max-w-[240px] mx-auto leading-relaxed">
          Đánh dấu những nội dung bạn yêu thích để xem lại sau này ngay cả khi ngoại tuyến.
        </p>
      </div>
      <button className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/40 active:scale-95 transition-all">
        Khám phá ngay
      </button>
    </div>
  );

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
              <h2 className="text-xl font-black italic tracking-tight">Đã lưu</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bộ sưu tập cá nhân</p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <FolderPlus className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative group mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm trong mục đã lưu..."
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/5 overflow-x-auto scrollbar-none -mx-6 px-6">
          {[
            { id: 'courses', label: 'Khóa học', icon: <GraduationCap className="w-3.5 h-3.5" /> },
            { id: 'lessons', label: 'Bài học', icon: <PlayCircle className="w-3.5 h-3.5" /> },
            { id: 'vocabulary', label: 'Từ vựng', icon: <BookOpen className="w-3.5 h-3.5" /> },
            { id: 'discussions', label: 'Thảo luận', icon: <MessageSquare className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as BookmarkTab)}
              className={`pb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest relative transition-all whitespace-nowrap ${activeTab === tab.id ? 'text-blue-500' : 'text-slate-500'}`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-6 pb-32">
        {activeTab === 'courses' && (
          <div className="space-y-4">
            {MOCK_COURSES.map(course => (
              <div 
                key={course.id}
                onClick={() => onCourseClick(course)}
                className="bg-[#1E293B] border border-white/5 p-4 rounded-[32px] flex gap-4 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-lg">
                  <img src={course.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute top-2 left-2 bg-emerald-500 p-1 rounded-lg shadow-lg">
                    <WifiOff className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-sm font-black text-white italic truncate pr-4">{course.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{course.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                       <button className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                       <button className="p-2 bg-white/5 rounded-xl text-slate-500 hover:text-blue-500 transition-colors"><Share2 className="w-4 h-4" /></button>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div className="space-y-3">
            {MOCK_VOCABULARY.map(vocab => (
              <div 
                key={vocab.id}
                onClick={() => onVocabClick(vocab)}
                className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white italic">{vocab.word}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{vocab.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-2 text-slate-700 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                   <ChevronRight className="w-5 h-5 text-slate-700" />
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'lessons' || activeTab === 'discussions') && renderEmptyState()}
      </div>
    </div>
  );
};

export default BookmarksScreen;
