import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PhoneEntry() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Header */}
      <div className="flex items-center px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pt-4">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
        <p className="text-gray-500 text-base mb-10">
          Enter your phone number to get started
        </p>

        {/* Input Group */}
        <div className="mb-auto">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <div className="flex items-center bg-[#F8F9FA] rounded-2xl p-5 border border-transparent focus-within:border-[#4F46E5] transition-colors">
            <span className="text-gray-600 text-base mr-3">+234</span>
            <div className="w-px h-6 bg-gray-300 mr-4" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="000 000 0000"
              className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-400"
            />
          </div>
        </div>

        <button 
          onClick={() => navigate('/onboarding/otp')} 
          className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700 mb-6"
        >
          Continue
        </button>

        <p className="text-center text-base text-gray-600 mb-8">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#4F46E5] font-semibold">Log In</Link>
        </p>

      </div>
    </div>
  )
}
