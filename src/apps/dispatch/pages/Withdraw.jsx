import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, CheckCircle, ShieldCheck, Building2 } from 'lucide-react'

const BANKS = [
  'Access Bank PLC', 'GTBank', 'First Bank', 'Zenith Bank',
  'UBA', 'Kuda Bank', 'Opay', 'Palmpay',
]

const AVAILABLE = 142500

export default function Withdraw() {
  const navigate = useNavigate()
  const [bank, setBank] = useState('Access Bank PLC')
  const [showBanks, setShowBanks] = useState(false)
  const [amount, setAmount] = useState('50,000')
  const fee = 50

  const rawAmount = parseInt(amount.replace(/,/g, '') || '0', 10)
  const isValid = rawAmount >= 100 && rawAmount <= AVAILABLE

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') { setAmount(''); return }
    setAmount(Number(raw).toLocaleString())
  }

  const setMax = () => setAmount(AVAILABLE.toLocaleString())

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

        {/* Bank selector */}
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Select Receiving Bank
          </label>
          <div className="relative">
            <button
              onClick={() => setShowBanks(!showBanks)}
              className="w-full bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3 text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Building2 size={16} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{bank}</p>
                <p className="text-xs text-gray-400">Standard Commercial Bank</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showBanks && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                {BANKS.map(b => (
                  <button key={b}
                    onClick={() => { setBank(b); setShowBanks(false) }}
                    className={`w-full px-4 py-3.5 text-left text-sm transition-colors hover:bg-gray-50 ${b === bank ? 'font-black' : 'font-medium text-gray-700'}`}
                    style={{ color: b === bank ? '#5B5BFF' : undefined }}
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
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            Account Number
          </label>
          <div className="bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3">
            <p className="flex-1 font-bold text-gray-900 text-sm tracking-wider">99838732222</p>
            <CheckCircle size={20} fill="#5B5BFF" className="text-white flex-shrink-0" />
          </div>
          {/* Resolved name */}
          <p className="text-xs font-black mt-2 px-1" style={{ color: '#5B5BFF' }}>
            CHUKWUMA EMEKA ADEBAYO
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
              Available balance: <span className="font-semibold text-gray-600">₦{AVAILABLE.toLocaleString()}.00</span>
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
