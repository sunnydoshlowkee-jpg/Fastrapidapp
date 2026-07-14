import api from './api';

export const pingLocation = (lat, lng) => api.post('/rider/location', {
  latitude: lat,
  longitude: lng,
  lat,
  lng,
});
