
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Zap, ShieldAlert, Timer, 
  Send, ChevronRight, CheckCircle2, Trophy 
} from 'lucide-react';

interface ChallengeExerciseScreenProps {
  onBack: () => void;
  onFinish: (score: number) => void;
}

const ChallengeExerciseScreen: React.FC<ChallengeExerciseScreenProps> = ({ onBack, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45); // 45s per question
  const [selected, setSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      q: "Trong UI design, 'Micro-interaction' đóng vai trò chính là gì?",
      options: [
        "Tạo ra các hiệu ứng hoạt ảnh lớn để thu hút sự chú ý",
        "Cung cấp phản hồi tức thì cho các hành động nhỏ của người dùng",
        "Thay thế hoàn toàn cấu trúc điều hướng chính",
        "Làm tăng dung lượng tải trang của ứng dụng"
      ],
      correct: 1
    }
  ];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setTimeLeft(45);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0F172A] p-8 text-center space-y-10 animate-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 scale-150" />
          <div className="w-40 h-40 bg-blue-600 rounded-[48px] flex items-center justify-center shadow-2xl relative z-10">
             <Trophy className="w-20 h-20 text-white" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-amber-500 text-white p-3 rounded-2xl border-4 border-[#0F172A] shadow-xl animate-bounce">
             <Zap className="w-6 h-6 fill-current" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-4xl font-black italic tracking-tight">Thành công!</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[260px]">
            Bạn đã vượt qua thử thách cực khó hôm nay. Tiếp tục phát huy nhé!
          </p>
        </div>

        <div className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] w-full max-w-xs space-y-4">
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">XP Nhận được</span>
              <span className="text-xl font-black text-blue-500">+250 XP</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Độ chính xác</span>
              <span className="text-xl font-black text-emerald-500">100%</span>
           </div>
        </div>

        <button 
          onClick={() => onFinish(100)}
          className="w-full max-w-xs py-6 bg-white text-[#0F172A] rounded-[32px] font-black text-lg shadow-xl active:scale-95 transition-all"
        >
          Nhận thưởng & Đóng
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Thử thách ngày</span>
          <div className="flex items-center gap-2">
             <Timer className={`w-4 h-4 ${timeLeft < 10 ? 'text-rose-500 animate-pulse' : 'text-blue-400'}`} />
             <span className={`text-lg font-black italic tabular-nums ${timeLeft < 10 ? 'text-rose-500' : 'text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</span>
          </div>
        </div>
        <div className="w-11" />
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center space-y-10">
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
               <ShieldAlert className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Câu hỏi 1/5</span>
            </div>
            <h3 className="text-2xl font-black text-white leading-tight italic tracking-tight">
               {questions[0].q}
            </h3>
         </div>

         <div className="space-y-4">
            {questions[0].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-6 py-5 rounded-[28px] border transition-all font-bold ${
                  selected === i 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/30' 
                  : 'bg-[#1E293B] border-white/5 text-slate-300 hover:border-blue-500/50'
                }`}
              >
                {opt}
              </button>
            ))}
         </div>
      </div>

      <div className="p-6 safe-pb">
        <button 
          onClick={handleNext}
          disabled={selected === null}
          className="w-full bg-white text-[#0F172A] py-6 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-2xl disabled:opacity-30"
        >
          Tiếp tục <Send className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};

export default ChallengeExerciseScreen;
