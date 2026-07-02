import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Star, Calendar, BarChart2, Gift, ChevronRight, MapPin, Utensils, ShoppingBasket } from 'lucide-react'
import {
  getRiderMe,
  toggleStatus,
  getCachedRiderProfile,
  persistRiderSession,
  getRiderGreetingName,
  getTimeGreeting,
} from '../../../services/riderAuthService'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'
import { useRiderLocationTracking } from '../../../hooks/useRiderLocationTracking'
import { getCurrentPosition } from '../../../utils/geolocation'
import { formatMerchantName, countOrderItems } from '../../../utils/riderDeliveryDisplay'

export default function RiderDashboard() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(false)
  const [toggling, setToggling] = useState(false)
  const { deliveries, activeDeliveries, refresh: refreshDeliveries, refreshActive, accept } = useRiderDeliveries()
  const { earnings, refresh: refreshEarnings } = useRiderEarnings()

  useRiderLocationTracking(online)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const res = await getRiderMe()
        const data = res.data?.data || res.data
        if (cancelled) return
        setProfile(data)
        setOnline(Boolean(data?.rider?.is_online))
        persistRiderSession({ profile: data })
      } catch (err) {
        console.error('Error fetching rider profile', err)
        if (!cancelled) {
          const cached = getCachedRiderProfile()
          if (cached) {
            setProfile(cached)
            setOnline(Boolean(cached?.rider?.is_online))
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [])

  const toggle = async () => {
    try {
      setToggling(true)
      const response = await toggleStatus()
      const newStatus = response.data?.is_online ?? !online
      setOnline(newStatus)

      setProfile((current) => {
        const next = current
          ? { ...current, rider: { ...current.rider, is_online: newStatus } }
          : current
        if (next) persistRiderSession({ profile: next })
        return next
      })
    } catch (err) {
      console.error('Error toggling rider status', err)
      alert('Failed to update online status')
    } finally {
      setToggling(false)
    }
  }

  useEffect(() => {
    refreshActive()
    const interval = setInterval(refreshActive, 10000)
    return () => clearInterval(interval)
  }, [refreshActive])

  useEffect(() => {
    if (!online) return undefined

    let cancelled = false

    const poll = async () => {
      try {
        const coords = await getCurrentPosition()
        if (!cancelled) refreshDeliveries(coords.lat, coords.lng)
      } catch {
        if (!cancelled) refreshDeliveries(6.5244, 3.3792)
      }
    }

    poll()
    const interval = setInterval(poll, 10000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [online, refreshDeliveries])

  useEffect(() => {
    refreshEarnings()
  }, [refreshEarnings])

  const handleAccept = async (deliveryId) => {
    try {
      await accept(deliveryId)
      await refreshActive()
      navigate(`/dispatch/delivery/${deliveryId}`)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to accept delivery. It may have been assigned to another rider.')
    }
  }

  const getDeliveryMeta = (delivery) => {
    const merchant = delivery.order?.items?.[0]?.product?.merchant
    const merchantName = formatMerchantName(merchant)
    const fee = Number(delivery.order?.delivery_fee || 0)
    const orderLabel = delivery.order?.id ? `Order #${delivery.order.id}` : `Delivery #${delivery.id}`
    const statusLabel = (delivery.status || delivery.order?.status || 'assigned')
      .replace(/_/g, ' ')
    const itemCount = countOrderItems(delivery) || delivery.order?.items?.length || 0
    return { merchantName, fee, orderLabel, statusLabel, itemCount }
  }

  const hasActiveDelivery = activeDeliveries.length > 0
  const primaryActive = activeDeliveries[0]

  const riderName = getRiderGreetingName(profile)
  const greeting = getTimeGreeting()
  const walletBalance = earnings?.wallet?.balance ?? 0
  const totalEarnings = earnings?.earnings?.total ?? 0
  const totalOrders = profile?.rider?.total_deliveries ?? 0
  const rating = profile?.rider?.rating != null
    ? Number(profile.rider.rating).toFixed(1)
    : '—'
  const vehicleLabel = profile?.rider?.vehicle_type
    ? profile.rider.vehicle_type.charAt(0).toUpperCase() + profile.rider.vehicle_type.slice(1)
    : 'Rider'
  const zoneLabel = profile?.rider?.plate_number
    ? `${vehicleLabel} • ${profile.rider.plate_number}`
    : `${vehicleLabel} • Your service area`

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading your dashboard…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-4">

      <div className="sticky top-0 z-50 bg-gray-50 px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[17px] font-bold" style={{ color: '#5B5BFF' }}>
            {greeting}, {riderName} 👋
          </p>
        </div>
        <button onClick={() => navigate('/dispatch/notifications')} className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
          <Bell size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="px-5 space-y-4">

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
                  <span className="text-gray-500 text-sm">
                    {hasActiveDelivery ? 'You have an active delivery' : 'Waiting for orders nearby...'}
                  </span>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Go online to start receiving orders</p>
              )}
            </div>

            <button
              onClick={toggle}
              disabled={toggling}
              className="relative w-14 h-7 rounded-full transition-all duration-300 flex-shrink-0 mt-0.5 focus:outline-none disabled:opacity-50"
              style={{ background: online ? '#5B5BFF' : '#CBD5E1' }}
            >
              <span
                className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md transition-all duration-300"
                style={{ left: online ? '26px' : '3px' }}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
            <span className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-xs font-semibold text-gray-600">{zoneLabel}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'WALLET', value: `₦${Number(walletBalance).toLocaleString()}` },
            { label: 'ORDERS', value: String(totalOrders) },
            { label: 'RATING', value: rating, star: rating !== '—' },
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
            <p className={`text-sm font-black ${hasActiveDelivery ? 'text-[#5B5BFF]' : online ? 'text-green-600' : 'text-gray-500'}`}>
              {hasActiveDelivery ? 'On delivery' : online ? 'Available' : 'Offline'}
            </p>
          </div>
        </div>

        <button className="w-full rounded-2xl px-5 py-4 flex items-center gap-4 text-left transition-opacity active:opacity-80"
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

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="px-5 pt-4 pb-3 flex items-center justify-between">
            <p className="text-sm font-black" style={{ color: '#5B5BFF' }}>
              {profile?.rider?.vehicle_brand
                ? `Vehicle: ${profile.rider.vehicle_brand}`
                : 'Your delivery zone'}
            </p>
            <button
              onClick={() => navigate('/dispatch/profile/edit')}
              className="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              EDIT
            </button>
          </div>
          <div className="relative mx-3 mb-3 rounded-2xl overflow-hidden" style={{ height: '110px', background: 'linear-gradient(135deg, #1a1a3e, #0d0d1f)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 110">
              {[0,1,2,3,4,5].map(i => (
                <line key={`h${i}`} x1="0" y1={i*22} x2="300" y2={i*22} stroke="#5B5BFF" strokeWidth="0.5"/>
              ))}
              {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                <line key={`v${i}`} x1={i*30} y1="0" x2={i*30} y2="110" stroke="#5B5BFF" strokeWidth="0.5"/>
              ))}
              <circle cx="150" cy="55" r="30" fill="rgba(91,91,255,0.15)" stroke="rgba(91,91,255,0.4)" strokeWidth="1"/>
              <circle cx="150" cy="55" r="4" fill="#5B5BFF"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-gray-900/80 backdrop-blur-sm text-white text-sm font-bold px-5 py-2.5 rounded-full flex items-center gap-2">
                <MapPin size={14} />
                View Heatmap
              </button>
            </div>
          </div>
        </div>

        {hasActiveDelivery && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="font-black text-base" style={{ color: '#5B5BFF' }}>Your Active Delivery</p>
            </div>
            <div className="space-y-3">
              {activeDeliveries.map((delivery) => {
                const { merchantName, fee, orderLabel, statusLabel } = getDeliveryMeta(delivery)
                return (
                  <div key={delivery.id} className="rounded-2xl px-4 py-4 shadow-sm border-2 border-[#5B5BFF]/20 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{merchantName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{orderLabel}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: '#5B5BFF' }}>
                          {statusLabel}
                        </p>
                      </div>
                      <p className="font-black text-gray-900 text-sm">
                        ₦{fee.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/dispatch/delivery/${delivery.id}`)}
                      className="w-full py-2.5 rounded-xl text-white text-sm font-bold transition-opacity active:opacity-80"
                      style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
                    >
                      Continue Delivery
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

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
                const merchantName = formatMerchantName(d.order?.items?.[0]?.product?.merchant)
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
    </div>
  )
}
