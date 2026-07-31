import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Truck, TrendingUp } from 'lucide-react'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'
import NotificationBellButton from '../../../components/notifications/NotificationBellButton'

const PERIOD_TABS = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'This Week' },
  { id: '30d', label: 'This Month' },
]

export default function Earnings() {
  const navigate = useNavigate()
  const { earnings, loading, refresh } = useRiderEarnings()
  const [period, setPeriod] = useState('7d')
  const { unread } = useUnreadNotifications({
    role: 'rider',
    enabled: Boolean(localStorage.getItem('rider_token') || localStorage.getItem('rapid_token')),
  })

  useEffect(() => {
    refresh(period)
  }, [refresh, period])

  const balance = earnings?.wallet?.balance || 0
  const recentEarnings = earnings?.earnings?.recent || []
  const totalDeliveries = earnings?.earnings?.deliveries || 0
  const periodTotal = earnings?.earnings?.total || 0
  const lifetimeTotal = earnings?.earnings?.lifetime_total ?? periodTotal
  const avgTrip = earnings?.earnings?.avg_trip || 0

  const stats = {
    deliveries: totalDeliveries,
    avg: `₦${Math.round(avgTrip).toLocaleString()}`,
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-6">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">My Earnings</h1>
        <NotificationBellButton
          onClick={() => navigate('/dispatch/notifications')}
          count={unread}
          className="w-10 h-10"
          iconSize={22}
        />
      </div>

      <div className="px-5 space-y-4">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #5B5BFF 0%, #3B3BDD 60%, #2929BB 100%)' }}
        >
          <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full opacity-10 bg-white" />
          <div className="absolute bottom-[-40px] left-[-20px] w-40 h-40 rounded-full opacity-5 bg-white" />

          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">
            Wallet Balance
          </p>
          <p className="text-white text-4xl font-black mb-4">
            ₦{loading ? '...' : Number(balance).toLocaleString()}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold">
                Period earned
              </p>
              <p className="text-white/90 font-bold text-sm mt-0.5">
                ₦{loading ? '...' : Number(periodTotal).toLocaleString()}
              </p>
              <p className="text-white/40 text-[10px] mt-1">
                Lifetime ₦{loading ? '...' : Number(lifetimeTotal).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => navigate('/dispatch/earnings/withdraw')}
              className="bg-white text-[#5B5BFF] font-black text-sm px-5 py-2.5 rounded-xl shadow-lg transition-opacity active:opacity-80"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-2xl p-1 flex">
          {PERIOD_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriod(tab.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: period === tab.id ? '#5B5BFF' : 'transparent',
                color: period === tab.id ? '#fff' : '#6B7280',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: '#1a1a2e' }}>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Truck size={14} className="text-white" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Deliveries
            </p>
            <p className="text-2xl font-black text-white">{stats.deliveries}</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: '#1a1a2e' }}>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <TrendingUp size={14} className="text-white" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
              Avg / Trip
            </p>
            <p className="text-2xl font-black text-white">{stats.avg}</p>
          </div>
        </div>

        <div className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Recent Earnings</h2>
            <button
              onClick={() => navigate('/dispatch/earnings/history')}
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {recentEarnings.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No earnings in this period.</p>
            ) : (
              recentEarnings.map((txn, i) => (
                <div
                  key={txn.id || i}
                  className="bg-gray-50 rounded-2xl p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm truncate max-w-[150px]">
                        {txn.description || 'Delivery Payout'}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(txn.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">
                      ₦{Number(txn.amount).toLocaleString()}
                    </p>
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                      {txn.status || 'Paid'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
