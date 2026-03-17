import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { pdfCatalog } from '../data/pdf_catalog';
import { affiliateCatalog } from '../data/affiliate_catalog';
import { fallbackBooks } from '../data/fallback_books';
import { toast } from 'react-toastify';

export const useBooks = (page = 1, size = 10, busca = '', filterType = 'all') => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [isOffline, setIsOffline] = useState(false);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let apiBooks = [];
      let apiTotal = 0;

      // 1. Fetch from API (Physical Donations)
      // 1. Fetch from API (Physical Donations)
      try {
        const response = await api.get('/livros', {
          params: { page, size, busca },
        });
        const data = Array.isArray(response.data) ? response.data : [];
        apiBooks = data.map(b => ({ ...b, type: 'donation' }));
        apiTotal = parseInt(response.headers['x-total-count'] || '0');
        setIsOffline(false);
      } catch (err) {
        console.warn('API Offline or Error. Using fallback data.');
        setIsOffline(true);
        const fb = Array.isArray(fallbackBooks) ? fallbackBooks : [];
        apiBooks = fb.filter(b => b.type === 'donation');
        apiTotal = apiBooks.length;
      }
      
      // 2. Filter Local Catalogs (PDF & Affiliate)
      const searchTerm = busca.toLowerCase();
      const filteredPdfs = (Array.isArray(pdfCatalog) ? pdfCatalog : []).filter(b => 
        (b.titulo?.toLowerCase().includes(searchTerm) || 
         b.autor?.toLowerCase().includes(searchTerm))
      );
      const filteredAffs = (Array.isArray(affiliateCatalog) ? affiliateCatalog : []).filter(b => 
        (b.titulo?.toLowerCase().includes(searchTerm) || 
         b.autor?.toLowerCase().includes(searchTerm))
      );

      // 3. Merge based on filterType
      let allBooks = [];
      if (filterType === 'all') allBooks = [...filteredAffs, ...filteredPdfs, ...apiBooks];
      else if (filterType === 'donation') allBooks = apiBooks;
      else if (filterType === 'pdf') allBooks = filteredPdfs;
      else if (filterType === 'affiliate') allBooks = filteredAffs;

      // 4. Handle Pagination
      // Note: If API is paginated, merging locally is tricky. 
      // For this demo, we assume the local catalogs are small.
      if (filterType === 'all' || filterType === 'pdf' || filterType === 'affiliate') {
          const start = (page - 1) * size;
          const paginated = allBooks.slice(start, start + size);
          setBooks(paginated);
          setTotalItems(allBooks.length);
      } else {
          // Pure API/Donation mode uses API pagination
          setBooks(apiBooks);
          setTotalItems(apiTotal);
      }

    } catch (err) {
      setError('Erro ao carregar biblioteca.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, size, busca, filterType]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Show toast ONLY when transition to offline happens
  useEffect(() => {
    if (isOffline) {
        toast.info('Modo Offline: Exibindo dados de demonstração.', { toastId: 'offline-toast' });
    }
  }, [isOffline]);

  return { books, isLoading, error, totalItems, isOffline, refresh: fetchBooks };
};
