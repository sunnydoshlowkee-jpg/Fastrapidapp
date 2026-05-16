import { useState } from 'react'
import { Search as SearchIcon, X, Clock, Plus, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

// Mock Data
const recentSearches = ['Jollof Rice', 'Burger King near me', 'Pharmacy 24/7']
const popularSearches = ['Rice near Yaba', 'Sushi in Ikeja', 'Late night snacks']

const productResults = [
  {
    id: 1,
    name: "Jollof Rice Special",
    desc: "Smoky party jollof served with 2 pieces of grilled chicken and...",
    price: "₦4,500",
    img: "/burger.png"
  },
  {
    id: 2,
    name: "Beef Suya Platter",
    desc: "Authentic Hausa-style spicy beef skewers with cabbage and...",
    price: "₦3,500",
    img: "/pizza.png"
  }
]

const vendorResults = [
  {
    id: 1,
    name: "Burger Shop Deluxe",
    tags: "Burgers • American • Fast Food",
    time: "15-25 min",
    rating: "4.8",
    status: "Open",
    img: "/burger.png"
  },
  {
    id: 2,
    name: "Mama's Kitchen Yaba",
    tags: "Nigerian • Local • Rice",
    time: "15-25 min",
    rating: "4.8",
    status: "Closed",
    img: "/pizza.png"
  }
]

export default function Search() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('Products') // Products | Vendors

  // If query is 'Rice' (case-insensitive), show results. Otherwise show initial state.
  const isSearching = query.toLowerCase() === 'rice'

  return (
    <div className="flex flex-col min-h-screen bg-white md:bg-gray-50 pb-24 md:pb-0">
      
      <div className="bg-white sticky top-0 z-30 pt-4 pb-2 px-4 md:px-8 max-w-3xl mx-auto w-full">
        {/* Search Bar */}
        <div className={`flex items-center bg-gray-100 rounded-xl px-4 py-3 transition-colors ${isSearching ? '' : 'border border-[#1A1AF5] bg-white ring-2 ring-blue-50'}`}>
          <SearchIcon size={20} className="text-gray-500 mr-3" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-transparent flex-1 outline-none text-gray-900 text-sm font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full">
        {!isSearching ? (
          // INITIAL STATE
          <div className="px-4 md:px-8 py-4">
            
            {/* Recent Searches */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Recent searches</h3>
              <div className="flex flex-col gap-4">
                {recentSearches.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#1A1AF5] transition-colors" onClick={() => setQuery('Rice')}>
                      <Clock size={18} className="text-gray-400" />
                      <span className="text-sm">{item}</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Popular near you</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setQuery('Rice')}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-xl text-sm transition-colors border border-gray-100"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Banner */}
            <div className="relative rounded-2xl overflow-hidden h-48 cursor-pointer group shadow-sm">
              <img src="/pizza.png" alt="Explore Lagos" className="w-full h-full object-cover opacity-60 mix-blend-overlay bg-black group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 p-6 flex flex-col justify-center">
                <p className="text-[#1A1AF5] font-bold text-[10px] tracking-widest uppercase mb-2">STAY INSPIRED</p>
                <h2 className="text-white text-2xl font-bold w-2/3 leading-tight">Explore the best of Lagos delivered fast.</h2>
              </div>
            </div>

          </div>
        ) : (
          // SEARCH RESULTS STATE
          <div className="flex flex-col bg-gray-50 min-h-screen">
            
            {/* Tabs */}
            <div className="bg-white flex border-b border-gray-100 px-4 md:px-8 pt-2">
              {['Products', 'Vendors'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-sm font-bold transition-colors relative ${
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

            {/* Results */}
            <div className="p-4 md:px-8 py-6 flex flex-col gap-4">
              
              {activeTab === 'Products' && productResults.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/app/item/${item.id}`)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between cursor-pointer hover:border-[#1A1AF5]/20 transition-colors"
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

              {activeTab === 'Vendors' && vendorResults.map((vendor) => (
                <div 
                  key={vendor.id}
                  onClick={() => navigate(`/app/vendor/${vendor.id}`)} 
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center gap-4 cursor-pointer hover:border-[#1A1AF5]/20 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{vendor.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{vendor.tags}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-100">
                        {vendor.time}
                      </span>
                      <span className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full text-[10px] font-bold border border-gray-100 flex items-center gap-1">
                        {vendor.rating} <StarIcon />
                      </span>
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold border ${
                        vendor.status === 'Open' 
                          ? 'bg-white border-gray-200 text-gray-700' 
                          : 'bg-[#1A1AF5] border-[#1A1AF5] text-white'
                      }`}>
                        {vendor.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                    <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover" />
                    <button className="absolute bottom-1 right-1 w-8 h-8 bg-white/90 backdrop-blur rounded-full shadow flex items-center justify-center text-gray-900 hover:text-red-500 transition-colors">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              ))}

            </div>

          </div>
        )}
      </div>

    </div>
  )
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#EAB308" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
