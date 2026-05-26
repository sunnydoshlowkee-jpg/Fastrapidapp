import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CenteredLayout from '../../../../components/layout/CenteredLayout'

export default function PhoneEntry() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  return (
    <CenteredLayout 
      showBackButton={true} 
      backTo="/onboarding/account-type"
    >
      <div className="flex-1 flex flex-col md:items-center pt-4 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2 md:mb-4 tracking-tight md:text-center">Log in to your account</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] mb-10 md:mb-12 md:text-center">
          Welcome back! Enter your phone number to log in
        </p>

        {/* Input Group */}
        <div className="mb-auto w-full md:flex md:gap-4 md:items-start md:mb-10">
          <div className="hidden md:block md:w-1/3">
            <label className="block text-[11px] md:text-[13px] font-bold text-[#111827] uppercase tracking-wider mb-2">
              Country *
            </label>
            <div className="flex items-center bg-[#F3F4F6] rounded-2xl p-5 border-2 border-transparent transition-all shadow-sm">
              <span className="text-2xl mr-2">🇳🇬</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 ml-auto"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <label className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] md:text-[#111827] uppercase tracking-wider mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center bg-[#F3F4F6] rounded-2xl p-5 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm">
              <span className="text-[#111827] font-bold text-[16px] md:text-[18px] mr-3">+234</span>
              <div className="w-px h-6 bg-[#D1D5DB] mr-4" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0000000000"
                className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-auto md:mt-0">
          <button 
            onClick={() => navigate('/onboarding/otp')} 
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 mt-8 md:mt-2 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-6"
          >
            Continue
          </button>

          <p className="text-center text-[15px] md:text-[16px] text-[#4B5563] mb-8 md:mb-0">
            Don't have an account?{' '}
            <Link to="/onboarding/account-type" className="text-[#4342FF] font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </CenteredLayout>
  )
}
