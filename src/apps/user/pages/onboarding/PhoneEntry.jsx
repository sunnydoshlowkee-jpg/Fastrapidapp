import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import OnboardingShell from '../../../../components/onboarding/OnboardingShell'

export default function PhoneEntry() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1">Create your account</h1>
      <p className="text-gray-500 text-sm mb-8">Enter your phone number to get started</p>

      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Phone Number
        </label>
        <div className="flex items-center gap-2 border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1A1AF5] transition-colors">
          <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50">
            {/* Nigeria flag */}
            <span className="text-base">🇳🇬</span>
            <span className="text-sm font-medium text-gray-700">+234</span>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            placeholder="000 000 0000"
            maxLength={10}
            className="flex-1 px-3 py-3.5 text-sm outline-none bg-white text-gray-900 placeholder:text-gray-300"
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          disabled={phone.length < 10}
          onClick={() => navigate('/onboarding/otp')}
          className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Continue →
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#1A1AF5] font-semibold">Log In</Link>
        </p>
      </div>
    </OnboardingShell>
  )
}
