import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  Loader2,
  Search,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react'
import {
  fetchRiderPayout,
  fetchRiderPayoutBanks,
  resolveRiderPayoutAccount,
  saveRiderPayout,
} from '../../../services/riderPayoutService'

export default function BankAccount() {
  const navigate = useNavigate()
  const [banks, setBanks] = useState([])
  const [bankCode, setBankCode] = useState('')
  const [showBanks, setShowBanks] = useState(false)
  const [bankSearch, setBankSearch] = useState('')
  const bankPickerRef = useRef(null)
  const bankSearchRef = useRef(null)
  const skipNextResolve = useRef(true)
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [resolvingName, setResolvingName] = useState(false)
  const [resolveError, setResolveError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const selectedBank = banks.find((bank) => bank.code === bankCode)
  const bankName = selectedBank?.name || ''

  const filteredBanks = useMemo(() => {
    const query = bankSearch.trim().toLowerCase()
    if (!query) return banks
    return banks.filter((bank) => bank.name.toLowerCase().includes(query))
  }, [banks, bankSearch])

  const isResolved =
    accountNumber.length === 10 && !!accountName && !resolvingName && !resolveError
  const canSave = Boolean(bankCode) && isResolved && !saving

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      try {
        const [bankList, payout] = await Promise.all([
          fetchRiderPayoutBanks(),
          fetchRiderPayout(),
        ])
        if (!active) return
        setBanks(bankList)
        skipNextResolve.current = true
        if (payout?.bank_code) setBankCode(payout.bank_code)
        if (payout?.account_number) setAccountNumber(payout.account_number)
        if (payout?.account_name) setAccountName(payout.account_name)
      } catch (err) {
        if (active) setError(err.message || 'Unable to load bank details.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!showBanks) return undefined
    const onDocClick = (event) => {
      if (bankPickerRef.current && !bankPickerRef.current.contains(event.target)) {
        setShowBanks(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [showBanks])

  useEffect(() => {
    if (skipNextResolve.current) {
      skipNextResolve.current = false
      return undefined
    }

    let active = true

    const resolveName = async () => {
      if (accountNumber.length !== 10 || !bankCode) {
        setResolveError('')
        setResolvingName(false)
        return
      }

      setResolvingName(true)
      setResolveError('')
      setAccountName('')
      setSuccess('')

      try {
        const resolved = await resolveRiderPayoutAccount({
          bankCode,
          accountNumber,
        })
        if (!active) return
        setAccountName(resolved?.account_name || '')
        setSuccess('Bank account verified and saved.')
      } catch (err) {
        if (!active) return
        setAccountName('')
        setResolveError(err.message || 'Could not verify this account.')
      } finally {
        if (active) setResolvingName(false)
      }
    }

    const timer = window.setTimeout(resolveName, 450)
    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [accountNumber, bankCode])

  const markEdited = () => {
    skipNextResolve.current = false
  }

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const saved = await saveRiderPayout({
        bankCode,
        accountNumber,
        accountName,
      })
      setAccountName(saved?.account_name || accountName)
      setSuccess('Payout bank saved. You can withdraw earnings now.')
    } catch (err) {
      setError(err.message || 'Unable to save payout details.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Bank Account</h1>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5 pb-8">
        <div>
          <h2 className="text-lg font-black text-gray-900 mb-0.5">Payout bank</h2>
          <div className="h-0.5 w-14 rounded-full" style={{ background: '#5B5BFF' }} />
          <p className="text-sm text-gray-500 mt-2">
            Verify a Nigerian bank account to receive rider withdrawals via Paystack.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500 py-8 justify-center">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        ) : (
          <>
            <div ref={bankPickerRef} className="relative">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Bank
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowBanks((open) => !open)
                  window.setTimeout(() => bankSearchRef.current?.focus(), 50)
                }}
                className="w-full bg-gray-100 rounded-2xl px-4 py-4 flex items-center justify-between text-left"
              >
                <span className={`font-bold text-sm ${bankName ? 'text-gray-900' : 'text-gray-400'}`}>
                  {bankName || 'Select bank'}
                </span>
                <ChevronDown size={18} className="text-gray-400" />
              </button>
              {showBanks ? (
                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-gray-100 bg-white shadow-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                    <Search size={14} className="text-gray-400" />
                    <input
                      ref={bankSearchRef}
                      value={bankSearch}
                      onChange={(e) => setBankSearch(e.target.value)}
                      placeholder="Search banks"
                      className="flex-1 text-sm outline-none"
                    />
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {filteredBanks.map((bank) => (
                      <button
                        key={bank.code}
                        type="button"
                        onClick={() => {
                          markEdited()
                          setBankCode(bank.code)
                          setShowBanks(false)
                          setBankSearch('')
                          setAccountName('')
                          setSuccess('')
                        }}
                        className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Account number
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                value={accountNumber}
                onChange={(e) => {
                  markEdited()
                  const next = e.target.value.replace(/\D/g, '').slice(0, 10)
                  setAccountNumber(next)
                  setSuccess('')
                  if (next.length < 10) setAccountName('')
                }}
                className="w-full bg-gray-100 rounded-2xl px-4 py-4 font-bold text-gray-900 tracking-wider outline-none"
                placeholder="0123456789"
              />
              {accountNumber.length > 0 && accountNumber.length < 10 ? (
                <p className="text-xs text-amber-600 mt-2">Account number must be exactly 10 digits.</p>
              ) : null}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Account name
              </label>
              <div className="bg-gray-100 rounded-2xl px-4 py-4 flex items-center gap-3 min-h-[56px]">
                {resolvingName ? (
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Verifying…
                  </p>
                ) : accountName ? (
                  <>
                    <p className="flex-1 font-bold text-gray-900 text-sm uppercase">{accountName}</p>
                    <CheckCircle size={18} fill="#5B5BFF" className="text-white" />
                  </>
                ) : (
                  <p className="text-sm text-gray-400">Resolved after bank + account number</p>
                )}
              </div>
              {resolveError ? (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle size={12} /> {resolveError}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border border-gray-100 p-4 flex gap-3" style={{ background: 'rgba(91,91,255,0.04)' }}>
              <ShieldCheck size={18} style={{ color: '#5B5BFF' }} className="flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Changing bank or account number verifies with Paystack and saves automatically. Use Save to confirm the current details.
              </p>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {success ? <p className="text-sm text-green-600">{success}</p> : null}

            <button
              type="button"
              disabled={!canSave}
              onClick={handleSave}
              className="w-full py-4 rounded-2xl text-white font-bold text-base disabled:opacity-40"
              style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
            >
              {saving ? 'Saving…' : 'Save bank account'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/dispatch/earnings/withdraw')}
              className="w-full py-3 rounded-2xl font-bold text-sm text-gray-700 bg-gray-100"
            >
              Go to withdraw
            </button>
          </>
        )}
      </div>
    </div>
  )
}
