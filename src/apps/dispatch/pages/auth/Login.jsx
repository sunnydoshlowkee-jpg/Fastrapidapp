import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import Logo from '../../../../components/brand/Logo'
import { login, persistRiderSession, extractRiderSession, refreshRiderSession } from '../../../../services/riderAuthService'

export default function RiderLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    setLoading(true)
    setError('')
    try {
      const response = await login({ email, password })
      const session = extractRiderSession(response)
      persistRiderSession(session)

      const profile = await refreshRiderSession()
      const isApproved = profile?.rider?.status === 'approved'
      navigate(isApproved ? '/dispatch' : '/dispatch/pending')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="min-h-screen bg-white flex flex-col items-center max-w-md mx-auto px-6 pt-16 pb-10">

      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-10">
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

      {/* Error message */}
      {error && (
        <div className="w-full bg-red-50 text-red-600 rounded-2xl p-4 mb-6 text-sm font-semibold">
          {error}
        </div>
      )}

      {/* Email input */}
      <div className="w-full mb-5">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          Email Address
        </label>
        <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden px-4">
          <Mail size={18} className="text-gray-400 mr-2 shrink-0" />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="rider@example.com"
            className="flex-1 bg-transparent py-4 text-sm text-gray-900 font-medium placeholder-gray-400 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Password input */}
      <div className="w-full mb-8">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          Password
        </label>
        <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden px-4">
          <Lock size={18} className="text-gray-400 mr-2 shrink-0" />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="flex-1 bg-transparent py-4 text-sm text-gray-900 font-medium placeholder-gray-400 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Log in button */}
      <button
        type="submit"
        disabled={loading || !email.trim() || !password.trim()}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-8 transition-all active:scale-[0.98] disabled:opacity-50"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #3B3BF0)' }}
      >
        {loading ? 'Logging In...' : 'Log In'}
      </button>

      {/* Divider */}
      <div className="w-full flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-xs">Don't have an account?</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Register link */}
      <button
        type="button"
        onClick={() => navigate('/dispatch/welcome')}
        className="font-bold text-base hover:underline"
        style={{ color: '#5B5BFF' }}
      >
        Register as a Rider
      </button>
    </form>
  )
}
