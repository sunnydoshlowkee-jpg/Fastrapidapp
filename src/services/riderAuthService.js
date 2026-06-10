import api from './api';

export const login = (credentials) => api.post('/rider/auth/login', credentials);
export const register = (data) => api.post('/rider/auth/register', data);
export const toggleStatus = () => api.post('/rider/auth/status');
