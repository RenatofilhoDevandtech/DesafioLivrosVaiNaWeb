import s from'./QueroDoar.module.scss';
import livroTitulo from "../../../assets/livroTitulo.png"


export default function QueroDoar() {
  return (
    <section className={s.queroDoarsection}>
      <p>Por favor, preencha o formulário com suas informações e as informações dos livros.</p>
    
          <form className={s.formqueroDoar} action="">
            <div className={s.divformTitulo}>
              <img src= {livroTitulo} alt="livro azul com titulo informação do livro " />
            </div>
              <input className={s.inputform} type="text" name="" id="" placeholder='Titulo'/>
              <input className={s.inputform} type="text" name="" id="" placeholder='Categoria'/>
              <input className={s.inputform} type="text" name="" id="" placeholder='Autor'/>
              <input className={s.inputform} type="text" name="" id="" placeholder='Link da Imagem'/>
              <input className={s.inputButtonForm} type="Submit" value="Doar" />
          </form>
      
     
    </section>
  );
}
