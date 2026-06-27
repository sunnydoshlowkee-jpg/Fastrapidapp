import api from './api';

export const login = (credentials) => api.post('/rider/auth/login', credentials);
export const register = (data) => api.post('/rider/auth/register', data);
export const toggleStatus = () => api.post('/rider/auth/status');
export const getProfile = () => api.get('/rider/me');
export const updateProfile = (data) => api.put('/rider/profile', data);
export const requestEmailOtp = (email) => api.post('/rider/auth/email', { email });
export const verifyEmailOtp = (email, code) => api.post('/rider/auth/email/verify', { email, code });
export const requestPhoneOtp = (phone) => api.post('/rider/auth/phone', { phone });
export const verifyPhoneOtp = (phone, code) => api.post('/rider/auth/phone/verify', { phone, code });
export const getDocuments = () => api.get('/rider/documents');
export const uploadDocument = (data) => api.post('/rider/documents', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

