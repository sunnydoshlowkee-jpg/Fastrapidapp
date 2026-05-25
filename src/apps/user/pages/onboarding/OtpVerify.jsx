import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'

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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 max-w-md mx-auto w-full pt-4">
        
        {/* Icon */}
        <div className="relative mb-8 mt-4">
          <div className="w-32 h-32 bg-[#4F46E5] rounded-[2.5rem] flex items-center justify-center shadow-lg shadow-indigo-200">
            <Mail size={48} className="text-white" strokeWidth={1.5} />
          </div>
          {/* Small floating icon */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center">
            <Mail size={16} className="text-[#4F46E5]" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Check your phone</h1>
        <p className="text-gray-500 text-base text-center mb-10 px-4">
          We've sent a 4-digit code to<br/>
          <span className="text-gray-900">+234 803 123 4567</span>{' '}
          <button onClick={() => navigate(-1)} className="text-[#4F46E5] font-semibold">Edit</button>
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
              className={`w-16 h-16 text-center text-2xl font-bold rounded-2xl outline-none transition-colors ${
                digit 
                  ? 'border border-[#4F46E5] bg-indigo-50/30 text-gray-900' 
                  : 'bg-[#F4F5F7] border border-transparent focus:border-[#4F46E5]'
              }`}
            />
          ))}
        </div>

        {/* Resend actions */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-2">
            Didn't get a code? <button className="text-[#4F46E5]">Resend link</button>
          </p>
          <p className="text-xs text-gray-400">
            Resend code in 0:{timer.toString().padStart(2, '0')}
          </p>
        </div>

        <button 
          onClick={() => navigate('/onboarding/profile')} 
          className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700"
        >
          Verify
        </button>
      </div>
    </div>
  )
}
