import api from './api'

export const getWalletData = () => api.get('/user/wallet/transactions')
export const fundWallet = (data) => api.post('/user/wallet/fund', data)
