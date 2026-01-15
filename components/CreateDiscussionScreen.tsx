
import React, { useState } from 'react';
import { ArrowLeft, Send, Image as ImageIcon, Link as LinkIcon, Hash } from 'lucide-react';

interface CreateDiscussionScreenProps {
  onBack: () => void;
  onPost: (data: { title: string; content: string; category: string }) => void;
}

const CATEGORIES = ["UI/UX", "Development", "Q&A", "Career", "General"];

const CreateDiscussionScreen: React.FC<CreateDiscussionScreenProps> = ({ onBack, onPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("UI/UX");

  const handlePost = () => {
    if (!title.trim() || !content.trim()) return;
    onPost({ title, content, category });
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight">Tạo thảo luận</h2>
        </div>
        <button 
          onClick={handlePost}
          disabled={!title.trim() || !content.trim()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-900/30 active:scale-95 transition-all disabled:opacity-50"
        >
          Đăng
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none">
        {/* Category Picker */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chọn chủ đề</label>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                  category === cat 
                  ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
                  : 'bg-white/5 text-slate-500 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tiêu đề thảo luận</label>
          <input 
            type="text" 
            placeholder="Bạn muốn thảo luận về điều gì?"
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl px-6 py-4 text-lg font-black italic placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content Input */}
        <div className="space-y-2 flex-1 flex flex-col min-h-[300px]">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nội dung chi tiết</label>
          <textarea 
            placeholder="Chia sẻ suy nghĩ của bạn hoặc đặt câu hỏi..."
            className="flex-1 w-full bg-[#1E293B] border border-white/5 rounded-[32px] px-6 py-6 text-sm font-medium leading-relaxed placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Toolbar */}
        <div className="flex gap-4 p-4 bg-white/2 border border-white/5 rounded-2xl">
          <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors"><ImageIcon className="w-5 h-5" /></button>
          <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors"><LinkIcon className="w-5 h-5" /></button>
          <button className="p-2 text-slate-500 hover:text-blue-500 transition-colors"><Hash className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussionScreen;
