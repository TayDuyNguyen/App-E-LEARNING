
import React from 'react';
import { 
  ArrowLeft, Volume2, Star, CheckCircle2, 
  BookOpen, Lightbulb, MessageSquare, Share2 
} from 'lucide-react';
import { Vocabulary } from '../../../types/index';

interface VocabularyDetailScreenProps {
  vocab: Vocabulary;
  onBack: () => void;
  onToggleLearned: (id: string) => void;
}

const VocabularyDetailScreen: React.FC<VocabularyDetailScreenProps> = ({ vocab, onBack, onToggleLearned }) => {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in zoom-in-95 duration-500 overflow-y-auto scrollbar-none pb-32">
      <div className="p-6 flex items-center justify-between sticky top-0 bg-[#0F172A]/90 backdrop-blur-xl z-30">
        <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400"><Star className="w-5 h-5" /></button>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400"><Share2 className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="px-8 pt-4 space-y-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-[0.2em]">
              {vocab.category}
            </span>
            <h1 className="text-5xl font-black italic tracking-tighter text-white">{vocab.word}</h1>
            <p className="text-xl font-medium text-slate-500 font-mono tracking-widest">{vocab.phonetic}</p>
          </div>

          <button 
            onClick={playAudio}
            className="w-20 h-20 bg-blue-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-900/40 active:scale-90 transition-all group"
          >
            <Volume2 className="w-8 h-8 text-white fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="bg-[#1E293B] border border-white/5 rounded-[40px] p-8 space-y-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400">
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Định nghĩa</span>
            </div>
            <p className="text-lg font-bold text-slate-200 leading-relaxed italic">
              "{vocab.definition}"
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-amber-400">
              <Lightbulb className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Ví dụ sử dụng</span>
            </div>
            <div className="bg-white/2 p-5 rounded-3xl border border-white/5">
              <p className="text-sm font-medium text-slate-300 leading-relaxed">
                {vocab.example}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-8 z-40 safe-pb">
        <button 
          onClick={() => onToggleLearned(vocab.id)}
          className={`w-full py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl ${
            vocab.isLearned 
            ? 'bg-emerald-600 text-white shadow-emerald-900/20' 
            : 'bg-white text-[#0F172A] shadow-white/10'
          }`}
        >
          {vocab.isLearned ? <CheckCircle2 className="w-6 h-6" /> : null}
          {vocab.isLearned ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
        </button>
      </div>
    </div>
  );
};

export default VocabularyDetailScreen;
