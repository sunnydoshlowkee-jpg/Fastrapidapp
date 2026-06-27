import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Star, Calendar, BarChart2, Gift, ChevronRight, MapPin, Utensils, ShoppingBasket } from 'lucide-react'
import { getMe } from '../../../services/authService'
import { toggleStatus } from '../../../services/riderAuthService'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'
import { GoogleMap, useLoadScript, Marker, Circle } from '@react-google-maps/api'

const ZONES = [
  { id: 'yaba', name: 'Yaba', activeRiders: 14, center: { lat: 6.5095, lng: 3.3711 } },
  { id: 'lekki', name: 'Lekki', activeRiders: 42, center: { lat: 6.4442, lng: 3.4831 } },
  { id: 'ikeja', name: 'Ikeja', activeRiders: 28, center: { lat: 6.5866, lng: 3.3563 } },
]

const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

export default function RiderDashboard() {
  const navigate = useNavigate()
  const [riderName, setRiderName] = useState('Chidi')
  const [online, setOnline] = useState(false)
  const { deliveries, refresh: refreshDeliveries, accept } = useRiderDeliveries()
  const { earnings, refresh: refreshEarnings } = useRiderEarnings()

  const [activeZone, setActiveZone] = useState(() => {
    const saved = localStorage.getItem('rider_zone')
    return saved ? JSON.parse(saved) : ZONES[0]
  })
  const [showZoneModal, setShowZoneModal] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(false)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  })

  useEffect(() => {
    getMe().then(res => {
      const u = res.data?.user || res.user || res.data
      if (u) {
        setRiderName(u.first_name || u.name?.split(' ')[0] || 'Rider')
      }
      
      const riderInfo = JSON.parse(localStorage.getItem('rider_user') || '{}')
      setOnline(riderInfo.is_online || false)
    }).catch(err => {
      console.error('Error fetching rider user', err)
      setRiderName('Rider')
    })
  }, [])

  const toggle = async () => {
    try {
      const response = await toggleStatus()
      const newStatus = response.data?.is_online ?? !online
      setOnline(newStatus)
      
      const riderInfo = JSON.parse(localStorage.getItem('rider_user') || '{}')
      riderInfo.is_online = newStatus
      localStorage.setItem('rider_user', JSON.stringify(riderInfo))
    } catch (err) {
      console.error('Error toggling rider status', err)
      alert('Failed to update online status')
    }
  }

  useEffect(() => {
    if (online) {
      refreshDeliveries(6.5244, 3.3792)
      const interval = setInterval(() => {
        refreshDeliveries(6.5244, 3.3792)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [online, refreshDeliveries])

  useEffect(() => {
    refreshEarnings()
  }, [refreshEarnings])

  const handleAccept = async (deliveryId) => {
    try {
      await accept(deliveryId)
      navigate(`/dispatch/delivery/${deliveryId}`)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to accept delivery. It may have been assigned to another rider.')
    }
  }

  const walletBalance = earnings?.wallet?.balance || 0
  const totalEarnings = earnings?.earnings?.total || 0
  const totalOrders = earnings?.earnings?.recent?.length || 0

  return (
    <div className="min-h-screen bg-gray-50 pb-4">

      {/* ── Header ── */}
      <div className="sticky top-0 z-50 bg-gray-50 px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[17px] font-bold" style={{ color: '#5B5BFF' }}>
            Good morning, {riderName} 👋
          </p>
        </div>
        <button onClick={() => navigate('/dispatch/notifications')} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Bell size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="px-5 space-y-4">

        {/* ── Online / Offline card ── */}
        <div
          className="rounded-3xl p-5 transition-all duration-500"
          style={{
            background: online
              ? 'linear-gradient(135deg, rgba(91,91,255,0.1) 0%, rgba(91,91,255,0.06) 100%)'
              : 'linear-gradient(135deg, #EEEEF8 0%, #E8E8F2 100%)',
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className={`text-xl font-black mb-1 ${online ? '' : 'text-gray-900'}`}
                style={online ? { color: '#5B5BFF' } : {}}>
                {online ? 'You are ONLINE' : 'You are OFFLINE'}
              </p>
              {online ? (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                  <span className="text-gray-500 text-sm">Waiting for orders nearby...</span>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Go online to start receiving orders</p>
              )}
            </div>

            {/* Toggle */}
            <button
              onClick={toggle}
              className="relative w-14 h-7 rounded-full transition-all duration-300 flex-shrink-0 mt-0.5 focus:outline-none"
              style={{ background: online ? '#5B5BFF' : '#CBD5E1' }}
            >
              <span
                className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transition-all duration-300"
                style={{ left: online ? '26px' : '3px' }}
              />
            </button>
          </div>

          {/* Zone chip */}
          <div onClick={() => setShowZoneModal(true)} className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit cursor-pointer hover:bg-white/80 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span className="text-xs font-semibold text-gray-600">{activeZone.name} Zone • {activeZone.activeRiders} riders active</span>
          </div>
        </div>

        {/* ── Today / Orders / Rating ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'WALLET', value: `₦${Number(walletBalance).toLocaleString()}` },
            { label: 'ORDERS', value: String(totalOrders) },
            { label: 'RATING', value: '4.8', star: true },
          ].map(({ label, value, star }) => (
            <div key={label} className="bg-white rounded-2xl px-4 py-4 shadow-sm">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
              <div className="flex items-center gap-1">
                <p className="text-base font-black text-gray-900">{value}</p>
                {star && <Star size={12} fill="#FBBF24" strokeWidth={0} />}
              </div>
            </div>
          ))}
        </div>

        {/* ── Weekly / Monthly ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Calendar size={13} className="text-gray-400" />
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Earnings</p>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">Total Earnings</p>
            <p className="text-base font-black text-gray-900">₦{Number(totalEarnings).toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart2 size={13} className="text-gray-400" />
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active Task</p>
            </div>
            <p className="text-xs text-gray-500 mb-0.5">Status</p>
            <p className="text-sm font-black text-green-600">{online ? 'Available' : 'Offline'}</p>
          </div>
        </div>

        {/* ── Weekend Bonus Banner ── */}
        <button 
          onClick={() => navigate('/dispatch/earnings')}
          className="w-full rounded-2xl px-5 py-4 flex items-center gap-4 text-left transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #F59E0B, #FBBF24)' }}>
          <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center flex-shrink-0">
            <Gift size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-black text-white text-sm">Weekend Bonus Active</p>
            <p className="text-white/80 text-xs mt-0.5">Complete 15 deliveries for extra ₦5,000</p>
          </div>
          <ChevronRight size={18} className="text-white/70 flex-shrink-0" />
        </button>

        {/* ── Zone / Heatmap ── */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <p className="text-sm font-black" style={{ color: '#5B5BFF' }}>Current Zone: {activeZone.name}</p>
            <button onClick={() => setShowZoneModal(true)} className="text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-900 transition-colors">CHANGE</button>
          </div>
          {/* Map placeholder */}
          <div className="relative mx-3 mb-3 rounded-2xl overflow-hidden bg-gray-100" style={{ height: '140px' }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={activeZone.center}
                zoom={13}
                options={{ disableDefaultUI: true, zoomControl: false }}
              >
                <Marker position={activeZone.center} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }} />
                {showHeatmap && (
                  <Circle
                    center={activeZone.center}
                    radius={2500}
                    options={{ fillColor: '#EF4444', fillOpacity: 0.2, strokeColor: '#EF4444', strokeOpacity: 0.5, strokeWeight: 1 }}
                  />
                )}
              </GoogleMap>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-bold bg-gray-100">
                Loading Map...
              </div>
            )}
            
            {/* Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 pointer-events-none">
              <button onClick={() => setShowHeatmap(!showHeatmap)} className="pointer-events-auto bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-900 transition-colors shadow-lg">
                <MapPin size={14} />
                {showHeatmap ? 'Hide Heatmap' : 'View Heatmap'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Active Deliveries ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-base" style={{ color: '#5B5BFF' }}>Available Deliveries</p>
            <button onClick={() => navigate('/dispatch/deliveries')}
              className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              VIEW ALL
            </button>
          </div>

          <div className="space-y-3">
            {!online ? (
              <div className="bg-white rounded-2xl px-4 py-8 shadow-sm text-center text-gray-500 text-sm font-semibold">
                Go online to start receiving orders nearby.
              </div>
            ) : deliveries.length === 0 ? (
              <div className="bg-white rounded-2xl px-4 py-8 shadow-sm text-center text-gray-500 text-sm font-semibold">
                No available deliveries in your area.
              </div>
            ) : (
              deliveries.map(d => {
                const merchantName = d.order?.items?.[0]?.product?.merchant?.name || 'Food Order'
                const isGroceries = d.order?.items?.[0]?.product?.category?.name?.toLowerCase().includes('grocery') || false
                return (
                  <div key={d.id} className="bg-white rounded-2xl px-4 py-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          {isGroceries ? (
                            <ShoppingBasket size={20} className="text-gray-500" />
                          ) : (
                            <Utensils size={20} className="text-gray-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{merchantName}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {d.distance ? `${d.distance}km` : '1.5km'} • {d.order?.items?.length || 1} items
                          </p>
                        </div>
                      </div>
                      <p className="font-black text-gray-900 text-sm">
                        ₦{Number(d.order?.delivery_fee || 650).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(d.id)}
                        className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity active:opacity-80"
                        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
                        Accept Task
                      </button>
                      <button 
                        onClick={() => navigate(`/dispatch/delivery/${d.id}`)}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold">
                        Details
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

      </div>

      {/* ── Zone Selection Modal ── */}
      {showZoneModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowZoneModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-t-[2rem] sm:rounded-[2rem] px-6 pt-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:fade-in-0 duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden" />
            <h3 className="text-xl font-black text-gray-900 mb-2">Select Your Zone</h3>
            <p className="text-sm text-gray-500 mb-6">Choose the area where you want to receive delivery requests.</p>
            
            <div className="space-y-3">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    setActiveZone(zone)
                    localStorage.setItem('rider_zone', JSON.stringify(zone))
                    setShowZoneModal(false)
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-colors ${
                    activeZone.id === zone.id 
                      ? 'border-[#5B5BFF] bg-indigo-50/50' 
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activeZone.id === zone.id ? 'bg-[#5B5BFF] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <MapPin size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{zone.name}</p>
                      <p className="text-xs text-gray-500">{zone.activeRiders} riders active</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${activeZone.id === zone.id ? 'border-[#5B5BFF]' : 'border-gray-300'}`}>
                    {activeZone.id === zone.id && <div className="w-2.5 h-2.5 rounded-full bg-[#5B5BFF]" />}
                  </div>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowZoneModal(false)}
              className="w-full mt-6 bg-gray-100 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
