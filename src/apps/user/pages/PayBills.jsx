import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, HelpCircle, User, Phone, Globe } from 'lucide-react'

export default function PayBills() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Airtime')
  const [provider, setProvider] = useState('MTN')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('3000')

  const providers = [
    { id: 'MTN', color: 'bg-[#FFCC00]', textColor: 'text-black' },
    { id: 'Airtel', color: 'bg-[#FF0000]', textColor: 'text-white' },
    { id: 'Glo', color: 'bg-[#009900]', textColor: 'text-white' },
    { id: '9mobile', color: 'bg-[#006600]', textColor: 'text-white' }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-8 relative overflow-x-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center justify-between md:max-w-md md:mx-auto w-full">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-900 w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Pay Bills</h1>
        </div>
        <button className="text-gray-900 hover:opacity-80 transition-opacity">
          <HelpCircle size={24} />
        </button>
      </div>

      <div className="px-4 md:max-w-2xl lg:max-w-7xl md:mx-auto w-full flex-1 pt-4 lg:pt-8 flex flex-col lg:px-8">
        
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Bills Payment</h1>
            <p className="text-gray-500">Quick recharge and data bundle top-up</p>
          </div>
          <div className="bg-white rounded-full p-1.5 flex gap-2 shadow-sm border border-gray-100 w-72">
            {['Airtime', 'Data Bundle'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
                  tab === t 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 flex-1">

          {/* Left Column (Desktop) */}
          <div className="lg:col-span-7 flex flex-col bg-transparent lg:bg-white lg:rounded-[2rem] lg:p-8 lg:shadow-sm lg:border lg:border-gray-100">

            {/* Mobile Tabs */}
            <div className="lg:hidden bg-gray-100 rounded-2xl p-1.5 flex gap-2 mb-8">
              {['Airtime', 'Data Bundle'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
                    tab === t 
                      ? 'bg-white text-[#3B3BFF] shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Providers */}
            <div className="mb-6 lg:mb-8">
              <label className="block text-xs lg:text-lg lg:capitalize lg:tracking-normal font-bold text-gray-500 lg:text-gray-900 uppercase tracking-wider mb-4">Service Provider</label>
              <div className="flex justify-between px-2 lg:px-0 lg:gap-8 lg:justify-start">
            {providers.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-2">
                <button 
                  onClick={() => setProvider(p.id)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold transition-transform ${p.color} ${p.textColor} ${provider === p.id ? 'ring-4 ring-[#3B3BFF] ring-offset-2 scale-110' : 'hover:scale-105'}`}
                >
                  {p.id}
                </button>
                <span className="text-[10px] font-bold text-gray-600">{p.id}</span>
              </div>
            ))}
          </div>
        </div>

            {/* Phone Number */}
            <div className="mb-6 lg:mb-8">
              <label className="block text-xs lg:text-sm font-bold text-gray-500 lg:text-gray-900 uppercase lg:capitalize lg:tracking-normal tracking-wider mb-3 lg:mb-2">Recipient Phone Number</label>
              <div className="relative">
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white lg:bg-gray-50/50 border border-gray-100 lg:border-gray-200 rounded-2xl pl-4 pr-12 py-4 lg:py-5 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:border-[#3B3BFF] focus:outline-none transition-all shadow-sm lg:shadow-none"
                  placeholder="0803 000 0000"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3B3BFF]">
                  <User size={20} />
                </button>
              </div>
            </div>

            {/* Data Plan Dropdown (If Data Bundle selected) */}
            {tab === 'Data Bundle' && (
              <div className="mb-6 lg:mb-8">
                <label className="block text-xs lg:text-sm font-bold text-gray-500 lg:text-gray-900 uppercase lg:capitalize lg:tracking-normal tracking-wider mb-3 lg:mb-2">Select Data Plan</label>
                <select className="w-full bg-white lg:bg-gray-50/50 border border-gray-100 lg:border-gray-200 rounded-2xl px-4 py-4 lg:py-5 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:border-[#3B3BFF] focus:outline-none transition-all shadow-sm lg:shadow-none appearance-none cursor-pointer">
                  <option>Monthly 10GB - ₦3,000</option>
                  <option>Monthly 20GB - ₦5,000</option>
                  <option>Weekly 2GB - ₦500</option>
                </select>
              </div>
            )}

            {/* Amount */}
            <div className="mb-6 lg:mb-8">
              <label className="block text-xs lg:text-sm font-bold text-gray-500 lg:text-gray-900 uppercase lg:capitalize lg:tracking-normal tracking-wider mb-3 lg:mb-2">Amount</label>
              <div className="bg-white lg:bg-gray-50/50 rounded-2xl p-4 lg:px-6 lg:py-5 shadow-sm lg:shadow-none border border-gray-100 lg:border-gray-200 flex items-center gap-2">
                <span className="text-xl lg:text-2xl font-bold text-[#3B3BFF] lg:text-gray-900">₦</span>
                <input 
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-2xl lg:text-3xl font-bold text-[#3B3BFF] lg:text-gray-900 placeholder-gray-300 bg-transparent border-none focus:outline-none p-0"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Recent Amounts */}
            <div className="mb-8 lg:mb-12">
              <label className="block text-xs lg:text-sm font-bold text-gray-500 lg:hidden tracking-wider mb-3">Recent Amounts</label>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {['₦500', '₦1,000', '₦2,000', '₦3,000'].map((amt) => (
                  <button 
                    key={amt}
                    onClick={() => setAmount(amt.replace(/\D/g, ''))}
                    className={`font-bold py-3 px-6 rounded-xl text-sm transition-colors shrink-0 ${amount === amt.replace(/\D/g, '') ? 'bg-white border-2 border-[#3B3BFF] text-[#3B3BFF]' : 'bg-gray-100 lg:bg-gray-50 lg:border lg:border-gray-200 hover:bg-gray-200 text-gray-900'}`}
                  >
                    {amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Pay Button */}
            <div className="mt-auto lg:mt-0">
              <button 
                onClick={() => navigate('/app/wallet/receipt/4')}
                className="w-full bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-colors lg:text-lg flex justify-center items-center gap-2"
              >
                Pay ₦{parseInt(amount || 0).toLocaleString()}
                <span className="hidden lg:inline">→</span>
              </button>
            </div>

          </div>

          {/* Right Column (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-6">
            
            {/* Small Balance Card */}
            <div className="bg-[#3B3BFF] rounded-3xl p-8 text-white shadow-lg shadow-blue-500/20">
              <div className="text-blue-100 text-sm font-medium mb-2">Available Balance</div>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">₦1,240,500.00</h2>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Tier 3 Verified Account
              </div>
            </div>

            {/* Recent History */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent History</h3>
                <button className="text-[#3B3BFF] text-sm font-bold uppercase tracking-wider hover:opacity-80">See All</button>
              </div>
              <div className="flex flex-col gap-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#3B3BFF] shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">MTN Data Purchase</h4>
                      <p className="text-xs text-gray-500">Oct 24, 2:30 PM • 0803 222 1111</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-500">-₦3,500</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Airtel Airtime</h4>
                      <p className="text-xs text-gray-500">Oct 22, 10:15 AM • 0901 000 0000</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-500">-₦1,000</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Glo Data Purchase</h4>
                      <p className="text-xs text-gray-500">Oct 20, 5:45 PM • 0705 444 3333</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-500">-₦1,500</span>
                </div>

              </div>
            </div>

            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 relative overflow-hidden text-white flex flex-col justify-end min-h-[160px]">
              <div className="absolute inset-0 opacity-20 text-[100px] font-black leading-none uppercase -left-4 top-0 text-white mix-blend-overlay">
                PROMO SAFE WORK
              </div>
              <div className="relative z-10">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">Offer</span>
                <h3 className="text-xl font-bold leading-tight">Get 5% Cashback on all Data purchases this weekend.</h3>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
