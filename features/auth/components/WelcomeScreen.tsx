
import React, { useState } from 'react';
import { ChevronRight, BrainCircuit, Rocket, Trophy } from 'lucide-react';

const SLIDES = [
  {
    icon: <BrainCircuit className="w-20 h-20 text-blue-500" />,
    title: "Gia sư AI Lumina",
    description: "Giải đáp mọi thắc mắc học thuật tức thì với sức mạnh từ Gemini 3 Pro."
  },
  {
    icon: <Rocket className="w-20 h-20 text-indigo-500" />,
    title: "Học tập Tăng tốc",
    description: "Lộ trình cá nhân hóa giúp bạn nắm bắt kiến thức nhanh gấp 2 lần bình thường."
  },
  {
    icon: <Trophy className="w-20 h-20 text-amber-500" />,
    title: "Chinh phục Đỉnh cao",
    description: "Kiếm XP, tích lũy chuỗi ngày học và thăng hạng trên bảng vàng thành tích."
  }
];

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onGetStarted();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0F172A] relative overflow-hidden">
      {/* Top Skip Button */}
      <div className="flex justify-end p-6 flex-none">
        <button 
          onClick={onGetStarted}
          className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors py-2 px-4 bg-white/5 rounded-full"
        >
          Bỏ qua
        </button>
      </div>

      {/* Main Content Area - Scrollable if content exceeds height */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 py-4 overflow-y-auto scrollbar-none">
        <div className="relative mb-10 shrink-0">
          <div className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full scale-150"></div>
          <div className="relative bg-[#1E293B] p-10 rounded-[56px] border border-white/5 shadow-2xl animate-in zoom-in duration-700">
            {SLIDES[currentSlide].icon}
          </div>
        </div>

        <div className="space-y-4 max-w-[320px] mb-8 shrink-0">
          <h2 className="text-3xl font-black text-white tracking-tight leading-tight italic">
            {SLIDES[currentSlide].title}
          </h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            {SLIDES[currentSlide].description}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex gap-3 mb-6 shrink-0">
          {SLIDES.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 shadow-lg ${
                currentSlide === idx ? 'w-10 bg-blue-600' : 'w-2 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer Button Area - Fixed at bottom */}
      <div className="p-8 pb-12 flex-none safe-pb">
        <button 
          onClick={nextSlide}
          className="w-full bg-white text-[#0F172A] py-5 rounded-[32px] font-black text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all group"
        >
          {currentSlide === SLIDES.length - 1 ? 'Khám phá ngay' : 'Tiếp theo'}
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
