
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, RefreshCcw, Volume2, RotateCw, X, Check, 
  Layers, Settings2, Shuffle, FastForward, PlayCircle, 
  PauseCircle, ChevronDown, ListFilter
} from 'lucide-react';
import { Vocabulary } from '../types';

interface FlashcardScreenProps {
  vocabList: Vocabulary[];
  onBack: () => void;
  onFinish: (stats: { good: number; hard: number; easy: number; again: number }) => void;
}

const FlashcardScreen: React.FC<FlashcardScreenProps> = ({ vocabList, onBack, onFinish }) => {
  const [cards, setCards] = useState<Vocabulary[]>([...vocabList]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [stats, setStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 });

  const currentVocab = cards[currentIndex];

  useEffect(() => {
    if (autoPlay && !isFlipped) {
      playAudio(currentVocab.word);
    }
  }, [currentIndex, autoPlay]);

  const playAudio = (word: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleRating = (rating: keyof typeof stats) => {
    setStats(prev => ({ ...prev, [rating]: prev[rating] + 1 }));
    setDirection('up');
    
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setIsFlipped(false);
        setDirection(null);
        setCurrentIndex(prev => prev + 1);
      } else {
        onFinish({ ...stats, [rating]: stats[rating] + 1 });
      }
    }, 300);
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSkip = () => {
    if (currentIndex < cards.length - 1) {
      setDirection('right');
      setTimeout(() => {
        setIsFlipped(false);
        setDirection(null);
        setCurrentIndex(prev => prev + 1);
      }, 300);
    } else {
      onFinish(stats);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Top Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center">
          <button className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full mb-1 group">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Bộ thiết kế UI</span>
            <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-blue-500 transition-colors" />
          </button>
          <div className="h-1 w-32 bg-slate-800 rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            />
          </div>
          <p className="text-[9px] font-black text-blue-500 mt-1 uppercase tracking-tighter">Thẻ {currentIndex + 1} / {cards.length}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setAutoPlay(!autoPlay)} className={`p-3 rounded-2xl transition-all ${autoPlay ? 'bg-blue-600/20 text-blue-500' : 'bg-white/5 text-slate-400'}`}>
            {autoPlay ? <PlayCircle className="w-5 h-5" /> : <PauseCircle className="w-5 h-5" />}
          </button>
          <button onClick={handleShuffle} className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Shuffle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Flashcard Wrapper with Animations */}
        <div 
          className={`relative w-full aspect-[3/4.2] max-h-[550px] perspective-1000 transition-all duration-300 ${
            direction === 'left' ? '-translate-x-full opacity-0' : 
            direction === 'right' ? 'translate-x-full opacity-0' : 
            direction === 'up' ? '-translate-y-full opacity-0 scale-90' : 'translate-x-0 opacity-100 scale-100'
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-700 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden bg-[#1E293B] border border-white/10 rounded-[56px] shadow-2xl flex flex-col items-center justify-center p-12 text-center space-y-8">
              <div className="absolute top-10 left-10">
                 <ListFilter className="w-5 h-5 text-slate-700" />
              </div>
              <div className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20">
                {currentVocab.category}
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl font-black italic tracking-tighter text-white">{currentVocab.word}</h1>
                <p className="text-xl font-medium text-slate-500 font-mono tracking-widest">{currentVocab.phonetic}</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); playAudio(currentVocab.word); }}
                className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <div className="pt-8 opacity-40">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <RotateCw className="w-4 h-4 animate-spin-slow" /> Chạm để lật thẻ
                </p>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[56px] shadow-2xl flex flex-col items-center justify-center p-12 text-center space-y-10 rotate-y-180 border border-white/20">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Định nghĩa</span>
                <p className="text-3xl font-black text-white leading-tight italic tracking-tight">
                  "{currentVocab.definition}"
                </p>
              </div>
              <div className="w-24 h-1 bg-white/20 rounded-full" />
              <div className="space-y-4">
                <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Ví dụ thực tế</span>
                <p className="text-base font-medium text-blue-500 bg-white p-6 rounded-[32px] leading-relaxed italic shadow-2xl">
                  {currentVocab.example}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Rating & Action Buttons Container */}
        <div className="w-full max-w-[400px] mt-10 space-y-8 z-30">
          {!isFlipped ? (
            <div className="flex justify-center">
              <button 
                onClick={() => setIsFlipped(true)}
                className="px-12 py-5 bg-white text-[#0F172A] rounded-[32px] font-black text-lg shadow-2xl active:scale-95 transition-all flex items-center gap-3"
              >
                Xem đáp án <RotateCw className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <RatingButton color="bg-rose-500" label="Học lại" time="< 1p" onClick={() => handleRating('again')} />
              <RatingButton color="bg-amber-500" label="Khó" time="2 ngày" onClick={() => handleRating('hard')} />
              <RatingButton color="bg-blue-500" label="Tốt" time="4 ngày" onClick={() => handleRating('good')} />
              <RatingButton color="bg-emerald-500" label="Dễ" time="7 ngày" onClick={() => handleRating('easy')} />
            </div>
          )}
          
          <div className="flex justify-between items-center px-4">
            <button className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-slate-400 transition-colors">
              Báo lỗi thẻ
            </button>
            <button 
              onClick={handleSkip}
              className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
            >
              Bỏ qua <FastForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const RatingButton = ({ color, label, time, onClick }: { color: string; label: string; time: string; onClick: () => void }) => (
  <button 
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    className="flex flex-col items-center gap-2 group active:scale-90 transition-all"
  >
    <div className={`w-full aspect-square rounded-[24px] ${color} flex items-center justify-center shadow-xl shadow-black/20 group-hover:scale-105 transition-transform`}>
      <Check className="w-6 h-6 text-white" />
    </div>
    <div className="text-center">
      <p className="text-[9px] font-black text-white uppercase tracking-tighter">{label}</p>
      <p className="text-[8px] font-bold text-slate-500">{time}</p>
    </div>
  </button>
);

export default FlashcardScreen;
