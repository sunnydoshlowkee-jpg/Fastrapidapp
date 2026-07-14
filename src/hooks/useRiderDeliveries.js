import { useState, useCallback } from 'react';
import {
  getAvailableDeliveries,
  getActiveDeliveries,
  getDeliveryHistory,
  getDeliveryDetails,
  acceptDelivery as acceptDeliveryService,
  updateDeliveryStatus as updateDeliveryStatusService,
} from '../services/riderDeliveryService';

function normalizeDeliveries(response) {
  return response.data?.deliveries || response.deliveries || response.data || response;
}

export const useRiderDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshActive = useCallback(async () => {
    try {
      const response = await getActiveDeliveries();
      setActiveDeliveries(normalizeDeliveries(response));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch active deliveries');
    }
  }, []);

  const refresh = useCallback(async (lat = null, lng = null) => {
    setLoading(true);
    setError(null);
    try {
      if (lat != null && lng != null) {
        const response = await getAvailableDeliveries(lat, lng);
        setDeliveries(normalizeDeliveries(response));
      } else {
        const response = await getDeliveryHistory();
        setDeliveries(normalizeDeliveries(response));
      }
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

  const accept = async (id, coords = null) => {
    try {
      await acceptDeliveryService(id, coords)
      await refreshActive()
      return true
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to accept delivery')
      throw err
    }
  };

  const updateStatus = async (id, status, coords = null) => {
    try {
      await updateDeliveryStatusService(id, status, coords);
      await refreshActive();
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update status');
      throw err;
    }
  };

  return {
    deliveries,
    activeDeliveries,
    deliveryDetails,
    loading,
    error,
    refresh,
    refreshActive,
    fetchDetails,
    accept,
    updateStatus,
  };
};
