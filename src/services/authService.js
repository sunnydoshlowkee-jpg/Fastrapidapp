import api from './api'

export const requestPhoneOtp = (data) => api.post('/auth/phone', data)
export const verifyPhoneOtp = (data) => api.post('/auth/phone/verify', data)
export const completeProfile = (data) => api.post('/auth/profile', data)
export const updateProfile = (data) => api.put('/auth/profile', data)
export const uploadProfileAvatar = (file) => {
  const formData = new FormData()
  formData.append('avatar', file)

  return api.post('/auth/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
export const requestEmailOtp = (data) => api.post('/auth/email', data)
export const verifyEmailOtp = (data) => api.post('/auth/email/verify', data)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')
export const refreshToken = () => api.post('/auth/refresh')
