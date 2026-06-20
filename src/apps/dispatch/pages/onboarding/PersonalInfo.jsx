import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'

export default function RiderPersonalInfo() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', dob: '', password: '' })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const isValid = form.firstName.trim() && form.lastName.trim() && form.email.trim() && form.dob.trim() && form.password.trim().length >= 8

  const handleContinue = () => {
    if (isValid) {
      sessionStorage.setItem('rider_reg_personal', JSON.stringify(form))
      navigate('/dispatch/onboarding/identity')
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
          Step 1 of 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
      </div>

      {/* Heading */}
      <h1 className="text-[26px] font-black text-gray-900 leading-tight mb-2">
        Personal Information
      </h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Please provide your details as they appear on your legal documents.
      </p>

      {/* Form fields */}
      <div className="flex flex-col gap-5 flex-1">

        {/* First Name */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            First Name
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={e => set('firstName', e.target.value)}
            placeholder="e.g. Adebayo"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
            style={{ '--tw-ring-color': '#5B5BFF40' }}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={e => set('lastName', e.target.value)}
            placeholder="e.g. Chioma"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Password (Min 8 characters)
          </label>
          <input
            type="password"
            value={form.password}
            onChange={e => set('password', e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <input
              type="date"
              value={form.dob}
              onChange={e => set('dob', e.target.value)}
              className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium focus:outline-none focus:ring-2 transition-all appearance-none pr-12"
              placeholder="mm/dd/yyyy"
            />
            <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Continue */}
      <div className="mt-8">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-40"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
