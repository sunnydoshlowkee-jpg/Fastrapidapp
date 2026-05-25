import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Pencil, LocateFixed } from 'lucide-react'

export default function Location() {
  const [address, setAddress] = useState('12 Victoria Island, Lagos')
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* Header */}
      <div className="flex items-center px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pb-8">
        
        {/* Top Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Huge orange map pin placeholder */}
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 8C33.4 8 20 21.4 20 38C20 60.5 50 92 50 92C50 92 80 60.5 80 38C80 21.4 66.6 8 50 8ZM50 46C45.6 46 42 42.4 42 38C42 33.6 45.6 30 50 30C54.4 30 58 33.6 58 38C58 42.4 54.4 46 50 46Z" fill="#FF6B00"/>
              <path d="M25 75L15 90H85L75 75H25Z" fill="#FF6B00" opacity="0.2"/>
              <path d="M28 78L20 90H80L72 78H28Z" stroke="#FF6B00" strokeWidth="6" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Where should we deliver?</h1>
        <p className="text-gray-500 text-base mb-8">
          We'll find the best vendors near you.
        </p>

        {/* Address Input */}
        <div className="flex items-center justify-between bg-[#F8F9FA] rounded-2xl p-5 mb-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-transparent text-gray-800 outline-none text-base w-full"
          />
          <Pencil size={18} className="text-[#4F46E5] flex-shrink-0 ml-2" />
        </div>

        <button className="flex items-center justify-center gap-2 text-[#4F46E5] font-medium mb-8">
          <LocateFixed size={18} /> Use my current location
        </button>

        {/* Map Preview Area */}
        <div className="flex-1 w-full bg-[#4A7276] rounded-3xl overflow-hidden relative mb-8 min-h-[220px]">
          {/* Simulated Map lines */}
          <div className="absolute inset-0 opacity-20"
               style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {/* Abstract map paths */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,20 Q30,40 50,20 T100,50 M0,60 Q40,80 60,40 T100,80 M20,0 L40,100 M70,0 L80,100" stroke="white" strokeWidth="1" fill="none" />
          </svg>
          {/* Center Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-[#4F46E5]/20 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-[#4F46E5] border-4 border-white rounded-full shadow-lg" />
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/onboarding/phone')} 
          className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700 mb-6"
        >
          Continue
        </button>

        <p className="text-center text-xs text-gray-500 px-4">
          By continuing, you agree to our <span className="text-gray-400 underline decoration-gray-300">Terms of Service</span> and <span className="text-gray-400 underline decoration-gray-300">Privacy Policy</span>.
        </p>

      </div>
    </div>
  )
}
