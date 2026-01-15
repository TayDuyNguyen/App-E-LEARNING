
import React from 'react';
import { ArrowLeft, Bell, Trophy, MessageSquare, Zap, MoreVertical, CheckCheck } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NOTIFS = [
  { id: 1, type: 'course', title: 'Khóa học mới!', desc: 'Sarah Jenkins vừa đăng bài giảng mới về Prototyping.', time: '2 giờ trước', icon: <Zap className="text-blue-500" />, bg: 'bg-blue-500/10', unread: true },
  { id: 2, type: 'achievement', title: 'Chúc mừng!', desc: 'Bạn đã đạt chuỗi học tập 7 ngày liên tiếp. Nhận 50 XP!', time: '6 giờ trước', icon: <Trophy className="text-amber-500" />, bg: 'bg-amber-500/10', unread: true },
  { id: 3, type: 'tutor', title: 'AI Gia sư', desc: 'Lumina đã trả lời câu hỏi của bạn về React Hooks.', time: 'Hôm qua', icon: <MessageSquare className="text-emerald-500" />, bg: 'bg-emerald-500/10', unread: false },
  { id: 4, type: 'system', title: 'Cập nhật hệ thống', desc: 'Phiên bản 1.0.2 đã sẵn sàng với nhiều cải tiến UI.', time: '2 ngày trước', icon: <Bell className="text-slate-400" />, bg: 'bg-slate-400/10', unread: false },
];

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-[#0F172A] animate-in slide-in-from-right duration-300">
      <div className="p-5 flex items-center justify-between border-b border-white/5 bg-[#0F172A]/90 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-300 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black text-white italic">Thông báo</h2>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
          <CheckCheck className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Mới nhất</h3>
          <span className="px-2 py-0.5 bg-blue-600 rounded-md text-[9px] font-black text-white uppercase tracking-tighter">2 Mới</span>
        </div>
        
        <div className="space-y-5">
          {NOTIFS.map(notif => (
            <div key={notif.id} className={`flex gap-5 p-5 rounded-[32px] transition-all relative border border-white/5 ${notif.unread ? 'bg-[#1E293B] shadow-2xl' : 'opacity-60 bg-white/2 hover:opacity-100'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/5 ${notif.bg} shadow-inner`}>
                {React.cloneElement(notif.icon as any, { className: 'w-6 h-6' })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight truncate">{notif.title}</h4>
                  {notif.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>}
                </div>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-3 line-clamp-2">{notif.desc}</p>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="py-20 text-center space-y-3">
          <div className="w-16 h-1 bg-slate-800 mx-auto rounded-full"></div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Đã hiển thị tất cả</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen;
