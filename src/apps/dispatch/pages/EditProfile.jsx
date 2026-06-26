import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Pencil, BadgeCheck, Bell, MapPin } from 'lucide-react'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none"
      style={{ background: checked ? '#5B5BFF' : '#D1D5DB' }}
    >
      <span
        className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-all duration-300"
        style={{ left: checked ? '27px' : '3px' }}
      />
    </button>
  )
}

export default function EditProfile() {
  const navigate = useNavigate()
  const [pushNotifs, setPushNotifs] = useState(() => {
    const saved = localStorage.getItem('rider_push_notifs')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [liveTracking, setLiveTracking] = useState(() => {
    const saved = localStorage.getItem('rider_live_tracking')
    return saved !== null ? JSON.parse(saved) : true
  })

  const updatePushNotifs = (val) => {
    setPushNotifs(val)
    localStorage.setItem('rider_push_notifs', JSON.stringify(val))
  }

  const updateLiveTracking = (val) => {
    setLiveTracking(val)
    localStorage.setItem('rider_live_tracking', JSON.stringify(val))
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Edit Profile</h1>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-6">

        {/* ── Avatar + name ── */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🚴</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
              style={{ background: '#5B5BFF' }}>
              <Pencil size={12} className="text-white" />
            </div>
          </div>
          <div>
            <p className="font-black text-gray-900 text-lg">Oluwaseun Adeyemi</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <BadgeCheck size={14} fill="#5B5BFF" className="text-white" />
              <p className="text-xs font-bold text-gray-500">Verified Professional Rider</p>
            </div>
          </div>
        </div>

        {/* ── Contact info ── */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-4">
              <Mail size={16} className="text-gray-400 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-700">o.adeyemi@kaabo.com</p>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-4">
              <Phone size={16} className="text-gray-400 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-700">+234 812 345 6789</p>
            </div>
          </div>
        </div>

        {/* ── Vehicle details ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-gray-900">Vehicle Details</p>
            <span className="text-[10px] font-black px-3 py-1 rounded-full"
              style={{ background: 'rgba(91,91,255,0.1)', color: '#5B5BFF' }}>
              ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Vehicle Type
              </label>
              <div className="flex items-center justify-between bg-gray-100 rounded-2xl px-4 py-3">
                <span className="text-sm font-bold text-gray-900">Motorcycle</span>
                <span className="text-lg">🏍</span>
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Plate Number
              </label>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <span className="text-sm font-bold text-gray-900">LAG-455-XC</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Job preferences ── */}
        <div>
          <p className="font-black text-gray-900 mb-4">Job Preferences</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Bell size={16} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">Push Notifications</p>
                <p className="text-xs text-gray-400">Alerts for new deliveries</p>
              </div>
              <Toggle checked={pushNotifs} onChange={updatePushNotifs} />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">Live Tracking</p>
                <p className="text-xs text-gray-400">Visible to customers</p>
              </div>
              <Toggle checked={liveTracking} onChange={updateLiveTracking} />
            </div>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      {/* Save */}
      <div className="px-5 pb-8 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Save All Changes
        </button>
      </div>
    </div>
  )
}
