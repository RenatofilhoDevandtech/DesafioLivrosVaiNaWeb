import ImgLivro from "../../../assets/ImgLivro.png"
import s from "./LivrosDoados.module.scss"
export default function LivrosDoados(){

return(
    <section className= {s.sectionlivrosDoados}>
        <h2>Livros Doados</h2>
        <section className= {s.containerCards}>
            <section>
                <img src={ImgLivro} alt="" />
            <div>
                <h3> o Protagonista </h3>
                <p>Susanne Andrade</p>
                <p>Ficção</p>
            </div>
            </section> 
        </section>
        
    </section>
)

}