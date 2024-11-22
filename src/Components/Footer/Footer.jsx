// Importa os ícones das redes sociais
import Iconfacebook from '../../assets/Iconfacebook.png';
import IconTwitter from '../../assets/IconTwitter.png';
import Iconyoutube from '../../assets/Iconyoutube.png';
import Iconlinkedin from '../../assets/Iconlinkedin.png';
import Iconinstagram from '../../assets/Iconinstagram.png';
// Importa o arquivo de estilos específico para este componente
import s from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerContent}>
          {/* Número de telefone alinhado à esquerda */}
          <p className={s.footerPhone}>4002-8922</p>
          {/* Links das redes sociais alinhados à direita */}
          <div className={s.footerSocialLinks}>
            <a href="#" aria-label="Facebook">
              <img src={Iconfacebook} alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={IconTwitter} alt="Twitter" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src={Iconyoutube} alt="YouTube" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={Iconlinkedin} alt="LinkedIn" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src={Iconinstagram} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className={s.footerFim}>
          <p className={s.footerCopyright}>&copy; 2024 - Layout desenvolvido pela Vai na Web para fins educacionais</p>
        </div>
      </div>
    </footer>
  );
}
