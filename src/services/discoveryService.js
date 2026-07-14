import api from './api'

export const getDiscovery = (params) => api.get('/discovery', { params })
export const getDiscoveryCategories = (params) => api.get('/discovery/categories', { params })
export const getDiscoveryBrowse = (params) => api.get('/discovery/browse', { params })
export const getVendor = (id, params = {}) => api.get(`/discovery/${id}`, { params })
export const getDiscoveryItem = (id, params = {}) => api.get(`/discovery/item/${id}`, { params })
