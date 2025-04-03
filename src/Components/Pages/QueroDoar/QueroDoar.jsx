import livroTitulo from '../../../assets/livroTitulo.png';
import s from './queroDoar.module.scss';
import { useState } from 'react';
import axios from 'axios';

export default function QueroDoar() {
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    autor: '',
    image_url: '',
  });

  const [isLoading, setIsLoading] = useState(false); 
  const [message, setMessage] = useState(''); 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const envioDados = async () => {
    setIsLoading(true); 
    setMessage(''); 
    try {
      const response = await axios.post(
        'https://api-livros-58ct.onrender.com/doar',
        formData,
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        setMessage('Livro doado com sucesso!');
        setFormData({
          titulo: '',
          categoria: '',
          autor: '',
          image_url: '',
        });
      } else {
        setMessage('Erro ao doar o livro. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <section className={s.queroDoarSection}>
      <p>Preencha o formulário com as informações do livro para realizar a doação!</p>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          envioDados();
        }}
      >
        <div>
          <img src={livroTitulo} alt="Ícone de livro com borda azul" />
          <h2>Informações do Livro</h2>
        </div>
        <input
          type="text"
          name="titulo"
          placeholder="Título do Livro"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria do Livro"
          value={formData.categoria}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor do Livro"
          value={formData.autor}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="image_url"
          placeholder="URL da Imagem do Livro"
          value={formData.image_url}
          onChange={handleChange}
          required
        />
        <button type="submit" className={s.buttonDoar} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Doar'}
        </button>
      </form>
      {message && <p className={s.feedbackMessage}>{message}</p>} {/* Mensagem de feedback */}
    </section>
  );
}
