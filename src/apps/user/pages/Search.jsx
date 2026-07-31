import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, X, Clock, Heart, Plus, ArrowUpRight, Flame, Sparkles, MapPin, ShoppingCart, ChevronDown } from 'lucide-react'
import { trackEvent } from '../../../services/analyticsService'
import { searchCatalog, getSearchSuggestions } from '../../../services/searchService'
import { useLocation } from '../../../context/LocationContext'
import { useCart } from '../../../context/CartContext'
import {
  addRecentSearch,
  clearRecentSearches,
  getRecentSearches,
  removeRecentSearch,
} from '../../../utils/recentSearches'
import { cacheKey, getCached, setCached } from '../../../utils/requestCache'
import BrandedLoader from '../../../components/ui/BrandedLoader'

const SEARCH_SUGGESTIONS_TTL_MS = 10 * 60 * 1000
const SEARCH_RESULTS_TTL_MS = 2 * 60 * 1000

export default function Search() {
  const navigate = useNavigate()
  const { location } = useLocation()
  const { count: cartCount } = useCart()
  const [query, setQuery] = useState('')
  const [activeTabMobile, setActiveTabMobile] = useState('Products')
  
  const [recentSearches, setRecentSearches] = useState([])
  const [popularTags, setPopularTags] = useState([])
  
  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestionsLoading, setSuggestionsLoading] = useState(true)

  const isSearching = query.trim().length > 0

  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [])

  useEffect(() => {
    let active = true
    const suggestionsKey = cacheKey(['search-suggestions'])

    async function loadSuggestions() {
      const cached = getCached(suggestionsKey, { ttlMs: SEARCH_SUGGESTIONS_TTL_MS })
      if (cached?.data) {
        setPopularTags(cached.data)
        setSuggestionsLoading(false)
        if (cached.fresh) return
      } else {
        setSuggestionsLoading(true)
      }

      try {
        const popular = await getSearchSuggestions()
        if (!active) return
        setCached(suggestionsKey, popular)
        setPopularTags(popular)
      } catch (err) {
        console.error('Failed to load search suggestions', err)
      } finally {
        if (active) setSuggestionsLoading(false)
      }
    }

    loadSuggestions()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!isSearching) {
      setProducts([])
      setVendors([])
      return
    }
    
    const timeout = setTimeout(async () => {
      const trimmed = query.trim()
      trackEvent('search', null, null, { query: trimmed })
      const resultsKey = cacheKey([
        'search-results',
        trimmed.toLowerCase(),
        location?.latitude,
        location?.longitude,
      ])
      const cached = getCached(resultsKey, { ttlMs: SEARCH_RESULTS_TTL_MS })

      if (cached?.data) {
        setProducts(cached.data.products || [])
        setVendors(cached.data.vendors || [])
        setLoading(false)
        if (cached.fresh) return
      } else {
        setLoading(true)
      }

      try {
        const { data } = await searchCatalog({
          q: trimmed,
          latitude: location?.latitude,
          longitude: location?.longitude,
        })
        const payload = data?.data ?? {}
        const next = {
          products: payload.products || [],
          vendors: payload.vendors || [],
        }
        setCached(resultsKey, next)
        setProducts(next.products)
        setVendors(next.vendors)
        setRecentSearches(addRecentSearch(trimmed))
      } catch (err) {
        console.error('Search failed', err)
        if (!cached?.data) {
          setProducts([])
          setVendors([])
        }
      } finally {
        setLoading(false)
      }
    }, 400)
    
    return () => clearTimeout(timeout)
  }, [query, isSearching, location?.latitude, location?.longitude])

  const applySearchTerm = (term) => {
    setQuery(term)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="md:hidden flex flex-col h-full">
        {/* Search Header */}
        <div className="px-6 pt-app pb-4 bg-[#FAFAFA] sticky top-0 z-30">
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[13px] font-bold text-gray-900">Recent searches</h3>
                  {recentSearches.length > 0 ? (
                    <button
                      onClick={() => setRecentSearches(clearRecentSearches())}
                      className="text-[#4F46E5] text-[11px] font-bold"
                    >
                      Clear all
                    </button>
                  ) : null}
                </div>
                <div className="flex flex-col gap-4">
                  {recentSearches.length === 0 ? (
                    <p className="text-[12px] text-gray-400">Your recent searches will appear here.</p>
                  ) : recentSearches.map((search) => (
                    <div key={search.term} className="flex items-center justify-between cursor-pointer group" onClick={() => applySearchTerm(search.term)}>
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-gray-400 group-hover:text-[#4F46E5]" />
                        <span className="text-[13px] text-gray-600">{search.term}</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setRecentSearches(removeRecentSearch(search.term)) }} className="p-1">
                        <X size={16} className="text-gray-300 hover:text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[13px] font-bold text-gray-900 mb-4">Popular on RAPID</h3>
                <div className="flex flex-wrap gap-2.5">
                  {suggestionsLoading ? (
                    <BrandedLoader size="sm" />
                  ) : popularTags.length === 0 ? (
                    <p className="text-[12px] text-gray-400">Search for food, groceries, and more.</p>
                  ) : popularTags.map((tag) => (
                    <button key={tag} onClick={() => applySearchTerm(tag)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-[11px] font-medium hover:bg-gray-200 transition-colors">
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
                {loading && <div className="text-center text-sm text-gray-500 py-4">Searching...</div>}
                {!loading && activeTabMobile === 'Products' && products.length === 0 && (
                  <div className="text-center text-sm text-gray-500 py-4">No products found for "{query.trim()}".</div>
                )}
                {!loading && activeTabMobile === 'Vendors' && vendors.length === 0 && (
                  <div className="text-center text-sm text-gray-500 py-4">No vendors found for "{query.trim()}".</div>
                )}
                {!loading && activeTabMobile === 'Products' && products.map(item => (
                  <div key={item.id} onClick={() => navigate(`/app/item/${item.id}`)} className="bg-white rounded-[24px] p-4 flex justify-between items-center shadow-sm border border-gray-100 cursor-pointer">
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

                {!loading && activeTabMobile === 'Vendors' && vendors.map(vendor => (
                  <div key={vendor.id} onClick={() => navigate(`/app/vendor/${vendor.id}`)} className="bg-white rounded-[24px] p-4 flex justify-between items-center shadow-sm border border-gray-100 cursor-pointer">
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-gray-900 text-[13px] mb-1">{vendor.name}</h3>
                      <p className="text-[10px] text-gray-500 mb-3">{vendor.tags}</p>
                      <div className="flex items-center gap-2">
                        <span className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full text-[10px] font-bold">{vendor.time}</span>
                        <span className="bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                          <span className="text-yellow-500 text-[10px]">★</span> {vendor.rating || '4.8'}
                        </span>
                        {vendor.isOpen !== false ? (
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for everything RAPID..." 
                className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
              />
              {isSearching && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-[#2D2AEE] ml-auto">
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-auto">
              <div onClick={() => navigate('/app/profile/addresses')} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <MapPin size={20} className="text-gray-500" strokeWidth={2} />
              </div>
              <div onClick={() => navigate('/app/cart')} className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <ShoppingCart size={20} className="text-gray-500" strokeWidth={2} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{cartCount}</span>
              </div>
            </div>
          </div>

          <div className="px-10 pt-10 pb-12 bg-[#FAFAFA] flex-1">
            <div className="max-w-5xl">
              {isSearching ? (
                <div className="flex flex-col gap-8 w-full">
              <h2 className="text-[24px] font-bold text-gray-900">Search Results</h2>
              {loading && <div className="text-gray-500">Searching...</div>}
              
              {!loading && products.length === 0 && vendors.length === 0 && (
                <div className="text-gray-500 py-10">No results found for "{query}".</div>
              )}
              
              {!loading && products.length > 0 && (
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-6">Products & Items</h3>
                  <div className="grid grid-cols-3 gap-6">
                    {products.map(item => (
                      <div key={item.id} onClick={() => navigate(`/app/item/${item.id}`)} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-[15px] mb-1">{item.name}</h4>
                          <p className="text-[12px] text-gray-500 line-clamp-1 mb-2">{item.description}</p>
                          <p className="font-bold text-gray-900 text-[14px]">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {!loading && vendors.length > 0 && (
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-6">Vendors</h3>
                  <div className="grid grid-cols-3 gap-6">
                    {vendors.map(vendor => (
                      <div key={vendor.id} onClick={() => navigate(`/app/vendor/${vendor.id}`)} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                          <img src={vendor.img} alt={vendor.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-[15px] mb-1">{vendor.name}</h4>
                          <p className="text-[12px] text-gray-500 line-clamp-1 mb-2">{vendor.tags}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold flex items-center gap-1">
                              <span className="text-yellow-500">★</span> {vendor.rating || '4.8'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
              ) : (
                <>
                  <div className="flex items-start gap-12 mb-12">
                    
                    {/* Recent Searches (Left Column) */}
                    <div className="flex-1 max-w-[500px]">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[20px] font-bold text-gray-900">Recent searches</h2>
                        {recentSearches.length > 0 ? (
                          <button onClick={() => setRecentSearches(clearRecentSearches())} className="text-[#2D2AEE] text-[13px] font-bold">Clear all</button>
                        ) : null}
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        {recentSearches.length === 0 ? (
                          <p className="text-[13px] text-gray-400">Your recent searches will appear here.</p>
                        ) : recentSearches.map((search) => (
                          <div key={search.term} onClick={() => applySearchTerm(search.term)} className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-gray-100 cursor-pointer group hover:border-gray-200 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F4F5F7] rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#2D2AEE] transition-colors">
                            <Clock size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-[14px] mb-0.5">{search.term}</h4>
                            <p className="text-[12px] text-gray-400 font-medium">{search.category || 'Across RAPID'}</p>
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
                <h2 className="text-[20px] font-bold text-gray-900 mb-6">Popular on RAPID</h2>
                <div className="flex flex-wrap gap-3">
                  {suggestionsLoading ? (
                    <BrandedLoader size="sm" />
                  ) : popularTags.length === 0 ? (
                    <p className="text-[13px] text-gray-400">Search for food, groceries, and more.</p>
                  ) : popularTags.map((tag) => (
                    <button key={tag} onClick={() => applySearchTerm(tag)} className="bg-white border border-gray-100 text-gray-900 px-6 py-3.5 rounded-full text-[13px] font-bold shadow-sm hover:border-gray-300 transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

                </>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
