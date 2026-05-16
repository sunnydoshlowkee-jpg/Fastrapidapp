import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Send, ArrowDownLeft, PlusSquare, Phone, Globe, Receipt, Zap, ArrowUpRight, ArrowDown, Copy, Eye } from 'lucide-react'

export default function Wallet() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-12 relative overflow-x-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center justify-between w-full md:max-w-2xl md:mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <button className="text-gray-600 hover:opacity-80 transition-opacity">
          <ShoppingCart size={24} />
        </button>
      </div>

      <div className="px-4 w-full flex-1 md:max-w-2xl lg:max-w-7xl md:mx-auto lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-8">
        
        {/* Desktop Header (inside layout flow or handled by UserLayout, but let's add a local title for Desktop if needed) */}
        <div className="hidden lg:block lg:col-span-12 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Wallet Overview</h1>
        </div>

        {/* Left Column (Desktop) */}
        <div className="lg:col-span-8 flex flex-col">
          
          {/* Balance Card */}
          <div className="bg-[#3B3BFF] rounded-3xl p-6 lg:p-8 text-white mb-6 shadow-lg shadow-blue-500/20 relative overflow-hidden">
            <div className="flex justify-between items-start mb-2 lg:mb-6">
              <div className="flex items-center gap-2">
                <span className="text-blue-100 text-sm font-medium lg:text-base">Available Balance</span>
                <Eye size={16} className="text-blue-200 lg:hidden" />
              </div>
              <div className="hidden lg:flex bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm text-xs font-bold uppercase tracking-wider">
                Default
              </div>
              <div className="lg:hidden w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 lg:mb-12 tracking-tight">₦284,500.00</h2>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="bg-black/10 lg:bg-transparent rounded-2xl p-4 lg:p-0 flex items-center gap-2 backdrop-blur-sm lg:backdrop-blur-none border border-white/10 lg:border-none">
                <div className="hidden lg:block text-[10px] text-blue-200 font-bold uppercase tracking-wider mb-1">Virtual Account</div>
                <span className="text-sm font-medium text-blue-50 lg:text-base lg:font-bold">Wema Bank • 0123456789</span>
                <button className="text-blue-100 hover:text-white transition-colors p-1">
                  <Copy size={16} />
                </button>
              </div>
              <div className="hidden lg:flex w-12 h-12 bg-white/20 rounded-full items-center justify-center backdrop-blur-sm">
                <Zap size={20} className="fill-white" />
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-2xl lg:blur-3xl"></div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mb-8 lg:flex lg:gap-6">
            <button 
              onClick={() => navigate('/app/wallet/send')}
              className="bg-[#3B3BFF] text-white rounded-3xl lg:rounded-2xl p-4 lg:py-5 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors lg:flex-1"
            >
              <div className="w-12 h-12 lg:w-auto lg:h-auto rounded-2xl bg-white/20 lg:bg-transparent flex items-center justify-center text-white">
                <Send size={20} />
              </div>
              <span className="text-sm lg:text-lg font-bold">Send</span>
            </button>
            <button 
              onClick={() => navigate('/app/wallet/receive')}
              className="bg-white rounded-3xl lg:rounded-2xl p-4 lg:py-5 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 lg:flex-1"
            >
              <div className="w-12 h-12 lg:w-auto lg:h-auto rounded-2xl bg-orange-50 lg:bg-transparent flex items-center justify-center text-[#3B3BFF]">
                <ArrowDownLeft size={24} className="lg:w-6 lg:h-6" />
              </div>
              <span className="text-sm lg:text-lg font-bold text-gray-900">Receive</span>
            </button>
            <button 
              onClick={() => navigate('/app/wallet/fund')}
              className="bg-white rounded-3xl lg:rounded-2xl p-4 lg:py-5 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 lg:flex-1"
            >
              <div className="w-12 h-12 lg:w-auto lg:h-auto rounded-2xl bg-blue-50 lg:bg-transparent flex items-center justify-center text-[#3B3BFF]">
                <PlusSquare size={20} className="lg:w-6 lg:h-6" />
              </div>
              <span className="text-sm lg:text-lg font-bold text-gray-900">Fund</span>
            </button>
          </div>

          {/* Utility Services */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-xs lg:text-lg font-bold text-gray-500 lg:text-gray-900 tracking-wider uppercase lg:capitalize lg:tracking-normal mb-4 pl-1">
              <span className="lg:hidden">Utility Services</span>
              <span className="hidden lg:block">Quick Utilities</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <button className="bg-white rounded-3xl lg:rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100 flex lg:flex-col items-center lg:justify-center gap-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={20} className="lg:w-6 lg:h-6" />
                </div>
                <span className="font-bold text-gray-900 text-sm lg:text-xs lg:uppercase lg:tracking-widest">Airtime</span>
              </button>
              <button className="bg-white rounded-3xl lg:rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100 flex lg:flex-col items-center lg:justify-center gap-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-blue-50 flex items-center justify-center text-[#3B3BFF] shrink-0 group-hover:scale-110 transition-transform">
                  <Globe size={20} className="lg:w-6 lg:h-6" />
                </div>
                <span className="font-bold text-gray-900 text-sm lg:text-xs lg:uppercase lg:tracking-widest leading-tight text-left lg:text-center">Data</span>
              </button>
              <button 
                onClick={() => navigate('/app/wallet/pay-bills')}
                className="bg-white rounded-3xl lg:rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100 flex lg:flex-col items-center lg:justify-center gap-4 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Receipt size={20} className="lg:w-6 lg:h-6" />
                </div>
                <span className="font-bold text-gray-900 text-sm lg:text-xs lg:uppercase lg:tracking-widest leading-tight text-left lg:text-center">Bills</span>
              </button>
              <button className="bg-white rounded-3xl lg:rounded-2xl p-5 lg:p-8 shadow-sm border border-gray-100 flex lg:flex-col items-center lg:justify-center gap-4 hover:shadow-md transition-all group">
                <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0 group-hover:scale-110 transition-transform">
                  <Zap size={20} className="lg:w-6 lg:h-6" />
                </div>
                <span className="font-bold text-gray-900 text-sm lg:text-xs lg:uppercase lg:tracking-widest">Power</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Transaction History (Mobile flow + Desktop Sidebar) */}
          <div className="bg-transparent lg:bg-white lg:rounded-3xl lg:p-6 lg:shadow-sm lg:border lg:border-gray-100">
            <div className="flex items-center justify-between mb-4 pl-1 lg:pl-0">
              <h3 className="text-xs lg:text-lg font-bold text-gray-500 lg:text-gray-900 tracking-wider uppercase lg:capitalize lg:tracking-normal">
                <span className="lg:hidden">Transaction History</span>
                <span className="hidden lg:block">Recent Activity</span>
              </h3>
              <button className="text-[#3B3BFF] text-xs font-bold hover:opacity-80">View All</button>
            </div>
            
            <div className="flex flex-col gap-4">
            
            <button 
              onClick={() => navigate('/app/wallet/receipt/1')}
              className="bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-5 lg:p-2 lg:py-3 shadow-sm lg:shadow-none border border-gray-100 lg:border-none lg:border-b lg:border-gray-50 flex items-center justify-between hover:shadow-md lg:hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                  <ArrowDown size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 mb-0.5">Fund Wallet</h4>
                  <p className="text-xs text-gray-500 font-medium">Bank Transfer • 10:24 AM</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-green-600 mb-0.5">+ ₦ 15,000</span>
                <span className="lg:hidden text-[10px] font-bold text-green-500 uppercase tracking-wider">Completed</span>
              </div>
            </button>

            <button 
              onClick={() => navigate('/app/wallet/receipt/3')}
              className="bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-5 lg:p-2 lg:py-3 shadow-sm lg:shadow-none border border-gray-100 lg:border-none lg:border-b lg:border-gray-50 flex items-center justify-between hover:shadow-md lg:hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-[#3B3BFF] shrink-0">
                  <ArrowUpRight size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 mb-0.5">MTN Data</h4>
                  <p className="text-xs text-gray-500 font-medium">0803 234 5678 • 08:45 AM</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-900 mb-0.5">- ₦ 2,500</span>
                <span className="lg:hidden text-[10px] font-bold text-gray-500 uppercase tracking-wider">Debit</span>
              </div>
            </button>

            <button 
              onClick={() => navigate('/app/wallet/receipt/2')}
              className="bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-5 lg:p-2 lg:py-3 shadow-sm lg:shadow-none border border-gray-100 lg:border-none lg:border-b lg:border-gray-50 flex items-center justify-between hover:shadow-md lg:hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <Zap size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 mb-0.5">KEDC Prepaid</h4>
                  <p className="text-xs text-gray-500 font-medium">Meter #142234 • Yesterday</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-900 mb-0.5">- ₦ 5,000</span>
                <span className="lg:hidden text-[10px] font-bold text-gray-500 uppercase tracking-wider">Debit</span>
              </div>
            </button>

            <button 
              className="bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-5 lg:p-2 lg:py-3 shadow-sm lg:shadow-none border border-gray-100 lg:border-none lg:border-b lg:border-gray-50 flex items-center justify-between hover:shadow-md lg:hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
                  <ShoppingCart size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900 mb-0.5">Jumia Order</h4>
                  <p className="text-xs text-gray-500 font-medium">Order #4421 • Oct 12</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-bold text-gray-900">- ₦ 12,400</span>
              </div>
            </button>

          </div>
        </div>

        {/* Pro Tip Card (Desktop Only) */}
        <div className="hidden lg:block bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50">
          <p className="text-[10px] font-bold text-[#3B3BFF] uppercase tracking-widest mb-2">Pro Tip</p>
          <p className="font-bold text-gray-900 text-sm leading-relaxed mb-4">Refer a friend and earn ₦500 on their first fund.</p>
          <button 
            onClick={() => navigate('/app/profile/refer-earn')}
            className="w-full py-3 rounded-xl border border-blue-200 text-[#3B3BFF] font-bold text-sm hover:bg-blue-50 transition-colors"
          >
            Share Link
          </button>
        </div>

        </div>

      </div>
    </div>
  )
}
