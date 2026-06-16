import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'
import { requestPhoneOtp } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const COUNTRY = 'NG'

export default function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setPhoneError('')

    if (!phone.trim()) {
      setPhoneError('Phone number is required.')
      return
    }

    setLoading(true)
    try {
      const { data } = await requestPhoneOtp({
        country: COUNTRY,
        phone,
        flow: 'login',
      })
      const payload = data?.data ?? data
      navigate('/auth/verify', {
        state: {
          phone: payload?.phone ?? phone,
          phoneE164: payload?.phone_e164,
          flow: 'login',
        },
      })
    } catch (err) {
      setPhoneError(getApiFieldError(err, 'phone'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      <div className="flex justify-center pt-12 pb-8">
        <Logo variant="full" height={24} />
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pt-4">
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 text-base mb-12">
          Log in to continue your journey.
        </p>

        <div className="mb-8">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <div
            className={`flex items-center bg-[#F4F5F7] rounded-2xl p-5 border-2 transition-colors ${
              phoneError
                ? 'border-red-500 bg-red-50/30'
                : 'border-transparent focus-within:border-[#4F46E5]'
            }`}
          >
            <div className="flex items-center gap-2 mr-3 shrink-0">
              <div className="w-5 h-3.5 bg-white flex overflow-hidden rounded-[2px] shadow-sm">
                <div className="w-1/3 h-full bg-green-600" />
                <div className="w-1/3 h-full bg-white" />
                <div className="w-1/3 h-full bg-green-600" />
              </div>
              <span className="text-gray-900 text-base">+234</span>
            </div>
            <div className="w-px h-6 bg-gray-300 mr-4" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (phoneError) setPhoneError('')
              }}
              placeholder="000 000 0000"
              aria-invalid={phoneError ? 'true' : 'false'}
              aria-describedby={phoneError ? 'login-phone-error' : undefined}
              className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
            />
          </div>
          {phoneError ? (
            <p id="login-phone-error" className="mt-2 text-sm font-medium text-red-600" role="alert">
              {phoneError}
            </p>
          ) : null}
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">
          <Link to="/auth/login/email" className="text-[#4F46E5] font-semibold">
            Use email instead
          </Link>
        </p>

        <button 
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#4F46E5] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700 mb-8"
        >
          {loading ? 'Please wait…' : 'Log In'}
        </button>

        <p className="text-center text-base text-gray-600 mb-8">
          Don&apos;t have an account?{' '}
          <Link to="/onboarding/phone" className="text-[#4F46E5] font-semibold">Sign Up</Link>
        </p>

      </div>
    </div>
  )
}
