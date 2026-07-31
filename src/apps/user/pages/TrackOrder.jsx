import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Check, Phone, MessageSquare, Star, Plus, Minus, Crosshair, MapPin, ShoppingCart } from 'lucide-react'
import { getOrder, cancelOrder } from '../../../services/orderService'
import { useCart } from '../../../context/CartContext'
import GoogleMapView from '../../../components/maps/GoogleMapView'
import BrandedLoader from '../../../components/ui/BrandedLoader'

// Default positions for demo if real coordinates are missing
const DEFAULT_HOME = { lat: 6.5400, lng: 3.3900 }
const DEFAULT_VENDOR = { lat: 6.5244, lng: 3.3792 }

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; 
  const dLat = (lat2-lat1) * (Math.PI/180);
  const dLon = (lon2-lon1) * (Math.PI/180); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return parseFloat((R * c).toFixed(1));
}

export default function TrackOrder() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { items: cartItems } = useCart()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [prevStatusIndex, setPrevStatusIndex] = useState(-1)

  // Computed Locations
  const vendorLocation = order?.items?.[0]?.product?.merchant?.latitude 
    ? { lat: Number(order.items[0].product.merchant.latitude), lng: Number(order.items[0].product.merchant.longitude) }
    : DEFAULT_VENDOR

  const homeLocation = order?.delivery?.destination_lat
    ? { lat: Number(order.delivery.destination_lat), lng: Number(order.delivery.destination_lng) }
    : DEFAULT_HOME

  const liveRider = order?.delivery?.rider?.latest_location
  const riderLocation = liveRider?.latitude != null && liveRider?.longitude != null
    ? { lat: Number(liveRider.latitude), lng: Number(liveRider.longitude) }
    : (order?.delivery?.rider_id && order?.delivery?.pickup_lat != null
      ? { lat: Number(order.delivery.pickup_lat), lng: Number(order.delivery.pickup_lng) }
      : null)

  const targetLocation = order?.delivery?.status === 'accepted' || order?.delivery?.status === 'en-route-pickup' ? vendorLocation : homeLocation
  const currentRiderPos = riderLocation || vendorLocation
  const distKm = getDistanceFromLatLonInKm(currentRiderPos.lat, currentRiderPos.lng, targetLocation.lat, targetLocation.lng)
  const estMins = distKm > 0 ? Math.max(1, Math.round(distKm * 4)) : '--'

  const canCancel = order?.status === 'pending'
    && (!order?.delivery || (order.delivery.status === 'pending' && !order.delivery.rider_id))
    && order?.status !== 'cancelled'

  const handleCancelOrder = async () => {
    if (!canCancel || cancelling) return
    if (!window.confirm('Cancel this order? Paid amounts will be refunded to your wallet.')) return

    try {
      setCancelling(true)
      const { data } = await cancelOrder(id)
      setOrder(data.data)
      setToastMessage('Order cancelled. Refund credited to your wallet if payment was made.')
      setTimeout(() => setToastMessage(''), 5000)
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || 'Could not cancel order.')
    } finally {
      setCancelling(false)
    }
  }

  useEffect(() => {
    const fetchOrder = async (isBackground = false) => {
      try {
        if (!isBackground) setLoading(true)
        const { data } = await getOrder(id)
        setOrder(data.data)
      } catch (err) {
        console.error('Failed to fetch order', err)
      } finally {
        if (!isBackground) setLoading(false)
      }
    }
    fetchOrder()
    const interval = window.setInterval(() => fetchOrder(true), 15000)
    return () => window.clearInterval(interval)
  }, [id])

  // Derive status index: 0=pending, 1=preparing, 2=en_route/in_transit, 3=delivered
  const statusIndex = (() => {
    if (!order) return 0
    const status = order.delivery?.status || order.status
    switch (status) {
      case 'pending': return 0
      case 'preparing':
      case 'accepted': return 1
      case 'picked_up':
      case 'en_route':
      case 'in_transit': return 2
      case 'delivered': return 3
      default: return 0
    }
  })()

  useEffect(() => {
    if (prevStatusIndex !== -1 && statusIndex > prevStatusIndex && order) {
      const stepLabels = ['Order Placed', 'Preparing', 'En Route', 'Delivered'];
      const newStatus = stepLabels[statusIndex] || 'Updated';
      setToastMessage(`Order status updated to: ${newStatus}`);
      setTimeout(() => setToastMessage(''), 5000);
    }
    setPrevStatusIndex(statusIndex);
  }, [statusIndex, prevStatusIndex, order]);

  const isValidDate = (dateStr) => {
    if (!dateStr) return false
    const d = new Date(dateStr)
    return !isNaN(d.getTime())
  }

  const steps = [
    { 
      id: 1, 
      title: 'Order Placed', 
      subtitle: order && isValidDate(order.created_at) ? new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) : 'Just now', 
      status: statusIndex >= 0 ? (statusIndex === 0 ? 'active' : 'done') : 'pending' 
    },
    { 
      id: 2, 
      title: 'Preparing', 
      subtitle: 'Vendor is preparing your order', 
      status: statusIndex >= 1 ? (statusIndex === 1 ? 'active' : 'done') : 'pending' 
    },
    { 
      id: 3, 
      title: 'En Route', 
      subtitle: order?.delivery?.rider_id ? 'Driver is on the way' : 'Assigning driver...', 
      status: statusIndex >= 2 ? (statusIndex === 2 ? 'active' : 'done') : 'pending' 
    },
    { 
      id: 4, 
      title: 'Delivered', 
      subtitle: '', 
      status: statusIndex >= 3 ? 'done' : 'pending' 
    },
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
        <BrandedLoader size="screen" />
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

  const mapCenter = riderLocation || vendorLocation
  const mapMarkers = [
    { ...vendorLocation, title: 'Vendor' },
    { ...homeLocation, title: 'Delivery' },
    ...(riderLocation ? [{ ...riderLocation, title: 'Rider' }] : []),
  ]
  const mapPath = [vendorLocation, homeLocation]

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0 relative">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3">
            <Check size={18} className="text-green-400" />
            <span className="font-bold text-[14px] whitespace-nowrap">{toastMessage}</span>
          </div>
        </div>
      )}
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      <div className="md:hidden flex items-center gap-3 px-5 pt-app pb-3 bg-[#FAFAFA] sticky top-0 z-30 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:border md:border-gray-200 md:rounded-full hover:bg-gray-50 transition-colors shadow-sm md:w-10 md:h-10 md:flex md:items-center md:justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Track Order #{order.id}</h1>
      </div>

      <div className="md:hidden flex-1 w-full max-w-md mx-auto flex flex-col pt-2">
          <>
            {/* Mobile Map Area */}
            <div className="relative w-full h-[200px] bg-[#E8EAE6] overflow-hidden">
              <GoogleMapView
                center={mapCenter}
                zoom={13}
                height="100%"
                className="absolute inset-0"
                markers={mapMarkers}
                path={mapPath}
                showRecenter
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-5 py-2.5 rounded-full shadow-md border border-gray-100 flex items-center gap-2 z-[1000] w-max">
                <Clock size={16} className="text-[#4F46E5]" />
                <span className="font-bold text-gray-900 text-[13px]">Arriving in {estMins} mins</span>
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
              {order?.delivery?.rider_id ? (
                <>
                  <div className="bg-[#F3F4F6] rounded-2xl p-4 flex items-center gap-4 border border-transparent">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                      <img src="/rider.png" alt="Driver" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Rider&background=random" }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[14px]">{order.delivery.rider?.user?.first_name || 'Assigned Rider'}</h4>
                      <div className="flex items-center gap-1 text-[12px]">
                        <span className="font-semibold text-gray-700">{order.delivery.rider?.rating || '4.8'}</span>
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <div className="ml-auto bg-white rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Vehicle</p>
                      <p className="font-bold text-gray-900 text-[13px]">{order.delivery.rider?.plate_number || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <a href={`tel:${order.delivery.rider?.phone || '0800000000'}`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-bold text-[13px] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all">
                      <Phone size={16} /> Call
                    </a>
                    <button
                      type="button"
                      onClick={() => navigate(`/app/order/${order.id}/chat`)}
                      className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-bold text-[13px] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all"
                    >
                      <MessageSquare size={16} /> Message
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-[#FFF4E5] rounded-2xl p-4 flex items-center justify-center gap-3 border border-orange-100">
                  <div className="w-8 h-8 rounded-full border-2 border-orange-400 border-t-transparent animate-spin shrink-0"></div>
                  <p className="text-[14px] font-bold text-orange-600">Assigning Rider...</p>
                </div>
              )}
            </div>

            <div className="px-5 text-center pb-8">
              {order?.status === 'cancelled' ? (
                <p className="text-[13px] font-bold text-red-500 uppercase tracking-wider">Order cancelled</p>
              ) : canCancel ? (
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleCancelOrder}
                  className="text-[13px] font-bold text-red-500 uppercase tracking-wider hover:text-red-700 transition-colors disabled:opacity-60"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              ) : (
                <p className="text-[12px] text-gray-400 italic">Cancellation unavailable once preparation or delivery starts.</p>
              )}
            </div>
          </>
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
          <GoogleMapView
            center={riderLocation || {
              lat: (vendorLocation.lat + homeLocation.lat) / 2,
              lng: (vendorLocation.lng + homeLocation.lng) / 2,
            }}
            zoom={14}
            height="100%"
            className="absolute inset-0"
            markers={mapMarkers}
            path={mapPath}
            showRecenter
          />

          {/* Zoom Controls */}
          <div className="absolute bottom-10 left-10 flex flex-col gap-3 z-10">
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
          <div className="flex gap-4 mb-10">
            <div className="bg-[#F4F5F7] rounded-2xl p-4 flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 rounded-full blur-xl opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 relative z-10">
                <Clock size={12} /> Time Taken
              </div>
              <p className="text-[22px] font-bold text-gray-900 leading-none relative z-10">{estMins} mins</p>
            </div>
            
            <div className="bg-[#F4F5F7] rounded-2xl p-4 flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-100 rounded-full blur-xl opacity-60 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 relative z-10">
                <MapPin size={12} /> Distance
              </div>
              <p className="text-[22px] font-bold text-gray-900 leading-none relative z-10">{distKm > 0 ? `${distKm} km` : '--'}</p>
            </div>
          </div>

          {/* Courier */}
          {order?.delivery?.rider_id ? (
            <>
              <h3 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-4">Your Courier</h3>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                  <img src="/rider.png" alt="Rider" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://ui-avatars.com/api/?name=Rider&background=random" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-bold text-gray-900 text-[16px]">{order.delivery.rider?.user?.first_name || 'Assigned Rider'}</h4>
                    <div className="flex items-center gap-1 bg-[#FFF4E5] text-[#D48806] px-2 py-0.5 rounded text-[11px] font-bold">
                      <Star size={10} className="fill-[#D48806]" /> {order.delivery.rider?.rating || '4.8'}
                    </div>
                  </div>
                  <p className="text-[12px] text-gray-500">Rapid Partner • {order.delivery.rider?.plate_number || 'Vehicle Assigned'}</p>
                </div>
              </div>

              <div className="flex gap-3 mb-10 pb-10 border-b border-gray-100">
                <a href={`tel:${order.delivery.rider?.phone || '0800000000'}`} className="flex-1 bg-[#2D2AEE] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/20">
                  <Phone size={18} /> Call Driver
                </a>
                <button
                  type="button"
                  onClick={() => navigate(`/app/order/${order.id}/chat`)}
                  className="w-12 h-12 bg-[#F4F5F7] hover:bg-gray-200 text-gray-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
                  aria-label="Message rider"
                >
                  <MessageSquare size={20} />
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-[12px] font-bold text-gray-400 tracking-widest uppercase mb-4">Your Courier</h3>
              <div className="bg-[#FFF4E5] rounded-xl p-5 flex items-center justify-center gap-4 border border-orange-100 mb-10 pb-10 border-b-0 border-b-gray-100 relative">
                <div className="absolute -bottom-10 left-0 right-0 h-[1px] bg-gray-100"></div>
                <div className="w-8 h-8 rounded-full border-[3px] border-orange-400 border-t-transparent animate-spin shrink-0"></div>
                <p className="text-[15px] font-bold text-orange-600">Assigning a driver to your order...</p>
              </div>
            </>
          )}

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

          {order?.status === 'cancelled' ? (
            <p className="mt-4 text-center text-[13px] font-bold text-red-500 uppercase tracking-wider">Order cancelled</p>
          ) : canCancel ? (
            <button
              type="button"
              disabled={cancelling}
              onClick={handleCancelOrder}
              className="mt-4 w-full text-[13px] font-bold text-red-500 uppercase tracking-wider hover:text-red-700 transition-colors disabled:opacity-60"
            >
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          ) : null}

        </div>

      </div>
    </div>
  )
}