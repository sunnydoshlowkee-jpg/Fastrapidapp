import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Phone, MessageSquare, MapPin, Navigation } from 'lucide-react'

export default function TrackOrder() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-28 md:pb-0 relative">
      
      {/* Header */}
      <div className="px-4 py-5 bg-white sticky top-0 z-30 flex items-center border-b border-gray-100 shadow-sm md:px-8">
        <button onClick={() => navigate(-1)} className="text-gray-900 w-10 h-10 flex items-center justify-start">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 ml-2">Track Order</h1>
      </div>

      {/* Map Section */}
      <div className="relative h-60 w-full bg-gray-200">
        <img src="/map-placeholder.png" alt="Map Route" className="w-full h-full object-cover mix-blend-multiply opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1A1AF5] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
          <MapPin size={14} className="text-white fill-white" />
        </div>
        
        {/* ETA Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-5 py-3 rounded-full shadow-lg flex items-center gap-3">
          <div className="w-6 h-6 bg-[#1A1AF5] rounded-full flex items-center justify-center text-white">
            <ClockIcon />
          </div>
          <span className="font-bold text-gray-900 text-sm whitespace-nowrap">Arriving in 15-20 mins</span>
        </div>
      </div>

      <div className="px-5 md:px-8 py-8 flex-1 max-w-3xl mx-auto w-full flex flex-col gap-8 bg-gray-50">
        
        {/* Timeline */}
        <div className="flex flex-col gap-6 ml-2 relative">
          
          {/* Connecting Line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200 z-0"></div>
          {/* Active Line */}
          <div className="absolute left-[11px] top-4 h-1/2 w-0.5 bg-[#1A1AF5] z-0"></div>

          {/* Steps */}
          <div className="flex gap-4 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#1A1AF5] flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
              <CheckIcon />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Order Placed</h4>
              <p className="text-xs text-gray-400 mt-0.5">12:40 PM</p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="w-6 h-6 rounded-full bg-[#1A1AF5] flex items-center justify-center mt-0.5 shadow-sm shadow-blue-500/20">
              <CheckIcon />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Vendor Accepted</h4>
              <p className="text-xs text-gray-400 mt-0.5">12:45 PM</p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
              <div className="w-2.5 h-2.5 bg-[#1A1AF5] rounded-full"></div>
            </div>
            <div>
              <h4 className="font-bold text-[#1A1AF5] text-sm">Preparing</h4>
              <p className="text-xs text-gray-500 mt-0.5">Your order is being cooked</p>
            </div>
          </div>

          <div className="flex gap-4 relative z-10 opacity-50">
            <div className="w-6 h-6 rounded-full bg-gray-200 mt-0.5"></div>
            <div>
              <h4 className="font-bold text-gray-600 text-sm">En Route</h4>
            </div>
          </div>

          <div className="flex gap-4 relative z-10 opacity-50">
            <div className="w-6 h-6 rounded-full bg-gray-200 mt-0.5"></div>
            <div>
              <h4 className="font-bold text-gray-600 text-sm">Delivered</h4>
            </div>
          </div>

        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/driver-placeholder.png" alt="Chinedu" className="w-14 h-14 rounded-full object-cover bg-gray-100" />
            <div>
              <h4 className="font-bold text-gray-900">Chinedu</h4>
              <div className="flex items-center text-sm font-semibold text-gray-700">
                4.8 <StarIcon />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-xl text-right">
            <p className="text-[10px] font-bold text-gray-500 tracking-wider">VEHICLE</p>
            <p className="font-bold text-gray-900 text-sm">ABC-123-XY</p>
          </div>
        </div>

        {/* Driver Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-white text-[#1A1AF5] border border-blue-200 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm">
            <Phone size={18} /> Call Chinedu
          </button>
          <button className="flex-1 bg-white text-[#1A1AF5] border border-blue-200 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-sm">
            <MessageSquare size={18} /> Message
          </button>
        </div>

        {/* Cancellation Notice */}
        <div className="text-center mt-2">
          <p className="text-xs text-gray-500 mb-3">Order is in preparation. Cancellation unavailable.</p>
          <button className="text-xs font-bold text-gray-400 tracking-widest uppercase">
            Cancel Order
          </button>
        </div>

      </div>

    </div>
  )
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#EAB308" stroke="none" className="ml-1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
