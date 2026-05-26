import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import CenteredLayout from '../../../../components/layout/CenteredLayout'

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
    <CenteredLayout 
      showBackButton={true} 
      backTo="/onboarding/phone"
    >
      <div className="flex-1 flex flex-col md:items-center pt-2 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none">
        
        {/* Icon */}
        <div className="relative mb-8 mt-4 md:mb-10">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-[#4342FF] rounded-[2rem] flex items-center justify-center shadow-lg shadow-indigo-200">
            <Mail size={40} className="text-white md:w-12 md:h-12" strokeWidth={1.5} />
          </div>
          {/* Small floating icon */}
          <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm border border-gray-50 flex items-center justify-center">
            <Mail size={16} className="text-[#4342FF] md:w-5 md:h-5" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-3 md:mb-4 tracking-tight md:text-center">Check your phone</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] text-center mb-10 md:mb-12 px-4">
          We've sent a 4-digit code to<br className="md:hidden" />
          <span className="text-[#111827] font-semibold md:ml-1">+234 803 123 4567</span>{' '}
          <button onClick={() => navigate(-1)} className="text-[#4342FF] font-bold hover:underline md:ml-2">Edit</button>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-4 justify-center mb-6 md:mb-10 w-full">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleInput(idx, e.target.value)}
              className={`w-16 h-16 md:w-20 md:h-20 text-center text-2xl md:text-3xl font-bold rounded-2xl outline-none transition-all shadow-sm ${
                digit 
                  ? 'border-2 border-[#4342FF] bg-indigo-50/50 text-[#111827]' 
                  : 'bg-[#F3F4F6] border-2 border-transparent focus:border-[#4342FF] focus:bg-white'
              }`}
            />
          ))}
        </div>

        {/* Resend actions */}
        <div className="text-center mb-12 md:mb-14">
          <p className="text-[14px] md:text-[16px] text-[#6B7280] mb-2">
            Didn't get a code? <button className="text-[#4342FF] font-bold hover:underline">Resend link</button>
          </p>
          <p className="text-[13px] md:text-[15px] text-[#9CA3AF] font-medium">
            Resend code in 0:{timer.toString().padStart(2, '0')}
          </p>
        </div>

        <div className="w-full mt-auto md:mt-0">
          <button 
            onClick={() => navigate('/onboarding/profile')} 
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6 md:mb-0"
          >
            Verify
          </button>
        </div>
      </div>
    </CenteredLayout>
  )
}
