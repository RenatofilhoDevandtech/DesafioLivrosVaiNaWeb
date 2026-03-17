// Centralized Asset Configuration
// Easily swap images and videos here

// Local Assets (imported for Vite processing)
import ImgComunidade from "../assets/image-conexao.png";
import ImgLeitura from "../assets/image-cadeado.png";
import ImgTransformacao from "../assets/image-ia.png";
import ImgBalanca from "../assets/image-seguranca.png";
import ImgLogo from "../assets/imgLogoLivro.png";
import ImgBackgroundPerfil from "../assets/background-perfil.png";
import ImgBackgroundHero from "../assets/background-brasil.png";
import ImgBackgroundLibrary from "../assets/image-livraria.png";
import ImgBackgroundBooks from "../assets/background-livros.png";
import ImgBackgroundVnw from "../assets/background-vnw.png";

export const assets = {
  home: {
    hero: ImgBackgroundPerfil,
    backgroundVideo: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-large-library-with-many-books-44040-large.mp4",
    videoFallback: ImgBackgroundPerfil,
    reasons: {
      comunidade: ImgComunidade,
      leitura: ImgLeitura,
      transformacao: ImgTransformacao,
      balanca: ImgBalanca,
    },
    ctaImage: "src/assets/background-hero.png",
  },
  comoFunciona: {
    mainImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800",
  },
  queroDoar: {
    background: ImgBackgroundHero,
  },
  biblioteca: {
    background: ImgBackgroundBooks,
  },
  meusLivros: {
    background: ImgBackgroundHero,
  },
  missao: {
    tributeLogo: ImgLogo,
    background: ImgBackgroundVnw,
  },
  logo: ImgLogo,
  social: {
    facebook: "/assets/Iconfacebook.png",
    instagram: "/assets/Iconinstagram.png",
    twitter: "/assets/IconTwitter.png",
    linkedin: "/assets/Iconlinkedin.png",
    youtube: "/assets/Iconyoutube.png",
  },
  placeholders: {
    bookCover: "/assets/ImgLivro.png",
    errorCover: "https://images.unsplash.com/photo-1543005128-d1440cc9822a?q=80&w=400",
  }
};
