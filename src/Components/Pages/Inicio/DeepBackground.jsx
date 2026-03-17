import { motion, AnimatePresence } from "framer-motion";
import { memo, useState } from "react";

// Memoizamos para evitar que o vídeo reinicie ou pisque se o componente pai re-renderizar
const DeepBackground = memo(({ videoUrl, fallbackImage }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Fallback & Video Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 bg-[#001B2F]"
      >
        {/* Fallback Image com efeito Ken Burns (zoom suave) enquanto o vídeo não vem */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />

        {videoUrl && (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsVideoLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 0.3 : 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
          >
            <source src={videoUrl} type="video/mp4" />
          </motion.video>
        )}
      </motion.div>
      
      {/* Camadas de Profundidade (Vinheta Progressiva) */}
      <div className="absolute inset-0 z-10">
        {/* Radial Gradient para focar o conteúdo no centro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#001B2F_100%)] opacity-60" />
        
        {/* Gradientes Lineares Originais */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B2F] via-transparent to-[#001B2F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001B2F] via-transparent to-[#001B2F]" />
      </div>

      {/* Efeito de Granulação (Noise) Otimizado */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-20 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          filter: 'contrast(150%) brightness(100%)' 
        }} 
      />
    </div>
  );
});

DeepBackground.displayName = "DeepBackground";
export default DeepBackground;