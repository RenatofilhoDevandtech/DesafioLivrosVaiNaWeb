import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, Github, Heart, Sparkles, HelpCircle, ShieldCheck, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import marketingData from '../../data/marketing.json';

// Sub-componente para links de contato
const ContactLink = ({ href, icon: Icon, title, desc, colorClass }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-5 p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] hover:bg-white/[0.08] hover:border-white/20 transition-all group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`} />
    <div className={`p-4 rounded-2xl transition-all ${colorClass} bg-opacity-20 group-hover:scale-110`}>
      <Icon size={24} />
    </div>
    <div className="relative z-10">
      <h4 className="text-white font-bold text-lg">{title}</h4>
      <p className="text-white/30 text-xs font-medium">{desc}</p>
    </div>
  </a>
);

export default function SupportModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          {/* Backdrop Blur Profundo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000810]/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="w-full max-w-2xl bg-[#001B2F] border border-white/10 rounded-[3.5rem] overflow-hidden relative z-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
          >
            {/* Faixa Superior de Decoração */}
            <div className="h-2 w-full bg-gradient-to-r from-[#005695] via-[#00AEEF] to-[#005695]" />

            <div className="p-8 md:p-14 space-y-10">
              {/* Header com Contexto */}
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#005695]/20 text-[#00AEEF] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                    <ShieldCheck size={12} /> Suporte Prioritário
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white leading-none">
                    Como podemos <br /> <span className="text-white/20">te ajudar?</span>
                  </h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 text-white/20 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Grid de Contatos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ContactLink 
                  href={marketingData.support_links.whatsapp}
                  icon={MessageCircle}
                  title="WhatsApp"
                  desc="Dúvidas rápidas via chat"
                  colorClass="bg-emerald-500 text-emerald-500"
                />
                <ContactLink 
                  href={`mailto:${marketingData.support_links.email}`}
                  icon={Mail}
                  title="E-mail"
                  desc="Parcerias e doações"
                  colorClass="bg-[#00AEEF] text-[#00AEEF]"
                />
              </div>

              {/* Formulário de Contato Direto */}
              <div className="space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem]">
                <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                  <Mail size={14} /> Mensagem Direta
                </div>
                
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    
                    const btn = form.querySelector('button[type="submit"]');
                    btn.disabled = true;
                    btn.innerHTML = 'Enviando...';

                    try {
                      const response = await fetch('https://formspree.io/f/mojkpngl', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                        }
                      });

                      if (response.ok) {
                        toast.success('Mensagem enviada com sucesso! 📬');
                        form.reset();
                      } else {
                        toast.error('Erro ao enviar. Tente novamente.');
                      }
                    } catch (err) {
                      toast.error('Erro de conexão.');
                    } finally {
                      btn.disabled = false;
                      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg> Enviar Mensagem';
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      placeholder="Seu E-mail"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-[#00AEEF]/50 transition-all placeholder:text-white/10"
                    />
                    <input 
                      required 
                      type="text" 
                      name="subject" 
                      placeholder="Assunto"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-[#00AEEF]/50 transition-all placeholder:text-white/10"
                    />
                  </div>
                  <textarea 
                    required 
                    name="message" 
                    placeholder="Como podemos ajudar?"
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-[#00AEEF]/50 transition-all resize-none placeholder:text-white/10"
                  />
                  <button 
                    type="submit"
                    className="w-full py-4 bg-white text-[#001B2F] rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#00AEEF] hover:text-white transition-all shadow-xl shadow-black/20"
                  >
                    <Send size={14} /> Enviar Mensagem
                  </button>
                </form>
              </div>

              {/* Seção de FAQ Rápido (Simplificada) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                  <HelpCircle size={14} /> FAQ Rápido
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Magic Fill?", "Reservas?", "PDFs?"].map((q, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-white/[0.02] border border-white/5 rounded-full text-white/40 text-[9px] font-black uppercase tracking-widest"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer de Assinatura */}
              <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#005695] flex items-center justify-center text-white font-black text-xs">
                    RF
                  </div>
                  <p className="text-[10px] text-white/20 uppercase font-black tracking-widest leading-tight">
                    Projeto idealizado por <br />
                    <span className="text-white/60 text-[12px] normal-case font-bold">Renato Filho</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <a href={marketingData.github_url} className="text-white/20 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                  <div className="flex items-center gap-2 text-[#005695]">
                    <Heart size={16} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Vai na Web</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}