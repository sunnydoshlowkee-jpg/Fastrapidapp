import { useState, useCallback } from 'react';
import { getEarnings } from '../services/riderWalletService';

export const useRiderEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async (period = 'all') => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEarnings(period);
      setEarnings(response.data || response);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch earnings');
    } finally {
      setLoading(false);
    }
  }, []);

  return { earnings, loading, error, refresh };
};
