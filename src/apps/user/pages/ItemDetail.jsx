import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Minus, Plus } from 'lucide-react'

export default function ItemDetail() {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [hasAddon, setHasAddon] = useState(false)

  const basePrice = 4500
  const addonPrice = 1200
  const total = (basePrice + (hasAddon ? addonPrice : 0)) * quantity

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24">
      
      {/* Header Image */}
      <div className="relative h-64 md:h-80 w-full">
        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop" alt="Item Cover" className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 w-full max-w-md mx-auto pt-6">
        
        {/* Item Info */}
        <div className="flex justify-between items-start mb-1">
          <h1 className="text-2xl font-bold text-gray-900">Jollof Rice Special</h1>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md text-gray-800 font-bold ml-auto flex-shrink-0">
            <Star size={12} className="fill-yellow-500 text-yellow-500" /> 4.8
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">Mama's Kitchen Lagos</p>
        <p className="text-xl font-bold text-gray-900 mb-6">₦4,500</p>

        {/* Description */}
        <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-8">
          Authentic firewood smoked jollof rice served with spicy peppered chicken, fried ripe plantains (dodo), and a side of mixed vegetable coleslaw. The ultimate Nigerian party experience.
        </p>

        {/* Quantity */}
        <div className="flex flex-col items-center mb-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quantity</p>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => quantity > 1 && setQuantity(q => q - 1)}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 disabled:opacity-50"
            >
              <Minus size={18} />
            </button>
            <span className="text-xl font-bold text-gray-900 w-4 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-indigo-200"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Addons */}
        <label className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl mb-8 cursor-pointer border border-transparent hover:border-indigo-100 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">🍴</span>
            <span className="text-sm font-semibold text-gray-900">Extra Grilled Chicken</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#4F46E5]">+₦1,200</span>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${hasAddon ? 'bg-[#4F46E5] border-[#4F46E5]' : 'border-gray-300'}`}>
              {hasAddon && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </div>
          {/* Hidden input to make it accessible */}
          <input type="checkbox" className="hidden" checked={hasAddon} onChange={() => setHasAddon(!hasAddon)} />
        </label>

        {/* Special Instructions */}
        <h3 className="text-sm font-bold text-gray-900 mb-2">Special Instructions</h3>
        <textarea 
          placeholder="Add a note (e.g. no onions, extra spicy...)"
          className="w-full bg-[#F4F5F7] rounded-2xl p-4 text-[13px] text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none h-24 mb-4 border border-transparent"
        ></textarea>

      </div>

      {/* Floating Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-white via-white to-transparent pb-safe z-40">
        <div className="w-full max-w-md mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-semibold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            Add to cart — ₦{total.toLocaleString()}
          </button>
        </div>
      </div>

    </div>
  )
}
