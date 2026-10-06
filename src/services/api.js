import axios from 'axios'
import { rewriteStorageUrlsInData } from '../utils/mediaUrl'
import { getAppPathname, navigateAppPath } from '../utils/appRole'
import {
  dropUnauthorizedMerchantAccount,
  merchantAccountRedirectPath,
} from './merchantAccountStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const requestUrl = String(config.url ?? '')
  const isMerchantApi = requestUrl.includes('/merchant')
  const isAdminApi = requestUrl.includes('/admin')
  const isPipelineApi = requestUrl.includes('/admin/pipeline') || getAppPathname().startsWith('/pipeline-admin')
  const isRiderApi = requestUrl.includes('/rider')

  let token = null
  if (isPipelineApi) {
    token =
      localStorage.getItem('rapid_pipeline_token') ||
      sessionStorage.getItem('rapid_pipeline_session_token')
  } else if (isAdminApi) {
    token =
      localStorage.getItem('rapid_admin_token') ||
      sessionStorage.getItem('rapid_admin_session_token')
  } else if (isMerchantApi) {
    token = localStorage.getItem('rapid_merchant_token')
  } else if (isRiderApi) {
    token = localStorage.getItem('rider_token')
  } else if (requestUrl.includes('/user/security')) {
    token =
      localStorage.getItem('rapid_token') ||
      localStorage.getItem('rider_token') ||
      localStorage.getItem('rapid_merchant_token')
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
      const requestUrl = String(err.config?.url ?? '')
      const path = getAppPathname()
      const isPipelineRoute = requestUrl.includes('/admin/pipeline') || path.startsWith('/pipeline-admin')
      const isMerchantRoute =
        requestUrl.includes('/merchant') || path.startsWith('/merchant')
      const isAdminRoute =
        requestUrl.includes('/admin') || path.startsWith('/admin')
      const isRiderRoute =
        requestUrl.includes('/rider') || path.startsWith('/dispatch')

      if (isPipelineRoute) {
        localStorage.removeItem('rapid_pipeline_token')
        localStorage.removeItem('rapid_pipeline_user')
        sessionStorage.removeItem('rapid_pipeline_session_token')
        sessionStorage.removeItem('rapid_pipeline_pending_session')
        navigateAppPath('/pipeline-admin/login')
        return Promise.reject(err)
      }

      if (isAdminRoute) {
        localStorage.removeItem('rapid_admin_token')
        localStorage.removeItem('rapid_admin_user')
        sessionStorage.removeItem('rapid_admin_session_token')
        sessionStorage.removeItem('rapid_admin_pending_session')
        navigateAppPath('/admin/login')
        return Promise.reject(err)
      }

      if (isRiderRoute) {
        localStorage.removeItem('rider_token')
        localStorage.removeItem('rider_user')
        navigateAppPath('/dispatch/login')
        return Promise.reject(err)
      }

      localStorage.removeItem('rapid_token')

      if (isMerchantRoute) {
        const next = dropUnauthorizedMerchantAccount()
        if (next) {
          navigateAppPath(merchantAccountRedirectPath(next.user))
          return Promise.reject(err)
        }
        navigateAppPath('/merchant/login')
        return Promise.reject(err)
      }

      localStorage.removeItem('rapid_merchant_token')
      localStorage.removeItem('rapid_merchant_user')
      navigateAppPath('/auth/login')
    }
    return Promise.reject(err)
  }
)

export default api
