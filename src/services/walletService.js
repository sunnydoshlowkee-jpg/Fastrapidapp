import api from './api'

export const getBalance = () => api.get('/wallet/balance')
export const getTransactions = (params) => api.get('/wallet/transactions', { params })
export const fundWallet = (data) => api.post('/wallet/fund', data)
export const withdraw = (data) => api.post('/wallet/withdraw', data)
