import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight, Share2 } from 'lucide-react';
import marketingData from '../../data/marketing.json';

export default function MarketingPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Aparece estrategicamente após 15 segundos ou scroll profundo
    const timer = setTimeout(() => setIsVisible(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed top-24 right-6 w-[320px] z-[150] hidden lg:block"
        >
          <div className="bg-gradient-to-br from-[#005695] to-[#00AEEF] p-1 rounded-[2.5rem] shadow-3xl">
            <div className="bg-[#001B2F] rounded-[2.3rem] p-6 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-[#00AEEF]/5">
                <Share2 size={120} />
              </div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="bg-[#00AEEF]/20 p-2 rounded-xl text-[#00AEEF]">
                  <Sparkles size={18} />
                </div>
                <button onClick={() => setIsVisible(false)} className="text-white/20 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                <h4 className="text-white font-black text-sm uppercase tracking-[0.2em]">Potencial Criativo</h4>
                <p className="text-white/50 text-[11px] leading-relaxed">
                  Gostou deste MVP? Renato Filho transforma ideias complexas em experiências digitais de alto impacto visual e técnico.
                </p>
                <a 
                  href={marketingData.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-white text-[#001B2F] rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00AEEF] hover:text-white transition-all group"
                >
                  Conhecer Portfólio <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
