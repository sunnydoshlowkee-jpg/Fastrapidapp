import { useNavigate } from 'react-router-dom'
import { Clock, CreditCard } from 'lucide-react'
import Logo from '../../../../components/brand/Logo'

export default function RiderWelcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-app pb-10">

      {/* Logo icon */}
      <div className="flex justify-center mb-6">
        <Logo variant="full" height={36} />
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
      <div className="rounded-3xl overflow-hidden mb-8 flex-shrink-0" style={{ height: '220px' }}>
        <img src="/dispatch-hero.png" alt="Rapid Rider" className="w-full h-full object-cover" />
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/dispatch/onboarding/personal')}
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
