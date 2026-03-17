import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../../hooks/useProfile";
import { 
  Package, Truck, CheckCircle, Clock, Trash2, 
  BookOpen, Heart, Sparkles, ChevronRight, 
  Leaf, Trophy, Share2, ShieldCheck, Download
} from "lucide-react";
import { useState, useMemo, memo } from "react";
import { assets } from "../../../data/assets";
import DeepBackground from "../Inicio/DeepBackground";

// Timeline Otimizada com Framer Motion
const TrackingTimeline = memo(({ steps }) => (
  <div className="relative mt-8 space-y-6">
    {steps?.map((step, idx) => (
      <motion.div 
        key={idx} 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
        className="flex gap-5 relative"
      >
        {idx !== steps.length - 1 && (
          <div className={`absolute left-[11px] top-6 w-[2px] h-[calc(100%+8px)] ${step.completed ? 'bg-[#00AEEF]' : 'bg-white/5'}`} />
        )}
        <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center z-10 transition-colors duration-500 ${
          step.completed ? 'bg-[#00AEEF] border-[#001B2F] shadow-[0_0_15px_rgba(0,174,239,0.3)]' : 'bg-[#001B2F] border-white/5'
        }`}>
          {step.completed && <CheckCircle size={10} className="text-[#001B2F]" strokeWidth={4} />}
        </div>
        <div className="flex flex-col">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step.completed ? 'text-white' : 'text-white/20'}`}>
            {step.label}
          </span>
          <span className="text-[9px] text-white/40 font-medium">{step.date}</span>
        </div>
      </motion.div>
    ))}
  </div>
));

// Card de Métrica ESG (Resultados Reais)
const ImpactMetric = ({ icon: Icon, label, value, color, suffix }) => (
  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col gap-3 group hover:border-white/20 transition-all">
    <div className="p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform" style={{ color }}>
      <Icon size={20} />
    </div>
    <div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-white">{value}</span>
        <span className="text-[10px] font-black text-white/30 uppercase">{suffix}</span>
      </div>
      <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-1">{label}</p>
    </div>
  </div>
);

export default function MeusLivros() {
  const { reservations, myDonations, removeReservation, profile } = useProfile();

  // Cálculo de Impacto em tempo real
  const metrics = useMemo(() => ({
    co2: (myDonations.length * 1.3).toFixed(1), // $1.3 \text{ kg CO}_2$ por livro
    score: (myDonations.length * 150) + (reservations.length * 40),
    learningHours: reservations.length * 12
  }), [myDonations, reservations]);

  return (
    <main className="min-h-screen bg-[#001B2F] relative overflow-hidden selection:bg-[#00AEEF]/30">
      <DeepBackground 
        videoUrl={assets.home.backgroundVideo} 
        fallbackImage={assets.meusLivros.background} 
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Header de Impacto */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                <ShieldCheck size={14} /> Perfil Verificado: {profile?.name || "Dev"}
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                MEU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#005695]">IMPACTO.</span>
              </h2>
            </div>

            {/* Marquee Infinito Dinâmico */}
            <div className="relative w-full lg:w-72 h-16 bg-white/[0.03] backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden flex items-center">
              <motion.div 
                animate={{ x: [0, -200] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="whitespace-nowrap flex gap-12 text-[10px] font-black text-[#00AEEF] uppercase tracking-[0.4em] opacity-40"
              >
                <span>Status: Ativo</span>
                <span>Membro Colaborador</span>
                <span>Eco-Friendly Dev</span>
                <span>Status: Ativo</span>
              </motion.div>
            </div>
          </div>

          {/* Grid de Estatísticas (Resultados) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <ImpactMetric icon={Leaf} label="CO2 Evitado" value={metrics.co2} suffix="kg" color="#10b981" />
          <ImpactMetric icon={Trophy} label="Social Score" value={metrics.score} suffix="pts" color="#00AEEF" />
          <ImpactMetric icon={BookOpen} label="Tempo de Estudo" value={metrics.learningHours} suffix="h" color="#fbbf24" />
          
          {/* Market Insights (Rastreabilidade) */}
          <div className="bg-gradient-to-br from-[#00AEEF]/20 to-transparent backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] flex flex-col gap-3 group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
               <Share2 size={80} />
             </div>
             <div className="p-3 bg-white/5 rounded-2xl w-fit text-white">
               <Share2 size={20} />
             </div>
             <div>
               <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-black text-white">128</span>
                 <span className="text-[10px] font-black text-[#00AEEF] uppercase">Clicks</span>
               </div>
               <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-1">Alcance Amazon</p>
             </div>
          </div>
        </div>
            {/* CTA Certificado */}
            <button className="bg-white text-[#001B2F] p-6 rounded-[2.5rem] flex items-center justify-between group hover:bg-[#00AEEF] hover:text-white transition-all shadow-2xl">
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Badge LinkedIn</p>
                <h4 className="text-lg font-black leading-tight">Certificado <br /> de Impacto</h4>
              </div>
              <Download size={24} className="group-hover:translate-y-1 transition-transform" />
            </button>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Coluna de Reservas (Trackeamento) */}
          <section className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                <Truck className="text-[#00AEEF]" /> Entregas em Curso
              </h3>
              <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">{reservations.length} Ativas</span>
            </div>

            <AnimatePresence mode="popLayout">
              {reservations.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[3.5rem] flex flex-col md:flex-row gap-10 relative group hover:bg-white/[0.05] transition-all"
                >
                  <div className="w-full md:w-40 aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0">
                    <img 
                      src={book.image_url || assets.placeholders.bookCover} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = assets.placeholders.bookCover;
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-2xl font-black text-white group-hover:text-[#00AEEF] transition-colors tracking-tight">{book.titulo}</h4>
                        <p className="text-white/40 font-medium">{book.autor}</p>
                      </div>
                      <button onClick={() => removeReservation(book.id)} className="p-4 bg-white/5 rounded-2xl text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all">
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 p-6 bg-white/[0.02] rounded-[2rem] border border-white/5">
                      <div className="space-y-1">
                        <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Tracking ID</span>
                        <p className="text-white text-xs font-mono font-bold">{book.trackingCode || 'VNW-8829-X'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">Previsão</span>
                        <p className="text-emerald-400 text-xs font-black uppercase tracking-widest">48 Horas</p>
                      </div>
                    </div>

                    <TrackingTimeline steps={book.steps || [
                      { label: "Reserva Confirmada", date: "Hoje", completed: true },
                      { label: "Preparação de Envio", date: "Processando", completed: true },
                      { label: "Em Trânsito", date: "A caminho", completed: false },
                      { label: "Entregue", date: "Em breve", completed: false }
                    ]} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          {/* Sidebar: Doações & Engajamento */}
          <aside className="space-y-12">
            <div className="space-y-8">
               <h3 className="text-2xl font-black text-white flex items-center gap-3">
                 <Heart size={24} className="text-[#00AEEF]" strokeWidth={3} /> Minhas Doações
               </h3>
               
               <div className="space-y-4">
                  {myDonations.length > 0 ? myDonations.map((don, i) => (
                    <motion.div 
                      key={i} 
                      className="bg-white/[0.03] border border-white/10 p-6 rounded-[2.5rem] space-y-4 hover:border-[#00AEEF]/40 transition-colors"
                    >
                      <h4 className="text-white font-bold leading-tight">{don.titulo}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Clock size={14} className="text-amber-500" />
                           <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Aguardando Coleta</span>
                        </div>
                        <ChevronRight size={14} className="text-white/20" />
                      </div>
                    </motion.div>
                  )) : (
                    <div className="bg-white/[0.01] border-2 border-dashed border-white/5 p-12 rounded-[3rem] text-center">
                       <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">Nenhuma doação ativa</p>
                    </div>
                  )}
               </div>

               <div className="bg-gradient-to-br from-[#005695] to-[#00AEEF] p-10 rounded-[3.5rem] shadow-3xl relative overflow-hidden group">
                  <div className="absolute -right-6 -bottom-6 text-white/20 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                     <Package size={160} />
                  </div>
                  <div className="relative z-10 space-y-6">
                     <h4 className="text-white text-3xl font-black leading-none">Faça <br /> a Magia <br /> Acontecer.</h4>
                     <p className="text-white/80 text-sm font-medium">Sua próxima doação pode ser o rascunho de um novo futuro.</p>
                     <a href="/quero-doar" className="inline-flex items-center gap-3 bg-white text-[#001B2F] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#001B2F] hover:text-white transition-all shadow-xl">
                        Nova Doação <ChevronRight size={16} />
                     </a>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}