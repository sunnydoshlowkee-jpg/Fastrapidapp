import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { initPushNotifications, syncPushTokenAfterLogin } from '../../services/pushNotifications'
import { getNativeAppRole, getRoleConfig } from '../../utils/appRole'

/**
 * Registers FCM on native APKs once an auth token exists for the current persona.
 */
export default function PushNotificationsBootstrap() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return undefined

    const syncIfAuthed = () => {
      const role = getNativeAppRole()
      const { tokenKey } = getRoleConfig(role)
      if (localStorage.getItem(tokenKey)) {
        syncPushTokenAfterLogin()
      } else {
        initPushNotifications()
      }
    }

    syncIfAuthed()

    const onAuthChanged = () => syncIfAuthed()
    window.addEventListener('rapid-auth-changed', onAuthChanged)
    window.addEventListener('storage', onAuthChanged)

    return () => {
      window.removeEventListener('rapid-auth-changed', onAuthChanged)
      window.removeEventListener('storage', onAuthChanged)
    }
  }, [])

  return null
}
