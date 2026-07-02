import api from './api'

export const getNotifications = () => api.get('/user/notifications')
export const markAsRead = (id) => api.post(`/user/notifications/${id}/read`)
export const getRiderNotifications = () => api.get('/rider/notifications')
export const markRiderAsRead = (id) => api.post(`/rider/notifications/${id}/read`)
