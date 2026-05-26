import { useNavigate } from 'react-router-dom'
import { ChevronDown, Calendar } from 'lucide-react'
import AuthLayout from '../../../../components/layout/AuthLayout'

export default function ProfileSetup() {
  const navigate = useNavigate()

  return (
    <AuthLayout 
      illustration="/welcome-hero.png" 
      showBackButton={true} 
      backTo="/onboarding/otp"
    >
      <div className="flex-1 flex flex-col pt-2">
        
        <h1 className="text-3xl font-extrabold text-[#111827] mb-2 tracking-tight">Complete your profile</h1>
        <p className="text-[#6B7280] text-[16px] mb-8">
          Help us personalize your delivery experience in Lagos.
        </p>

        <div className="flex flex-col gap-5 mb-10">
          
          {/* First Name */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              First Name
            </label>
            <div className="bg-[#F3F4F6] rounded-2xl p-4 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm">
              <input
                type="text"
                placeholder="i.e John"
                className="bg-transparent text-[#111827] outline-none text-[16px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              Last Name
            </label>
            <div className="bg-[#F3F4F6] rounded-2xl p-4 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm">
              <input
                type="text"
                placeholder="i.e Sam"
                className="bg-transparent text-[#111827] outline-none text-[16px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="bg-[#F3F4F6] rounded-2xl p-4 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm">
              <input
                type="email"
                placeholder="name@example.com"
                className="bg-transparent text-[#111827] outline-none text-[16px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              Gender
            </label>
            <div className="bg-[#F3F4F6] rounded-2xl p-4 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B7280]">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-[#111827] font-medium text-[16px]">Select Gender</span>
              </div>
              <ChevronDown size={20} className="text-[#6B7280]" />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                Date of Birth
              </label>
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase">optional</span>
            </div>
            <div className="bg-[#F3F4F6] rounded-2xl p-4 border-2 border-transparent focus-within:border-[#4342FF] focus-within:bg-white transition-all shadow-sm flex items-center gap-3">
              <Calendar size={20} className="text-[#6B7280]" />
              <input
                type="text"
                placeholder="DD / MM / YYYY"
                className="bg-transparent text-[#111827] outline-none text-[16px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
          </div>

        </div>

        <button 
          onClick={() => navigate('/onboarding/preferences')} 
          className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 rounded-xl font-bold text-[16px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-8 mt-4"
        >
          Continue
        </button>

      </div>
    </AuthLayout>
  )
}
