import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, X, Send, Star, Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import marketingData from '../../data/marketing.json';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mojkpngl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          rating,
          message: comment,
          _subject: 'Novo Feedback - Livros VNW'
        })
      });

      if (response.ok) {
        toast.success('Obrigado pelo seu feedback! 🚀');
        setIsOpen(false);
        setRating(0);
        setComment('');
        setEmail('');
      } else {
        toast.error('Erro ao enviar feedback. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro de conexão. Tente novamente.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 p-4 bg-[#00AEEF] text-white rounded-2xl shadow-3xl z-[140] group overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <MessageSquare size={24} className="relative z-10" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#001B2F]/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#001B2F] border border-white/10 w-full max-w-md rounded-[3rem] p-8 relative overflow-hidden shadow-4xl"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#00AEEF] blur-[80px] opacity-10" />
              
              <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Sua Opinião</h3>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">Ajude o Renato a melhorar este projeto</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-xl text-white/20 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest text-center">Como foi sua experiência?</p>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`transition-all duration-300 ${rating >= star ? 'text-[#00AEEF] scale-125' : 'text-white/10 hover:text-white/30'}`}
                      >
                        <Star size={32} fill={rating >= star ? "currentColor" : "none"} strokeWidth={3} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Seu E-mail</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-xs outline-none focus:border-[#00AEEF]/50 transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Mensagem</label>
                    <textarea
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Deixe um elogio, crítica ou sugestão..."
                      className="w-full h-32 bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-xs outline-none focus:border-[#00AEEF]/50 transition-all resize-none placeholder:text-white/10"
                    />
                  </div>
                </div>

                <button
                  disabled={!rating || !comment || !email || isSending}
                  className="w-full py-5 bg-white text-[#001B2F] rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#00AEEF] hover:text-white transition-all disabled:opacity-20 shadow-2xl"
                >
                  {isSending ? 'Enviando...' : <><Send size={16} /> Enviar Feedback</>}
                </button>
                
                <p className="text-[9px] text-white/20 text-center font-medium">
                  Seu feedback será enviado de forma segura para nossa central.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
