import api from './api'

export const getOrders = (params) => api.get('/orders', { params })
export const getOrder = (id) => api.get(`/orders/${id}`)
export const createOrder = (data) => api.post('/orders', data)
export const cancelOrder = (id) => api.patch(`/orders/${id}/cancel`)
export const trackOrder = (id) => api.get(`/orders/${id}/track`)
