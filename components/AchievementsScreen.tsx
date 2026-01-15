
import React, { useState } from 'react';
import { 
  ArrowLeft, Trophy, Star, Shield, Award, 
  Flame, Zap, Target, Lock, CheckCircle2, 
  Share2, ChevronRight, Gift, Sparkles 
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  goal: number;
  isUnlocked: boolean;
  isClaimed: boolean;
  reward: string;
}

interface AchievementsScreenProps {
  onBack: () => void;
}

const CATEGORIES = ["Tất cả", "Học tập", "Thử thách", "Xã hội"];

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'a1',
    name: "Siêu chiến binh",
    description: "Hoàn thành 10 bài học trong một ngày duy nhất.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-blue-500",
    progress: 10,
    goal: 10,
    isUnlocked: true,
    isClaimed: true,
    reward: "500 XP"
  },
  {
    id: 'a2',
    name: "Bậc thầy từ vựng",
    description: "Thuộc lòng 100 từ vựng chuyên ngành UI/UX.",
    icon: <Star className="w-6 h-6" />,
    color: "bg-amber-500",
    progress: 85,
    goal: 100,
    isUnlocked: false,
    isClaimed: false,
    reward: "Huy hiệu Vàng"
  },
  {
    id: 'a3',
    name: "Ngọn lửa bền bỉ",
    description: "Đạt chuỗi học tập 30 ngày liên tiếp.",
    icon: <Flame className="w-6 h-6" />,
    color: "bg-orange-500",
    progress: 7,
    goal: 30,
    isUnlocked: false,
    isClaimed: false,
    reward: "1000 XP"
  },
  {
    id: 'a4',
    name: "Cú đêm thông thái",
    description: "Hoàn thành bài học sau 12 giờ đêm.",
    icon: <Trophy className="w-6 h-6" />,
    color: "bg-indigo-500",
    progress: 1,
    goal: 1,
    isUnlocked: true,
    isClaimed: false,
    reward: "Khung đại diện hiếm"
  }
];

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [achievements, setAchievements] = useState(MOCK_ACHIEVEMENTS);

  const handleClaim = (id: string) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, isClaimed: true } : a));
  };

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

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
              <h2 className="text-xl font-black italic tracking-tight">Thành tựu</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Đã mở khóa {unlockedCount}/{achievements.length} huy hiệu
              </p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-6 px-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'bg-white/5 text-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-none pb-32">
        {/* Progress Overview Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black italic tracking-tight">Siêu cấp bậc thầy</h3>
              <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Còn 150 XP để lên hạng tiếp theo</p>
            </div>
            <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
              <div className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        {/* Achievement List */}
        <div className="space-y-4">
          {achievements.map((item) => (
            <div 
              key={item.id}
              className={`bg-[#1E293B] border border-white/5 rounded-[32px] p-6 flex flex-col gap-5 transition-all ${!item.isUnlocked ? 'opacity-80' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${item.isUnlocked ? item.color : 'bg-slate-800'} flex items-center justify-center text-white shadow-lg relative`}>
                    {item.icon}
                    {!item.isUnlocked && <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center"><Lock className="w-4 h-4 text-slate-400" /></div>}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-base font-black italic tracking-tight ${item.isUnlocked ? 'text-white' : 'text-slate-500'}`}>{item.name}</h4>
                    <p className="text-[10px] font-medium text-slate-400 leading-tight max-w-[180px]">{item.description}</p>
                  </div>
                </div>
                {item.isUnlocked && !item.isClaimed && (
                  <div className="animate-bounce">
                    <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                )}
              </div>

              {/* Progress & Actions */}
              <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-slate-600">Tiến trình: {item.progress}/{item.goal}</span>
                  <span className="text-blue-500">{Math.round((item.progress / item.goal) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.isUnlocked ? 'bg-blue-500' : 'bg-slate-700'}`} 
                    style={{ width: `${(item.progress / item.goal) * 100}%` }} 
                  />
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                    <Gift className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{item.reward}</span>
                  </div>
                  
                  {item.isUnlocked ? (
                    item.isClaimed ? (
                      <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                        <CheckCircle2 className="w-4 h-4" /> Đã nhận
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleClaim(item.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/40 active:scale-95 transition-all"
                      >
                        Nhận thưởng
                      </button>
                    )
                  ) : (
                    <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest italic">Đang khóa</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsScreen;
