import { useState, useEffect } from "react";
import axios from "axios";
import s from "./LivrosDoados.module.scss";

export default function LivrosDoados() {
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros
  const [isLoading, setIsLoading] = useState(true); // Indicador de carregamento
  const [error, setError] = useState(null); // Indicador de erro

  // Função para buscar os livros na API
  const fetchLivros = async () => {
    try {
      const response = await axios.get("https://api-livros-58ct.onrender.com/livros");
      setLivros(response.data); // Armazena os dados recebidos no estado
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
      setError("Não foi possível carregar os livros doados. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  // useEffect para carregar os livros quando o componente é montado
  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <section className={s.sectionLivrosDoados}>
      <h2>Livros Doados</h2>
      {isLoading ? (
        <p>Carregando os livros...</p> // Indicador de carregamento
      ) : error ? (
        <p>{error}</p> // Exibição de mensagem de erro
      ) : livros.length === 0 ? (
        <p>Nenhum livro doado disponível no momento.</p> // Caso não existam livros
      ) : (
        <section className={s.containerCards}>
          {livros.map((livro) => (
            <section key={livro.id} className={s.card}>
              <img
                src={livro.image_url || "../../../assets/ImgLivro.png"}
                alt={`Capa do livro ${livro.titulo}`}
              />
              <div>
                <h3>{livro.titulo}</h3>
                <p>{livro.autor}</p>
                <p>{livro.categoria}</p>
              </div>
            </section>
          ))}
        </section>
      )}
    </section>
  );
}
