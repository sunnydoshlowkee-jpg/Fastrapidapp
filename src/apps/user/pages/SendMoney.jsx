import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, AlertCircle, Delete } from 'lucide-react'

export default function SendMoney() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('rapid')
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('350000')
  const [showPin, setShowPin] = useState(false)
  const [pin, setPin] = useState('')

  const balance = 284500
  const numAmount = parseInt(amount) || 0
  const insufficient = numAmount > balance

  const handlePinPress = (val) => {
    if (val === 'delete') {
      setPin(prev => prev.slice(0, -1))
    } else if (pin.length < 4) {
      setPin(prev => prev + val)
    }
  }

  if (showPin) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
          {/* Header */}
          <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
            <button onClick={() => setShowPin(false)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Send Money</h1>
          </div>

          <div className="flex-1 flex flex-col pt-6 md:pt-8 md:pb-8">
            {/* Tabs (dimmed) */}
            <div className="px-5 md:px-8 w-full mb-6">
              <div className="flex bg-[#F0F0F5] p-1 rounded-xl">
                <div className="flex-1 py-2 text-center text-[12px] font-semibold text-gray-400 rounded-lg">To Rapid User</div>
                <div className="flex-1 py-2 text-center text-[12px] font-semibold text-gray-400 rounded-lg">To Bank Account</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-8 w-full">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">Authorize Payment</h2>
              <p className="text-[13px] text-gray-500 mb-8">Confirm transaction of ₦{numAmount.toLocaleString()}.00</p>

              {/* PIN Dots */}
              <div className="flex gap-4 mb-10">
                {[0, 1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 rounded-full transition-all ${
                      i < pin.length ? 'bg-[#4F46E5] scale-110' : 'bg-gray-200'
                    }`} 
                  />
                ))}
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '#', 0, 'delete'].map(key => (
                  <button 
                    key={key}
                    onClick={() => key !== '#' && handlePinPress(key === 'delete' ? 'delete' : String(key))}
                    className={`h-14 md:h-16 rounded-xl flex items-center justify-center text-[22px] md:text-[24px] font-semibold transition-all hover:bg-gray-50 active:scale-95 ${
                      key === 'delete' 
                        ? 'text-red-500' 
                        : key === '#' 
                          ? 'text-gray-300 pointer-events-none' 
                          : 'text-gray-900'
                    }`}
                  >
                    {key === 'delete' ? <Delete size={24} className="text-red-400" /> : key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Send Money</h1>
        </div>

        <div className="px-5 md:px-8 w-full flex-1 flex flex-col pt-4 md:pt-8 md:pb-8">
          
          {/* Tab Switcher */}
          <div className="flex bg-[#F0F0F5] p-1 rounded-xl mb-6">
            <button 
              onClick={() => setTab('rapid')}
              className={`flex-1 py-2.5 md:py-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all ${
                tab === 'rapid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              To Rapid User
            </button>
            <button 
              onClick={() => setTab('bank')}
              className={`flex-1 py-2.5 md:py-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all ${
                tab === 'bank' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              To Bank Account
            </button>
          </div>

          {/* Recipient */}
          <div className="mb-6">
            <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 block">Recipient</label>
            <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
              <input 
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="@username or phone number"
                className="flex-1 text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
              />
              <User size={18} className="text-[#4F46E5] md:w-5 md:h-5" />
            </div>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 block">Amount</label>
            <div className={`bg-white md:bg-gray-50 rounded-xl border px-5 py-4 flex items-center gap-2 focus-within:ring-2 transition-all ${
              insufficient ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-50' : 'border-gray-200 focus-within:border-[#4F46E5] focus-within:ring-indigo-50'
            }`}>
              <span className={`text-[28px] md:text-[32px] font-bold ${insufficient ? 'text-red-500' : 'text-gray-900'}`}>₦</span>
              <input 
                type="text"
                value={numAmount.toLocaleString()}
                onChange={(e) => setAmount(e.target.value.replace(/,/g, ''))}
                className={`text-[28px] md:text-[32px] font-bold outline-none bg-transparent flex-1 ${
                  insufficient ? 'text-red-500' : 'text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Insufficient Funds Warning */}
          {insufficient && (
            <div className="flex items-center gap-2 mb-6 px-1">
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-[12px] text-red-500 font-medium">Insufficient Funds (Balance: ₦{balance.toLocaleString()})</span>
            </div>
          )}

          {/* Fee & ETA */}
          <div className="flex gap-3 mb-8 md:mb-10 mt-2">
            <div className="flex-1 bg-white md:bg-gray-50 rounded-xl border border-gray-200 p-3.5 md:p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Fee</p>
              <p className="font-bold text-gray-900 text-[14px] md:text-[15px]">₦0.00</p>
            </div>
            <div className="flex-1 bg-white md:bg-gray-50 rounded-xl border border-gray-200 p-3.5 md:p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Estimated Arrival</p>
              <p className="font-bold text-gray-900 text-[14px] md:text-[15px]">Instant</p>
            </div>
          </div>

          {/* Review Transfer Button */}
          <div className="mt-auto pb-6 md:pb-0">
            <button 
              onClick={() => setShowPin(true)}
              disabled={insufficient || !amount}
              className={`w-full py-4 md:py-4.5 rounded-xl font-bold text-[15px] md:text-[16px] transition-all ${
                insufficient || !amount
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98]'
              }`}
            >
              Review Transfer
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
