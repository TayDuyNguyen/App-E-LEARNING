
import React, { useState } from 'react';
import { 
  Trophy, ArrowLeft, RefreshCcw, Home, 
  ChevronRight, Star, Clock, Target, Share2,
  CheckCircle2, XCircle, Info, ChevronDown, ChevronUp
} from 'lucide-react';
import { Exercise, Question } from '../types';

interface ExerciseResultScreenProps {
  exercise: Exercise;
  score: number;
  userAnswers: Record<string, any>;
  onRetry: () => void;
  onGoHome: () => void;
}

const ExerciseResultScreen: React.FC<ExerciseResultScreenProps> = ({ 
  exercise, 
  score, 
  userAnswers,
  onRetry, 
  onGoHome 
}) => {
  const [showDetailedReview, setShowDetailedReview] = useState(false);

  const getFeedback = (s: number) => {
    if (s >= 90) return { title: "Xuất sắc!", desc: "Bạn đã hoàn toàn làm chủ kiến thức này. Tuyệt vời!", color: "text-amber-400", bg: "bg-amber-400/20" };
    if (s >= 70) return { title: "Làm tốt lắm!", desc: "Bạn có nền tảng tốt, chỉ cần tinh chỉnh thêm vài phần nhỏ.", color: "text-blue-400", bg: "bg-blue-400/20" };
    return { title: "Cần cố gắng!", desc: "Hãy xem lại lý thuyết và thử làm lại lần nữa nhé.", color: "text-rose-400", bg: "bg-rose-400/20" };
  };

  const feedback = getFeedback(score);
  const correctCount = Math.round((score / 100) * exercise.questions.length);

  const getDisplayAnswer = (question: Question, answer: any) => {
    if (answer === undefined || answer === '') return "Chưa trả lời";
    if (question.type === 'multiple_choice' && question.options) {
      return question.options[answer as number];
    }
    return answer.toString();
  };

  const isCorrect = (question: Question, answer: any) => {
    return answer?.toString() === question.correctAnswer?.toString();
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in zoom-in-95 duration-500 overflow-y-auto scrollbar-none pb-32">
      {/* Header */}
      <div className="p-6 flex items-center justify-between sticky top-0 bg-[#0F172A]/90 backdrop-blur-xl z-30">
        <button onClick={onGoHome} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Kết quả bài tập</h2>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="px-8 flex flex-col items-center text-center pt-4">
        {/* Score Visual */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-20 scale-150 animate-pulse" />
          <div className="w-48 h-48 rounded-[56px] bg-[#1E293B] border border-white/5 flex flex-col items-center justify-center relative shadow-2xl">
            <div className={`absolute top-[-15px] ${feedback.bg} ${feedback.color} px-5 py-2 rounded-2xl shadow-xl shadow-black/20 flex items-center gap-2`}>
              <Trophy className="w-5 h-5 fill-current" />
              <span className="text-[10px] font-black uppercase tracking-widest">Rank S</span>
            </div>
            <span className="text-6xl font-black text-white italic tracking-tighter tabular-nums">{score}</span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">Điểm số</span>
          </div>
        </div>

        {/* Feedback Text */}
        <div className="space-y-3 mb-10">
          <h2 className={`text-3xl font-black italic tracking-tight ${feedback.color}`}>{feedback.title}</h2>
          <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-[260px] mx-auto italic">
            "{feedback.desc}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-10">
          <StatCard icon={<Target className="text-blue-500 w-4 h-4" />} label="Chính xác" value={`${correctCount}/${exercise.questions.length}`} />
          <StatCard icon={<Clock className="text-emerald-500 w-4 h-4" />} label="Thời gian" value="08:24" />
          <StatCard icon={<Star className="text-amber-500 w-4 h-4" />} label="XP Nhận" value="+150" />
        </div>

        {/* Detailed Review Toggle */}
        <div className="w-full space-y-4 mb-8">
          <button 
            onClick={() => setShowDetailedReview(!showDetailedReview)}
            className="w-full flex items-center justify-between p-6 bg-[#1E293B] border border-white/5 rounded-3xl group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black text-white tracking-tight">Xem lại đáp án</h4>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Chi tiết từng câu hỏi</p>
              </div>
            </div>
            {showDetailedReview ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
          </button>

          {showDetailedReview && (
            <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
              {exercise.questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const correct = isCorrect(q, userAns);
                
                return (
                  <div key={q.id} className="bg-[#1E293B]/50 border border-white/5 rounded-[32px] p-6 text-left space-y-4">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Câu hỏi {idx + 1}</span>
                        <h5 className="text-sm font-black text-white leading-snug mt-1 italic tracking-tight">{q.text}</h5>
                      </div>
                      {correct ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />}
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] font-black text-slate-500 uppercase mb-1 tracking-widest">Đáp án của bạn</p>
                        <p className={`text-xs font-bold ${correct ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {getDisplayAnswer(q, userAns)}
                        </p>
                      </div>
                      {!correct && (
                        <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                          <p className="text-[8px] font-black text-emerald-500/60 uppercase mb-1 tracking-widest">Đáp án đúng</p>
                          <p className="text-xs font-bold text-emerald-400">
                            {getDisplayAnswer(q, q.correctAnswer)}
                          </p>
                        </div>
                      )}
                    </div>

                    {q.explanation && (
                      <div className="pt-3 border-t border-white/5">
                        <p className="text-[8px] font-black text-blue-500 uppercase mb-1 tracking-widest flex items-center gap-1">
                          <Info className="w-3 h-3" /> Giải thích
                        </p>
                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Main Actions */}
        <div className="w-full space-y-4 pt-4">
          <button 
            onClick={onRetry}
            className="w-full py-5 bg-white/5 border border-white/10 rounded-[28px] font-black text-base text-white flex items-center justify-center gap-3 hover:bg-white/10 active:scale-95 transition-all"
          >
            <RefreshCcw className="w-5 h-5" /> Thử lại bài tập
          </button>
          
          <button 
            onClick={onGoHome}
            className="w-full py-6 bg-blue-600 text-white rounded-[32px] font-black text-lg shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 active:scale-95 transition-all group"
          >
            Tiếp tục học tập <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="bg-[#1E293B] border border-white/5 p-4 rounded-[28px] flex flex-col items-center gap-2">
    <div className="p-2.5 bg-white/5 rounded-2xl">{icon}</div>
    <div className="text-center">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <p className="text-xs font-black text-white">{value}</p>
    </div>
  </div>
);

export default ExerciseResultScreen;
