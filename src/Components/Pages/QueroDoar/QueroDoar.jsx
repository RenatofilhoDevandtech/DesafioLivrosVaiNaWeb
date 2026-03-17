import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookPlus, Type, User, FolderPlus, Link as LinkIcon, 
  Loader2, Sparkles, Wand2, MessageSquareText, Image as ImageIcon 
} from 'lucide-react';
import { useCategories } from '../../../hooks/useCategories';
import { useDonate } from '../../../hooks/useDonate';
import { extractBookMetadata } from '../../../services/aiService';
import { toast } from 'react-toastify';
import { assets } from '../../../data/assets';
import { useProfile } from '../../../hooks/useProfile';
import DeepBackground from '../Inicio/DeepBackground';

const CACHE_KEY = '@VnwBooks:donation-draft';

// Componente de Input Reutilizável com Estética Premium
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within:text-[#00AEEF] transition-colors">
      <Icon size={14} /> {label}
    </label>
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#005695] focus:bg-[#005695]/10 outline-none transition-all"
    />
  </div>
);

export default function QueroDoar() {
  const [formData, setFormData] = useState({
    titulo: '', categoria_id: '', autor: '', image_url: '',
  });
  const [description, setDescription] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);

  const { categories, isLoading: loadingCats } = useCategories();
  const { donateBook, isLoading: isSubmitting } = useDonate();
  const { addDonation } = useProfile();

  // --- LÓGICA DE PERSISTÊNCIA (SMART CACHE) ---
  useEffect(() => {
    const savedDraft = localStorage.getItem(CACHE_KEY);
    if (savedDraft) {
      const { formData: cachedForm, description: cachedDesc } = JSON.parse(savedDraft);
      setFormData(cachedForm);
      setDescription(cachedDesc);
      if (cachedForm.image_url) setCoverPreview(cachedForm.image_url);
      toast.info("Rascunho recuperado! ✨", { theme: "dark", autoClose: 2000 });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ formData, description }));
  }, [formData, description]);

  // --- BUSCA AUTOMÁTICA DE CAPA ---
  const fetchBookCover = useCallback(async (title, author) => {
    try {
      const query = encodeURIComponent(`${title} ${author}`);
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
      const data = await response.json();
      const thumbnail = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:');
      
      if (thumbnail) {
        setFormData(prev => ({ ...prev, image_url: thumbnail }));
        setCoverPreview(thumbnail);
        return thumbnail;
      }
    } catch (err) {
      console.error("Erro na busca da capa");
    }
    return null;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'image_url') setCoverPreview(value);
  };

  // --- MAGIC FILL COM IA ---
  const handleMagicFill = async () => {
    if (!description.trim()) {
      toast.warn("Descreva o livro primeiro! ✍️");
      return;
    }

    setIsExtracting(true);
    try {
      const metadata = await extractBookMetadata(description);
      const updatedData = {
        ...formData,
        titulo: metadata.titulo || formData.titulo,
        autor: metadata.autor || formData.autor,
        categoria_id: metadata.categoria_id || formData.categoria_id
      };
      
      setFormData(updatedData);
      
      if (updatedData.titulo) {
        toast.promise(fetchBookCover(updatedData.titulo, updatedData.autor), {
          pending: 'Buscando a melhor capa... 🖼️',
          success: 'Capa encontrada! 😍',
          error: 'Capa não encontrada, mas os dados estão ok!'
        });
      }
    } catch (err) {
      toast.error("A IA se confundiu. Tente novamente.");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await donateBook(formData);
      addDonation(formData);
      
      // Notificação via Formspree para o administrador
      try {
        await fetch('https://formspree.io/f/mojkpngl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _subject: `Nova Doação: ${formData.titulo}`,
            titulo: formData.titulo,
            autor: formData.autor,
            categoria: formData.categoria_id,
            email: 'sistema@vnwbooks.com', // Remetente fixo do sistema
            message: `O livro "${formData.titulo}" foi doado com sucesso através da plataforma.`
          })
        });
      } catch (err) {
        console.warn("Erro silencioso na notificação de admin");
      }

      // Limpeza de rascunho após sucesso
      localStorage.removeItem(CACHE_KEY);
      setFormData({ titulo: '', categoria_id: '', autor: '', image_url: '' });
      setDescription('');
      setCoverPreview(null);
      
      toast.success("Doação concluída! Obrigado por semear conhecimento. 💎");
    } catch (err) {
      toast.error("Erro ao processar doação.");
    }
  };

  return (
    <main className="relative w-full bg-[#001B2F] min-h-screen overflow-hidden">
      <DeepBackground videoUrl={assets.home.backgroundVideo} fallbackImage={assets.queroDoar.background} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Lado Esquerdo: Narrativa e Preview */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-12 lg:sticky lg:top-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 px-4 py-2 rounded-full text-[#00AEEF] text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles size={14} /> Sistema de Doação Inteligente
            </div>
            <h2 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              SUA DOAÇÃO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#005695]">É MÁGICA.</span>
            </h2>
            <p className="text-white/40 text-xl max-w-md font-medium leading-relaxed">
              Use nossa IA para preencher os dados ou faça manualmente. O importante é o impacto que você vai gerar.
            </p>
          </div>

          {/* Preview Dinâmico do Card */}
          <AnimatePresence>
            {formData.titulo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-6 rounded-[2.5rem] flex gap-6 items-center max-w-sm shadow-2xl"
              >
                <div className="w-24 h-32 bg-[#005695]/20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                  {coverPreview ? (
                    <img 
                      src={coverPreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = assets.placeholders.bookCover;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5"><ImageIcon size={32} /></div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-lg line-clamp-2 leading-tight">{formData.titulo}</h4>
                  <p className="text-[#00AEEF] text-xs font-black uppercase tracking-widest mt-1 truncate">{formData.autor || 'Autor Desconhecido'}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Lado Direito: Formulário Glassmorphism */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full lg:max-w-xl bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-8 md:p-12 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          <div className="space-y-10">
            {/* Seção Magic Fill */}
            <div className="space-y-4">
              <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <MessageSquareText size={14} /> Descrição para a IA
              </label>
              <textarea
                placeholder="Ex: Estou doando 'O Programador Pragmático' em bom estado..."
                className="w-full h-28 bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#00AEEF] outline-none transition-all resize-none placeholder:text-white/10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleMagicFill} 
                disabled={isExtracting}
                className="w-full py-4 bg-[#005695] hover:bg-[#00AEEF] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-[#005695]/20"
              >
                {isExtracting ? <Loader2 className="animate-spin" /> : <><Wand2 size={16}/> Ativar Magic Fill</>}
              </button>
            </div>

            <div className="h-px bg-white/5 w-full" />

            {/* Formulário Manual */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Título do Livro" icon={Type} name="titulo" value={formData.titulo} onChange={handleInputChange} required />
                <InputField label="Autor" icon={User} name="autor" value={formData.autor} onChange={handleInputChange} required />
              </div>
              
              <div className="space-y-2">
                <label className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2"><FolderPlus size={14}/> Categoria</label>
                <select 
                  name="categoria_id" 
                  value={formData.categoria_id} 
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#005695] outline-none transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" className="bg-[#001B2F]">Selecione uma categoria...</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id} className="bg-[#001B2F]">{cat.nome}</option>)}
                </select>
              </div>

              <InputField label="URL da Imagem de Capa" icon={LinkIcon} name="image_url" value={formData.image_url} onChange={handleInputChange} placeholder="Cole o link ou deixe a IA buscar..." />

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full py-6 bg-white text-[#001B2F] rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-[#00AEEF] hover:text-white transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 mt-4"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><BookPlus size={20}/> Concluir Doação</>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}