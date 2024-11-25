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

      <section className= {s.porqueDoarSection}>
        <h2> Por Que Devo Doar?</h2>
        <div className={s.containerCards}>
        <section>
          <img src= {ImgComunidade} alt="Imagen com 4 pessoas representando uma comudidade de leitura " />
          <p>Oferece livros a quem não tem acesso, ajudando a reduzir a exclusão social.</p>
        </section>
         <section>
          <img src= {ImgLeitura} alt="Imagem representando uma pessoa fazendo uma leitura de livro" />
          <p>Estimula o hábito da leitura e o aprendizado contínu</p>
        </section>
         <section>
          <img src={ImgTransformacao} alt=" Imagem representando 6 pessoas inpirando a leitura e a transformar vida " />
          <p> inspiração, permitindo que indivíduos transformem suas vidas.</p>
         </section>
         <section>
          <img src={ImgBalanca} alt="Imagem de uma balança que representa a igualdade" />
          <p>Garante que todos, independentemente de sua condição, tenham oportunidades de aprendizado.</p>
         </section>
        </div>
      </section>
    </main>
  );
}
