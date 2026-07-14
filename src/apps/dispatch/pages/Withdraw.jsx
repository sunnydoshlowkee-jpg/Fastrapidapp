import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, CheckCircle, ShieldCheck, Building2 } from 'lucide-react'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'
import { getProfile } from '../../../services/riderAuthService'

export default function Withdraw() {
  const navigate = useNavigate()
  const { earnings, refresh } = useRiderEarnings()
  const [profile, setProfile] = useState(null)
  
  const [amount, setAmount] = useState('')
  const fee = 50

  useEffect(() => {
    refresh()
    getProfile().then(res => setProfile(res.data?.data || res.data)).catch(console.error)
  }, [refresh])

  const balance = earnings?.wallet?.balance || 0
  const availableBalance = balance > fee ? balance - fee : 0

  const rawAmount = parseInt(amount.replace(/,/g, '') || '0', 10)
  const isValid = rawAmount >= 100 && rawAmount <= availableBalance

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') { setAmount(''); return }
    setAmount(Number(raw).toLocaleString())
  }

  const setMax = () => setAmount(availableBalance.toLocaleString())

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Withdraw</h1>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5">

        {/* Section heading */}
        <div>
          <h2 className="text-lg font-black text-gray-900 mb-0.5">Link your payout account</h2>
          <div className="h-0.5 w-14 rounded-full" style={{ background: '#5B5BFF' }} />
        </div>

        {/* Bank selector (read only now) */}
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Receiving Bank
          </label>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Building2 size={16} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{profile?.rider?.payout_bank_name || 'Loading...'}</p>
                <p className="text-xs text-gray-400">Registered Bank</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account number */}
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Account Number
          </label>
          <div className="bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3">
            <p className="flex-1 font-bold text-gray-900 text-sm tracking-wider">{profile?.rider?.payout_account_number || 'Loading...'}</p>
            <CheckCircle size={20} fill="#5B5BFF" className="text-white flex-shrink-0" />
          </div>
          {/* Resolved name */}
          <p className="text-xs font-black mt-2 px-1 uppercase" style={{ color: '#5B5BFF' }}>
            {profile?.rider?.payout_account_name || 'Loading...'}
          </p>
        </div>

        {/* Amount input */}
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Withdrawal Amount
          </label>
          <div className="bg-gray-100 rounded-2xl px-5 py-5">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-gray-400">₦</span>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={handleAmountChange}
                className="flex-1 bg-transparent text-3xl font-black text-gray-900 focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>
          {/* Available balance */}
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-400">
              Available balance: <span className="font-semibold text-gray-600">₦{availableBalance.toLocaleString()}</span>
            </p>
            <button onClick={setMax}
              className="text-xs font-black"
              style={{ color: '#5B5BFF' }}>
              Max
            </button>
          </div>
        </div>

        {/* Fee + Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Fee</p>
            <p className="text-lg font-black text-gray-900">₦{fee}.00</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time</p>
            <p className="text-lg font-black text-gray-900">Instant</p>
          </div>
        </div>

        {/* Secure transfer info */}
        <div className="rounded-2xl overflow-hidden border border-gray-100">
          <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(91,91,255,0.04)' }}>
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: '#5B5BFF' }} />
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(91,91,255,0.1)' }}>
              <ShieldCheck size={18} style={{ color: '#5B5BFF' }} />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm mb-1">Secure Bank Transfer</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Funds are processed instantly. Ensure the account name matches your registered profile to avoid delays.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1" />
      </div>

      {/* Confirm button */}
      <div className="px-5 pb-8 pt-4">
        <button
          disabled={!isValid}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-40"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Confirm Transfer
        </button>
      </div>
    </div>
  )
}
