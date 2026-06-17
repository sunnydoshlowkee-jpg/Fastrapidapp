import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, ShoppingBag, Gift, Info } from 'lucide-react'
import { getNotifications, markAsRead } from '../../../services/notificationService'

export default function Notifications() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        setLoading(true)
        const { data } = await getNotifications()
        setNotifications(data.data || [])
      } catch (err) {
        console.error('Failed to fetch notifications', err)
      } finally {
        setLoading(false)
      }
    }
    fetchNotifs()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id)
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    } catch (err) {
      console.error(err)
    }
  }

  const getIcon = (type) => {
    if (type === 'order') return <ShoppingBag size={20} className="text-[#4F46E5]" />
    if (type === 'promo') return <Gift size={20} className="text-orange-500" />
    if (type === 'system') return <Info size={20} className="text-blue-500" />
    return <Bell size={20} className="text-gray-500" />
  }

  const getBgColor = (type) => {
    if (type === 'order') return 'bg-indigo-50'
    if (type === 'promo') return 'bg-orange-50'
    if (type === 'system') return 'bg-blue-50'
    return 'bg-gray-50'
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12">
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full transition-colors hover:bg-gray-100">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        </div>
      </div>

      <div className="px-6 w-full max-w-md mx-auto pt-4 flex-1">
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-sm">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bell size={32} className="text-gray-300" />
            </div>
            <h3 className="text-[17px] font-bold text-gray-900 mb-2">No notifications yet</h3>
            <p className="text-[14px] text-gray-500 max-w-[240px]">When you get updates about your orders or promotions, they'll show up here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map(notif => (
              <div 
                key={notif.id} 
                onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                className={`bg-white rounded-2xl p-4 shadow-sm border flex gap-4 cursor-pointer transition-colors ${notif.is_read ? 'border-gray-100 opacity-70' : 'border-[#4F46E5]/20 hover:border-[#4F46E5]/40'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-[14px] ${notif.is_read ? 'font-semibold text-gray-700' : 'font-bold text-gray-900'}`}>{notif.title}</h4>
                    <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">{new Date(notif.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className={`text-[12px] leading-relaxed ${notif.is_read ? 'text-gray-500' : 'text-gray-600'}`}>{notif.message}</p>
                </div>
                {!notif.is_read && (
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0 shadow-sm" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
