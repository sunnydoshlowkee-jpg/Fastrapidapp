import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import AuthLayout from '../../../../components/layout/AuthLayout'

export default function ServicePreference() {
  const navigate = useNavigate()
  const [pref, setPref] = useState('food')
  const [showEverything, setShowEverything] = useState(true)
  const [payment, setPayment] = useState('wallet')

  return (
    <AuthLayout 
      illustration="/welcome-hero.png" 
      showBackButton={true} 
      backTo="/onboarding/location"
    >
      <div className="flex-1 flex flex-col pt-2 pb-24 relative">
        
        {/* Header absolute skip on mobile since AuthLayout doesn't have skip out of box, we put it here */}
        <div className="absolute -top-14 right-0 md:top-0">
          <Link to="/app" className="text-[#4342FF] text-[15px] font-bold hover:underline">
            Skip
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold text-[#111827] mb-2 tracking-tight">What are you looking for?</h1>
        <p className="text-[#6B7280] text-[16px] mb-8">
          Select your preferred delivery experience.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Food */}
          <button
            onClick={() => setPref('food')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all ${
              pref === 'food' 
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm' 
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            {pref === 'food' && (
              <CheckCircle2 size={20} className="absolute top-4 right-4 text-[#4342FF] fill-white" />
            )}
            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <span className="text-[#4342FF] text-xl font-bold">🍴</span>
            </div>
            <span className="font-bold text-[#111827] text-[14px] text-center">Food &<br/>Restaurants</span>
          </button>

          {/* Groceries */}
          <button
            onClick={() => setPref('groceries')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all ${
              pref === 'groceries' 
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm' 
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            {pref === 'groceries' && (
              <CheckCircle2 size={20} className="absolute top-4 right-4 text-[#4342FF] fill-white" />
            )}
            <div className="w-14 h-14 bg-[#F0EBE1] rounded-full shadow-sm flex items-center justify-center mb-4">
              <span className="text-[#374151] text-xl font-bold">🛒</span>
            </div>
            <span className="font-bold text-[#111827] text-[14px] text-center">Groceries &<br/>Produce</span>
          </button>
        </div>

        {/* Show me everything Toggle */}
        <div className="flex items-center justify-between p-5 rounded-2xl border-2 border-[#F3F4F6] shadow-sm mb-8">
          <span className="text-[#111827] font-bold">Show me everything</span>
          <button 
            onClick={() => setShowEverything(!showEverything)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              showEverything ? 'bg-[#4342FF]' : 'bg-[#D1D5DB]'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
              showEverything ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Preferred Payment */}
        <div className="mb-8">
          <p className="text-[#6B7280] font-bold text-[13px] uppercase tracking-wider mb-4">Preferred payment</p>
          <div className="flex gap-3">
            <button
              onClick={() => setPayment('wallet')}
              className={`flex-1 py-3 rounded-full text-[14px] font-bold transition-all ${
                payment === 'wallet' ? 'bg-[#4342FF] text-white shadow-sm' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200'
              }`}
            >
              Wallet
            </button>
            <button
              onClick={() => setPayment('card')}
              className={`flex-1 py-3 rounded-full text-[14px] font-bold transition-all ${
                payment === 'card' ? 'bg-[#4342FF] text-white shadow-sm' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200'
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setPayment('crypto')}
              className={`flex-1 py-3 rounded-full text-[14px] font-bold transition-all ${
                payment === 'crypto' ? 'bg-[#4342FF] text-white shadow-sm' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200'
              }`}
            >
              Crypto
            </button>
          </div>
        </div>

      </div>

      {/* Floating Action Button area (stays within right panel) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:px-16 lg:px-24 bg-gradient-to-t from-white via-white to-transparent flex justify-center pb-10">
        <div className="w-full max-w-md md:max-w-none">
          <button 
            onClick={() => navigate('/app')} 
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 rounded-xl font-bold text-[16px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}
