import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getMe, logout as logoutApi } from '../services/authService'
import { clearCached, getCached, setCached } from '../utils/requestCache'
import { clearPushTokenOnLogout, syncPushTokenAfterLogin } from '../services/pushNotifications'
import { clearLoginSecurityVerified } from '../utils/userLoginSecurity'

const AuthContext = createContext(null)
const AUTH_USER_CACHE_KEY = 'auth-user'
const AUTH_USER_TTL_MS = 5 * 60 * 1000

function extractUser(response) {
  return response?.data?.data?.user ?? response?.data?.user ?? null
}

function readInitialUser() {
  const token = localStorage.getItem('rapid_token')
  if (!token) return null
  return getCached(AUTH_USER_CACHE_KEY, { ttlMs: AUTH_USER_TTL_MS })?.data ?? null
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(readInitialUser)
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('rapid_token') && !readInitialUser()))

  const setUser = useCallback((nextUser) => {
    if (nextUser) {
      setCached(AUTH_USER_CACHE_KEY, nextUser)
    } else {
      clearCached(AUTH_USER_CACHE_KEY)
    }
    setUserState(nextUser)
  }, [])

  const refreshUser = useCallback(async ({ background = false } = {}) => {
    const token = localStorage.getItem('rapid_token')
    if (!token) {
      setUser(null)
      return null
    }

    const cached = getCached(AUTH_USER_CACHE_KEY, { ttlMs: AUTH_USER_TTL_MS })
    if (cached?.data) {
      setUserState(cached.data)
      if (cached.fresh) {
        return cached.data
      }
      if (background) {
        getMe()
          .then((response) => {
            const nextUser = extractUser(response)
            setUser(nextUser)
          })
          .catch(() => {
            localStorage.removeItem('rapid_token')
            setUser(null)
          })
        return cached.data
      }
    }

    try {
      const response = await getMe()
      const nextUser = extractUser(response)
      setUser(nextUser)
      return nextUser
    } catch {
      localStorage.removeItem('rapid_token')
      setUser(null)
      return null
    }
  }, [setUser])

  useEffect(() => {
    refreshUser({ background: Boolean(readInitialUser()) }).finally(() => setLoading(false))
  }, [refreshUser])

  const login = (token, userData) => {
    localStorage.setItem('rapid_token', token)
    setUser(userData)
    window.dispatchEvent(new Event('rapid-auth-changed'))
    syncPushTokenAfterLogin()
  }

  const logout = async () => {
    await clearPushTokenOnLogout()
    try {
      await logoutApi()
    } catch {
      // Still clear local session if the API call fails.
    }
    localStorage.removeItem('rapid_token')
    clearCached()
    clearLoginSecurityVerified()
    setUserState(null)
    window.dispatchEvent(new Event('rapid-auth-changed'))
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
