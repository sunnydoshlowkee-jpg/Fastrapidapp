import api from './api'

export const getDiscovery = (params) => api.get('/discovery', { params })
export const getVendor = (id) => api.get(`/discovery/${id}`)
export const getDiscoveryItem = (id) => api.get(`/discovery/item/${id}`)
