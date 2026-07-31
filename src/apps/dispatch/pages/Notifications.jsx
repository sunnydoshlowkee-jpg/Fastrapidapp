import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, MessageSquare } from 'lucide-react'
import { getRiderNotifications, markRiderAsRead, markRiderAllAsRead } from '../../../services/notificationService'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'
import BrandedLoader from '../../../components/ui/BrandedLoader'

const TABS = ['All', 'Chats', 'Orders', 'Earnings', 'System']

export default function Notifications() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const { refresh: refreshUnread } = useUnreadNotifications({ role: 'rider' })

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await getRiderNotifications()
        setNotifications(res.data?.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
    const timer = window.setInterval(load, 10000)
    return () => window.clearInterval(timer)
  }, [])

  const openNotification = async (n) => {
    try {
      if (!n.is_read) {
        await markRiderAsRead(n.id)
        setNotifications((prev) =>
          prev.map((item) => (item.id === n.id ? { ...item, is_read: true } : item)),
        )
        refreshUnread()
      }
    } catch (e) {
      console.error('Failed to mark read', e)
    }

    const path = n?.data?.path
    if (path) {
      navigate(path)
      return
    }
    if (n.type === 'chat' && n?.data?.delivery_id) {
      navigate(`/dispatch/delivery/${n.data.delivery_id}/chat`)
    }
  }

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'All') return true
    const type = (n.type || '').toLowerCase()
    const title = (n.title || '').toLowerCase()
    if (activeTab === 'Chats') return type === 'chat'
    if (activeTab === 'Orders') return type.includes('order') || title.includes('order') || title.includes('delivery')
    if (activeTab === 'Earnings') {
      return (
        type === 'wallet'
        || type.includes('earning')
        || title.includes('earn')
        || title.includes('payment')
        || title.includes('payout')
        || (n?.data?.kind || '') === 'rider_payout'
      )
    }
    if (activeTab === 'System') return type.includes('system') || title.includes('system') || title.includes('update')
    return true
  })

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-8">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center -ml-2">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="flex-1 text-xl font-black text-gray-900">Notifications</h1>
        {notifications.some((n) => !n.is_read) ? (
          <button
            type="button"
            onClick={async () => {
              try {
                await markRiderAllAsRead()
                setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
                refreshUnread()
              } catch (err) {
                console.error(err)
              }
            }}
            className="text-xs font-bold text-[#5B5BFF]"
          >
            Mark all read
          </button>
        ) : null}
      </div>

      <div className="px-5 mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all"
            style={{
              background: activeTab === tab ? '#5B5BFF' : 'transparent',
              borderColor: activeTab === tab ? '#5B5BFF' : '#E5E7EB',
              color: activeTab === tab ? '#fff' : '#6B7280',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-6">
        {loading ? (
          <BrandedLoader size="md" />
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center text-gray-500 py-10 font-medium text-sm">No new notifications in this tab.</div>
        ) : (
          <div className="flex flex-col gap-5">
            {filteredNotifications.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => openNotification(n)}
                className={`flex gap-4 p-3 rounded-2xl transition-colors cursor-pointer text-left ${
                  !n.is_read ? 'bg-indigo-50/50' : ''
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(91,91,255,0.15)' }}
                >
                  {n.type === 'chat' ? (
                    <MessageSquare size={20} style={{ color: '#5B5BFF' }} />
                  ) : (
                    <Bell size={20} style={{ color: '#5B5BFF' }} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm ${!n.is_read ? 'font-black text-gray-900' : 'font-bold text-gray-700'}`}>
                      {n.title || 'Notification'}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400">
                      {n.created_at ? new Date(n.created_at).toLocaleDateString() : ''}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                    {n.message || 'You have a new message.'}
                  </p>
                </div>
                {!n.is_read ? (
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
