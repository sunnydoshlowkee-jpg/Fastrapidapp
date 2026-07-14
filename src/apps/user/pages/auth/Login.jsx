import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CenteredLayout from '../../../../components/layout/CenteredLayout'
import { requestEmailOtp } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Email is required.')
      return
    }

    setLoading(true)
    try {
      const { data } = await requestEmailOtp({ email: email.trim(), flow: 'login' })
      const payload = data?.data ?? data
      navigate('/auth/verify-email', {
        state: {
          email: payload?.email ?? email.trim().toLowerCase(),
          flow: 'login',
        },
      })
    } catch (err) {
      setEmailError(getApiFieldError(err, 'email'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <CenteredLayout
      showBackButton={true}
      backTo="/onboarding/welcome"
    >
      <div className="flex-1 flex flex-col md:items-center pt-4 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none">

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2 md:mb-4 tracking-tight md:text-center">Welcome back</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] mb-10 md:mb-12 md:text-center">
          Log in to continue your journey.
        </p>

        <div className="w-full md:mb-10">
          <label className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] md:text-[#111827] uppercase tracking-wider mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex items-center bg-[#F3F4F6] rounded-2xl p-4 md:p-5 border-2 transition-all shadow-sm ${
              emailError
                ? 'border-red-500 bg-red-50/30'
                : 'border-transparent focus-within:border-[#4342FF] focus-within:bg-white'
            }`}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby={emailError ? 'login-email-error' : undefined}
              className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full placeholder:text-[#9CA3AF]"
            />
          </div>
          {emailError ? (
            <p id="login-email-error" className="mt-2 text-sm font-medium text-red-600" role="alert">
              {emailError}
            </p>
          ) : null}
          <p className="text-center text-sm text-[#6B7280] mt-4 w-full">
            <Link to="/auth/login/phone" className="text-[#4342FF] font-bold hover:underline">
              Switch to phone number
            </Link>
          </p>
        </div>

        <div className="w-full mt-auto md:mt-0">
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 mt-2 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6"
          >
            {loading ? 'Please wait…' : 'Log In'}
          </button>

          <p className="text-center text-[15px] md:text-[16px] text-[#4B5563] mb-8 md:mb-0">
            Don&apos;t have an account?{' '}
            <Link to="/onboarding/phone" className="text-[#4342FF] font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </CenteredLayout>
  )
}
