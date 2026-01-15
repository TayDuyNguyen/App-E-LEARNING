
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Zap, Trophy, Clock, Calendar, 
  ChevronRight, Sparkles, Star, Share2, 
  Flame, CheckCircle2, Lock, History, Gift
} from 'lucide-react';

interface DailyChallengeScreenProps {
  onBack: () => void;
  onStartChallenge: () => void;
}

const DailyChallengeScreen: React.FC<DailyChallengeScreenProps> = ({ onBack, onStartChallenge }) => {
  const [timeLeft, setTimeLeft] = useState('14:24:05');
  const [streakDays] = useState([
    { day: 'T2', status: 'completed' },
    { day: 'T3', status: 'completed' },
    { day: 'T4', status: 'completed' },
    { day: 'T5', status: 'today' },
    { day: 'T6', status: 'locked' },
    { day: 'T7', status: 'locked' },
    { day: 'CN', status: 'locked' },
  ]);

  const history = [
    { id: 1, title: 'Bậc thầy Auto Layout', date: 'Hôm qua', status: 'success', xp: '+100' },
    { id: 2, title: 'Siêu cấp Color Theory', date: '2 ngày trước', status: 'success', xp: '+100' },
    { id: 3, title: 'Thử thách Typography', date: '3 ngày trước', status: 'missed', xp: '0' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight">Thử thách ngày</h2>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-8 pb-32">
        {/* Main Challenge Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
               <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-200" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{timeLeft} còn lại</span>
               </div>
               <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <Star className="w-6 h-6 text-white fill-current" />
               </div>
            </div>

            <div className="space-y-2">
               <p className="text-blue-100 text-[10px] font-black uppercase tracking-[0.2em]">Thử thách hôm nay</p>
               <h3 className="text-3xl font-black italic leading-tight text-white">Chinh phục "Micro-interactions"</h3>
               <p className="text-blue-100/80 text-xs font-medium leading-relaxed">
                 Hoàn thành 5 câu hỏi trắc nghiệm nâng cao về thiết kế chuyển động trong UI.
               </p>
            </div>

            <div className="flex items-center gap-6 pt-2">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Phần thưởng</span>
                  <div className="flex items-center gap-1.5 mt-1">
                     <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                     <span className="text-lg font-black text-white">+250 XP</span>
                  </div>
               </div>
               <div className="w-px h-8 bg-white/20" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Độ khó</span>
                  <span className="text-lg font-black text-white italic mt-1 uppercase">Expert</span>
               </div>
            </div>

            <button 
              onClick={onStartChallenge}
              className="w-full bg-white text-blue-700 py-5 rounded-[28px] font-black text-lg shadow-xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Bắt đầu ngay <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Streak Calendar */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Chuỗi ngày của bạn</h3>
              <div className="flex items-center gap-1 text-orange-500">
                 <Flame className="w-4 h-4 fill-current" />
                 <span className="text-sm font-black italic">7 Ngày</span>
              </div>
           </div>
           <div className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] flex justify-between">
              {streakDays.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                     s.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' :
                     s.status === 'today' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-4 ring-blue-600/20' :
                     'bg-slate-800 text-slate-600 border border-white/5'
                   }`}>
                      {s.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                       s.status === 'locked' ? <Lock className="w-4 h-4" /> :
                       <Star className="w-5 h-5 fill-current" />}
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${s.status === 'today' ? 'text-blue-500' : 'text-slate-500'}`}>{s.day}</span>
                </div>
              ))}
           </div>
        </section>

        {/* Challenge History */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <History className="w-4 h-4 text-slate-500" />
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Lịch sử thử thách</h3>
           </div>
           <div className="space-y-3">
              {history.map(item => (
                <div key={item.id} className="bg-[#1E293B] border border-white/5 p-5 rounded-[28px] flex items-center justify-between group active:scale-[0.98] transition-all">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                         {item.status === 'success' ? <Trophy className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-white italic">{item.title}</h4>
                         <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{item.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className={`text-sm font-black ${item.status === 'success' ? 'text-blue-500' : 'text-slate-700'}`}>{item.xp} XP</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Weekly Bonus Reward */}
        <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-[32px] flex items-center gap-5 relative overflow-hidden">
           <Sparkles className="absolute -right-2 top-2 w-16 h-16 text-amber-500/10" />
           <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-900/20">
              <Gift className="w-7 h-7" />
           </div>
           <div className="flex-1">
              <h4 className="text-sm font-black text-white italic">Mở rương bí ẩn</h4>
              <p className="text-[10px] font-medium text-amber-200/80 leading-relaxed mt-1">
                Hoàn thành chuỗi 7 ngày để nhận rương vật phẩm hiếm!
              </p>
           </div>
           <ChevronRight className="w-5 h-5 text-amber-500" />
        </div>
      </div>
    </div>
  );
};

const XCircle = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);

export default DailyChallengeScreen;
