import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Calendar, AlertCircle } from 'lucide-react'

const today = new Date().toISOString().split('T')[0]

function validateField(key, value) {
  switch (key) {
    case 'firstName': return value.trim() ? '' : 'First name is required.'
    case 'lastName':  return value.trim() ? '' : 'Last name is required.'
    case 'email': {
      if (!value.trim()) return 'Email address is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.'
      return ''
    }
    case 'dob': {
      if (!value) return 'Date of birth is required.'
      if (value >= today) return 'Date of birth must be in the past.'
      return ''
    }
    default: return ''
  }
}

export default function RiderPersonalInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Data from SignUp / Verify flow
  const method = location.state?.method || 'email'
  const stateEmail = location.state?.email || ''
  const statePhone = location.state?.phone || ''

  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: stateEmail, 
    dob: '' 
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (touched[key]) setErrors(e => ({ ...e, [key]: validateField(key, val) }))
  }

  const handleBlur = (key) => {
    setTouched(t => ({ ...t, [key]: true }))
    setErrors(e => ({ ...e, [key]: validateField(key, form[key]) }))
  }

  const handleContinue = () => {
    const keys = ['firstName', 'lastName', 'email', 'dob']
    const allTouched = Object.fromEntries(keys.map(k => [k, true]))
    const allErrors = Object.fromEntries(keys.map(k => [k, validateField(k, form[k])]))
    setTouched(allTouched)
    setErrors(allErrors)
    
    if (Object.values(allErrors).some(Boolean)) return

    sessionStorage.setItem('rider_reg_personal', JSON.stringify({
      ...form,
      phone: statePhone // Store phone if they used phone signup
    }))
    
    navigate('/dispatch/onboarding/identity')
  }

  const inputClass = (key) =>
    `w-full rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
      errors[key] && touched[key] ? 'bg-red-50 ring-2 ring-red-300' : 'bg-gray-100'
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
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5B5BFF' }}>
          Step 1 of 4
        </span>
      </div>

      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
      </div>

      <h1 className="text-[26px] font-black text-gray-900 leading-tight mb-2">
        Personal Information
      </h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Please provide your details as they appear on your legal documents.
      </p>

      <div className="flex flex-col gap-5 flex-1">

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
          <input type="text" value={form.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            placeholder="e.g. Adebayo" className={inputClass('firstName')} />
          <FieldError name="firstName" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
          <input type="text" value={form.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            placeholder="e.g. Chioma" className={inputClass('lastName')} />
          <FieldError name="lastName" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
          <input type="email" value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="name@example.com" 
            className={inputClass('email')} 
            readOnly={method === 'email'} // Lock it if they already verified it
            style={method === 'email' ? { opacity: 0.7 } : {}}
          />
          <FieldError name="email" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Date of Birth</label>
          <div className="relative">
            <input type="date" max={today} value={form.dob}
              onChange={e => handleChange('dob', e.target.value)}
              onBlur={() => handleBlur('dob')}
              className={`${inputClass('dob')} appearance-none pr-12`} />
            <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <FieldError name="dob" />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
