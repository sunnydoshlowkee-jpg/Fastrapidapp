import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ArrowRight, Clock, SlidersHorizontal, Search } from 'lucide-react'

const TABS = ['All', 'Completed', 'Declined', 'Cancelled']

const STATUS_STYLES = {
  COMPLETED: { bg: 'transparent', text: '#22c55e', border: 'none' },
  DECLINED:  { bg: '#ef4444',     text: '#fff',    border: 'none', pill: true },
  CANCELLED: { bg: '#f97316',     text: '#fff',    border: 'none', pill: true },
}

const DELIVERIES = [
  {
    id: 1,
    restaurant: 'Mama Cass Buka',
    category: 'Food',
    orderId: '#KB-88291',
    amount: '₦650',
    status: 'COMPLETED',
    pickup: 'Ikeja City Mall',
    dropoff: 'Opebi, Allen',
    date: 'Oct 24, 2023 • 02:45 PM',
    duration: '22 mins',
    reason: null,
    emoji: '🍛',
  },
  {
    id: 2,
    restaurant: 'Debonairs Pizza',
    category: 'Food',
    orderId: '#KB-88280',
    amount: '₦650',
    status: 'DECLINED',
    pickup: 'Lekki Phase 1',
    dropoff: 'Opebi, Allen',
    date: 'Oct 23, 2023 • 05:45 PM',
    duration: null,
    reason: 'Distance too far',
    emoji: '🍕',
  },
  {
    id: 3,
    restaurant: 'The Burger Joint',
    category: 'Food',
    orderId: '#KB-88270',
    amount: '₦1,200',
    status: 'COMPLETED',
    pickup: 'Victoria Island',
    dropoff: 'Lekki Phase 1',
    date: 'Oct 22, 2023 • 01:15 PM',
    duration: '31 mins',
    reason: null,
    emoji: '🍔',
  },
  {
    id: 4,
    restaurant: 'Fresh Mart Express',
    category: 'Grocery',
    orderId: '#KB-88261',
    amount: '₦850',
    status: 'CANCELLED',
    pickup: 'Yaba Market',
    dropoff: 'Surulere',
    date: 'Oct 21, 2023 • 11:30 AM',
    duration: null,
    reason: 'Customer cancelled',
    emoji: '🛒',
  },
]

export default function Deliveries() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = DELIVERIES.filter(d => {
    const matchTab = activeTab === 'All' || d.status === activeTab.toUpperCase()
    const matchSearch = search === '' ||
      d.restaurant.toLowerCase().includes(search.toLowerCase()) ||
      d.orderId.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">My Deliveries</h1>
        <button onClick={() => navigate('/dispatch/notifications')} className="w-10 h-10 flex items-center justify-center">
          <Bell size={22} className="text-gray-500" />
        </button>
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
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-bold text-gray-700 mb-1">No deliveries found</p>
            <p className="text-sm text-gray-400">Try a different filter or search term</p>
          </div>
        ) : (
          <div>
            {filtered.map((d, i) => {
              const s = STATUS_STYLES[d.status]
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
                        <p className="font-black text-gray-900 text-sm">{d.restaurant}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {d.category} &nbsp;
                          <span style={{ color: '#5B5BFF' }}>{d.orderId}</span>
                        </p>
                      </div>

                      {/* Amount + status */}
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <p className="font-black text-sm" style={{ color: '#22c55e' }}>{d.amount}</p>
                        {s.pill ? (
                          <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ background: s.bg, color: s.text }}>
                            {d.status}
                          </span>
                        ) : (
                          <span className="text-[9px] font-black uppercase tracking-wider"
                            style={{ color: s.text }}>
                            {d.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Route bar */}
                    <div className="rounded-2xl px-4 py-3 flex items-center gap-2 mb-3"
                      style={{ background: '#F0F0F8' }}>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Pickup</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{d.pickup}</p>
                      </div>
                      <ArrowRight size={16} className="text-gray-400 flex-shrink-0 mx-1" />
                      <div className="flex-1 min-w-0 text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Dropoff</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{d.dropoff}</p>
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
