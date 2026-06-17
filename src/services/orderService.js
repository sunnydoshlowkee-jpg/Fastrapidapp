import api from './api'

export const getOrders = (params) => api.get('/user/orders', { params })
export const getOrder = (id) => api.get(`/user/orders/${id}`)
export const createOrder = (data) => api.post('/user/orders/checkout', data)
export const cancelOrder = (id) => api.patch(`/user/orders/${id}/cancel`)
export const trackOrder = (id) => api.get(`/user/orders/${id}/track`)
