import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Star, MapPin, Pencil, FileText, Building2,
  BellRing, HelpCircle, ScrollText, LogOut, ChevronRight, X
} from 'lucide-react'
import { toggleStatus, getProfile } from '../../../services/riderAuthService'
import { useRiderLocationTracking } from '../../../hooks/useRiderLocationTracking'
const MENU = [
  { icon: FileText,  label: 'My Documents',        to: '/dispatch/profile/documents' },
  { icon: Building2, label: 'Bank Account',          to: '/dispatch/earnings/withdraw' },
  { icon: BellRing,  label: 'Notification Settings', to: '/dispatch/notifications' },
  { icon: HelpCircle,label: 'Help Center',           to: '/dispatch/profile/help' },
  { icon: ScrollText,label: 'Terms',                 to: '/dispatch/profile/help' },
]

export default function RiderProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [online, setOnline] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showZoneModal, setShowZoneModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [selectedZone, setSelectedZone] = useState('Yaba, Lagos')

  const ZONES = ['Yaba, Lagos', 'Ikeja, Lagos', 'Victoria Island, Lagos', 'Lekki, Lagos', 'Surulere, Lagos']

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await getProfile()
        const data = res.data?.data || res.data
        if (!cancelled) {
          setProfile(data)
          setOnline(data?.rider?.is_online || false)
          const riderInfo = JSON.parse(localStorage.getItem('rider_user') || '{}')
          riderInfo.is_online = data?.rider?.is_online || false
          localStorage.setItem('rider_user', JSON.stringify(riderInfo))
        }
      } catch (e) {
        console.error(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  useRiderLocationTracking(online)

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
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-xl font-black text-white"
            style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}>
            {profile?.user?.first_name?.[0] || 'R'}{profile?.user?.last_name?.[0] || 'D'}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-900 text-base">{profile?.user?.first_name} {profile?.user?.last_name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star size={11} fill="#FBBF24" strokeWidth={0} />
              <p className="text-xs font-bold" style={{ color: '#F59E0B' }}>
                {profile?.rider?.status === 'approved' ? 'Verified Rider' : 'Rider'}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Rider ID: {profile?.rider?.id || 'N/A'}</p>
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
            { label: 'Rating',     value: profile?.rider?.rating || '0.0', suffix: '⭐' },
            { label: 'Deliveries', value: profile?.rider?.total_deliveries || '0',  suffix: '' },
            { label: 'On-Time',    value: '98',  suffix: '%' }, // Not available in backend, leave hardcoded or calculate later
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-2xl px-3 py-3 text-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="font-black text-gray-900 text-base capitalize">
                {s.value}<span className="text-sm">{s.suffix}</span>
              </p>
            </div>
          ))}
        </div>

        {/* ── Zone ── */}
        <div className="flex items-center gap-3">
          <MapPin size={18} style={{ color: '#5B5BFF' }} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-gray-400">Current Zone</p>
            <p className="font-black text-gray-900 text-sm">{selectedZone}</p>
          </div>
          <button onClick={() => setShowZoneModal(true)} className="text-sm font-bold" style={{ color: '#5B5BFF' }}>Change</button>
        </div>

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
          onClick={() => setShowLogoutModal(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-200 transition-colors hover:bg-gray-50 active:bg-red-50"
        >
          <LogOut size={16} className="text-red-500" />
          <span className="font-bold text-red-500 text-sm">Sign Out Account</span>
        </button>

        <p className="text-center text-gray-300 text-xs font-bold pb-2">Rapid Rider</p>
      </div>

      {/* Zone Selection Modal */}
      {showZoneModal && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowZoneModal(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-6 pb-8 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">Select Zone</h2>
              <button onClick={() => setShowZoneModal(false)} className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-gray-900">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
              {ZONES.map(zone => (
                <button
                  key={zone}
                  onClick={() => {
                    setSelectedZone(zone)
                    setShowZoneModal(false)
                  }}
                  className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all ${selectedZone === zone ? 'border-[#5B5BFF] bg-blue-50/50' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'}`}
                >
                  <p className={`font-bold text-sm ${selectedZone === zone ? 'text-[#5B5BFF]' : 'text-gray-900'}`}>{zone}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="relative bg-white rounded-t-3xl px-5 pt-6 pb-8 shadow-2xl animate-in slide-in-from-bottom-full duration-300">
            <h2 className="text-xl font-black text-gray-900 mb-2">Sign Out</h2>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to sign out of your account?</p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-4 rounded-2xl bg-gray-100 text-gray-900 font-bold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('rider_token')
                  localStorage.removeItem('rider_user')
                  navigate('/dispatch/login')
                }}
                className="flex-1 py-4 rounded-2xl text-white font-bold text-sm bg-red-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
