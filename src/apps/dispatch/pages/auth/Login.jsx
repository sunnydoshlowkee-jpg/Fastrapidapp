import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import Logo from '../../../../components/brand/Logo'

export default function RiderLogin() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  return (
    <div className="min-h-screen bg-white flex flex-col items-center max-w-md mx-auto px-6 pt-16 pb-10">

      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <Logo variant="icon" height={40} />
        <p className="text-gray-900 text-xl">
          <span className="font-black">Rapid</span>
          <span className="font-light"> Rider</span>
        </p>
      </div>

      {/* Welcome text */}
      <div className="w-full mb-8">
        <h1 className="text-[32px] font-black text-gray-900 leading-tight mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500 text-base">
          Log in to continue your journey.
        </p>
      </div>

      {/* Phone input */}
      <div className="w-full mb-6">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          Phone Number
        </label>
        <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">
          <button className="flex items-center gap-1.5 pl-4 pr-3 py-4 border-r border-gray-200 shrink-0">
            <span className="text-base">🇳🇬</span>
            <span className="font-bold text-gray-700 text-sm">+234</span>
          </button>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            maxLength={11}
            placeholder="000 000 0000"
            className="flex-1 bg-transparent pl-3 pr-4 py-4 text-base text-gray-900 font-medium placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Log in button */}
      <button
        onClick={() => navigate('/dispatch/onboarding/verify', { state: { phone } })}
        disabled={phone.trim().length < 7}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-8 transition-all active:opacity-80 disabled:opacity-50"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #3B3BF0)' }}
      >
        Log In
      </button>

      {/* Divider */}
      <div className="w-full flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs">Don't have an account?</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Register link */}
      <button
        onClick={() => navigate('/dispatch/welcome')}
        className="font-bold text-base"
        style={{ color: '#5B5BFF' }}
      >
        Register as a Rider
      </button>
    </div>
  )
}
