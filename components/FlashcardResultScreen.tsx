
import React from 'react';
import { Trophy, Home, RefreshCcw, Share2, Star, Target, Zap, ChevronRight } from 'lucide-react';

interface FlashcardResultScreenProps {
  stats: { again: number; hard: number; good: number; easy: number };
  onRetry: () => void;
  onGoHome: () => void;
}

const FlashcardResultScreen: React.FC<FlashcardResultScreenProps> = ({ stats, onRetry, onGoHome }) => {
  const total = stats.again + stats.hard + stats.good + stats.easy;
  const mastered = stats.good + stats.easy;
  const score = Math.round((mastered / total) * 100) || 0;

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in zoom-in-95 duration-500 overflow-y-auto scrollbar-none pb-32">
      <div className="p-8 flex flex-col items-center text-center pt-20">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 scale-150 animate-pulse" />
          <div className="w-44 h-44 rounded-[56px] bg-[#1E293B] border border-white/5 flex flex-col items-center justify-center relative shadow-2xl">
            <div className="absolute top-[-20px] bg-amber-500 text-white px-6 py-2 rounded-2xl shadow-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">Mastered</span>
            </div>
            <span className="text-6xl font-black italic tracking-tighter tabular-nums">{score}%</span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Độ thuộc bài</span>
          </div>
        </div>

        <h2 className="text-3xl font-black italic tracking-tight mb-4">Hoàn thành phiên học!</h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[280px] mb-10">
          Bạn đã ôn tập tổng cộng {total} thẻ. Trí nhớ của bạn đang được củng cố rất tốt!
        </p>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 gap-4 w-full mb-12">
          <SmallStat color="text-emerald-500" bg="bg-emerald-500/10" label="Dễ" value={stats.easy} />
          <SmallStat color="text-blue-500" bg="bg-blue-500/10" label="Tốt" value={stats.good} />
          <SmallStat color="text-amber-500" bg="bg-amber-500/10" label="Khó" value={stats.hard} />
          <SmallStat color="text-rose-500" bg="bg-rose-500/10" label="Học lại" value={stats.again} />
        </div>

        {/* Main Actions */}
        <div className="w-full space-y-4">
          <button 
            onClick={onRetry}
            className="w-full py-5 bg-white text-[#0F172A] rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all group"
          >
            Tiếp tục ôn luyện <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={onGoHome}
              className="py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 transition-all"
            >
              <Home className="w-4 h-4" /> Trang chủ
            </button>
            <button 
              className="py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-xs text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4" /> Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmallStat = ({ color, bg, label, value }: { color: string; bg: string; label: string; value: number }) => (
  <div className={`${bg} border border-white/5 p-4 rounded-[28px] flex items-center justify-between px-6`}>
    <span className={`text-[10px] font-black uppercase tracking-widest ${color}`}>{label}</span>
    <span className="text-xl font-black text-white italic">{value}</span>
  </div>
);

export default FlashcardResultScreen;
