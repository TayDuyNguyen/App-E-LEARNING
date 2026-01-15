
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
    <div className="flex-1 flex flex-col p-8 bg-[#0F172A] relative overflow-hidden">
      <div className="flex justify-end pt-4">
        <button 
          onClick={onGetStarted}
          className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          Bỏ qua
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full scale-150"></div>
          <div className="relative bg-[#1E293B] p-12 rounded-[56px] border border-white/5 shadow-2xl animate-in zoom-in duration-700">
            {SLIDES[currentSlide].icon}
          </div>
        </div>

        <div className="space-y-5 max-w-[320px]">
          <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
            {SLIDES[currentSlide].title}
          </h2>
          <p className="text-slate-400 text-base font-medium leading-relaxed">
            {SLIDES[currentSlide].description}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex gap-3">
          {SLIDES.map((_, idx) => (
            <div 
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-500 shadow-lg ${
                currentSlide === idx ? 'w-12 bg-blue-600' : 'w-2.5 bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="pb-12">
        <button 
          onClick={nextSlide}
          className="w-full bg-white text-[#0F172A] py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all group"
        >
          {currentSlide === SLIDES.length - 1 ? 'Khám phá ngay' : 'Tiếp theo'}
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
