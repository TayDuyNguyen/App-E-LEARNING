
import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Search, MoreVertical, Play, 
  Settings2, Download, Share2, Layers, BookOpen, 
  Target, Clock, ChevronRight, Edit3, Trash2
} from 'lucide-react';
import { Vocabulary } from '../../../types/index';

interface Deck {
  id: string;
  name: string;
  cardCount: number;
  progress: number;
  category: string;
  isDefault: boolean;
  color: string;
}

interface FlashcardDecksScreenProps {
  onBack: () => void;
  onSelectDeck: (deckId: string) => void;
  onCreateDeck: () => void;
}

const MOCK_DECKS: Deck[] = [
  { 
    id: 'd1', name: 'UI/UX Design Master', cardCount: 24, progress: 65, 
    category: 'Design', isDefault: true, color: 'from-blue-600 to-indigo-700' 
  },
  { 
    id: 'd2', name: 'React Pro Patterns', cardCount: 18, progress: 32, 
    category: 'Development', isDefault: true, color: 'from-emerald-600 to-teal-700' 
  },
  { 
    id: 'd3', name: 'My Favorite Words', cardCount: 12, progress: 100, 
    category: 'Personal', isDefault: false, color: 'from-rose-600 to-pink-700' 
  },
  { 
    id: 'd4', name: 'Prompt Engineering', cardCount: 8, progress: 0, 
    category: 'AI', isDefault: false, color: 'from-amber-600 to-orange-700' 
  },
];

const FlashcardDecksScreen: React.FC<FlashcardDecksScreenProps> = ({ onBack, onSelectDeck, onCreateDeck }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');

  const filteredDecks = MOCK_DECKS.filter(deck => {
    const matchesSearch = deck.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || !deck.isDefault;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight">Bộ thẻ học</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Tổng cộng {MOCK_DECKS.length} bộ thẻ
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
              <Settings2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative group mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm bộ thẻ..."
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-4 border-b border-white/5">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-3 text-[10px] font-black uppercase tracking-widest relative ${activeTab === 'all' ? 'text-blue-500' : 'text-slate-500'}`}
          >
            Tất cả bộ thẻ
            {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('my')}
            className={`pb-3 text-[10px] font-black uppercase tracking-widest relative ${activeTab === 'my' ? 'text-blue-500' : 'text-slate-500'}`}
          >
            Bộ thẻ của tôi
            {activeTab === 'my' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none pb-32">
        {filteredDecks.map((deck) => (
          <div 
            key={deck.id}
            onClick={() => onSelectDeck(deck.id)}
            className="bg-[#1E293B] border border-white/5 rounded-[32px] overflow-hidden group active:scale-[0.98] transition-all cursor-pointer hover:bg-[#253249]"
          >
            <div className={`h-24 bg-gradient-to-br ${deck.color} p-6 flex justify-between items-start`}>
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[8px] font-black uppercase tracking-widest text-white border border-white/10">
                {deck.category}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="p-2 bg-black/20 backdrop-blur-md rounded-xl text-white/80 hover:text-white"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white italic tracking-tight">{deck.name}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {deck.cardCount} Thẻ • {deck.isDefault ? 'Mặc định' : 'Cá nhân'}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-black text-white italic">{deck.progress}%</span>
                  <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Tiến độ</span>
                </div>
              </div>

              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-500" 
                  style={{ width: `${deck.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[#1E293B] bg-slate-700 flex items-center justify-center text-[8px] font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-2 bg-blue-600/10 text-blue-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">
                  Học ngay <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-6 z-[40]">
        <button 
          onClick={onCreateDeck}
          className="bg-white text-[#0F172A] px-6 py-4 rounded-[28px] shadow-2xl shadow-white/10 active:scale-90 transition-all flex items-center gap-3 font-black text-sm uppercase tracking-tight"
        >
          <Plus className="w-5 h-5" />
          Tạo bộ thẻ
        </button>
      </div>
    </div>
  );
};

export default FlashcardDecksScreen;
