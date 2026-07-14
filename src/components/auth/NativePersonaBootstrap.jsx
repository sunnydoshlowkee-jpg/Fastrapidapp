import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { getNativeAppRole } from '../../utils/appRole'

export default function NativePersonaBootstrap() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    const personaRole = getNativeAppRole()
    const path = location.pathname

    if (personaRole === 'rider' && (path === '/' || path === '')) {
      navigate('/dispatch/splash', { replace: true })
      return
    }

    if (personaRole === 'merchant' && (path === '/' || path === '')) {
      navigate('/merchant/splash', { replace: true })
    }
  }, [location.pathname, navigate])

  return null
}
