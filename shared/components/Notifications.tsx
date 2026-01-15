
import React, { useState } from 'react';
import { 
  ArrowLeft, Bell, Trophy, MessageSquare, Zap, 
  MoreVertical, CheckCheck, Trash2, Settings, 
  UserPlus, Star, Layout, ChevronRight, X
} from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
}

type NotifCategory = 'all' | 'unread' | 'system' | 'social';

const CATEGORIES: { label: string; value: NotifCategory }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Chưa đọc', value: 'unread' },
  { label: 'Hệ thống', value: 'system' },
  { label: 'Xã hội', value: 'social' },
];

const INITIAL_NOTIFS = [
  { id: 1, type: 'course', category: 'system', title: 'Khóa học mới!', desc: 'Sarah Jenkins vừa đăng bài giảng mới về Prototyping nâng cao.', time: '2 giờ trước', icon: <Zap />, bg: 'bg-blue-500/10', color: 'text-blue-500', unread: true },
  { id: 2, type: 'achievement', category: 'system', title: 'Hạng S đạt được!', desc: 'Bạn đã đạt chuỗi học tập 7 ngày liên tiếp. Nhận 150 XP ngay!', time: '6 giờ trước', icon: <Trophy />, bg: 'bg-amber-500/10', color: 'text-amber-500', unread: true },
  { id: 3, type: 'social', category: 'social', title: 'Thanh Trúc đã nhắc đến bạn', desc: '"@QuocAnh Bạn có thể chia sẻ file Figma này không?"', time: 'Hôm qua', icon: <MessageSquare />, bg: 'bg-emerald-500/10', color: 'text-emerald-500', unread: false },
  { id: 4, type: 'system', category: 'system', title: 'Cập nhật hệ thống', desc: 'Phiên bản 2.1.0 đã sẵn sàng với tính năng Nhóm học tập mới.', time: '2 ngày trước', icon: <Bell />, bg: 'bg-slate-400/10', color: 'text-slate-400', unread: false },
  { id: 5, type: 'social', category: 'social', title: 'Yêu cầu tham gia nhóm', desc: 'Minh Tú muốn tham gia nhóm "UI Design Pro" của bạn.', time: '3 ngày trước', icon: <UserPlus />, bg: 'bg-indigo-500/10', color: 'text-indigo-500', unread: false },
];

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<NotifCategory>('all');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);

  const filteredNotifs = notifications.filter(n => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'unread') return n.unread;
    return n.category === activeCategory;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const removeNotif = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-[#0F172A] animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-black text-white italic tracking-tight">Thông báo</h2>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Categories & Actions */}
        <div className="space-y-5">
          <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-6 px-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat.value 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-[#1E293B] text-slate-500 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-1">
            <button 
              onClick={markAllRead}
              className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Đánh dấu đã đọc
            </button>
            <button 
              onClick={clearAll}
              className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-6 pb-32">
        {filteredNotifs.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifs.map(notif => (
              <div 
                key={notif.id} 
                className={`group flex gap-5 p-5 rounded-[32px] transition-all relative border border-white/5 ${
                  notif.unread ? 'bg-[#1E293B] shadow-2xl ring-1 ring-blue-500/20' : 'bg-white/2 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/5 ${notif.bg} shadow-inner`}>
                  {React.cloneElement(notif.icon as any, { className: `w-6 h-6 ${notif.color}` })}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight truncate pr-4">{notif.title}</h4>
                    <div className="flex items-center gap-2">
                      {notif.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>}
                      <button onClick={() => removeNotif(notif.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-500 transition-all">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed mb-3 line-clamp-2">{notif.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{notif.time}</span>
                    <button className="text-[9px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1 group/btn">
                      Chi tiết <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-150"></div>
              <div className="w-24 h-24 rounded-[40px] bg-[#1E293B] border border-white/5 flex items-center justify-center text-slate-700 relative z-10">
                <Bell className="w-12 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white italic">Không có thông báo mới</h3>
              <p className="text-slate-500 text-xs font-medium max-w-[200px] mx-auto leading-relaxed">
                Chúng tôi sẽ thông báo cho bạn khi có cập nhật hoặc hoạt động mới.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;
