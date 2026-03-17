import { motion } from "framer-motion";
import {
  Target, Users, Sparkles, Award, History,
  Eye, ShieldCheck, ChevronRight, TrendingUp,
  Cpu, Code2, Globe, Layers, Quote, Presentation, 
  Settings, Zap, Monitor, ShoppingCart
} from "lucide-react";
import { assets } from "../../../data/assets";
import marketingData from "../../../data/marketing.json";
import DeepBackground from "../Inicio/DeepBackground";

// Componente de Passo a Passo (Branding Como Funciona)
const Step = ({ number, title, desc, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className="relative pl-16 group"
  >
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

export default function Missao() {
  return (
    <main className="min-h-screen bg-[#001B2F] relative overflow-hidden">
      
      {/* 🚀 Wrapper do Background: Restrito ao topo (Hero) */}
      <section className="relative overflow-hidden mb-20 bg-[#001B2F]">
        <div className="absolute inset-0 z-0">
          <DeepBackground
            videoUrl={assets.home.backgroundVideo}
            fallbackImage={assets.missao.background}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32">
          {/* Hero Section: Como Funciona Style (Grid) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                  <Target size={14} /> Nossa Essência
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                  MUDANDO O <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005695] to-[#00AEEF]">DESTINO.</span>
                </h2>
                <p className="text-white/40 text-xl leading-relaxed max-w-lg font-medium">
                  "{marketingData.mission_statement}"
                </p>
              </motion.div>

              <div className="space-y-4">
                 <Step 
                   number="01" 
                   title="Cultura Tech" 
                   desc="Promovemos a democratização do acesso às tecnologias digitais avançadas." 
                   icon={Globe} 
                   delay={0.1}
                 />
                 <Step 
                   number="02" 
                   title="Impacto Social" 
                   desc="Reduzimos as desigualdades através da educação e formação de talentos." 
                   icon={Users} 
                   delay={0.2}
                 />
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-[#00AEEF] blur-[150px] opacity-10" />
              <div className="bg-white/5 border border-white/10 p-6 rounded-[4rem] relative z-10 backdrop-blur-3xl shadow-3xl">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800" 
                    className="w-full h-[500px] object-cover rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000" 
                    alt="Missão Tech"
                  />
                  <div className="absolute -bottom-10 -right-10 bg-[#005695] p-8 rounded-[3rem] shadow-2xl border border-white/10 max-w-[200px] space-y-2">
                     <Award className="text-amber-500" size={32} />
                     <p className="text-white font-black text-xs uppercase tracking-widest">Excelência em <br /> Educação</p>
                  </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Conteúdo Restante: Sem background de vídeo (Fundo Sólido) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32 space-y-40">
        
        {/* Tribute Section: Structured informative cards */}
        <section className="space-y-20">
          <div className="text-center space-y-6">
            <h3 className="text-5xl font-black text-white tracking-tighter uppercase">Parceiro de Impacto</h3>
            <p className="text-[#00AEEF] font-black uppercase tracking-[0.4em] text-xs">VAI NA WEB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/[0.03] backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 space-y-6 group hover:border-[#00AEEF]/50 transition-all">
                <Quote className="text-[#00AEEF] opacity-30 group-hover:opacity-100 transition-opacity" size={40} />
                <h4 className="text-2xl font-black text-white tracking-tight">Visão de Julia Gillard</h4>
                <p className="text-white/40 text-lg leading-relaxed italic font-medium">
                  "Por meio de trabalho duro e educação, podemos promover uma economia forte."
                </p>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-[#005695]/30 to-transparent p-12 rounded-[4rem] border border-white/5 flex flex-col md:flex-row gap-12 items-center">
                <div className="w-40 h-40 rounded-full border-8 border-[#00AEEF] flex flex-col items-center justify-center p-4 shadow-[0_0_50px_rgba(0,174,239,0.2)]">
                  <span className="text-5xl font-black text-white">100%</span>
                  <span className="text-[10px] font-black uppercase text-[#00AEEF] tracking-widest text-center mt-2 leading-none">Lucro Reinvestido</span>
                </div>
                <div className="flex-1 space-y-4">
                   <h4 className="text-3xl font-black text-white tracking-tight leading-none uppercase">Educar para o Amanhã</h4>
                   <p className="text-white/50 text-xl font-medium">Toda vez que uma empresa contrata o Vai na Web, ela contribui para educar mais pessoas no mercado tech.</p>
                   <a href="https://vainaweb.com.br" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00AEEF] font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform">
                      Conheça o Modelo <ChevronRight size={16} />
                   </a>
                </div>
            </div>
          </div>
        </section>

        {/* Squads Flow: Steps Branding applied to roles */}
        <section className="space-y-16">
          <div className="flex items-center gap-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Esquadrões Digitais</h3>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
            {[
              { role: "Designer", icon: Layers, desc: "Foco na experiência e interface intuitiva." },
              { role: "Front-End", icon: Code2, desc: "Transformando design em código vivo." },
              { role: "Back-End", icon: Settings, desc: "Garantindo a robustez e segurança dos dados." },
              { role: "Product Owner", icon: Target, desc: "Alinhando vision de negócio e entregas." },
              { role: "Scrum Master", icon: Zap, desc: "Agilidade e performance contínua." },
              { role: "Teste e Qualidade", icon: ShieldCheck, desc: "Cultura de zero erro e segurança." },
            ].map((squad, i) => (
              <Step 
                key={i}
                number={String(i + 1).padStart(2, '0')}
                title={squad.role}
                desc={squad.desc}
                icon={squad.icon}
                delay={i * 0.1}
              />
            ))}
          </div>

          {/* 🖼️ Imagem de Impacto VNW (Nova Seção) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-[#00AEEF] blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="bg-white/5 border border-white/10 p-6 rounded-[4rem] relative z-10 backdrop-blur-3xl shadow-3xl overflow-hidden">
                <div className="relative aspect-video w-full overflow-hidden rounded-[3rem]">
                   <img 
                    src={assets.missao.background} 
                    className="w-full h-full object-cover grayscale-0 brightness-110 transition-transform duration-1000" 
                    alt="Impacto Vai na Web"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001B2F]/80 via-transparent to-transparent" />
                   <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-6">
                      <div className="space-y-2">
                        <span className="text-[#00AEEF] font-black uppercase tracking-[0.4em] text-[10px]">Território de Inovação</span>
                        <h4 className="text-4xl font-black text-white tracking-tighter">TRANSFORMANDO O BRASIL.</h4>
                      </div>
                      <div className="bg-white text-[#001B2F] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        VAI NA WEB • 2026
                      </div>
                   </div>
                </div>
            </div>
          </motion.div>
        </section>

        {/* Footer info blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[4rem] space-y-6">
              <ShieldCheck className="text-[#00AEEF]/40" size={40} />
              <h4 className="text-xl font-black text-white uppercase tracking-widest">Segurança & Direitos</h4>
              <p className="text-white/30 text-sm leading-relaxed font-medium">
                Atuamos como um hub educacional conectando parceiros e repositórios acadêmicos seguros.
              </p>
           </div>
           <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[4rem] space-y-6">
              <TrendingUp className="text-[#00AEEF]/40" size={40} />
              <h4 className="text-xl font-black text-white uppercase tracking-widest">Evolução Técnica</h4>
              <p className="text-white/30 text-sm leading-relaxed font-medium">
                Projeto desenvolvido com foco em escalabilidade, acessibilidade e SEO semântico.
              </p>
           </div>
        </div>

      </div>
    </main>
  );
}