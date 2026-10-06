import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, MapPin } from 'lucide-react'
import { useCart } from '../../../context/CartContext'
import { useLocation } from '../../../context/LocationContext'
import { getDiscoveryItem } from '../../../services/discoveryService'
import { trackEvent } from '../../../services/analyticsService'
import { resolveStorageUrl } from '../../../utils/mediaUrl'
import { cacheKey, getCached, setCached } from '../../../utils/requestCache'
import { isFoodBusiness } from '../../../utils/merchantBusinessType'
import BrandedLoader from '../../../components/ui/BrandedLoader'

const ITEM_TTL_MS = 5 * 60 * 1000

export default function ItemDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { location } = useLocation()
  const { add, cartItems } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [hasAddon, setHasAddon] = useState(false)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  const itemCacheKey = cacheKey(['item', id, location?.latitude, location?.longitude])
  const initialCached = id && location?.latitude != null
    ? getCached(itemCacheKey, { ttlMs: ITEM_TTL_MS })
    : null
  const [itemData, setItemData] = useState(initialCached?.data ?? null)
  const [loading, setLoading] = useState(!initialCached)

  useEffect(() => {
    if (!id || location?.latitude == null || location?.longitude == null) return

    let cancelled = false
    const key = cacheKey(['item', id, location.latitude, location.longitude])
    const cached = getCached(key, { ttlMs: ITEM_TTL_MS })

    if (cached?.data) {
      setItemData(cached.data)
      setLoading(false)
      if (cached.fresh) {
        return () => {
          cancelled = true
        }
      }
    } else {
      setLoading(true)
    }

    const fetchItem = async () => {
      try {
        setError('')
        const { data } = await getDiscoveryItem(id, {
          latitude: location.latitude,
          longitude: location.longitude,
        })
        if (cancelled) return
        setCached(key, data.data)
        setItemData(data.data)
        trackEvent('view_product', 'product', id)
      } catch (err) {
        console.error('Failed to fetch item', err)
        if (!cancelled) {
          setError(err?.response?.data?.message || 'This item is outside your 10km area.')
          if (!cached?.data) setItemData(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchItem()

    return () => {
      cancelled = true
    }
  }, [id, location?.latitude, location?.longitude])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <BrandedLoader size="screen" />
      </div>
    )
  }

  if (!itemData) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center px-6">
        <p className="text-center text-gray-500">{error || 'Item not found.'}</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#4F46E5] font-bold">Go Back</button>
      </div>
    )
  }

  const basePrice = Number(itemData.price)
  const addonPrice = 1200
  const isFood = isFoodBusiness(itemData.merchant?.business_type)
  const total = (basePrice + (hasAddon ? addonPrice : 0)) * quantity
  const itemImage = resolveStorageUrl(itemData.img) || itemData.img

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...itemData,
      img: itemImage,
      price: basePrice + (hasAddon ? addonPrice : 0),
      qty: quantity,
      merchant_id: itemData.merchant?.id ?? null,
      notes
    }
    for (let i = 0; i < quantity; i++) {
      add(cartItem)
    }
    trackEvent('add_to_cart', 'product', id, { qty: quantity })
    navigate(-1)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Mobile Header Image */}
      <div className="md:hidden relative h-64 w-full">
        <img src={itemImage} alt="Item Cover" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-0 left-0 right-0 p-6 pt-app flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
        </div>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-6">
        
        {/* Item Info */}
        <div className="flex justify-between items-start mb-1">
          <h1 className="text-2xl font-bold text-gray-900">{itemData.name}</h1>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-md text-gray-800 font-bold ml-auto flex-shrink-0">
            <Star size={12} className="fill-yellow-500 text-yellow-500" /> {itemData.merchant?.rating || 4.8}
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">{itemData.merchant?.name}</p>
        <p className="text-xl font-bold text-gray-900 mb-6">{formatCurrency(basePrice)}</p>

        {/* Description */}
        <h3 className="text-sm font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-8">
          {itemData.description || 'No description available.'}
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

        {/* Food / grocery only: addons */}
        {isFood ? (
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
            <input type="checkbox" className="hidden" checked={hasAddon} onChange={() => setHasAddon(!hasAddon)} />
          </label>
        ) : null}

        {/* Food / grocery only: special instructions */}
        {isFood ? (
          <>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Special Instructions</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note (e.g. no onions, extra spicy...)"
              className="w-full bg-[#F4F5F7] rounded-2xl p-4 text-[13px] text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5] resize-none h-24 mb-4 border border-transparent"
            ></textarea>
          </>
        ) : null}

      </div>

      {/* Mobile Floating Add to Cart Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-white via-white to-transparent pb-safe z-40">
        <div className="w-full max-w-md mx-auto">
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-semibold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            Add to cart — {formatCurrency(total)}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Desktop Top Bar */}
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <button onClick={() => navigate(-1)} className="mr-6 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-[20px] font-bold text-gray-900 leading-tight">Item Details</h1>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => navigate('/app/cart')}>
            <ShoppingCart size={24} className="text-gray-700" />
            {cartItems?.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{cartItems.length}</span>}
          </div>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden md:flex flex-1 w-full max-w-[1100px] mx-auto px-10 py-12 gap-14">
        
        {/* Left: Image */}
        <div className="w-1/2 shrink-0">
          <div className="w-full aspect-square rounded-[32px] overflow-hidden shadow-xl shadow-gray-200/50">
            <img src={itemImage} alt={itemData.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col">
          
          {/* Name & Rating */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-[40px] font-bold text-gray-900 leading-tight">{itemData.name}</h1>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl text-gray-800 font-bold shrink-0 mt-2">
              <Star size={18} className="fill-yellow-500 text-yellow-500" /> 
              <span className="text-[18px]">{itemData.merchant?.rating || 4.8}</span>
            </div>
          </div>

          {/* Merchant */}
          <p className="text-[18px] text-gray-500 mb-4">{itemData.merchant?.name}</p>
          
          {/* Price */}
          <p className="text-[36px] font-bold text-[#2D2AEE] mb-8">{formatCurrency(basePrice)}</p>

          {/* Description */}
          <h3 className="text-[16px] font-bold text-gray-900 mb-3">Description</h3>
          <p className="text-[16px] text-gray-500 leading-relaxed mb-10">
            {itemData.description || 'No description available.'}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-8 mb-10">
            <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest">Quantity</p>
            <div className="flex items-center gap-5">
              <button 
                onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-300 transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="text-[24px] font-bold text-gray-900 w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-12 h-12 rounded-full bg-[#2D2AEE] flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Food / grocery only: addons */}
          {isFood ? (
            <label className="flex items-center justify-between p-6 bg-indigo-50/50 rounded-2xl mb-10 cursor-pointer border-2 border-transparent hover:border-indigo-100 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🍴</span>
                <span className="text-[17px] font-semibold text-gray-900">Extra Grilled Chicken</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[17px] font-bold text-[#2D2AEE]">+₦1,200</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${hasAddon ? 'bg-[#2D2AEE] border-[#2D2AEE]' : 'border-gray-300'}`}>
                  {hasAddon && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                </div>
              </div>
              <input type="checkbox" className="hidden" checked={hasAddon} onChange={() => setHasAddon(!hasAddon)} />
            </label>
          ) : null}

          {/* Food / grocery only: special instructions */}
          {isFood ? (
            <>
              <h3 className="text-[16px] font-bold text-gray-900 mb-3">Special Instructions</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a note (e.g. no onions, extra spicy...)"
                className="w-full bg-[#F4F5F7] rounded-2xl p-5 text-[16px] text-gray-900 outline-none focus:ring-2 focus:ring-[#2D2AEE] resize-none h-32 mb-10 border border-transparent"
              ></textarea>
            </>
          ) : null}

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-[#2D2AEE] text-white py-5 rounded-xl font-bold text-[20px] shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
          >
            Add to cart — {formatCurrency(total)}
          </button>
        </div>

      </div>

    </div>
  )
}
