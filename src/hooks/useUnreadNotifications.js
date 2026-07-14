import { useCallback, useEffect, useRef, useState } from 'react'
import {
  getNotificationsUnreadSummary,
  getRiderNotificationsUnreadSummary,
  getMerchantNotificationsUnreadSummary,
} from '../services/notificationService'

const POLL_MS = 8000

export function useUnreadNotifications({ role = 'user', enabled = true } = {}) {
  const [unread, setUnread] = useState(0)
  const [chatUnread, setChatUnread] = useState(0)
  const mountedRef = useRef(true)

  const refresh = useCallback(async () => {
    if (!enabled) return
    try {
      const fetcher =
        role === 'rider'
          ? getRiderNotificationsUnreadSummary
          : role === 'merchant'
            ? getMerchantNotificationsUnreadSummary
            : getNotificationsUnreadSummary
      const { data } = await fetcher()
      const payload = data?.data || data || {}
      if (!mountedRef.current) return
      setUnread(Number(payload.unread || 0))
      setChatUnread(Number(payload.chat_unread || 0))
    } catch {
      // Keep last known counts on transient failures.
    }
  }, [enabled, role])

  useEffect(() => {
    mountedRef.current = true
    if (!enabled) {
      setUnread(0)
      setChatUnread(0)
      return undefined
    }

    refresh()
    const timer = window.setInterval(refresh, POLL_MS)
    const onFocus = () => refresh()
    const onPush = () => refresh()
    window.addEventListener('focus', onFocus)
    window.addEventListener('rapid-notifications-changed', onPush)

    return () => {
      mountedRef.current = false
      window.clearInterval(timer)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('rapid-notifications-changed', onPush)
    }
  }, [enabled, refresh])

  return {
    unread,
    chatUnread,
    hasUnread: unread > 0,
    hasChatUnread: chatUnread > 0,
    refresh,
  }
}
