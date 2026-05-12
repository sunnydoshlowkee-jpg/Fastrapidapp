import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('rapid_token')
    if (!token) { setLoading(false); return }

    getMe()
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem('rapid_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('rapid_token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('rapid_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
