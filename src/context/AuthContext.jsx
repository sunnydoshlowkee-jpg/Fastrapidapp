import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getMe, logout as logoutApi } from '../services/authService'

const AuthContext = createContext(null)

function extractUser(response) {
  return response?.data?.data?.user ?? response?.data?.user ?? null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('rapid_token')
    if (!token) {
      setUser(null)
      return null
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
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [refreshUser])

  const login = (token, userData) => {
    localStorage.setItem('rapid_token', token)
    setUser(userData)
  }

  const logout = async () => {
    try {
      await logoutApi()
    } catch {
      // Still clear local session if the API call fails.
    }
    localStorage.removeItem('rapid_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
