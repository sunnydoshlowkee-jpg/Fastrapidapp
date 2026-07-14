import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import CenteredLayout from '../../../../components/layout/CenteredLayout'

export default function ServicePreference() {
  const navigate = useNavigate()
  const [pref, setPref] = useState('food')
  const [showEverything, setShowEverything] = useState(true)
  const [payment, setPayment] = useState('wallet')

  return (
    <CenteredLayout 
      showBackButton={true} 
      backTo="/onboarding/location"
    >
      <div className="flex-1 flex flex-col md:items-center pt-2 pb-24 md:pb-12 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none relative">
        
        {/* Header absolute skip on mobile since AuthLayout/CenteredLayout doesn't have skip out of box, we put it here */}
        <div className="absolute -top-14 right-0 md:top-6 md:right-8">
          <Link to="/app" className="text-[#4342FF] text-[15px] font-bold hover:underline">
            Skip
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2 md:mb-4 tracking-tight md:text-center">What are you looking for?</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] mb-8 md:mb-12 md:text-center">
          Select your preferred delivery experience.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10 w-full">
          {/* Food */}
          <button
            onClick={() => setPref('food')}
            className={`relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] border-2 transition-all ${
              pref === 'food' 
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm' 
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            {pref === 'food' && (
              <CheckCircle2 size={24} className="absolute top-4 right-4 md:top-6 md:right-6 text-[#4342FF] fill-white" />
            )}
            <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 md:mb-6">
              <span className="text-[#4342FF] text-xl md:text-3xl font-bold">🍴</span>
            </div>
            <span className="font-bold text-[#111827] text-[14px] md:text-[16px] text-center">Food &<br/>Restaurants</span>
          </button>

          {/* Groceries */}
          <button
            onClick={() => setPref('groceries')}
            className={`relative flex flex-col items-center justify-center p-6 md:p-8 rounded-[2rem] border-2 transition-all ${
              pref === 'groceries' 
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm' 
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            {pref === 'groceries' && (
              <CheckCircle2 size={24} className="absolute top-4 right-4 md:top-6 md:right-6 text-[#4342FF] fill-white" />
            )}
            <div className="w-14 h-14 md:w-20 md:h-20 bg-[#F0EBE1] rounded-full shadow-sm flex items-center justify-center mb-4 md:mb-6">
              <span className="text-[#374151] text-xl md:text-3xl font-bold">🛒</span>
            </div>
            <span className="font-bold text-[#111827] text-[14px] md:text-[16px] text-center">Groceries &<br/>Produce</span>
          </button>
        </div>

        {/* Show me everything Toggle */}
        <div className="w-full flex items-center justify-between p-5 md:p-6 rounded-2xl border-2 border-[#F3F4F6] shadow-sm mb-8 md:mb-12">
          <span className="text-[#111827] font-bold md:text-[18px]">Show me everything</span>
          <button 
            onClick={() => setShowEverything(!showEverything)}
            className={`w-14 h-8 md:w-16 md:h-9 rounded-full p-1 transition-colors ${
              showEverything ? 'bg-[#4342FF]' : 'bg-[#D1D5DB]'
            }`}
          >
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full bg-white shadow-sm transition-transform ${
              showEverything ? 'translate-x-6 md:translate-x-7' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Preferred Payment */}
        <div className="mb-8 md:mb-12 w-full">
          <p className="text-[#6B7280] font-bold text-[13px] md:text-[14px] uppercase tracking-wider mb-4 md:text-center">Preferred payment</p>
          <div className="flex gap-3 md:gap-4 md:justify-center">
            <button
              onClick={() => setPayment('wallet')}
              className={`flex-1 md:flex-none md:w-32 py-3 rounded-full text-[14px] md:text-[16px] font-bold transition-all ${
                payment === 'wallet' ? 'bg-[#4342FF] text-white shadow-sm' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200'
              }`}
            >
              Wallet
            </button>
            <button
              onClick={() => setPayment('card')}
              className={`flex-1 md:flex-none md:w-32 py-3 rounded-full text-[14px] md:text-[16px] font-bold transition-all ${
                payment === 'card' ? 'bg-[#4342FF] text-white shadow-sm' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200'
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setPayment('crypto')}
              className={`flex-1 md:flex-none md:w-32 py-3 rounded-full text-[14px] md:text-[16px] font-bold transition-all ${
                payment === 'crypto' ? 'bg-[#4342FF] text-white shadow-sm' : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-gray-200'
              }`}
            >
              Crypto
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full absolute bottom-6 left-0 px-6 md:relative md:bottom-auto md:px-0 mt-auto md:mt-0">
          <button 
            onClick={() => navigate('/app')} 
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>

      </div>
    </CenteredLayout>
  )
}
