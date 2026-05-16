import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, ChevronRight } from 'lucide-react'

export default function PaymentMethods() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-8 relative">
      
      {/* Header */}
      <div className="px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center md:max-w-2xl md:mx-auto w-full gap-3">
        <button onClick={() => navigate(-1)} className="text-[#3B3BFF] w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Payment Methods</h1>
      </div>

      <div className="px-4 md:max-w-2xl md:mx-auto w-full flex-1">
        
        {/* Banner */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10 w-3/4">
            <p className="text-[#3B3BFF] text-xs font-bold tracking-wider mb-2">SECURE PAYMENTS</p>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              Manage your digital wallet and card preferences.
            </h2>
          </div>
          <div className="absolute -right-4 -bottom-8 opacity-10 text-gray-900">
            <CreditCard size={120} strokeWidth={1} className="-rotate-12" />
          </div>
        </div>

        {/* Saved Cards Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-600 tracking-wider">SAVED CARDS</h3>
          <button className="text-[#3B3BFF] text-sm font-bold hover:opacity-80 transition-opacity">
            [ Add New Card ]
          </button>
        </div>

        {/* Cards List */}
        <div className="flex flex-col gap-3 mb-8">
          
          <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <div className="w-4 h-4 bg-red-500 rounded-full absolute -left-1"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full absolute -right-1 mix-blend-multiply"></div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Mastercard</h4>
                <p className="text-sm text-gray-500">XXXX 4122</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#3B3BFF] text-sm font-bold">Default</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-gray-100 flex items-center justify-center text-[#1434CB] font-bold italic border border-gray-200">
                Visa
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Visa</h4>
                <p className="text-sm text-gray-500">XXXX 8829</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded bg-gray-900 flex items-center justify-center text-white font-bold text-xs">
                Pay
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Apple Pay</h4>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="rounded-2xl overflow-hidden relative bg-gray-900 h-32 flex items-end p-5">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1576405411707-167814b7cc01?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="relative z-10">
            <h3 className="text-white font-bold text-lg mb-1">Secure Local Processing</h3>
            <p className="text-gray-300 text-xs font-semibold tracking-widest uppercase">Optimized for Lagos</p>
          </div>
        </div>

      </div>
    </div>
  )
}
