import api from './api'

export const getAddresses = () => api.get('/user/addresses')
export const createAddress = (data) => api.post('/user/addresses', data)
export const updateAddress = (id, data) => api.put(`/user/addresses/${id}`, data)
export const deleteAddress = (id) => api.delete(`/user/addresses/${id}`)
export const setDefaultAddress = (id) => api.patch(`/user/addresses/${id}/default`)
