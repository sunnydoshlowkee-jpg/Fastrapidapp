import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

export default function PaymentMethods() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">Payment Methods</h1>
        </div>
      </div>

      <div className="flex-1 px-6 w-full max-w-md mx-auto pt-2 flex flex-col">
        
        {/* Top Banner */}
        <div className="bg-[#F8F9FA] rounded-[24px] p-6 mb-8 border border-gray-100 relative overflow-hidden">
          <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2 relative z-10">Secure Payments</p>
          <h2 className="text-xl font-bold text-gray-900 leading-tight w-3/4 relative z-10">Manage your digital wallet and card preferences.</h2>
          {/* Abstract card graphic */}
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Saved Cards</h3>
          <button className="text-[#4F46E5] text-[13px] font-bold">
            [ Add New Card ]
          </button>
        </div>

        {/* Cards List */}
        <div className="flex flex-col gap-4 mb-10">
          
          <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 flex-shrink-0">
                <div className="w-6 h-6 flex relative">
                  <div className="w-4 h-4 bg-red-500 rounded-full absolute left-0 mix-blend-multiply"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full absolute right-0 mix-blend-multiply"></div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">Mastercard</h4>
                <p className="text-[11px] text-gray-500">XXXX 4122</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#4F46E5]">Default</span>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 flex-shrink-0">
                <span className="font-bold text-blue-900 text-xs italic">VISA</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">Visa</h4>
                <p className="text-[11px] text-gray-500">XXXX 8829</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>

          <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center border border-gray-900 flex-shrink-0 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM11.16 7.21C11.16 7.21 11.5 6.32 12.35 6C12.35 6 12.92 7.15 12.02 7.79C12.02 7.79 11.43 8.35 11.16 7.21ZM13.88 8.44C13.88 8.44 14.16 11.2 12.18 12.37C12.18 12.37 9.8 13.78 9.39 16.14C9.39 16.14 8.68 13.68 10.59 11.75C10.59 11.75 12.63 9.49 13.88 8.44Z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">Apple Pay</h4>
                <p className="text-[11px] text-gray-500">Connected</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-auto relative w-full h-[120px] rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
          <img src="/grocery-hero.png" alt="Lagos" className="w-full h-full object-cover filter brightness-50 sepia-[.3]" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent flex flex-col justify-end p-5">
            <h4 className="text-white font-bold text-[13px] mb-0.5">Secure Local Processing</h4>
            <p className="text-gray-300 text-[9px] uppercase tracking-widest font-bold">Optimized for Lagos</p>
          </div>
        </div>

      </div>

    </div>
  )
}
