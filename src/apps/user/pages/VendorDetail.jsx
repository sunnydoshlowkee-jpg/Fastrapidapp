import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Truck, Plus } from 'lucide-react'

// Mock Data
const vendorData = {
  id: 1,
  name: "Mama's Kitchen Lagos",
  tags: "Continental • African Fusion",
  rating: "4.8",
  reviews: "500+",
  time: "25-35 min",
  minOrder: "Min. ₦2,000",
  delivery: "Free delivery",
  img: "/pizza.png", // Using placeholder image for now
}

const menuItems = [
  {
    id: 1,
    name: "Jollof Rice Special",
    desc: "Smoky party jollof served with 2 pieces of grilled chicken and...",
    price: "₦4,500",
    img: "/burger.png"
  },
  {
    id: 2,
    name: "Grilled Croaker Fish",
    desc: "Whole grilled croaker spiced with local herbs, served with yam...",
    price: "₦8,200",
    img: "/pizza.png"
  },
  {
    id: 3,
    name: "Beef Suya Platter",
    desc: "Authentic Hausa-style spicy beef skewers with cabbage and...",
    price: "₦3,500",
    img: "/burger.png"
  }
]

export default function VendorDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('Menu')
  const [activeCategory, setActiveCategory] = useState('Popular')

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-0">
      
      {/* Hero Image & Header */}
      <div className="relative h-60 md:h-80 w-full bg-gray-200">
        <img src={vendorData.img} alt={vendorData.name} className="w-full h-full object-cover" />
        {/* Top Gradient for text readability */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent"></div>
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-safe-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10"
        >
          <ArrowLeft size={20} className="text-gray-900" />
        </button>
      </div>

      {/* Vendor Info Section */}
      <div className="bg-white px-4 md:px-8 pt-5 pb-4 -mt-6 rounded-t-3xl relative z-20 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{vendorData.name}</h1>
        
        <div className="flex items-center text-sm mb-4">
          <span className="text-gray-500">{vendorData.tags}</span>
          <span className="mx-2 text-gray-300">•</span>
          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className="font-bold text-gray-900">{vendorData.rating}</span>
          <span className="text-gray-400 ml-1">({vendorData.reviews})</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
            {vendorData.time}
          </div>
          <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold">
            {vendorData.minOrder}
          </div>
          <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <Truck size={14} /> {vendorData.delivery}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {['Menu', 'Info', 'Reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 mr-6 text-sm font-semibold transition-colors relative ${
                activeTab === tab ? 'text-[#1A1AF5]' : 'text-gray-400'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1A1AF5] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto w-full px-4 md:px-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: Menu Content */}
        {activeTab === 'Menu' && (
          <div className="flex-1 w-full">
          {/* Categories */}
          <div className="bg-white py-4 sticky top-0 z-10">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {['Popular', 'Main Course', 'Sides', 'Drinks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#1A1AF5] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => navigate(`/app/item/${item.id}`)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between cursor-pointer hover:border-gray-200 transition-colors"
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <p className="font-bold text-gray-900">{item.price}</p>
                </div>
                <div className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  <button className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-lg shadow flex items-center justify-center text-[#1A1AF5] hover:bg-gray-50 transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        )}

        {/* Right Column: Desktop Cart Panel (Hidden on mobile) */}
        <div className="hidden lg:block w-96 flex-shrink-0 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Your Order</h3>
            <span className="bg-blue-100 text-[#1A1AF5] px-2 py-0.5 rounded-full text-xs font-bold">3 Items</span>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            {/* Example item */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">🍚</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Party Jollof Rice</h4>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
              <span className="font-bold text-gray-900 text-sm">₦4,500</span>
            </div>
             <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">🍗</div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">Spicy Beef Suya</h4>
                <p className="text-xs text-gray-500">Qty: 1</p>
              </div>
              <span className="font-bold text-gray-900 text-sm">₦3,800</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 text-sm mb-6">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₦8,300</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Fee</span>
              <span>₦1,500</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-[#1A1AF5] text-lg">₦9,800</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/app/checkout')}
            className="w-full bg-[#1A1AF5] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center gap-2"
          >
            Checkout 
          </button>
        </div>

      </div>

      {/* Mobile Sticky Cart Preview */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40 lg:hidden">
        <button 
          onClick={() => navigate('/app/cart')}
          className="w-full bg-[#1A1AF5] hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-between"
        >
          <span>View cart</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            <span>3 items</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            <span>₦8,300</span>
          </div>
        </button>
      </div>

    </div>
  )
}
