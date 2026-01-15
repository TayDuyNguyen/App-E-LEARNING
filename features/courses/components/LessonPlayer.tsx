
import React, { useState } from 'react';
import { 
  ArrowLeft, Play, Pause, SkipBack, SkipForward, 
  Settings, Download, Bookmark, FileText, Link as LinkIcon, 
  MessageCircle, CheckCircle2, MoreVertical, Maximize, 
  ChevronRight, ChevronLeft, Plus, Clock, Gauge, Monitor
} from 'lucide-react';
import { Course, Lesson, Resource, Note } from '../../../types/index';

interface LessonPlayerScreenProps {
  course: Course;
  onBack: () => void;
}

const MOCK_RESOURCES: Resource[] = [
  { id: 'r1', name: 'Tài liệu hướng dẫn (PDF)', type: 'pdf', url: '#' },
  { id: 'r2', name: 'Mã nguồn ví dụ (Github)', type: 'code', url: '#' },
  { id: 'r3', name: 'Link tham khảo bổ sung', type: 'link', url: '#' },
];

const MOCK_NOTES: Note[] = [
  { id: 'n1', timestamp: '02:15', content: 'Lưu ý về cách sử dụng Auto Layout trong khung hình phức tạp.' },
  { id: 'n2', timestamp: '08:45', content: 'Phím tắt nhanh: Shift + A để tạo Auto Layout.' },
];

const LessonPlayerScreen: React.FC<LessonPlayerScreenProps> = ({ course, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(135); // Giả lập 2:15
  const [duration] = useState(720); // Giả lập 12:00
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [activeTab, setActiveTab] = useState<'details' | 'resources' | 'notes'>('details');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentLesson: Lesson = {
    id: 'l1',
    title: 'Giới thiệu về Design System',
    duration: '12:00',
    type: 'video',
    isLocked: false,
    description: 'Trong bài này, chúng ta sẽ tìm hiểu khái niệm cơ bản về Design System và tại sao nó lại quan trọng trong quy trình làm việc chuyên nghiệp.'
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in zoom-in-95 duration-500 overflow-hidden">
      {/* Video Player Section */}
      <div className="relative w-full aspect-video bg-black group overflow-hidden">
        {/* Placeholder cho Video thực tế */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src={course.image} 
            className="w-full h-full object-cover opacity-40 blur-[2px]" 
            alt="Video preview"
          />
          {!isPlaying && (
            <button 
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-900/40 transform transition-transform active:scale-90 z-20"
            >
              <Play className="w-8 h-8 fill-current text-white" />
            </button>
          )}
        </div>

        {/* Video Overlay Controls */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <div className="flex justify-between items-center">
            <button onClick={onBack} className="p-2.5 bg-white/10 backdrop-blur-xl rounded-2xl">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-2xl">
                <Monitor className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/10 backdrop-blur-xl rounded-2xl">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Timeline */}
            <div className="space-y-1.5">
              <div className="relative h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="text-white/80 hover:text-white"><SkipBack className="w-6 h-6" /></button>
                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                </button>
                <button className="text-white/80 hover:text-white"><SkipForward className="w-6 h-6" /></button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black">
                  <Gauge className="w-3.5 h-3.5" /> {playbackSpeed}x
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black">
                  <Settings className="w-3.5 h-3.5" /> {quality}
                </div>
                <button className="text-white/80 hover:text-white"><Maximize className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-none bg-[#0F172A] rounded-t-[40px] -mt-6 relative z-10 pt-8 px-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Bài 01 • Video</p>
            <h1 className="text-xl font-black italic tracking-tight leading-tight">{currentLesson.title}</h1>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`w-11 h-11 rounded-2xl border border-white/5 flex items-center justify-center transition-all ${isBookmarked ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-white/5 text-slate-400'}`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-11 h-11 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-slate-400">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex gap-6 border-b border-white/5 mb-6 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveTab('details')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest relative ${activeTab === 'details' ? 'text-blue-500' : 'text-slate-500'}`}
          >
            Chi tiết
            {activeTab === 'details' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest relative ${activeTab === 'resources' ? 'text-blue-500' : 'text-slate-500'}`}
          >
            Tài liệu
            {activeTab === 'resources' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            className={`pb-4 text-[10px] font-black uppercase tracking-widest relative ${activeTab === 'notes' ? 'text-blue-500' : 'text-slate-500'}`}
          >
            Ghi chú
            {activeTab === 'notes' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>
        </div>

        {/* Tab Content */}
        <div className="pb-32">
          {activeTab === 'details' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <p className="text-sm font-medium text-slate-400 leading-relaxed">
                {currentLesson.description}
              </p>
              <div className="bg-[#1E293B] border border-white/5 p-5 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Bạn có thắc mắc?</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Hỏi gia sư AI Lumina ngay</p>
                  </div>
                </div>
                <button className="bg-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-900/20">
                  Hỏi AI
                </button>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              {MOCK_RESOURCES.map((res) => (
                <div key={res.id} className="bg-[#1E293B] border border-white/5 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                      {res.type === 'pdf' ? <FileText className="w-5 h-5" /> : res.type === 'link' ? <LinkIcon className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">{res.name}</h4>
                      <p className="text-[9px] font-black text-slate-600 uppercase mt-0.5 tracking-widest">{res.type}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-500 group-hover:text-blue-500"><Download className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <button className="w-full py-4 bg-white/5 border border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/10 transition-colors">
                <Plus className="w-4 h-4" /> Thêm ghi chú mới
              </button>
              {MOCK_NOTES.map((note) => (
                <div key={note.id} className="relative pl-6 border-l-2 border-blue-500/30">
                  <div className="absolute top-0 -left-[5px] w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  <div className="bg-[#1E293B] border border-white/5 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md">{note.timestamp}</span>
                      <button className="text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-6 z-[60] flex flex-col gap-6 safe-pb">
        <div className="flex items-center justify-between gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#1E293B] py-4 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest border border-white/5 active:scale-95 transition-all">
            <ChevronLeft className="w-4 h-4" /> Bài trước
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#1E293B] py-4 rounded-2xl text-[11px] font-black text-slate-400 uppercase tracking-widest border border-white/5 active:scale-95 transition-all">
            Bài tiếp <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <button 
          onClick={() => setIsCompleted(!isCompleted)}
          className={`w-full py-5 rounded-[28px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 ${
            isCompleted 
            ? 'bg-emerald-600 text-white shadow-emerald-900/20' 
            : 'bg-blue-600 text-white shadow-blue-900/40'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : null}
          {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
        </button>
      </div>
    </div>
  );
};

export default LessonPlayerScreen;
