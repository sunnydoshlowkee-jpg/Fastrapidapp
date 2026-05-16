import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Search, MapPin, ChevronDown, Heart, SlidersHorizontal, Star } from 'lucide-react'

// Mock Data
const foodVendors = [
  { id: 1, name: "Mama's Kitchen Lagos", tags: 'Continental • African fusion • ₦₦', rating: 4.8, distance: '1.2 km', delivery: 'Free Delivery', img: '/pizza.png', time: '25-35 min', isOpen: true },
  { id: 2, name: 'The Burger Project', tags: 'American • Gourmet Burgers • ₦₦', rating: 4.5, distance: '2.5 km', delivery: '₦2099 Delivery', img: '/burger.png', time: '15-25 min', isOpen: true },
  { id: 3, name: 'Green Leaf Salads', tags: 'Healthy • Organic • Vegan • ₦', rating: 4.9, distance: '0.8 km', delivery: '₦1050 Delivery', img: '/pizza.png', time: '30-45 min', isOpen: true },
  { id: 4, name: 'Lagos Fusion', tags: 'African • Continental • ₦₦₦', rating: 4.9, distance: '3.1 km', delivery: 'Free Delivery', img: '/burger.png', time: '15-25 min', isOpen: true },
  { id: 5, name: 'Grill & Chill', tags: 'Steakhouse • BBQ • ₦₦', rating: 4.6, distance: '4.0 km', delivery: '₦1500 Delivery', img: '/pizza.png', time: '30-45 min', isOpen: false },
  { id: 6, name: 'Zen Sushi', tags: 'Japanese • Sushi • ₦₦₦', rating: 4.9, distance: '1.5 km', delivery: 'Free Delivery', img: '/burger.png', time: '35-50 min', isOpen: true },
]

const groceryVendors = [
  { id: 1, name: 'Fresh Forte Supermarket', tags: 'Groceries • Household • Drinks', rating: 4.8, distance: '1.2 km', delivery: '₦500 Delivery', img: '/grocery-hero.png', time: '20-30 min', isOpen: true },
  { id: 2, name: 'Mile 12 Fresh Vendors', tags: 'Fresh Produce • Spices • Grains', rating: 4.6, distance: '4.8 km', delivery: '₦800 Delivery', img: '/pizza.png', time: '35-45 min', isOpen: true },
  { id: 3, name: 'HealthPlus Pharmacy', tags: 'Wellness • Personal Care • Medicine', rating: 4.9, distance: '0.8 km', delivery: '₦300 Delivery', img: '/burger.png', time: '15-25 min', isOpen: true },
  { id: 4, name: 'Spar Market', tags: 'Groceries • Supermarket', rating: 4.7, distance: '2.1 km', delivery: 'Free Delivery', img: '/grocery-hero.png', time: '25-40 min', isOpen: true },
  { id: 5, name: 'Justrite Superstore', tags: 'Household • Groceries • Cheap', rating: 4.5, distance: '5.5 km', delivery: '₦1200 Delivery', img: '/pizza.png', time: '40-60 min', isOpen: false },
  { id: 6, name: 'FoodCo', tags: 'Groceries • Bakery', rating: 4.8, distance: '3.0 km', delivery: '₦600 Delivery', img: '/burger.png', time: '20-35 min', isOpen: true },
]

export default function Vendors() {
  const { type } = useParams()
  const navigate = useNavigate()
  
  const isFood = type === 'food'
  const title = isFood ? 'Food' : 'Groceries'
  const vendors = isFood ? foodVendors : groceryVendors
  
  const mobileFilters = isFood 
    ? ['All', 'Nearest', 'Top Rated', 'Free Delivery']
    : ['Nearest', 'Supermarkets', 'Local Markets', 'Pharmacies']
    
  const desktopFilters = ['All Vendors', 'Nearest', 'Top Rated', 'Free Delivery']

  return (
    <div className="flex flex-col w-full bg-white md:bg-gray-50 min-h-full pb-8">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-white sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#1A1AF5] hover:bg-blue-50 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        <button className="relative p-2 text-[#1A1AF5] hover:bg-blue-50 rounded-full transition-colors">
          <ShoppingCart size={22} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
        </button>
      </div>

      {/* --- DESKTOP HEADER (Reused from Home roughly) --- */}
      <div className="hidden md:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="relative w-[400px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for food, groceries, or essentials..." 
            className="w-full bg-gray-50 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#1A1AF5]/20 focus:border-[#1A1AF5] border border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[#1A1AF5] font-medium cursor-pointer transition-colors">
            <MapPin size={16} />
            <span className="text-sm">Lagos, NG</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          <button className="relative p-2 text-gray-700 hover:text-[#1A1AF5] transition-colors rounded-full hover:bg-blue-50">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 py-4 md:py-8 max-w-6xl mx-auto w-full">
        
        {/* DESKTOP TITLE */}
        <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-6">Featured Vendors</h2>
        
        {/* MOBILE SEARCH */}
        <div className="md:hidden relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={isFood ? "Search for vendors or dishes" : "Search markets and stores..."} 
            className="w-full bg-gray-100/80 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#1A1AF5] border border-transparent transition-all"
          />
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 md:mb-8">
          {/* Mobile version */}
          <div className="md:hidden flex gap-2">
            {mobileFilters.map((filter, index) => (
              <button 
                key={filter} 
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  index === 0 
                    ? (isFood ? 'bg-[#1A1AF5] text-white border-[#1A1AF5]' : 'bg-blue-50 text-[#1A1AF5] border-[#1A1AF5]') 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Desktop version */}
          <div className="hidden md:flex gap-3">
            {desktopFilters.map((filter, index) => (
              <button 
                key={filter} 
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                  index === 0 
                    ? 'bg-[#1A1AF5] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'Nearest' && <MapPin size={16} />}
                {filter === 'Top Rated' && <Star size={16} />}
                {filter}
              </button>
            ))}
            <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ml-2">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>

        {/* VENDOR LIST / GRID */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-6">
          {vendors.map((v) => (
            <div 
              key={v.id} 
              onClick={() => navigate(`/app/vendor/${v.id}`)}
              className="bg-white rounded-3xl md:rounded-2xl md:shadow-[0_2px_12px_rgba(0,0,0,0.03)] md:border md:border-gray-100 overflow-hidden cursor-pointer group flex flex-col"
            >
              <div className="relative h-48 md:h-52 overflow-hidden rounded-2xl md:rounded-t-2xl md:rounded-b-none">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                {/* Desktop Badges overlay */}
                <div className="hidden md:block absolute top-3 left-3 bg-white/90 backdrop-blur text-[#1A1AF5] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {v.time}
                </div>
                <div className="hidden md:flex absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm">
                  <Heart size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
                </div>

                {/* Mobile time badge */}
                <div className="md:hidden absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                  {isFood && <span>⏱</span>} {v.time}
                </div>
              </div>
              
              <div className="pt-3 md:p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900 text-lg md:text-xl line-clamp-1 flex-1">{v.name}</h4>
                  
                  {/* Mobile open status (food only) */}
                  {isFood && (
                    <div className="md:hidden flex items-center gap-1.5 ml-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${v.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className={`text-[11px] font-bold ${v.isOpen ? 'text-green-500' : 'text-gray-400'}`}>
                        {v.isOpen ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  )}

                  {/* Desktop rating */}
                  <div className="hidden md:flex items-center gap-1 bg-orange-50 text-orange-600 text-xs font-bold px-2 py-1 rounded-lg ml-3">
                    <Star size={12} className="fill-orange-600" /> {v.rating}
                  </div>
                </div>
                
                <p className="text-xs md:text-sm text-gray-500 mb-2">{v.tags}</p>
                
                {/* Mobile bottom info */}
                <div className="flex md:hidden items-center gap-2 text-xs font-medium text-gray-500 mt-1">
                  <span className="flex items-center gap-1 text-yellow-500 font-bold"><Star size={12} className="fill-yellow-500" /> {v.rating}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{v.distance}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{v.delivery}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP BANNER */}
        <div className="hidden md:flex mt-12 bg-gradient-to-r from-[#2B35F4] to-[#4D55F6] rounded-3xl overflow-hidden relative shadow-xl shadow-blue-500/10">
          <div className="w-1/2 p-12 flex flex-col justify-center relative z-10">
            <h2 className="text-4xl font-bold text-white leading-tight mb-4">Hungry? Get free delivery on your first order!</h2>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-white/80 text-lg">Use code</span>
              <span className="bg-white/20 text-white px-3 py-1 rounded-lg font-bold tracking-widest">RAPID50</span>
              <span className="text-white/80 text-lg">to claim your discount.</span>
            </div>
            <button className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-bold self-start hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
              Order Now
            </button>
          </div>
          {/* Decorative graphic (using burger placeholder for now, styled creatively) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
             <div className="w-full h-full bg-[url('/burger.png')] bg-cover bg-center transform scale-150 rotate-12 mix-blend-overlay"></div>
          </div>
        </div>

      </div>
    </div>
  )
}
