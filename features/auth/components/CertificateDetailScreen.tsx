
import React from 'react';
import { 
  ArrowLeft, Download, Share2, Award, 
  ShieldCheck, ExternalLink, Linkedin, 
  User, Calendar, CheckCircle2, QrCode
} from 'lucide-react';
import { Certificate } from '../../../types/index';

interface CertificateDetailScreenProps {
  cert: Certificate;
  onBack: () => void;
}

const CertificateDetailScreen: React.FC<CertificateDetailScreenProps> = ({ cert, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-white animate-in zoom-in-95 duration-500 overflow-y-auto scrollbar-none pb-40">
      {/* Header */}
      <div className="p-6 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl text-slate-400 active:scale-90 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-black italic tracking-tight">Chi tiết chứng chỉ</h2>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-400">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Certificate Preview Card */}
        <div className="bg-white rounded-[40px] p-8 text-[#0F172A] relative overflow-hidden shadow-2xl shadow-blue-900/20 aspect-[1.4/1] flex flex-col justify-between">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-8 border-l-8 border-blue-600 rounded-tl-[40px]"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-8 border-r-8 border-blue-600 rounded-br-[40px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-12">
             <Award className="w-64 h-64" />
          </div>

          <div className="text-center space-y-1 relative z-10">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Chứng nhận hoàn thành</h3>
             <div className="w-12 h-0.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="text-center space-y-6 relative z-10">
             <div className="space-y-1">
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Dành cho học viên</p>
                <h4 className="text-2xl font-black italic tracking-tight">QUỐC ANH</h4>
             </div>
             
             <div className="space-y-1">
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Đã hoàn thành xuất sắc khóa học</p>
                <h5 className="text-lg font-black text-blue-800 uppercase tracking-tighter">{cert.courseName}</h5>
             </div>
          </div>

          <div className="flex justify-between items-end relative z-10">
             <div className="space-y-1">
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Ngày cấp: {cert.issueDate}</p>
                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">ID: {cert.credentialId}</p>
             </div>
             <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                   <QrCode className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-[6px] font-black uppercase tracking-tighter text-slate-400">Quét để xác minh</p>
             </div>
          </div>
        </div>

        {/* Info List */}
        <div className="bg-[#1E293B] border border-white/5 rounded-[40px] overflow-hidden divide-y divide-white/5 shadow-xl">
           <InfoItem icon={<User className="text-blue-400" />} label="Giảng viên đào tạo" value={cert.instructor} />
           <InfoItem icon={<Calendar className="text-emerald-400" />} label="Thời hạn chứng chỉ" value="Vĩnh viễn" />
           <InfoItem icon={<ShieldCheck className="text-amber-400" />} label="Trạng thái xác thực" value="Đã xác thực" isVerified />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
           <button className="bg-white text-[#0F172A] py-5 rounded-[32px] flex flex-col items-center gap-2 shadow-xl active:scale-95 transition-all">
              <Download className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Tải PDF</span>
           </button>
           <button className="bg-[#0077B5] text-white py-5 rounded-[32px] flex flex-col items-center gap-2 shadow-xl active:scale-95 transition-all border border-white/10">
              <Linkedin className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Thêm LinkedIn</span>
           </button>
        </div>

        <button className="w-full py-6 bg-blue-600/10 border border-blue-600/20 rounded-[32px] flex items-center justify-center gap-3 text-blue-500 font-black text-sm uppercase tracking-[0.2em] active:scale-95 transition-all group">
           Xác minh trên Blockchain
           <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>

        {/* Achievement Meta */}
        <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-transparent border border-white/5 rounded-[32px] flex items-center gap-5">
           <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-8 h-8 text-white" />
           </div>
           <div>
              <h4 className="text-sm font-black text-white italic">Huy hiệu "Chuyên gia Design"</h4>
              <p className="text-[10px] font-medium text-indigo-400 uppercase tracking-widest mt-0.5">+500 XP Đã cộng vào hồ sơ</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, isVerified = false }: { icon: any, label: string, value: string, isVerified?: boolean }) => (
  <div className="flex items-center justify-between px-7 py-6">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-2xl bg-[#0F172A] border border-white/5">
        {icon}
      </div>
      <div>
         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
         <p className="text-sm font-black text-slate-200 italic tracking-tight">{value}</p>
      </div>
    </div>
    {isVerified && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
  </div>
);

export default CertificateDetailScreen;
