import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Bike, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  getMerchantNotifications,
  markMerchantAsRead,
  markMerchantAllAsRead,
} from '../../../services/notificationService'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'
import BrandedLoader from '../../../components/ui/BrandedLoader'

function getIcon(type, data) {
  if (data?.kind === 'rider_arrived_at_pickup') {
    return <Bike size={20} className="text-merchant-primary" />
  }
  if (type === 'order' || type === 'delivery') {
    return <ShoppingBag size={20} className="text-merchant-primary" />
  }
  return <Bell size={20} className="text-merchant-muted" />
}

export default function MerchantNotifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const { refresh: refreshUnread } = useUnreadNotifications({ role: 'merchant' })

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const { data } = await getMerchantNotifications()
        setNotifications(data.data || [])
      } catch (err) {
        console.error('Failed to fetch merchant notifications', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
    const timer = window.setInterval(fetchNotifications, 10000)
    return () => window.clearInterval(timer)
  }, [])

  const openNotification = async (notification) => {
    try {
      if (!notification.is_read) {
        await markMerchantAsRead(notification.id)
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notification.id ? { ...item, is_read: true } : item,
          ),
        )
        refreshUnread()
      }
    } catch (err) {
      console.error(err)
    }

    const path = notification?.data?.path
    if (path) {
      navigate(path)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-merchant-divider bg-merchant-surface px-4 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-merchant-ink-slate hover:bg-merchant-input"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-merchant-ink-slate">Notifications</h1>
        {notifications.some((n) => !n.is_read) ? (
          <button
            type="button"
            onClick={async () => {
              try {
                await markMerchantAllAsRead()
                setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
                refreshUnread()
              } catch (err) {
                console.error(err)
              }
            }}
            className="text-xs font-semibold text-merchant-primary"
          >
            Mark all read
          </button>
        ) : null}
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 lg:px-8">
        {loading ? (
          <BrandedLoader size="md" />
        ) : notifications.length === 0 ? (
          <div className="rounded-merchant-stat border border-merchant-divider bg-merchant-surface px-6 py-12 text-center">
            <Bell size={28} className="mx-auto text-merchant-muted" />
            <p className="mt-4 text-sm font-medium text-merchant-ink-slate">No notifications yet</p>
            <p className="mt-1 text-sm text-merchant-muted">
              Rider arrivals and order updates will appear here.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <button
                  type="button"
                  onClick={() => openNotification(notification)}
                  className={`flex w-full items-start gap-4 rounded-merchant-stat border px-4 py-4 text-left transition-colors ${
                    notification.is_read
                      ? 'border-merchant-divider bg-merchant-surface'
                      : 'border-merchant-primary/20 bg-merchant-nav-active'
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-merchant-input">
                    {getIcon(notification.type, notification.data)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-merchant-ink-slate">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-sm text-merchant-muted">{notification.message}</p>
                    {notification.data?.vehicle_summary ? (
                      <p className="mt-2 text-xs font-medium text-merchant-body">
                        {notification.data.vehicle_summary}
                      </p>
                    ) : null}
                  </div>
                  {!notification.is_read ? (
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-merchant-primary" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
