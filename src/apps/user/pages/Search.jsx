import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, X, Clock, Heart, Plus, ArrowUpRight, Flame, Sparkles, MapPin, ShoppingCart, ChevronDown, Home, Wallet, User } from 'lucide-react'

// Mock Data
const recentSearchesMobile = ['Jollof Rice', 'Burger King near me', 'Pharmacy 24/7']
const popularTagsMobile = ['Rice near Yaba', 'Sushi in Ikeja', 'Late night snack']

const recentSearchesDesktop = [
  { term: 'Wireless mechanical keyboards', category: 'In Electronics & Accessories' },
  { term: 'Minimalist leather desk mat', category: 'In Home Office' },
  { term: 'Ergonomic chair obsidian', category: 'In Furniture' }
]
const popularTagsDesktop = ['Studio Lighting', 'Noise Cancelling', 'Smart Home Hub', 'Wireless Charger']

const productsResults = [
  {
    id: 1,
    name: 'Jollof Rice Special',
    description: 'Smoky party jollof served with 2 pieces of grilled chicken and...',
    price: '₦4,500',
    img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=500&fit=crop'
  },
  {
    id: 2,
    name: 'Beef Suya Platter',
    description: 'Authentic Hausa-style spicy beef skewers with cabbage and...',
    price: '₦3,500',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop'
  }
]

const vendorsResults = [
  {
    id: 1,
    name: 'Burger Shop Deluxe',
    tags: 'Burgers • American • Fast Food',
    time: '15-25 min',
    rating: '4.8 ★',
    isOpen: true,
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=500&fit=crop'
  },
  {
    id: 2,
    name: "Mama's Kitchen Yaba",
    tags: 'Nigerian • Local • Rice',
    time: '15-25 min',
    rating: '4.8 ★',
    isOpen: false,
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=500&fit=crop'
  }
]

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeTabMobile, setActiveTabMobile] = useState('Products')
  const [activeTabDesktop] = useState('discovery')

  const isSearching = query.trim().length > 0

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="md:hidden flex flex-col h-full">
        {/* Search Header */}
        <div className="px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
          <div className={`relative flex items-center w-full rounded-xl transition-all ${
            isSearching ? 'bg-gray-100' : 'bg-[#FAFAFA] border-2 border-[#4F46E5] shadow-sm'
          }`}>
            <SearchIcon size={18} className={`absolute left-4 ${isSearching ? 'text-gray-500' : 'text-[#4F46E5]'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder=""
              className="w-full bg-transparent py-4 pl-12 pr-10 text-[13px] text-gray-900 outline-none placeholder-gray-400 font-medium"
            />
            {isSearching && (
              <button onClick={() => setQuery('')} className="absolute right-4 text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 px-6 w-full max-w-md mx-auto pt-2">
          {!isSearching ? (
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-4">Recent searches</h3>
                <div className="flex flex-col gap-4">
                  {recentSearchesMobile.map((s, i) => (
                    <div key={i} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-gray-400 group-hover:text-[#4F46E5]" />
                        <span className="text-[13px] text-gray-600">{s}</span>
                      </div>
                      <X size={16} className="text-gray-300 hover:text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-4">Popular near you</h3>
                <div className="flex flex-wrap gap-2.5">
                  {popularTagsMobile.map((tag, i) => (
                    <button key={i} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-[11px] font-medium hover:bg-gray-200 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-[180px] rounded-2xl overflow-hidden relative shadow-sm mt-4 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black mix-blend-multiply opacity-80" />
                <img src="/grocery-hero.png" alt="Inspire" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <p className="text-[#4F46E5] text-[10px] font-bold tracking-widest uppercase mb-1">Stay Inspired</p>
                  <h2 className="text-xl font-bold text-white leading-tight w-3/4">Explore the best of Lagos delivered fast.</h2>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex border-b border-gray-100 mb-6">
                {['Products', 'Vendors'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTabMobile(tab)}
                    className={`flex-1 pb-4 text-[13px] font-semibold transition-colors relative ${
                      activeTabMobile === tab ? 'text-[#4F46E5]' : 'text-gray-400'
                    }`}
                  >
                    {tab}
                    {activeTabMobile === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4F46E5] rounded-t-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                {activeTabMobile === 'Products' && productsResults.map(item => (
                  <div key={item.id} className="bg-white rounded-[24px] p-4 flex justify-between items-center shadow-sm border border-gray-100">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-gray-900 text-[13px] mb-1">{item.name}</h3>
                      <p className="text-[11px] text-gray-500 mb-2 line-clamp-2 leading-relaxed">{item.description}</p>
                      <span className="font-bold text-gray-900 text-sm">{item.price}</span>
                    </div>
                    <div className="relative w-[88px] h-[88px] rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      <button className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md text-red-500">
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTabMobile === 'Vendors' && vendorsResults.map(vendor => (
                  <div key={vendor.id} className="bg-white rounded-[24px] p-4 flex justify-between items-center shadow-sm border border-gray-100">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-gray-900 text-[13px] mb-1">{vendor.name}</h3>
                      <p className="text-[10px] text-gray-500 mb-3">{vendor.tags}</p>
                      <div className="flex items-center gap-2">
                        <span className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full text-[10px] font-bold">{vendor.time}</span>
                        <span className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                          <span className="text-yellow-500 text-[10px]">★</span> {vendor.rating.split(' ')[0]}
                        </span>
                        {vendor.isOpen ? (
                          <span className="bg-white border border-green-500 text-green-500 px-2.5 py-1 rounded-full text-[10px] font-bold">Open</span>
                        ) : (
                          <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold border border-red-500">Closed</span>
                        )}
                      </div>
                    </div>
                    <div className="relative w-[88px] h-[88px] rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover" />
                      <button className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Heart size={12} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="hidden md:flex flex-1 w-full mx-auto">
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Top Header */}
          <div className="w-full px-10 pt-8 pb-6 flex items-center border-b border-gray-100 bg-white sticky top-0 z-40">
            <div className="flex-1 max-w-3xl bg-[#F4F5F7] border border-[#2D2AEE] rounded-xl px-5 py-3.5 flex items-center gap-3">
              <SearchIcon size={20} className="text-[#2D2AEE]" />
              <input 
                type="text" 
                placeholder="Search for everything RAPID..." 
                className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
              />
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-auto">
              <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <MapPin size={20} className="text-gray-500" strokeWidth={2} />
              </div>
              <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <ShoppingCart size={20} className="text-gray-500" strokeWidth={2} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">3</span>
              </div>
            </div>
          </div>

          <div className="px-10 pt-10 pb-12 bg-[#FAFAFA] flex-1">
            <div className="max-w-5xl">
              
              <div className="flex items-start gap-12 mb-12">
                
                {/* Recent Searches (Left Column) */}
                <div className="flex-1 max-w-[500px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[20px] font-bold text-gray-900">Recent searches</h2>
                    <button className="text-[#2D2AEE] text-[13px] font-bold">Clear all</button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {recentSearchesDesktop.map((search, idx) => (
                      <div key={idx} className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer group hover:border-gray-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F4F5F7] rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#2D2AEE] transition-colors">
                            <Clock size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-[14px] mb-0.5">{search.term}</h4>
                            <p className="text-[12px] text-gray-400 font-medium">{search.category}</p>
                          </div>
                        </div>
                        <ArrowUpRight size={20} className="text-gray-300 group-hover:text-[#2D2AEE] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column (Cards) */}
                <div className="flex gap-4 pt-12">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-[180px] h-[140px] flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow">
                    <Sparkles size={24} className="text-red-500 mb-4" />
                    <h4 className="font-bold text-gray-900 text-[14px] mb-1">New Arrivals</h4>
                    <p className="text-[12px] text-gray-400">Just landed today</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-[180px] h-[140px] flex flex-col justify-center cursor-pointer hover:shadow-md transition-shadow">
                    <Flame size={24} className="text-[#2D2AEE] mb-4" />
                    <h4 className="font-bold text-gray-900 text-[14px] mb-1">Best Sellers</h4>
                    <p className="text-[12px] text-gray-400">Top rated globally</p>
                  </div>
                </div>
              </div>

              {/* Popular Near You */}
              <div>
                <h2 className="text-[20px] font-bold text-gray-900 mb-6">Popular near you</h2>
                <div className="flex gap-3">
                  {popularTagsDesktop.map((tag, idx) => (
                    <button key={idx} className="bg-white border border-gray-100 text-gray-900 px-6 py-3.5 rounded-full text-[13px] font-bold shadow-sm hover:border-gray-300 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
