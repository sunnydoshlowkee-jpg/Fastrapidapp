import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, CheckCircle, Info, ShieldCheck } from 'lucide-react'
import { register } from '../../../../services/riderAuthService'

const BANKS = ['GTBank', 'Access Bank', 'First Bank', 'Zenith Bank', 'UBA', 'Kuda Bank', 'Opay', 'Palmpay']

export default function RiderPayment() {
  const navigate = useNavigate()
  const [bank, setBank] = useState('GTBank')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName] = useState('CHUKWUMA KELVIN OKORO')
  const [showBanks, setShowBanks] = useState(false)
  const [loading, setLoading] = useState(false)

  const isResolved = accountNumber.length >= 10

  const handleSubmit = async () => {
    const phone = sessionStorage.getItem('rider_reg_phone') || ''
    const personal = JSON.parse(sessionStorage.getItem('rider_reg_personal') || '{}')
    const vehicle = JSON.parse(sessionStorage.getItem('rider_reg_vehicle') || '{}')

    const registerData = {
      name: `${personal.firstName} ${personal.lastName}`,
      email: personal.email,
      password: personal.password,
      vehicle_type: vehicle.vehicleType || 'motorcycle',
      plate_number: vehicle.plate || 'ABC-1234',
    }

    setLoading(true)
    try {
      const response = await register(registerData)
      const token = response.data?.token || response.token
      const user = response.data?.user || response.user

      localStorage.setItem('rapid_token', token)
      localStorage.setItem('rider_user', JSON.stringify(user))

      navigate('/dispatch/onboarding/success')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Registration failed. Try using a unique email address.')
    } finally {
      setLoading(false)
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
          Step 3 of 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {[0,1,2].map(i => (
          <div key={i} className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        ))}
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
      </div>

      {/* Heading */}
      <h1 className="text-[26px] font-black text-gray-900 leading-tight mb-2">
        Payment Details
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        This is where your earnings will be sent
      </p>

      {/* Form */}
      <div className="flex flex-col gap-5">

        {/* Bank name dropdown */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Bank Name
          </label>
          <div className="relative">
            <button
              onClick={() => setShowBanks(!showBanks)}
              className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-left flex items-center justify-between"
            >
              <span className="text-gray-900 font-medium text-sm">{bank}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            {showBanks && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 overflow-hidden">
                {BANKS.map(b => (
                  <button key={b}
                    onClick={() => { setBank(b); setShowBanks(false) }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-gray-50 ${b === bank ? 'text-[#5B5BFF] font-bold' : 'text-gray-700'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account number */}
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Account Number
          </label>
          <input
            type="tel"
            maxLength={10}
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="0123456789"
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
            style={{ '--tw-ring-color': '#5B5BFF40' }}
          />
        </div>

        {/* Account name — auto-resolved */}
        {isResolved && (
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Account Name
            </label>
            <div className="bg-gray-100 rounded-2xl px-4 py-4 flex items-center justify-between">
              <span className="text-gray-900 text-sm font-bold tracking-wide">{accountName}</span>
              <CheckCircle size={20} fill="#5B5BFF" className="text-white shrink-0" />
            </div>
          </div>
        )}
      </div>

      {/* Instant payouts banner */}
      <div className="mt-6 rounded-2xl p-4 flex gap-3" style={{ background: 'rgba(91,91,255,0.06)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#5B5BFF' }}>
          <Info size={14} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm mb-0.5">Instant Payouts</p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Earnings are paid out daily to this account. Ensure details are correct to avoid delays.
          </p>
        </div>
      </div>

      {/* Security badge */}
      <div className="mt-5 rounded-2xl overflow-hidden relative flex items-end" style={{ height: '100px', background: 'linear-gradient(135deg, #1a1a3e, #0d0d1f)' }}>
        {/* Abstract secure graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-24 h-24 rounded-full border-4 border-gray-400 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-400" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ShieldCheck size={36} className="opacity-30 text-white" />
        </div>
        <div className="relative z-10 p-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#5B5BFF' }} />
          <p className="text-white text-[9px] font-black uppercase tracking-[0.15em]">
            Secure Connection Verified
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-6" />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 mt-6 disabled:opacity-40"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  )
}
