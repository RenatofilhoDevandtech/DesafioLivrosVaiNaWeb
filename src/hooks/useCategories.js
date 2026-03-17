import { useState, useEffect } from 'react';
import api from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categorias');
        setCategories(response.data);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, isLoading };
};
