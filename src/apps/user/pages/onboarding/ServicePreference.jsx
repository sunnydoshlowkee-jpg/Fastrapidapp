import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Utensils, ShoppingBasket, Layers } from 'lucide-react'
import DesktopNav from '../../../../components/onboarding/DesktopNav'
import DesktopFooter from '../../../../components/onboarding/DesktopFooter'

const services = [
  { id: 'food', label: 'Food', desc: 'Explore nearby restaurants', icon: Utensils },
  { id: 'grocery', label: 'Groceries', desc: 'Find fresh local produce', icon: ShoppingBasket },
]

const payments = ['Wallet', 'Card', 'Crypto']

function MobileServicePreference() {
  const [selected, setSelected] = useState('food')
  const [showAll, setShowAll] = useState(true)
  const [payment, setPayment] = useState('Wallet')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col">
        <div className="flex justify-end px-5 pt-5">
          <Link to="/app" className="text-[#1A1AF5] text-sm font-medium">Skip</Link>
        </div>
        <div className="px-6 pb-8 flex flex-col flex-1">
          <h1 className="text-xl font-bold text-gray-900 mt-2 mb-1">What are you looking for?</h1>
          <p className="text-gray-500 text-sm mb-6">Select your preferred delivery/service experience.</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {services.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setSelected(id)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 text-center transition-all ${selected === id ? 'border-[#1A1AF5] bg-blue-50' : 'border-gray-200 bg-white'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected === id ? 'bg-[#1A1AF5]' : 'bg-gray-100'}`}>
                  <Icon size={20} className={selected === id ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className="text-xs font-semibold text-gray-700">{label}</span>
                {selected === id && (
                  <div className="w-5 h-5 rounded-full bg-[#1A1AF5] flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-gray-700 font-medium">Show me everything</span>
            <button onClick={() => setShowAll(!showAll)} className={`w-11 h-6 rounded-full transition-colors relative ${showAll ? 'bg-[#1A1AF5]' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${showAll ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-2">Preferred payment:</p>
          <div className="flex gap-2 mb-5">
            {payments.map((p) => (
              <button key={p} onClick={() => setPayment(p)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${payment === p ? 'bg-[#1A1AF5] text-white border-[#1A1AF5]' : 'bg-white text-gray-600 border-gray-200'}`}
              >{p}</button>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 h-24 mb-5 overflow-hidden relative">
            <div className="absolute inset-0 flex items-end px-3 pb-2">
              {[40, 60, 35, 50, 70, 45, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-white/20 mx-0.5 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <button onClick={() => navigate('/app')} className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

function DesktopServicePreference() {
  const [selected, setSelected] = useState('food')
  const [showAll, setShowAll] = useState(true)
  const [payment, setPayment] = useState('Wallet')
  const navigate = useNavigate()

  const allOptions = [
    ...services,
    { id: 'all', label: 'Show me everything', desc: 'Get the full Fastrapid experience', icon: Layers, isToggle: true },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DesktopNav />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">What are you looking for?</h1>
              <p className="text-gray-500 text-sm mt-1">Customize your RAPID experience to get the best service.</p>
            </div>
            <Link to="/app" className="text-[#1A1AF5] text-sm font-medium flex-shrink-0 ml-4">Skip</Link>
          </div>

          {/* List options */}
          <div className="flex flex-col gap-2 mb-6">
            {allOptions.map(({ id, label, desc, icon: Icon, isToggle }) => (
              <button key={id}
                onClick={() => isToggle ? setShowAll(!showAll) : setSelected(id)}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all ${
                  (!isToggle && selected === id) || (isToggle && showAll)
                    ? 'border-[#1A1AF5]/30 bg-blue-50/50'
                    : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${(!isToggle && selected === id) || (isToggle && showAll) ? 'bg-[#1A1AF5]' : 'bg-gray-200'}`}>
                    <Icon size={16} className={(!isToggle && selected === id) || (isToggle && showAll) ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                </div>
                {isToggle ? (
                  <div className={`w-10 h-5 rounded-full transition-colors relative ${showAll ? 'bg-[#1A1AF5]' : 'bg-gray-200'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${showAll ? 'left-5' : 'left-0.5'}`} />
                  </div>
                ) : (
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === id ? 'border-[#1A1AF5]' : 'border-gray-300'}`}>
                    {selected === id && <div className="w-2.5 h-2.5 rounded-full bg-[#1A1AF5]" />}
                  </div>
                )}
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Preferred Payment</p>
          <div className="flex gap-2 mb-6">
            {payments.map((p) => (
              <button key={p} onClick={() => setPayment(p)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${payment === p ? 'bg-[#1A1AF5] text-white border-[#1A1AF5]' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
              >{p}</button>
            ))}
          </div>

          {/* Street image */}
          <div className="rounded-xl overflow-hidden h-28 mb-6 bg-gradient-to-br from-blue-900 to-slate-700 relative">
            <div className="absolute inset-0 flex items-end px-4 pb-3">
              {[55, 75, 45, 65, 80, 50, 70, 60].map((h, i) => (
                <div key={i} className="flex-1 bg-white/15 mx-0.5 rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="absolute bottom-2 right-3 text-white/40 text-xs">Lagos Island</p>
          </div>

          <button onClick={() => navigate('/app')} className="w-full bg-[#1A1AF5] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1515d4] transition-colors text-sm flex items-center justify-center gap-2">
            Get Started →
          </button>
        </div>
      </div>
      <DesktopFooter />
    </div>
  )
}

export default function ServicePreference() {
  return (
    <>
      <div className="md:hidden"><MobileServicePreference /></div>
      <div className="hidden md:block"><DesktopServicePreference /></div>
    </>
  )
}
