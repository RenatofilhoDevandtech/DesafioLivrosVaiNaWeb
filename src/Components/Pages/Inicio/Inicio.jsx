// Importa as imagens usadas na página
import ImgComunidade from "../../../assets/ImgComunidadeleitura.png";
import ImgLeitura from "../../../assets/ImgLeitura.png";
import ImgTransformacao from "../../../assets/ImgTransformacao.png";
import ImgBalanca from "../../../assets/ImgBalanca.png";

// Importa o arquivo de estilos específico para este componente
import s from './Inicio.module.scss';

export default function Inicio() {
  return (
    <main className={s.mainInicio}>
      <section className={s.primeirasecaoinicio}>
          <h2>VENHA FAZER PARTE DA REDE DE DOAÇÃO </h2>
      </section>
    </main>
  );
}
