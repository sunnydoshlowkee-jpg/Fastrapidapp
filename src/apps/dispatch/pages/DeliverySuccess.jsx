import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, MapPin, Wallet } from 'lucide-react'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'
import { useAuth } from '../../../context/AuthContext'

// Distance calculator
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

export default function DeliverySuccess() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchDetails } = useRiderDeliveries()
  const { user } = useAuth()
  
  const [delivery, setDelivery] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchDetails(id).then(data => {
        setDelivery(data)
      }).catch(err => {
        console.error(err)
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [id, fetchDetails])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-[#5B5BFF] animate-spin" />
      </div>
    )
  }

  const riderName = user?.first_name || 'Rider'
  const deliveryFee = delivery?.fee || delivery?.order?.delivery_fee || 0
  const orderId = delivery?.order?.id || delivery?.order_id || id || '0000'
  
  const merchant = delivery?.order?.items?.[0]?.product?.merchant
  const address = delivery?.order?.delivery_address
  
  const merchantLocation = delivery?.pickup_lat 
    ? { lat: Number(delivery.pickup_lat), lng: Number(delivery.pickup_lng) } 
    : merchant?.latitude ? { lat: Number(merchant.latitude), lng: Number(merchant.longitude) } : { lat: 6.5244, lng: 3.3792 }
  
  const customerLocation = delivery?.destination_lat
    ? { lat: Number(delivery.destination_lat), lng: Number(delivery.destination_lng) }
    : address?.latitude ? { lat: Number(address.latitude), lng: Number(address.longitude) } : { lat: 6.5000, lng: 3.3500 }

  const distance = getDistanceFromLatLonInKm(merchantLocation.lat, merchantLocation.lng, customerLocation.lat, customerLocation.lng)
  
  // Calculate time taken (approximate based on updated_at and created_at)
  let timeTaken = 24; // fallback
  if (delivery?.created_at && delivery?.updated_at) {
    const start = new Date(delivery.created_at).getTime();
    const end = new Date(delivery.updated_at).getTime();
    const diffMins = Math.max(1, Math.round((end - start) / 60000));
    timeTaken = diffMins;
  }

  // Example daily bonus (mocked as 1/10 to avoid the dummy 8/10 look)
  const progress = 1
  const total = 10
  const pct = (progress / total) * 100

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-5 pt-5 pb-10"
      style={{ background: 'linear-gradient(180deg, #F4F4FF 0%, #FAFAFF 100%)' }}>

      {/* Header */}
      <div className="flex items-center mb-10">
        <button onClick={() => navigate('/dispatch')}
          className="w-9 h-9 flex items-center justify-center mr-3">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="text-base font-bold text-gray-900">Transaction Success</p>
      </div>

      {/* Success icon */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.12)' }}>
            {/* Inner circle */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: '#22c55e' }}>
              {/* Checkmark */}
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-[26px] font-black text-gray-900 mb-1">
          Delivery Complete! 🎉
        </h1>
        <p className="text-gray-500 text-sm">Great job, {riderName}!</p>
      </div>

      {/* Earnings banner */}
      <div className="rounded-2xl px-5 py-4 flex items-center gap-4 mb-4"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Wallet size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-black text-sm">₦{Number(deliveryFee).toLocaleString()} added to your wallet</p>
          <p className="text-white/70 text-xs mt-0.5">Order #{orderId}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-2xl px-4 py-4" style={{ background: '#EBEBF5' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <Clock size={12} className="text-gray-400" />
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time Taken</p>
          </div>
          <p className="text-xl font-black text-gray-900">{timeTaken} mins</p>
        </div>
        <div className="rounded-2xl px-4 py-4" style={{ background: '#EBEBF5' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={12} className="text-gray-400" />
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Distance</p>
          </div>
          <p className="text-xl font-black text-gray-900">{distance} km</p>
        </div>
      </div>

      {/* Daily bonus progress */}
      <div className="rounded-2xl px-5 py-4 mb-8" style={{ background: '#EBEBF5' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-900 text-sm">Daily Bonus Progress</p>
          <p className="font-black text-gray-900 text-sm">{progress} / {total}</p>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-300/60 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
          />
        </div>
        <p className="text-xs text-gray-400">
          Complete {total - progress} more deliveries to earn ₦2,000 bonus!
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate('/dispatch')}
          className="w-full py-[18px] rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate('/dispatch/earnings')}
          className="w-full py-[18px] rounded-2xl font-bold text-base border-2 transition-opacity active:opacity-80"
          style={{ borderColor: '#5B5BFF', color: '#5B5BFF', background: 'white' }}
        >
          View Earnings
        </button>
      </div>
    </div>
  )
}
