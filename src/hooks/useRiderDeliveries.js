import { useState, useCallback } from 'react';
import { getAvailableDeliveries, getDeliveryDetails, acceptDelivery as acceptDeliveryService, updateDeliveryStatus as updateDeliveryStatusService } from '../services/riderDeliveryService';

export const useRiderDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAvailableDeliveries(lat, lng);
      setDeliveries(response.data?.deliveries || response.deliveries || response.data || response);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch deliveries');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDeliveryDetails(id);
      const data = response.data?.delivery || response.delivery || response.data || response;
      setDeliveryDetails(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch delivery details');
      throw err;
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

  const updateStatus = async (id, status, coords = null) => {
    try {
      await updateDeliveryStatusService(id, status, coords);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update status');
      throw err;
    }
  };

  return { deliveries, deliveryDetails, loading, error, refresh, fetchDetails, accept, updateStatus };
};
