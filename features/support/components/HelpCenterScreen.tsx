
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, MessageCircle, HelpCircle, 
  ChevronRight, Play, Bug, Lightbulb, 
  CreditCard, User, BookOpen, Smartphone,
  ExternalLink, PhoneCall, Headphones, FileText,
  Video
} from 'lucide-react';

interface HelpCenterScreenProps {
  onBack: () => void;
  onContactClick: () => void;
}

const CATEGORIES = [
  { id: 'account', label: 'Tài khoản', icon: <User className="w-5 h-5" />, color: 'text-blue-500' },
  { id: 'payment', label: 'Thanh toán', icon: <CreditCard className="w-5 h-5" />, color: 'text-emerald-500' },
  { id: 'courses', label: 'Khóa học', icon: <BookOpen className="w-5 h-5" />, color: 'text-amber-500' },
  { id: 'app', label: 'Ứng dụng', icon: <Smartphone className="w-5 h-5" />, color: 'text-indigo-500' },
];

const POPULAR_ARTICLES = [
  { id: 1, title: 'Làm thế học ngoại tuyến?', category: 'Ứng dụng' },
  { id: 2, title: 'Cách nâng cấp lên EduSmart Pro', category: 'Thanh toán' },
  { id: 3, title: 'Quên mật khẩu phải làm sao?', category: 'Tài khoản' },
  { id: 4, title: 'Sử dụng gia sư AI hiệu quả', category: 'Khóa học' },
];

const HelpCenterScreen: React.FC<HelpCenterScreenProps> = ({ onBack, onContactClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { id: 1, q: "Tôi có thể học trên nhiều thiết bị không?", a: "Có, bạn có thể đăng nhập vào tài khoản của mình trên tối đa 3 thiết bị cùng lúc. Tiến độ học tập sẽ được đồng bộ hóa tự động." },
    { id: 2, q: "Chính sách hoàn tiền như thế nào?", a: "EduSmart hỗ trợ hoàn tiền trong vòng 7 ngày nếu bạn không hài lòng với gói Pro, với điều kiện chưa hoàn thành quá 20% bất kỳ khóa học Premium nào." },
    { id: 3, q: "Làm sao để nhận chứng chỉ?", a: "Sau khi hoàn thành 100% các bài học và bài kiểm tra cuối khóa với điểm số trên 80%, chứng chỉ sẽ tự động được cấp trong hồ sơ của bạn." }
  ];

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
              <h2 className="text-xl font-black italic tracking-tight">Trợ giúp</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trung tâm hỗ trợ EduSmart</p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Headphones className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative group mb-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm kiếm giải pháp..."
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-10 pb-40">
        
        {/* Help Categories */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Danh mục trợ giúp</h3>
           <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <button key={cat.id} className="bg-[#1E293B] border border-white/5 p-6 rounded-[32px] flex flex-col items-center gap-3 active:scale-[0.98] transition-all group">
                   <div className={`p-4 rounded-2xl bg-[#0F172A] border border-white/5 group-hover:scale-110 transition-transform ${cat.color}`}>
                      {cat.icon}
                   </div>
                   <span className="text-xs font-black text-slate-300 uppercase tracking-tight">{cat.label}</span>
                </button>
              ))}
           </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Liên hệ nhanh</h3>
           <div className="bg-[#1E293B] border border-white/5 rounded-[40px] overflow-hidden">
              <SupportActionItem 
                icon={<MessageCircle className="text-blue-400" />} 
                title="Chat trực tuyến" 
                desc="Tư vấn trực tiếp 24/7" 
                onClick={() => alert("Đang kết nối với nhân viên hỗ trợ...")}
              />
              <SupportActionItem 
                icon={<Bug className="text-rose-400" />} 
                title="Báo cáo sự cố" 
                desc="Gửi phản hồi lỗi kỹ thuật" 
                onClick={onContactClick}
              />
              <SupportActionItem 
                icon={<Lightbulb className="text-amber-400" />} 
                title="Yêu cầu tính năng" 
                desc="Gợi ý cải tiến ứng dụng" 
                onClick={onContactClick}
              />
           </div>
        </section>

        {/* Tutorials Section */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Video hướng dẫn</h3>
              <button className="text-[10px] font-black text-blue-500 uppercase">Tất cả</button>
           </div>
           <div className="flex gap-4 overflow-x-auto scrollbar-none -mx-6 px-6 pb-2">
              {[1, 2].map(i => (
                <div key={i} className="min-w-[240px] bg-[#1E293B] border border-white/5 rounded-[32px] overflow-hidden group">
                   <div className="relative aspect-video">
                      <img src={`https://images.unsplash.com/photo-${i === 1 ? '1611162617474-5b21e879e113' : '1587620962725-abab7fe55159'}?w=400`} className="w-full h-full object-cover opacity-60" alt="" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-90 transition-transform">
                            <Play className="w-4 h-4 fill-current" />
                         </div>
                      </div>
                   </div>
                   <div className="p-4">
                      <h4 className="text-xs font-black text-white italic line-clamp-1">{i === 1 ? 'Cách sử dụng Gia sư AI Lumina' : 'Quản lý lộ trình học tập hiệu quả'}</h4>
                      <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">4:25 • HƯỚNG DẪN</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Câu hỏi thường gặp</h3>
           <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-[#1E293B] border border-white/5 rounded-[28px] overflow-hidden">
                   <button 
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                   >
                      <span className="text-sm font-black text-slate-200 italic tracking-tight">{faq.q}</span>
                      <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${expandedFaq === faq.id ? 'rotate-90' : ''}`} />
                   </button>
                   {expandedFaq === faq.id && (
                     <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-xs text-slate-400 font-medium leading-relaxed border-t border-white/5 pt-4">
                           {faq.a}
                        </p>
                        <button className="flex items-center gap-1 text-[9px] font-black text-blue-500 uppercase mt-4">
                           Tìm hiểu thêm <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </section>

        {/* Footer info */}
        <div className="py-10 text-center space-y-4">
           <div className="flex justify-center gap-6">
              <button className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400"><FileText className="w-5 h-5" /></div>
                 <span className="text-[8px] font-black uppercase text-slate-600">Điều khoản</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                 <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-slate-400"><PhoneCall className="w-5 h-5" /></div>
                 <span className="text-[8px] font-black uppercase text-slate-600">Gọi điện</span>
              </button>
           </div>
           <p className="text-[9px] font-medium text-slate-600 uppercase tracking-widest">© 2024 EduSmart AI Learning. Phiên bản 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

const SupportActionItem = ({ icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick?: () => void }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between px-7 py-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-none group text-left">
    <div className="flex items-center gap-5">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
         <h4 className="text-sm font-black text-slate-200 italic tracking-tight">{title}</h4>
         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{desc}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-slate-700" />
  </button>
);

export default HelpCenterScreen;
