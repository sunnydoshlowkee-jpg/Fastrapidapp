import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock, SlidersHorizontal, Search } from 'lucide-react'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'
import NotificationBellButton from '../../../components/notifications/NotificationBellButton'

const TABS = ['All', 'Completed', 'Declined', 'Cancelled']

const STATUS_STYLES = {
  COMPLETED: { bg: 'transparent', text: '#22c55e', border: 'none' },
  DELIVERED: { bg: 'transparent', text: '#22c55e', border: 'none' },
  DECLINED:  { bg: '#ef4444',     text: '#fff',    border: 'none', pill: true },
  CANCELLED: { bg: '#f97316',     text: '#fff',    border: 'none', pill: true },
}

export default function Deliveries() {
  const navigate = useNavigate()
  const { deliveries, loading, error, refresh } = useRiderDeliveries()
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const { unread } = useUnreadNotifications({
    role: 'rider',
    enabled: Boolean(localStorage.getItem('rider_token') || localStorage.getItem('rapid_token')),
  })

  useEffect(() => {
    refresh()
  }, [refresh])

  const safeDeliveries = Array.isArray(deliveries) ? deliveries : []

  const filtered = safeDeliveries.filter(d => {
    const dStatus = (d.status || '').toLowerCase()
    const tStatus = activeTab.toLowerCase()
    const matchTab = activeTab === 'All' || dStatus === tStatus || (tStatus === 'completed' && dStatus === 'delivered')
    const matchSearch = search === '' ||
      (d.restaurant || d.merchant_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.orderId || String(d.id)).toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">My Deliveries</h1>
        <NotificationBellButton
          onClick={() => navigate('/dispatch/notifications')}
          count={unread}
          className="w-10 h-10"
          iconSize={22}
        />
      </div>

      {/* Filter tabs */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {TABS.map(tab => (
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

      {/* Search bar */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search past orders..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <SlidersHorizontal size={16} className="text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Delivery list */}
      <div className="px-5">
        {loading && <p className="text-center py-10 text-gray-500">Loading deliveries...</p>}
        {error && <p className="text-center py-10 text-red-500">{error}</p>}
        {!loading && !error && filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-bold text-gray-700 mb-1">No deliveries found</p>
            <p className="text-sm text-gray-400">Try a different filter or search term</p>
          </div>
        ) : (
          <div>
            {filtered.map((d, i) => {
              const s = STATUS_STYLES[(d.status || '').toUpperCase()]
              return (
                <div key={d.id}>
                  <div className="py-4">
                    {/* Row 1: avatar + restaurant + amount + status */}
                    <div className="flex items-start gap-3 mb-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center text-2xl"
                        style={{ background: '#1a1a2e' }}>
                        {d.emoji}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-gray-900 text-sm">{d.restaurant || d.merchant_name || 'Delivery'}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {d.category || 'Order'} &nbsp;
                          <span style={{ color: '#5B5BFF' }}>{d.orderId || `#${d.id}`}</span>
                        </p>
                      </div>

                      {/* Amount + status */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <p className="font-black text-sm" style={{ color: '#22c55e' }}>{d.amount || `₦${d.delivery_fee || 0}`}</p>
                        {s && s.pill ? (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ background: s.bg, color: s.text }}>
                            {d.status}
                          </span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider"
                            style={{ color: s?.text || '#666' }}>
                            {d.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Route bar */}
                    <div className="rounded-2xl px-4 py-3 flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-200 transition-colors"
                      style={{ background: '#F0F0F8' }}
                      onClick={() => navigate(`/dispatch/delivery/${d.id}`)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Pickup</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{d.pickup || 'Merchant'}</p>
                      </div>
                      <ArrowRight size={16} className="text-gray-400 flex-shrink-0 mx-1" />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Dropoff</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{d.dropoff || 'Customer'}</p>
                      </div>
                    </div>

                    {/* Date + duration/reason */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">{d.date}</p>
                      {d.duration && (
                        <div className="flex items-center gap-1">
                          <Clock size={11} className="text-gray-400" />
                          <span className="text-xs text-gray-400">{d.duration}</span>
                        </div>
                      )}
                      {d.reason && (
                        <p className="text-xs text-gray-400 italic">{d.reason}</p>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  {i < filtered.length - 1 && (
                    <div className="h-px bg-gray-100" />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
