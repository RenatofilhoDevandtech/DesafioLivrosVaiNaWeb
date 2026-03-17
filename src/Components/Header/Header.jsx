import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { assets } from "../../data/assets";
import { Search, Book, PlusCircle, Home, Menu, X, Github, Star, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../hooks/useProfile";
import marketingData from "../../data/marketing.json";

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("busca") || "");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/livros-doados?busca=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate(`/livros-doados`);
    }
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="flex items-center gap-2 text-white/60 hover:text-white font-bold text-sm tracking-wide transition-all hover:translate-y-[-1px] active:scale-95"
    >
      <Icon size={18} className="text-[#005695]" />
      {children}
    </Link>
  );

  const { reservations } = useProfile();

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
      ? "py-4 bg-[#001B2F]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" 
      : "py-6 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-white/5 p-2 rounded-2xl group-hover:bg-[#005695]/20 transition-colors">
            <img className="w-8 md:w-10 opacity-90 group-hover:opacity-100" src={assets.logo} alt="Logo" />
          </div>
          <h1 className="text-white text-xl font-black hidden md:block tracking-tighter uppercase">
            Livros <span className="text-[#005695]">VNW</span>
          </h1>
        </Link>

        {/* Search Bar - Minimalist */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#005695] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Pesquisar título, autor ou tecnologia..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-full py-3.5 pl-14 pr-6 focus:ring-2 focus:ring-[#005695]/50 focus:bg-white/10 outline-none transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-10">
          <NavLink to="/" icon={Home}>Início</NavLink>
          <NavLink to="/livros-doados" icon={Book}>Biblioteca</NavLink>
          <NavLink to="/quero-doar" icon={PlusCircle}>Doar</NavLink>
          <Link to="/meus-livros" className="relative flex items-center gap-2 text-white/60 hover:text-white font-bold text-sm tracking-wide transition-all group">
            <Package size={18} className="text-[#005695]" />
            Meus Livros
            {reservations.length > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
            )}
          </Link>
          
          <div className="h-6 w-px bg-white/10" />

          {/* Marketing/Recruiter CTA */}
          <a 
            href={marketingData.portfolio_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-6 py-2.5 bg-[#005695]/10 border border-[#005695]/20 rounded-full text-white text-xs font-black uppercase tracking-widest hover:border-[#005695]/50 hover:bg-[#005695]/20 transition-all shadow-xl shadow-[#005695]/5 active:scale-95"
          >
            <Github size={14} className="text-[#005695]" />
            Renatofilhodev
            <div className="flex items-center gap-1 ml-1 text-[#005695]">
               <Star size={10} className="fill-[#005695]" /> Portfolio
            </div>
            
            {/* Subtle Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-[#005695]/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="xl:hidden text-white p-2 bg-white/5 rounded-xl border border-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-[72px] w-full h-screen lg:hidden bg-[#001B2F]/95 backdrop-blur-2xl p-6 border-t border-white/5 z-[60]"
          >
            <div className="flex flex-col gap-6 pt-10 pb-10 h-full overflow-y-auto">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl py-4 pl-14 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white flex items-center gap-4"><Home className="text-[#005695]" /> Início</Link>
              <Link to="/livros-doados" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white flex items-center gap-4"><Book className="text-[#005695]" /> Biblioteca</Link>
              <Link to="/quero-doar" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white flex items-center gap-4"><PlusCircle className="text-[#005695]" /> Fazer Doação</Link>
              <Link to="/meus-livros" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white flex items-center gap-4 relative">
                <Package className="text-[#005695]" /> Meus Livros
                {reservations.length > 0 && (
                  <span className="absolute top-0 -right-2 w-3 h-3 bg-emerald-500 rounded-full" />
                )}
              </Link>
              
              <div className="h-px w-full bg-white/5 my-4" />
              
              <a 
                href={marketingData.portfolio_url} 
                className="flex items-center justify-center gap-3 p-5 bg-[#005695] text-white rounded-2xl font-black uppercase text-sm tracking-widest shadow-lg shadow-[#005695]/20"
              >
                <Github size={20} /> Ver Meu Portfolio
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
