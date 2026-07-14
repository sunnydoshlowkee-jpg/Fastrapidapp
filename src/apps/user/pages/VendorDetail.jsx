import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Heart, ShoppingCart, Star, Plus, Search, MapPin, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import { useLocation } from '../../../context/LocationContext'
import { getVendor } from '../../../services/discoveryService'
import { trackEvent } from '../../../services/analyticsService'
import { resolveStorageUrl } from '../../../utils/mediaUrl'
import { cacheKey, getCached, setCached } from '../../../utils/requestCache'

const VENDOR_TTL_MS = 5 * 60 * 1000

export default function VendorDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { location } = useLocation()
  const { items: cartItems, add, updateQty, remove, count, total, subtotal, deliveryFee } = useCart()
  const [activeTab, setActiveTab] = useState('Menu')
  const [activeCategory, setActiveCategory] = useState('Popular')
  const [desktopActiveTab, setDesktopActiveTab] = useState('Popular')
  const [error, setError] = useState('')

  const vendorCacheKey = cacheKey(['vendor', id, location?.latitude, location?.longitude])
  const initialCached = id && location?.latitude != null
    ? getCached(vendorCacheKey, { ttlMs: VENDOR_TTL_MS })
    : null
  const [vendorData, setVendorData] = useState(initialCached?.data ?? null)
  const [loading, setLoading] = useState(!initialCached)

  useEffect(() => {
    if (!id || location?.latitude == null || location?.longitude == null) return

    let cancelled = false
    const key = cacheKey(['vendor', id, location.latitude, location.longitude])
    const cached = getCached(key, { ttlMs: VENDOR_TTL_MS })

    if (cached?.data) {
      setVendorData(cached.data)
      setLoading(false)
      if (cached.fresh) {
        return () => {
          cancelled = true
        }
      }
    } else {
      setLoading(true)
    }

    const fetchVendor = async () => {
      try {
        setError('')
        const { data } = await getVendor(id, {
          latitude: location.latitude,
          longitude: location.longitude,
        })
        if (cancelled) return
        setCached(key, data.data)
        setVendorData(data.data)
        trackEvent('view_merchant', 'merchant', id)
      } catch (err) {
        console.error('Failed to fetch vendor details', err)
        if (!cancelled) {
          setError(err?.response?.data?.message || 'This merchant is outside your 10km area.')
          if (!cached?.data) setVendorData(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchVendor()

    return () => {
      cancelled = true
    }
  }, [id, location?.latitude, location?.longitude])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const productImage = (url) => resolveStorageUrl(url) || url

  const { merchant, products } = vendorData || {}

  const categories = useMemo(() => {
    if (!products) return []
    const cats = new Set(products.map(p => p.category || 'Popular'))
    return Array.from(cats)
  }, [products])

  useEffect(() => {
    if (categories.length > 0 && !categories.includes(activeCategory)) {
      setActiveCategory(categories[0])
    }
    if (categories.length > 0 && !categories.includes(desktopActiveTab)) {
      setDesktopActiveTab(categories[0])
    }
  }, [categories, activeCategory, desktopActiveTab])

  const filteredProducts = useMemo(() => {
    if (!products) return []
    return products.filter(p => (p.category || 'Popular') === activeCategory)
  }, [products, activeCategory])

  const desktopFilteredProducts = useMemo(() => {
    if (!products) return []
    return products.filter(p => (p.category || 'Popular') === desktopActiveTab)
  }, [products, desktopActiveTab])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <p className="text-gray-500">Loading vendor details...</p>
      </div>
    )
  }

  if (!vendorData) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center px-6">
        <p className="text-center text-gray-500">{error || 'Vendor not found.'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#4F46E5] font-bold">Go Back</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-28 md:pb-12">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Header Image & Top Nav */}
      <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-b-3xl shadow-sm md:hidden">
        <img src={productImage(merchant.img)} alt="Vendor Cover" className="h-full w-full object-cover" loading="lazy" />
        
        {/* Top actions */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Heart size={20} className="text-gray-400" />
            </button>
            <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm" onClick={() => navigate('/app/cart')}>
              <ShoppingCart size={20} className="text-gray-900" />
              {count > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">{count}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Info Card */}
      <div className="relative z-10 mx-auto -mt-8 w-full max-w-md px-4 md:hidden">
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg">
          <h1 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">{merchant.name}</h1>
          <p className="text-[11px] text-gray-500 font-medium mb-4 leading-relaxed">
            {merchant.description}
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full">
              <Star size={12} className="fill-yellow-500 text-yellow-500" /> {merchant.rating}
            </span>
            <span className="text-gray-400 flex items-center gap-1">
              🕐 {merchant.delivery_time}
            </span>
            <span className="text-gray-400">
              {merchant.delivery_fee}
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto mt-4 flex w-full max-w-md flex-col px-4 pb-6 md:hidden">
        
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
              {categories.map(cat => (
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
              {filteredProducts.map(item => (
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
                      <span className="font-bold text-[#4F46E5] text-sm">{formatCurrency(item.price)}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); add(item); }}
                        className="w-8 h-8 bg-[#F4F5F7] text-gray-900 rounded-full flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="w-[88px] h-[88px] rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={productImage(item.img)} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className="text-gray-500 text-sm py-4 text-center">No products in this category.</p>
              )}
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
      {count > 0 && (
        <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-40 px-4 md:hidden">
          <button 
            onClick={() => navigate('/app/cart')}
            className="mx-auto flex w-full max-w-md items-center justify-between rounded-2xl bg-[#4F46E5] px-6 py-4 font-bold text-white shadow-xl shadow-indigo-200 transition-colors hover:bg-indigo-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-[13px]">{count}</span>
              </div>
              <span className="text-[13px]">View cart</span>
            </div>
            <span className="text-[13px]">₦{total.toLocaleString()}</span>
          </button>
        </div>
      )}

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

      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1200px] mx-auto pt-6 pb-12">
        
        {/* Desktop Banner */}
        <div className="w-full bg-gradient-to-r from-[#8B2A2A] to-[#D64B29] overflow-hidden mb-12 relative h-[320px] flex items-center shadow-md rounded-3xl">
          {/* Mock Character Image on the right */}
          <img src={productImage(merchant.img)} alt="Character" className="absolute right-0 bottom-0 h-[110%] object-cover translate-x-10 mix-blend-overlay opacity-60" />
          
          <div className="relative z-10 px-14 w-[65%]">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1.5 bg-red-600/30 border border-red-500/50 text-white text-[12px] font-bold tracking-wider rounded uppercase">TOP RATED VENDOR</span>
              <div className="flex items-center gap-1.5 text-yellow-400 text-[16px] font-bold">
                <Star size={16} className="fill-yellow-400" /> {merchant.rating}
              </div>
            </div>
            <h1 className="text-white text-[52px] font-bold leading-tight mb-4">
              {merchant.name}
            </h1>
            <p className="text-white/80 text-[18px] leading-relaxed">
              {merchant.description}
            </p>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="px-10 flex gap-10 items-start">
          
          {/* Left Column (Menu) */}
          <div className="flex-1">
            {/* Horizontal Tabs */}
            <div className="flex items-center gap-10 border-b border-gray-200 mb-10 overflow-x-auto hide-scrollbar">
              {categories.map(tab => (
                <button
                  key={tab}
                  onClick={() => setDesktopActiveTab(tab)}
                  className={`pb-4 text-[18px] font-bold transition-colors relative whitespace-nowrap ${
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
              {desktopFilteredProducts.map(item => (
                <div key={item.id} onClick={() => navigate(`/app/item/${item.id}`)} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col group">
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-gray-50">
                    <img src={productImage(item.img)} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[20px] text-gray-900 group-hover:text-[#2D2AEE] transition-colors">{item.name}</h3>
                    <span className="font-bold text-[18px] text-[#2D2AEE] shrink-0">{formatCurrency(item.price)}</span>
                  </div>
                  <p className="text-[15px] text-gray-500 mb-6 leading-relaxed line-clamp-2 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide uppercase text-gray-400">
                      {item.category}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); add(item); }}
                      className="w-10 h-10 bg-[#2D2AEE] text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {desktopFilteredProducts.length === 0 && (
                <p className="text-gray-500 text-sm py-4">No products in this category.</p>
              )}
            </div>
          </div>

          {/* Right Column (Sticky Cart) */}
          <div className="w-[380px] sticky top-[120px] shrink-0">
            <div className="bg-white rounded-[24px] p-7 border border-gray-100 shadow-xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[24px] font-bold text-gray-900">Your Order</h2>
                <span className="bg-[#EAE9FE] text-[#2D2AEE] px-3.5 py-1.5 rounded-full text-[14px] font-bold">{count} Items</span>
              </div>

              {/* Cart Items */}
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                      <img src={productImage(item.img)} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[15px] text-gray-900 leading-tight">{item.name}</h4>
                        <span className="font-bold text-[15px] text-gray-900">{formatCurrency(item.price * item.qty)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] text-gray-500 font-medium">Qty: {item.qty}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                            <Minus size={12} />
                          </button>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-[15px]">
                    Your cart is empty.
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <>
                  <div className="border-t border-gray-100 pt-5 flex flex-col gap-3 mb-6">
                    <div className="flex justify-between items-center text-[15px]">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px]">
                      <span className="text-gray-500 font-medium">Delivery Fee</span>
                      <span className="font-bold text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                      <span className="text-[18px] font-bold text-gray-900">Total</span>
                      <span className="text-[22px] font-bold text-[#2D2AEE]">₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/app/checkout')}
                    className="w-full bg-[#2D2AEE] text-white py-4 rounded-xl font-bold text-[17px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mb-4"
                  >
                    Checkout <ArrowRight size={20} />
                  </button>
                </>
              )}
              
              <div className="text-center">
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">Secure payment powered by RAPID</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}