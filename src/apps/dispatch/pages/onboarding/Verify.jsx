import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { verifyEmailOtp, verifyPhoneOtp, requestEmailOtp, requestPhoneOtp } from '../../../../services/riderAuthService'

const OTP_LENGTH = 6

export default function RiderVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Default fallbacks in case of direct navigation
  const method = location.state?.method || 'email'
  const email = location.state?.email || ''
  const phone = location.state?.phone || ''
  
  const displayTarget = method === 'email' ? email : `+234 ${phone}`

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(45)
  const [canResend, setCanResend] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [error, setError] = useState('')
  const inputsRef = useRef([])

  // Redirect back if no state
  useEffect(() => {
    if (!email && !phone) {
      navigate('/dispatch/onboarding/phone')
    }
  }, [email, phone, navigate])

  // Countdown timer
  useEffect(() => {
    if (!email) {
      navigate('/dispatch/onboarding/personal', { replace: true })
    }
  }, [email, navigate])

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true)
      return
    }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer])

  const submitCode = async (otpDigits) => {
    const otp = otpDigits.join('')
    if (otp.length !== OTP_LENGTH) return

    setLoading(true)
    setError('')

    try {
      await verifyRegistrationEmail({ email, code: otp })
      navigate('/dispatch/onboarding/identity')
    } catch (err) {
      setError(getApiFieldError(err, 'code') || 'Invalid verification code.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return
    const next = [...code]
    next[idx] = val
    setOtp(next)
    setError('')
    
    if (val && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus()
    if (val && idx === OTP_LENGTH - 1) {
      verifyCode([...next])
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const verifyCode = async (digits = otp) => {
    const code = digits.join('')
    if (code.length < OTP_LENGTH) return
    
    setVerifying(true)
    setError('')
    
    try {
      if (method === 'email') {
        await verifyEmailOtp(email, code)
      } else {
        await verifyPhoneOtp(phone, code)
      }
      
      // Verification successful, move to personal info
      navigate('/dispatch/onboarding/personal', {
        state: { method, email, phone }
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code. Please try again.')
      setOtp(Array(OTP_LENGTH).fill(''))
      setTimeout(() => inputsRef.current[0]?.focus(), 50)
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) return
    
    setSendingOtp(true)
    setError('')
    
    try {
      if (method === 'email') {
        await requestEmailOtp(email)
      } else {
        await requestPhoneOtp(phone)
      }
      
      setOtp(Array(OTP_LENGTH).fill(''))
      setTimer(45)
      setCanResend(false)
      inputsRef.current[0]?.focus()
    } catch (err) {
      setError('Failed to resend code. Please try again.')
    } finally {
      setSendingOtp(false)
    }
  }

  const filled = otp.filter(Boolean).length

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
      <div className="mb-10">
        <h1 className="text-[28px] font-black text-gray-900 leading-tight mb-3">
          Verify Your {method === 'email' ? 'Email' : 'Phone'}
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          We've sent a {OTP_LENGTH}-digit code to{' '}
          <span className="text-gray-900 font-semibold">{displayTarget}</span>.{' '}
          <button
            onClick={() => navigate(-1)}
            className="font-bold"
            style={{ color: '#5B5BFF' }}
          >
            Edit
          </button>
        </p>
        {import.meta.env.DEV && debugOtp && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Dev code: <strong>{debugOtp}</strong>
          </p>
        )}
      </div>

      {/* OTP boxes */}
      <div className="flex gap-2 justify-center mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e.target.value, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            className="w-12 h-12 text-center text-xl font-bold text-gray-900 rounded-2xl border-2 transition-colors focus:outline-none shadow-sm"
            style={{
              borderColor: error ? '#EF4444' : digit ? '#5B5BFF' : '#E5E7EB',
              background: error ? '#FFF5F5' : digit ? 'rgba(91,91,255,0.04)' : '#F9FAFB',
            }}
            inputMode="numeric"
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mb-4 justify-center">
          <AlertCircle size={13} className="text-red-500" />
          <p className="text-xs font-medium text-red-500">{error}</p>
        </div>
      )}

      {/* Resend */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-sm">
          Didn't get a code?{' '}
          <button
            onClick={handleResend}
            disabled={sendingOtp || !canResend}
            className="font-bold"
            style={{ color: canResend && !sendingOtp ? '#5B5BFF' : '#9CA3AF' }}
          >
            {sendingOtp ? 'Sending...' : 'Resend code'}
          </button>
        </p>
      </div>

      <div className="flex-1" />

      <button
        onClick={() => verifyCode()}
        disabled={filled < OTP_LENGTH || verifying}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-4 transition-all active:opacity-80 disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        {verifying && <Loader2 size={18} className="animate-spin" />}
        {verifying ? 'Verifying...' : 'Verify'}
      </button>
    </div>
  )
}
