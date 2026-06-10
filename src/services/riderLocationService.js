import api from './api';

export const pingLocation = (lat, lng) => api.post('/rider/location', { lat, lng });
