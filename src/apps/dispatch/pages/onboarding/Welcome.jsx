import { useNavigate } from 'react-router-dom'
import { Clock, CreditCard } from 'lucide-react'

export default function RiderWelcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-12 pb-10">

      {/* Logo icon */}
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: 'linear-gradient(135deg, #5B5BFF, #4040E8)' }}>
          <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
            <path d="M10 8h16a10 10 0 0 1 0 20H18l12 12" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 8v32" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Hero text */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-black text-gray-900 leading-tight mb-2">
          Become a Rapid Rider
        </h1>
        <p className="text-gray-500 text-base">
          Earn on your own schedule. Get paid fast.
        </p>
      </div>

      {/* Hero image */}
      <div className="rounded-3xl overflow-hidden mb-8 flex-shrink-0" style={{ height: '220px', background: '#1a1a2e' }}>
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
          {/* Stylised dark background with rider silhouette */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #111128 100%)' }} />
          {/* Road glow */}
          <div className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to top, rgba(91,91,255,0.15), transparent)' }} />
          {/* Rider icon placeholder */}
          <div className="relative z-10 flex flex-col items-center">
            <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
              {/* Scooter body */}
              <ellipse cx="70" cy="70" rx="50" ry="6" fill="rgba(91,91,255,0.2)"/>
              <rect x="35" y="45" width="70" height="22" rx="10" fill="#3535AA"/>
              {/* Wheels */}
              <circle cx="42" cy="68" r="10" fill="#222" stroke="#4040E8" strokeWidth="3"/>
              <circle cx="98" cy="68" r="10" fill="#222" stroke="#4040E8" strokeWidth="3"/>
              {/* Delivery box */}
              <rect x="80" y="28" width="28" height="24" rx="4" fill="#4040E8"/>
              <line x1="94" y1="28" x2="94" y2="52" stroke="#6666FF" strokeWidth="1.5"/>
              {/* Rider */}
              <circle cx="65" cy="28" r="9" fill="#555"/>
              <rect x="56" y="37" width="18" height="14" rx="4" fill="#666"/>
              {/* Handlebar */}
              <rect x="96" y="42" width="12" height="3" rx="1.5" fill="#888"/>
            </svg>
          </div>
          {/* Speed lines */}
          {[0,1,2].map(i => (
            <div key={i} className="absolute left-4 rounded-full opacity-20"
              style={{ top: `${30 + i * 16}px`, width: `${20 + i * 10}px`, height: '2px', background: '#5B5BFF' }} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/dispatch/onboarding/phone')}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-4 transition-opacity active:opacity-80"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Create Rider Account
      </button>

      <p className="text-center text-gray-500 text-sm mb-8">
        Already a rider?{' '}
        <button onClick={() => navigate('/dispatch/login')} className="font-bold" style={{ color: '#5B5BFF' }}>
          Login
        </button>
      </p>

      {/* Feature cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-2xl p-4">
          <Clock size={22} className="mb-2" style={{ color: '#F59E0B' }} />
          <p className="font-bold text-gray-900 text-sm">Flex Hours</p>
          <p className="text-gray-500 text-xs mt-0.5">Work when you want</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4">
          <CreditCard size={22} className="mb-2" style={{ color: '#5B5BFF' }} />
          <p className="font-bold text-gray-900 text-sm">Instant Pay</p>
          <p className="text-gray-500 text-xs mt-0.5">Daily cash outs</p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-gray-400 text-[10px] font-bold tracking-widest uppercase mt-auto">
        Powered by Rapid Logistics
      </p>
    </div>
  )
}
