import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import AuthLayout from '../../../../components/layout/AuthLayout'

export default function OtpVerify() {
  const navigate = useNavigate()
  const [code, setCode] = useState(['4', '8', '', ''])
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [timer])

  const handleInput = (index, value) => {
    if (value.length > 1) return // only 1 char
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <AuthLayout 
      illustration="/welcome-hero.png" 
      showBackButton={true} 
      backTo="/onboarding/phone"
    >
      <div className="flex-1 flex flex-col items-center pt-2">
        
        {/* Icon */}
        <div className="relative mb-8 mt-4">
          <div className="w-28 h-28 bg-[#4342FF] rounded-[2rem] flex items-center justify-center shadow-lg shadow-indigo-200">
            <Mail size={40} className="text-white" strokeWidth={1.5} />
          </div>
          {/* Small floating icon */}
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center">
            <Mail size={16} className="text-[#4342FF]" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#111827] mb-3 tracking-tight">Check your phone</h1>
        <p className="text-[#6B7280] text-[16px] text-center mb-10 px-4">
          We've sent a 4-digit code to<br/>
          <span className="text-[#111827] font-semibold">+234 803 123 4567</span>{' '}
          <button onClick={() => navigate(-1)} className="text-[#4342FF] font-bold hover:underline">Edit</button>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-4 justify-center mb-6 w-full">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              className={`w-16 h-16 text-center text-2xl font-bold rounded-2xl outline-none transition-all shadow-sm ${
                digit 
                  ? 'border-2 border-[#4342FF] bg-indigo-50/50 text-[#111827]' 
                  : 'bg-[#F3F4F6] border-2 border-transparent focus:border-[#4342FF] focus:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Resend actions */}
        <div className="text-center mb-12">
          <p className="text-[14px] text-[#6B7280] mb-2">
            Didn't get a code? <button className="text-[#4342FF] font-bold hover:underline">Resend link</button>
          </p>
          <p className="text-[13px] text-[#9CA3AF] font-medium">
            Resend code in 0:{timer.toString().padStart(2, '0')}
          </p>
        </div>

        <button 
          onClick={() => navigate('/onboarding/profile')} 
          className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 rounded-xl font-bold text-[16px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6"
        >
          Verify
        </button>
      </div>
    </AuthLayout>
  )
}
