import { motion } from "framer-motion";
import { 
  Search, HandHelping, Library, ChevronRight, 
  Sparkles, MapPin, Clock, Phone, Mail, 
  ShieldCheck, ArrowDown, Share2, Box, Truck 
} from "lucide-react";
import { Link } from "react-router-dom";
import { assets } from "../../../data/assets";
import marketingData from "../../../data/marketing.json";
import DeepBackground from "../Inicio/DeepBackground";

// Componente de Passo a Passo com Conexão Visual
const Step = ({ number, title, desc, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="relative pl-16 group"
  >
    {/* Linha Conectora Inteligente */}
    <div className="absolute left-[15px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-[#00AEEF]/40 to-transparent group-last:hidden" />
    
    <div className="absolute left-0 top-0 w-8 h-8 rounded-xl bg-[#005695]/20 border border-[#00AEEF]/30 flex items-center justify-center text-[#00AEEF] font-black text-xs z-10 group-hover:bg-[#00AEEF] group-hover:text-[#001B2F] transition-all duration-500 shadow-[0_0_15px_rgba(0,174,239,0.2)]">
       {number}
    </div>
    
    <div className="space-y-3 pb-12">
       <div className="flex items-center gap-3">
          <div className="text-white/20 group-hover:text-[#00AEEF] transition-colors">
            <Icon size={22} />
          </div>
          <h4 className="text-2xl font-black text-white tracking-tight group-hover:translate-x-1 transition-transform">{title}</h4>
       </div>
       <p className="text-white/40 text-lg leading-relaxed max-w-md font-medium">{desc}</p>
    </div>
  </motion.div>
);

export default function ComoFunciona() {
  const stepIcons = [HandHelping, Search, Library];

  return (
    <main className="min-h-screen bg-[#001B2F] relative overflow-hidden">
      <DeepBackground 
        videoUrl={assets.home.backgroundVideo} 
        fallbackImage={assets.comoFunciona.background} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32 space-y-32">
        
        {/* Hero: Simplicidade e Confiança */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
                <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                  <Sparkles size={14} /> Fluxo de Impacto Social
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  CONEXÃO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005695] to-[#00AEEF]">SEM ATRITO.</span>
                </h2>
                <p className="text-white/40 text-xl leading-relaxed max-w-lg font-medium">
                  Criamos uma ponte tecnológica para que livros encontrem novos donos de forma eficiente e segura.
                </p>
            </motion.div>

            <div className="space-y-4">
                {marketingData.how_it_works.steps.map((step, idx) => (
                   <Step 
                      key={idx}
                      number={idx + 1}
                      title={step.title}
                      desc={step.desc}
                      icon={stepIcons[idx]}
                      delay={0.1 * idx}
                   />
                ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/quero-doar" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#001B2F] rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#00AEEF] hover:text-white transition-all shadow-2xl active:scale-95">
                  Iniciar Doação <ChevronRight size={18} />
              </Link>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                <Share2 size={16} /> Espalhar a Ideia
              </button>
            </div>
          </div>

          {/* Imagem Visual com Glassmorphism Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-[#00AEEF] blur-[150px] opacity-10" />
            <div className="bg-white/5 border border-white/10 p-6 rounded-[4rem] relative z-10 backdrop-blur-3xl shadow-3xl">
                <img 
                  src={assets.comoFunciona.mainImage} 
                  className="w-full h-full object-cover rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000" 
                  alt="Comunidade Vai na Web"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-10 -left-10 bg-[#005695] p-8 rounded-[3rem] shadow-2xl border border-white/10 max-w-[200px] space-y-2">
                   <ShieldCheck className="text-[#00AEEF]" size={32} />
                   <p className="text-white font-black text-xs uppercase tracking-widest">Entrega <br /> 100% Segura</p>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Seção Logística: O que e Onde */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Card: O que doar? */}
            <div className="lg:col-span-4 bg-white/[0.03] backdrop-blur-3xl p-12 rounded-[4rem] space-y-8 border border-white/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-[#00AEEF]/5 transition-colors">
                  <Box size={160} />
               </div>
               <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                 <ArrowDown size={24} className="text-[#00AEEF]" /> O que doar?
               </h3>
               <ul className="space-y-4 relative z-10">
                  {marketingData.what_to_donate.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-white/50 text-sm font-bold group/item">
                       <div className="w-1.5 h-1.5 bg-[#005695] rounded-full group-hover/item:bg-[#00AEEF] transition-colors" /> 
                       {item}
                    </li>
                  ))}
               </ul>
               <div className="p-6 bg-white/5 rounded-3xl">
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest leading-relaxed">
                    📦 Nota Técnica: Acondicione em caixas para garantir que o conhecimento chegue intacto.
                  </p>
               </div>
            </div>

            {/* Card: Onde Entregar? (Logística Ativa) */}
            <div className="lg:col-span-8 bg-gradient-to-br from-[#005695]/20 to-transparent backdrop-blur-3xl p-12 rounded-[4rem] border border-[#005695]/30 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 text-[#00AEEF]/10 group-hover:scale-110 transition-transform duration-1000">
                  <MapPin size={300} />
              </div>
              
              <div className="relative z-10 space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-tighter">Ponto de Coleta Principal</h3>
                    <p className="text-white/40 font-medium max-w-md">Estamos localizados em um ponto estratégico para facilitar sua entrega.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div className="flex items-start gap-4">
                          <div className="bg-[#00AEEF] p-3 rounded-xl text-[#001B2F] shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <p className="text-white font-bold text-lg">{marketingData.how_it_works.logistics.address}</p>
                            <span className="text-white/30 text-xs font-black uppercase tracking-widest">Endereço Oficial</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="bg-white/5 p-3 rounded-xl text-white/40">
                            <Clock size={20} />
                          </div>
                          <div>
                            <p className="text-white font-bold">{marketingData.how_it_works.logistics.hours}</p>
                            <span className="text-white/30 text-xs font-black uppercase tracking-widest">Horário de Funcionamento</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex items-center gap-4">
                          <div className="bg-white/5 p-3 rounded-xl text-white/40">
                            <Phone size={20} />
                          </div>
                          <p className="text-white font-bold">{marketingData.how_it_works.logistics.phone}</p>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="bg-white/5 p-3 rounded-xl text-white/40">
                            <Mail size={20} />
                          </div>
                          <p className="text-white font-bold">{marketingData.support_links.email}</p>
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <a 
                      href={marketingData.how_it_works.logistics.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#059669] transition-all shadow-xl shadow-emerald-500/10"
                    >
                      Agendar via WhatsApp <Truck size={18} />
                    </a>
                    <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                      Abrir no Maps
                    </button>
                  </div>
              </div>
            </div>
        </section>
      </div>
    </main>
  );
}