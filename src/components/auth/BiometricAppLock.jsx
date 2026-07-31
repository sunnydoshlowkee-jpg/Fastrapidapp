import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import BiometricUnlock from '../../apps/user/pages/auth/BiometricUnlock'
import { getMe } from '../../services/authService'
import { hasAuthToken, isBiometricUnlockEnabled, setBiometricUnlockEnabled } from '../../utils/biometricSession'
import { detectAppRole } from '../../utils/appRole'
import { resolveUserLoginSecurity } from '../../utils/userLoginSecurity'

export default function BiometricAppLock({ children }) {
  const location = useLocation()
  const role = detectAppRole(location.pathname)
  const [locked, setLocked] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return undefined

    let active = true

    const syncEnabled = async () => {
      let local = await isBiometricUnlockEnabled(role)

      if (role === 'user' && hasAuthToken(role) && !local) {
        try {
          const { data } = await getMe()
          const security = resolveUserLoginSecurity(data?.data?.user)
          if (security.biometricEnabled) {
            // Server says ON but this device lost Preferences after reinstall —
            // keep app lock active so the next resume forces re-enroll unlock.
            local = true
            await setBiometricUnlockEnabled(true, role).catch(() => {})
          }
        } catch {
          // ignore
        }
      }

      if (active) setEnabled(local)
    }

    syncEnabled()

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
