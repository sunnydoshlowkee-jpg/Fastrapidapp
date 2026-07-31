import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Delete } from 'lucide-react'
import {
  getMerchantBanks,
  getMerchantWalletData,
  markMerchantWalletHasPinInCache,
  MERCHANT_WALLET_CACHE_KEY,
  resolveMerchantAccountName,
  resolveMerchantRecipient,
  sendMerchantBankTransfer,
  sendMerchantWalletTransfer,
  setMerchantWalletPin,
  withdrawMerchantToLinkedBank,
} from '../../../services/merchantWalletService'
import { getCached, setCached } from '../../../utils/requestCache'

const TABS = [
  { id: 'linked', label: 'My Bank' },
  { id: 'rapid', label: 'Rapid User' },
  { id: 'bank', label: 'Other Bank' },
]

export default function MerchantSendMoney() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = TABS.some((t) => t.id === searchParams.get('tab'))
    ? searchParams.get('tab')
    : 'linked'

  const [tab, setTab] = useState(initialTab)
  const [recipient, setRecipient] = useState('')
  const [banks, setBanks] = useState([])
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [pin, setPin] = useState('')
  const [pendingPin, setPendingPin] = useState('')
  const [pinSetupStep, setPinSetupStep] = useState('verify')
  const initialWallet = getCached(MERCHANT_WALLET_CACHE_KEY)
  const [balance, setBalance] = useState(initialWallet?.data?.balance || 0)
  const [hasPin, setHasPin] = useState(Boolean(initialWallet?.data?.has_pin))
  const [linkedBank, setLinkedBank] = useState(initialWallet?.data?.linked_bank || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientLookupError, setRecipientLookupError] = useState('')
  const [resolvingName, setResolvingName] = useState(false)
  const submittedRef = useRef(false)
  const resolvedRecipientRef = useRef('')

  const isRecipientReadyToResolve = useCallback((value) => {
    const trimmed = value.trim()
    if (!trimmed) return false
    if (trimmed.startsWith('@')) return trimmed.length >= 3
    if (trimmed.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    return trimmed.replace(/\D/g, '').length >= 10
  }, [])

  const lookupRecipientNow = useCallback(async (value) => {
    const trimmed = String(value ?? recipient).trim()
    if (!isRecipientReadyToResolve(trimmed)) {
      setRecipientName('')
      setRecipientLookupError(trimmed ? 'Enter a valid email or phone number.' : '')
      resolvedRecipientRef.current = ''
      return null
    }

    setResolvingName(true)
    setRecipientLookupError('')
    try {
      const result = await resolveMerchantRecipient(trimmed)
      if (result?.name) {
        setRecipientName(result.name)
        resolvedRecipientRef.current = trimmed.toLowerCase()
        return result
      }
      setRecipientLookupError('No Rapid user found for that recipient.')
      setRecipientName('')
      resolvedRecipientRef.current = ''
      return null
    } catch (err) {
      setRecipientLookupError(err?.message || 'No Rapid user found for that recipient.')
      setRecipientName('')
      resolvedRecipientRef.current = ''
      return null
    } finally {
      setResolvingName(false)
    }
  }, [isRecipientReadyToResolve, recipient])

  useEffect(() => {
    getMerchantWalletData()
      .then(({ data }) => {
        const walletData = data?.data
        if (!walletData) return
        setBalance(walletData.balance || 0)
        setHasPin(Boolean(walletData.has_pin))
        setLinkedBank(walletData.linked_bank || null)
        setCached(MERCHANT_WALLET_CACHE_KEY, walletData)
      })
      .catch(console.error)

    getMerchantBanks()
      .then((list) => {
        setBanks(list)
        if (list.length > 0) setBankCode(list[0].code)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (tab !== 'rapid') return undefined
    const trimmed = recipient.trim()
    if (!isRecipientReadyToResolve(trimmed)) {
      setRecipientName('')
      setRecipientLookupError('')
      resolvedRecipientRef.current = ''
      return undefined
    }
    if (resolvedRecipientRef.current === trimmed.toLowerCase()) return undefined
    const timer = setTimeout(() => lookupRecipientNow(trimmed), 350)
    return () => clearTimeout(timer)
  }, [recipient, tab, isRecipientReadyToResolve, lookupRecipientNow])

  useEffect(() => {
    let active = true
    const resolveName = async () => {
      if (tab === 'bank' && accountNumber.length === 10 && bankCode) {
        setResolvingName(true)
        setRecipientName('')
        setRecipientLookupError('')
        try {
          const result = await resolveMerchantAccountName(bankCode, accountNumber)
          if (active && result?.account_name) setRecipientName(result.account_name)
        } catch {
          if (active) {
            setRecipientLookupError('Could not verify account name')
            setRecipientName('')
          }
        } finally {
          if (active) setResolvingName(false)
        }
      } else if (tab !== 'rapid') {
        setRecipientName('')
        setRecipientLookupError('')
        setResolvingName(false)
      }
    }
    const timer = setTimeout(resolveName, 500)
    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [accountNumber, bankCode, tab])

  const numAmount = Number.parseFloat(String(amount).replace(/[^\d.]/g, '')) || 0
  const insufficient = numAmount > balance
  const linkedReady = Boolean(linkedBank?.verified)

  const canContinue = () => {
    if (!numAmount || numAmount < 100 || insufficient) return false
    if (tab === 'linked') return linkedReady
    if (tab === 'rapid') return Boolean(recipientName) && !recipientLookupError
    if (tab === 'bank') return Boolean(recipientName) && accountNumber.length === 10 && bankCode
    return false
  }

  const openPinScreen = () => {
    setError('')
    setPin('')
    setPendingPin('')
    setPinSetupStep(hasPin ? 'verify' : 'create')
    setShowPin(true)
  }

  const resetPinEntry = () => {
    setPin('')
    setPendingPin('')
    setPinSetupStep(hasPin ? 'verify' : 'create')
    submittedRef.current = false
  }

  const closePinScreen = () => {
    setShowPin(false)
    resetPinEntry()
  }

  const completeTransfer = async (pinToUse = pin) => {
    setError('')
    setLoading(true)
    try {
      if (!hasPin) {
        try {
          await setMerchantWalletPin(pinToUse)
          setHasPin(true)
          markMerchantWalletHasPinInCache()
        } catch (pinErr) {
          if (String(pinErr?.message || '').toLowerCase().includes('already set')) {
            setHasPin(true)
            markMerchantWalletHasPinInCache()
          } else {
            throw pinErr
          }
        }
      }

      if (tab === 'linked') {
        await withdrawMerchantToLinkedBank({ amount: numAmount, pin: pinToUse })
      } else if (tab === 'bank') {
        const selectedBank = banks.find((b) => b.code === bankCode)
        await sendMerchantBankTransfer({
          bankCode,
          bankName: selectedBank ? selectedBank.name : bankCode,
          accountNumber,
          amount: numAmount,
          pin: pinToUse,
        })
      } else {
        await sendMerchantWalletTransfer({
          recipient,
          amount: numAmount,
          pin: pinToUse,
        })
      }

      navigate('/merchant/wallet')
    } catch (err) {
      setError(err?.message || 'Transfer failed.')
      resetPinEntry()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!showPin) {
      submittedRef.current = false
      return
    }
    if (pin.length !== 4 || loading || submittedRef.current) return

    if (!hasPin && pinSetupStep === 'create') {
      setPendingPin(pin)
      setPin('')
      setPinSetupStep('confirm')
      setError('')
      return
    }

    if (!hasPin && pinSetupStep === 'confirm') {
      if (pin !== pendingPin) {
        setError('PINs do not match. Please try again.')
        setPin('')
        setPendingPin('')
        setPinSetupStep('create')
        return
      }
      submittedRef.current = true
      completeTransfer(pin)
      return
    }

    submittedRef.current = true
    completeTransfer(pin)
  }, [showPin, pin, loading, hasPin, pinSetupStep, pendingPin])

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value || 0)

  if (showPin) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FAFAFA] pb-24 lg:pb-8">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-app">
          <button type="button" onClick={closePinScreen} className="mb-6 self-start rounded-full bg-white p-2 shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-center text-xl font-bold text-gray-900">
            {!hasPin && pinSetupStep === 'create'
              ? 'Create a 4-digit PIN'
              : !hasPin && pinSetupStep === 'confirm'
                ? 'Confirm your PIN'
                : 'Enter transaction PIN'}
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            {formatCurrency(numAmount)}
            {tab === 'linked' && linkedBank?.account_name ? ` → ${linkedBank.account_name}` : ''}
            {tab === 'rapid' && recipientName ? ` → ${recipientName}` : ''}
            {tab === 'bank' && recipientName ? ` → ${recipientName}` : ''}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-3.5 w-3.5 rounded-full ${pin.length > i ? 'bg-[#4342FF]' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          {error ? <p className="mt-4 text-center text-sm text-red-500">{error}</p> : null}
          <div className="mt-auto grid grid-cols-3 gap-4 pb-8 pt-10">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'].map((key) =>
              key === '' ? (
                <div key="empty" />
              ) : (
                <button
                  key={key}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setPin((prev) => (key === 'delete' ? prev.slice(0, -1) : prev.length < 4 ? prev + key : prev))
                  }
                  className="flex h-16 items-center justify-center rounded-2xl bg-white text-xl font-bold text-gray-900 shadow-sm active:bg-gray-50 disabled:opacity-50"
                >
                  {key === 'delete' ? <Delete size={22} /> : key}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] pb-24 lg:pb-8">
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 pb-3 pt-app md:px-8 md:pt-8">
        <button
          type="button"
          onClick={() => navigate('/merchant/wallet')}
          className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">Send / Withdraw</h1>
          <p className="text-sm text-gray-500">Balance {formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md px-5 pt-5 md:max-w-lg md:px-8">
        <div className="mb-5 grid grid-cols-3 gap-1 rounded-2xl bg-gray-100 p-1">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id)
                setError('')
                setRecipientLookupError('')
              }}
              className={`rounded-xl px-2 py-2.5 text-[11px] font-bold transition-colors ${
                tab === item.id ? 'bg-white text-[#4342FF] shadow-sm' : 'text-gray-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'linked' ? (
          <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            {linkedReady ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Linked payout account</p>
                <p className="mt-2 text-sm font-bold text-gray-900">{linkedBank.account_name}</p>
                <p className="text-sm text-gray-500">
                  {linkedBank.bank_name} • {linkedBank.account_number}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-900">No linked bank account</p>
                <p className="mt-1 text-sm text-gray-500">
                  Add your payout bank in Settings to withdraw here.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/merchant/settings')}
                  className="mt-3 text-sm font-bold text-[#4342FF]"
                >
                  Go to Settings
                </button>
              </>
            )}
          </div>
        ) : null}

        {tab === 'rapid' ? (
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-400">
              Recipient email or phone
            </label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="name@email.com or 080…"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4342FF]"
            />
            {resolvingName ? <p className="mt-2 text-xs text-gray-400">Looking up…</p> : null}
            {recipientName ? (
              <p className="mt-2 rounded-xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                {recipientName}
              </p>
            ) : null}
            {recipientLookupError ? <p className="mt-2 text-xs text-red-500">{recipientLookupError}</p> : null}
          </div>
        ) : null}

        {tab === 'bank' ? (
          <div className="mb-4 space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-400">Bank</label>
              <select
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4342FF]"
              >
                {banks.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-400">
                Account number
              </label>
              <input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="0123456789"
                inputMode="numeric"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4342FF]"
              />
            </div>
            {resolvingName ? <p className="text-xs text-gray-400">Verifying account…</p> : null}
            {recipientName ? (
              <p className="rounded-xl bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                {recipientName}
              </p>
            ) : null}
            {recipientLookupError ? <p className="text-xs text-red-500">{recipientLookupError}</p> : null}
          </div>
        ) : null}

        <div className="mb-4">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-400">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            inputMode="decimal"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#4342FF]"
          />
          {numAmount > 0 && numAmount < 100 ? (
            <p className="mt-2 text-xs text-red-500">Minimum amount is ₦100.</p>
          ) : null}
          {insufficient ? <p className="mt-2 text-xs text-red-500">Insufficient wallet balance.</p> : null}
        </div>

        {error ? <p className="mb-3 text-sm text-red-500">{error}</p> : null}

        <button
          type="button"
          disabled={!canContinue() || loading}
          onClick={openPinScreen}
          className="w-full rounded-2xl bg-[#4342FF] py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 disabled:opacity-50"
        >
          {tab === 'linked' ? 'Withdraw' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
