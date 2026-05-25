import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Info, Lock, Wallet, CreditCard, Bitcoin, Search, ShoppingCart } from 'lucide-react'

// Mobile Mock Data
const mobileOrderItems = [
  { id: 1, quantity: 1, name: 'Smoky Jollof Rice', description: 'Extra Spicy | Side of Coleslaw', price: '₦4,500' },
  { id: 2, quantity: 2, name: 'Grilled Turkey Wings', description: 'Peppered Sauce', price: '₦6,000' },
  { id: 3, quantity: 1, name: 'Fresh Chapman', description: 'Ice and Mint', price: '₦2,000' }
]

// Desktop Mock Data
const desktopOrderItems = [
  { id: 101, qty: 1, name: 'Smokey Jollof Rice', desc: 'Extra Spicy, Side of Coleslaw', price: '₦4,500' },
  { id: 102, qty: 2, name: 'Grilled Turkey Wings', desc: 'Peppered Glaze', price: '₦6,000' },
  { id: 103, qty: 1, name: 'Fresh Chapman', desc: 'Ice and Mint', price: '₦2,500' }
]

export default function Payment() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('wallet')

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center gap-3 px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Payment</h1>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-4 flex flex-col gap-8">
        
        {/* Delivery Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Delivery Details</h3>
          <div className="bg-white rounded-2xl p-4 flex gap-4 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-50 flex flex-col items-center justify-center flex-shrink-0 text-green-600">
               <MapPin size={18} className="fill-green-200" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-0.5">Home</h4>
              <p className="text-[11px] text-gray-500 leading-snug">Block 7, Flat 12, Admiralty Way, Lekki Phase 1, Lagos</p>
            </div>
          </div>
        </div>

        {/* Items Summary */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Items Summary</h3>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
            {mobileOrderItems.map(item => (
              <div key={item.id} className="flex justify-between items-start gap-3">
                <span className="text-[#4F46E5] font-bold text-[13px] w-5">{item.quantity}x</span>
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-gray-900 text-[13px] mb-0.5">{item.name}</h4>
                  <p className="text-[11px] text-gray-400">{item.description}</p>
                </div>
                <span className="font-bold text-gray-900 text-[13px]">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Order Summary</h3>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold text-gray-900">₦12,500.00</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-500 font-medium">Delivery Fee</span>
              <span className="font-bold text-gray-900">₦1,500.00</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <div className="flex items-center gap-1 text-gray-500 font-medium">
                Service Charge <Info size={12} className="text-gray-400" />
              </div>
              <span className="font-bold text-gray-900">₦400.00</span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-[#4F46E5]">₦14,400.00</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Select Payment Method</h3>
          <div className="flex flex-col gap-3">
            <label 
              onClick={() => setPaymentMethod('wallet')}
              className={`bg-white rounded-2xl p-5 flex items-center gap-4 cursor-pointer border-2 transition-all ${
                paymentMethod === 'wallet' ? 'border-[#4F46E5] shadow-md bg-indigo-50/10' : 'border-gray-100 shadow-sm'
              }`}
            >
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#4F46E5]">
                <Wallet size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-[13px] mb-0.5">RAPID Wallet</h4>
                <p className="text-[11px] text-gray-500">Available balance: <span className="text-[#4F46E5] font-bold">₦24,500.00</span></p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'wallet' ? 'border-[#4F46E5]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full"></div>}
              </div>
            </label>

            <label 
              onClick={() => setPaymentMethod('card')}
              className={`bg-white rounded-2xl p-5 flex items-center gap-4 cursor-pointer border-2 transition-all ${
                paymentMethod === 'card' ? 'border-[#4F46E5] shadow-md' : 'border-gray-100 shadow-sm'
              }`}
            >
              <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                <CreditCard size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-[13px] mb-0.5">Credit / Debit Card</h4>
                <p className="text-[11px] text-gray-400">Visa, Mastercard, Verve</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'card' ? 'border-[#4F46E5]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-[#4F46E5] rounded-full"></div>}
              </div>
            </label>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-[#F8F9FA] rounded-2xl p-5 flex items-start gap-4 border border-gray-100 mt-2 mb-8">
          <Lock size={20} className="text-[#4F46E5] flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 text-[13px] mb-1">Secure Transaction</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
              Your transaction is protected by 256-bit SSL encryption and RAPID's multi-layered fraud detection system.
            </p>
          </div>
        </div>

      </div>

      {/* Floating Pay Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent pb-safe z-40">
        <button 
          onClick={() => navigate('/app/order-success')}
          className="w-full max-w-md mx-auto bg-[#4F46E5] text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-[15px] flex items-center justify-between px-6"
        >
          <span>Pay Now</span>
          <span>₦14,400</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      {/* Desktop Top Bar */}
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="flex-1 flex justify-start px-0">
          <h1 className="text-[24px] font-bold text-gray-900">Checkout</h1>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <MapPin size={20} className="text-gray-500" strokeWidth={2} />
          </div>
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ShoppingCart size={24} className="text-gray-700" />
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1000px] mx-auto px-10 pt-10 pb-12">
        <h1 className="text-[36px] font-bold text-gray-900 mb-8">Confirm your payment</h1>

        {/* Delivery Details Block */}
        <div className="mb-10">
          <h3 className="text-[18px] font-bold text-gray-500 mb-4">Delivery Details</h3>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4F5F7] flex flex-col items-center justify-center flex-shrink-0 text-red-500">
               <MapPin size={22} className="fill-red-200" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-[16px] mb-1">Home</h4>
              <p className="text-[14px] text-gray-500">Block 4, Flat 12, Admiralty Way, Lekki Phase 1, Lagos</p>
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-start">
          
          {/* Left Column (Payment Methods) */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-[18px] font-bold text-gray-900 mb-6">Select Payment Method</h3>
            
            <div className="flex flex-col gap-4 mb-8">
              {/* Wallet */}
              <label 
                onClick={() => setPaymentMethod('wallet')}
                className={`bg-[#F4F5F7] rounded-xl p-6 flex items-center gap-5 cursor-pointer border-2 transition-all ${
                  paymentMethod === 'wallet' ? 'border-[#2D2AEE] bg-indigo-50/50' : 'border-transparent'
                }`}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2D2AEE] shadow-sm">
                  <Wallet size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-[16px] mb-1">RAPID Wallet</h4>
                  <p className="text-[14px] text-gray-500">Available balance: <span className="text-[#2D2AEE] font-bold">₦24,500.00</span></p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'wallet' ? 'border-[#2D2AEE]' : 'border-gray-300 bg-white'
                }`}>
                  {paymentMethod === 'wallet' && <div className="w-3 h-3 bg-[#2D2AEE] rounded-full"></div>}
                </div>
              </label>

              {/* Card */}
              <label 
                onClick={() => setPaymentMethod('card')}
                className={`bg-white rounded-xl p-6 flex items-center gap-5 cursor-pointer border-2 transition-all ${
                  paymentMethod === 'card' ? 'border-[#2D2AEE] bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center text-gray-500">
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-[16px] mb-1">Credit / Debit Card</h4>
                  <p className="text-[14px] text-gray-500">Visa, Mastercard, Verve</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'card' ? 'border-[#2D2AEE]' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'card' && <div className="w-3 h-3 bg-[#2D2AEE] rounded-full"></div>}
                </div>
              </label>

              {/* Crypto */}
              <label 
                onClick={() => setPaymentMethod('crypto')}
                className={`bg-white rounded-xl p-6 flex items-center gap-5 cursor-pointer border-2 transition-all ${
                  paymentMethod === 'crypto' ? 'border-[#2D2AEE] bg-indigo-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center text-gray-500">
                  <Bitcoin size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-[16px] mb-1">Cryptocurrency</h4>
                  <p className="text-[14px] text-gray-500">BTC, ETH, USDT via RAPID Pay</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === 'crypto' ? 'border-[#2D2AEE]' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'crypto' && <div className="w-3 h-3 bg-[#2D2AEE] rounded-full"></div>}
                </div>
              </label>
            </div>

            {/* Security Badge */}
            <div className="bg-[#F8F9FA] rounded-xl p-6 flex items-start gap-4 border border-gray-100">
              <div className="w-8 h-8 rounded-full border-2 border-[#A88B4C] flex items-center justify-center shrink-0 mt-1">
                 <Lock size={16} className="text-[#A88B4C] fill-[#A88B4C]/20" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[16px] mb-2">Secure Transaction</h4>
                <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                  Your transaction is protected by 256-bit SSL encryption and RAPID's multi-layered fraud detection system.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Summary) */}
          <div className="w-[420px] shrink-0 sticky top-[120px]">
            <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h2 className="text-[18px] font-bold text-gray-500 mb-6">Items Summary</h2>
              
              {/* Order Items */}
              <div className="flex flex-col gap-4 mb-8">
                {desktopOrderItems.map(item => (
                  <div key={item.id} className="bg-[#F4F5F7] rounded-xl p-4 flex gap-4 items-center">
                    <span className="text-[#2D2AEE] font-bold text-[15px]">{item.qty}x</span>
                    <div className="flex-1 pr-2">
                      <h4 className="font-bold text-gray-900 text-[15px] mb-1">{item.name}</h4>
                      <p className="text-[13px] text-gray-500">{item.desc}</p>
                    </div>
                    <span className="font-bold text-gray-900 text-[15px]">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Summary Totals */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">₦20,600.00</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500 font-medium">Delivery Fee</span>
                  <span className="font-bold text-gray-900">₦1,500.00</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500 font-medium">Service Charge</span>
                  <span className="font-bold text-gray-900">₦400.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6 border-y border-gray-100 mb-8">
                <span className="text-[20px] font-bold text-gray-900">Total</span>
                <span className="text-[24px] font-bold text-[#2D2AEE]">₦22,500.00</span>
              </div>

              <button 
                onClick={() => navigate('/app/order-success')}
                className="w-full bg-[#2D2AEE] text-white py-4 rounded-xl font-bold text-[18px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
              >
                Pay Now
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}