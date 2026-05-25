import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

export default function Login() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Header */}
      <div className="flex justify-center pt-12 pb-8">
        <Logo variant="full" height={24} />
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pt-4">
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 text-base mb-12">
          Log in to continue your journey.
        </p>

        {/* Input Group */}
        <div className="mb-8">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <div className="flex items-center bg-[#F4F5F7] rounded-2xl p-5 border border-transparent focus-within:border-[#4F46E5] transition-colors">
            <div className="flex items-center gap-2 mr-3">
              {/* Nigeria Flag */}
              <div className="w-5 h-3.5 bg-white flex overflow-hidden rounded-[2px] shadow-sm">
                <div className="w-1/3 h-full bg-green-600" />
                <div className="w-1/3 h-full bg-white" />
                <div className="w-1/3 h-full bg-green-600" />
              </div>
              <span className="text-gray-900 text-base">+234</span>
            </div>
            <div className="w-px h-6 bg-gray-300 mr-4" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="000 000 0000"
              className="bg-transparent text-gray-900 outline-none text-base w-full placeholder:text-gray-500"
            />
          </div>
        </div>

        <button 
          onClick={() => navigate('/auth/verify')} 
          className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700 mb-8"
        >
          Log In
        </button>

        <p className="text-center text-base text-gray-600 mb-8">
          Don't have an account?{' '}
          <Link to="/onboarding/phone" className="text-[#4F46E5] font-semibold">Sign Up</Link>
        </p>

      </div>
    </div>
  )
}
