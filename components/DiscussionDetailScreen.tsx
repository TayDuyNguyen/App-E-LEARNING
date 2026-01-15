
import React, { useState } from 'react';
import { 
  ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown, Share2, 
  MoreVertical, Send, User, ChevronRight, Heart, 
  CheckCircle2, Flag, UserPlus, CornerDownRight, ShieldCheck
} from 'lucide-react';
import { Discussion, Comment } from '../types';

interface DiscussionDetailScreenProps {
  discussion: Discussion;
  onBack: () => void;
  onAuthorClick: (userId: string) => void;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: { id: 'u2', name: "Minh Tú", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tu" },
    content: "Cảm ơn bạn đã chia sẻ, mình thấy phần xử lý variant trong component là quan trọng nhất để tạo ra một Design System linh hoạt.",
    date: "1 giờ trước",
    likes: 12,
    upvotes: 15,
    downvotes: 2,
    userVote: 1,
    isSolution: true,
    replies: [
      {
        id: 'c1-1',
        author: { id: 'u1', name: "Hoàng Minh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoang" },
        content: "Đúng vậy! Đặc biệt là khi kết hợp với Boolean variables trong Figma mới.",
        date: "45 phút trước",
        likes: 4,
        upvotes: 5,
        downvotes: 0,
      }
    ]
  },
  {
    id: 'c2',
    author: { id: 'u3', name: "Quốc Anh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuocAnh" },
    content: "Mình cũng đang gặp vấn đề tương tự với responsive design cho mobile, hy vọng có ai đó chia sẻ thêm tutorial về phần này.",
    date: "30 phút trước",
    likes: 5,
    upvotes: 8,
    downvotes: 1,
  }
];

const DiscussionDetailScreen: React.FC<DiscussionDetailScreenProps> = ({ discussion, onBack, onAuthorClick }) => {
  const [commentText, setCommentText] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  
  // Assume current user ID is 'u1' (Hoàng Minh) for demo purposes
  const currentUserId = 'u1';
  const isAuthor = discussion.author.id === currentUserId;

  const handleMarkAsSolution = (commentId: string) => {
    if (!isAuthor) return;
    setComments(prev => prev.map(c => ({
      ...c,
      isSolution: c.id === commentId
    })));
  };

  const renderComment = (comment: Comment, isNested = false) => (
    <div key={comment.id} className={`flex gap-4 ${isNested ? 'ml-8 mt-4 border-l-2 border-white/5 pl-4' : 'mt-8'}`}>
      <img 
        src={comment.author.avatar} 
        className="w-10 h-10 rounded-xl flex-shrink-0 cursor-pointer" 
        alt={comment.author.name} 
        onClick={() => onAuthorClick(comment.author.id)}
      />
      <div className="flex-1 space-y-3">
        <div className={`p-5 rounded-[28px] border transition-all ${comment.isSolution ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-[#1E293B] border-white/5'}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h5 className="text-[11px] font-black text-blue-400 italic cursor-pointer hover:underline" onClick={() => onAuthorClick(comment.author.id)}>{comment.author.name}</h5>
              {comment.isSolution && (
                <span className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Giải pháp
                </span>
              )}
            </div>
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{comment.date}</span>
          </div>
          <p className="text-xs font-medium text-slate-300 leading-relaxed">{comment.content}</p>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
              <button className={`p-1.5 rounded-full transition-colors ${comment.userVote === 1 ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-white'}`}>
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-black text-slate-400 px-1">{comment.upvotes - comment.downvotes}</span>
              <button className={`p-1.5 rounded-full transition-colors ${comment.userVote === -1 ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-white'}`}>
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <button className="text-[9px] font-black text-slate-600 uppercase tracking-widest hover:text-blue-500 transition-colors">Trả lời</button>
            {isAuthor && !comment.isSolution && (
              <button 
                onClick={() => handleMarkAsSolution(comment.id)}
                className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest hover:text-emerald-500 transition-colors"
              >
                Đánh dấu giải pháp
              </button>
            )}
          </div>
          <button className="text-slate-700 hover:text-rose-500 transition-colors"><Flag className="w-3.5 h-3.5" /></button>
        </div>

        {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Chi tiết thảo luận</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${isFollowing ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/5 text-slate-400'}`}
          >
            {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
          </button>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-40">
        {/* Main Post Content */}
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onAuthorClick(discussion.author.id)}>
              <div className="relative">
                <img src={discussion.author.avatar} className="w-14 h-14 rounded-2xl border border-white/10 group-hover:scale-105 transition-transform" alt={discussion.author.name} />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-lg p-1 border-2 border-[#0F172A]">
                  <UserPlus className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-black text-white italic tracking-tight group-hover:text-blue-400">{discussion.author.name}</h3>
                <div className="flex items-center gap-2">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{discussion.date}</p>
                   <span className="w-1 h-1 bg-slate-700 rounded-full" />
                   <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{discussion.category}</p>
                </div>
              </div>
            </div>
            <button className="p-2 text-slate-500 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
          </div>

          <div className="space-y-5">
            <h1 className="text-3xl font-black text-white leading-tight tracking-tight italic">
              {discussion.title}
            </h1>
            <div className="bg-[#1E293B]/60 backdrop-blur-md border border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <MessageSquare className="w-24 h-24" />
              </div>
              <p className="text-sm font-medium text-slate-300 leading-relaxed whitespace-pre-wrap relative z-10">
                {discussion.content}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 py-2">
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase">{discussion.likesCount} upvotes</span>
            </div>
            <div className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase">{discussion.repliesCount} phản hồi</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase">Lưu lại</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="px-6 space-y-8">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Cộng đồng thảo luận</h4>
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              Mới nhất <ChevronRight className="w-3.5 h-3.5 rotate-90" />
            </div>
          </div>

          <div className="space-y-2">
             {comments.map(comment => renderComment(comment))}
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/90 backdrop-blur-2xl border-t border-white/5 p-6 z-[60] flex items-center gap-4 safe-pb shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
           <User className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 bg-[#1E293B] border border-white/5 rounded-[24px] px-5 py-3.5 flex items-center gap-3 group focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input 
            type="text" 
            placeholder="Viết phản hồi của bạn..."
            className="flex-1 bg-transparent text-sm font-medium text-white outline-none placeholder:text-slate-600"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className={`p-2 rounded-xl transition-all ${commentText.trim() ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600'}`}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetailScreen;
