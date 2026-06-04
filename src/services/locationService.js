import api from './api'

export const updateLocation = (data) => api.put('/auth/location', data)
export const getLocation = () => api.get('/auth/location')
