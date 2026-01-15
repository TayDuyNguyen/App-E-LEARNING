
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Timer, Lightbulb, Save, ChevronRight, 
  ChevronLeft, Send, Image as ImageIcon, Volume2, 
  HelpCircle, XCircle, CheckCircle2
} from 'lucide-react';
import { Exercise, Question } from '../types';

interface ExerciseScreenProps {
  exercise: Exercise;
  onBack: () => void;
  onComplete: (score: number) => void;
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ exercise, onBack, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(exercise.timeLimit || 600);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = exercise.questions[currentIndex];

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (val: any) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
    setShowExplanation(false);
  };

  const handleSubmit = () => {
    // Giả lập tính điểm đơn giản cho demo
    onComplete(85);
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <div className="grid gap-4 mt-8">
            {currentQuestion.options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerChange(idx)}
                className={`w-full text-left px-6 py-5 rounded-[28px] border transition-all font-bold ${
                  answers[currentQuestion.id] === idx 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/30' 
                  : 'bg-[#1E293B] border-white/5 text-slate-300 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
                    answers[currentQuestion.id] === idx ? 'bg-white/20 border-white/20' : 'bg-white/5 border-white/10'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {opt}
                </div>
              </button>
            ))}
          </div>
        );
      case 'fill_blank':
        return (
          <div className="mt-8 space-y-4">
            <input 
              type="text"
              placeholder="Nhập câu trả lời của bạn..."
              className="w-full px-6 py-5 bg-[#1E293B] border border-white/5 rounded-[28px] text-white font-bold focus:ring-2 focus:ring-blue-500/30 transition-all outline-none"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          </div>
        );
      case 'essay':
        return (
          <div className="mt-8">
            <textarea 
              placeholder="Viết câu trả lời chi tiết..."
              rows={8}
              className="w-full px-6 py-5 bg-[#1E293B] border border-white/5 rounded-[32px] text-white font-medium focus:ring-2 focus:ring-blue-500/30 transition-all outline-none resize-none"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-black text-white italic truncate tracking-tight">{exercise.title}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Câu {currentIndex + 1} của {exercise.questions.length}
              </span>
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${timeLeft < 60 ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'}`}>
          <Timer className={`w-4 h-4 ${timeLeft < 60 ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-black tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none pb-32">
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / exercise.questions.length) * 100}%` }}
          />
        </div>

        {/* Question Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              {currentQuestion.type.replace('_', ' ')}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowHint(!showHint)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${showHint ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-white/5 border-white/5 text-slate-400'}`}
              >
                <Lightbulb className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-400">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h3 className="text-xl font-black text-white leading-snug tracking-tight italic">
            {currentQuestion.text}
          </h3>

          {/* Media Attachment */}
          {currentQuestion.media && (
            <div className="relative group rounded-3xl overflow-hidden border border-white/5">
              {currentQuestion.media.type === 'image' ? (
                <img src={currentQuestion.media.url} className="w-full aspect-video object-cover" alt="Question content" />
              ) : (
                <div className="p-8 bg-blue-600/10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-900/40">
                    <Volume2 className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Nghe âm thanh</span>
                </div>
              )}
            </div>
          )}

          {renderQuestionInput()}

          {/* Hint View */}
          {showHint && currentQuestion.hint && (
            <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-[28px] animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-2 mb-2 text-amber-500">
                <Lightbulb className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest">Gợi ý dành cho bạn</span>
              </div>
              <p className="text-xs font-medium text-amber-200/80 leading-relaxed">{currentQuestion.hint}</p>
            </div>
          )}

          {/* Explanation View */}
          {showExplanation && currentQuestion.explanation && (
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-[28px] animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-2 mb-2 text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Giải thích đáp án</span>
              </div>
              <p className="text-xs font-medium text-emerald-200/80 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-6 z-[60] flex items-center justify-between gap-4 safe-pb">
        <button 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="p-5 bg-[#1E293B] border border-white/5 rounded-2xl text-slate-400 disabled:opacity-20 active:scale-90 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex-1 flex gap-3">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex-1 py-5 border border-white/5 bg-white/2 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all"
          >
            Bỏ qua
          </button>
          
          {currentIndex === exercise.questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="flex-[1.5] bg-blue-600 text-white py-5 rounded-[24px] font-black text-base shadow-2xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Nộp bài
              <Send className="w-5 h-5 fill-current" />
            </button>
          ) : (
            <button 
              onClick={() => {
                setCurrentIndex(prev => prev + 1);
                setShowHint(false);
                setShowExplanation(false);
              }}
              className="flex-[1.5] bg-blue-600 text-white py-5 rounded-[24px] font-black text-base shadow-2xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Tiếp theo
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseScreen;
