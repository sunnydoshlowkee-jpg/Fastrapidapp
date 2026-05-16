import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../../../../components/brand/Logo'
import DesktopNav from '../../../../components/onboarding/DesktopNav'
import DesktopFooter from '../../../../components/onboarding/DesktopFooter'

function PhoneField({ value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
      <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1A1AF5] transition-colors">
        <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50">
          <span className="text-base">🇳🇬</span>
          <span className="text-sm font-medium text-gray-700">+234</span>
        </div>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
          placeholder="000 000 0000"
          maxLength={10}
          className="flex-1 px-3 py-3.5 text-sm outline-none bg-white text-gray-900 placeholder:text-gray-300"
        />
      </div>
    </div>
  )
}

export default function Login() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[520px]">
          <div className="p-5 pb-0 relative">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ArrowLeft size={18} className="text-gray-700" />
            </button>
            <p className="text-center text-sm font-semibold text-gray-700 -mt-7">Log In</p>
          </div>
          <div className="px-6 pb-8 pt-6 flex flex-col flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm mb-8">Log in to continue your journey.</p>
            <div className="flex-1">
              <PhoneField value={phone} onChange={setPhone} />
            </div>
            <div className="mt-8">
              <button disabled={phone.length < 7} onClick={() => navigate('/auth/verify')}
                className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >Log In</button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <Link to="/onboarding/account-type" className="text-[#1A1AF5] font-semibold">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col min-h-screen bg-gray-50">
        <DesktopNav />
        <div className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-10">
            {/* Logo in card */}
            <div className="flex justify-center mb-6">
              <Logo height={24} />
            </div>
            <p className="text-center text-sm text-gray-500 mb-8">Login to your account to continue</p>

            <div className="mb-6">
              <PhoneField value={phone} onChange={setPhone} />
            </div>

            <button disabled={phone.length < 7} onClick={() => navigate('/auth/verify')}
              className="w-full bg-[#1A1AF5] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 mb-4"
            >Login →</button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/onboarding/account-type" className="text-[#1A1AF5] font-semibold">Create account</Link>
            </p>
          </div>
        </div>
        <DesktopFooter />
      </div>
    </>
  )
}
