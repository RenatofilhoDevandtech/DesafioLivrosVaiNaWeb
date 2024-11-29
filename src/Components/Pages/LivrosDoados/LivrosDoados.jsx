import ImgLivro from "../../../assets/ImgLivro.png"
import s from "./LivrosDoados.module.scss"
export default function LivrosDoados(){

return(
    <section className= {s.sectionlivrosDoados}>
        <img src={ImgLivro} alt="" />
        <img src={ImgLivro} alt="" />
        <img src={ImgLivro} alt="" />
    </section>
)

}