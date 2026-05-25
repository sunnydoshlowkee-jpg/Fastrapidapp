import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Wallet } from 'lucide-react'

export default function DeliverySuccess() {
  const navigate = useNavigate()

  const progress = 8
  const total = 10
  const pct = (progress / total) * 100

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-5 pt-5 pb-10"
      style={{ background: 'linear-gradient(180deg, #F4F4FF 0%, #FAFAFF 100%)' }}>

      {/* Header */}
      <div className="flex items-center mb-10">
        <button onClick={() => navigate('/dispatch')}
          className="w-9 h-9 flex items-center justify-center mr-3">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="text-base font-bold text-gray-900">Transaction Success</p>
      </div>

      {/* Success icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.12)' }}>
            {/* Inner circle */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: '#22c55e' }}>
              {/* Checkmark */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-[26px] font-black text-gray-900 mb-1">
          Delivery Complete! 🎉
        </h1>
        <p className="text-gray-500 text-sm">Great job, Chidi!</p>
      </div>

      {/* Earnings banner */}
      <div className="rounded-2xl px-5 py-4 flex items-center gap-4 mb-4"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Wallet size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-black text-sm">₦650 added to your wallet</p>
          <p className="text-white/70 text-xs mt-0.5">Order #KAB-00421</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl px-4 py-4" style={{ background: '#EBEBF5' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Clock size={12} className="text-gray-400" />
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time Taken</p>
          </div>
          <p className="text-xl font-black text-gray-900">24 mins</p>
        </div>
        <div className="rounded-2xl px-4 py-4" style={{ background: '#EBEBF5' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={12} className="text-gray-400" />
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Distance</p>
          </div>
          <p className="text-xl font-black text-gray-900">4.2 km</p>
        </div>
      </div>

      {/* Daily bonus progress */}
      <div className="rounded-2xl px-5 py-4 mb-8" style={{ background: '#EBEBF5' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-900 text-sm">Daily Bonus Progress</p>
          <p className="font-black text-gray-900 text-sm">{progress} / {total}</p>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-300/60 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
          />
        </div>
        <p className="text-xs text-gray-400">
          Complete {total - progress} more deliveries to earn ₦2,000 bonus!
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/dispatch')}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/dispatch/earnings')}
          className="w-full py-4 rounded-2xl font-bold text-base border-2 transition-opacity active:opacity-80"
          style={{ borderColor: '#5B5BFF', color: '#5B5BFF', background: 'white' }}
        >
          View Earnings
        </button>
      </div>
    </div>
  )
}
