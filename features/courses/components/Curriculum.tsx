
import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronDown, ChevronUp, Play, Lock, 
  CheckCircle2, Download, Video, FileText, HelpCircle,
  MoreVertical, BookOpen, Clock
} from 'lucide-react';
import { Course, Module, Lesson } from '../../../types/index';

interface CurriculumScreenProps {
  course: Course;
  onBack: () => void;
  onLessonSelect: (lesson: Lesson) => void;
}

const MOCK_MODULES: Module[] = [
  {
    id: 'm1',
    title: 'Phần 1: Giới thiệu & Cài đặt',
    lessons: [
      { id: 'l1', title: 'Chào mừng bạn đến với khóa học', duration: '05:20', isLocked: false, type: 'video', isCompleted: true },
      { id: 'l2', title: 'Cài đặt môi trường làm việc chuyên nghiệp', duration: '12:45', isLocked: false, type: 'video', isCompleted: true },
      { id: 'l3', title: 'Tài liệu hướng dẫn cài đặt (PDF)', duration: '20 trang', isLocked: false, type: 'reading', isCompleted: false },
    ]
  },
  {
    id: 'm2',
    title: 'Phần 2: Tư duy Thiết kế & Layout',
    lessons: [
      { id: 'l4', title: 'Nguyên lý Visual Hierarchy', duration: '18:10', isLocked: false, type: 'video', isCompleted: false },
      { id: 'l5', title: 'Làm chủ Auto Layout 4.0', duration: '25:30', isLocked: false, type: 'video', isCompleted: false },
      { id: 'l6', title: 'Bài kiểm tra kiến thức Layout', duration: '10 câu', isLocked: false, type: 'quiz', isCompleted: false },
    ]
  },
  {
    id: 'm3',
    title: 'Phần 3: Design System Nâng cao',
    lessons: [
      { id: 'l7', title: 'Xây dựng bảng màu động', duration: '14:20', isLocked: true, type: 'video', isCompleted: false },
      { id: 'l8', title: 'Typography System cho dự án lớn', duration: '22:15', isLocked: true, type: 'video', isCompleted: false },
    ]
  }
];

const CurriculumScreen: React.FC<CurriculumScreenProps> = ({ course, onBack, onLessonSelect }) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1', 'm2']);
  const modules = course.modules || MOCK_MODULES;

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'reading': return <FileText className="w-4 h-4" />;
      case 'quiz': return <HelpCircle className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-20">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-300 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-black text-white italic truncate leading-tight">Chương trình học</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{course.title}</p>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-300">
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none pb-12">
        {/* Course Progress Section */}
        <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/20 p-6 rounded-[32px] space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Tiến độ tổng quát</p>
              <h3 className="text-2xl font-black text-white italic">Hoàn thành {course.progress}%</h3>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400">12/24 bài học</p>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden shadow-inner border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" 
              style={{ width: `${course.progress}%` }} 
            />
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Danh sách bài học</h3>
          {modules.map((module) => {
            const isExpanded = expandedModules.includes(module.id);
            return (
              <div key={module.id} className="bg-[#1E293B] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/2 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-sm font-black text-white tracking-tight truncate">{module.title}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">{module.lessons.length} Bài học • 45 phút</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                    {module.lessons.map((lesson) => (
                      <div 
                        key={lesson.id}
                        onClick={() => !lesson.isLocked && onLessonSelect(lesson)}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer ${
                          lesson.isLocked ? 'opacity-40 grayscale pointer-events-none' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          lesson.isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {lesson.isLocked ? <Lock className="w-4 h-4" /> : lesson.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : getIcon(lesson.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h5 className={`text-xs font-black truncate tracking-tight ${lesson.isCompleted ? 'text-slate-400' : 'text-slate-200'}`}>
                            {lesson.title}
                          </h5>
                          <div className="flex items-center gap-3 mt-1 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.duration}</span>
                            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                            <span>{lesson.type}</span>
                          </div>
                        </div>

                        {!lesson.isLocked && (
                          <button className="p-2 text-slate-600 hover:text-white transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Continue Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[400px] px-6">
        <button 
          onClick={() => onLessonSelect(modules[0].lessons[0])}
          className="w-full bg-blue-600 text-white py-5 rounded-[28px] font-black text-lg shadow-2xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          Học tiếp bài 04
          <Play className="w-5 h-5 fill-current group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CurriculumScreen;
