import api from './api';

export const getAvailableDeliveries = (lat, lng) => api.get('/rider/deliveries/available', { params: { lat, lng } });
export const acceptDelivery = (id) => api.post(`/rider/deliveries/${id}/accept`);
export const updateDeliveryStatus = (id, status) => api.post(`/rider/deliveries/${id}/status`, { status });
