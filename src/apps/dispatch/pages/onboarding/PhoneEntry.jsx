import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Mail, Phone, Loader2, AlertCircle } from 'lucide-react'
import { requestEmailOtp, requestPhoneOtp } from '../../../../services/riderAuthService'

export default function RiderSignUp() {
  const navigate = useNavigate()
  const [method, setMethod] = useState('email') // 'email' or 'phone'
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    setError('')
    if (method === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.')
    } else {
      if (phone.trim().length < 10) return setError('Enter a valid phone number.')
    }
    if (password.length < 8) return setError('Password must be at least 8 characters.')

    setLoading(true)
    try {
      if (method === 'email') {
        await requestEmailOtp(email)
      } else {
        await requestPhoneOtp(phone) // Assumes +234 is handled or we just send local for now
      }
      
      // Save password to session to use later in Payment step (final registration)
      sessionStorage.setItem('rider_reg_password', password)
      
      navigate('/dispatch/onboarding/verify', { 
        state: { method, email, phone } 
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request verification code.')
    } finally {
      setLoading(false)
    }
  }

  const isValid = method === 'email' 
    ? email.includes('@') && password.length >= 8 
    : phone.length >= 10 && password.length >= 8

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-5 pb-8">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-black text-gray-900 leading-tight mb-2">
        Create your account
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Choose how you want to sign up
      </p>

      {/* Tabs */}
      <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
        <button
          onClick={() => { setMethod('email'); setError(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            method === 'email' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
        >
          <Mail size={16} />
          Email
        </button>
        <button
          onClick={() => { setMethod('phone'); setError(''); }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            method === 'phone' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
          }`}
        >
          <Phone size={16} />
          Phone
        </button>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        {method === 'email' ? (
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-900 font-medium placeholder-gray-400 focus:outline-none"
            />
          </div>
        ) : (
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <div className="flex items-center bg-gray-100 rounded-2xl overflow-hidden">
              <button className="flex items-center gap-1 pl-4 pr-3 py-4 border-r border-gray-200 shrink-0">
                <span className="font-bold text-gray-700 text-sm">+234</span>
                <ChevronDown size={14} className="text-gray-400" />
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
        )}

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Password (Min 8 chars)
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-base text-gray-900 font-medium placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-4">
          <AlertCircle size={13} className="text-red-500 shrink-0" />
          <p className="text-xs font-medium text-red-500">{error}</p>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1 min-h-[40px]" />

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!isValid || loading}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-4 transition-all active:opacity-80 disabled:opacity-50 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        {loading && <Loader2 size={18} className="animate-spin" />}
        {loading ? 'Sending code...' : 'Continue'}
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
