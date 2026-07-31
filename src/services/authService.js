import api from './api'

export const requestPhoneOtp = (data) => api.post('/auth/phone', data)
export const verifyPhoneOtp = (data) => api.post('/auth/phone/verify', data)
export const completeProfile = (data) => api.post('/auth/profile', data)
export const updateProfile = (data) => api.put('/auth/profile', data)
export const uploadProfileAvatar = (file) => {
  const formData = new FormData()
  const name = file?.name || 'avatar.jpg'
  formData.append('avatar', file, name)

  return api.post('/auth/profile/avatar', formData, {
    timeout: 60_000,
  })
}
export const requestEmailOtp = (data) => api.post('/auth/email', data)
export const verifyEmailOtp = (data) => api.post('/auth/email/verify', data)
export const logout = () => api.post('/auth/logout')
export const getMe = () => api.get('/auth/me')
export const refreshToken = () => api.post('/auth/refresh')
