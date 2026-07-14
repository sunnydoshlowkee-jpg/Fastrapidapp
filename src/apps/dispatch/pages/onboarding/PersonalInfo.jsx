import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Calendar, AlertCircle, Loader2 } from 'lucide-react'
import { requestEmailOtp } from '../../../../services/riderAuthService'

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
    case 'password': {
      if (!value) return 'Password is required.'
      if (value.length < 8) return 'Password must be at least 8 characters.'
      return ''
    }
    case 'confirmPassword': {
      if (!value) return 'Please confirm your password.'
      return ''
    }
    default: return ''
  }
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Please confirm your password.'
  if (password !== confirmPassword) return 'Passwords do not match.'
  return ''
}

export default function RiderPersonalInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Data from SignUp / Verify flow
  const method = location.state?.method || 'email'
  const stateEmail = location.state?.email || ''
  const statePhone = location.state?.phone || ''
  const emailLocked = method === 'email' && !!stateEmail

  const [form, setForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: stateEmail, 
    dob: '',
    password: '',
    confirmPassword: '',
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (key === 'email') {
      sessionStorage.removeItem('rider_reg_email_verified')
    }
    if (touched[key]) setErrors(e => ({ ...e, [key]: validateField(key, val) }))
    if (key === 'password' && touched.confirmPassword) {
      setErrors(e => ({
        ...e,
        confirmPassword: validateConfirmPassword(val, form.confirmPassword),
      }))
    }
  }

  const handleBlur = (key) => {
    setTouched(t => ({ ...t, [key]: true }))
    setErrors(e => ({ ...e, [key]: validateField(key, form[key]) }))
  }

  const handleContinue = async () => {
    const keys = ['firstName', 'lastName', 'email', 'dob', 'password', 'confirmPassword']
    const allTouched = Object.fromEntries(keys.map(k => [k, true]))
    const allErrors = Object.fromEntries(keys.map(k => [k, validateField(k, form[k])]))
    const confirmError = validateConfirmPassword(form.password, form.confirmPassword)
    if (confirmError) allErrors.confirmPassword = confirmError

    setTouched(allTouched)
    setErrors(allErrors)
    setSubmitError('')

    if (Object.values(allErrors).some(Boolean)) return

    sessionStorage.setItem('rider_reg_password', form.password)
    sessionStorage.setItem('rider_reg_personal', JSON.stringify({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      dob: form.dob,
      phone: statePhone,
    }))

    const verifiedEmail = sessionStorage.getItem('rider_reg_email_verified')
    if (verifiedEmail && verifiedEmail.toLowerCase() === form.email.trim().toLowerCase()) {
      navigate('/dispatch/onboarding/identity')
      return
    }

    setLoading(true)
    try {
      const response = await requestEmailOtp(form.email.trim())
      const debugOtp = response.data?.data?.debug_otp

      navigate('/dispatch/onboarding/verify', {
        state: {
          method: 'email',
          email: form.email.trim(),
          phone: statePhone,
          nextStep: 'identity',
          debugOtp,
        },
      })
    } catch (err) {
      setSubmitError(
        err.response?.data?.errors?.email?.[0]
        || err.response?.data?.message
        || 'Failed to send verification code. Please try again.',
      )
    } finally {
      setLoading(false)
    }
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
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors"
        >
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
            readOnly={emailLocked}
            style={emailLocked ? { opacity: 0.7 } : {}}
          />
          <FieldError name="email" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
          <input type="password" value={form.password}
            onChange={e => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            placeholder="Min. 8 characters"
            className={inputClass('password')} />
          <FieldError name="password" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Confirm Password</label>
          <input type="password" value={form.confirmPassword}
            onChange={e => handleChange('confirmPassword', e.target.value)}
            onBlur={() => {
              setTouched(t => ({ ...t, confirmPassword: true }))
              setErrors(e => ({
                ...e,
                confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
              }))
            }}
            placeholder="Re-enter your password"
            className={inputClass('confirmPassword')} />
          <FieldError name="confirmPassword" />
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
        {submitError && (
          <div className="flex items-center gap-1.5 mb-4">
            <AlertCircle size={13} className="text-red-500 shrink-0" />
            <p className="text-xs font-medium text-red-500">{submitError}</p>
          </div>
        )}
        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? 'Sending code…' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
