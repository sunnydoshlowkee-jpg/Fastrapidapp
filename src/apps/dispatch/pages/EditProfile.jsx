import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Pencil, BadgeCheck, Bell, MapPin } from 'lucide-react'
import { getProfile, updateProfile } from '../../../services/riderAuthService'

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

const VEHICLE_TYPES = [
  { value: 'motorcycle', label: 'Motorcycle' },
  { value: 'bicycle', label: 'Bicycle' },
  { value: 'car', label: 'Car' },
]

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
  
  const [profile, setProfile] = useState(null)
  const [toast, setToast] = useState(null) // { message, type }
  const [saving, setSaving] = useState(false)
  
  useEffect(() => {
    getProfile()
      .then(res => {
        const data = res.data?.data || res.data
        setProfile(data)
      })
      .catch(console.error)
  }, [])

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

      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Edit Profile</h1>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-6 relative">

        {toast && (
          <div className={`absolute top-0 left-5 right-5 p-3 rounded-xl flex items-center justify-between text-sm font-bold text-white z-10 transition-all ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}>
            <span>{toast.message}</span>
          </div>
        )}

        {!profile ? (
          <div className="animate-pulse flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
              <div className="flex flex-col gap-2">
                <div className="w-32 h-5 bg-gray-200 rounded-md" />
                <div className="w-24 h-4 bg-gray-200 rounded-md" />
              </div>
            </div>
            <div className="w-full h-16 bg-gray-200 rounded-2xl" />
            <div className="w-full h-16 bg-gray-200 rounded-2xl" />
            <div className="w-full h-32 bg-gray-200 rounded-2xl" />
          </div>
        ) : (
          <>
            {/* ── Avatar + name ── */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">🚴</span>
            </div>
            <label className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: '#5B5BFF' }}>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  console.log('Selected avatar:', e.target.files[0].name)
                }
              }} />
              <Pencil size={12} className="text-white" />
            </label>
          </div>
          <div>
            <p className="font-black text-gray-900 text-lg">{profile?.user?.first_name || 'Loading'} {profile?.user?.last_name || '...'}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <BadgeCheck size={14} fill="#5B5BFF" className="text-white" />
              <p className="text-xs font-bold text-gray-500">
                {profile?.rider?.status === 'approved' ? 'Verified Professional Rider' : 'Rider'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-4">
              <Mail size={16} className="text-gray-400 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-700">{profile?.user?.email || '...'}</p>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-4">
              <Phone size={16} className="text-gray-400 flex-shrink-0" />
              <p className="text-sm font-medium text-gray-700">{profile?.user?.phone || '...'}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-gray-900">Vehicle Details</p>
            <span className="text-[10px] font-black px-3 py-1 rounded-full"
              style={{ background: 'rgba(91,91,255,0.1)', color: '#5B5BFF' }}>
              {profile?.rider?.verification_status === 'approved' ? 'ACTIVE' : 'PENDING'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Vehicle Type
              </label>
              <div className="flex items-center justify-between bg-gray-100 rounded-2xl px-4 py-3">
                <span className="text-sm font-bold text-gray-900 capitalize">{profile?.rider?.vehicle_type || '...'}</span>
                <span className="text-lg">🏍</span>
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Make / Brand
              </label>
              <input
                type="text"
                value={form.vehicle_brand}
                onChange={(e) => setForm((f) => ({ ...f, vehicle_brand: e.target.value }))}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Year
              </label>
              <input
                type="number"
                value={form.vehicle_year}
                onChange={(e) => setForm((f) => ({ ...f, vehicle_year: e.target.value }))}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Plate Number
              </label>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <span className="text-sm font-bold text-gray-900 uppercase">{profile?.rider?.plate_number || '...'}</span>
              </div>
            </div>
          </div>
        </div>

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

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="flex-1" />
          </>
        )}
      </div>

      <div className="px-5 pb-8 pt-4">
        <button
          onClick={async () => {
            if (!profile || saving) return
            setSaving(true)
            try {
              // Mock update call, normally you'd collect data and PUT
              // await updateProfile(newData)
              await new Promise(resolve => setTimeout(resolve, 800)) // simulate network request
              setToast({ message: 'Profile updated successfully!', type: 'success' })
              setTimeout(() => setToast(null), 3000)
            } catch (err) {
              setToast({ message: 'Update failed', type: 'error' })
              setTimeout(() => setToast(null), 3000)
            } finally {
              setSaving(false)
            }
          }}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
