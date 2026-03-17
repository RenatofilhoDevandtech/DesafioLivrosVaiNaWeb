import { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const useDonate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const donateBook = async (formData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/doar', formData);
      toast.success('Livro doado com sucesso! 🎉');
      return response.data;
    } catch (err) {
      toast.error('Erro ao doar o livro. Tente novamente.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { donateBook, isLoading };
};
