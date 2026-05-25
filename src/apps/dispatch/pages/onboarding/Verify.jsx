import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const OTP_LENGTH = 4

export default function RiderVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const phone = location.state?.phone || '089 7373 093'

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(45)
  const [canResend, setCanResend] = useState(false)
  const inputsRef = useRef([])

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return }
    const id = setTimeout(() => setTimer(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timer])

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus()
    // Auto-submit when last digit entered
    if (val && idx === OTP_LENGTH - 1) {
      setTimeout(() => navigate('/dispatch/onboarding/personal'), 300)
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus()
    }
  }

  const handleResend = () => {
    if (!canResend) return
    setOtp(Array(OTP_LENGTH).fill(''))
    setTimer(45)
    setCanResend(false)
    inputsRef.current[0]?.focus()
  }

  const filled = otp.filter(Boolean).length

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-16 pb-8">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-[28px] font-black text-gray-900 leading-tight mb-3">
          Verify Your Identity
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          We've sent a 4-digit code to{' '}
          <span className="text-gray-900 font-semibold">+234 {phone}</span>.{' '}
          <button
            onClick={() => navigate(-1)}
            className="font-bold"
            style={{ color: '#5B5BFF' }}
          >
            Edit
          </button>
        </p>
      </div>

      {/* OTP boxes */}
      <div className="flex gap-4 mb-6">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => (inputsRef.current[i] = el)}
            type="tel"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e.target.value, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            className="flex-1 h-[64px] text-center text-2xl font-bold text-gray-900 rounded-2xl border-2 transition-colors focus:outline-none"
            style={{
              borderColor: digit ? '#5B5BFF' : '#E5E7EB',
              background: digit ? 'rgba(91,91,255,0.04)' : '#F9FAFB',
            }}
            inputMode="numeric"
          />
        ))}
      </div>

      {/* Resend */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-sm">
          Didn't get a code?{' '}
          <button
            onClick={handleResend}
            className="font-bold"
            style={{ color: canResend ? '#5B5BFF' : '#9CA3AF' }}
          >
            Resend link
          </button>
        </p>
        {!canResend && (
          <p className="text-gray-400 text-xs mt-1">
            Resend code in 0:{timer.toString().padStart(2, '0')}
          </p>
        )}
      </div>

      <div className="flex-1" />

      {/* Verify button */}
      <button
        onClick={() => navigate('/dispatch/onboarding/personal')}
        disabled={filled < OTP_LENGTH}
        className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-widest uppercase mb-4 transition-all active:opacity-80 disabled:opacity-40"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Verify
      </button>
    </div>
  )
}
