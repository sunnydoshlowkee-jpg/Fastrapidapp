import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import BiometricUnlock from '../../apps/user/pages/auth/BiometricUnlock'
import { hasAuthToken, isBiometricUnlockEnabled } from '../../utils/biometricSession'
import { detectAppRole } from '../../utils/appRole'

export default function BiometricAppLock({ children }) {
  const location = useLocation()
  const role = detectAppRole(location.pathname)
  const [locked, setLocked] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return undefined

    let active = true

    isBiometricUnlockEnabled(role).then((value) => {
      if (active) setEnabled(value)
    })

    const listener = App.addListener('appStateChange', async ({ isActive }) => {
      const currentRole = detectAppRole(window.location.hash.replace(/^#/, '') || window.location.pathname)
      if (!isActive && hasAuthToken(currentRole) && await isBiometricUnlockEnabled(currentRole)) {
        setLocked(true)
      }
    })

    return () => {
      active = false
      listener.then((handle) => handle.remove())
    }
  }, [role])

  const onAuthRoute = location.pathname.includes('/auth/')

  if (enabled && locked && hasAuthToken(role) && !onAuthRoute) {
    return <BiometricUnlock inline role={role} onUnlocked={() => setLocked(false)} />
  }

  return children
}
