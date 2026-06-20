import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, CreditCard, Building2 } from 'lucide-react'
import { fundWallet } from '../../../services/walletService'

export default function FundWallet() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('card')
  const [loading, setLoading] = useState(false)

  const handleFund = async () => {
    const parsedAmount = Number(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount to fund.')
      return
    }

    setLoading(true)
    try {
      await fundWallet({ amount: parsedAmount })
      alert('Wallet funded successfully!')
      navigate('/app/wallet')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to fund wallet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center justify-between bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Fund Wallet</h1>
          </div>
          <button className="text-gray-600 hidden">
            <ShoppingCart size={22} />
          </button>
        </div>

        <div className="px-5 md:px-8 w-full flex-1 flex flex-col pt-6 md:pt-8 md:pb-8">
          
          {/* Enter Amount */}
          <div className="mb-8 md:mb-10">
            <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-3 block">Enter Amount</label>
            <div className="bg-white md:bg-gray-50 rounded-2xl border border-gray-200 px-5 py-4 md:py-5 flex items-center gap-2 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
              <span className="text-[28px] md:text-[32px] font-bold text-gray-900">₦</span>
              <input 
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="text-[28px] md:text-[32px] font-bold text-gray-900 outline-none bg-transparent flex-1 placeholder-gray-300"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-8 md:mb-10">
            <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-3 block">Payment Method</label>
            <div className="flex flex-col gap-3">
              
              {/* Card */}
              <div 
                onClick={() => setMethod('card')}
                className={`bg-white rounded-2xl p-4 md:p-5 flex items-center justify-between cursor-pointer border-2 transition-all hover:shadow-md ${
                  method === 'card' ? 'border-[#4F46E5] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                    <CreditCard size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[13px] md:text-[14px]">Paystack / Debit Card</h4>
                    <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">Instant funding via card</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  method === 'card' ? 'border-[#4F46E5]' : 'border-gray-300'
                }`}>
                  {method === 'card' && <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full" />}
                </div>
              </div>

              {/* Bank Transfer */}
              <div 
                onClick={() => setMethod('bank')}
                className={`bg-white rounded-2xl p-4 md:p-5 flex items-center justify-between cursor-pointer border-2 transition-all hover:shadow-md ${
                  method === 'bank' ? 'border-[#4F46E5] shadow-sm' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
                    <Building2 size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[13px] md:text-[14px]">Bank Transfer</h4>
                    <p className="text-[11px] md:text-[12px] text-gray-500 mt-0.5">Fund via virtual account</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  method === 'bank' ? 'border-[#4F46E5]' : 'border-gray-300'
                }`}>
                  {method === 'bank' && <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full" />}
                </div>
              </div>

            </div>
          </div>

          {/* Proceed Button */}
          <div className="mt-auto pb-6 md:pb-0 md:mt-4">
            <button 
              onClick={handleFund}
              disabled={loading}
              className="w-full bg-[#4F46E5] text-white py-4 md:py-4.5 rounded-xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Proceed'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
