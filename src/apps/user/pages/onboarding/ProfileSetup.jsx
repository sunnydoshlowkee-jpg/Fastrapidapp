import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, Calendar, User } from 'lucide-react'
import CenteredLayout from '../../../../components/layout/CenteredLayout'
import { completeProfile } from '../../../../services/authService'
import { getApiFieldError } from '../../../../utils/apiErrors'

const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

function parseDateOfBirth(value) {
  const trimmed = value.trim()
  if (!trimmed) return null

  const slashMatch = trimmed.match(/^(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})$/)
  if (slashMatch) {
    const [, day, month, year] = slashMatch
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed
  }

  return null
}

const fieldClass = (hasError) =>
  `bg-[#F3F4F6] rounded-2xl p-4 md:p-5 border-2 transition-all shadow-sm ${
    hasError
      ? 'border-red-500 bg-red-50/30'
      : 'border-transparent focus-within:border-[#4342FF] focus-within:bg-white'
  }`

export default function ProfileSetup() {
  const navigate = useNavigate()
  const location = useLocation()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('rapid_token')) {
      navigate('/onboarding/phone', { replace: true })
    }
  }, [navigate])

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const handleContinue = async () => {
    setErrors({})

    const nextErrors = {}
    if (!firstName.trim()) nextErrors.first_name = 'First name is required.'
    if (!lastName.trim()) nextErrors.last_name = 'Last name is required.'
    if (!email.trim()) nextErrors.email = 'Email address is required.'
    if (!gender) nextErrors.gender = 'Please select a gender.'

    const parsedDob = parseDateOfBirth(dateOfBirth)
    if (dateOfBirth.trim() && !parsedDob) {
      nextErrors.date_of_birth = 'Enter a valid date (DD / MM / YYYY).'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setLoading(true)
    try {
      await completeProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        gender,
        date_of_birth: parsedDob,
      })
      navigate('/onboarding/preferences', {
        state: { phoneE164: location.state?.phoneE164 },
      })
    } catch (err) {
      const apiErrors = err.response?.data?.errors
      if (apiErrors) {
        const mapped = {}
        Object.keys(apiErrors).forEach((key) => {
          mapped[key] = apiErrors[key][0]
        })
        setErrors(mapped)
      } else {
        setErrors({ form: getApiFieldError(err, 'form') })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <CenteredLayout 
      showBackButton={true} 
      backTo="/onboarding/otp"
    >
      <div className="flex-1 flex flex-col md:items-center pt-2 md:bg-white md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:border md:border-gray-100 md:rounded-3xl md:p-12 md:flex-none">
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-2 md:mb-4 tracking-tight md:text-center">Complete your profile</h1>
        <p className="text-[#6B7280] text-[16px] md:text-[18px] mb-8 md:mb-12 md:text-center">
          Help us personalize your delivery experience in Lagos.
        </p>

        {errors.form ? (
          <p className="w-full text-sm font-medium text-red-600 mb-4 text-center" role="alert">
            {errors.form}
          </p>
        ) : null}

        <div className="flex flex-col gap-5 md:gap-6 mb-10 w-full md:grid md:grid-cols-2 md:mb-12">
          
          <div className="md:col-span-1">
            <label className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              First Name
            </label>
            <div className={fieldClass(errors.first_name)}>
              <input
                type="text"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); clearError('first_name') }}
                placeholder="i.e John"
                className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
            {errors.first_name ? <p className="mt-1 text-sm text-red-600">{errors.first_name}</p> : null}
          </div>

          <div className="md:col-span-1">
            <label className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              Last Name
            </label>
            <div className={fieldClass(errors.last_name)}>
              <input
                type="text"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); clearError('last_name') }}
                placeholder="i.e Sam"
                className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
            {errors.last_name ? <p className="mt-1 text-sm text-red-600">{errors.last_name}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className={fieldClass(errors.email)}>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                placeholder="name@example.com"
                className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
            {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
          </div>

          <div className="md:col-span-1">
            <label
              htmlFor="profile-gender"
              className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider mb-2"
            >
              Gender
            </label>
            <div className={`${fieldClass(errors.gender)} flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <User size={20} className="text-[#6B7280] shrink-0" />
                <select
                  id="profile-gender"
                  value={gender}
                  onChange={(e) => { setGender(e.target.value); clearError('gender') }}
                  className={`bg-transparent outline-none text-[16px] md:text-[18px] font-medium w-full cursor-pointer appearance-none ${
                    gender ? 'text-[#111827]' : 'text-[#9CA3AF]'
                  }`}
                >
                  {GENDER_OPTIONS.map((option) => (
                    <option key={option.value || 'placeholder'} value={option.value} disabled={option.value === ''}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <ChevronDown size={20} className="text-[#6B7280] shrink-0 pointer-events-none" />
            </div>
            {errors.gender ? <p className="mt-1 text-sm text-red-600">{errors.gender}</p> : null}
          </div>

          <div className="md:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] md:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">
                Date of Birth
              </label>
              <span className="text-[11px] md:text-[13px] font-bold text-[#9CA3AF] uppercase">optional</span>
            </div>
            <div className={`${fieldClass(errors.date_of_birth)} flex items-center gap-3`}>
              <Calendar size={20} className="text-[#6B7280]" />
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e) => { setDateOfBirth(e.target.value); clearError('date_of_birth') }}
                placeholder="DD / MM / YYYY"
                className="bg-transparent text-[#111827] outline-none text-[16px] md:text-[18px] font-medium w-full placeholder:text-[#9CA3AF]"
              />
            </div>
            {errors.date_of_birth ? <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p> : null}
          </div>

        </div>

        <div className="w-full mt-auto md:mt-0">
          <button 
            type="button"
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-[#4342FF] hover:bg-[#3231d6] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-[16px] md:text-[18px] shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] mb-8 md:mb-0 mt-4 md:mt-0"
          >
            {loading ? 'Saving…' : 'Continue'}
          </button>
        </div>

      </div>
    </CenteredLayout>
  )
}
