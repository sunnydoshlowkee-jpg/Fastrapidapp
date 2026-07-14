import api from './api'

export const getNotifications = () => api.get('/user/notifications')
export const getNotificationsUnreadSummary = () =>
  api.get('/user/notifications/unread-summary')
export const markAsRead = (id) => api.post(`/user/notifications/${id}/read`)

export const getMerchantNotifications = () => api.get('/merchant/notifications')
export const getMerchantNotificationsUnreadSummary = () =>
  api.get('/merchant/notifications/unread-summary')
export const markMerchantAsRead = (id) => api.post(`/merchant/notifications/${id}/read`)

export const getRiderNotifications = () => api.get('/rider/notifications')
export const getRiderNotificationsUnreadSummary = () =>
  api.get('/rider/notifications/unread-summary')
export const markRiderAsRead = (id) => api.post(`/rider/notifications/${id}/read`)
