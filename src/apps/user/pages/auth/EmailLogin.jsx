import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'
import { requestEmailOtp } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const inputWrapperClass = (hasError) =>
  `bg-[#F4F5F7] rounded-2xl p-5 border-2 transition-colors ${
    hasError
      ? 'border-red-500 bg-red-50/30'
      : 'border-transparent focus-within:border-[#4F46E5]'
  }`

export default function EmailLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleContinue = async () => {
    setEmailError('')

    if (!email.trim()) {
      setEmailError('Email is required.')
      return
    }

    setLoading(true)
    try {
      const { data } = await requestEmailOtp({ email: email.trim() })
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
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-center pt-12 pb-8">
        <Logo variant="full" height={24} />
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pt-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 text-base mb-12">
          We&apos;ll send a login code to your email.
        </p>

        <div className="mb-8">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className={inputWrapperClass(emailError)}>
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
              className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
            />
          </div>
          {emailError ? (
            <p className="mt-2 text-sm font-medium text-red-600" role="alert">
              {emailError}
            </p>
          ) : null}
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">
          <Link to="/auth/login" className="text-[#4F46E5] font-semibold">
            Use phone instead
          </Link>
        </p>

        <button
          type="button"
          onClick={handleContinue}
          disabled={loading}
          className="w-full bg-[#4F46E5] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700 mb-8"
        >
          {loading ? 'Please wait…' : 'Continue'}
        </button>

        <p className="text-center text-base text-gray-600 mb-8">
          Don&apos;t have an account?{' '}
          <Link to="/onboarding/email" className="text-[#4F46E5] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
