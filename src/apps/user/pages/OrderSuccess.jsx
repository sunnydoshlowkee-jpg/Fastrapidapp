import { useNavigate } from 'react-router-dom'
import { Check, Clock, Navigation } from 'lucide-react'

export default function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-gray-50 items-center justify-center p-4">
      <div className="bg-white max-w-md w-full md:rounded-3xl md:shadow-xl md:border md:border-gray-100 p-8 flex flex-col items-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-[#1A1AF5] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Check size={24} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed!</h1>
        <p className="text-sm font-semibold text-gray-400 tracking-widest uppercase mb-10">Order #RD-4821</p>

        {/* Estimated Arrival */}
        <div className="w-full bg-gray-50 rounded-2xl p-5 flex items-center justify-between mb-8 border border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Estimated Arrival</p>
            <p className="text-xl font-bold text-gray-900">25–35 min</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <Clock size={20} />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-40 bg-gray-100 rounded-2xl mb-8 relative overflow-hidden border border-gray-200">
          <img src="/map-placeholder.png" alt="Map" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
          {/* Mock Path SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M50 50 Q 60 30 70 60 T 90 80" stroke="#EF4444" strokeWidth="2" fill="none" strokeDasharray="4 4" />
          </svg>
          {/* Markers */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1A1AF5] rounded-full border-2 border-white shadow-md z-10"></div>
          <div className="absolute top-[60%] left-[70%] text-red-500 z-10">
            <Navigation size={20} className="fill-red-500 transform rotate-180" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={() => navigate('/app/track/RD-4821')}
            className="w-full bg-[#1A1AF5] text-white py-4 rounded-xl font-semibold hover:bg-[#1515d4] transition-colors flex items-center justify-center gap-2"
          >
            Track my order <Navigation size={16} className="transform rotate-45" />
          </button>
          <button 
            onClick={() => navigate('/app')}
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to home
          </button>
        </div>

      </div>
    </div>
  )
}
