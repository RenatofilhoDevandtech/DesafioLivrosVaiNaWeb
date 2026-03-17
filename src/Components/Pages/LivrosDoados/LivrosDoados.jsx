import { useSearchParams } from "react-router-dom";
import { useBooks } from "../../../hooks/useBooks";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, HandHelping, ShoppingBag, Info, Wand2, X, LayoutGrid, FileDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { useState, useCallback } from "react";
import { assets } from "../../../data/assets";
import { useProfile } from "../../../hooks/useProfile";
import ReaderModal from "../../ReaderModal/ReaderModal";

// Sub-componente extraído para otimizar re-render
const BookCard = ({ livro, onReserve, onRead, isReserving }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className={`group bg-white/[0.03] backdrop-blur-md border ${livro.type === 'affiliate' ? 'border-amber-500/20 hover:border-amber-500/50' : 'border-white/10 hover:border-[#005695]/50'} rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col h-full relative`}
  >
    {livro.type === 'affiliate' && (
      <div className="absolute -left-12 top-6 bg-amber-500 text-black font-black text-[8px] uppercase tracking-widest px-12 py-1 -rotate-45 z-20 shadow-xl">
        Oferta
      </div>
    )}
    <div className="relative aspect-[3/4] overflow-hidden">
      <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        livro.type === 'pdf' ? 'bg-emerald-500' : livro.type === 'affiliate' ? 'bg-[#FF9900] text-black' : 'bg-[#005695]'
      } text-white shadow-xl`}>
        {livro.type === 'pdf' ? 'PDF' : livro.type === 'affiliate' ? 'Amazon' : 'Doação'}
      </div>
      <img
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        src={livro.image_url || assets.placeholders.bookCover}
        alt={livro.titulo}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = assets.placeholders.bookCover;
        }}
      />
    </div>

    <div className="p-5 flex flex-col flex-grow">
      <div className="mb-2">
         {livro.type === 'affiliate' && (
           <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">{livro.price}</span>
         )}
         <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-[#00AEEF] transition-colors">
           {livro.titulo}
         </h3>
      </div>
      <p className="text-white/40 text-xs font-medium mb-4">{livro.autor}</p>

      <div className="mt-auto">
        {livro.type === 'pdf' ? (
          <button onClick={() => onRead(livro)} className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
            <BookOpen size={14} /> Ler Agora
          </button>
        ) : livro.type === 'affiliate' ? (
          <a 
            href={livro.amazon_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-3 bg-[#FF9900] hover:bg-[#e68a00] text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} /> Ver na Amazon
          </a>
        ) : (
          <button 
            onClick={() => onReserve(livro)} 
            disabled={livro.status === 'reservado' || isReserving}
            className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
              livro.status === 'reservado' ? 'bg-white/5 text-white/20' : 'bg-[#005695] hover:bg-[#00AEEF] text-white'
            }`}
          >
            {isReserving ? <Loader2 size={14} className="animate-spin" /> : <><HandHelping size={14} /> {livro.status === 'reservado' ? 'Reservado' : 'Reservar'}</>}
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

export default function LivrosDoados() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const filterType = searchParams.get("type") || "all";
  const busca = searchParams.get("busca") || "";

  // Hook customizado com lógica de busca global (Envia 'busca' para a API)
  const { books, isLoading, totalItems, refresh } = useBooks(page, 10, busca, filterType);
  
  const [isReservingId, setIsReservingId] = useState(null);
  const [reader, setReader] = useState({ open: false, book: null });
  const { addReservation } = useProfile();

  // Debounce para a busca semântica não sobrecarregar a API
  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("busca", value);
    else params.delete("busca");
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleReserve = async (livro) => {
    setIsReservingId(livro.id);
    try {
      await api.patch(`/reservar/${livro.id}`);
      addReservation(livro);
      toast.success("Reserva confirmada! 📚");
      refresh();
    } catch (err) {
      toast.error("Falha na reserva.");
    } finally {
      setIsReservingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#001B2F] text-white">
      {/* Header Visual Standarized */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 scale-105" style={{ backgroundImage: `url(${assets.biblioteca.background})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B2F]/0 to-[#001B2F]" />
        
        <div className="relative z-10 text-center space-y-4 px-6">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black tracking-tighter">
            BIBLIOTECA <span className="text-[#00AEEF]">TECH</span>
          </motion.h2>
          <p className="text-white/50 font-medium max-w-lg mx-auto">Explore nossa curadoria de tecnologia e cultura, potencializada por IA.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 pb-20">
        {/* Barra de Busca Inteligente */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-[2.5rem] flex flex-col md:flex-row gap-2 mb-12 shadow-2xl">
          <div className="flex-grow relative">
            <Wand2 className="absolute left-6 top-1/2 -translate-y-1/2 text-[#00AEEF]" size={20} />
            <input 
              type="text" 
              placeholder="O que você quer aprender hoje? (Ex: Como ser um dev full stack)"
              className="w-full bg-transparent py-5 pl-14 pr-6 outline-none text-lg placeholder:text-white/20"
              defaultValue={busca}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 p-2">
            {['all', 'pdf', 'donation', 'affiliate'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  const p = new URLSearchParams(searchParams);
                  p.set('type', type);
                  setSearchParams(p);
                }}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filterType === type ? 'bg-[#005695] text-white' : 'hover:bg-white/5 text-white/40'
                }`}
              >
                {type === 'all' ? 'Todos' : type === 'affiliate' ? 'Comprar' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de Resultados */}
        {!isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col md:flex-row justify-between items-center mb-6 px-4"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              Encontrados: <span className="text-[#00AEEF]">{totalItems}</span> itens
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              Página <span className="text-white">{page}</span> de {Math.ceil(totalItems / 10)}
            </p>
          </motion.div>
        )}

        {/* Grid de Resultados */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => <div key={i} className="aspect-[3/5] bg-white/5 animate-pulse rounded-[2rem]" />)}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {books.map(livro => (
                <BookCard 
                  key={livro.id} 
                  livro={livro} 
                  onReserve={handleReserve}
                  onRead={(l) => setReader({ open: true, book: l })}
                  isReserving={isReservingId === livro.id}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paginação */}
        {!isLoading && totalItems > 10 && (
          <div className="mt-16 flex justify-center gap-4">
            <button
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.set('page', Math.max(1, page - 1).toString());
                setSearchParams(p);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={page === 1}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 hover:bg-[#005695] transition-all disabled:opacity-20 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Anterior</span>
            </button>
            <button
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.set('page', (page + 1).toString());
                setSearchParams(p);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              disabled={page * 10 >= totalItems}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-2 hover:bg-[#005695] transition-all disabled:opacity-20 disabled:pointer-events-none"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Próximo</span> <ChevronRight size={18} />
            </button>
          </div>
        )}
      </section>

      <ReaderModal 
        isOpen={reader.open} 
        onClose={() => setReader({ open: false, book: null })} 
        book={reader.book} 
      />
    </main>
  );
}