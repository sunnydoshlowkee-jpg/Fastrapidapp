import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, ShoppingCart, Minus, Plus } from 'lucide-react'

export default function ItemDetail() {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [extraChicken, setExtraChicken] = useState(false)
  const [instructions, setInstructions] = useState('')

  const basePrice = 4500
  const extraPrice = 1200
  const total = (basePrice + (extraChicken ? extraPrice : 0)) * quantity

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-28 md:pb-0 relative">
      
      {/* Hero Image & Top Nav */}
      <div className="relative h-72 md:h-96 w-full bg-gray-200">
        <img src="/pizza.png" alt="Jollof Rice Special" className="w-full h-full object-cover" />
        
        {/* Top gradient for icons */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        <div className="absolute top-safe-4 left-4 right-4 flex justify-between items-center z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-900 shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-900 shadow-sm">
              <Heart size={20} />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-900 shadow-sm">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white px-5 md:px-8 pt-6 pb-8 -mt-6 rounded-t-3xl relative z-20 flex-1 max-w-3xl mx-auto w-full">
        
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Jollof Rice Special</h1>
            <p className="text-sm text-gray-500">Mama's Kitchen Lagos</p>
          </div>
          <div className="bg-orange-50 text-orange-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <StarIcon /> 4.8
          </div>
        </div>

        <div className="text-2xl font-bold text-gray-900 mb-6">₦4,500</div>

        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          Authentic firewood-smoked Jollof rice served with spicy peppered chicken, fried ripe plantains (dodo), and a side of fresh vegetable coleslaw. The ultimate Nigerian party experience.
        </p>

        {/* Quantity Selector */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quantity</span>
          <div className="flex items-center gap-6 bg-gray-50 rounded-full p-1 border border-gray-100 shadow-sm">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-sm disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus size={20} />
            </button>
            <span className="text-xl font-bold text-gray-900 w-4 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-full bg-[#1A1AF5] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 hover:bg-[#1515d4] transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Extras */}
        <div className="mb-8">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors border border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-gray-500">🍴</span>
              <span className="text-sm font-semibold text-gray-900">Extra Grilled Chicken</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#1A1AF5] text-sm font-bold">+₦1,200</span>
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                extraChicken ? 'bg-[#1A1AF5] border-[#1A1AF5]' : 'border-gray-300 bg-white'
              }`}>
                {extraChicken && <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
            </div>
            {/* Hidden actual checkbox to make it accessible */}
            <input type="checkbox" className="hidden" checked={extraChicken} onChange={(e) => setExtraChicken(e.target.checked)} />
          </label>
        </div>

        {/* Special Instructions */}
        <div className="mb-6">
          <h3 className="text-sm text-gray-900 mb-3">Special Instructions</h3>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm outline-none focus:border-[#1A1AF5] focus:ring-1 focus:ring-[#1A1AF5] min-h-[100px] resize-none transition-all placeholder:text-gray-400"
            placeholder="Add any special requests here..."
          ></textarea>
        </div>

      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 z-40 md:relative md:bg-transparent md:border-none md:p-8 md:max-w-3xl md:mx-auto">
        <button 
          onClick={() => navigate(-1)} // Navigate back to vendor for now
          className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-[#1515d4] transition-colors"
        >
          Add to cart — ₦{total.toLocaleString()}
        </button>
      </div>

    </div>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
