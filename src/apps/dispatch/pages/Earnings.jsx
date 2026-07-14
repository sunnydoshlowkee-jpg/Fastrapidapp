import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Truck, TrendingUp, Star, Building2, Clock } from 'lucide-react'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'
import NotificationBellButton from '../../../components/notifications/NotificationBellButton'

const PERIOD_TABS = ['Today', 'This Week', 'This Month']

export default function Earnings() {
  const navigate = useNavigate()
  const { earnings, loading, refresh } = useRiderEarnings()
  const [period, setPeriod] = useState('This Week')
  const { unread } = useUnreadNotifications({
    role: 'rider',
    enabled: Boolean(localStorage.getItem('rider_token') || localStorage.getItem('rapid_token')),
  })

  useEffect(() => {
    refresh()
  }, [refresh])

  const balance = earnings?.wallet?.balance || 0
  const recentEarnings = earnings?.earnings?.recent || []
  const totalDeliveries = earnings?.earnings?.deliveries || 0
  const totalEarnings = earnings?.earnings?.total || 0
  const avgTrip = earnings?.earnings?.avg_trip || 0
  const tierProgress = earnings?.earnings?.tier_progress || 82
  
  // Create dynamic stats based on backend response (for now we map the total to all periods for simplicity, but backend could provide period-based stats)
  const stats = { 
    deliveries: totalDeliveries, 
    avg: `₦${Math.round(avgTrip).toLocaleString()}` 
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-6">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">My Earnings</h1>
        <NotificationBellButton
          onClick={() => navigate('/dispatch/notifications')}
          count={unread}
          className="w-10 h-10"
          iconSize={22}
        />
      </div>

      <div className="px-5 space-y-4">

        {/* ── Balance card ── */}
        <div className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #5B5BFF 0%, #3B3BDD 60%, #2929BB 100%)' }}>
          {/* Subtle circle decor */}
          <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full opacity-10 bg-white" />
          <div className="absolute bottom-[-40px] left-[-20px] w-40 h-40 rounded-full opacity-5 bg-white" />

          {/* Card icon */}
          <div className="absolute top-4 right-4 w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="3" stroke="white" strokeWidth="1.8"/>
              <path d="M2 10h20" stroke="white" strokeWidth="1.8"/>
              <rect x="5" y="14" width="4" height="2" rx="1" fill="white"/>
            </svg>
          </div>

          <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Total Balance</p>
          <p className="text-white text-4xl font-black mb-4">
            ₦{loading ? '...' : balance.toLocaleString()}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[9px] uppercase tracking-widest font-bold">Total Earned</p>
              <p className="text-white/90 font-bold text-sm mt-0.5">
                ₦{loading ? '...' : totalEarnings.toLocaleString()}
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

        {/* ── Period toggle ── */}
        <div className="bg-gray-100 rounded-2xl p-1 flex">
          {PERIOD_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setPeriod(tab)}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: period === tab ? '#5B5BFF' : 'transparent',
                color: period === tab ? '#fff' : '#6B7280',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Stats cards ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl p-4" style={{ background: '#1a1a2e' }}>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Truck size={14} className="text-white" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Deliveries</p>
            <p className="text-2xl font-black text-white">{stats.deliveries}</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: '#1a1a2e' }}>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-3">
              <TrendingUp size={14} className="text-white" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg / Trip</p>
            <p className="text-2xl font-black text-white">{stats.avg}</p>
          </div>
        </div>

        {/* ── Tier card ── */}
        <div className="rounded-3xl p-5" style={{ background: '#EEEEF6' }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center">
                <Star size={18} fill="#FBBF24" strokeWidth={0} />
              </div>
              <div>
                <p className="font-black text-gray-900">Silver Rider</p>
                <p className="text-xs text-gray-500">Tier Progress</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-orange-400">Gold is near!</p>
              <p className="font-black text-gray-900 text-sm">18 jobs left</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-gray-300/60 rounded-full overflow-hidden mb-2">
            <div className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${tierProgress}%`,
                background: 'linear-gradient(90deg, #5B5BFF 0%, #FBBF24 100%)',
              }}
            />
          </div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Silver</p>
        </div>

        {/* ── Recent Earnings ── */}
        <div className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Recent Earnings</h2>
            <button onClick={() => navigate('/dispatch/earnings/history')} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">View All</button>
          </div>

          <div className="space-y-3">
            {recentEarnings.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">No recent earnings.</p>
            ) : (
              recentEarnings.map((txn, i) => (
                <div key={txn.id || i} className="bg-gray-50 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{txn.description || 'Delivery Payout'}</p>
                      <p className="text-xs text-gray-400">{new Date(txn.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-sm">₦{Number(txn.amount).toLocaleString()}</p>
                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">{txn.status || 'Paid'}</p>
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
