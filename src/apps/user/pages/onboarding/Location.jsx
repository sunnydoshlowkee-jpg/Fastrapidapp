import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Pencil, LocateFixed, Clock, Home } from 'lucide-react'
import OnboardingShell from '../../../../components/onboarding/OnboardingShell'
import DesktopNav from '../../../../components/onboarding/DesktopNav'
import DesktopFooter from '../../../../components/onboarding/DesktopFooter'

const recentAddresses = [
  { icon: Clock, label: 'Recent Address', address: '12 Victoria Island, Lagos' },
  { icon: Home, label: 'Saved: Home', address: '12 Chevrolet Lane' },
]

function AddressInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus-within:border-[#1A1AF5] transition-colors">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter delivery address"
        className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />
      <Pencil size={14} className="text-gray-400" />
    </div>
  )
}

export default function Location() {
  const [address, setAddress] = useState('12 Victoria Island, Lagos')
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <OnboardingShell>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <MapPin size={28} className="text-[#1A1AF5]" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Where should we deliver?</h1>
            <p className="text-gray-500 text-sm mt-1">We'll find the best vendors near you.</p>
          </div>
          <AddressInput value={address} onChange={setAddress} />
          <button className="flex items-center gap-2 text-[#1A1AF5] text-sm font-medium mt-3 mb-4">
            <LocateFixed size={14} /> Use my current location
          </button>
          {/* Map placeholder */}
          <div className="flex-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative min-h-[180px] mb-6">
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 24px,#94a3b8 24px,#94a3b8 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,#94a3b8 24px,#94a3b8 25px)` }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="w-8 h-8 bg-[#1A1AF5] rounded-full flex items-center justify-center shadow-lg">
                <MapPin size={16} className="text-white" />
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/onboarding/phone')} className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors">
            Continue
          </button>
          <p className="text-center text-[11px] text-gray-400 mt-3">
            By continuing, you agree to our <span className="text-[#1A1AF5]">Terms of Service</span> and <span className="text-[#1A1AF5]">Privacy Policy</span>.
          </p>
        </OnboardingShell>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col min-h-screen bg-gray-50">
        <DesktopNav />
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-10">
            {/* Map placeholder — top */}
            <div className="w-full h-48 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden relative mb-8">
              <div className="absolute inset-0 opacity-30"
                style={{ backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 24px,#94a3b8 24px,#94a3b8 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,#94a3b8 24px,#94a3b8 25px)` }} />
              {/* Gradient blobs */}
              <div className="absolute bottom-4 left-6 w-24 h-24 rounded-full bg-pink-300/30 blur-2xl" />
              <div className="absolute top-4 right-6 w-20 h-20 rounded-full bg-blue-300/30 blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-9 h-9 bg-[#1A1AF5] rounded-full flex items-center justify-center shadow-lg">
                  <MapPin size={18} className="text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">Where should we deliver?</h1>
            <p className="text-gray-500 text-sm mb-6">Enter your address to see the premium mobility services available in your area.</p>

            <AddressInput value={address} onChange={setAddress} />
            <button className="flex items-center gap-2 text-[#1A1AF5] text-sm font-medium mt-3 mb-6">
              <LocateFixed size={14} /> Use my current location
            </button>

            <button onClick={() => navigate('/onboarding/phone')} className="w-full bg-[#1A1AF5] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1515d4] transition-colors text-sm mb-8">
              Continue
            </button>

            {/* Recent addresses */}
            <div className="grid grid-cols-2 gap-3">
              {recentAddresses.map(({ icon: Icon, label, address: addr }) => (
                <button key={label} className="flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-gray-50 hover:border-[#1A1AF5]/30 hover:bg-blue-50/30 transition-all text-left">
                  <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500">{label}</p>
                    <p className="text-xs text-gray-700 mt-0.5">{addr}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DesktopFooter />
      </div>
    </>
  )
}
