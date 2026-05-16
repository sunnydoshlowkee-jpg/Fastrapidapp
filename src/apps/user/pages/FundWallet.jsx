import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, CreditCard, Landmark, HelpCircle } from 'lucide-react'

export default function FundWallet() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('0.00')
  const [method, setMethod] = useState('card')

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-8 relative">
      
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center justify-between md:max-w-md md:mx-auto w-full">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-900 w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Fund Wallet</h1>
        </div>
        <button className="text-[#3B3BFF] hover:opacity-80 transition-opacity">
          <ShoppingCart size={24} />
        </button>
      </div>

      <div className="px-4 md:max-w-2xl lg:max-w-4xl md:mx-auto w-full flex-1 pt-6 lg:pt-8 flex flex-col">
        
        {/* Desktop Breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 mb-8 text-sm">
          <button onClick={() => navigate('/app/wallet')} className="text-gray-500 hover:text-gray-900 font-medium transition-colors">Wallet</button>
          <span className="text-gray-400">›</span>
          <span className="text-[#3B3BFF] font-bold">Fund Wallet</span>
        </div>

        {/* Content Card (Desktop) */}
        <div className="lg:bg-white lg:rounded-[2rem] lg:p-12 lg:shadow-sm lg:border lg:border-gray-100 lg:max-w-2xl lg:mx-auto lg:w-full">
          
          {/* Amount Input */}
          <div className="mb-8">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Enter Amount</label>
          <div className="bg-white lg:bg-gray-50/50 rounded-2xl p-6 lg:p-8 shadow-sm lg:shadow-none border border-gray-100 flex items-center gap-2">
            <span className="text-3xl lg:text-4xl font-bold text-gray-900">₦</span>
            <input 
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-4xl lg:text-5xl font-bold text-gray-900 placeholder-gray-300 bg-transparent border-none focus:outline-none p-0"
              placeholder="0.00"
            />
            {/* Quick Amounts Desktop */}
            <div className="hidden lg:flex gap-2">
              <button onClick={() => setAmount('5000')} className="bg-gray-200/50 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-full text-sm transition-colors">+5,000</button>
              <button onClick={() => setAmount('10000')} className="bg-gray-200/50 hover:bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-full text-sm transition-colors">+10,000</button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Method</label>
          
          <div className="flex flex-col gap-4">
            
            {/* Paystack / Card */}
            <label className={`relative rounded-2xl p-5 border-2 flex items-center justify-between cursor-pointer transition-all ${method === 'card' ? 'border-[#3B3BFF] bg-white lg:bg-[#F8F9FF]' : 'border-gray-100 bg-white lg:bg-gray-50/50 hover:border-blue-200'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#3B3BFF]">
                  <CreditCard size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 lg:text-lg">Paystack / Debit Card</span>
                    <span className="lg:hidden bg-orange-500 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Recommended</span>
                  </div>
                  <p className="text-sm text-gray-500">Mastercard, Visa, Verve <span className="hidden lg:inline"> • <span className="text-[#3B3BFF] font-bold">Instant</span></span></p>
                </div>
              </div>
              <input 
                type="radio" 
                name="method" 
                value="card" 
                checked={method === 'card'}
                onChange={() => setMethod('card')}
                className="hidden"
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'card' ? 'border-[#3B3BFF]' : 'border-gray-300'}`}>
                {method === 'card' && <div className="w-3 h-3 rounded-full bg-[#3B3BFF]" />}
              </div>
            </label>

            {/* Bank Transfer */}
            <label className={`relative rounded-2xl p-5 border-2 flex items-center justify-between cursor-pointer transition-all ${method === 'transfer' ? 'border-[#3B3BFF] bg-white lg:bg-[#F8F9FF]' : 'border-gray-100 bg-white lg:bg-gray-50/50 hover:border-blue-200'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-600">
                  <Landmark size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 lg:text-lg">Bank Transfer</h4>
                  <p className="text-sm text-gray-500">GTBank, Zenith, Kuda <span className="hidden lg:inline"> • 2-5 mins</span></p>
                </div>
              </div>
              <input 
                type="radio" 
                name="method" 
                value="transfer" 
                checked={method === 'transfer'}
                onChange={() => setMethod('transfer')}
                className="hidden"
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'transfer' ? 'border-[#3B3BFF]' : 'border-gray-300'}`}>
                {method === 'transfer' && <div className="w-3 h-3 rounded-full bg-[#3B3BFF]" />}
              </div>
            </label>

          </div>
        </div>

        {/* Desktop Specific Fees (visible only lg) */}
        <div className="hidden lg:flex flex-col gap-4 bg-gray-50/50 rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center text-gray-500 font-medium">
            <span>Transaction Fee</span>
            <span className="text-gray-900 font-bold">₦ 0.00</span>
          </div>
          <div className="h-px bg-gray-200 w-full"></div>
          <div className="flex justify-between items-center font-bold">
            <span className="text-gray-900">Total to Pay</span>
            <span className="text-[#3B3BFF] text-xl">₦ {amount ? parseInt(amount).toLocaleString() : '0.00'}</span>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="mt-auto lg:mt-0">
          <button 
            onClick={() => navigate('/app/wallet/receipt/1')}
            className="w-full bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-colors lg:text-lg flex justify-center items-center gap-2"
          >
            Proceed to Payment
            <span className="hidden lg:inline">→</span>
          </button>
          
          {/* Security Footer Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Secured by Paystack. Your financial data is encrypted.
          </div>
        </div>

        </div> {/* End Content Card Desktop */}

        {/* Desktop Footer Extras */}
        <div className="hidden lg:flex justify-between items-center mt-12 px-4 text-xs font-bold text-gray-500">
          <button className="flex items-center gap-2 hover:text-gray-900 transition-colors uppercase tracking-wider">
            <HelpCircle size={16} /> NEED HELP?
          </button>
          <span>Daily Limit: <span className="text-gray-900">₦ 5,000,000.00</span></span>
        </div>

      </div>
    </div>
  )
}
