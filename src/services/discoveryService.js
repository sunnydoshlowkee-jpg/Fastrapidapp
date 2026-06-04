import api from './api'

export const getDiscovery = (params) => api.get('/discovery', { params })
