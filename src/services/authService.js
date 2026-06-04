import api from './api'

export const requestPhoneOtp = (data) => api.post('/auth/phone', data)
export const verifyPhoneOtp = (data) => api.post('/auth/phone/verify', data)
export const completeProfile = (data) => api.post('/auth/profile', data)
export const updateProfile = (data) => api.put('/auth/profile', data)
export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (data) => api.post('/auth/register', data)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')
export const refreshToken = () => api.post('/auth/refresh')
