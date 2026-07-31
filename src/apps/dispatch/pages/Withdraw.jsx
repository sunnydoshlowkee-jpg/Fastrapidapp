import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ShieldCheck, Building2 } from 'lucide-react'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'
import { getProfile } from '../../../services/riderAuthService'
import { withdrawRiderEarnings } from '../../../services/riderWalletService'

export default function Withdraw() {
  const navigate = useNavigate()
  const { earnings, refresh } = useRiderEarnings()
  const [profile, setProfile] = useState(null)
  const [amount, setAmount] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    refresh()
    getProfile().then(res => setProfile(res.data?.data || res.data)).catch(console.error)
  }, [refresh])

  const balance = Number(earnings?.wallet?.balance || 0)
  const availableBalance = balance
  const hasBank =
    Boolean(profile?.rider?.payout_bank_code) &&
    Boolean(profile?.rider?.payout_account_number) &&
    Boolean(profile?.rider?.payout_account_name)

  const rawAmount = parseInt(amount.replace(/,/g, '') || '0', 10)
  const isValid = hasBank && rawAmount >= 100 && rawAmount <= availableBalance && !submitting

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') { setAmount(''); return }
    setAmount(Number(raw).toLocaleString())
  }

  const setMax = () => {
    if (availableBalance >= 100) {
      setAmount(Math.floor(availableBalance).toLocaleString())
    }
  }

  const handleConfirm = async () => {
    if (!isValid) return
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      const result = await withdrawRiderEarnings(rawAmount)
      setSuccess(`Withdrawal of ₦${rawAmount.toLocaleString()} initiated.`)
      setAmount('')
      await refresh()
      if (result?.balance != null) {
        // balance refreshed via earnings hook
      }
    } catch (err) {
      setError(err.message || 'Withdrawal failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Withdraw</h1>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-black text-gray-900 mb-0.5">Cash out to your bank</h2>
          <div className="h-0.5 w-14 rounded-full" style={{ background: '#5B5BFF' }} />
        </div>

        {!hasBank && profile ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Your payout bank is incomplete.{" "}
            <button
              type="button"
              onClick={() => navigate('/dispatch/profile/bank')}
              className="font-bold underline"
            >
              Add bank account
            </button>
            {" "}before withdrawing.
          </div>
        ) : null}

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Receiving Bank
          </label>
          <button
            type="button"
            onClick={() => navigate('/dispatch/profile/bank')}
            className="w-full bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Building2 size={16} style={{ color: '#5B5BFF' }} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 text-sm">{profile?.rider?.payout_bank_name || 'Add bank account'}</p>
              <p className="text-xs text-gray-400">{hasBank ? 'Tap to change' : 'Required for cash-out'}</p>
            </div>
          </button>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Account Number
          </label>
          <div className="bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3">
            <p className="flex-1 font-bold text-gray-900 text-sm tracking-wider">{profile?.rider?.payout_account_number || 'Loading...'}</p>
            <CheckCircle size={20} fill="#5B5BFF" className="text-white flex-shrink-0" />
          </div>
          <p className="text-xs font-black mt-2 px-1 uppercase" style={{ color: '#5B5BFF' }}>
            {profile?.rider?.payout_account_name || 'Loading...'}
          </p>
        </div>

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
          <div className="flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-400">
              Available balance: <span className="font-semibold text-gray-600">₦{availableBalance.toLocaleString()}</span>
            </p>
            <button type="button" onClick={setMax}
              className="text-xs font-black"
              style={{ color: '#5B5BFF' }}>
              Max
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Fee</p>
            <p className="text-lg font-black text-gray-900">₦0.00</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Time</p>
            <p className="text-lg font-black text-gray-900">Minutes</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-100">
          <div className="flex items-start gap-3 p-4" style={{ background: 'rgba(91,91,255,0.04)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(91,91,255,0.1)' }}>
              <ShieldCheck size={18} style={{ color: '#5B5BFF' }} />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm mb-1">Secure Bank Transfer</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Funds are sent via Paystack to your verified payout account. Minimum withdrawal is ₦100.
              </p>
            </div>
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <div className="flex-1" />
      </div>

      <div className="px-5 pb-8 pt-4">
        <button
          type="button"
          disabled={!isValid}
          onClick={handleConfirm}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 disabled:opacity-40"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          {submitting ? 'Processing…' : 'Confirm Transfer'}
        </button>
      </div>
    </div>
  )
}
