import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Info, Lock, CreditCard, Wallet, Bitcoin, ArrowRight } from 'lucide-react'

export default function Payment() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('wallet') // wallet | card | crypto

  const subtotal = 4500
  const deliveryFee = 100
  const serviceFee = 100
  const total = subtotal + deliveryFee + serviceFee

  const handlePay = () => {
    // Navigate to success screen
    navigate('/app/order-success')
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-28 md:pb-0 relative">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Payment</h1>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto w-full pt-6 pb-32 md:pb-6 px-4 md:px-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column */}
        <div className="flex-1 w-full flex flex-col gap-6">
        
        {/* Delivery Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 mb-3 ml-1">Delivery Details</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-1">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Home</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Block 4, Flat 12, Admiralty Way,<br />Lekki Phase 1, Lagos
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 mb-3 ml-1 uppercase tracking-wide">Select Payment Method</h3>
          <div className="flex flex-col gap-3">
            
            {/* Wallet Option */}
            <label className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
              paymentMethod === 'wallet' ? 'border-[#1A1AF5] bg-white' : 'border-transparent bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1A1AF5]">
                  <Wallet size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Wallet</h4>
                  <p className="text-xs text-gray-500">Balance ₦32,500</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'wallet' ? 'border-[#1A1AF5]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A1AF5]"></div>}
              </div>
              <input type="radio" name="payment" value="wallet" className="hidden" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} />
            </label>

            {/* Card Option */}
            <label className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
              paymentMethod === 'card' ? 'border-[#1A1AF5] bg-white' : 'border-transparent bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Card</h4>
                  <p className="text-xs text-gray-500">Visa **** 4242</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-[#1A1AF5]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A1AF5]"></div>}
              </div>
              <input type="radio" name="payment" value="card" className="hidden" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
            </label>

            {/* Crypto Option */}
            <label className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${
              paymentMethod === 'crypto' ? 'border-[#1A1AF5] bg-white' : 'border-transparent bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
            }`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
                  <Bitcoin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-0.5">Crypto</h4>
                  <p className="text-xs text-gray-500">USDT (TRC20)</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'crypto' ? 'border-[#1A1AF5]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'crypto' && <div className="w-2.5 h-2.5 rounded-full bg-[#1A1AF5]"></div>}
              </div>
              <input type="radio" name="payment" value="crypto" className="hidden" checked={paymentMethod === 'crypto'} onChange={() => setPaymentMethod('crypto')} />
            </label>

          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-[#f0f0ff] rounded-2xl p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-600 font-semibold">Payment Security</span>
            <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center text-white">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center shadow-sm">
              <span className="text-[8px] font-bold text-blue-500">VISA</span>
            </div>
            <div className="w-8 h-5 bg-white rounded flex items-center justify-center shadow-sm">
              <span className="text-[8px] font-bold text-red-500">MC</span>
            </div>
            <div className="w-8 h-5 bg-black rounded flex items-center justify-center shadow-sm text-white">
               <span className="text-[8px] font-bold">Pay</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Your transaction is encrypted with military-grade 256-bit SSL protocols. RAPID never stores your full card details.
          </p>
        </div>
      </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
          
          <div className="flex flex-col gap-3 text-sm mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Delivery Fee</span>
              <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-1">
                Service Charge <Info size={12} className="text-gray-400" />
              </span>
              <span className="font-medium text-gray-900">₦{serviceFee.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
            <span className="font-bold text-gray-900 text-lg">Total Amount</span>
            <span className="font-bold text-[#1A1AF5] text-lg">₦{total.toLocaleString()}</span>
          </div>

          <button 
            onClick={handlePay}
            className="w-full bg-[#1A1AF5] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:bg-blue-700"
          >
            Pay Now <ArrowRight size={20} />
          </button>
          
          <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-wider leading-relaxed">
            By clicking pay now, you agree<br />to our terms of service and<br />privacy policy.
          </p>
        </div>

      </div>

    </div>
  )
}
