
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, Volume2, Star, CheckCircle2, 
  Layers, ChevronRight, MoreVertical, Plus, 
  BookMarked, GraduationCap, X
} from 'lucide-react';
import { Vocabulary } from '../types';

interface VocabularyScreenProps {
  vocabData: Vocabulary[];
  onBack: () => void;
  onItemClick: (vocab: Vocabulary) => void;
  onFlashcards: () => void;
  onToggleBookmark: (id: string) => void;
  onToggleLearned: (id: string) => void;
}

const CATEGORIES = ["Tất cả", "UI/UX Design", "Design System", "Development"];

const VocabularyScreen: React.FC<VocabularyScreenProps> = ({ 
  vocabData, 
  onBack, 
  onItemClick, 
  onFlashcards,
  onToggleBookmark,
  onToggleLearned
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredVocab = useMemo(() => {
    return vocabData.filter(v => {
      const matchesSearch = v.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Tất cả' || v.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, vocabData]);

  const playAudio = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const learnedCount = vocabData.filter(v => v.isLearned).length;

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight">Từ vựng</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Đã học {learnedCount}/{vocabData.length} từ
              </p>
            </div>
          </div>
          <button 
            onClick={onFlashcards}
            className="flex items-center gap-2 bg-blue-600 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/30 active:scale-95 transition-all"
          >
            <Layers className="w-4 h-4" />
            Flashcards
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text"
              placeholder="Tìm từ vựng..."
              className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3.5 bg-[#1E293B] border border-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Categories horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none mt-5 -mx-6 px-6 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                selectedCategory === cat 
                ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                : 'bg-white/5 text-slate-500 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-none pb-32">
        {filteredVocab.length > 0 ? (
          filteredVocab.map((vocab) => (
            <div 
              key={vocab.id}
              onClick={() => onItemClick(vocab)}
              className="bg-[#1E293B] border border-white/5 rounded-[32px] p-6 space-y-4 group active:scale-[0.98] transition-all cursor-pointer hover:bg-[#253249]"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-white italic tracking-tight">{vocab.word}</h3>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                      vocab.difficulty === 'easy' ? 'bg-emerald-500/10 text-emerald-500' :
                      vocab.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {vocab.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 font-mono tracking-tighter">{vocab.phonetic}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={(e) => playAudio(vocab.word, e)}
                    className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleBookmark(vocab.id); }}
                    className={`p-2.5 rounded-xl border transition-all ${
                      vocab.isBookmarked 
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                      : 'bg-white/5 border-white/5 text-slate-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${vocab.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-300 leading-relaxed line-clamp-2">
                {vocab.definition}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest bg-white/2 px-2.5 py-1 rounded-lg">
                  {vocab.category}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleLearned(vocab.id); }}
                  className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${
                    vocab.isLearned ? 'text-emerald-500' : 'text-slate-500'
                  }`}
                >
                  {vocab.isLearned ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-700" />}
                  {vocab.isLearned ? 'Đã học' : 'Chưa học'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-700">
              <BookMarked className="w-10 h-10" />
            </div>
            <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Không tìm thấy từ nào</p>
          </div>
        )}
      </div>

      {/* Floating Add Word Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-fit px-6 z-[40]">
        <button className="bg-white text-[#0F172A] p-5 rounded-full shadow-2xl shadow-white/10 active:scale-90 transition-all">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VocabularyScreen;
