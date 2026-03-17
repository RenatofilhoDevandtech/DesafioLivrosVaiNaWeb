import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Download, ExternalLink, FileText, 
  RotateCw, BookOpen, Clock, Zap, Info 
} from 'lucide-react';

export default function ReaderModal({ isOpen, onClose, book }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [startTime] = useState(Date.now());

  // Reset de estado ao abrir
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setLoadError(false);
      
      // Lógica de Persistência: Marca como "Sendo Lido" no Dashboard
      const progress = JSON.parse(localStorage.getItem('@VnwBooks:reading-progress') || '{}');
      progress[book?.id] = { lastOpened: new Date().toISOString(), status: 'reading' };
      localStorage.setItem('@VnwBooks:reading-progress', JSON.stringify(progress));
    }
  }, [isOpen, book]);

  const handleReload = () => {
    setIsLoading(true);
    setLoadError(false);
    // Pequeno hack para forçar o refresh do iframe
    const iframe = document.getElementById('pdf-viewer');
    if (iframe) iframe.src = iframe.src;
  };

  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-12">
          {/* Backdrop Ultra-Dark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000810]/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="w-full h-full max-w-7xl bg-[#001B2F] border border-white/10 md:rounded-[2.5rem] overflow-hidden flex flex-col relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
          >
            {/* Toolbar Superior Estilo "IDE" */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="bg-[#00AEEF]/10 p-2.5 rounded-xl text-[#00AEEF] hidden sm:block">
                  <BookOpen size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-sm md:text-base truncate max-w-[180px] md:max-w-md">
                    {book.titulo}
                  </h3>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[#00AEEF] text-[9px] font-black uppercase tracking-widest">Leitor Imersivo</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span className="text-white/30 text-[9px] font-medium flex items-center gap-1">
                      <Clock size={10} /> 30 min restantes (est.)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleReload}
                  className="p-2.5 bg-white/5 text-white/40 hover:text-[#00AEEF] hover:bg-[#00AEEF]/10 rounded-xl transition-all"
                  title="Recarregar Visualizador"
                >
                  <RotateCw size={18} className={isLoading ? 'animate-spin' : ''} />
                </button>
                <div className="w-px h-6 bg-white/5 mx-1 hidden sm:block" />
                <a 
                  href={book.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 text-white/40 hover:text-white rounded-xl transition-all"
                >
                  <ExternalLink size={18} />
                </a>
                <button 
                  onClick={onClose}
                  className="p-2.5 bg-white/5 text-white/40 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar de Dicas (Sane a dor da falta de contexto) */}
              <aside className="hidden lg:flex w-72 border-r border-white/5 bg-white/[0.01] flex-col p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#00AEEF] font-black text-[10px] uppercase tracking-widest">
                    <Info size={14} /> Dica de Estudo
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed font-medium">
                    Tente aplicar os conceitos deste livro em um pequeno projeto no seu GitHub. A prática fixa o conhecimento 3x mais rápido.
                  </p>
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                    <Zap size={14} /> Atalhos Rápidos
                  </div>
                  <ul className="space-y-3">
                    {['Anotar Código', 'Marcar Favorito', 'Gerar Resumo IA'].map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-[11px] text-white/20 font-bold group hover:text-white transition-colors cursor-pointer">
                        {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Viewer principal */}
              <div className="flex-1 bg-black/20 relative group">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#001B2F] z-50">
                    <div className="flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-[#005695]/10 border-t-[#00AEEF] rounded-full animate-spin" />
                        <BookOpen className="absolute inset-0 m-auto text-[#00AEEF] opacity-50" size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-bold text-sm tracking-tight">Preparando sua leitura...</p>
                        <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] mt-2">Tecnologia & Cultura</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <iframe 
                  id="pdf-viewer"
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(book.pdf_url)}&embedded=true`}
                  className={`w-full h-full border-none transition-all duration-700 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                  onLoad={() => setIsLoading(false)}
                />

                {/* Overlay de proteção/foco */}
                <div className="absolute inset-0 pointer-events-none border-[20px] border-[#001B2F]/0 group-hover:border-[#001B2F]/5 transition-all duration-500" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Icone auxiliar
const ArrowUpRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);