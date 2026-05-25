import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

export default function VerifyIdentity() {
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
      const nextInput = document.getElementById(`verify-otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <div className="flex-1 flex flex-col items-center px-6 max-w-md mx-auto w-full pt-16">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center w-full">Verify Your Identity</h1>
        <p className="text-gray-600 text-base text-center mb-10 px-4">
          We've sent a 4-digit code to <br className="hidden md:block"/> +234 089 7373 093. <button onClick={() => navigate(-1)} className="text-[#4F46E5] font-semibold">Edit</button>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-4 justify-center mb-6 w-full">
          {code.map((digit, idx) => (
            <input
              key={idx}
              id={`verify-otp-${idx}`}
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

        <div className="mt-auto w-full pb-8">
          <button 
            onClick={() => navigate('/app')} 
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-semibold text-base uppercase tracking-wider shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}
