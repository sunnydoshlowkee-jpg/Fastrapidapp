import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Share2 } from 'lucide-react'

export default function ReferEarn() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-12 relative overflow-x-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center w-full gap-3">
        <button onClick={() => navigate(-1)} className="text-[#3B3BFF] w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Refer & Earn</h1>
      </div>

      <div className="px-4 lg:px-8 max-w-6xl mx-auto w-full flex-1 flex flex-col items-center lg:items-stretch lg:pt-8">
        
        {/* Desktop Title Header (Hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-between w-full mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Refer & Earn</h1>
        </div>

        {/* Hero Image / Banner */}
        <div className="w-full max-w-sm lg:max-w-none rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden mb-6 mt-2 lg:mt-0 shadow-sm relative lg:h-80 group">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
            alt="Refer a friend" 
            className="w-full h-64 lg:h-full object-cover lg:object-center group-hover:scale-105 transition-transform duration-700"
          />
          {/* Desktop Overlay Content */}
          <div className="hidden lg:flex absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent p-12 flex-col justify-center text-white">
            <div className="bg-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block w-max mb-6">
              Exclusive Rewards
            </div>
            <h2 className="text-5xl font-bold mb-4 tracking-tight leading-tight max-w-xl">
              Share the speed,<br/>get rewarded.
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
              Invite your friends to RAPID. When they complete their first order, you both get ₦500 in your wallet.
            </p>
            <button className="bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl w-max flex items-center gap-2 transition-colors">
              Get Started Now <ArrowLeft className="rotate-180 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Text Details (Hidden on Desktop) */}
        <div className="lg:hidden text-center mb-8 px-4 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Gift ₦500, Get ₦500</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Your friend gets ₦500 off their first order. You get ₦500 when they complete it.
          </p>
        </div>

        {/* Desktop Grid Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          
          {/* Column 1: Referral Code & Actions */}
          <div className="flex flex-col gap-6">
            
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="hidden lg:block mb-6">
                <h3 className="font-bold text-gray-900 text-xl mb-1">Your Referral Code</h3>
                <p className="text-gray-500 text-sm">Share this unique code with your network to start earning.</p>
              </div>
              <p className="lg:hidden text-xs font-bold text-gray-500 tracking-wider mb-3">YOUR REFERRAL CODE</p>
              
              <div className="bg-gray-50 border border-gray-200 lg:border-dashed lg:border-2 rounded-2xl p-4 lg:p-5 flex items-center justify-between mb-6">
                <span className="font-mono font-bold text-lg lg:text-2xl text-[#3B3BFF] tracking-widest">RAPID-X88B2</span>
                <button className="text-[#3B3BFF] hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 font-bold text-sm">
                  <Copy size={20} />
                  <span className="hidden lg:inline-block">COPY</span>
                </button>
              </div>

              <button className="w-full bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors lg:shadow-lg lg:shadow-blue-500/20 mb-4">
                <Share2 size={20} />
                Share My Code
              </button>

              {/* Social Buttons (Desktop only or shown on mobile as well) */}
              <div className="hidden lg:flex items-center gap-4">
                <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 py-3 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/></svg>
                </button>
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-[#1877F2] py-3 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
              </div>
            </div>

            {/* Desktop 3 Steps Card */}
            <div className="hidden lg:grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center border border-gray-100">
                <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#3B3BFF] flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Send Invite</h4>
                <p className="text-[10px] text-gray-500">Share your link or code with friends.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center border border-gray-100">
                <div className="w-10 h-10 mx-auto rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Friend Orders</h4>
                <p className="text-[10px] text-gray-500">They make their first purchase on RAPID.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm text-center border border-gray-100">
                <div className="w-10 h-10 mx-auto rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Both Earn</h4>
                <p className="text-[10px] text-gray-500">Wallet credited instantly after order completion.</p>
              </div>
            </div>

          </div>

          {/* Column 2: Stats & Successes */}
          <div className="flex flex-col gap-6">
            
            {/* Dark Earnings Card */}
            <div className="bg-[#1C1C28] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl shadow-gray-900/20">
              <div className="absolute top-6 right-6 opacity-20">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div className="relative z-10">
                <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1">Lifetime Earnings</p>
                <p className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">₦6,000</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Referrals</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Pending</p>
                    <p className="text-xl font-bold">4</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#3B3BFF] blur-[60px] opacity-20 rounded-full"></div>
            </div>

            {/* Mobile Stats Grid (Hidden on Desktop) */}
            <div className="lg:hidden w-full grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
                <p className="text-xs font-medium text-gray-500 mb-1">Successful Refers</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5 shadow-sm border border-blue-100 flex flex-col justify-center">
                <p className="text-xs font-medium text-[#3B3BFF] mb-1">Earnings</p>
                <p className="text-2xl font-bold text-[#3B3BFF]">₦6,000</p>
              </div>
            </div>

            {/* Recent Successes (Desktop Only) */}
            <div className="hidden lg:block bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Recent Successes</h3>
                <button className="text-[#3B3BFF] text-xs font-bold">View All</button>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { name: "Chukwudi O.", status: "Completed 1st order", amount: "+₦500", highlight: true },
                  { name: "Amina J.", status: "Completed 1st order", amount: "+₦500", highlight: true },
                  { name: "Tunde W.", status: "Signed up", amount: "Pending order", highlight: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.status}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold ${item.highlight ? 'text-green-500' : 'text-gray-400'}`}>
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Desktop Banner */}
        <div className="hidden lg:flex w-full bg-blue-50/50 rounded-3xl p-6 items-center justify-between border border-blue-100">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#3B3BFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 rotate-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Join the Rapid Elite Circle</h3>
              <p className="text-gray-500 text-sm">Refer 20 friends to unlock Elite Merchant perks, including 0% delivery fees for a month.</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex -space-x-2 mb-2">
              <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" />
              <img src="https://i.pravatar.cc/100?img=2" className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" />
              <img src="https://i.pravatar.cc/100?img=3" className="w-8 h-8 rounded-full border-2 border-white bg-gray-100" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500 z-10">+8k</div>
            </div>
            <p className="text-[#3B3BFF] text-xs font-bold tracking-wider uppercase">8,421 users joined this week</p>
          </div>
        </div>

        {/* Mobile Action Buttons (Hidden on Desktop) */}
        <div className="w-full mt-auto lg:hidden">
          <button className="w-full text-center text-xs text-gray-500 font-medium hover:text-gray-700 transition-colors py-2">
            Terms and Conditions apply
          </button>
        </div>

      </div>
    </div>
  )
}
