import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export const getOrders = (params) => api.get('/user/orders', { params })
export const getOrder = (id) => api.get(`/user/orders/${id}`)
export const createOrder = async (data) => {
  try {
    return await api.post('/user/orders/checkout', data)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}
export const cancelOrder = (id) => api.patch(`/user/orders/${id}/cancel`)
export const trackOrder = (id) => api.get(`/user/orders/${id}/track`)
export const submitReview = (id, data) => api.post(`/user/orders/${id}/review`, data)
