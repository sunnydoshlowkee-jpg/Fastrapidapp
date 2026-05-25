import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown } from 'lucide-react'

export default function RiderPhone() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  const handleContinue = () => {
    if (phone.trim().length >= 7) {
      navigate('/dispatch/onboarding/verify', { state: { phone } })
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-5 pb-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5B5BFF' }}>
          Step 1 of 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-black text-gray-900 leading-tight mb-2">
        Create your account
      </h1>
      <p className="text-gray-500 text-sm mb-10">
        Enter your phone number to get started
      </p>

      {/* Phone input */}
      <div className="mb-3">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          Phone Number
        </label>
        <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">
          {/* Country code */}
          <button className="flex items-center gap-1 pl-4 pr-3 py-4 border-r border-gray-200 shrink-0">
            <span className="font-bold text-gray-700 text-sm">+234</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {/* Number field */}
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={phone.trim().length < 7}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-4 transition-all active:opacity-80 disabled:opacity-50"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Continue
      </button>

      <p className="text-center text-gray-500 text-sm">
        Already have an account?{' '}
        <button onClick={() => navigate('/dispatch/login')} className="font-bold" style={{ color: '#5B5BFF' }}>
          Log In
        </button>
      </p>
    </div>
  )
}
