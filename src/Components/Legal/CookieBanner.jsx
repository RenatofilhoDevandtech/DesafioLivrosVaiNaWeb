import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] z-[200]"
        >
          <div className="bg-[#001B2F]/80 backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] shadow-3xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#00AEEF]/20 rounded-2xl text-[#00AEEF] shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-black text-sm uppercase tracking-widest">Privacidade & Cookies</h4>
                <p className="text-white/40 text-[11px] leading-relaxed font-medium">
                  Utilizamos cookies e tecnologias de rastreamento para melhorar sua experiência e analisar como você interage com nosso marketplace e biblioteca.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={handleAccept}
                    className="px-6 py-2 bg-white text-[#001B2F] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#00AEEF] hover:text-white transition-all"
                  >
                    Aceitar Todos
                  </button>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="px-6 py-2 bg-white/5 text-white/40 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all"
                  >
                    Recusar
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
