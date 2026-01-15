
import React, { useState } from 'react';
import { 
  ArrowLeft, Camera, User, Mail, FileText, 
  Link as LinkIcon, Target, Check, Globe, 
  Github, Twitter, Linkedin, ChevronRight, X
} from 'lucide-react';

interface EditProfileScreenProps {
  user: {
    name: string;
    avatar: string;
    email?: string;
  };
  onBack: () => void;
  onSave: (updatedData: any) => void;
}

const GOALS = ["UI/UX Master", "Fullstack Dev", "AI Engineer", "Product Manager", "Data Science"];

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email || "quocanh.designer@gmail.com",
    bio: "Đam mê thiết kế sản phẩm số và trải nghiệm người dùng tối giản. Đang trên hành trình trở thành Senior UI/UX Designer.",
    github: "github.com/quocanh",
    linkedin: "linkedin.com/in/quocanh",
    selectedGoals: [GOALS[0], GOALS[2]]
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Giả lập lưu dữ liệu
    setTimeout(() => {
      setIsLoading(false);
      onSave(formData);
    }, 1500);
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGoals: prev.selectedGoals.includes(goal)
        ? prev.selectedGoals.filter(g => g !== goal)
        : [...prev.selectedGoals, goal]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#0F172A] animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight text-white">Chỉnh sửa hồ sơ</h2>
        </div>
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/30 active:scale-95 transition-all disabled:opacity-50"
        >
          {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 pb-40 space-y-10">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center py-4">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-blue-600 blur-[40px] opacity-20 rounded-full group-hover:opacity-40 transition-opacity"></div>
            <img src={user.avatar} className="w-32 h-32 rounded-[48px] border-4 border-white/10 relative z-10 group-hover:opacity-80 transition-opacity" alt="Avatar" />
            <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-blue-600 p-4 rounded-full shadow-2xl">
                  <Camera className="w-6 h-6 text-white" />
               </div>
            </div>
          </div>
          <p className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Thay đổi ảnh đại diện</p>
        </div>

        {/* Basic Info Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Thông tin cơ bản</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Họ và tên</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white font-bold focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Email (Đọc duy nhất)</label>
              <div className="relative group opacity-60">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  readOnly
                  value={formData.email}
                  className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-slate-400 font-bold outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Giới thiệu ngắn</label>
              <div className="relative group">
                <FileText className="absolute left-5 top-6 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <textarea 
                  value={formData.bio}
                  rows={4}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-[#1E293B] border border-white/5 rounded-3xl pl-14 pr-6 py-6 text-slate-200 font-medium text-sm leading-relaxed focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Mục tiêu học tập</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {GOALS.map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  formData.selectedGoals.includes(goal)
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                  : 'bg-white/5 border-white/5 text-slate-500'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Social Links Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
            <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Liên kết mạng xã hội</h3>
          </div>
          
          <div className="space-y-4">
            <SocialInput icon={<Github className="w-4 h-4" />} label="Github" value={formData.github} />
            <SocialInput icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" value={formData.linkedin} />
            <SocialInput icon={<Globe className="w-4 h-4" />} label="Portfolio" value="quocanh.design" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-10 pb-8">
           <button className="w-full py-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
              Xóa tài khoản vĩnh viễn
           </button>
        </div>
      </div>
    </div>
  );
};

const SocialInput = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-4 bg-[#1E293B] border border-white/5 p-4 rounded-2xl group focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 group-focus-within:text-indigo-400 transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-0.5">{label}</p>
      <input 
        type="text" 
        defaultValue={value}
        className="w-full bg-transparent text-sm font-bold text-slate-200 outline-none"
      />
    </div>
  </div>
);

export default EditProfileScreen;
