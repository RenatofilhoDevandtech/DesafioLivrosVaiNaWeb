import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#001B2F]"
    >
      {/* Background Orbs para Profundidade */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00AEEF] blur-[120px] opacity-20 animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-8">
        {/* Spinner Centralizado Premium */}
        <div className="relative w-24 h-24">
          {/* Anel de Rotação com Gradiente */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#00AEEF] border-l-transparent border-b-transparent"
          />
          
          {/* Ícone Pulsante */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-[#00AEEF]"
          >
            <BookOpen size={32} />
          </motion.div>
        </div>

        {/* Texto de Feedback */}
        <div className="text-center space-y-2 relative z-10">
          <motion.h3 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white font-black text-xs uppercase tracking-[0.4em]"
          >
            Preparando Ambiente
          </motion.h3>
          
          <div className="flex items-center justify-center gap-2">
            <motion.p 
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#00AEEF]/50 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Sparkles size={12} /> Semeando Conhecimento
            </motion.p>
          </div>
        </div>

        {/* Barra de Progresso Simbolica (Indeterminada) */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent"
          />
        </div>
      </div>

      {/* Assinatura Discreta no Rodapé do Loading */}
      <div className="absolute bottom-10 text-[9px] text-white/10 font-black uppercase tracking-[0.5em]">
        VNW Technology Platform
      </div>
    </motion.div>
  );
}