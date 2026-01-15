
import React, { useState } from 'react';
import { ArrowLeft, Target, Shield, Users, Camera, Globe, Lock } from 'lucide-react';

interface CreateGroupScreenProps {
  onBack: () => void;
  onCreate: (data: { name: string; category: string; goal: string }) => void;
}

const CATEGORIES = ["UI/UX", "Code", "AI", "English", "Business"];

const CreateGroupScreen: React.FC<CreateGroupScreenProps> = ({ onBack, onCreate }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('UI/UX');
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight">Tạo nhóm mới</h2>
        </div>
        <button 
          onClick={() => onCreate({ name, goal, category })}
          disabled={!name.trim() || !goal.trim()}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-blue-900/30 active:scale-95 transition-all disabled:opacity-50"
        >
          Hoàn tất
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-none pb-20">
        <div className="flex flex-col items-center gap-4 py-4">
           <div className="w-32 h-32 rounded-[40px] bg-[#1E293B] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-slate-500 group cursor-pointer hover:border-blue-500 transition-colors">
              <Camera className="w-8 h-8 mb-2 group-hover:text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tải ảnh nhóm</span>
           </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên nhóm học tập</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Team UI Master..."
              className="w-full bg-[#1E293B] border border-white/5 rounded-[24px] px-6 py-4 text-base font-black italic text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Chọn chủ đề</label>
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-3 rounded-2xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
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

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mục tiêu của nhóm</label>
            <textarea 
              placeholder="Mục tiêu lớn nhất của nhóm là gì? (vd: Học thuộc 100 từ vựng chuyên ngành)"
              className="w-full bg-[#1E293B] border border-white/5 rounded-[32px] px-6 py-6 text-sm font-medium text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[120px] resize-none"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cài đặt quyền riêng tư</label>
             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsPrivate(false)}
                  className={`p-6 rounded-[32px] border flex flex-col items-center gap-3 transition-all ${!isPrivate ? 'bg-blue-600/10 border-blue-500 text-white shadow-xl' : 'bg-[#1E293B] border-white/5 text-slate-500'}`}
                >
                   <Globe className="w-8 h-8" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Công khai<br/><span className="text-[8px] opacity-60">Ai cũng có thể tham gia</span></span>
                </button>
                <button 
                  onClick={() => setIsPrivate(true)}
                  className={`p-6 rounded-[32px] border flex flex-col items-center gap-3 transition-all ${isPrivate ? 'bg-blue-600/10 border-blue-500 text-white shadow-xl' : 'bg-[#1E293B] border-white/5 text-slate-500'}`}
                >
                   <Lock className="w-8 h-8" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight">Riêng tư<br/><span className="text-[8px] opacity-60">Cần lời mời tham gia</span></span>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupScreen;
