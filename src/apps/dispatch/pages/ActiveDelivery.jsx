import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'
import { getCurrentPosition } from '../../../utils/geolocation'
import {
  ArrowLeft, Bell, Crosshair, Layers, Phone, MessageSquare,
  Navigation, Package, Camera, CheckSquare, Square, ChevronRight, Clock
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'

// ─── Step constants ───────────────────────────────────────────────
const STEPS = {
  NEW_ORDER:       'new-order',
  HEADING_PICKUP:  'heading-pickup',
  CONFIRM_PICKUP:  'confirm-pickup',
  EN_ROUTE:        'en-route',
  CONFIRM_DELIVERY:'confirm-delivery',
}

// ─── Helper: Distance Calculator ───────────────────────────────────
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
  return (R * c).toFixed(1);
}

// ─── Shared Live Leaflet Map ──────────────────────────────────────
function LiveMap({ height = '45%', riderLocation, targetLocation, children }) {
  const center = riderLocation || targetLocation || { lat: 6.5244, lng: 3.3792 };
  const position = [Number(center.lat), Number(center.lng)];

  return (
    <div className="relative flex-shrink-0" style={{ height }}>
      <MapContainer 
        center={position} 
        zoom={14} 
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {targetLocation && <Marker position={[targetLocation.lat, targetLocation.lng]} />}
        {riderLocation && <Marker position={[riderLocation.lat, riderLocation.lng]} />}
        {riderLocation && targetLocation && (
           <Polyline positions={[[riderLocation.lat, riderLocation.lng], [targetLocation.lat, targetLocation.lng]]} pathOptions={{ color: '#5B5BFF', weight: 4, opacity: 0.8 }} />
        )}
      </MapContainer>
      {/* Optional dark overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, transparent 30%, rgba(10,22,40,0.2) 100%)', zIndex: 1000 }} />
      {children}
    </div>
  )
}

// ─── FAB map controls ─────────────────────────────────────────────
function MapFabs() {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
      <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
        <Crosshair size={18} className="text-gray-700" />
      </button>
      <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform">
        <Layers size={18} className="text-gray-700" />
      </button>
    </div>
  )
}

// ─── Shared order header bar ──────────────────────────────────────
function OrderHeader({ onBack, orderId }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-12 pb-3"
      style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.95) 60%, transparent)' }}>
      <button onClick={onBack} className="w-9 h-9 flex items-center justify-center">
        <ArrowLeft size={20} className="text-white" />
      </button>
      <div className="flex flex-col items-center gap-1">
        <span className="text-white font-bold text-sm">Order #{orderId || 'Rapid'}</span>
        <span className="bg-[#5B5BFF] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">Food Order</span>
      </div>
      <button className="w-9 h-9 flex items-center justify-center">
        <Bell size={20} className="text-white" />
      </button>
    </div>
  )
}

// ─── Checklist item ───────────────────────────────────────────────
function CheckItem({ label, checked, onToggle }) {
  return (
    <button onClick={onToggle}
      className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5 text-left transition-colors active:bg-gray-100">
      {checked
        ? <CheckSquare size={20} fill="#5B5BFF" strokeWidth={0} style={{ color: '#5B5BFF' }} />
        : <Square size={20} className="text-gray-300" />
      }
      <span className={`text-sm font-semibold ${checked ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════
export default function ActiveDelivery() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchDetails, accept, updateStatus } = useRiderDeliveries()
  
  const [delivery, setDelivery] = useState(null)
  const [step, setStep] = useState(STEPS.NEW_ORDER)
  const [checks, setChecks] = useState({ collected: false, sealed: false, matches: false })
  const [photoTaken, setPhotoTaken] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [riderLocation, setRiderLocation] = useState(null)

  useEffect(() => {
    let watchId;
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => setRiderLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn(err),
        { enableHighAccuracy: true }
      )
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchDetails(id).then(data => {
        setDelivery(data)
        if (data.status === 'pending' || !data.status) {
          setStep(STEPS.NEW_ORDER)
        } else if (data.status === 'accepted') {
          setStep(STEPS.HEADING_PICKUP)
        } else if (data.status === 'picked_up') {
          setStep(STEPS.EN_ROUTE)
          setChecks({ collected: true, sealed: true, matches: true })
        } else if (data.status === 'delivered') {
          navigate(`/dispatch/delivery/${id}/success`)
        }
      }).catch(err => {
        console.error("Error loading delivery details", err)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [id, fetchDetails, navigate])

  const toggleCheck = key => setChecks(c => ({ ...c, [key]: !c[key] }))
  const allChecked = Object.values(checks).every(Boolean)

  const handleAccept = async () => {
    try {
      setIsProcessing(true)
      await accept(id)
      setStep(STEPS.HEADING_PICKUP)
      
      // Let's also do a quick status update to accepted, and pass initial coords if possible
      try {
         const coords = await getCurrentPosition()
         await updateStatus(id, 'accepted', coords)
      } catch(e) {} // ignore
      
    } catch (e) {
      console.error(e)
      alert(e.response?.data?.message || "Failed to accept delivery")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleStatusUpdate = async (status, nextStep, coords = null) => {
    try {
      setIsProcessing(true)
      await updateStatus(id, status, coords)
      if (nextStep) setStep(nextStep)
    } catch (e) {
      console.error(e)
      alert(e.response?.data?.message || 'Failed to update status')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCompleteDelivery = async () => {
    try {
      let coords = null;
      try {
        coords = await getCurrentPosition()
      } catch (geoErr) {
        console.warn('Geolocation failed or denied, proceeding with default coordinates:', geoErr.message)
        // Fallback to merchant or destination coordinates if available, otherwise use a safe default
        coords = {
          lat: delivery?.order?.delivery_address?.lat || 6.5244,
          lng: delivery?.order?.delivery_address?.lng || 3.3792
        }
      }
      await handleStatusUpdate('delivered', null, coords)
      navigate(`/dispatch/delivery/${id}/success`)
    } catch (e) {
      console.error(e)
      alert(e.response?.data?.message || 'Failed to complete delivery.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-md mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-[#5B5BFF] animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-bold text-sm">Loading task details...</p>
        </div>
      </div>
    )
  }

  const merchant = delivery?.order?.items?.[0]?.product?.merchant
  const customer = delivery?.order?.user
  const customerName = customer ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer' : 'Customer'
  const address = delivery?.order?.delivery_address
  const deliveryFee = delivery?.fee || delivery?.order?.delivery_fee || 0
  const itemsCount = delivery?.order?.items?.length || 1

  // ── NEW ORDER MODAL ────────────────────────────────────────────
  if (step === STEPS.NEW_ORDER) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col max-w-md mx-auto overflow-hidden">
        {/* Map & Overlay behind */}
        <div className="absolute inset-0 z-0">
          <LiveMap height="100%" riderLocation={riderLocation} targetLocation={merchant?.latitude ? { lat: merchant.latitude, lng: merchant.longitude } : null} />
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
        </div>

        {/* Spacer pushes bottom sheet down */}
        <div className="flex-1 z-10" />

        {/* Red accent line */}
        <div className="relative z-10 h-1 w-full" style={{ background: 'linear-gradient(90deg, #EF4444, #5B5BFF)' }} />

        {/* Bottom sheet */}
        <div className="relative z-10 bg-white rounded-t-[2rem] px-5 pt-6 pb-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="text-[10px] font-bold border border-gray-300 text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider">
                Instant Delivery
              </span>
              <h2 className="text-xl font-black text-gray-900 mt-2">Food Pickup</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">Estimated Fee</p>
              <p className="text-2xl font-black" style={{ color: '#22c55e' }}>₦{Number(deliveryFee).toLocaleString()}</p>
            </div>
          </div>

          {/* Restaurant */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-900 flex-shrink-0 flex items-center justify-center">
              {merchant?.logo_path ? (
                <img src={merchant.logo_path} alt={merchant.business_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">🍔</span>
              )}
            </div>
            <div>
              <p className="font-bold text-gray-900">{merchant?.business_name || 'Fastrapid Merchant'}</p>
              <p className="text-sm text-gray-400">{merchant?.address_city || 'Lagos'}</p>
            </div>
          </div>

          {/* Route */}
          <div className="flex gap-3 mb-6">
            {/* Connector line */}
            <div className="flex flex-col items-center pt-1 gap-0">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0" />
              <div className="w-0.5 flex-1 bg-gray-200 my-1" style={{ minHeight: '36px' }} />
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Pickup</p>
                <p className="font-bold text-gray-900 text-sm">{merchant?.registered_address || 'Merchant Location'}</p>
                <p className="text-xs text-gray-400">Merchant Location</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Dropoff</p>
                <p className="font-bold text-gray-900 text-sm">{address?.address || 'Customer Location'}</p>
                <p className="text-xs text-gray-400">Customer Location</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => navigate(-1)}
              className="flex-1 py-4 rounded-2xl border-2 border-red-400 text-red-500 font-black text-sm uppercase tracking-wider transition-opacity active:opacity-70">
              Decline
            </button>
            <button onClick={handleAccept} disabled={isProcessing}
              className="flex-1 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-opacity active:opacity-80 disabled:opacity-50"
              style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
              {isProcessing ? 'Accepting...' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── HEADING TO PICKUP ──────────────────────────────────────────
  if (step === STEPS.HEADING_PICKUP) {
    const merchantLocation = delivery?.pickup_lat 
      ? { lat: Number(delivery.pickup_lat), lng: Number(delivery.pickup_lng) } 
      : merchant?.latitude ? { lat: Number(merchant.latitude), lng: Number(merchant.longitude) } : null
    const distKm = getDistanceFromLatLonInKm(riderLocation?.lat, riderLocation?.lng, merchantLocation?.lat, merchantLocation?.lng)
    const estMins = distKm > 0 ? Math.max(1, Math.round(distKm * 4)) : '--'

    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
        <div className="relative" style={{ height: '55vh' }}>
          <LiveMap height="100%" riderLocation={riderLocation} targetLocation={merchantLocation}>
            <OrderHeader onBack={() => navigate('/dispatch')} orderId={delivery?.order_id || id} />
            <MapFabs />
          </LiveMap>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 px-4 py-3 bg-gray-50">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
            <p className="text-xl font-black text-gray-900">{estMins} mins</p>
          </div>
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Distance</p>
            <p className="text-xl font-black text-gray-900">{distKm > 0 ? `${distKm}km` : '--'}</p>
          </div>
        </div>

        {/* Turn instruction */}
        <div className="mx-4 mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: '#0d1628' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#5B5BFF' }}>
            <Navigation size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm truncate max-w-[220px]">Head towards {merchant?.business_name || 'Pickup'}</p>
            <p className="text-gray-400 text-xs">Drive safely</p>
          </div>
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-t-3xl px-5 pt-5 pb-6 flex-1 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          {/* Status pill */}
          <div className="flex justify-center mb-4">
            <span className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              Heading to Pickup
            </span>
          </div>

          {/* Restaurant row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-900 flex-shrink-0 flex items-center justify-center">
              {merchant?.logo_path ? (
                <img src={merchant.logo_path} alt={merchant.business_name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🍔</span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{merchant?.business_name || 'Fastrapid Merchant'}</p>
              <p className="text-xs text-gray-400 truncate max-w-[200px]">{merchant?.registered_address || 'Merchant Location'}</p>
            </div>
            <a href={`tel:${merchant?.phone || '000'}`} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Phone size={16} style={{ color: '#5B5BFF' }} />
            </a>
            <button onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(merchant?.address_line1 || '')}`, '_blank')} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Navigation size={16} style={{ color: '#5B5BFF' }} />
            </button>
          </div>

          {/* Items row */}
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 mb-5">
            <div className="flex items-center gap-3">
              <Package size={18} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">{itemsCount} Items • Ready for pickup</span>
            </div>
            <button onClick={() => setStep(STEPS.CONFIRM_PICKUP)} className="text-xs font-bold" style={{ color: '#5B5BFF' }}>Checklist</button>
          </div>

          {/* CTA */}
          <button onClick={() => setStep(STEPS.CONFIRM_PICKUP)}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
            Arrived at Pickup
          </button>
        </div>
      </div>
    )
  }

  // ── CONFIRM PICKUP ────────────────────────────────────────────
  if (step === STEPS.CONFIRM_PICKUP) {
    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
        {/* Map */}
        <div className="relative" style={{ height: '28vh' }}>
          <LiveMap height="100%" riderLocation={riderLocation} targetLocation={merchant?.latitude ? { lat: merchant.latitude, lng: merchant.longitude } : null}>
            <OrderHeader onBack={() => setStep(STEPS.HEADING_PICKUP)} orderId={delivery?.order_id || id} />
          </LiveMap>
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-t-3xl flex-1 px-5 pt-5 pb-6 overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

          <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm Pickup</h2>
          <p className="text-gray-500 text-sm mb-5">Verify the items before starting delivery</p>

          {/* Delivering to */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 mb-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#5B5BFF' }}>
              <span className="text-white text-lg">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Delivering To</p>
              <p className="font-bold text-gray-900">{customerName}</p>
            </div>
            <button onClick={() => navigate(`/dispatch/delivery/${id}/chat`)} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
              <MessageSquare size={14} className="text-white" />
            </button>
            <a href={`tel:${customer?.phone || '000'}`} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center ml-1">
              <Phone size={14} className="text-white" />
            </a>
          </div>

          {/* Order summary */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Summary</p>
            <p className="text-[10px] font-bold" style={{ color: '#5B5BFF' }}>ID: #{delivery?.order_id || id}</p>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            {(delivery?.order?.items || []).map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-xs font-black text-gray-400 w-6 flex-shrink-0 mt-0.5">{item.quantity}×</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.product?.name || 'Item'}</p>
                  <p className="text-xs text-gray-400">{item.product?.description || ''}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final checklist */}
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Final Checklist</p>
          <div className="flex flex-col gap-2 mb-6">
            <CheckItem label="All items collected" checked={checks.collected} onToggle={() => toggleCheck('collected')} />
            <CheckItem label="Order sealed" checked={checks.sealed} onToggle={() => toggleCheck('sealed')} />
            <CheckItem label="Order matches receipt" checked={checks.matches} onToggle={() => toggleCheck('matches')} />
          </div>

          <button onClick={() => handleStatusUpdate('picked_up', STEPS.EN_ROUTE)}
            disabled={!allChecked || isProcessing}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-40"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
            {isProcessing ? 'Confirming...' : 'I have picked up this order'}
          </button>
        </div>
      </div>
    )
  }

  // ── EN ROUTE ──────────────────────────────────────────────────
  if (step === STEPS.EN_ROUTE) {
    const customerLocation = delivery?.destination_lat
      ? { lat: Number(delivery.destination_lat), lng: Number(delivery.destination_lng) }
      : address?.lat ? { lat: Number(address.lat), lng: Number(address.lng) } : null
    const distKm = getDistanceFromLatLonInKm(riderLocation?.lat, riderLocation?.lng, customerLocation?.lat, customerLocation?.lng)
    const estMins = distKm > 0 ? Math.max(1, Math.round(distKm * 4)) : '--'

    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
        {/* Map full top */}
        <div className="relative flex-1" style={{ minHeight: '50vh' }}>
          <LiveMap height="100%" riderLocation={riderLocation} targetLocation={customerLocation}>
            <OrderHeader onBack={() => navigate('/dispatch')} orderId={delivery?.order_id || id} />

            {/* Floating turn card */}
            <div className="absolute left-4 right-4 z-20" style={{ top: '90px' }}>
              <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                  <a href={`tel:${customer?.phone || '0800000000'}`} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                    <Phone size={18} /> Call Customer
                  </a>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#5B5BFF' }}>
                  <Navigation size={18} className="text-white" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="text-[14px] font-bold text-gray-900 tracking-wide">Order #{delivery?.order_id || delivery?.order?.id || id}</span>
                  <p className="text-[10px] font-black uppercase tracking-widest truncate" style={{ color: '#5B5BFF' }}>{distKm > 0 ? `${distKm}km Remaining` : 'En Route'}</p>
                  <p className="font-bold text-gray-900 text-sm truncate">Head towards {customer ? customerName : 'Dropoff'}</p>
                </div>
              </div>
            </div>

            {/* Live tracking pill */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-xs font-bold">Live Tracking Active</span>
              </div>
            </div>
          </LiveMap>
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

          {/* Status pill */}
          <div className="flex justify-center mb-4">
            <span className="text-xs font-bold px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>
              en route to customer
            </span>
          </div>

          {/* Customer info */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xl font-black text-gray-900">{customerName}</p>
              <p className="text-sm text-gray-400 mt-0.5">{address?.address || 'Customer Address'}</p>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${customer?.phone || '000'}`} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <Phone size={16} className="text-gray-600" />
              </a>
              <button onClick={() => navigate(`/dispatch/delivery/${id}/chat`)} className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <MessageSquare size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-2xl px-4 py-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Time to Dropoff</p>
              <p className="text-xl font-black text-gray-900">{estMins} mins</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Earnings</p>
              <p className="font-bold text-[18px]">₦{Number(deliveryFee).toLocaleString()}</p>
            </div>
          </div>

          <button onClick={() => setStep(STEPS.CONFIRM_DELIVERY)}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
            Confirm Arrival
          </button>
        </div>
      </div>
    )
  }

  // ── CONFIRM DELIVERY ──────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
      {/* Map */}
      <div className="relative" style={{ height: '30vh' }}>
        <LiveMap height="100%" riderLocation={riderLocation} targetLocation={address?.lat ? { lat: address.lat, lng: address.lng } : null}>
          <div className="absolute top-12 left-4 z-10">
            <button onClick={() => setStep(STEPS.EN_ROUTE)}
              className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-sm">
              <ArrowLeft size={20} className="text-white" />
            </button>
          </div>
        </LiveMap>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl flex-1 px-5 pt-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm Delivery</h2>
        <p className="text-gray-500 text-sm mb-5">Did you hand over the order?</p>

        {/* Order card */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(91,91,255,0.1)' }}>
            <Package size={18} style={{ color: '#5B5BFF' }} />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Order #{delivery?.order_id || id}</p>
            <p className="text-xs text-gray-400">{itemsCount} Items • {merchant?.name || 'Merchant'}</p>
          </div>
        </div>

        {/* Earnings banner */}
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-4"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💰</span>
          </div>
          <p className="text-white font-bold text-sm">You earned ₦{Number(deliveryFee).toLocaleString()} for this delivery</p>
        </div>

        {/* Photo upload */}
        <label className="cursor-pointer block mb-6">
          <input type="file" accept="image/*" className="hidden"
            onChange={() => setPhotoTaken(true)} />
          <div className={`rounded-2xl border-2 border-dashed flex flex-col items-center gap-2 py-7 transition-colors ${photoTaken ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
            <Camera size={24} style={{ color: photoTaken ? '#5B5BFF' : '#9CA3AF' }} />
            <p className="text-sm text-gray-500 font-medium">
              {photoTaken ? 'Photo captured ✓' : 'Take a delivery photo (optional)'}
            </p>
          </div>
        </label>

        <button 
          onClick={handleCompleteDelivery}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80 disabled:opacity-50"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
          {isProcessing ? 'Completing...' : 'Complete Delivery'}
        </button>
      </div>
    </div>
  )
}
