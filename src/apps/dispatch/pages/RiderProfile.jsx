import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, Star, MapPin, Pencil, FileText, Building2,
  BellRing, HelpCircle, ScrollText, LogOut, ChevronRight
} from 'lucide-react'
import { toggleStatus, getRiderMe } from '../../../services/riderAuthService'
import { useRiderLocationTracking } from '../../../hooks/useRiderLocationTracking'

const MENU = [
  { icon: FileText,  label: 'My Documents',        to: '/dispatch/profile/documents' },
  { icon: Building2, label: 'Bank Account',          to: '/dispatch/earnings/withdraw' },
  { icon: BellRing,  label: 'Notification Settings', to: null },
  { icon: HelpCircle,label: 'Help Center',           to: '/dispatch/profile/help' },
  { icon: ScrollText,label: 'Terms',                 to: null },
]

export default function RiderProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [online, setOnline] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [loading, setLoading] = useState(true)

  useRiderLocationTracking(online)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await getRiderMe()
        const data = res.data?.data || res.data
        if (!cancelled) {
          setProfile(data)
          setOnline(Boolean(data?.rider?.is_online))
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const fullName = profile?.user?.full_name
    || [profile?.user?.first_name, profile?.user?.last_name].filter(Boolean).join(' ')
    || 'Rider'
  const initials = fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
  const rating = profile?.rider?.rating != null ? Number(profile.rider.rating).toFixed(1) : '—'
  const displayId = profile?.rider?.display_id || profile?.rider?.rider_code || '—'

  const handleToggleOnline = async () => {
    try {
      setIsToggling(true)
      const res = await toggleStatus()
      const isOnline = res.data?.is_online ?? !online
      setOnline(isOnline)
    } catch (e) {
      console.error(e)
      alert('Failed to toggle status')
    } finally {
      setIsToggling(false)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('rapid_token')
    localStorage.removeItem('rider_user')
    navigate('/dispatch/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading profile…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-8">

      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-gray-900">Profile</h1>
        <button onClick={() => navigate('/dispatch/notifications')} className="w-10 h-10 flex items-center justify-center">
          <Bell size={22} className="text-gray-500" />
        </button>
      </div>

      <div className="px-5 space-y-5">

        <div className="bg-gray-50 rounded-3xl px-5 py-5 flex items-center gap-4">
          {profile?.user?.avatar_url ? (
            <img src={profile.user.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-black text-white"
              style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}>
              {initials}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-900 text-base">{fullName}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star size={11} fill="#FBBF24" strokeWidth={0} />
              <p className="text-xs font-bold" style={{ color: '#F59E0B' }}>
                {profile?.rider?.status === 'approved' ? 'Verified Rider' : 'Rider'}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Rider ID: {displayId}</p>
          </div>

          <button
            onClick={() => navigate('/dispatch/profile/edit')}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            style={{ background: 'rgba(91,91,255,0.1)' }}>
            <Pencil size={15} style={{ color: '#5B5BFF' }} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Rating',     value: rating, suffix: rating !== '—' ? '⭐' : '' },
            { label: 'Deliveries', value: String(profile?.rider?.total_deliveries ?? 0), suffix: '' },
            { label: 'Vehicle',    value: (profile?.rider?.vehicle_type || '—').slice(0, 6), suffix: '' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="font-black text-gray-900 text-base capitalize">
                {s.value}<span className="text-sm">{s.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        {profile?.rider?.plate_number && (
          <div className="flex items-center gap-3">
            <MapPin size={18} style={{ color: '#5B5BFF' }} className="flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-400">Plate Number</p>
              <p className="font-black text-gray-900 text-sm">{profile.rider.plate_number}</p>
            </div>
          </div>
        )}

        <div className="rounded-3xl px-5 py-5 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}>
          <div>
            <p className="text-white font-black text-lg leading-tight">Ready for Deliveries?</p>
            <p className="text-white/70 text-xs mt-0.5">Toggle your status to start earning.</p>
          </div>
          <button
            onClick={handleToggleOnline}
            disabled={isToggling}
            className="relative w-14 h-7 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none disabled:opacity-50"
            style={{ background: online ? '#fff' : 'rgba(255,255,255,0.3)' }}>
            <span
              className="absolute top-[3px] w-[22px] h-[22px] rounded-full shadow-md transition-all duration-300"
              style={{
                left: online ? '26px' : '3px',
                background: online ? '#5B5BFF' : '#fff',
              }}
            />
          </button>
        </div>

        <div className="bg-gray-50 rounded-3xl overflow-hidden divide-y divide-gray-100">
          {MENU.map(({ icon: Icon, label, to }) => (
            <button
              key={label}
              onClick={() => to && navigate(to)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors active:bg-gray-100"
            >
              <Icon size={18} className="text-gray-500 flex-shrink-0" />
              <span className="flex-1 text-sm font-semibold text-gray-900">{label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-200 transition-colors active:bg-red-50"
        >
          <LogOut size={16} className="text-red-500" />
          <span className="font-bold text-red-500 text-sm">Sign Out Account</span>
        </button>

        <p className="text-center text-gray-300 text-xs font-bold pb-2">Rapid Rider</p>
      </div>
    </div>
  )
}
