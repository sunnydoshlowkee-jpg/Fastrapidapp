import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard } from 'lucide-react'

export default function PaymentMethods() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12">
      <div className="flex items-center gap-3 px-5 md:px-8 pt-app md:pt-8 pb-4 bg-[#FAFAFA] sticky top-0 z-30 border-b border-gray-100">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-[17px] md:text-xl font-bold text-gray-900">Payment Methods</h1>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto px-5 pt-16 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-5">
          <CreditCard size={28} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Saved cards coming soon</h2>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
          For security, card details are not stored in the app yet. Use Paystack checkout when funding your wallet or paying for orders.
        </p>
        <button
          type="button"
          onClick={() => navigate('/app/wallet/fund')}
          className="w-full bg-[#4F46E5] text-white py-3.5 rounded-xl font-bold text-[15px] hover:bg-indigo-700 transition-colors"
        >
          Fund wallet with card
        </button>
      </div>
    </div>
  )
}
