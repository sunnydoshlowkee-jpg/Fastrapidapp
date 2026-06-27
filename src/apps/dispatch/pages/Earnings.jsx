import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Truck, TrendingUp, Star, Building2, Clock } from 'lucide-react'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'

const PERIOD_TABS = ['Today', 'This Week', 'This Month']

const STATS = {
  Today:      { deliveries: 0,  avg: '₦0' },
  'This Week':{ deliveries: 0, avg: '₦0' },
  'This Month':{ deliveries: 0,avg: '₦0' },
}

export default function Earnings() {
  const navigate = useNavigate()
  const { earnings, loading, refresh } = useRiderEarnings()
  const [period, setPeriod] = useState('This Week')

  useEffect(() => {
    refresh()
  }, [refresh])

  const stats = STATS[period]
  const tierProgress = 72  // % toward Gold
  
  const balance = earnings?.wallet?.balance || 0
  const recentEarnings = earnings?.earnings?.recent || []
  const totalDeliveries = recentEarnings.length || 0
  const totalEarnings = earnings?.earnings?.total || 0

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-6">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">My Earnings</h1>
        <button onClick={() => navigate('/dispatch/notifications')} className="w-10 h-10 flex items-center justify-center">
          <Bell size={22} className="text-gray-500" />
        </button>
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
            <Truck size={18} className="text-gray-400 mb-3" />
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Deliveries</p>
            <p className="text-3xl font-black text-white">{totalDeliveries}</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: '#1a1a2e' }}>
            <TrendingUp size={18} className="text-yellow-400 mb-3" />
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Avg / Trip</p>
            <p className="text-3xl font-black text-white">{stats.avg}</p>
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
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-gray-900">Recent Earnings</p>
            <button onClick={() => navigate('/dispatch/earnings/history')} className="text-xs font-black text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors">VIEW ALL</button>
          </div>

          <div className="flex flex-col gap-3">
            {recentEarnings.length === 0 ? (
              <div className="text-center py-6 text-gray-500 font-medium text-sm">No recent earnings.</div>
            ) : (
              recentEarnings.slice(0, 3).map(p => (
                <div key={p.id} className="bg-gray-50 rounded-2xl px-4 py-4 flex items-center gap-3">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-green-100">
                    <Building2 size={18} style={{ color: '#22c55e' }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm">{new Date(p.created_at).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Delivery Earned</p>
                  </div>

                  {/* Amount + status */}
                  <div className="text-right">
                    <p className="font-black text-gray-900 text-sm">₦{Number(p.amount).toLocaleString()}</p>
                    <p className="text-xs font-bold mt-0.5 text-green-500 capitalize">
                      {p.status}
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
