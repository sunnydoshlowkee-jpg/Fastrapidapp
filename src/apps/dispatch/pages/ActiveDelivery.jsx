import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'
import { getCurrentPosition } from '../../../utils/geolocation'
import L from 'leaflet'
import {
  ArrowLeft, Bell, Crosshair, Layers, Phone, MessageSquare,
  Navigation, Package, Camera, CheckSquare, Square, Navigation2
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'

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

// ─── Custom Leaflet Icons ────────────────────────────────────────
const createPulseIcon = () => new L.divIcon({
  html: `<div class="relative flex h-6 w-6 items-center justify-center">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border-2 border-white shadow-sm"></span>
         </div>`,
  className: 'bg-transparent',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const createPinIcon = (color = '#EF4444') => new L.divIcon({
  html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
  className: 'bg-transparent',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// ─── Map Updater ──────────────────────────────────────────────────
function MapUpdater({ riderLocation, targetLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (riderLocation && targetLocation) {
      const bounds = L.latLngBounds([
        [riderLocation.lat, riderLocation.lng],
        [targetLocation.lat, targetLocation.lng]
      ]);
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1 });
    } else if (riderLocation) {
      map.flyTo([riderLocation.lat, riderLocation.lng], 15, { animate: true, duration: 1 });
    }
  }, [riderLocation, targetLocation, map]);

  return null;
}

// ─── Shared Live Leaflet Map ──────────────────────────────────────
function LiveMap({ riderLocation, targetLocation, children }) {
  const center = riderLocation || targetLocation || { lat: 6.5244, lng: 3.3792 };
  const position = [Number(center.lat), Number(center.lng)];

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer 
        center={position} 
        zoom={14} 
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <MapUpdater riderLocation={riderLocation} targetLocation={targetLocation} />
        
        {targetLocation && (
          <Marker position={[targetLocation.lat, targetLocation.lng]} icon={createPinIcon('#22C55E')} />
        )}
        {riderLocation && (
          <Marker position={[riderLocation.lat, riderLocation.lng]} icon={createPulseIcon()} />
        )}
        {riderLocation && targetLocation && (
           <Polyline 
            positions={[[riderLocation.lat, riderLocation.lng], [targetLocation.lat, targetLocation.lng]]} 
            pathOptions={{ color: '#5B5BFF', weight: 4, opacity: 0.8, dashArray: '8, 8' }} 
          />
        )}
      </MapContainer>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.4) 0%, transparent 20%, rgba(10,22,40,0.1) 100%)', zIndex: 1000 }} />
      {children}
    </div>
  )
}

// ─── Shared order header bar ──────────────────────────────────────
function OrderHeader({ onBack, orderId }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-12 pb-3 bg-gradient-to-b from-gray-900/90 to-transparent">
      <button onClick={onBack} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
        <ArrowLeft size={20} className="text-white" />
      </button>
      <div className="flex flex-col items-center gap-1 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full">
        <span className="text-white font-bold text-sm">Order #{orderId || 'Rapid'}</span>
      </div>
      <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
        <Bell size={20} className="text-white" />
      </button>
    </div>
  )
}

// ─── Floating Turn Card ───────────────────────────────────────────
function TurnCard({ title, subtitle, distance, eta }) {
  return (
    <div className="absolute top-[100px] left-4 right-4 z-20 animate-in slide-in-from-top-4 fade-in duration-500">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B5BFF] to-[#4444EE] flex items-center justify-center flex-shrink-0 shadow-inner">
          <Navigation2 size={24} className="text-white fill-white/20" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-black text-gray-900 text-base truncate">{title}</p>
          <p className="text-xs font-semibold text-gray-500 truncate">{subtitle}</p>
        </div>
        <div className="text-right border-l border-gray-200 pl-4">
          <p className="text-lg font-black text-[#5B5BFF]">{eta}m</p>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{distance}km</p>
        </div>
      </div>
    </div>
  )
}

// ─── Live Tracking Pill ───────────────────────────────────────────
function LiveTrackingPill() {
  return (
    <div className="absolute bottom-[280px] left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-700/50">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
        <span className="text-white text-[11px] font-bold uppercase tracking-wider">Live Tracking Active</span>
      </div>
    </div>
  )
}

// ─── Checklist item ───────────────────────────────────────────────
function CheckItem({ label, checked, onToggle }) {
  return (
    <button onClick={onToggle}
      className={`w-full flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 active:scale-[0.98] border-2 ${checked ? 'bg-indigo-50/50 border-indigo-100' : 'bg-gray-50/50 border-transparent hover:bg-gray-100'}`}>
      <div className={`transition-transform duration-300 ${checked ? 'scale-110' : 'scale-100'}`}>
        {checked
          ? <CheckSquare size={22} className="text-[#5B5BFF] fill-indigo-100" />
          : <Square size={22} className="text-gray-300" />
        }
      </div>
      <span className={`text-sm font-bold transition-colors duration-300 ${checked ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
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
        (err) => {
          console.warn('Geolocation error:', err)
          setRiderLocation({ lat: 6.5244, lng: 3.3792 }) // Fallback to Lagos
        },
        { enableHighAccuracy: true, timeout: 5000 }
      )
    } else {
      setRiderLocation({ lat: 6.5244, lng: 3.3792 })
    }

    const timeout = setTimeout(() => {
      setRiderLocation(prev => prev || { lat: 6.5244, lng: 3.3792 })
    }, 3000)

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchDetails(id).then(data => {
        setDelivery(data)
        if (data.status === 'pending' || !data.status) setStep(STEPS.NEW_ORDER)
        else if (data.status === 'accepted') setStep(STEPS.HEADING_PICKUP)
        else if (data.status === 'picked_up') {
          setStep(STEPS.EN_ROUTE)
          setChecks({ collected: true, sealed: true, matches: true })
        }
        else if (data.status === 'delivered') navigate(`/dispatch/delivery/${id}/success`)
      }).catch(err => console.error(err)).finally(() => setLoading(false))
    }
  }, [id, fetchDetails, navigate])

  const toggleCheck = key => setChecks(c => ({ ...c, [key]: !c[key] }))
  const allChecked = Object.values(checks).every(Boolean)

  const handleAccept = async () => {
    try {
      setIsProcessing(true)
      await accept(id)
      setStep(STEPS.HEADING_PICKUP)
      try {
         const coords = await getCurrentPosition()
         await updateStatus(id, 'accepted', coords)
      } catch(e) {} 
    } catch (e) {
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
        coords = {
          lat: delivery?.order?.delivery_address?.lat || 6.5244,
          lng: delivery?.order?.delivery_address?.lng || 3.3792
        }
      }
      await handleStatusUpdate('delivered', null, coords)
      navigate(`/dispatch/delivery/${id}/success`)
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to complete delivery.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-[#5B5BFF] animate-spin" />
      </div>
    )
  }

  const merchant = delivery?.order?.items?.[0]?.product?.merchant
  const customer = delivery?.order?.user
  const customerName = customer ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer' : 'Customer'
  const address = delivery?.order?.delivery_address
  const deliveryFee = delivery?.fee || delivery?.order?.delivery_fee || 0
  const itemsCount = delivery?.order?.items?.length || 1

  // Determine locations and distances
  const merchantLocation = delivery?.pickup_lat 
    ? { lat: Number(delivery.pickup_lat), lng: Number(delivery.pickup_lng) } 
    : merchant?.latitude ? { lat: Number(merchant.latitude), lng: Number(merchant.longitude) } : { lat: 6.5244, lng: 3.3792 }
  
  const customerLocation = delivery?.destination_lat
    ? { lat: Number(delivery.destination_lat), lng: Number(delivery.destination_lng) }
    : address?.latitude ? { lat: Number(address.latitude), lng: Number(address.longitude) } : { lat: 6.5000, lng: 3.3500 }

  const distToMerchant = getDistanceFromLatLonInKm(riderLocation?.lat, riderLocation?.lng, merchantLocation?.lat, merchantLocation?.lng)
  const distToCustomer = getDistanceFromLatLonInKm(riderLocation?.lat, riderLocation?.lng, customerLocation?.lat, customerLocation?.lng)
  
  const estMinsMerchant = distToMerchant > 0 ? Math.max(1, Math.round(distToMerchant * 4)) : '--'
  const estMinsCustomer = distToCustomer > 0 ? Math.max(1, Math.round(distToCustomer * 4)) : '--'

  // Decide Target for Map based on Step
  let targetLocation = null;
  if (step === STEPS.NEW_ORDER || step === STEPS.HEADING_PICKUP || step === STEPS.CONFIRM_PICKUP) targetLocation = merchantLocation;
  if (step === STEPS.EN_ROUTE || step === STEPS.CONFIRM_DELIVERY) targetLocation = customerLocation;

  return (
    <div className="relative min-h-screen max-w-md mx-auto overflow-hidden bg-gray-900">
      
      {/* ── FULL SCREEN LIVE MAP ── */}
      <LiveMap riderLocation={riderLocation} targetLocation={targetLocation} />

      {/* ── HEADER ── */}
      {step !== STEPS.NEW_ORDER && (
        <OrderHeader onBack={() => navigate('/dispatch')} orderId={delivery?.order_id || id} />
      )}

      {/* ── TURN CARDS ── */}
      {step === STEPS.HEADING_PICKUP && (
        <TurnCard title={`Head to ${merchant?.business_name || 'Pickup'}`} subtitle={merchant?.registered_address || 'Proceed to restaurant'} distance={distToMerchant} eta={estMinsMerchant} />
      )}
      {step === STEPS.EN_ROUTE && (
        <TurnCard title={`Deliver to ${customerName}`} subtitle={address?.address || 'Proceed to destination'} distance={distToCustomer} eta={estMinsCustomer} />
      )}

      {/* ── LIVE TRACKING PILL ── */}
      {(step === STEPS.HEADING_PICKUP || step === STEPS.EN_ROUTE) && (
        <LiveTrackingPill />
      )}

      {/* ── BOTTOM SHEETS ── */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        
        {/* NEW ORDER */}
        {step === STEPS.NEW_ORDER && (
          <div className="bg-white rounded-t-[2.5rem] px-6 pt-8 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom-full duration-500 ease-out">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full uppercase tracking-widest">Instant Delivery</span>
                <h2 className="text-2xl font-black text-gray-900 mt-3">Food Pickup</h2>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 mb-0.5">EST. EARNINGS</p>
                <p className="text-3xl font-black text-green-500">₦{Number(deliveryFee).toLocaleString()}</p>
              </div>
            </div>
            {/* Route summary */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200 border-dashed">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">A</div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-gray-900 truncate">{merchant?.business_name || 'Merchant'}</p>
                  <p className="text-xs text-gray-500 truncate">{merchant?.registered_address || 'Merchant Location'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm">B</div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-gray-900 truncate">{customerName}</p>
                  <p className="text-xs text-gray-500 truncate">{address?.address || 'Customer Location'}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => navigate(-1)} className="flex-1 py-4 rounded-2xl border-2 border-red-100 text-red-500 font-black text-sm uppercase tracking-wider hover:bg-red-50 active:scale-95 transition-all">Decline</button>
              <button onClick={handleAccept} disabled={isProcessing} className="flex-1 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider bg-gradient-to-r from-[#5B5BFF] to-[#4444EE] shadow-[0_8px_16px_rgba(91,91,255,0.3)] active:scale-95 transition-all disabled:opacity-50">
                {isProcessing ? 'Accepting...' : 'Accept'}
              </button>
            </div>
          </div>
        )}

        {/* HEADING TO PICKUP */}
        {step === STEPS.HEADING_PICKUP && (
          <div className="bg-white rounded-t-[2.5rem] px-6 pt-6 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-500 ease-out">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                {merchant?.logo_path ? <img src={merchant.logo_path} alt="" className="w-full h-full object-cover" /> : <span className="text-2xl">🍔</span>}
              </div>
              <div className="flex-1">
                <p className="font-black text-lg text-gray-900">{merchant?.business_name || 'Restaurant'}</p>
                <p className="text-sm text-gray-500 truncate">{merchant?.registered_address || 'Merchant Address'}</p>
              </div>
              <a href={`tel:${merchant?.phone || '000'}`} className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
                <Phone size={18} />
              </a>
            </div>
            <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 mb-6">
              <div className="flex items-center gap-3">
                <Package size={20} className="text-[#5B5BFF]" />
                <span className="text-sm font-bold text-gray-900">{itemsCount} Items Ready</span>
              </div>
              <button onClick={() => setStep(STEPS.CONFIRM_PICKUP)} className="text-xs font-black text-[#5B5BFF] uppercase tracking-wider">Checklist</button>
            </div>
            <button onClick={() => setStep(STEPS.CONFIRM_PICKUP)} className="w-full py-[18px] rounded-2xl text-white font-black text-base bg-gradient-to-r from-[#5B5BFF] to-[#4444EE] shadow-[0_8px_20px_rgba(91,91,255,0.3)] active:scale-[0.98] transition-all">
              Arrived at Pickup
            </button>
          </div>
        )}

        {/* CONFIRM PICKUP */}
        {step === STEPS.CONFIRM_PICKUP && (
          <div className="bg-white rounded-t-[2.5rem] px-6 pt-6 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-full duration-500 ease-out">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm Pickup</h2>
            <p className="text-gray-500 text-sm font-medium mb-6">Verify items before leaving the merchant</p>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">👤</div>
              <div>
                <p className="text-[10px] font-black text-[#5B5BFF] uppercase tracking-widest mb-0.5">Delivering To</p>
                <p className="font-bold text-gray-900">{customerName}</p>
              </div>
            </div>

            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Order Items</p>
            <div className="flex flex-col gap-3 mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              {(delivery?.order?.items || []).map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-black text-[#5B5BFF] w-6 shrink-0">{item.quantity}×</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.product?.name || 'Item'}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Pickup Checklist</p>
            <div className="flex flex-col gap-3 mb-8">
              <CheckItem label="All items collected correctly" checked={checks.collected} onToggle={() => toggleCheck('collected')} />
              <CheckItem label="Order is properly sealed" checked={checks.sealed} onToggle={() => toggleCheck('sealed')} />
              <CheckItem label="Receipt matches the app" checked={checks.matches} onToggle={() => toggleCheck('matches')} />
            </div>

            <button onClick={() => handleStatusUpdate('picked_up', STEPS.EN_ROUTE)} disabled={!allChecked || isProcessing} className="w-full py-[18px] rounded-2xl text-white font-black text-base bg-gradient-to-r from-[#5B5BFF] to-[#4444EE] shadow-[0_8px_20px_rgba(91,91,255,0.3)] active:scale-[0.98] transition-all disabled:opacity-40 disabled:scale-100 disabled:shadow-none">
              {isProcessing ? 'Confirming...' : 'Start Delivery Route'}
            </button>
          </div>
        )}

        {/* EN ROUTE */}
        {step === STEPS.EN_ROUTE && (
          <div className="bg-white rounded-t-[2.5rem] px-6 pt-6 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-500 ease-out">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 inline-block">On the Way</span>
                <p className="text-2xl font-black text-gray-900">{customerName}</p>
                <p className="text-sm text-gray-500 font-medium mt-1 truncate max-w-[250px]">{address?.address || 'Customer Address'}</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a href={`tel:${customer?.phone || '000'}`} className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100">
                  <Phone size={18} />
                </a>
                <button onClick={() => navigate(`/dispatch/delivery/${id}/chat`)} className="w-10 h-10 rounded-full bg-blue-50 text-[#5B5BFF] flex items-center justify-center hover:bg-blue-100">
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time to dropoff</p>
                <p className="text-2xl font-black text-gray-900">{estMinsCustomer}<span className="text-sm text-gray-500 ml-1">min</span></p>
              </div>
              <div className="bg-[#5B5BFF]/5 border border-[#5B5BFF]/20 rounded-2xl p-4">
                <p className="text-[10px] font-black text-[#5B5BFF] uppercase tracking-widest mb-1">Your payout</p>
                <p className="text-2xl font-black text-gray-900">₦{Number(deliveryFee).toLocaleString()}</p>
              </div>
            </div>

            <button onClick={() => setStep(STEPS.CONFIRM_DELIVERY)} className="w-full py-[18px] rounded-2xl text-white font-black text-base bg-gradient-to-r from-[#5B5BFF] to-[#4444EE] shadow-[0_8px_20px_rgba(91,91,255,0.3)] active:scale-[0.98] transition-all">
              I have arrived
            </button>
          </div>
        )}

        {/* CONFIRM DELIVERY */}
        {step === STEPS.CONFIRM_DELIVERY && (
          <div className="bg-white rounded-t-[2.5rem] px-6 pt-6 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-500 ease-out">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
            <h2 className="text-2xl font-black text-gray-900 mb-1">Complete Delivery</h2>
            <p className="text-gray-500 text-sm font-medium mb-6">Hand over the items to {customerName}</p>

            <label className="cursor-pointer block mb-8">
              <input type="file" accept="image/*" className="hidden" onChange={() => setPhotoTaken(true)} />
              <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center gap-3 py-8 ${photoTaken ? 'border-[#5B5BFF] bg-indigo-50/50 scale-[0.98]' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${photoTaken ? 'bg-[#5B5BFF] text-white' : 'bg-white shadow-sm text-gray-400'}`}>
                  <Camera size={24} />
                </div>
                <p className={`text-sm font-bold ${photoTaken ? 'text-[#5B5BFF]' : 'text-gray-500'}`}>
                  {photoTaken ? 'Photo Captured Successfully ✓' : 'Take a proof of delivery photo (Optional)'}
                </p>
              </div>
            </label>

            <button onClick={handleCompleteDelivery} disabled={isProcessing} className="w-full py-[18px] rounded-2xl text-white font-black text-base bg-gradient-to-r from-green-500 to-green-600 shadow-[0_8px_20px_rgba(34,197,94,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none">
              {isProcessing ? 'Completing...' : 'Mark as Delivered'}
            </button>
            <button onClick={() => setStep(STEPS.EN_ROUTE)} className="w-full mt-3 py-4 rounded-2xl text-gray-500 font-bold text-sm hover:bg-gray-50 transition-colors">
              Go back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
