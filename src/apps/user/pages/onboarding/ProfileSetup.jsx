import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Calendar } from 'lucide-react'

export default function ProfileSetup() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pt-4">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete your profile</h1>
        <p className="text-gray-500 text-base mb-8">
          Help us personalize your delivery experience in Lagos.
        </p>

        <div className="flex flex-col gap-5 mb-10">
          
          {/* First Name */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              First Name
            </label>
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-transparent focus-within:border-[#4F46E5] transition-colors">
              <input
                type="text"
                placeholder="i.e John"
                className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Last Name
            </label>
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-transparent focus-within:border-[#4F46E5] transition-colors">
              <input
                type="text"
                placeholder="i.e Sam"
                className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-transparent focus-within:border-[#4F46E5] transition-colors">
              <input
                type="email"
                placeholder="name@example.com"
                className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
              Gender
            </label>
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-transparent focus-within:border-[#4F46E5] transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-gray-900 text-base">Select Gender</span>
              </div>
              <ChevronDown size={20} className="text-gray-600" />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                Date of Birth
              </label>
              <span className="text-xs font-medium text-gray-500">optional</span>
            </div>
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-transparent focus-within:border-[#4F46E5] transition-colors flex items-center gap-3">
              <Calendar size={20} className="text-gray-600" />
              <input
                type="text"
                placeholder="DD / MM / YYYY"
                className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
              />
            </div>
          </div>

        </div>

        <button 
          onClick={() => navigate('/onboarding/preferences')} 
          className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700 mb-8 mt-auto"
        >
          Continue
        </button>

      </div>
    </div>
  )
}
