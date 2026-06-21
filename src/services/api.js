import axios from 'axios'
import { rewriteStorageUrlsInData } from '../utils/mediaUrl'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const requestUrl = String(config.url ?? '')
  const isMerchantApi = requestUrl.includes('/merchant')
  const isAdminApi = requestUrl.includes('/admin')

  let token = null
  if (isAdminApi) {
    token =
      localStorage.getItem('rapid_admin_token') ||
      sessionStorage.getItem('rapid_admin_session_token')
    const pendingRaw = sessionStorage.getItem('rapid_admin_pending_session')
    if (!token && pendingRaw) {
      try {
        token = JSON.parse(pendingRaw)?.token ?? null
      } catch {
        token = null
      }
    }
  } else if (isMerchantApi) {
    token = localStorage.getItem('rapid_merchant_token')
  } else {
    token =
      localStorage.getItem('rapid_token') ||
      localStorage.getItem('rapid_merchant_token')
  }

  if (token) config.headers.Authorization = `Bearer ${token}`

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

api.interceptors.response.use(
  res => {
    if (res.data) {
      res.data = rewriteStorageUrlsInData(res.data)
    }
    return res
  },
  err => {
    if (err.response?.status === 401) {
      const path = window.location.pathname
      const isMerchantRoute = path.startsWith('/merchant')
      const isAdminRoute = path.startsWith('/admin')

      if (isAdminRoute) {
        localStorage.removeItem('rapid_admin_token')
        localStorage.removeItem('rapid_admin_user')
        sessionStorage.removeItem('rapid_admin_session_token')
        sessionStorage.removeItem('rapid_admin_pending_session')
        window.location.href = '/admin/login'
        return Promise.reject(err)
      }

      localStorage.removeItem('rapid_token')
      localStorage.removeItem('rapid_merchant_token')
      localStorage.removeItem('rapid_merchant_user')
      window.location.href = isMerchantRoute ? '/merchant/login' : '/auth/login'
    }
    return Promise.reject(err)
  }
)

export default api
