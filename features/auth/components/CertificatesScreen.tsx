
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, Share2, Download, 
  Award, ShieldCheck, ChevronRight, FileText,
  Filter, Star, Plus
} from 'lucide-react';
import { Certificate } from '../../../types/index';

interface CertificatesScreenProps {
  onBack: () => void;
  onCertificateClick: (cert: Certificate) => void;
}

const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    courseName: 'UI/UX Masterclass 2024',
    issueDate: '20 Tháng 1, 2024',
    instructor: 'Sarah Jenkins',
    credentialId: 'EDU-7842-X90',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=400',
    grade: 'A+'
  },
  {
    id: 'cert-2',
    courseName: 'Figma Auto Layout Advanced',
    issueDate: '05 Tháng 12, 2023',
    instructor: 'Sarah Jenkins',
    credentialId: 'EDU-1102-Y54',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    grade: 'A'
  },
  {
    id: 'cert-3',
    courseName: 'Design System Architecture',
    issueDate: '12 Tháng 11, 2023',
    instructor: 'David Kwon',
    credentialId: 'EDU-9921-Z33',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400',
    grade: 'B+'
  }
];

const CertificatesScreen: React.FC<CertificatesScreenProps> = ({ onBack, onCertificateClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = MOCK_CERTIFICATES.filter(cert => 
    cert.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white animate-in slide-in-from-right duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-black italic tracking-tight">Chứng chỉ</h2>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {MOCK_CERTIFICATES.length} Chứng chỉ đã đạt
              </p>
            </div>
          </div>
          <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text"
            placeholder="Tìm chứng chỉ..."
            className="w-full bg-[#1E293B] border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Certificate List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none pb-32">
        {filteredCerts.length > 0 ? (
          filteredCerts.map((cert) => (
            <div 
              key={cert.id}
              onClick={() => onCertificateClick(cert)}
              className="bg-[#1E293B] border border-white/5 rounded-[32px] overflow-hidden active:scale-[0.98] transition-all cursor-pointer group hover:bg-[#253249]"
            >
              <div className="relative h-32 overflow-hidden">
                <img src={cert.image} className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent" />
                <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-emerald-400 uppercase tracking-widest border border-emerald-500/30 flex items-center gap-1">
                   <ShieldCheck className="w-3 h-3" /> Verified
                </div>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                   <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                      <Award className="w-7 h-7 text-white" />
                   </div>
                   <div>
                      <h3 className="text-base font-black text-white italic tracking-tight">{cert.courseName}</h3>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{cert.issueDate}</p>
                   </div>
                </div>
              </div>
              <div className="p-6 pt-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="text-center">
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Xếp loại</p>
                      <p className="text-sm font-black text-blue-500 italic leading-none">{cert.grade}</p>
                   </div>
                   <div className="w-px h-6 bg-white/5" />
                   <div>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1">Mã định danh</p>
                      <p className="text-[10px] font-bold text-slate-400 leading-none">{cert.credentialId}</p>
                   </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-700">
              <Award className="w-10 h-10" />
            </div>
            <p className="text-sm font-black text-slate-500 uppercase tracking-[0.2em]">Chưa có chứng chỉ nào</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-[#0F172A]/80 backdrop-blur-2xl border-t border-white/5 p-6 flex justify-between items-center z-40 safe-pb">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
               <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GPA Tổng kết</p>
               <p className="text-lg font-black text-white italic">3.8 / 4.0</p>
            </div>
         </div>
         <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/30 active:scale-95 transition-all flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Chia sẻ hồ sơ
         </button>
      </div>
    </div>
  );
};

export default CertificatesScreen;
