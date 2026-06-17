import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Check, Phone, MessageSquare, Star, Plus, Minus, Crosshair, MapPin, ShoppingCart } from 'lucide-react'
import { getOrder } from '../../../services/orderService'
import { useCart } from '../../../context/CartContext'

export default function TrackOrder() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { cartItems } = useCart()
  const [view, setView] = useState('tracking') // 'tracking' | 'rating'
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const { data } = await getOrder(id)
        setOrder(data.data)
      } catch (err) {
        console.error('Failed to fetch order', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  // Derive status index: 0=pending, 1=preparing, 2=en_route/in_transit, 3=delivered
  const statusIndex = (() => {
    if (!order) return 0
    switch (order.status) {
      case 'pending': return 0
      case 'preparing': return 1
      case 'in_transit': return 2
      case 'delivered': return 3
      default: return 0
    }
  })()

  const steps = [
    { id: 1, title: 'Order Placed', subtitle: order ? new Date(order.created_at).toLocaleTimeString() : '', status: statusIndex >= 0 ? (statusIndex === 0 ? 'active' : 'done') : 'pending' },
    { id: 2, title: 'Preparing', subtitle: 'Vendor is preparing your order', status: statusIndex >= 1 ? (statusIndex === 1 ? 'active' : 'done') : 'pending' },
    { id: 3, title: 'En Route', subtitle: 'Driver is on the way', status: statusIndex >= 2 ? (statusIndex === 2 ? 'active' : 'done') : 'pending' },
    { id: 4, title: 'Delivered', subtitle: '', status: statusIndex >= 3 ? 'done' : 'pending' },
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const getOrderVendor = () => {
    if (!order?.items || order.items.length === 0) return 'Unknown Vendor'
    return order.items[0]?.product?.merchant?.business_name || 'Vendor'
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <p className="text-gray-500">Loading tracking information...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <p className="text-gray-500">Order not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#4F46E5] font-bold">Go Back</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      <div className="md:hidden flex items-center gap-3 px-5 pt-12 pb-3 bg-[#FAFAFA] sticky top-0 z-30 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:border md:border-gray-200 md:rounded-full hover:bg-gray-50 transition-colors shadow-sm md:w-10 md:h-10 md:flex md:items-center md:justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Track Order #{order.id}</h1>
      </div>

      <div className="md:hidden flex-1 w-full max-w-md mx-auto flex flex-col pt-2">
        {view === 'tracking' ? (
          <>
            {/* Mobile Map Area */}
            <div className="relative w-full h-[200px] bg-[#E8EAE6] overflow-hidden">
              <img src="/map.png" alt="Map" className="w-full h-full object-cover opacity-70" onError={(e) => e.target.style.display='none'} />
              <div className="absolute inset-0 bg-[#E8EAE6] -z-10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%]">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#4F46E5] -mt-0.5"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-5 py-2.5 rounded-full shadow-md border border-gray-100 flex items-center gap-2 z-10 w-max">
                <Clock size={16} className="text-[#4F46E5]" />
                <span className="font-bold text-gray-900 text-[13px]">Arriving in 15-20 mins</span>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="px-5 pt-10 pb-6">
              <div className="flex flex-col">
                {steps.map((step, i) => (
                  <div key={step.id} className="flex items-start gap-4 relative">
                    {i < steps.length - 1 && (
                      <div className={`absolute left-[11px] top-7 w-0.5 h-[calc(100%)] ${
                        step.status === 'done' ? 'bg-[#4F46E5]' : 'bg-gray-200'
                      }`} />
                    )}
                    <div className="flex-shrink-0 z-10 mt-0.5">
                      {step.status === 'done' ? (
                        <div className="w-6 h-6 bg-[#4F46E5] rounded-full flex items-center justify-center">
                          <Check size={14} className="text-white" strokeWidth={3} />
                        </div>
                      ) : step.status === 'active' ? (
                        <div className="w-6 h-6 bg-white border-[5px] border-[#4F46E5] rounded-full" />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                      )}
                    </div>
                    <div className={`pb-8 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                      <h4 className={`font-bold text-[15px] leading-tight ${
                        step.status === 'active' ? 'text-[#4F46E5]' : step.status === 'done' ? 'text-gray-900' : 'text-gray-400'
                      }`}>{step.title}</h4>
                      {step.subtitle && (
                        <p className={`text-[12px] mt-0.5 ${
                          step.status === 'active' ? 'text-gray-500' : 'text-gray-400'
                        }`}>{step.subtitle}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Driver Info Card */}
            <div className="px-5 mb-5 mt-auto">
              <div className="bg-[#F3F4F6] rounded-2xl p-4 flex items-center gap-4 border border-transparent">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <img src="/rider.png" alt="Driver" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Chinedu&background=random" }} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[14px]">Chinedu</h4>
                  <div className="flex items-center gap-1 text-[12px]">
                    <span className="font-semibold text-gray-700">4.8</span>
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <div className="ml-auto bg-white rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Vehicle</p>
                  <p className="font-bold text-gray-900 text-[13px]">ABC-123-XY</p>
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="px-5 flex gap-3 mb-6">
              <a href="tel:0800000000" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-bold text-[13px] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
                <Phone size={16} /> Call
              </a>
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-bold text-[13px] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
                <MessageSquare size={16} /> Message
              </button>
            </div>

            <div className="px-5 text-center pb-8">
              <p className="text-[12px] text-gray-400 italic mb-2">Order is in preparation. Cancellation unavailable.</p>
              <button className="text-[13px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                Cancel Order
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 w-full max-w-md mx-auto px-5 pt-6 flex flex-col pb-10">
             <p className="text-center">Rating view</p>
          </div>
        )}
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      {/* Desktop Header */}
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 bg-white/95 backdrop-blur-md z-40 shrink-0">
        <button onClick={() => navigate(-1)} className="mr-6 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-[20px] font-bold text-gray-900 leading-tight">Order #{order.id}</h1>
          <p className="text-[14px] text-gray-500 font-medium">Tracking Live Status</p>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <MapPin size={20} className="text-gray-500" strokeWidth={2} />
          </div>
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => navigate('/app/cart')}>
            <ShoppingCart size={24} className="text-gray-700" />
            {cartItems?.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{cartItems.length}</span>}
          </div>
        </div>
      </div>

      {/* Desktop Content Map + Sidebar */}
      <div className="hidden md:flex flex-1 w-full relative overflow-hidden bg-[#8ECFC9]">
        
        {/* Left Full Map Area */}
        <div className="flex-1 relative h-[calc(100vh-100px)]">
          {/* Mock abstract 3D globe effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] opacity-80" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#A5E3DE] to-[#7AB6B1] rounded-full shadow-2xl opacity-90 border-[4px] border-white/20 blur-sm" />
          
          <img src="/pizza.png" alt="Map Globe" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] object-cover mix-blend-overlay opacity-30 rounded-full" />
          
          {/* Tracking Path Line */}
          <svg className="absolute w-full h-full" preserveAspectRatio="none">
            <path d="M400,600 Q600,400 800,200" fill="none" stroke="#2D2AEE" strokeWidth="3" strokeDasharray="6,6" />
          </svg>

          {/* Delivery Pin */}
          <div className="absolute top-[200px] right-[400px]">
             <MapPin size={32} className="text-red-500 fill-red-500 drop-shadow-lg" />
             <div className="absolute -top-8 -left-10 bg-gray-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap">Your Home</div>
          </div>

          {/* Rider Pin */}
          <div className="absolute top-[380px] left-[520px]">
            <div className="w-14 h-14 bg-[#2D2AEE] rounded-full flex items-center justify-center border-4 border-white shadow-xl">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="17" r="3"></circle><circle cx="17" cy="17" r="3"></circle><path d="M14 17h-4v-6h-6v6"></path><path d="M14 11h4l3 3v3h-2"></path><path d="M5 14H3v-3a2 2 0 0 1 2-2h4"></path></svg>
            </div>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-10 left-10 flex flex-col gap-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <button className="w-12 h-12 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-[#2D2AEE] transition-colors border-b border-gray-100">
                <Plus size={20} strokeWidth={2.5} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-[#2D2AEE] transition-colors">
                <Minus size={20} strokeWidth={2.5} />
              </button>
            </div>
            <button className="w-12 h-12 bg-[#2D2AEE] text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
              <Crosshair size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[420px] bg-white h-[calc(100vh-100px)] shadow-[-10px_0_30px_rgba(0,0,0,0.05)] z-10 flex flex-col p-8 overflow-y-auto hide-scrollbar">
          
          {/* Estimated Arrival Card */}
          <div className="bg-[#F4F5F7] rounded-3xl p-6 relative overflow-hidden mb-10 border border-gray-100">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-60"></div>
            <p className="text-[13px] font-bold text-gray-500 mb-1">Estimated Arrival</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-[42px] font-bold text-gray-900 leading-none">ASAP</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700 font-medium text-[14px]">
              <MapPin size={16} className="text-[#2D2AEE]" /> 2.4 km away
            </div>
          </div>

          {/* Courier */}
          <h3 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-4">Your Courier</h3>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
              <img src="/rider.png" alt="Adekunle Smith" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Adekunle+Smith&background=random" }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="font-bold text-gray-900 text-[16px]">Adekunle Smith</h4>
                <div className="flex items-center gap-1 bg-[#FFF4E5] text-[#D48806] px-2 py-0.5 rounded text-[11px] font-bold">
                  <Star size={10} className="fill-[#D48806]" /> 4.9
                </div>
              </div>
              <p className="text-[12px] text-gray-500">Rapid Elite Partner • 2,401 Deliveries</p>
            </div>
          </div>

          <div className="flex gap-3 mb-10 pb-10 border-b border-gray-100">
            <button className="flex-1 bg-[#2D2AEE] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20">
              <Phone size={18} /> Call Driver
            </button>
            <button className="w-12 h-12 bg-[#F4F5F7] hover:bg-gray-200 text-gray-700 rounded-xl flex items-center justify-center transition-colors shrink-0">
              <MessageSquare size={20} />
            </button>
          </div>

          {/* Order Progress */}
          <h3 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-6">Order Progress</h3>
          <div className="flex flex-col mb-10">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-start gap-5 relative">
                {i < steps.length - 1 && (
                  <div className={`absolute left-[13px] top-8 w-[2px] h-[calc(100%-8px)] ${
                    step.status === 'done' ? 'bg-[#2D2AEE]' : 'bg-gray-100'
                  }`} />
                )}
                
                <div className="flex-shrink-0 z-10">
                  {step.status === 'done' ? (
                    <div className="w-7 h-7 bg-[#2D2AEE] rounded-full flex items-center justify-center shadow-sm shadow-blue-500/30">
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </div>
                  ) : step.status === 'active' ? (
                    <div className="w-7 h-7 bg-white border-[6px] border-[#2D2AEE] rounded-full shadow-sm" />
                  ) : (
                    <div className="w-7 h-7 bg-[#F4F5F7] rounded-full border border-gray-200 flex items-center justify-center">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                    </div>
                  )}
                </div>

                <div className={`pb-8 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                  <h4 className={`font-bold text-[15px] leading-tight mb-1 ${
                    step.status === 'active' ? 'text-[#2D2AEE]' : step.status === 'done' ? 'text-gray-900' : 'text-gray-400'
                  }`}>{step.title}</h4>
                  <p className={`text-[13px] ${
                    step.status === 'active' ? 'text-gray-500 font-medium' : 'text-gray-400'
                  }`}>{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Receipt Card */}
          <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-gray-100 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 font-bold text-lg uppercase">
                {getOrderVendor().charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[14px]">{getOrderVendor()}</h4>
                <p className="text-[12px] text-gray-500 font-medium">{order.items?.length || 0} items • {formatCurrency(order.total_amount)}</p>
              </div>
            </div>
            <button onClick={() => navigate(`/app/order/${order.id}`)} className="text-[13px] font-bold text-[#2D2AEE] hover:text-blue-700 transition-colors">
              View Receipt
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}