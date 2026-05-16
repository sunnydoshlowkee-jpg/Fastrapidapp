import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserSquare2, AlertCircle, Delete, ScanFace } from 'lucide-react'

export default function SendMoney() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('rapid')
  const [amount, setAmount] = useState('350000')
  const [recipient, setRecipient] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [pin, setPin] = useState('')

  const balance = 284500
  const isInsufficient = parseInt(amount || 0) > balance

  const handleKeyClick = (key) => {
    if (key === 'backspace') {
      setPin(prev => prev.slice(0, -1))
    } else if (pin.length < 4) {
      const newPin = pin + key
      setPin(newPin)
      if (newPin.length === 4) {
        // Mock success, go to receipt after a tiny delay
        setTimeout(() => navigate('/app/wallet/receipt/5'), 500)
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-8 relative overflow-x-hidden">
      
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center md:max-w-md md:mx-auto w-full gap-4">
        <button onClick={() => navigate(-1)} className="text-gray-900 w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Send Money</h1>
      </div>

      <div className="px-4 md:max-w-2xl lg:max-w-7xl md:mx-auto w-full flex-1 pt-4 lg:pt-8 flex flex-col lg:px-8">
        
        {/* Desktop Header & Warning Banner */}
        <div className="hidden lg:flex items-center gap-2 mb-2 text-sm">
          <button onClick={() => navigate('/app/wallet')} className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Wallet</button>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-bold">Send Money</span>
        </div>
        
        <div className="hidden lg:block mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Send Money</h1>
          <p className="text-gray-500">Transfer funds securely to any bank or wallet.</p>
        </div>

        {isInsufficient && (
          <div className="hidden lg:flex bg-red-50 border border-red-100 rounded-2xl p-6 items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="text-red-700 font-bold text-lg mb-1">Insufficient Funds</h3>
              <p className="text-red-600 text-sm">Your current balance is <span className="font-bold">₦234,500</span>. Please fund your wallet to complete this transaction of ₦350,000.</p>
            </div>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 flex-1">
          
          {/* Left Column (Desktop) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Mobile Toggle Tabs */}
            <div className="lg:hidden bg-gray-100 rounded-2xl p-1.5 flex gap-2 mb-8">
          <button
            onClick={() => setTab('rapid')}
            className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all ${
              tab === 'rapid' 
                ? 'bg-white text-[#3B3BFF] shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            To Rapid User
          </button>
          <button
            onClick={() => setTab('bank')}
            className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all ${
              tab === 'bank' 
                ? 'bg-white text-[#3B3BFF] shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            To Bank Account
              </button>
            </div>

            <div className="hidden lg:block bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex-1">
              
              {/* Recipient Box Desktop */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-gray-900">Recipient Information</label>
                  <button className="text-[#3B3BFF] text-sm font-bold hover:underline">Select from Favorites</button>
                </div>
                
                <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#3B3BFF]">
                      <UserSquare2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">Chukwudi Eze</h4>
                      <p className="text-xs text-gray-500">Kuda Microfinance Bank • 2039485761</p>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
              </div>

              {/* Amount Box Desktop */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-4">Enter Amount</label>
                <div className={`rounded-2xl p-6 lg:py-8 lg:px-8 border ${isInsufficient ? 'bg-red-50/50 border-red-200' : 'bg-gray-50/50 border-gray-100'} flex items-center justify-between`}>
                  <div className="flex items-center gap-2 w-full">
                    <span className={`text-4xl lg:text-5xl font-bold ${isInsufficient ? 'text-red-600' : 'text-gray-900'}`}>₦</span>
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={`w-full text-5xl lg:text-6xl font-bold ${isInsufficient ? 'text-red-600' : 'text-gray-900'} placeholder-gray-300 bg-transparent border-none focus:outline-none p-0`}
                      placeholder="0"
                    />
                  </div>
                  {isInsufficient && (
                    <span className="hidden lg:block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0 ml-4">Over Limit</span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-gray-400">Transaction Fee: ₦150.00</span>
                  <span className={`font-bold ${isInsufficient ? 'text-red-500' : 'text-green-500'}`}>Available: ₦234,500.00</span>
                </div>
              </div>

              {/* Note Desktop */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Note (Optional)</label>
                <input 
                  type="text"
                  className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-6 py-5 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:outline-none transition-all"
                  placeholder="What is this for?"
                />
              </div>

            </div>

            {/* Mobile Form View */}
            <div className="lg:hidden">
              {/* Recipient */}
              <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recipient</label>
          <div className="relative">
            <input 
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-gray-100/80 border-none rounded-2xl pl-4 pr-12 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#3B3BFF]/20 focus:outline-none transition-all"
              placeholder="@username or phone number"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3B3BFF]">
              <UserSquare2 size={20} />
            </button>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Amount</label>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-900">₦</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-5xl font-bold text-gray-900 placeholder-gray-300 bg-transparent border-none focus:outline-none p-0"
              placeholder="0"
            />
          </div>

          {/* Warning Banner */}
          {isInsufficient && (
            <div className="bg-orange-50 text-orange-600 rounded-xl p-3 flex items-center justify-center gap-2 mb-6">
              <AlertCircle size={16} />
              <span className="text-xs font-bold">Insufficient Funds (Balance: ₦284,500)</span>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100/80 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Fee</p>
            <p className="font-bold text-gray-900">₦0.00</p>
          </div>
          <div className="bg-gray-100/80 rounded-2xl p-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Estimated Arrival</p>
            <p className="font-bold text-gray-900">Instant</p>
          </div>
        </div>

              </div>
            </div> {/* End Left Column */}

          {/* Right Column (Desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-6">
            
            {/* Summary Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Summary</h3>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between items-center text-gray-500 font-medium">
                  <span>Amount</span>
                  <span className="text-gray-900 font-bold">₦350,000.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-medium">
                  <span>Fee</span>
                  <span className="text-gray-900 font-bold">₦150.00</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full mb-6"></div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-900 font-bold text-sm">Total Payable</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">₦350,150.00</span>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-colors text-lg flex justify-center items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Fund Wallet
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 rounded-xl transition-colors">
                  Cancel
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400 font-bold tracking-widest uppercase">
                Secured by Rapid Vault
              </div>
            </div>

            {/* Transfer Shortcuts */}
            <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="font-bold text-white mb-6 relative z-10">Transfer Shortcuts</h3>
              
              <div className="flex flex-col gap-4 mb-8 relative z-10">
                <div className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                    <UserSquare2 size={18} className="text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-200 text-sm">Fatima B.</span>
                </div>
                <div className="flex items-center gap-4 cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                    <UserSquare2 size={18} className="text-gray-400" />
                  </div>
                  <span className="font-medium text-gray-200 text-sm">David O.</span>
                </div>
              </div>

              <button className="text-[#3B3BFF] text-xs font-bold uppercase tracking-wider hover:text-blue-400 transition-colors flex items-center gap-2 relative z-10">
                View All Contacts
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>

          </div> {/* End Right Column */}

        </div> {/* End Grid */}

      </div> {/* End Main Content Container */}

      {/* Auth Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center md:items-center p-0 md:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full h-[85vh] md:h-auto md:max-w-sm rounded-t-[2rem] md:rounded-3xl p-6 flex flex-col animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 relative">
            
            {/* Handle bar */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8 cursor-pointer" onClick={() => setShowModal(false)}></div>
            
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Authorize Payment</h2>
              <p className="text-gray-500 text-sm">Confirm transaction of ₦5,020.00</p>
            </div>

            {/* PIN Dots */}
            <div className="flex justify-center gap-4 mb-12">
              {[0, 1, 2, 3].map(i => (
                <div 
                  key={i} 
                  className={`w-4 h-4 rounded-full transition-colors ${
                    i < pin.length ? 'bg-[#3B3BFF] ring-4 ring-blue-100' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-y-8 gap-x-6 px-4 mb-8 mt-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button 
                  key={num}
                  onClick={() => handleKeyClick(num.toString())}
                  className="text-3xl font-bold text-gray-900 h-16 flex items-center justify-center hover:bg-gray-50 rounded-2xl transition-colors active:bg-gray-100"
                >
                  {num}
                </button>
              ))}
              
              {/* Face ID / Biometrics */}
              <button className="h-16 flex items-center justify-center text-[#3B3BFF] hover:bg-gray-50 rounded-2xl transition-colors active:bg-gray-100">
                <ScanFace size={28} />
              </button>
              
              <button 
                onClick={() => handleKeyClick('0')}
                className="text-3xl font-bold text-gray-900 h-16 flex items-center justify-center hover:bg-gray-50 rounded-2xl transition-colors active:bg-gray-100"
              >
                0
              </button>
              
              {/* Backspace */}
              <button 
                onClick={() => handleKeyClick('backspace')}
                className="h-16 flex items-center justify-center text-red-500 hover:bg-gray-50 rounded-2xl transition-colors active:bg-gray-100"
              >
                <Delete size={28} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
