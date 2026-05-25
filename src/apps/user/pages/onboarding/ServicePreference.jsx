import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ServicePreference() {
  const navigate = useNavigate()
  const [pref, setPref] = useState('food')
  const [showEverything, setShowEverything] = useState(true)
  const [payment, setPayment] = useState('wallet')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F2937] rounded-xl flex items-center justify-center text-white">
          <ArrowLeft size={20} />
        </button>
        <Link to="/app" className="text-[#4F46E5] text-sm font-semibold">
          Skip
        </Link>
      </div>

      <div className="flex-1 flex flex-col px-6 max-w-md mx-auto w-full pt-4 relative pb-[120px]">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">What are you looking for?</h1>
        <p className="text-gray-500 text-base mb-8">
          Select your preferred delivery experience.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Food */}
          <button
            onClick={() => setPref('food')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-colors ${
              pref === 'food' 
                ? 'bg-indigo-50/50 border-[#4F46E5]' 
                : 'bg-[#F8F9FA] border-transparent'
            }`}
          >
            {pref === 'food' && (
              <CheckCircle2 size={20} className="absolute top-4 right-4 text-[#4F46E5] fill-white" />
            )}
            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
              <span className="text-[#4F46E5] text-xl font-bold">🍴</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm text-center">Food &<br/>Restaurants</span>
          </button>

          {/* Groceries */}
          <button
            onClick={() => setPref('groceries')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-colors ${
              pref === 'groceries' 
                ? 'bg-indigo-50/50 border-[#4F46E5]' 
                : 'bg-[#F8F9FA] border-transparent'
            }`}
          >
            {pref === 'groceries' && (
              <CheckCircle2 size={20} className="absolute top-4 right-4 text-[#4F46E5] fill-white" />
            )}
            <div className="w-14 h-14 bg-[#F0EBE1] rounded-full shadow-sm flex items-center justify-center mb-4">
              <span className="text-[#374151] text-xl font-bold">🛒</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm text-center">Groceries &<br/>Produce</span>
          </button>
        </div>

        {/* Show me everything Toggle */}
        <div className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50 mb-8">
          <span className="text-gray-700 font-medium">Show me everything</span>
          <button 
            onClick={() => setShowEverything(!showEverything)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${
              showEverything ? 'bg-[#4F46E5]' : 'bg-gray-300'
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
              showEverything ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Preferred Payment */}
        <div className="mb-8">
          <p className="text-gray-800 font-medium mb-4">Preferred payment</p>
          <div className="flex gap-3">
            <button
              onClick={() => setPayment('wallet')}
              className={`flex-1 py-3 rounded-full text-sm font-medium transition-colors ${
                payment === 'wallet' ? 'bg-[#4F46E5] text-white' : 'bg-[#F4F5F7] text-gray-800'
              }`}
            >
              Wallet
            </button>
            <button
              onClick={() => setPayment('card')}
              className={`flex-1 py-3 rounded-full text-sm font-medium transition-colors ${
                payment === 'card' ? 'bg-[#4F46E5] text-white' : 'bg-[#F4F5F7] text-gray-800'
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setPayment('crypto')}
              className={`flex-1 py-3 rounded-full text-sm font-medium transition-colors ${
                payment === 'crypto' ? 'bg-[#4F46E5] text-white' : 'bg-[#F4F5F7] text-gray-800'
              }`}
            >
              Crypto
            </button>
          </div>
        </div>

        {/* Illustration graphic */}
        <div className="mt-auto h-40 bg-gradient-to-t from-gray-100 to-gray-50 rounded-t-3xl border-x border-t border-gray-100 flex items-end justify-center overflow-hidden">
           {/* Abstract cityscape illustration placeholder */}
           <svg className="w-full h-full opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
             <path d="M0,200 L0,150 L40,150 L40,80 L90,80 L90,120 L150,120 L150,50 L200,50 L200,100 L250,100 L250,30 L320,30 L320,130 L360,130 L360,70 L400,70 L400,200 Z" fill="#9CA3AF" />
           </svg>
        </div>
      </div>

      {/* Floating Action Button area */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent flex justify-center pb-8">
        <div className="w-full max-w-md">
          <button 
            onClick={() => navigate('/app')} 
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-medium text-base shadow-lg shadow-indigo-200 transition-transform active:scale-[0.98] hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
