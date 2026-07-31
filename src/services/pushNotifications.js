import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'
import { registerDeviceToken, unregisterDeviceToken } from './deviceTokenService'
import { getNativePersona, getRoleConfig, getNativeAppRole, getAppPathname, navigateAppPath } from '../utils/appRole'

const TOKEN_STORAGE_KEY = 'rapid_fcm_token'
export const PUSH_CHANNEL_ID = 'fastrapid_default'
let initialized = false
let registrationInFlight = null

function hasAuthToken({ ignorePushPreference = false } = {}) {
  const role = getNativeAppRole()
  const { tokenKey } = getRoleConfig(role)
  if (!localStorage.getItem(tokenKey)) return false

  // Rider Edit Profile can opt out of push registration.
  if (!ignorePushPreference && role === 'rider') {
    const saved = localStorage.getItem('rider_push_notifs')
    if (saved !== null && JSON.parse(saved) === false) return false
  }

  return true
}

function persistLocalToken(token) {
  if (token) localStorage.setItem(TOKEN_STORAGE_KEY, token)
  else localStorage.removeItem(TOKEN_STORAGE_KEY)
}

function readLocalToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY)
}

async function syncTokenWithApi(token) {
  if (!token || !hasAuthToken()) return

  try {
    await registerDeviceToken(token, {
      platform: Capacitor.getPlatform(),
      appPersona: getNativePersona(),
    })
  } catch (error) {
    console.warn('[push] Failed to register device token', error)
  }
}

function navigateFromNotification(notification) {
  const data = notification?.data || {}
  const path = data.path || data.click_action
  if (!path || typeof path !== 'string') return
  if (!path.startsWith('/')) return

  if (getAppPathname() !== path.split('?')[0]) {
    navigateAppPath(path)
  }
}

async function ensurePushChannel() {
  try {
    await PushNotifications.createChannel({
      id: PUSH_CHANNEL_ID,
      name: 'FastRapid Alerts',
      description: 'Orders, chat, and delivery updates',
      importance: 5,
      visibility: 1,
      sound: 'default',
      vibration: true,
    })
  } catch (error) {
    console.warn('[push] Failed to create notification channel', error)
  }
}

async function showForegroundBanner(notification) {
  const title = notification?.title || notification?.data?.title
  const body = notification?.body || notification?.data?.body || notification?.data?.message
  if (!title && !body) return

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Date.now() % 100000,
          title: title || 'FastRapid',
          body: body || '',
          channelId: PUSH_CHANNEL_ID,
          smallIcon: 'ic_stat_fastrapid',
          extra: notification?.data || {},
        },
      ],
    })
  } catch (error) {
    console.warn('[push] Foreground banner failed', error)
  }
}

export async function initPushNotifications() {
  if (!Capacitor.isNativePlatform()) return
  if (initialized) {
    const existing = readLocalToken()
    if (existing && hasAuthToken()) await syncTokenWithApi(existing)
    return
  }

  if (registrationInFlight) return registrationInFlight

  registrationInFlight = (async () => {
    try {
      let permission = await PushNotifications.checkPermissions()
      if (permission.receive === 'prompt' || permission.receive === 'prompt-with-rationale') {
        permission = await PushNotifications.requestPermissions()
      }

      if (permission.receive !== 'granted') {
        console.info('[push] Notification permission not granted')
        return
      }

      await ensurePushChannel()

      try {
        await LocalNotifications.requestPermissions()
      } catch {
        // Optional for foreground banners
      }

      await PushNotifications.removeAllListeners()

      await PushNotifications.addListener('registration', async (event) => {
        const token = event?.value
        if (!token) return
        persistLocalToken(token)
        await syncTokenWithApi(token)
      })

      await PushNotifications.addListener('registrationError', (error) => {
        console.warn('[push] Registration error', error)
      })

      await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
        await showForegroundBanner(notification)
        window.dispatchEvent(new Event('rapid-notifications-changed'))
      })

      await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
        navigateFromNotification(action?.notification)
        window.dispatchEvent(new Event('rapid-notifications-changed'))
      })

      await LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
        navigateFromNotification({ data: action?.notification?.extra || {} })
        window.dispatchEvent(new Event('rapid-notifications-changed'))
      })

      await PushNotifications.register()
      initialized = true
    } catch (error) {
      console.warn('[push] Init failed', error)
    } finally {
      registrationInFlight = null
    }
  })()

  return registrationInFlight
}

export async function syncPushTokenAfterLogin() {
  if (!Capacitor.isNativePlatform()) return
  await initPushNotifications()
  const token = readLocalToken()
  if (token) await syncTokenWithApi(token)
}

export async function clearPushTokenOnLogout() {
  if (!Capacitor.isNativePlatform()) return
  const token = readLocalToken()
  if (!token) return

  try {
    if (hasAuthToken({ ignorePushPreference: true })) {
      await unregisterDeviceToken(token, { appPersona: getNativePersona() })
    }
  } catch {
    // Ignore logout cleanup failures
  } finally {
    persistLocalToken(null)
  }
}
