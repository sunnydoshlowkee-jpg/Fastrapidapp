import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Search, MapPin, Minus, ArrowRight } from 'lucide-react'

// Mobile Mock Data
const menuCategories = ['Popular', 'Main Course', 'Sides', 'Drinks']
const menuItems = [
  { id: 1, name: 'Jollof Rice Special', description: 'Smoky party jollof served with 2 pieces of grilled chicken and...', price: '₦4,500', img: '/pizza.png' },
  { id: 2, name: 'Grilled Croaker Fish', description: 'Whole grilled croaker spiced with local herbs, served with yam...', price: '₦8,200', img: '/burger.png' },
  { id: 3, name: 'Beef Suya Platter', description: 'Authentic Hausa style suya meat served with sliced onions, cabbage...', price: '₦3,500', img: '/pizza.png' }
]

// Desktop Mock Data
const desktopTabs = ['Popular', 'Main Course', 'Sides', 'Drinks', 'Platters']
const desktopMenuItems = [
  { id: 201, name: 'Smoky Party Jollof', price: '₦4,500', desc: 'Authentic smoky firewood flavor, served with grilled...', tag: 'LAGOS FAVORITE', tagColor: 'text-red-500', icon: '🔥', img: '/pizza.png' },
  { id: 202, name: 'Special Egusi Soup', price: '₦5,200', desc: 'Rich melon seed soup cooked with spinach, stockfish, and...', tag: '35 - 45 MINS', tagColor: 'text-gray-400', icon: null, img: '/burger.png' },
  { id: 203, name: 'Spicy Beef Suya', price: '₦3,800', desc: 'Thinly sliced beef marinated in traditional Yaji spice, flame-...', tag: 'TRENDING', tagColor: 'text-orange-500', icon: '📈', img: '/pizza.png' },
  { id: 204, name: 'Seafood Fried Rice', price: '₦6,000', desc: 'Loaded with prawns, calamari, and seasonal vegetables. A...', tag: '40 - 50 MINS', tagColor: 'text-gray-400', icon: null, img: '/burger.png' },
  { id: 205, name: 'Oven-Baked Moi Moi', price: '₦1,200', desc: 'Savory steamed bean pudding with fish, egg, and extra crayfis...', tag: 'HEALTHY CHOICE', tagColor: 'text-green-500', icon: null, img: '/pizza.png' },
  { id: 206, name: 'Signature Zobo', price: '₦800', desc: 'Infused with ginger, pineapple, and cloves. Chilled perfectly f...', tag: '500ML BOTTLE', tagColor: 'text-gray-400', icon: null, img: '/burger.png' }
]
const desktopCartItems = [
  { id: 301, name: 'Party Jollof Rice', price: '₦4,500', qty: 1, img: '/pizza.png' },
  { id: 302, name: 'Spicy Beef Suya', price: '₦3,800', qty: 1, img: '/burger.png' },
  { id: 303, name: 'Signature Zobo', price: '₦800', qty: 1, img: '/pizza.png' },
]

export default function VendorDetail() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Menu')
  const [activeCategory, setActiveCategory] = useState('Popular')
  const [desktopActiveTab, setDesktopActiveTab] = useState('Popular')

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-32 md:pb-12">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Header Image & Top Nav */}
      <div className="md:hidden relative h-64 w-full">
        <img src="/pizza.png" alt="Vendor Cover" className="w-full h-full object-cover" />
        
        {/* Top actions */}
        <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Heart size={20} className="text-gray-400" />
            </button>
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm" onClick={() => navigate('/app/cart')}>
              <ShoppingCart size={20} className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Info Card */}
      <div className="md:hidden w-full max-w-md mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">Mama's Kitchen Lagos</h1>
          <p className="text-[11px] text-gray-500 font-medium mb-4 leading-relaxed">
            Authentic Nigerian local dishes prepared with love. Experience the best party jollof in the heart of Lagos.
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full">
              <Star size={12} className="fill-yellow-500 text-yellow-500" /> 4.8 (2.4k)
            </span>
            <span className="text-gray-400 flex items-center gap-1">
              🕐 15-25 min
            </span>
            <span className="text-gray-400">
              Free delivery
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="md:hidden w-full max-w-md mx-auto px-6 mt-6 flex flex-col">
        
        {/* Main Tabs (Menu, Info, Reviews) */}
        <div className="flex bg-[#F4F5F7] p-1.5 rounded-2xl mb-6">
          {['Menu', 'Info', 'Reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[13px] font-semibold rounded-xl transition-all ${
                activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Menu' && (
          <>
            {/* Menu Categories */}
            <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-6 pb-2">
              {menuCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all shadow-sm ${
                    activeCategory === cat 
                      ? 'bg-[#4F46E5] text-white' 
                      : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <h2 className="text-lg font-bold text-gray-900 mb-4">{activeCategory}</h2>
            <div className="flex flex-col gap-4">
              {menuItems.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/app/item/${item.id}`)}
                  className="bg-white rounded-[24px] p-4 flex justify-between gap-4 shadow-sm border border-gray-100 cursor-pointer group hover:shadow-md hover:border-indigo-100 transition-all"
                >
                  <div className="flex-1 flex flex-col justify-between pr-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-[15px] leading-tight mb-1.5">{item.name}</h3>
                      <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-[#4F46E5] text-sm">{item.price}</span>
                      <button className="w-8 h-8 bg-[#F4F5F7] text-gray-900 rounded-full flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab !== 'Menu' && (
          <div className="py-20 text-center text-gray-400">
             <p>{activeTab} view not implemented in mockup</p>
          </div>
        )}

      </div>

      {/* Floating View Cart Button */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 px-6 z-40">
        <button 
          onClick={() => navigate('/app/cart')}
          className="w-full max-w-md mx-auto bg-[#4F46E5] text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-between px-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-[13px]">3</span>
            </div>
            <span className="text-[13px]">View cart</span>
          </div>
          <span className="text-[13px]">₦16,500</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      {/* Desktop Top Bar */}
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="flex-1 flex justify-center px-8">
          <div className="w-full max-w-2xl bg-gray-100/70 hover:bg-gray-100 rounded-xl px-5 py-3.5 flex items-center gap-3 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 border border-transparent">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for food, groceries, or essentials..." 
              className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <MapPin size={20} className="text-[#4F46E5]" strokeWidth={2} />
            <span className="font-semibold text-[#4F46E5] text-[15px]">Lagos, NG</span>
          </div>
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ShoppingCart size={24} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">3</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1200px] mx-auto pt-6 pb-12">
        
        {/* Desktop Banner */}
        <div className="w-full bg-gradient-to-r from-[#8B2A2A] to-[#D64B29] overflow-hidden mb-10 relative h-[280px] flex items-center shadow-md">
          {/* Mock Character Image on the right */}
          <img src="/pizza.png" alt="Character" className="absolute right-0 bottom-0 h-[110%] object-cover translate-x-10 mix-blend-overlay opacity-60" />
          
          <div className="relative z-10 px-12 w-[65%]">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 bg-red-600/30 border border-red-500/50 text-white text-[10px] font-bold tracking-wider rounded">TOP RATED VENDOR</span>
              <div className="flex items-center gap-1 text-yellow-400 text-[13px] font-bold">
                <Star size={14} className="fill-yellow-400" /> 4.9 (2k+ reviews)
              </div>
            </div>
            <h1 className="text-white text-[48px] font-bold leading-tight mb-3">
              Mama's Kitchen Lagos
            </h1>
            <p className="text-white/80 text-[16px] leading-relaxed">
              Authentic home-style Nigerian delicacies crafted with heritage recipes and premium local ingredients. The heart of Lagos on your plate.
            </p>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="px-10 flex gap-10 items-start">
          
          {/* Left Column (Menu) */}
          <div className="flex-1">
            {/* Horizontal Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
              {desktopTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setDesktopActiveTab(tab)}
                  className={`pb-4 text-[15px] font-bold transition-colors relative ${
                    desktopActiveTab === tab ? 'text-[#2D2AEE]' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                  {desktopActiveTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2D2AEE] rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 gap-6">
              {desktopMenuItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group">
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-50">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[16px] text-gray-900 group-hover:text-[#2D2AEE] transition-colors">{item.name}</h3>
                    <span className="font-bold text-[15px] text-[#2D2AEE] shrink-0">{item.price}</span>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-6 leading-relaxed line-clamp-2 flex-1">{item.desc}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase ${item.tagColor}`}>
                      {item.icon && <span>{item.icon}</span>}
                      {item.tag}
                    </div>
                    <button className="w-8 h-8 bg-[#2D2AEE] text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Sticky Cart) */}
          <div className="w-[360px] sticky top-[120px] shrink-0">
            <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-gray-900">Your Order</h2>
                <span className="bg-[#EAE9FE] text-[#2D2AEE] px-3 py-1 rounded-full text-[12px] font-bold">3 Items</span>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-4 mb-6">
                {desktopCartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[13px] text-gray-900 leading-tight">{item.name}</h4>
                        <span className="font-bold text-[13px] text-gray-900">{item.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-gray-500 font-medium">Qty: {item.qty}</span>
                        <div className="flex items-center gap-2">
                          <button className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                            <Minus size={10} />
                          </button>
                          <button className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 mb-6">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">₦9,100</span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500 font-medium">Delivery Fee</span>
                  <span className="font-bold text-gray-900">₦1,500</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[16px] font-bold text-gray-900">Total</span>
                  <span className="text-[18px] font-bold text-[#2D2AEE]">₦10,600</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/app/checkout')}
                className="w-full bg-[#2D2AEE] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mb-4"
              >
                Checkout <ArrowRight size={18} />
              </button>
              
              <div className="text-center">
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase">Secure payment powered by RAPID</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}