import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage user's localized profile (reservations and donations)
 * Simulates a backend for recruiters by using LocalStorage for persistence.
 */
export const useProfile = () => {
  const [reservations, setReservations] = useState([]);
  const [myDonations, setMyDonations] = useState([]);

  // Load data on mount
  useEffect(() => {
    const savedReservations = JSON.parse(localStorage.getItem('vnw_reservations') || '[]');
    const savedDonations = JSON.parse(localStorage.getItem('vnw_donations') || '[]');
    setReservations(savedReservations);
    setMyDonations(savedDonations);
  }, []);

  // Save reservations whenever they change
  useEffect(() => {
    localStorage.setItem('vnw_reservations', JSON.stringify(reservations));
  }, [reservations]);

  // Save donations whenever they change
  useEffect(() => {
    localStorage.setItem('vnw_donations', JSON.stringify(myDonations));
  }, [myDonations]);

  const addReservation = useCallback((book) => {
    const newReservation = {
      ...book,
      reservedAt: new Date().toISOString(),
      trackingStatus: 'Pendente', // Pendente, Enviado, Em Transito, Entregue
      trackingCode: `VNW-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      steps: [
        { label: 'Reserva Confirmada', date: new Date().toLocaleDateString(), completed: true },
        { label: 'Preparação para Envio', date: 'Aguardando', completed: false },
        { label: 'Em Trânsito', date: '---', completed: false },
        { label: 'Entregue', date: '---', completed: false },
      ]
    };
    setReservations(prev => [newReservation, ...prev]);
  }, []);

  const addDonation = useCallback((book) => {
    const newDonation = {
      ...book,
      donatedAt: new Date().toISOString(),
      status: 'Análise Técnica',
      impact: 'Aguardando validação para liberar para a comunidade'
    };
    setMyDonations(prev => [newDonation, ...prev]);
  }, []);

  const removeReservation = useCallback((id) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  }, []);

  return { reservations, myDonations, addReservation, addDonation, removeReservation };
};
