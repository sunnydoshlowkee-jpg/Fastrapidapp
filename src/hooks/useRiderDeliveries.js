import { useState, useCallback } from 'react';
import { getAvailableDeliveries, acceptDelivery as acceptDeliveryService, updateDeliveryStatus as updateDeliveryStatusService } from '../services/riderDeliveryService';

export const useRiderDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailableDeliveries(lat, lng);
      setDeliveries(response.data || response);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch deliveries');
    } finally {
      setLoading(false);
    }
  }, []);

  const accept = async (id) => {
    try {
      await acceptDeliveryService(id);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to accept delivery');
      throw err;
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDeliveryStatusService(id, status);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update status');
      throw err;
    }
  };

  return { deliveries, loading, error, refresh, accept, updateStatus };
};
