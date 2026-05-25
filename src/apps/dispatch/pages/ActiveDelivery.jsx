import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Bell, Crosshair, Layers, Phone, MessageSquare,
  Navigation, Package, Camera, CheckSquare, Square, ChevronRight
} from 'lucide-react'

// ─── Step constants ───────────────────────────────────────────────
const STEPS = {
  NEW_ORDER:       'new-order',
  HEADING_PICKUP:  'heading-pickup',
  CONFIRM_PICKUP:  'confirm-pickup',
  EN_ROUTE:        'en-route',
  CONFIRM_DELIVERY:'confirm-delivery',
}

// ─── Shared dark map background ──────────────────────────────────
function MapBg({ height = '45%', children }) {
  return (
    <div className="relative flex-shrink-0" style={{ height }}>
      {/* Dark grid map */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0d1117 0%, #0a1628 50%, #0d1117 100%)' }}>
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="none">
          {/* Grid */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#1d4ed8" strokeWidth="0.4" />
          ))}
          {Array.from({ length: 22 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="300" stroke="#1d4ed8" strokeWidth="0.4" />
          ))}
          {/* Route line */}
          <path d="M 200 10 C 210 80, 190 150, 205 290" stroke="#3b82f6" strokeWidth="4"
            fill="none" strokeLinecap="round" opacity="0.9" />
          {/* Start dot */}
          <circle cx="200" cy="14" r="5" fill="#5B5BFF" />
          {/* End dot */}
          <circle cx="205" cy="286" r="5" fill="#22c55e" />
        </svg>
      </div>
      {children}
    </div>
  )
}

// ─── FAB map controls ─────────────────────────────────────────────
function MapFabs() {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2 z-10">
      <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg">
        <Crosshair size={18} className="text-gray-700" />
      </button>
      <button className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg">
        <Layers size={18} className="text-gray-700" />
      </button>
    </div>
  )
}

// ─── Shared order header bar ──────────────────────────────────────
function OrderHeader({ onBack }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-12 pb-3"
      style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0.95) 60%, transparent)' }}>
      <button onClick={onBack} className="w-9 h-9 flex items-center justify-center">
        <ArrowLeft size={20} className="text-white" />
      </button>
      <div className="flex flex-col items-center gap-1">
        <span className="text-white font-bold text-sm">Order #KAB-00421</span>
        <span className="bg-[#5B5BFF] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">Food Order</span>
      </div>
      <button className="w-9 h-9 flex items-center justify-center">
        <Bell size={20} className="text-white" />
      </button>
    </div>
  )
}

// ─── Checklist item ───────────────────────────────────────────────
function CheckItem({ label, checked, onToggle }) {
  return (
    <button onClick={onToggle}
      className="w-full flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3.5 text-left transition-colors active:bg-gray-100">
      {checked
        ? <CheckSquare size={20} fill="#5B5BFF" strokeWidth={0} style={{ color: '#5B5BFF' }} />
        : <Square size={20} className="text-gray-300" />
      }
      <span className={`text-sm font-semibold ${checked ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
    </button>
  )
}

// ═══════════════════════════════════════════════════════════════════
export default function ActiveDelivery() {
  const navigate = useNavigate()
  const [step, setStep] = useState(STEPS.NEW_ORDER)
  const [checks, setChecks] = useState({ collected: true, sealed: true, matches: true })
  const [photoTaken, setPhotoTaken] = useState(false)

  const toggleCheck = key => setChecks(c => ({ ...c, [key]: !c[key] }))
  const allChecked = Object.values(checks).every(Boolean)

  // ── NEW ORDER MODAL ────────────────────────────────────────────
  if (step === STEPS.NEW_ORDER) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col max-w-md mx-auto overflow-hidden">
        {/* Map & Overlay behind */}
        <div className="absolute inset-0 z-0">
          <MapBg height="100%" />
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
        </div>

        {/* Spacer pushes bottom sheet down */}
        <div className="flex-1 z-10" />

        {/* Red accent line */}
        <div className="relative z-10 h-1 w-full" style={{ background: 'linear-gradient(90deg, #EF4444, #5B5BFF)' }} />

        {/* Bottom sheet */}
        <div className="relative z-10 bg-white rounded-t-[2rem] px-5 pt-6 pb-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="text-[10px] font-bold border border-gray-300 text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider">
                Instant Delivery
              </span>
              <h2 className="text-xl font-black text-gray-900 mt-2">Food Pickup</h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">Estimated Fee</p>
              <p className="text-2xl font-black" style={{ color: '#22c55e' }}>₦650.00</p>
            </div>
          </div>

          {/* Restaurant */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-900 flex-shrink-0 flex items-center justify-center">
              <span className="text-3xl">🍔</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">The Burger Joint</p>
              <p className="text-sm text-gray-400">Victoria Island, Phase 1</p>
            </div>
          </div>

          {/* Route */}
          <div className="flex gap-3 mb-6">
            {/* Connector line */}
            <div className="flex flex-col items-center pt-1 gap-0">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0" />
              <div className="w-0.5 flex-1 bg-gray-200 my-1" style={{ minHeight: '36px' }} />
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Pickup</p>
                <p className="font-bold text-gray-900 text-sm">12B Admiralty Way, Lekki</p>
                <p className="text-xs text-gray-400">2.4 km away • 6 mins</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Dropoff</p>
                <p className="font-bold text-gray-900 text-sm">Eko Atlantic City Towers</p>
                <p className="text-xs text-gray-400">8.1 km trip • 18 mins</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => navigate(-1)}
              className="flex-1 py-4 rounded-2xl border-2 border-red-400 text-red-500 font-black text-sm uppercase tracking-wider transition-opacity active:opacity-70">
              Decline
            </button>
            <button onClick={() => setStep(STEPS.HEADING_PICKUP)}
              className="flex-1 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-opacity active:opacity-80"
              style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── HEADING TO PICKUP ──────────────────────────────────────────
  if (step === STEPS.HEADING_PICKUP) {
    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
        <div className="relative" style={{ height: '55vh' }}>
          <MapBg height="100%">
            <OrderHeader onBack={() => setStep(STEPS.NEW_ORDER)} />
            <MapFabs />
          </MapBg>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 px-4 py-3 bg-gray-50">
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
            <p className="text-xl font-black text-gray-900">8 mins</p>
          </div>
          <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Distance</p>
            <p className="text-xl font-black text-gray-900">2.4 km</p>
          </div>
        </div>

        {/* Turn instruction */}
        <div className="mx-4 mb-4 rounded-2xl px-4 py-3 flex items-center gap-3"
          style={{ background: '#0d1628' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#5B5BFF' }}>
            <Navigation size={18} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Head East on Ozumba Mbadiwe Rd</p>
            <p className="text-gray-400 text-xs">Then turn right in 400m</p>
          </div>
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-t-3xl px-5 pt-5 pb-6 flex-1 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          {/* Status pill */}
          <div className="flex justify-center mb-4">
            <span className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              Heading to Pickup
            </span>
          </div>

          {/* Restaurant row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🍔</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">The Burger Joint</p>
              <p className="text-xs text-gray-400">42 Admiralty Way, Lekki Phase 1,...</p>
            </div>
            <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Phone size={16} style={{ color: '#5B5BFF' }} />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Navigation size={16} style={{ color: '#5B5BFF' }} />
            </button>
          </div>

          {/* Items row */}
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 mb-5">
            <div className="flex items-center gap-3">
              <Package size={18} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">3 Items • Ready for pickup</span>
            </div>
            <button className="text-xs font-bold" style={{ color: '#5B5BFF' }}>Details</button>
          </div>

          {/* CTA */}
          <button onClick={() => setStep(STEPS.CONFIRM_PICKUP)}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
            Confirm Pickup
          </button>
        </div>
      </div>
    )
  }

  // ── CONFIRM PICKUP ────────────────────────────────────────────
  if (step === STEPS.CONFIRM_PICKUP) {
    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
        {/* Map */}
        <div className="relative" style={{ height: '28vh' }}>
          <MapBg height="100%">
            <OrderHeader onBack={() => setStep(STEPS.HEADING_PICKUP)} />
          </MapBg>
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-t-3xl flex-1 px-5 pt-5 pb-6 overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

          <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm Pickup</h2>
          <p className="text-gray-500 text-sm mb-5">Verify the items before starting delivery</p>

          {/* Delivering to */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 mb-5">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#5B5BFF' }}>
              <span className="text-white text-lg">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Delivering To</p>
              <p className="font-bold text-gray-900">Adaeze O.</p>
            </div>
            <button className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center">
              <MessageSquare size={14} className="text-white" />
            </button>
            <button className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center ml-1">
              <Phone size={14} className="text-white" />
            </button>
          </div>

          {/* Order summary */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Summary</p>
            <p className="text-[10px] font-bold" style={{ color: '#5B5BFF' }}>ID: #88219</p>
          </div>
          <div className="flex flex-col gap-3 mb-5">
            {[
              { qty: '2×', name: 'Jollof Rice & Grilled Chicken', note: 'Extra Spice, Side Salad' },
              { qty: '1×', name: 'Fresh Zobo Drink (500ml)', note: 'No Sugar Added' },
            ].map(item => (
              <div key={item.name} className="flex gap-3 items-start">
                <span className="text-xs font-black text-gray-400 w-6 flex-shrink-0 mt-0.5">{item.qty}</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Final checklist */}
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Final Checklist</p>
          <div className="flex flex-col gap-2 mb-6">
            <CheckItem label="All items collected" checked={checks.collected} onToggle={() => toggleCheck('collected')} />
            <CheckItem label="Order sealed" checked={checks.sealed} onToggle={() => toggleCheck('sealed')} />
            <CheckItem label="Order matches receipt" checked={checks.matches} onToggle={() => toggleCheck('matches')} />
          </div>

          <button onClick={() => setStep(STEPS.EN_ROUTE)}
            disabled={!allChecked}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-40"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
            I have picked up this order
          </button>
        </div>
      </div>
    )
  }

  // ── EN ROUTE ──────────────────────────────────────────────────
  if (step === STEPS.EN_ROUTE) {
    return (
      <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
        {/* Map full top */}
        <div className="relative flex-1" style={{ minHeight: '50vh' }}>
          <MapBg height="100%">
            <OrderHeader onBack={() => setStep(STEPS.CONFIRM_PICKUP)} />

            {/* Floating turn card */}
            <div className="absolute left-4 right-4 z-20" style={{ top: '90px' }}>
              <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#5B5BFF' }}>
                  <Navigation size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#5B5BFF' }}>400 Meters</p>
                  <p className="font-bold text-gray-900 text-sm">Turn right onto Admiralty Way</p>
                </div>
              </div>
            </div>

            {/* Live tracking pill */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-xs font-bold">Live Tracking Active</span>
              </div>
            </div>
          </MapBg>
        </div>

        {/* Bottom sheet */}
        <div className="bg-white rounded-t-3xl px-5 pt-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

          {/* Status pill */}
          <div className="flex justify-center mb-4">
            <span className="text-xs font-bold px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a' }}>
              en route to customer
            </span>
          </div>

          {/* Customer info */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-xl font-black text-gray-900">Adaeze O.</p>
              <p className="text-sm text-gray-400 mt-0.5">Lekki Phase 1, Block 12, Apt 4B</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <Phone size={16} className="text-gray-600" />
              </button>
              <button className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <MessageSquare size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50 rounded-2xl px-4 py-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Time to Dropoff</p>
              <p className="text-xl font-black text-gray-900">8 mins</p>
            </div>
            <div className="bg-gray-50 rounded-2xl px-4 py-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Earnings</p>
              <p className="text-xl font-black text-gray-900">₦1,450.00</p>
            </div>
          </div>

          <button onClick={() => setStep(STEPS.CONFIRM_DELIVERY)}
            className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
            Confirm Delivery
          </button>
        </div>
      </div>
    )
  }

  // ── CONFIRM DELIVERY ──────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto overflow-hidden">
      {/* Map */}
      <div className="relative" style={{ height: '30vh' }}>
        <MapBg height="100%">
          <div className="absolute top-12 left-4 z-10">
            <button onClick={() => setStep(STEPS.EN_ROUTE)}
              className="w-9 h-9 flex items-center justify-center">
              <ArrowLeft size={20} className="text-white" />
            </button>
          </div>
        </MapBg>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl flex-1 px-5 pt-5 pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <h2 className="text-2xl font-black text-gray-900 mb-1">Confirm Delivery</h2>
        <p className="text-gray-500 text-sm mb-5">Did you hand over the order?</p>

        {/* Order card */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(91,91,255,0.1)' }}>
            <Package size={18} style={{ color: '#5B5BFF' }} />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Order #KB-8829</p>
            <p className="text-xs text-gray-400">2 Items • Jollof Rice & Wings</p>
          </div>
        </div>

        {/* Earnings banner */}
        <div className="flex items-center gap-3 rounded-2xl px-5 py-4 mb-4"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg">💰</span>
          </div>
          <p className="text-white font-bold text-sm">You earned ₦650 for this delivery</p>
        </div>

        {/* Photo upload */}
        <label className="cursor-pointer block mb-6">
          <input type="file" accept="image/*" className="hidden"
            onChange={() => setPhotoTaken(true)} />
          <div className={`rounded-2xl border-2 border-dashed flex flex-col items-center gap-2 py-7 transition-colors ${photoTaken ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
            <Camera size={24} style={{ color: photoTaken ? '#5B5BFF' : '#9CA3AF' }} />
            <p className="text-sm text-gray-500 font-medium">
              {photoTaken ? 'Photo captured ✓' : 'Take a delivery photo (optional)'}
            </p>
          </div>
        </label>

        <button onClick={() => navigate('/dispatch/delivery/1/success')}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}>
          Complete Delivery
        </button>
      </div>
    </div>
  )
}
