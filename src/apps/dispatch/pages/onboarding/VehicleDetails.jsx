import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera } from 'lucide-react'

const VEHICLE_TYPES = [
  {
    id: 'motorcycle',
    label: 'Motorcycle',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="7" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="25" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 22h3l4-8h6l3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 14l2-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 10l3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'bicycle',
    label: 'Bicycle',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="7" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="25" cy="22" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 22l6-10h4l4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 12l4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="17" cy="10" r="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: 'car',
    label: 'Car',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 20h24v-4l-3-6H7l-3 6v4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="9" cy="23" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="23" cy="23" r="2.5" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 14l2-4h12l2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function RiderVehicle() {
  const navigate = useNavigate()
  const [vehicleType, setVehicleType] = useState('motorcycle')
  const [make, setMake] = useState('')
  const [plate, setPlate] = useState('')
  const [year, setYear] = useState('')
  const [photo, setPhoto] = useState(null)

  const isValid = make.trim() && plate.trim() && year.trim()

  const handleContinue = () => {
    if (isValid) {
      sessionStorage.setItem('rider_reg_vehicle', JSON.stringify({ vehicleType, plate }))
      navigate('/dispatch/onboarding/payment')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-5 pb-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5B5BFF' }}>
          Step 4 of 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {[0,1,2,3].map(i => (
          <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        ))}
      </div>

      {/* Heading */}
      <h1 className="text-[26px] font-black text-gray-900 leading-tight mb-2">
        Your Vehicle Details
      </h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Please provide accurate information about the vehicle you will use for deliveries.
      </p>

      {/* Vehicle type selector */}
      <div className="mb-6">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
          Vehicle Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {VEHICLE_TYPES.map(v => {
            const active = vehicleType === v.id
            return (
              <button key={v.id} onClick={() => setVehicleType(v.id)}
                className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 transition-all"
                style={{
                  borderColor: active ? '#5B5BFF' : '#E5E7EB',
                  background: active ? 'rgba(91,91,255,0.05)' : '#F9FAFB',
                  color: active ? '#5B5BFF' : '#374151',
                }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${active ? 'bg-[rgba(91,91,255,0.12)]' : 'bg-gray-200'}`}
                  style={{ color: active ? '#5B5BFF' : '#374151' }}>
                  {v.icon}
                </div>
                <span className="text-xs font-bold">{v.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Make & Model */}
      <div className="mb-5">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          Vehicle Make & Model
        </label>
        <input
          type="text"
          value={make}
          onChange={e => setMake(e.target.value)}
          placeholder="e.g. Honda CB125"
          className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Plate + Year */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Plate Number
          </label>
          <input
            type="text"
            value={plate}
            onChange={e => setPlate(e.target.value)}
            placeholder="ABC-1234"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Vehicle Year
          </label>
          <input
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            placeholder="2023"
            min="2000"
            max="2030"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Vehicle photo upload */}
      <div className="mb-8">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          Vehicle Photo
        </label>
        <label className="cursor-pointer block">
          <input type="file" accept="image/*" className="hidden"
            onChange={e => setPhoto(e.target.files?.[0]?.name || true)} />
          <div className={`rounded-2xl flex flex-col items-center gap-3 py-8 transition-all ${photo ? 'border-2 border-[#5B5BFF] bg-[#F5F5FF]' : 'border-2 border-dashed border-gray-300 bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(91,91,255,0.1)' }}>
              <Camera size={22} style={{ color: '#5B5BFF' }} />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-sm">{photo ? 'Photo uploaded ✓' : 'Upload a clear photo'}</p>
              <p className="text-gray-400 text-xs mt-0.5">Ensure the license plate is visible</p>
            </div>
          </div>
        </label>
      </div>

      {/* Continue */}
      <button
        onClick={handleContinue}
        disabled={!isValid}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-40"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Continue
      </button>
    </div>
  )
}
