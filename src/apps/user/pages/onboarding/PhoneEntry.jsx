import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../../../components/layout/AuthLayout'

export default function PhoneEntry() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  return (
    <AuthLayout 
      illustration="/welcome-hero.png" 
      showBackButton={true} 
      backTo="/onboarding/account-type"
    >
      <div className="flex-1 flex flex-col pt-4">
        
        <h1 className="text-3xl font-extrabold text-[#111827] mb-2 tracking-tight">Create your account</h1>
        <p className="text-[#4B5563] text-[16px] mb-10">
          Enter your phone number to get started
        </p>

        {/* Input Group */}
        <div className="mb-auto">
          <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <div className="flex items-center bg-[#F3F4F6] rounded-2xl p-5 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm">
            <span className="text-[#374151] font-semibold text-[16px] mr-3">+234</span>
            <div className="w-px h-6 bg-[#D1D5DB] mr-4" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="000 000 0000"
              className="bg-transparent text-[#111827] outline-none text-[16px] font-medium w-full placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <button 
          onClick={() => navigate('/onboarding/otp')} 
          className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 mt-8 rounded-xl font-bold text-[16px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6"
        >
          Continue
        </button>

        <p className="text-center text-[15px] text-[#4B5563] mb-8">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#4342FF] font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
