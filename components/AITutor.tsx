
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, BrainCircuit, XCircle, Trophy, Zap, MessageCircle } from 'lucide-react';
import { getTutorResponse, generateQuiz } from '../services/geminiService';
import { Message, QuizQuestion } from '../types';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Xin chào Quốc Anh! Tôi là Lumina, gia sư AI của bạn. Hôm nay bạn cần giải đáp kiến thức nào?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await getTutorResponse(history, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const handleStartQuiz = async () => {
    setIsLoading(true);
    const lastTopic = messages.length > 1 ? messages[messages.length - 2].text : "General Learning";
    const generatedQuiz = await generateQuiz(lastTopic);
    if (generatedQuiz) {
      setQuiz(generatedQuiz);
      setQuizIndex(0);
      setScore(0);
      setShowQuizResult(false);
    }
    setIsLoading(false);
  };

  const handleQuizAnswer = (idx: number) => {
    if (!quiz) return;
    if (idx === quiz[quizIndex].correctAnswer) setScore(s => s + 1);
    if (quizIndex < quiz.length - 1) setQuizIndex(i => i + 1);
    else setShowQuizResult(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#0F172A] relative overflow-hidden">
      {/* Quiz UI Layer */}
      {quiz && (
        <div className="absolute inset-0 z-50 bg-[#0F172A] flex flex-col p-6 animate-in slide-in-from-bottom duration-500">
           {!showQuizResult ? (
              <div className="flex-1 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-xl">
                      <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest">Kiểm tra nhanh</span>
                  </div>
                  <button onClick={() => setQuiz(null)} className="p-2 bg-white/5 rounded-full text-slate-400">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
                    <span>Câu hỏi {quizIndex + 1}/{quiz.length}</span>
                    <span className="text-blue-500">{Math.round(((quizIndex + 1)/quiz.length) * 100)}% Hoàn thành</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]" style={{ width: `${((quizIndex + 1)/quiz.length) * 100}%` }} />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-6">
                  <h3 className="text-2xl font-black text-white leading-snug">{quiz[quizIndex].question}</h3>
                  <div className="grid gap-4">
                    {quiz[quizIndex].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleQuizAnswer(i)}
                        className="w-full text-left px-6 py-5 rounded-[28px] bg-[#1E293B] border border-white/5 hover:border-blue-500 hover:bg-blue-500/5 active:scale-95 transition-all font-bold text-slate-200"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
           ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 animate-in zoom-in duration-300">
                <div className="w-32 h-32 bg-blue-600 rounded-[48px] flex items-center justify-center shadow-2xl shadow-blue-900/40">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white mb-2">Tuyệt vời!</h2>
                  <p className="text-slate-400 font-medium">Bạn đã hoàn thành với <span className="text-blue-500 font-black">{score}/{quiz?.length}</span> câu đúng.</p>
                </div>
                <button 
                  onClick={() => { setQuiz(null); setShowQuizResult(false); }}
                  className="w-full max-w-[280px] bg-white text-[#0F172A] py-5 rounded-[28px] font-black text-lg active:scale-95 transition-all"
                >
                  Quay lại Chat
                </button>
              </div>
           )}
        </div>
      )}

      {/* Header */}
      <div className="flex-none bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-500/10 rounded-2xl flex items-center justify-center relative border border-blue-500/20 shadow-inner">
            <BrainCircuit className="text-blue-500 w-6 h-6" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0F172A]"></div>
          </div>
          <div>
            <h2 className="font-black text-white leading-none">Lumina AI</h2>
            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mt-1 block">Đang trực tuyến</span>
          </div>
        </div>
        <button 
          onClick={handleStartQuiz}
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-90 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          <Zap className={`w-3.5 h-3.5 fill-current ${isLoading ? 'animate-pulse' : ''}`} />
          Quiz Ngay
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7 scrollbar-none">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] px-6 py-4 shadow-xl relative
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-[30px] rounded-br-none' 
                : 'bg-[#1E293B] text-slate-100 rounded-[30px] rounded-bl-none border border-white/5'
              }
            `}>
              <p className="text-[15px] leading-relaxed font-semibold whitespace-pre-wrap">{msg.text}</p>
              <span className={`text-[9px] mt-3 block font-black uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1E293B] border border-white/5 rounded-[30px] rounded-bl-none px-6 py-5 shadow-lg flex gap-3 items-center">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Lumina đang nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="flex-none p-5 bg-[#0F172A] border-t border-white/5">
        <div className="relative flex items-center gap-3 max-w-lg mx-auto bg-[#1E293B] rounded-[32px] p-1.5 border border-white/5 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
          <input 
            type="text" 
            placeholder="Đặt câu hỏi cho Lumina..." 
            className="flex-1 bg-transparent px-5 py-4 text-slate-100 focus:outline-none font-bold placeholder:text-slate-500 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-900/40 disabled:bg-slate-800 disabled:text-slate-600 transition-all active:scale-90"
          >
            <Send className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
