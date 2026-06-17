import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Search, Navigation, Star, Truck, SlidersHorizontal, MapPin, Heart } from 'lucide-react'
import { useDiscovery } from '../../../hooks/useDiscovery'
import { useCart } from '../../../context/CartContext'

export default function Vendors() {
  const { type } = useParams()
  const navigate = useNavigate()
  const { data, loading } = useDiscovery()
  const { count } = useCart()
  const isFood = type === 'food'
  
  const title = isFood ? 'Food Vendors' : 'Grocery Stores'
  const vendors = isFood ? data.food : data.grocery
  
  const filters = isFood 
    ? ['All', 'Nearest', 'Top Rated', 'Free Delivery']
    : ['Nearest', 'Supermarkets', 'Local Markets']

  const [activeFilter, setActiveFilter] = useState(filters[0])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <p className="text-gray-500">Loading vendors...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA] min-h-screen pb-24 md:pb-8">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        </div>
        <button onClick={() => navigate('/app/cart')} className="relative p-1 text-[#4F46E5] rounded-full transition-colors">
          <ShoppingCart size={22} />
          {count > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">{count}</span>}
        </button>
      </div>

      <div className="md:hidden px-6 w-full max-w-md mx-auto">
        {/* Mobile Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={isFood ? "Search for vendors or dishes" : "Search markets and stores..."} 
            className="w-full bg-gray-100/70 rounded-full py-3.5 pl-11 pr-4 text-[13px] text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
          />
        </div>

        {/* Mobile Filters */}
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar -mx-6 px-6 mb-8">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            let buttonClass = 'whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-medium transition-colors border '
            
            if (isFood) {
              buttonClass += isActive ? 'bg-[#4F46E5] text-white border-[#4F46E5]' : 'bg-gray-100/70 text-gray-700 border-transparent'
            } else {
              buttonClass += isActive ? 'bg-white text-[#4F46E5] border-[#4F46E5]' : 'bg-white text-gray-600 border-gray-200'
            }

            return (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={buttonClass}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Mobile Vendor List */}
        <div className="flex flex-col gap-6">
          {vendors.map((v) => (
            <div 
              key={v.id} 
              onClick={() => navigate(`/app/vendor/${v.id}`)}
              className="bg-white rounded-3xl p-4 pb-5 border border-gray-100 shadow-sm cursor-pointer flex flex-col"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {v.time}
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-900 text-[15px]">{v.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[11px] font-bold text-green-500 uppercase tracking-wider">Open</span>
                </div>
              </div>
              
              <p className="text-[11px] text-gray-500 mb-2">{v.tags}</p>
              
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                <span className="flex items-center gap-0.5 text-yellow-500 font-bold"><Star size={10} className="fill-yellow-500 text-yellow-500" /> {v.rating || 4.9}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{v.distance_km} km</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{v.fee || 'Free'} Delivery</span>
              </div>
            </div>
          ))}
          {vendors.length === 0 && (
            <div className="text-center text-gray-500 py-10 text-sm">
              No vendors found nearby.
            </div>
          )}
        </div>
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
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => navigate('/app/cart')}>
            <ShoppingCart size={24} className="text-gray-700" />
            {count > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{count}</span>}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1200px] mx-auto px-10 pt-10 pb-12">
        {/* Header */}
        <h1 className="text-[34px] font-bold text-gray-900 mb-8">Featured Vendors</h1>
        
        {/* Filters Row */}
        <div className="flex items-center gap-4 mb-10">
          <button className="bg-[#2D2AEE] text-white px-7 py-3 rounded-full text-[14px] font-bold shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-colors">
            All Vendors
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 transition-colors">
             <Navigation size={16} className="text-gray-600"/> Nearest
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 transition-colors">
             <Star size={16} className="text-gray-600"/> Top Rated
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 transition-colors">
             <Truck size={16} className="text-gray-600"/> Free Delivery
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full text-[14px] font-bold flex items-center gap-2 transition-colors">
             <SlidersHorizontal size={16} className="text-gray-600"/> Filters
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vendors.map(v => (
            <div 
              key={v.id} 
              onClick={() => navigate(`/app/vendor/${v.id}`)}
              className="bg-transparent cursor-pointer group flex flex-col"
            >
              <div className="w-full aspect-[16/10] rounded-[24px] overflow-hidden relative shadow-sm mb-4 bg-gray-100">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {/* Top Left Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-[13px] font-bold text-[#2D2AEE] shadow-sm">
                  {v.time || '15-25 min'}
                </div>
                {/* Top Right Heart */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                  <Heart size={20} />
                </button>
              </div>
              <div className="flex items-start justify-between gap-2 px-1">
                <div>
                  <h4 className="font-bold text-gray-900 text-[20px] mb-1">{v.name}</h4>
                  <p className="text-[14px] text-gray-500 font-medium">{v.tags || title}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded text-[13px] font-bold text-gray-700 shrink-0">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  {v.rating || 4.9}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Banner */}
        <div className="w-full bg-gradient-to-br from-[#4F46E5] to-[#3B38F6] rounded-[24px] overflow-hidden relative p-12 flex flex-col justify-center min-h-[280px]">
          {/* Abstract background shapes - mock with radial gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_40%)]" />
          <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 w-[55%]">
            <h2 className="text-white text-[38px] font-bold leading-[1.1] mb-6">
              Hungry? Get free delivery on your first order!
            </h2>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-white/80 text-[18px]">Use code</span>
              <span className="bg-white/20 px-3 py-1 rounded text-white font-bold tracking-wider text-[18px] backdrop-blur-sm">RAPID50</span>
              <span className="text-white/80 text-[18px]">to claim your discount.</span>
            </div>
            <button className="bg-[#D32F2F] hover:bg-red-700 text-white px-8 py-4 rounded-xl text-[16px] font-bold transition-all shadow-lg shadow-red-900/30 w-max">
              Order Now
            </button>
          </div>

          <img src="/burger.png" alt="Promo" className="absolute right-0 bottom-0 h-[120%] object-contain translate-y-10 translate-x-10 mix-blend-overlay opacity-80" />
        </div>

      </div>

    </div>
  )
}
