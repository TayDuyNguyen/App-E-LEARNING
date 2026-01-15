
import React, { useState } from 'react';
import { ArrowLeft, Send, Paperclip, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactSupportScreenProps {
  onBack: () => void;
}

type IssueType = 'Lỗi kỹ thuật' | 'Thanh toán' | 'Nội dung học' | 'Yêu cầu tính năng' | 'Khác';

const ContactSupportScreen: React.FC<ContactSupportScreenProps> = ({ onBack }) => {
  const [type, setType] = useState<IssueType>('Lỗi kỹ thuật');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0F172A] p-8 text-center space-y-10 animate-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500 blur-[100px] opacity-20 scale-150" />
          <div className="w-40 h-40 bg-emerald-500/10 rounded-[48px] border-4 border-emerald-500/20 flex items-center justify-center relative z-10">
             <CheckCircle2 className="w-20 h-20 text-emerald-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl font-black italic text-white tracking-tight">Yêu cầu đã gửi!</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[260px] mx-auto">
            Cảm ơn bạn đã phản hồi. Chúng tôi sẽ phản hồi qua Email của bạn trong vòng 24 giờ tới.
          </p>
        </div>

        <button 
          onClick={onBack}
          className="w-full max-w-xs py-6 bg-white text-[#0F172A] rounded-[32px] font-black text-lg shadow-xl active:scale-95 transition-all"
        >
          Quay lại trang chính
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight">Liên hệ hỗ trợ</h2>
        </div>
        <div className="w-11" />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6 space-y-8 pb-32">
         {/* Form Guide */}
         <div className="flex items-start gap-4 p-6 bg-blue-600/10 border border-blue-500/20 rounded-[32px]">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg">
               <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
               <h4 className="text-sm font-black text-white italic">Chúng tôi luôn lắng nghe</h4>
               <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
                 Hãy mô tả chi tiết vấn đề của bạn để đội ngũ kỹ thuật có thể hỗ trợ nhanh chóng nhất.
               </p>
            </div>
         </div>

         <div className="space-y-6">
            {/* Issue Type Picker */}
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Loại yêu cầu</label>
               <div className="relative">
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as IssueType)}
                    className="w-full bg-[#1E293B] border border-white/5 rounded-[24px] px-6 py-4 text-sm font-bold text-white appearance-none outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  >
                    <option>Lỗi kỹ thuật</option>
                    <option>Thanh toán</option>
                    <option>Nội dung học</option>
                    <option>Yêu cầu tính năng</option>
                    <option>Khác</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
               </div>
            </div>

            {/* Subject Input */}
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tiêu đề</label>
               <input 
                 type="text" 
                 placeholder="Vấn đề ngắn gọn (vd: Không thể tải video bài học)"
                 className="w-full bg-[#1E293B] border border-white/5 rounded-[24px] px-6 py-4 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-700"
                 value={subject}
                 onChange={(e) => setSubject(e.target.value)}
               />
            </div>

            {/* Message Input */}
            <div className="space-y-3">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả chi tiết</label>
               <textarea 
                 rows={6}
                 placeholder="Mô tả cụ thể sự cố bạn gặp phải hoặc ý tưởng của bạn..."
                 className="w-full bg-[#1E293B] border border-white/5 rounded-[32px] px-6 py-6 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-700 resize-none leading-relaxed"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
               />
            </div>

            {/* Attachment Button */}
            <button className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-dashed border-white/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white/10 transition-colors">
               <Paperclip className="w-4 h-4" /> Đính kèm ảnh chụp màn hình
            </button>
         </div>
      </div>

      {/* Fixed Footer Action */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-6 safe-pb z-40">
        <button 
          onClick={handleSubmit}
          disabled={!subject.trim() || !message.trim() || isSubmitting}
          className="w-full bg-blue-600 text-white py-5 rounded-[32px] font-black text-lg shadow-2xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isSubmitting ? (
             <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Đang gửi yêu cầu...</span>
             </div>
          ) : (
             <>Gửi yêu cầu <Send className="w-5 h-5 fill-current" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactSupportScreen;
