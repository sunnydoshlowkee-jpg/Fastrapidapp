import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Pencil, BadgeCheck, Bell, MapPin } from 'lucide-react'
import { getRiderMe, updateRiderProfile, uploadRiderAvatar } from '../../../services/riderAuthService'
import { validateImageFile } from '../../../utils/imageUpload'

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
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [pushNotifs, setPushNotifs] = useState(true)
  const [liveTracking, setLiveTracking] = useState(true)
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    vehicle_type: 'motorcycle',
    plate_number: '',
    vehicle_brand: '',
    vehicle_year: '',
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await getRiderMe()
        const data = res.data?.data || res.data
        if (cancelled) return
        setProfile(data)
        setForm({
          first_name: data.user?.first_name || '',
          last_name: data.user?.last_name || '',
          phone: data.user?.phone || '',
          vehicle_type: data.rider?.vehicle_type || 'motorcycle',
          plate_number: data.rider?.plate_number || '',
          vehicle_brand: data.rider?.vehicle_brand || '',
          vehicle_year: data.rider?.vehicle_year ? String(data.rider.vehicle_year) : '',
        })
      } catch (e) {
        if (!cancelled) setError(e.response?.data?.message || 'Failed to load profile')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const fullName = [form.first_name, form.last_name].filter(Boolean).join(' ') || 'Rider'
  const initials = fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validation = validateImageFile(file)
    if (validation) {
      alert(validation)
      return
    }
    try {
      setSaving(true)
      await uploadRiderAvatar(file)
      const res = await getRiderMe()
      setProfile(res.data?.data || res.data)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload photo')
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        vehicle_type: form.vehicle_type,
        plate_number: form.plate_number,
        vehicle_brand: form.vehicle_brand || null,
        vehicle_year: form.vehicle_year ? Number(form.vehicle_year) : null,
      }
      const res = await updateRiderProfile(payload)
      const data = res.data?.data || res.data
      setProfile(data)
      localStorage.setItem('rider_user', JSON.stringify(data))
      navigate(-1)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading profile…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">

      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Edit Profile</h1>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-6">

        <div className="flex items-center gap-4">
          <div className="relative">
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              {profile?.user?.avatar_url ? (
                <img src={profile.user.avatar_url} alt="" className="w-16 h-16 rounded-2xl object-cover" />
              ) : (
                <div className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center text-white font-black text-lg"
                  style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}>
                  {initials}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
                style={{ background: '#5B5BFF' }}>
                <Pencil size={12} className="text-white" />
              </div>
            </label>
          </div>
          <div>
            <p className="font-black text-gray-900 text-lg">{fullName}</p>
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
              <p className="text-sm font-medium text-gray-700">{profile?.user?.email}</p>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-4">
              <Phone size={16} className="text-gray-400 flex-shrink-0" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="flex-1 bg-transparent text-sm font-medium text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-black text-gray-900">Vehicle Details</p>
            <span className="text-[10px] font-black px-3 py-1 rounded-full"
              style={{ background: 'rgba(91,91,255,0.1)', color: '#5B5BFF' }}>
              {profile?.rider?.status?.toUpperCase() || 'ACTIVE'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Vehicle Type
              </label>
              <select
                value={form.vehicle_type}
                onChange={(e) => setForm((f) => ({ ...f, vehicle_type: e.target.value }))}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v.value} value={v.value}>{v.label}</option>
                ))}
              </select>
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
              <input
                type="text"
                value={form.plate_number}
                onChange={(e) => setForm((f) => ({ ...f, plate_number: e.target.value }))}
                className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none"
              />
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
              <Toggle checked={pushNotifs} onChange={setPushNotifs} />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">Live Tracking</p>
                <p className="text-xs text-gray-400">Visible to customers</p>
              </div>
              <Toggle checked={liveTracking} onChange={setLiveTracking} />
            </div>
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <div className="flex-1" />
      </div>

      <div className="px-5 pb-8 pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80 disabled:opacity-50"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  )
}
