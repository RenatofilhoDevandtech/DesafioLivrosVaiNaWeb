// Importa os ícones das redes sociais
import Iconfacebook from '../../assets/Iconfacebook.png';
import IconTwitter from '../../assets/IconTwitter.png';
import Iconyoutube from '../../assets/Iconyoutube.png';
import Iconlinkedin from '../../assets/Iconlinkedin.png';
import Iconinstagram from '../../assets/Iconinstagram.png';
import s from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.footer}>
      
        <section className={s.footerContent}>
          <p className={s.footerPhone}>4002-8922</p>
            <nav className={s.footerSocialLinks}>
              <a href="#" aria-label="Facebook">
                <img src={Iconfacebook} alt="imagem na cor branca da logo Facebook" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src={IconTwitter} alt="imagem na cor branca da logo Twitter" />
              </a>
              <a href="#" aria-label="YouTube">
                <img src={Iconyoutube} alt="imagem na cor branca da logo YouTube" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={Iconlinkedin} alt="imagem na cor branca da logo LinkedIn" />
              </a>
             <a href="#" aria-label="Instagram">
                <img src={Iconinstagram} alt="imagem na cor branca da logo Instagram" />
              </a>
            </nav>
        </section>
        <section className={s.footerFim}>
          <p className={s.footerCopyright}>&copy; 2024 - Layout desenvolvido pela Vai na Web para fins educacionais</p>
        </section>
    </footer>
  );
}
