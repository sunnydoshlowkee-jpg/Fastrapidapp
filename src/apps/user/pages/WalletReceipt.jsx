import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Share2, Wallet } from 'lucide-react'

export default function WalletReceipt() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      
      {/* Top Background Half */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-gray-200 to-gray-50 z-0"></div>

      {/* Main Content */}
      <div className="flex flex-col w-full min-h-screen relative z-10 px-4 md:max-w-md md:mx-auto pb-8 pt-12">
        
        {/* Receipt Card */}
        <div className="bg-white rounded-[2rem] w-full pt-16 pb-8 px-6 shadow-xl shadow-gray-200/50 mt-16 relative flex flex-col items-center flex-1 lg:flex-none">
          
          {/* Logo / Success Icon (Overlapping top) */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gray-900 rounded-full border-[6px] border-gray-50 flex items-center justify-center text-white shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>

          <div className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full flex items-center gap-2 mb-6">
            <CheckCircle2 size={16} className="fill-green-600 text-white" />
            <span className="text-sm font-bold tracking-wide">Successful</span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-2">₦45,000.00</h2>
          <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-12">RD-TX-9921</p>

          <div className="w-full flex flex-col gap-6 mb-12">
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Date</span>
              <span className="text-gray-900 font-bold">24 Oct 2023</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Time</span>
              <span className="text-gray-900 font-bold">14:45 PM</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Payment Method</span>
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-[#3B3BFF]">
                  <Wallet size={12} />
                </div>
                Wallet Balance
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Fee</span>
              <span className="text-gray-900 font-bold">₦0.00</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="w-full mt-auto flex flex-col gap-3">
            <button className="w-full bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-colors flex justify-center items-center gap-2">
              <Share2 size={20} />
              Share Receipt
            </button>
            <button 
              onClick={() => navigate('/app/wallet')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-colors"
            >
              Back to Wallet
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
