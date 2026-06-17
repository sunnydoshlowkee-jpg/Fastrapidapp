import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Mail } from 'lucide-react'
import CenteredLayout from '../../../../components/layout/CenteredLayout'
import { verifyPhoneOtp } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const OTP_LENGTH = 4

function formatPhoneDisplay(phoneE164, nationalPhone) {
  if (phoneE164) {
    const digits = phoneE164.replace(/\D/g, '')
    if (digits.length >= 13 && digits.startsWith('234')) {
      const local = digits.slice(3)
      return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
    }
    return phoneE164
  }
  if (nationalPhone) {
    const local = nationalPhone.replace(/\D/g, '')
    if (local.length === 10) {
      return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`
    }
    return `+234 ${nationalPhone}`
  }
  return ''
}

export default function OtpVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const phoneE164 = location.state?.phoneE164
  const nationalPhone = location.state?.phone
  const flow = location.state?.flow ?? 'register'

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(''))
  const [codeError, setCodeError] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    if (!phoneE164) {
      navigate('/onboarding/phone', { replace: true })
    }
  }, [phoneE164, navigate])

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  const handleInput = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)
    if (codeError) setCodeError('')

    if (digit && index < OTP_LENGTH - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handleVerify = async () => {
    setCodeError('')

    const otp = code.join('')
    if (otp.length === 0) {
      setCodeError('Enter the verification code.')
      return
    }
    if (otp.length < OTP_LENGTH) {
      setCodeError(`Enter the ${OTP_LENGTH}-digit verification code.`)
      return
    }

    if (!phoneE164) {
      navigate('/onboarding/phone', { replace: true })
      return
    }

    setLoading(true)
    try {
      const { data } = await verifyPhoneOtp({ phone_e164: phoneE164, code: otp, flow })
      const token = data?.data?.token
      const user = data?.data?.user

      if (token) {
        localStorage.setItem('rapid_token', token)
      }

      if (user?.status === 'pending_profile') {
        navigate('/onboarding/profile', {
          state: { signupMethod: 'phone', phoneE164, phone: nationalPhone },
        })
        return
      }

      navigate('/app')
    } catch (err) {
      setCodeError(getApiFieldError(err, 'code'))
    } finally {
      setLoading(false)
    }
  }

  const displayPhone = formatPhoneDisplay(phoneE164, nationalPhone)

  return (
    <CenteredLayout 
      showBackButton={true} 
      backTo="/onboarding/phone"
    >
      <div className="flex-1 flex flex-col items-center pt-2 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none">
        
        {/* Icon */}
        <div className="relative mb-8 mt-4 md:mb-10">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-[#4342FF] rounded-[2rem] flex items-center justify-center shadow-lg shadow-indigo-200">
            <Mail size={40} className="text-white md:w-12 md:h-12" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center">
            <Mail size={16} className="text-[#4342FF] md:w-5 md:h-5" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight text-center">Check your phone</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] text-center mb-10 md:mb-12 px-4">
          We've sent a 4-digit code to<br className="md:hidden" />
          <span className="text-[#111827] font-semibold md:ml-1">{displayPhone || 'your number'}</span>{' '}
          <button type="button" onClick={() => navigate('/onboarding/phone')} className="text-[#4342FF] font-bold hover:underline md:ml-2">Edit</button>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-4 justify-center mb-2 md:mb-4 w-full">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              aria-label={`Digit ${idx + 1} of ${OTP_LENGTH}`}
              className={`w-16 h-16 md:w-20 md:h-20 text-center text-2xl md:text-3xl font-bold rounded-2xl outline-none transition-all shadow-sm ${
                codeError
                  ? 'border-2 border-red-500 bg-red-50/30'
                  : digit
                    ? 'border-2 border-[#4342FF] bg-indigo-50/50 text-[#111827]'
                    : 'bg-[#F3F4F6] border-2 border-transparent focus:border-[#4342FF] focus:bg-white'
              }`}
            />
          ))}
        </div>
        {codeError ? (
          <p className="text-center text-sm font-medium text-red-600 mb-8 md:mb-10" role="alert">
            {codeError}
          </p>
        ) : (
          <div className="mb-6 md:mb-10" />
        )}

        {/* Resend actions */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[14px] md:text-[16px] text-[#6B7280] mb-2">
            Didn't get a code? <button type="button" className="text-[#4342FF] font-bold hover:underline">Resend link</button>
          </p>
          <p className="text-[13px] md:text-[15px] text-[#9CA3AF] font-medium">
            Resend code in 0:{timer.toString().padStart(2, '0')}
          </p>
        </div>

        <div className="w-full mt-auto md:mt-0">
          <button 
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6 md:mb-0"
          >
            {loading ? 'Verifying…' : 'Verify'}
          </button>
        </div>
      </div>
    </CenteredLayout>
  )
}
