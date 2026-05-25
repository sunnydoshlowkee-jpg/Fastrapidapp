import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, Copy } from 'lucide-react'

export default function ReceiveMoney() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Receive Money</h1>
        </div>

        <div className="px-5 md:px-8 w-full flex flex-col items-center pt-2 md:pt-8 md:pb-8">
          
          {/* Subtitle */}
          <p className="text-[13px] md:text-[14px] text-gray-500 mb-6">Show your QR code to get paid instantly</p>

          {/* QR Code */}
          <div className="w-[220px] h-[220px] md:w-[240px] md:h-[240px] bg-white rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center mb-4 shadow-sm hover:border-[#4F46E5] hover:shadow-md transition-all">
            {/* Simulated QR pattern */}
            <div className="w-[160px] h-[160px] md:w-[180px] md:h-[180px] grid grid-cols-8 grid-rows-8 gap-[2px]">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-[1px] ${
                    // Create a QR-like pattern
                    (i < 24 && (i % 8 < 3 || (i < 3))) ||
                    (i >= 40 && i % 8 < 3) ||
                    (i % 8 >= 5 && i < 24) ||
                    (Math.random() > 0.5 && i > 23 && i < 40)
                      ? 'bg-gray-800' 
                      : 'bg-gray-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Username */}
          <p className="text-[14px] md:text-[15px] font-semibold text-gray-700 mb-8 px-4 py-1.5 bg-gray-100 rounded-full">@olumide_dev</p>

          {/* Bank Transfer Details */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={18} className="text-[#4F46E5]" />
              <h3 className="font-bold text-gray-900 text-[14px]">Bank Transfer Details</h3>
            </div>

            <div className="bg-white md:bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Bank Name</p>
                <p className="font-semibold text-gray-900 text-[14px]">Wema/Paystack-Titan</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Account Number</p>
                  <p className="font-bold text-gray-900 text-[16px] md:text-[18px] tracking-wide">823 491 0023</p>
                </div>
                <button className="w-9 h-9 md:w-10 md:h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:border-[#4F46E5] hover:shadow-sm transition-all active:scale-95">
                  <Copy size={16} />
                </button>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Account Name</p>
                <p className="font-semibold text-gray-900 text-[14px]">OLUMIDE ADEBAYO / RAPID</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
