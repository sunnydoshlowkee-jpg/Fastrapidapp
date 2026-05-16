import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, ChevronDown, ShoppingCart, Search, Car, Heart, Plus, ArrowRight } from 'lucide-react'

// Mock Data
const quickReorder = [
  { id: 1, name: 'Burger King', img: '/burger.png' },
  { id: 2, name: 'Pizza Hut', img: '/pizza.png' },
  { id: 3, name: 'Bowl Hub', img: '/burger.png' },
  { id: 4, name: 'The Salad Bar', img: '/pizza.png' },
]

const desktopServices = [
  { id: 'rides', label: 'Rides', icon: '🚙' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'grocery', label: 'Grocery', icon: '🛍️' },
  { id: 'package', label: 'Package', icon: '📦' },
  { id: 'health', label: 'Health', icon: '⚕️' },
]

const restaurants = [
  { id: 1, name: 'The Lagos Bistro', tags: 'Continental • 20–30 mins', rating: 4.8, badge: 'TOP RATED', delivery: 'Free Delivery', img: '/burger.png' },
  { id: 2, name: 'Pepper & Spice', tags: 'African Fusion • 15–25 mins', rating: 4.5, delivery: '₦1,200 del.', img: '/pizza.png' },
  { id: 3, name: 'Pizza Express', tags: 'Italian • 10–15 mins', rating: 4.2, badge: 'FASTEST', delivery: 'Free Delivery', img: '/pizza.png' },
  { id: 4, name: "Wok n' Roll", tags: 'Asian • 25–40 mins', rating: 4.7, delivery: '₦800 del.', img: '/burger.png' },
]

const trendingItems = [
  { id: 1, name: 'KFC Mega Bucket', store: 'KFC - Sabo', price: '₦8,500', img: '/burger.png' },
  { id: 2, name: 'Large Fries & Dip', store: 'Burger King', price: '₦2,200', img: '/pizza.png' },
  { id: 3, name: 'Classic Pepperoni', store: "Domino's Pizza", price: '₦6,800', img: '/pizza.png' },
  { id: 4, name: 'Chocolate Sundae', store: 'Cold Stone', price: '₦3,500', img: '/burger.png' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('food') // food | groceries
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full bg-white md:bg-gray-50 min-h-full pb-8">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-white sticky top-0 z-30">
        <div className="flex items-center gap-1.5 text-gray-900">
          <MapPin size={18} className="text-[#1A1AF5]" />
          <span className="text-sm font-semibold">Yaba, Lagos</span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        <div className="bg-blue-50 px-3 py-1.5 rounded-full text-[#1A1AF5] font-bold text-xs tracking-wide">
          ₦4,500
        </div>
      </div>

      {/* --- DESKTOP HEADER --- */}
      <div className="hidden md:flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="relative w-[400px]">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for food, groceries..." 
            className="w-full bg-gray-50 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 outline-none focus:bg-white focus:ring-2 focus:ring-[#1A1AF5]/20 focus:border-[#1A1AF5] border border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
            <MapPin size={16} />
            <span className="text-sm font-medium">Victoria Island, Lagos</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
          <button className="relative p-2 text-gray-700 hover:text-[#1A1AF5] transition-colors rounded-full hover:bg-blue-50">
            <ShoppingCart size={22} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
          </button>
        </div>
      </div>

      <div className="px-4 md:px-8 py-2 md:py-6 max-w-6xl mx-auto w-full">
        
        {/* --- HERO BANNER (MOBILE) --- */}
        <div className="md:hidden bg-[#3b3bff] rounded-2xl p-6 text-white mb-6 relative overflow-hidden shadow-lg shadow-blue-500/20">
          {/* Subtle background decoration */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-purple-500 opacity-20 rounded-full blur-xl"></div>
          
          <h2 className="text-2xl font-bold leading-tight mb-2 relative z-10 w-2/3">50% off your first grocery haul</h2>
          <p className="text-sm text-blue-100 mb-5 relative z-10">Fresh items delivered fast</p>
          <button className="bg-white text-[#1A1AF5] px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1 hover:bg-gray-50 transition-colors relative z-10">
            Order now <ArrowRight size={14} />
          </button>
          {/* Pagination dots mock */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="w-4 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
        </div>

        {/* --- MOBILE ACTIVE ORDER TRACKER --- */}
        <div className="md:hidden bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1A1AF5]">
              <Car size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">On the way · 8 mins</p>
              <p className="text-xs text-gray-500">KFC - Yaba Branch</p>
            </div>
          </div>
          <button className="text-[#1A1AF5] text-sm font-bold bg-blue-50 px-4 py-1.5 rounded-full">Track</button>
        </div>

        {/* --- HERO BANNER (DESKTOP) --- */}
        <div className="hidden md:flex bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden relative h-[280px] mb-10 shadow-xl shadow-gray-200/50">
          <div className="w-1/2 p-10 flex flex-col justify-center relative z-10">
            <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full self-start mb-4">Limited Offer</span>
            <h2 className="text-4xl font-bold text-white leading-tight mb-3">50% off your first grocery haul</h2>
            <p className="text-gray-300 text-sm mb-6">Freshness delivered from the farm to your doorstep in 30 minutes.</p>
            <button className="bg-[#1A1AF5] text-white px-6 py-3 rounded-xl text-sm font-bold self-start hover:bg-[#1515d4] transition-colors">
              Shop Groceries Now
            </button>
          </div>
          {/* Decorative image background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-end justify-end p-4">
             <img src="/grocery-hero.png" alt="Groceries" className="h-[90%] object-contain object-bottom drop-shadow-2xl translate-y-4 translate-x-4" />
          </div>
        </div>

        {/* --- SERVICES / "WHAT DO YOU NEED?" --- */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 md:hidden">What do you need?</h3>
          <div className="flex items-center justify-between md:hidden gap-3">
            <button 
              onClick={() => setActiveTab('food')}
              className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-colors border-2 ${activeTab === 'food' ? 'bg-[#1A1AF5] text-white border-[#1A1AF5]' : 'bg-gray-50 text-gray-600 border-transparent'}`}
            >
              <span className="text-2xl">🍽️</span>
              <span className="text-xs font-semibold">Food</span>
            </button>
            <button 
              onClick={() => setActiveTab('groceries')}
              className={`flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 transition-colors border-2 ${activeTab === 'groceries' ? 'bg-[#1A1AF5] text-white border-[#1A1AF5]' : 'bg-gray-50 text-gray-600 border-transparent'}`}
            >
              <span className="text-2xl">🛍️</span>
              <span className="text-xs font-semibold">Groceries</span>
            </button>
            <button className="flex-1 py-4 rounded-2xl flex flex-col items-center gap-2 bg-gray-50 text-gray-600 border-2 border-transparent">
              <span className="text-2xl">➡️</span>
              <span className="text-xs font-semibold">more</span>
            </button>
          </div>

          <div className="hidden md:flex flex-col mb-10">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xl font-bold text-gray-900">Our Services</h3>
              <button onClick={() => navigate('/app/vendors/food')} className="text-[#1A1AF5] text-sm font-semibold hover:underline">See all ›</button>
            </div>
            <div className="grid grid-cols-5 gap-6">
              {desktopServices.map((s) => (
                <button key={s.id} className="bg-white rounded-3xl p-6 flex flex-col items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(26,26,245,0.08)] transition-all group">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{s.icon}</div>
                  <span className="text-sm font-bold text-gray-800">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- QUICK REORDER --- */}
        <div className="mb-10 md:mb-12">
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Quick reorder</h3>
            <p className="text-xs text-gray-500 hidden md:block">Based on your favorites</p>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 hide-scrollbar">
            {quickReorder.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-2 min-w-[72px]">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-0.5 bg-gradient-to-tr from-orange-400 to-[#1A1AF5] shadow-md flex-shrink-0 cursor-pointer transform hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden">
                     <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <span className="text-[10px] md:text-xs font-semibold text-gray-600 text-center leading-tight whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- RESTAURANTS / STORES --- */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 md:mb-1">{activeTab === 'groceries' ? 'Grocery stores near you' : 'Restaurants near you'}</h3>
              <p className="text-xs text-gray-500 hidden md:block">Trending in Victoria Island</p>
            </div>
            <button 
              onClick={() => navigate(`/app/vendors/${activeTab}`)} 
              className="text-[#1A1AF5] text-xs md:text-sm font-semibold hover:underline"
            >
              {activeTab === 'groceries' ? 'See all' : 'View all vendors'}
            </button>
          </div>
          
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 hide-scrollbar md:pb-0 md:overflow-visible">
            {restaurants.map((r) => (
              <div key={r.id} className="min-w-[240px] md:min-w-0 bg-white rounded-2xl md:rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group flex flex-col">
                <div className="relative h-36 md:h-40 overflow-hidden">
                  <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-1.5 shadow-sm">
                    <Heart size={16} className="text-gray-500 hover:text-red-500 transition-colors" />
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {r.badge && (
                      <span className={`text-[9px] font-bold uppercase tracking-wide px-2 py-1 rounded shadow-sm text-white ${r.badge === 'FASTEST' ? 'bg-red-500' : 'bg-[#1A1AF5]'}`}>
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-gray-900 text-[11px] font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                    <span className="text-yellow-500">★</span> {r.rating}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">{r.name}</h4>
                    {r.delivery !== 'Free Delivery' && <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2 hidden md:block">{r.delivery}</span>}
                  </div>
                  <p className="text-[11px] md:text-xs text-gray-500 mb-2">{r.tags}</p>
                  <div className="mt-auto">
                     {r.delivery === 'Free Delivery' ? (
                       <span className="text-[10px] bg-blue-50 text-[#1A1AF5] font-bold px-2 py-1 rounded inline-block">Free Delivery</span>
                     ) : (
                       <span className="text-[10px] text-gray-500 font-medium md:hidden">{r.delivery}</span>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TRENDING ITEMS (MOBILE) --- */}
        <div className="md:hidden pb-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-gray-900">Trending Items</h3>
            <button className="text-[#1A1AF5] text-xs font-semibold hover:underline">View Market</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {trendingItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-3 flex flex-col relative">
                <button className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full p-1.5 shadow-sm z-10">
                  <Heart size={14} className="text-gray-500" />
                </button>
                <div className="h-28 rounded-xl overflow-hidden mb-3 bg-gray-50 flex items-center justify-center">
                   <img src={item.img} alt={item.name} className="h-full object-cover" />
                </div>
                <h4 className="font-bold text-gray-900 text-xs mb-0.5 line-clamp-1">{item.name}</h4>
                <p className="text-[10px] text-gray-500 mb-2">{item.store}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">{item.price}</span>
                  <button className="w-7 h-7 rounded-full bg-[#1A1AF5] flex items-center justify-center shadow-md shadow-blue-500/20 hover:bg-[#1515d4] transition-colors">
                    <Plus size={16} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
