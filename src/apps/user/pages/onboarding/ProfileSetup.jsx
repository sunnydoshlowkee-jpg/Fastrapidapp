import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ChevronDown } from 'lucide-react'
import OnboardingShell from '../../../../components/onboarding/OnboardingShell'

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inputCls = `w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900
  outline-none focus:border-[#1A1AF5] focus:bg-white transition-colors placeholder:text-gray-300`

export default function ProfileSetup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', gender: '', dob: '' })
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const canContinue = form.firstName && form.lastName && form.email

  return (
    <OnboardingShell>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1">Complete your profile</h1>
      <p className="text-gray-500 text-sm mb-6">Help us personalise your delivery experience in Lagos</p>

      <div className="flex flex-col gap-4 flex-1">
        <Field label="First Name">
          <input className={inputCls} placeholder="i.e John" value={form.firstName} onChange={set('firstName')} />
        </Field>

        <Field label="Last Name">
          <input className={inputCls} placeholder="i.e Sam" value={form.lastName} onChange={set('lastName')} />
        </Field>

        <Field label="Email Address">
          <input className={inputCls} type="email" placeholder="name@example.com" value={form.email} onChange={set('email')} />
        </Field>

        <Field label="Gender">
          <div className="relative">
            <select className={`${inputCls} appearance-none pr-10`} value={form.gender} onChange={set('gender')}>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer not to say</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>

        <Field label={<span>Date of Birth <span className="text-gray-400 normal-case font-normal">(optional)</span></span>}>
          <div className="relative">
            <input
              type="date"
              className={`${inputCls} pr-10`}
              value={form.dob}
              onChange={set('dob')}
              placeholder="DD/MM/YYYY"
            />
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </Field>
      </div>

      <div className="mt-6">
        <button
          disabled={!canContinue}
          onClick={() => navigate('/onboarding/preferences')}
          className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Continue →
        </button>
      </div>
    </OnboardingShell>
  )
}
