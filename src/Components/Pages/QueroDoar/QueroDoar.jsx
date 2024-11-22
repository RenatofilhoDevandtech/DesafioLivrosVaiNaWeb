import './QueroDoar.scss';
import livroTitulo from "../../../assets/livroTitulo.png"

export default function QueroDoar() {
  return (
    <div className="quero-doar">
      <p>Por favor, preencha o formulário com suas informações e as informações dos livros.</p>
      <main>
        <div className="form-container">
         <img src= {livroTitulo} alt="livro azul com titulo informação do livro " />
          <form action="">
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input type="text" id="titulo" name="titulo" />
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoria</label>
              <input type="text" id="categoria" name="categoria" />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Autor</label>
              <input type="text" id="autor" name="autor" />
            </div>
            <div className="form-group">
              <label htmlFor="linkImagem">Link da Imagem</label>
              <input type="text" id="linkImagem" name="linkImagem" />
            </div>
            <button type="submit">Doar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
