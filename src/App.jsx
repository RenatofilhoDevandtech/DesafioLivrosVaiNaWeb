import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

// Componentes Fixos
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SupportModal from "./Components/SupportModal/SupportModal";
import CookieBanner from "./Components/Legal/CookieBanner";
import MarketingPopup from "./Components/Marketing/MarketingPopup";
import FeedbackModal from "./Components/Feedback/FeedbackModal";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen"; 

// Code Splitting (Lazy Loading) 
const Inicio = lazy(() => import("./Components/Pages/Inicio/Inicio"));
const QueroDoar = lazy(() => import("./Components/Pages/QueroDoar/QueroDoar"));
const LivrosDoados = lazy(() => import("./Components/Pages/LivrosDoados/LivrosDoados"));
const Missao = lazy(() => import("./Components/Pages/Missao/Missao"));
const ComoFunciona = lazy(() => import("./Components/Pages/ComoFunciona/ComoFunciona"));
const MeusLivros = lazy(() => import("./Components/Pages/MeusLivros/MeusLivros"));

// Helper: Garante que a página comece no topo ao mudar de rota
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#001B2F] text-white selection:bg-cyan-500/30">
      <ScrollToTop />
      <Header />
      
      <main className="flex-grow">
        {/* O Suspense exibe algo enquanto o Lazy Loading carrega a página */}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/quero-doar" element={<QueroDoar />} />
            <Route path="/livros-doados" element={<LivrosDoados />} />
            <Route path="/missao" element={<Missao />} />
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/meus-livros" element={<MeusLivros />} />
          </Routes>
        </Suspense>
      </main>

      <Footer onSupportClick={() => setIsSupportOpen(true)} />
      
      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
      />
      
      {/* Monetization & Compliance Layer */}
      <CookieBanner />
      <MarketingPopup />
      <FeedbackModal />
    </div>
  );
}

export default App;