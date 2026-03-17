import { Facebook, Twitter, Youtube, Linkedin, Instagram, Phone, Heart, Users, ShieldCheck, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import marketingData from '../../data/marketing.json';

export default function Footer({ onSupportClick }) {
  return (
    <footer className="relative bg-[#001B2F] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={assets.queroDoar.background} 
          alt="Footer Background" 
          className="w-full h-full object-cover opacity-10 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001B2F] via-[#001B2F]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center md:text-left">
        <div className="space-y-6 flex flex-col items-center md:items-start">
           <h3 className="text-white text-xl font-black tracking-tighter uppercase">
             Livros <span className="text-[#005695]">VNW</span>
           </h3>
           <p className="text-white/80 text-sm leading-relaxed max-w-xs font-medium">
             {marketingData.tagline}
           </p>
           <button 
             onClick={onSupportClick}
             className="flex items-center gap-2 text-[#00AEEF] font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
           >
              <Heart size={14} className="fill-current" /> Obter Ajuda
           </button>
        </div>

        <div className="space-y-6">
           <h4 className="text-white font-bold text-sm uppercase tracking-widest">Links Rápidos</h4>
           <div className="grid gap-3">
              <Link to="/missao" className="text-white/70 hover:text-white text-sm transition-all font-medium">Nossa Missão</Link>
              <Link to="/como-funciona" className="text-white/70 hover:text-white text-sm transition-all font-medium">Como Funciona</Link>
              <a href={marketingData.github_url} className="text-white/70 hover:text-white text-sm transition-all font-medium">Open Source</a>
           </div>
        </div>

        <div className="space-y-6">
           <h4 className="text-white font-bold text-sm uppercase tracking-widest">Desenvolvedor</h4>
           <div className="grid gap-3">
              <a href={marketingData.portfolio_url} className="text-white/70 hover:text-white text-sm transition-all font-medium">Portfólio</a>
              <a href={marketingData.github_url} className="text-white/70 hover:text-white text-sm transition-all font-medium">GitHub Profile</a>
              <a href={`mailto:${marketingData.support_links.email}`} className="text-white/70 hover:text-white text-sm transition-all font-medium">Contato Profissional</a>
           </div>
        </div>

        <div className="space-y-6">
           <h4 className="text-white font-bold text-sm uppercase tracking-widest">Siga-nos</h4>
            <div className="flex gap-4 justify-center md:justify-start">
               {[
                 { icon: Instagram, url: "#" },
                 { icon: Facebook, url: "#" },
                 { icon: Linkedin, url: marketingData.linkedin_url },
                 { icon: Github, url: marketingData.github_url }
               ].map((social, i) => (
                 <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="group bg-white/5 p-3 rounded-2xl hover:bg-[#005695] transition-all">
                   <social.icon size={20} className="text-white/80 group-hover:text-white transition-colors" />
                 </a>
               ))}
            </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="space-y-1 order-2 md:order-1 flex flex-col items-center md:items-start text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 drop-shadow-md">
            &copy; 2026 {marketingData.project_name}. Construído com <Heart size={10} className="text-[#00AEEF] fill-current" /> por <a href={marketingData.portfolio_url} className="text-white hover:text-[#00AEEF] transition-colors text-base lowercase tracking-normal font-normal pl-1" style={{ fontFamily: "'Dancing Script', cursive", textShadow: "0 0 15px rgba(0, 174, 239, 0.4)" }}>{marketingData.developer_name}</a>
          </p>
          <p className="text-white/60 text-[8px] font-bold uppercase tracking-[0.1em]">
            Projeto Educacional @ Vai na Web | Foco em Portfólio & Criatividade
          </p>
        </div>
        <div className="flex gap-6 order-1 md:order-2">
           <ShieldCheck size={16} className="text-white/40" />
           <Users size={16} className="text-white/40" />
        </div>
      </div>
    </footer>
  );
}
