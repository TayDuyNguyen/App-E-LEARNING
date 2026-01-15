
import React, { useState } from 'react';
import { 
  ArrowLeft, Share2, Star, Clock, Users, 
  BookOpen, CheckCircle2, Play, Lock, 
  ChevronDown, User, Heart, ShieldCheck,
  MessageCircle, ArrowRight
} from 'lucide-react';
import { Course } from '../types';

interface CourseDetailScreenProps {
  course: Course;
  onBack: () => void;
  onEnroll: () => void;
}

const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({ course, onBack, onEnroll }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0F172A] animate-in slide-in-from-right duration-500 pb-40">
      <div className="relative h-72">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        
        <div className="absolute top-6 left-5 right-5 flex justify-between items-center z-20">
          <button 
            onClick={onBack} 
            className="w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`w-10 h-10 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center transition-all active:scale-90 ${isLiked ? 'bg-rose-500/20 text-rose-500 border-rose-500/30' : 'bg-black/40 text-white'}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-10 h-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-6 right-6 text-white z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{course.category}</div>
          </div>
          <h1 className="text-2xl font-black leading-tight mb-3 italic tracking-tight">{course.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {course.rating}
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <img src={course.instructor.avatar} className="w-5 h-5 rounded-full object-cover" />
              <span className="text-[11px] font-bold">{course.instructor.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#0F172A] rounded-t-[40px] -mt-8 relative z-10 px-6 pt-10">
        <div className="flex gap-8 border-b border-white/5 mb-8 overflow-x-auto scrollbar-none whitespace-nowrap">
          {(['overview', 'curriculum', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[11px] font-black uppercase tracking-widest relative transition-all ${
                activeTab === tab ? 'text-blue-500' : 'text-slate-500'
              }`}
            >
              {tab === 'overview' ? 'Tổng quan' : tab === 'curriculum' ? 'Nội dung' : 'Đánh giá'}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              )}
            </button>
          ))}
        </div>

        <div className="pb-10">
          {renderTabContent(activeTab, course, onEnroll)}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-6 z-[60] flex items-center justify-between gap-6 safe-pb">
        <div className="space-y-0.5">
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Giá học</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white">{course.price}</span>
            {course.oldPrice && <span className="text-[10px] font-bold text-slate-600 line-through">{course.oldPrice}</span>}
          </div>
        </div>
        <button 
          onClick={onEnroll}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-base shadow-xl active:scale-95 transition-all"
        >
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

const renderTabContent = (tab: string, course: Course, onSeeAll: () => void) => {
  switch (tab) {
    case 'overview':
      return (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-3 gap-2 p-5 bg-[#1E293B] border border-white/5 rounded-3xl">
            <StatBox icon={<BookOpen className="text-blue-500 w-4 h-4" />} label="Bài học" value="24" />
            <StatBox icon={<Clock className="text-amber-500 w-4 h-4" />} label="Thời lượng" value="12h" />
            <StatBox icon={<Users className="text-emerald-500 w-4 h-4" />} label="Học viên" value="2.4k" />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-black text-white italic">Mô tả</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              {course.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black text-white italic">Lợi ích</h3>
            <div className="space-y-3">
              {(course.outcomes.length > 0 ? course.outcomes : ['Làm chủ Figma', 'Design System']).map((item, i) => (
                <div key={i} className="flex gap-3 items-start text-sm font-bold text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-5 bg-[#1E293B] border border-white/5 rounded-3xl flex items-center gap-4">
            <img src={course.instructor.avatar} className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1">
              <h4 className="font-black text-white text-sm">{course.instructor.name}</h4>
              <p className="text-[9px] font-black text-slate-500 uppercase mt-0.5">{course.instructor.role}</p>
            </div>
            <button className="w-10 h-10 bg-blue-600/10 text-blue-500 rounded-xl flex items-center justify-center border border-blue-500/10">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    case 'curriculum':
      return (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white italic">Lộ trình học</h3>
            <button onClick={onSeeAll} className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Xem toàn bộ</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                  {i === 1 ? <Play className="w-4 h-4 text-blue-500 fill-current" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black text-slate-200">Bài học 0{i}: Nội dung cơ bản</h4>
                  <p className="text-[9px] font-black text-slate-600 uppercase mt-1">12:45 • VIDEO</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={onSeeAll}
            className="w-full py-4 border border-white/5 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
          >
            Xem thêm {course.lessonsCount - 3} bài học <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      );
    case 'reviews':
      return (
        <div className="space-y-6 animate-in fade-in duration-500 text-center py-10">
          <Star className="w-12 h-12 text-slate-800 mx-auto mb-4" />
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Đang tải đánh giá...</p>
        </div>
      );
    default: return null;
  }
};

const StatBox = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
    <div className="text-center">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter leading-none mb-1">{label}</p>
      <p className="text-[11px] font-black text-white leading-none">{value}</p>
    </div>
  </div>
);

export default CourseDetailScreen;
