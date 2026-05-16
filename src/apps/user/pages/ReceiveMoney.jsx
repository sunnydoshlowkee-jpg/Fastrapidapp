import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Landmark } from 'lucide-react'

export default function ReceiveMoney() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-8 relative overflow-x-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center md:max-w-md md:mx-auto w-full gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-900 w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Receive Money</h1>
      </div>

      <div className="px-4 md:max-w-2xl lg:max-w-7xl md:mx-auto w-full flex-1 pt-4 lg:pt-8 flex flex-col lg:px-8">
        
        {/* Desktop Header */}
        <div className="hidden lg:flex flex-col items-center justify-center text-center mb-12 mt-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Receive Money</h1>
          <p className="text-gray-500 text-lg">Scan or share your details to receive instant payments</p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:mb-12">
          
          {/* Left Column - QR Code */}
          <div className="flex flex-col items-center">
            <p className="lg:hidden text-gray-600 text-center mb-6">Show your QR code to get paid instantly</p>

            {/* QR Code Card */}
            <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 flex flex-col items-center justify-center mb-6 shadow-sm lg:shadow-md border border-gray-100 lg:w-full lg:max-w-md">
          
          <div className="w-56 h-56 bg-gray-200/50 rounded-2xl mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(59,59,255,0.15)] relative overflow-hidden p-6">
            {/* Fake QR pattern using blocks */}
            <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-2 opacity-20 bg-white p-2 rounded-xl">
              <div className="bg-gray-900 rounded border-2 border-gray-900"></div>
              <div className="bg-gray-900 rounded"></div>
              <div className="col-span-2 bg-gray-900 rounded"></div>
              <div className="col-span-2 bg-gray-900 rounded border-2 border-gray-900"></div>
              <div className="bg-gray-900 rounded"></div>
              <div className="bg-gray-900 rounded"></div>
              <div className="bg-gray-900 rounded"></div>
              <div className="bg-gray-900 rounded border-2 border-gray-900"></div>
              <div className="col-span-2 bg-gray-900 rounded"></div>
              <div className="bg-gray-900 rounded border-2 border-gray-900"></div>
              <div className="bg-gray-900 rounded"></div>
              <div className="col-span-2 bg-gray-900 rounded border-2 border-gray-900"></div>
              <div className="bg-gray-900 rounded border-2 border-gray-900"></div>
            </div>
            {/* Inner Border glow effect */}
            <div className="absolute inset-0 border-[6px] border-white/50 rounded-2xl"></div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">@olumide_dev</h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Scan to pay securely</p>
        </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex w-full max-w-md gap-4">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                Share Code
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Save Image
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col gap-6">
            
            {/* Bank Transfer Details */}
            <div className="bg-gray-100/50 lg:bg-white lg:shadow-sm lg:border lg:border-gray-100 rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#3B3BFF]">
                  <Landmark size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 lg:text-lg">Bank Transfer</h3>
                  <p className="hidden lg:block text-xs text-gray-500">Automatic settlement into your wallet</p>
                </div>
              </div>

              <div className="bg-white lg:bg-gray-50/50 rounded-2xl p-6 lg:p-0 lg:bg-transparent flex flex-col gap-5 lg:gap-6 shadow-sm lg:shadow-none">
            
                <div className="lg:bg-gray-50 lg:p-4 lg:rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 lg:mb-2">Bank Name</p>
                  <p className="font-bold text-gray-900 lg:text-lg">Wema/Paystack-Titan</p>
                </div>

                <div className="lg:bg-gray-50 lg:p-4 lg:rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 lg:mb-2">Account Number</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900 text-xl lg:text-3xl tracking-wider">823 4910023</p>
                    <button className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gray-100 lg:bg-white hover:bg-gray-200 lg:shadow-sm flex items-center justify-center text-[#3B3BFF] lg:text-[#3B3BFF] transition-colors">
                      <Copy size={18} className="lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>

                <div className="lg:bg-gray-50 lg:p-4 lg:rounded-2xl">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 lg:mb-2">Account Name</p>
                  <p className="font-bold text-gray-900 uppercase lg:text-lg">Olumide Adesayo / Rapid</p>
                </div>

                {/* Warning Card Desktop */}
                <div className="hidden lg:flex items-start gap-3 bg-red-50 text-red-600 p-4 rounded-2xl">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-xs leading-relaxed font-medium text-red-800">
                    Payments via bank transfer are usually credited within 1-5 minutes. Ensure the sender includes your reference if required.
                  </p>
                </div>

              </div>
            </div>

            {/* Payment Link Card Desktop */}
            <div className="hidden lg:flex items-center justify-between bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-0.5">Payment Link</h4>
                  <p className="text-sm text-gray-500">rapid.me/olumide_dev</p>
                </div>
              </div>
              <button className="text-[#3B3BFF] font-bold tracking-wide hover:opacity-80">Copy Link</button>
            </div>

          </div>

        </div>

        {/* Recent Incoming Transactions Desktop */}
        <div className="hidden lg:block w-full">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Incoming</h2>
              <p className="text-gray-500">Last 3 settlement transactions</p>
            </div>
            <button className="text-[#3B3BFF] font-bold flex items-center gap-2 hover:opacity-80">
              View History
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative">
              <div className="flex justify-between items-center mb-8">
                <span className="bg-blue-50 text-[#3B3BFF] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Settled</span>
                <span className="text-xs text-gray-500 font-medium">2h ago</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">₦45,000.00</h3>
              <p className="text-xs text-gray-500 uppercase">From: ADEWALE ...9021</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative">
              <div className="flex justify-between items-center mb-8">
                <span className="bg-blue-50 text-[#3B3BFF] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Settled</span>
                <span className="text-xs text-gray-500 font-medium">5h ago</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">₦12,500.00</h3>
              <p className="text-xs text-gray-500 uppercase">From: CHIDIMMA ...4410</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative">
              <div className="flex justify-between items-center mb-8">
                <span className="bg-blue-50 text-[#3B3BFF] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Settled</span>
                <span className="text-xs text-gray-500 font-medium">Yesterday</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">₦150,000.00</h3>
              <p className="text-xs text-gray-500 uppercase">From: RAPID GLOBAL</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
