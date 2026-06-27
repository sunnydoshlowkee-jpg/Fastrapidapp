import api from './api';
import { uploadProfileAvatar } from './authService';

export const requestRegistrationEmail = (email) =>
  api.post('/rider/auth/email', { email });

export const verifyRegistrationEmail = ({ email, code }) =>
  api.post('/rider/auth/email/verify', { email, code });

export const login = (credentials) => api.post('/rider/auth/login', credentials);

export const register = (data) => api.post('/rider/auth/register', data);

export const toggleStatus = () => api.post('/rider/auth/status');

export const getRiderMe = () => api.get('/rider/me');

export const updateRiderProfile = (data) => api.put('/rider/profile', data);

export const getRiderDocuments = () => api.get('/rider/documents');

export const uploadRiderAvatar = uploadProfileAvatar;
