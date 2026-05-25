import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Star, Calendar, BarChart2, Gift, ChevronRight, MapPin, Utensils, ShoppingBasket } from 'lucide-react'

const DELIVERIES = [
  {
    id: 1,
    name: 'Gourmet Burger Kitchen',
    distance: '2.4km',
    eta: 'Pickup in 5 mins',
    amount: '₦1,200',
    icon: <Utensils size={20} className="text-gray-500" />,
    status: 'new',
  },
  {
    id: 2,
    name: 'Fresh Mart Express',
    distance: '0.8km',
    eta: 'On the way',
    amount: '₦850',
    icon: <ShoppingBasket size={20} className="text-gray-500" />,
    status: 'active',
  },
]

export default function RiderDashboard() {
  const navigate = useNavigate()
  const [online, setOnline] = useState(false)

  const toggle = () => setOnline(o => !o)

  return (
    <div className="min-h-screen bg-gray-50 pb-4">

      {/* ── Header ── */}
      <div className="sticky top-0 z-50 bg-gray-50 px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[17px] font-bold" style={{ color: '#5B5BFF' }}>
            Good morning, Chidi 👋
          </p>
        </div>
        <button onClick={() => navigate('/dispatch/notifications')} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Bell size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="px-5 space-y-4">

        {/* ── Online / Offline card ── */}
        <div
          className="rounded-3xl p-5 transition-all duration-500"
          style={{
            background: online
              ? 'linear-gradient(135deg, rgba(91,91,255,0.1) 0%, rgba(91,91,255,0.06) 100%)'
              : 'linear-gradient(135deg, #EEEEF8 0%, #E8E8F2 100%)',
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className={`text-xl font-black mb-1 ${online ? '' : 'text-gray-900'}`}
                style={online ? { color: '#5B5BFF' } : {}}>
                {online ? 'You are ONLINE' : 'You are OFFLINE'}
              </p>
              {online ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                  <span className="text-gray-500 text-sm">Waiting for orders nearby...</span>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Go online to start receiving orders</p>
              )}
            </div>

            {/* Toggle */}
            <button
              onClick={toggle}
              className="relative w-14 h-7 rounded-full transition-all duration-300 flex-shrink-0 mt-0.5 focus:outline-none"
              style={{ background: online ? '#5B5BFF' : '#CBD5E1' }}
            >
              <span
                className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transition-all duration-300"
                style={{ left: online ? '26px' : '3px' }}
              />
            </button>
          </div>

          {/* Zone chip */}
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-xs font-semibold text-gray-600">Yaba Zone • 14 riders active</span>
          </div>
        </div>

        {/* ── Today / Orders / Rating ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'TODAY', value: online ? '₦1,000' : '₦0.00' },
            { label: 'ORDERS', value: '0' },
            { label: 'RATING', value: '4.8', star: true },
          ].map(({ label, value, star }) => (
            <div key={label} className="bg-white rounded-2xl px-4 py-4 shadow-sm">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              <div className="flex items-center gap-1">
                <p className="text-base font-black text-gray-900">{value}</p>
                {star && <Star size={12} fill="#FBBF24" strokeWidth={0} />}
              </div>
            </div>
          ))}
        </div>

        {/* ── Weekly / Monthly ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar size={13} className="text-gray-400" />
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Weekly</p>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">This Week</p>
            <p className="text-base font-black text-gray-900">₦42,500</p>
          </div>
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart2 size={13} className="text-gray-400" />
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Monthly</p>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">This Month</p>
            <p className="text-base font-black text-gray-900">₦168,200</p>
          </div>
        </div>

        {/* ── Weekend Bonus Banner ── */}
        <button className="w-full rounded-2xl px-5 py-4 flex items-center gap-4 text-left transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #F59E0B, #FBBF24)' }}>
          <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
            <Gift size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-black text-white text-sm">Weekend Bonus Active</p>
            <p className="text-white/80 text-xs mt-0.5">Complete 15 deliveries for extra ₦5,000</p>
          </div>
          <ChevronRight size={18} className="text-white/70 flex-shrink-0" />
        </button>

        {/* ── Zone / Heatmap ── */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <p className="text-sm font-black" style={{ color: '#5B5BFF' }}>Current Zone: Yaba</p>
            <button className="text-xs font-bold text-gray-500 uppercase tracking-wider">CHANGE</button>
          </div>
          {/* Map placeholder */}
          <div className="relative mx-3 mb-3 rounded-2xl overflow-hidden" style={{ height: '110px', background: 'linear-gradient(135deg, #1a1a3e, #0d0d1f)' }}>
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 110">
              {[0,1,2,3,4,5].map(i => (
                <line key={`h${i}`} x1="0" y1={i*22} x2="300" y2={i*22} stroke="#5B5BFF" strokeWidth="0.5"/>
              ))}
              {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                <line key={`v${i}`} x1={i*30} y1="0" x2={i*30} y2="110" stroke="#5B5BFF" strokeWidth="0.5"/>
              ))}
              {/* Zone highlight */}
              <circle cx="150" cy="55" r="30" fill="rgba(91,91,255,0.15)" stroke="rgba(91,91,255,0.4)" strokeWidth="1"/>
              <circle cx="150" cy="55" r="4" fill="#5B5BFF"/>
            </svg>
            {/* Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-gray-900/80 backdrop-blur-sm text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-2">
                <MapPin size={14} />
                View Heatmap
              </button>
            </div>
          </div>
        </div>

        {/* ── Active Deliveries ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-base" style={{ color: '#5B5BFF' }}>Active Deliveries</p>
            <button onClick={() => navigate('/dispatch/deliveries')}
              className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              VIEW ALL
            </button>
          </div>

          <div className="space-y-3">
            {DELIVERIES.map(d => (
              <div key={d.id} className="bg-white rounded-2xl px-4 py-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      {d.icon}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{d.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{d.distance} • {d.eta}</p>
                    </div>
                  </div>
                  <p className="font-black text-gray-900 text-sm">{d.amount}</p>
                </div>

                {d.status === 'new' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/dispatch/delivery/${d.id}`)}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity active:opacity-80"
                      style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
                      Accept Task
                    </button>
                    <button className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold">
                      Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
