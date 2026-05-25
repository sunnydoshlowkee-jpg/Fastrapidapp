import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Check, Share2 } from 'lucide-react'

export default function WalletReceipt() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900 md:hidden">Receipt</h1>
        </div>

        <div className="px-5 md:px-8 w-full flex-1 flex flex-col items-center pt-8 md:pt-4 md:pb-10">
          
          {/* Receipt Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 md:bg-gray-50 rounded-full flex items-center justify-center mb-5 border md:border-gray-100 shadow-sm">
            <Camera size={24} className="text-gray-500 md:w-8 md:h-8" />
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 md:gap-2 mb-3">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-sm shadow-green-200">
              <Check size={12} className="text-white md:w-3.5 md:h-3.5" strokeWidth={3} />
            </div>
            <span className="text-green-600 font-semibold text-[14px] md:text-[15px]">Successful</span>
          </div>

          {/* Amount */}
          <h2 className="text-[36px] md:text-[42px] font-bold text-gray-900 mb-1 tracking-tight">₦45,000.00</h2>
          <p className="text-[13px] md:text-[14px] font-medium text-gray-400 mb-8 px-3 py-1 bg-gray-100 rounded-full">RD-TX-9921</p>

          {/* Details Card */}
          <div className="w-full bg-white md:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm md:shadow-none divide-y divide-gray-100 md:divide-white">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[13px] md:text-[14px] font-medium text-gray-500">Date</span>
              <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">24 Oct 2023</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[13px] md:text-[14px] font-medium text-gray-500">Time</span>
              <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">14:45 PM</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[13px] md:text-[14px] font-medium text-gray-500">Payment Method</span>
              <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">Wallet Balance</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-[13px] md:text-[14px] font-medium text-gray-500">Fee</span>
              <span className="text-[13px] md:text-[14px] font-semibold text-gray-900">₦0.00</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full mt-8 md:mt-10 flex flex-col items-center gap-3 md:gap-4">
            <button className="w-full bg-[#4F46E5] text-white py-4 md:py-4.5 rounded-xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
              Share Receipt
            </button>
            <button 
              onClick={() => navigate('/app/wallet')}
              className="text-[14px] md:text-[15px] font-semibold text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              Back to Wallet
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
