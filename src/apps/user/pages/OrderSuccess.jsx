import { useNavigate } from 'react-router-dom'
import { Check, Clock, Truck, Star } from 'lucide-react'

export default function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="md:hidden w-full max-w-md mx-auto flex flex-col items-center px-6 py-12">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
            <Check size={28} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order placed!</h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">Order #RD-4821</p>

        {/* ETA */}
        <div className="bg-[#F4F5F7] w-full rounded-2xl p-5 flex items-center justify-between mb-4 border border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Estimated Arrival</p>
            <p className="text-xl font-bold text-gray-900">25-35 min</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">
            <Clock size={20} />
          </div>
        </div>

        {/* Map Preview */}
        <div className="w-full h-40 bg-[#E8EAE6] rounded-2xl mb-12 overflow-hidden relative border border-gray-200 shadow-inner">
          <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 L30,20 L60,80 L100,40" fill="none" stroke="#A0AAB2" strokeWidth="2" />
            <path d="M0,80 L40,40 L70,90 L100,70" fill="none" stroke="#A0AAB2" strokeWidth="1.5" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M40,30 Q60,10 75,60" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeDasharray="4,4" />
            </svg>
            <div className="absolute left-[38%] top-[28%] w-3 h-3 bg-[#4F46E5] rounded-full border-2 border-white shadow-sm z-10" />
            <div className="absolute left-[72%] top-[55%]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-3 -mt-6 drop-shadow-md">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#EF4444"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={() => navigate('/app/track/RD-4821')} 
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm"
          >
            Track my order ↗
          </button>
          <button 
            onClick={() => navigate('/app')} 
            className="w-full bg-[#F4F5F7] text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            Back to home
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      <div className="hidden md:flex w-full max-w-[800px] mx-auto flex-col items-center justify-center py-20 px-10 relative">
        
        {/* Large Checkmark */}
        <div className="w-[140px] h-[140px] bg-gradient-to-tr from-[#3B38F6] to-[#4F46E5] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40 transform transition-transform hover:scale-105">
          <Check size={64} className="text-white" strokeWidth={3} />
        </div>

        <h1 className="text-[42px] font-bold text-gray-900 mb-3">Order placed!</h1>
        <p className="text-[16px] text-gray-500 mb-12 max-w-[360px] text-center leading-relaxed">
          Your order has been received and is being prepared by the merchant.
        </p>

        {/* Status Blocks Row */}
        <div className="flex gap-4 w-full max-w-[600px] mb-8">
          <div className="flex-1 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">Order ID</span>
            <span className="text-[20px] font-bold text-gray-900">#RPD-7729-01X</span>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-[11px] font-bold text-red-500 tracking-widest uppercase mb-2">Estimated Arrival</span>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-red-500" />
              <span className="text-[20px] font-bold text-gray-900">25–35 min</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-4 w-full max-w-[600px] mb-12">
          <button 
            onClick={() => navigate('/app/track/RD-7729-01X')}
            className="flex-1 bg-[#2D2AEE] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Truck size={18} /> Track Order
          </button>
          <button 
            onClick={() => navigate('/app')}
            className="flex-1 bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-bold text-[15px] transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Vendor Summary Card */}
        <div className="w-full max-w-[600px] bg-[#F8F9FA] border border-gray-100 rounded-3xl p-6 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#1A1A1A] rounded-2xl flex-shrink-0 border border-gray-200" />
            <div>
              <h4 className="font-bold text-[16px] text-gray-900 mb-0.5">Artisan Pizzeria & Co.</h4>
              <p className="text-[13px] text-gray-500">2 Items • Delivery to 124 Marina Blvd, Lagos</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm text-[13px] font-bold text-gray-900">
            <Star size={14} className="fill-[#2D2AEE] text-[#2D2AEE]" /> 4.8
          </div>
        </div>

        {/* Bottom Illustration Mockup */}
        <div className="w-full max-w-[600px] h-[160px] bg-gradient-to-t from-gray-200/50 to-white rounded-3xl overflow-hidden relative shadow-inner flex items-end justify-center pb-0">
          <div className="w-24 h-32 bg-[#E2D4A3] rounded-t-sm shadow-md flex items-center justify-center mb-0 relative">
             {/* Box flap */}
             <div className="absolute top-0 w-full h-4 bg-[#D1C28D]" />
          </div>
          <div className="absolute -top-4 w-16 h-24 bg-[#F2C6AA] rounded-full blur-md opacity-60"></div>
        </div>

      </div>

    </div>
  )
}
