// Importa a imagem do logo do livro, que será usada no cabeçalho
import LogoLivro from "../../assets/LogoLivro.png";
// Importa a imagem do ícone de pesquisa
import pesquisa from "../../assets/pesquisa.png";

// Importa os componentes de página para serem exibidos nas rotas correspondentes
import Inicio from "../Pages/Inicio/Inicio.jsx";
import LivrosDoados from "../Pages/LivrosDoados/LivrosDoados.jsx";
import QueroDoar from "../Pages/QueroDoar/QueroDoar.jsx";

// Importa os componentes necessários para o roteamento de páginas no React
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Importa o arquivo de estilos específico para este componente
import s from './Header.module.scss';

// Função que define o componente Header
export default function Header() {
  return (
    <BrowserRouter>
      <header className={s.headerInicio}>
        <section className={s.headerSection}>
          <img src={LogoLivro} alt="Imagem de capa do livro" className={s.headerLogo} />
          <h1 className={s.headerTitle}>Livros Vai na Web</h1>
        </section>
        
        <nav className={s.headerNav}>
          <ul className={s.headerNavList}>
            <li className={s.headerNavItem}>
              <Link to="/" className={s.headerNavLink}>Inicio</Link>
            </li>
            <li className={s.headerNavItem}>
              <Link to="/livros-doados" className={s.headerNavLink}>Livros Doados</Link>
            </li>
            <li className={s.headerNavItem}>
              <Link to="/quero-doar" className={s.headerNavLink}>Quero Doar</Link>
            </li>
          </ul>
        </nav>

        <section className={s.headerSearch}>
          <input type="text" className={s.headerSearchInput} placeholder="Pesquisar..." />
          <button className={s.headerSearchButton}>
            <img src={pesquisa} alt="Ícone de pesquisa" className={s.headerSearchIcon} />
          </button>
        </section>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/livros-doados" element={<LivrosDoados />} />
        <Route path="/quero-doar" element={<QueroDoar />} />
      </Routes>
    </BrowserRouter>
  );
}
