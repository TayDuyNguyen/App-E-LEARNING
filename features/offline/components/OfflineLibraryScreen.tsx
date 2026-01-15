
import React, { useState } from 'react';
import { 
  ArrowLeft, HardDrive, Trash2, Play, Settings, 
  Wifi, ChevronRight, Info, CheckCircle2, AlertCircle,
  Download, Filter, Database, Zap, Monitor
} from 'lucide-react';
import { MOCK_COURSES } from '../../../data/mockData';

interface OfflineLibraryScreenProps {
  onBack: () => void;
  onPlayCourse: (courseId: string) => void;
}

const OfflineLibraryScreen: React.FC<OfflineLibraryScreenProps> = ({ onBack, onPlayCourse }) => {
  const [quality, setQuality] = useState('720p');
  const [onlyWifi, setOnlyWifi] = useState(true);

  // Giả lập dữ liệu tải xuống
  const downloadedCourses = [
    { ...MOCK_COURSES[0], size: '450 MB', expiry: 'Còn 25 ngày' },
    { ...MOCK_COURSES[1], size: '1.2 GB', expiry: 'Còn 12 ngày' }
  ];

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
              <h2 className="text-xl font-black italic tracking-tight">Thư viện ngoại tuyến</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Học tập không cần mạng</p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
             <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Storage Stats */}
        <div className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                    <Database className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Bộ nhớ ứng dụng</p>
                    <p className="text-sm font-black text-white italic">Đã dùng 1.65 GB / 5 GB</p>
                 </div>
              </div>
              <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Dọn dẹp</button>
           </div>
           <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" style={{ width: '33%' }} />
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-10 pb-32">
        
        {/* Download Queue (Active) */}
        <section className="space-y-4">
           <SectionTitle title="Đang tải xuống" />
           <div className="bg-[#1E293B] border border-blue-500/20 rounded-[32px] p-6 flex gap-4 animate-pulse">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center">
                 <Download className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                 <h4 className="text-sm font-black text-white italic truncate">Prompt Engineering Basics</h4>
                 <div className="flex items-center justify-between mt-2">
                    <span className="text-[9px] font-bold text-slate-500">45% • 1.2 MB/s</span>
                    <span className="text-[9px] font-bold text-blue-400">120MB còn lại</span>
                 </div>
                 <div className="h-1 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '45%' }} />
                 </div>
              </div>
           </div>
        </section>

        {/* Downloaded Content */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <SectionTitle title="Khóa học đã tải" />
              <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Sắp xếp</button>
           </div>
           <div className="space-y-4">
              {downloadedCourses.map(course => (
                <div key={course.id} className="bg-[#1E293B] border border-white/5 rounded-[32px] overflow-hidden group">
                   <div className="p-4 flex gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative">
                         <img src={course.image} className="w-full h-full object-cover opacity-60" alt="" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Play 
                              onClick={() => onPlayCourse(course.id)}
                              className="w-8 h-8 text-white fill-current active:scale-90 transition-transform cursor-pointer" 
                            />
                         </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                         <div>
                            <h4 className="text-sm font-black text-white truncate italic">{course.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="text-[9px] font-black text-slate-500 uppercase">{course.size}</span>
                               <span className="w-1 h-1 bg-slate-700 rounded-full" />
                               <span className="text-[9px] font-bold text-emerald-500 uppercase">{course.expiry}</span>
                            </div>
                         </div>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-emerald-500">
                               <CheckCircle2 className="w-3 h-3" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Sẵn sàng</span>
                            </div>
                            <button className="p-2 text-slate-600 hover:text-rose-500 transition-colors">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Download Settings Section */}
        <section className="space-y-4">
           <SectionTitle title="Cấu hình tải xuống" />
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] overflow-hidden divide-y divide-white/5">
              <SettingItem 
                icon={<Monitor className="text-indigo-400" />} 
                label="Chất lượng Video" 
                value={quality} 
                onClick={() => setQuality(quality === '1080p' ? '720p' : quality === '720p' ? '360p' : '1080p')}
              />
              <div className="flex items-center justify-between px-7 py-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5">
                    <Wifi className="text-blue-400 w-5 h-5" />
                  </div>
                  <span className="text-[15px] font-black text-slate-200 italic tracking-tight">Chỉ tải qua Wi-Fi</span>
                </div>
                <button 
                  onClick={() => setOnlyWifi(!onlyWifi)}
                  className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${onlyWifi ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                   <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${onlyWifi ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
           </div>
        </section>

        {/* Info Box */}
        <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-[32px] flex gap-4">
           <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
           <p className="text-[10px] font-medium text-amber-200/80 leading-relaxed">
             Khóa học tải xuống sẽ tự động hết hạn sau 30 ngày nếu không có kết nối mạng để xác minh quyền sở hữu.
           </p>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-4">{title}</h3>
);

const SettingItem = ({ icon, label, value, onClick }: { icon: any, label: string, value: string, onClick: () => void }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-7 py-6 hover:bg-white/5 transition-colors text-left group">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[15px] font-black text-slate-200 italic tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-3">
       <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{value}</span>
       <ChevronRight className="w-5 h-5 text-slate-700" />
    </div>
  </button>
);

export default OfflineLibraryScreen;
