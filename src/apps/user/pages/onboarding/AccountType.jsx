import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Store, ArrowLeft } from 'lucide-react'
import OnboardingShell from '../../../../components/onboarding/OnboardingShell'
import DesktopNav from '../../../../components/onboarding/DesktopNav'
import DesktopFooter from '../../../../components/onboarding/DesktopFooter'

const types = [
  {
    id: 'customer',
    label: 'Customer',
    desc: 'I want to book services and track orders.',
    icon: User,
  },
  {
    id: 'merchant',
    label: 'Merchant',
    desc: 'I want to manage my business and services.',
    icon: Store,
  },
]

function RadioCard({ item, selected, onSelect }) {
  const isActive = selected === item.id
  return (
    <button
      onClick={() => onSelect(item.id)}
      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
        isActive ? 'border-[#1A1AF5] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-[#1A1AF5]' : 'bg-gray-100'}`}>
          <item.icon size={17} className={isActive ? 'text-white' : 'text-gray-500'} />
        </div>
        <div>
          <p className={`text-sm font-semibold ${isActive ? 'text-[#1A1AF5]' : 'text-gray-800'}`}>{item.label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
        </div>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isActive ? 'border-[#1A1AF5]' : 'border-gray-300'}`}>
        {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#1A1AF5]" />}
      </div>
    </button>
  )
}

function FormContent({ selected, setSelected, navigate }) {
  const handleContinue = () => {
    navigate(selected === 'merchant' ? '/merchant/login' : '/onboarding/location')
  }
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1">Who are you?</h1>
      <p className="text-gray-500 text-sm mb-6">Select your account type to continue your journey.</p>
      <div className="flex flex-col gap-3 flex-1">
        {types.map((t) => <RadioCard key={t.id} item={t} selected={selected} onSelect={setSelected} />)}
      </div>
      <div className="mt-8">
        <button
          onClick={handleContinue}
          className="w-full bg-[#1A1AF5] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1515d4] transition-colors text-sm flex items-center justify-center gap-1"
        >
          Continue →
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-[#1A1AF5] font-semibold">Log In</a>
        </p>
      </div>
    </div>
  )
}

export default function AccountType() {
  const [selected, setSelected] = useState('customer')
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <OnboardingShell>
          <FormContent selected={selected} setSelected={setSelected} navigate={navigate} />
        </OnboardingShell>
      </div>

      {/* Desktop — two-column split */}
      <div className="hidden md:flex flex-col min-h-screen bg-gray-50">
        <DesktopNav />
        <div className="flex-1 flex">
          {/* Left: gradient decoration */}
          <div className="flex-1 bg-gradient-to-br from-[#1A1AF5] via-[#4040ff] to-[#7b5ea7] relative overflow-hidden flex items-end p-10">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #fff 0%, transparent 60%)' }}
            />
            <p className="text-white/40 text-xs tracking-widest uppercase relative z-10">Fastrapid Delivery Network</p>
          </div>

          {/* Right: form */}
          <div className="w-[460px] bg-white flex flex-col justify-between py-12 px-12 shadow-[-4px_0_24px_rgba(0,0,0,0.04)]">
            <div className="flex-1 flex flex-col justify-center">
              <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors mb-8 self-start"
              >
                <ArrowLeft size={16} className="text-gray-700" />
              </button>
              <FormContent selected={selected} setSelected={setSelected} navigate={navigate} />
            </div>
          </div>
        </div>
        <DesktopFooter />
      </div>
    </>
  )
}
