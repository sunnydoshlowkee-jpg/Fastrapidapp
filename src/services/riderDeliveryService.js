import api from './api';

export const getAvailableDeliveries = (lat, lng) => api.get('/rider/deliveries/available', { params: { lat, lng } });
export const getDeliveryDetails = (id) => api.get(`/rider/deliveries/${id}`);
export const acceptDelivery = (id) => api.post(`/rider/deliveries/${id}/accept`);
export const updateDeliveryStatus = (id, status, coords = null) => {
  const payload = { status };
  if (coords?.lat != null && coords?.lng != null) {
    payload.latitude = coords.lat;
    payload.longitude = coords.lng;
  }
  return api.post(`/rider/deliveries/${id}/status`, payload);
};
