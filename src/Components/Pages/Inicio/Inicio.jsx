import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Users, Sparkles, Scale, ShoppingCart, ChevronRight, MousePointer2, Shield, BookOpenCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { assets } from "../../../data/assets";
import { affiliateCatalog } from "../../../data/affiliate_catalog";
import DeepBackground from "./DeepBackground";

// Marquee de Parceiros/Tecnologias
const PartnerMarquee = () => (
  <div className="w-full py-12 bg-white/[0.02] border-y border-white/5 overflow-hidden relative group">
    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#001B2F] to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#001B2F] to-transparent z-10" />
    
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-20 items-center whitespace-nowrap px-10"
    >
      {["AMAZON", "GOOGLE", "MICROSOFT", "ELEVATE", "CRESCE AI", "PRIMEFLIX", "VAI NA WEB", "DEV.TO", "GITHUB", "STACKOVERFLOW"].map((brand, i) => (
        <span key={i} className="text-white/20 text-3xl font-black uppercase tracking-[0.5em] hover:text-[#00AEEF] transition-colors cursor-default">
          {brand}
        </span>
      ))}
      {/* Duplicate for infinite loop */}
      {["AMAZON", "GOOGLE", "MICROSOFT", "ELEVATE", "CRESCE AI", "PRIMEFLIX", "VAI NA WEB", "DEV.TO", "GITHUB", "STACKOVERFLOW"].map((brand, i) => (
        <span key={i + 10} className="text-white/20 text-3xl font-black uppercase tracking-[0.5em] hover:text-[#00AEEF] transition-colors cursor-default">
          {brand}
        </span>
      ))}
    </motion.div>
  </div>
);

// FeaturedBookCard com Efeito 3D Parallax
const FeaturedBookCard = ({ book, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group perspective"
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-full aspect-[3/4] rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-[#00AEEF]/40"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#001B2F] via-transparent to-transparent z-10" />
        <img 
          src={book.image_url} 
          alt={book.titulo} 
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = assets.placeholders.bookCover;
          }}
        />
        
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
          <span className="text-[#00AEEF] text-[10px] font-black uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity">🔥 Recomendado</span>
          <h4 className="text-white font-black text-xl leading-tight mb-4">{book.titulo}</h4>
          <a 
            href={book.amazon_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-fit px-6 py-3 bg-white text-[#001B2F] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#00AEEF] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
          >
            Saber Mais <ShoppingCart size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ReasonCard Refinada com Hover 3D
const ReasonCard = ({ icon: Icon, title, description, image, delay }) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] overflow-hidden hover:bg-[#005695]/10 hover:border-[#005695]/40 transition-all duration-500"
  >
    <div className="relative z-10 flex flex-col items-center text-center gap-6">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <img 
          className="w-full h-full object-cover rounded-full border-2 border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700" 
          src={image} 
          alt={title} 
        />
        <div className="absolute -bottom-2 -right-2 bg-[#00AEEF] p-3 rounded-2xl text-white shadow-xl">
          <Icon size={20} />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-white font-black text-xl tracking-tight">{title}</h4>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.section>
);

export default function Inicio() {
  const targetRef = useRef(null);
  const [cursorVariant, setCursorVariant] = useState("default");

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(springScroll, [0, 0.4], [1, 0]);
  const heroScale = useTransform(springScroll, [0, 0.4], [1, 1.1]);

  return (
    <main className="w-full bg-[#001B2F] overflow-hidden" ref={targetRef}>
      <DeepBackground videoUrl={assets.home.backgroundVideo} fallbackImage={assets.home.videoFallback} />

      {/* Cursor Dinâmico */}
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#00AEEF] pointer-events-none z-[100] hidden md:block mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={cursorVariant}
        variants={{
          default: { scale: 1 },
          hover: { scale: 1.8, backgroundColor: "rgba(0, 174, 239, 0.2)" }
        }}
      />

      {/* Hero Section - Foco em Conversão */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#005695]/20 border border-[#005695]/30 px-6 py-2 rounded-full text-[#00AEEF] text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles size={14} /> Tecnologia & Cultura
          </motion.div>
          
          <h1 className="text-6xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-12">
            CONHECIMENTO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] via-white to-[#005695] bg-[length:200%_auto] animate-gradient-x">
              LIBERTA.
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link 
              to="/livros-doados"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="group px-12 py-6 bg-white text-[#001B2F] rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-[#00AEEF] hover:text-white transition-all shadow-2xl active:scale-95"
            >
              Começar Jornada <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-4 text-left">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#001B2F] bg-[#005695] flex items-center justify-center text-[10px] font-bold">
                    {i}k+
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest leading-tight">
                Comunidade ativa <br /> em todo o Brasil
              </p>
            </div>
          </div>

          {/* Elementos Interativos do Hero */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex gap-10 opacity-30 mt-20">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 5 + i, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-32 h-44 bg-white/5 rounded-2xl border border-white/10 hidden lg:block"
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Marquee de Parceiros */}
      <PartnerMarquee />

      {/* Seção de Showcase 3D */}
      <section className="max-w-7xl mx-auto px-6 py-40 text-center">
        <div className="space-y-4 mb-20">
          <span className="text-[#00AEEF] text-[10px] font-black uppercase tracking-[0.5em]">Curadoria Premium</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">OS MELHORES <span className="text-[#005695]">PARA VOCÊ.</span></h2>
          <p className="text-white/40 text-sm max-w-lg mx-auto">Seleção exclusiva de livros que são pilares na indústria de tecnologia moderna.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {affiliateCatalog.slice(0, 3).map((book, i) => (
            <FeaturedBookCard key={book.id} book={book} delay={i * 0.2} />
          ))}
        </div>
      </section>

      {/* Seção de Impacto Nacional (Brasil) */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src={assets.queroDoar.background} className="w-full h-full object-cover opacity-20 blur-sm scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001B2F] via-[#001B2F]/80 to-[#001B2F]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
           <div className="inline-flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
             <div className="w-16 h-16 bg-[#00AEEF] rounded-2xl flex items-center justify-center text-white shadow-2xl">
               <Shield size={32} />
             </div>
             <div className="text-left">
               <h4 className="text-white font-black uppercase text-xs tracking-widest">Compromisso Social</h4>
               <p className="text-white/40 text-[10px] font-bold">Impactando +26 estados brasileiros com educação tech.</p>
             </div>
           </div>

           <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
             DO OIAPOQUE <br /> AO <span className="text-[#00AEEF]">CHUÍ.</span>
           </h2>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Doações", val: "5k+" },
                { label: "Leitores", val: "12k+" },
                { label: "Estados", val: "27" },
                { label: "CO2 Reduzido", val: "1.5t" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                   <div className="text-3xl md:text-5xl font-black text-white">{stat.val}</div>
                   <div className="text-[10px] font-black text-[#00AEEF] uppercase tracking-widest opacity-60">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Seção de Resultados (A Dor que Sanamos) */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ReasonCard 
            icon={Users} title="Democratização" 
            image={assets.home.reasons.comunidade}
            description="Levamos livros de ponta para quem não teria acesso de outra forma."
            delay={0.1}
          />
          <ReasonCard 
            icon={TrendingUp} title="Carreira Tech" 
            image={assets.home.reasons.transformacao}
            description="Foco total em livros que transformam juniores em seniores."
            delay={0.2}
          />
          <ReasonCard 
            icon={Scale} title="Economia Circular" 
            image={assets.home.reasons.balanca}
            description="Reduzimos o CO2 através do reuso inteligente de material didático."
            delay={0.3}
          />
          <ReasonCard 
            icon={BookOpenCheck} title="Curadoria AI" 
            image={assets.home.reasons.leitura}
            description="Nossa inteligência ajuda você a encontrar o livro certo em segundos."
            delay={0.4}
          />
        </div>
      </section>

      {/* Call to Action Final (Gere Resultados) */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#005695] to-[#00AEEF] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10">
            Pronto para transformar <br /> o futuro de alguém?
          </h2>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link to="/quero-doar" className="px-10 py-5 bg-[#001B2F] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Quero Doar um Livro
            </Link>
            <Link to="/missao" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
              Ver Nossa Missão
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}