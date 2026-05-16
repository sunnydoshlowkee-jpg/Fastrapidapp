import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Minus, Plus, Info, ArrowRight, ShieldCheck } from 'lucide-react'

// Mock Cart Items
const initialItems = [
  {
    id: 1,
    name: "Party Jollof Rice & Chicken",
    price: 4500,
    qty: 1,
    img: "/burger.png"
  },
  {
    id: 2,
    name: "Pounded Yam & Efo Riro",
    price: 5200,
    qty: 1,
    img: "/pizza.png"
  },
  {
    id: 3,
    name: "Beef Meat Pie (2pcs)",
    price: 1800,
    qty: 1,
    img: "/burger.png"
  }
]

export default function CartDetail() {
  const navigate = useNavigate()

  // Static for now based on mockup
  const subtotal = 11500
  const deliveryFee = 800
  const serviceFee = 800
  const total = subtotal + deliveryFee + serviceFee

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
              <ArrowLeft size={20} className="text-gray-900" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">My Cart</h1>
          </div>
          <button className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors flex items-center gap-2">
            Clear cart <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-6xl mx-auto w-full pt-6 pb-32 md:pb-6 px-4 md:px-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Items */}
        <div className="flex-1 w-full flex flex-col gap-4">
          {initialItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4">
              <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                  <button className="text-red-500 p-1 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-sm">₦{item.price.toLocaleString()}</span>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 border border-gray-100">
                    <button className="w-6 h-6 rounded-full text-[#1A1AF5] flex items-center justify-center hover:bg-white transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold text-gray-900 w-3 text-center">{item.qty}</span>
                    <button className="w-6 h-6 rounded-full text-[#1A1AF5] flex items-center justify-center hover:bg-white transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
              <span className="text-gray-500">Delivery fee</span>
              <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex items-center gap-1">
                Service fee <Info size={12} className="text-gray-400" />
              </span>
              <span className="font-medium text-gray-900">₦{serviceFee.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-6">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-bold text-[#1A1AF5] text-lg">₦{total.toLocaleString()}</span>
          </div>

          <button 
            onClick={() => navigate('/app/checkout')}
            className="w-full bg-[#1A1AF5] hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30"
          >
            Checkout Now <ArrowRight size={20} />
          </button>
          
          <div className="mt-4 bg-gray-50 rounded-xl p-4 flex items-start gap-3 text-xs text-gray-600">
             <ShieldCheck className="text-[#1A1AF5] flex-shrink-0" size={16} />
             <p>Secure checkout powered by RAPID Trust</p>
          </div>
        </div>

      </div>
    </div>
  )
}
