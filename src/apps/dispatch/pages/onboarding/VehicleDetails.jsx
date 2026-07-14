import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, AlertCircle } from 'lucide-react'

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

const currentYear = new Date().getFullYear()

function validateField(key, value) {
  switch (key) {
    case 'make':
      return value.trim() ? '' : 'Vehicle make & model is required.'
    case 'plate':
      return value.trim() ? '' : 'Plate number is required.'
    case 'year': {
      if (!value) return 'Vehicle year is required.'
      const y = parseInt(value)
      if (isNaN(y) || y < 1990 || y > currentYear + 1)
        return `Year must be between 1990 and ${currentYear + 1}.`
      return ''
    }
    default:
      return ''
  }
}

export default function RiderVehicle() {
  const navigate = useNavigate()
  const [vehicleType, setVehicleType] = useState('motorcycle')
  const [make, setMake] = useState('')
  const [plate, setPlate] = useState('')
  const [year, setYear] = useState('')
  const [photo, setPhoto] = useState(null)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (key, val, setter) => {
    setter(val)
    if (touched[key]) {
      setErrors(e => ({ ...e, [key]: validateField(key, val) }))
    }
  }

  const handleBlur = (key, val) => {
    setTouched(t => ({ ...t, [key]: true }))
    setErrors(e => ({ ...e, [key]: validateField(key, val) }))
  }

  const handleContinue = () => {
    const fields = { make, plate, year }
    const allTouched = { make: true, plate: true, year: true }
    const allErrors = Object.fromEntries(
      Object.entries(fields).map(([k, v]) => [k, validateField(k, v)])
    )
    setTouched(allTouched)
    setErrors(allErrors)

    if (Object.values(allErrors).some(Boolean)) return

    sessionStorage.setItem('rider_reg_vehicle', JSON.stringify({ vehicleType, plate, make, year }))
    navigate('/dispatch/onboarding/payment')
  }

  const inputClass = (key) =>
    `w-full rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
      errors[key] && touched[key]
        ? 'bg-red-50 ring-2 ring-red-300'
        : 'bg-gray-100'
    }`

  const FieldError = ({ name }) =>
    touched[name] && errors[name] ? (
      <div className="flex items-center gap-1.5 mt-2">
        <AlertCircle size={13} className="text-red-500 shrink-0" />
        <p className="text-xs font-medium text-red-500">{errors[name]}</p>
      </div>
    ) : null

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-5 pb-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5B5BFF' }}>
          Step 3 of 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
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
          onChange={e => handleChange('make', e.target.value, setMake)}
          onBlur={() => handleBlur('make', make)}
          placeholder="e.g. Honda CB125"
          className={inputClass('make')}
        />
        <FieldError name="make" />
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
            onChange={e => handleChange('plate', e.target.value, setPlate)}
            onBlur={() => handleBlur('plate', plate)}
            placeholder="ABC-1234"
            className={inputClass('plate')}
          />
          <FieldError name="plate" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Vehicle Year
          </label>
          <input
            type="number"
            value={year}
            onChange={e => handleChange('year', e.target.value, setYear)}
            onBlur={() => handleBlur('year', year)}
            placeholder="2023"
            min="1990"
            max={currentYear + 1}
            className={inputClass('year')}
          />
          <FieldError name="year" />
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
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Continue
      </button>
    </div>
  )
}
