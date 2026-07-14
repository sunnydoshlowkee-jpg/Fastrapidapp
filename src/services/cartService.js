import api from './api'

export async function fetchUserCart() {
  const { data } = await api.get('/user/cart')
  return data?.data?.items || []
}

export async function saveUserCart(items) {
  const { data } = await api.put('/user/cart', { items })
  return data?.data?.items || []
}

export function getConsumerAuthToken() {
  return localStorage.getItem('rapid_token')
}
