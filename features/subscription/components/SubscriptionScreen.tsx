
import React, { useState } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Zap, ShieldCheck, 
  Crown, Star, Clock, CreditCard, ChevronRight, 
  HelpCircle, History, Info, X
} from 'lucide-react';

interface SubscriptionScreenProps {
  onBack: () => void;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Gói Tháng',
    price: '$9.99',
    duration: '/ tháng',
    description: 'Bắt đầu hành trình học tập chuyên sâu.',
    color: 'from-blue-600 to-indigo-600',
    features: [
      'Gia sư AI Lumina không giới hạn',
      'Truy cập 50+ khóa học Premium',
      'Tải xuống video chất lượng 720p',
      'Không quảng cáo'
    ]
  },
  {
    id: 'yearly',
    name: 'Gói Năm',
    price: '$79.99',
    duration: '/ năm',
    description: 'Lựa chọn tốt nhất cho học viên dài hạn.',
    isPopular: true,
    color: 'from-indigo-600 to-purple-600',
    features: [
      'Tất cả tính năng gói Tháng',
      'Hỗ trợ cố vấn 1-1 hàng tháng',
      'Tải xuống video chất lượng 4K',
      'Tiết kiệm 35% so với gói tháng',
      'Chứng chỉ Blockchain miễn phí'
    ]
  },
  {
    id: 'lifetime',
    name: 'Trọn đời',
    price: '$199',
    duration: 'Một lần',
    description: 'Sở hữu tri thức vĩnh viễn.',
    color: 'from-amber-500 to-orange-600',
    features: [
      'Tất cả tính năng gói Năm',
      'Truy cập mọi nội dung tương lai',
      'Biểu tượng thành viên VIP trọn đời',
      'Quyền truy cập sớm các tính năng Beta'
    ]
  }
];

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      setIsProcessing(false);
      alert("Chúc mừng! Bạn đã nâng cấp thành công.");
      onBack();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight">Nâng cấp hội viên</h2>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
          <History className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-10 pb-40">
        
        {/* Intro Hero */}
        <div className="text-center space-y-4 pt-4">
           <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-600 blur-[60px] opacity-20 scale-150"></div>
              <div className="w-20 h-20 bg-blue-600 rounded-[32px] flex items-center justify-center shadow-2xl relative z-10 mx-auto">
                 <Crown className="w-10 h-10 text-white fill-current" />
              </div>
           </div>
           <div className="space-y-1">
              <h3 className="text-3xl font-black italic">Mở khóa tiềm năng</h3>
              <p className="text-slate-400 text-sm font-medium">Học tập không giới hạn cùng EduSmart Pro</p>
           </div>
        </div>

        {/* Plans Carousel/List */}
        <div className="space-y-6">
           <div className="flex items-center justify-between px-1">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Chọn gói của bạn</h4>
              <div className="flex items-center gap-1.5 text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                 <Clock className="w-3 h-3" />
                 <span className="text-[8px] font-black uppercase tracking-widest italic">Dùng thử 7 ngày miễn phí</span>
              </div>
           </div>

           <div className="space-y-4">
              {PLANS.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative bg-[#1E293B] border rounded-[40px] p-8 transition-all cursor-pointer active:scale-[0.98] ${
                    selectedPlan === plan.id 
                    ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-2xl' 
                    : 'border-white/5 opacity-80'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                       Phổ biến nhất
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h5 className="text-lg font-black text-white italic tracking-tight">{plan.name}</h5>
                        <p className="text-xs font-medium text-slate-500">{plan.description}</p>
                     </div>
                     <div className="text-right">
                        <div className="flex items-baseline justify-end">
                           <span className="text-2xl font-black text-white">{plan.price}</span>
                           <span className="text-[10px] font-bold text-slate-500 uppercase ml-1">{plan.duration}</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                     {plan.features.slice(0, selectedPlan === plan.id ? plan.features.length : 2).map((feat, i) => (
                       <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-300">
                          <div className={`p-1 rounded-full ${selectedPlan === plan.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                             <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                          {feat}
                       </div>
                     ))}
                     {selectedPlan !== plan.id && plan.features.length > 2 && (
                       <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest pl-7">+ {plan.features.length - 2} tính năng khác</p>
                     )}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Benefit Comparison Section */}
        <section className="space-y-6">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Tại sao nên chọn Pro?</h4>
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] p-8 space-y-8 shadow-xl">
              <BenefitItem 
                icon={<Zap className="text-amber-400" />} 
                title="Học tập siêu tốc" 
                desc="Gia sư AI cá nhân hóa lộ trình giúp bạn học nhanh gấp 3 lần." 
              />
              <BenefitItem 
                icon={<ShieldCheck className="text-emerald-400" />} 
                title="Đảm bảo đầu ra" 
                desc="Hoàn tiền 100% nếu bạn không đạt được mục tiêu sau 6 tháng học Pro." 
              />
              <BenefitItem 
                icon={<Crown className="text-blue-400" />} 
                title="Chứng chỉ quốc tế" 
                desc="Mỗi khóa học hoàn thành đều đi kèm chứng chỉ Blockchain xác thực." 
              />
           </div>
        </section>

        {/* FAQ & Support */}
        <div className="flex items-center justify-between px-2">
           <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" /> Câu hỏi thường gặp
           </button>
           <button className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
              Liên hệ hỗ trợ <ChevronRight className="w-3 h-3" />
           </button>
        </div>

        {/* Small Print */}
        <p className="text-[10px] text-slate-600 font-medium text-center leading-relaxed px-10">
          Gói đăng ký sẽ tự động gia hạn vào cuối chu kỳ. Bạn có thể hủy bất cứ lúc nào trong mục Cài đặt.
        </p>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-6 z-[60] safe-pb">
        <button 
          onClick={handleSubscribe}
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-5 rounded-[32px] font-black text-lg shadow-2xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
        >
          {isProcessing ? (
            <div className="flex items-center gap-3">
               <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
               <span>Đang xử lý...</span>
            </div>
          ) : (
            <>
              Bắt đầu hành trình Pro <CreditCard className="w-6 h-6" />
            </>
          )}
        </button>
        <button className="w-full mt-4 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-slate-400 transition-colors">
           Khôi phục giao dịch mua
        </button>
      </div>
    </div>
  );
};

const BenefitItem = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex gap-5">
    <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-white/5 flex items-center justify-center shrink-0">
       {icon}
    </div>
    <div className="space-y-1">
       <h5 className="text-sm font-black text-white italic">{title}</h5>
       <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default SubscriptionScreen;
