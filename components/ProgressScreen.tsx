
import React from 'react';
import { 
  Trophy, Flame, Zap, Clock, Calendar, 
  BarChart3, Award, ChevronRight, Activity, 
  Target, TrendingUp, Users, ArrowUpRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface ProgressScreenProps {
  onCourseClick: (courseId: string) => void;
  onAchievementsClick: () => void;
  onLeaderboardClick: () => void;
}

const WEEKLY_DATA = [
  { day: 'T2', mins: 45 },
  { day: 'T3', mins: 120 },
  { day: 'T4', mins: 30 },
  { day: 'T5', mins: 90 },
  { day: 'T6', mins: 150 },
  { day: 'T7', mins: 60 },
  { day: 'CN', mins: 40 },
];

const ACTIVE_COURSES = [
  { id: '1', title: 'UI/UX Masterclass', progress: 65, color: 'bg-blue-500', totalLessons: 24, completed: 15 },
  { id: '2', title: 'React Pro Patterns', progress: 32, color: 'bg-emerald-500', totalLessons: 48, completed: 15 },
  { id: '3', title: 'Figma Auto Layout', progress: 90, color: 'bg-indigo-500', totalLessons: 12, completed: 11 },
];

const RECENT_ACTIVITY = [
  { id: 'a1', title: 'Hoàn thành bài tập Layout', time: '2 giờ trước', type: 'exercise', icon: <Target className="w-4 h-4" /> },
  { id: 'a2', title: 'Học bài: Typography Basics', time: '5 giờ trước', type: 'lesson', icon: <Clock className="w-4 h-4" /> },
  { id: 'a3', title: 'Đạt chuỗi học tập 7 ngày', time: 'Hôm qua', type: 'milestone', icon: <Flame className="w-4 h-4" /> },
];

const ProgressScreen: React.FC<ProgressScreenProps> = ({ 
  onCourseClick, 
  onAchievementsClick, 
  onLeaderboardClick 
}) => {
  return (
    <div className="flex flex-col bg-[#0F172A] min-h-full pb-40">
      <div className="p-6 space-y-8 animate-in fade-in duration-700">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white tracking-tight leading-none italic">Tiến độ</h2>
            <p className="text-slate-400 text-sm font-medium">Báo cáo học tập tuần này</p>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <QuickStat icon={<Flame className="text-orange-500 fill-orange-500" />} label="Chuỗi" value="7 Ngày" />
          <QuickStat icon={<Zap className="text-blue-500 fill-blue-500" />} label="XP" value="2.4k" />
          <QuickStat icon={<Trophy className="text-amber-500 fill-amber-500" />} label="Hạng" value="#12" />
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-[#1E293B] border border-white/5 rounded-[40px] p-6 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-blue-500">
                <BarChart3 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Thời gian học</span>
              </div>
              <h3 className="text-xl font-black text-white italic">Trung bình 76p/ngày</h3>
            </div>
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1.5 rounded-xl flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black italic">+12%</span>
            </div>
          </div>

          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_DATA}>
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#0F172A] border border-white/10 p-2 rounded-xl text-[10px] font-black text-white">
                          {payload[0].value} phút
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="mins" radius={[8, 8, 8, 8]}>
                  {WEEKLY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? '#3b82f6' : '#1e293b'} stroke={index === 4 ? 'none' : 'rgba(255,255,255,0.1)'} strokeWidth={1} />
                  ))}
                </Bar>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800 }} dy={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Progress List */}
        <div className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-white tracking-tight text-lg italic">Khóa học đang học</h3>
            <button className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Tất cả</button>
          </div>
          <div className="space-y-4">
            {ACTIVE_COURSES.map(course => (
              <div 
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] flex flex-col gap-4 active:scale-[0.98] transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{course.title}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{course.completed}/{course.totalLessons} Bài học đã học</p>
                  </div>
                  <span className="text-xl font-black text-white italic">{course.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${course.color} transition-all duration-1000`} style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement & Leaderboard Shortcuts */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={onAchievementsClick}
            className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] space-y-3 cursor-pointer active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-tight">Thành tựu</h4>
              <p className="text-[9px] font-bold text-slate-500">12/32 Đã nhận</p>
            </div>
          </div>
          <div 
            onClick={onLeaderboardClick}
            className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] space-y-3 cursor-pointer active:scale-95 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-tight">Bảng xếp hạng</h4>
              <p className="text-[9px] font-bold text-slate-500">Hạng 12 tuần này</p>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="space-y-5">
          <h3 className="font-black text-white tracking-tight text-lg italic px-1">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((act, i) => (
              <div key={act.id} className="relative pl-8">
                {i !== RECENT_ACTIVITY.length - 1 && (
                  <div className="absolute left-[15px] top-10 bottom-[-16px] w-0.5 bg-slate-800" />
                )}
                <div className="absolute left-0 top-1.5 w-[32px] h-[32px] bg-[#1E293B] border border-white/5 rounded-full flex items-center justify-center text-blue-500 shadow-xl z-10">
                  {act.icon}
                </div>
                <div className="bg-[#1E293B]/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-colors">
                  <div>
                    <h5 className="text-xs font-black text-slate-200 tracking-tight">{act.title}</h5>
                    <p className="text-[9px] font-bold text-slate-600 uppercase mt-0.5 tracking-widest">{act.time}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const QuickStat = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="bg-[#1E293B] border border-white/5 p-5 rounded-[32px] flex flex-col items-center gap-2 shadow-xl">
    <div className="p-2.5 bg-white/5 rounded-2xl mb-1">{icon}</div>
    <div className="text-center">
      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-sm font-black text-white italic leading-none">{value}</p>
    </div>
  </div>
);

export default ProgressScreen;
