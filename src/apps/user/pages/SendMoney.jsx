import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, AlertCircle, Delete } from 'lucide-react'
import { getWalletData, sendWalletTransfer, sendBankTransfer, setWalletPin, getBanks, resolveAccountName, resolveRecipient, WALLET_CACHE_KEY, markWalletHasPinInCache } from '../../../services/walletService'
import { getCached, setCached } from '../../../utils/requestCache'
import { useAuth } from '../../../context/AuthContext'
import SecurityAuthPanel from '../../../components/security/SecurityAuthPanel'

export default function SendMoney() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const transactionMethod = user?.security?.transaction_method || 'pin'
  const [tab, setTab] = useState('rapid')
  const [recipient, setRecipient] = useState('')
  const [banks, setBanks] = useState([])
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [pin, setPin] = useState('')
  const [pendingPin, setPendingPin] = useState('')
  const [pinSetupStep, setPinSetupStep] = useState('verify')
  const initialWallet = getCached(WALLET_CACHE_KEY)
  const [balance, setBalance] = useState(initialWallet?.data?.balance || 0)
  const [hasPin, setHasPin] = useState(Boolean(initialWallet?.data?.has_pin))
  const [loading, setLoading] = useState(false)
  const [pinStatusLoading, setPinStatusLoading] = useState(false)
  const [error, setError] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [recipientLookupError, setRecipientLookupError] = useState('')
  const [resolvingName, setResolvingName] = useState(false)
  const submittedRef = useRef(false)
  const resolvedRecipientRef = useRef('')

  const isRecipientReadyToResolve = useCallback((value) => {
    const trimmed = value.trim()
    if (!trimmed) return false

    if (trimmed.startsWith('@')) {
      return trimmed.length >= 3
    }

    if (trimmed.includes('@')) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    }

    const digits = trimmed.replace(/\D/g, '')
    return digits.length >= 10
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
      const result = await resolveRecipient(trimmed)

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
    const load = async () => {
      getWalletData().then(({ data }) => {
        const walletData = data?.data
        if (!walletData) return
        setBalance(walletData.balance || 0)
        setHasPin(Boolean(walletData.has_pin))
        setCached(WALLET_CACHE_KEY, walletData)
      }).catch(console.error)

      try {
        const banksList = await getBanks()
        setBanks(banksList)
        if (banksList.length > 0) {
          setBankCode(banksList[0].code)
        }
      } catch (err) {
        console.error('Could not load banks', err)
      }
    }
    load()
  }, [])

  const syncPinStatus = async () => {
    const { data } = await getWalletData()
    const walletData = data?.data
    if (!walletData) return false

    setBalance(walletData.balance || 0)
    const pinExists = Boolean(walletData.has_pin)
    setHasPin(pinExists)
    setCached(WALLET_CACHE_KEY, walletData)
    return pinExists
  }

  const openPinScreen = async () => {
    setError('')
    setPin('')
    setPendingPin('')
    setPinStatusLoading(true)

    try {
      const pinExists = await syncPinStatus()
      setPinSetupStep(pinExists ? 'verify' : 'create')
      setShowPin(true)
    } catch (err) {
      setError(err?.message || 'Could not load wallet PIN status.')
    } finally {
      setPinStatusLoading(false)
    }
  }

  const resetPinEntry = () => {
    setPin('')
    setPendingPin('')
    setPinSetupStep(hasPin ? 'verify' : 'create')
    submittedRef.current = false
  }

  const closePinScreen = () => {
    setShowPin(false)
    setError('')
    resetPinEntry()
  }

  useEffect(() => {
    if (tab !== 'rapid') {
      return undefined
    }

    const trimmed = recipient.trim()

    if (!isRecipientReadyToResolve(trimmed)) {
      setRecipientName('')
      setRecipientLookupError('')
      resolvedRecipientRef.current = ''
      return undefined
    }

    if (resolvedRecipientRef.current === trimmed.toLowerCase()) {
      return undefined
    }

    const timer = setTimeout(() => {
      lookupRecipientNow(trimmed)
    }, 350)

    return () => clearTimeout(timer)
  }, [recipient, tab, isRecipientReadyToResolve, lookupRecipientNow])

  useEffect(() => {
    let active = true
    const resolveName = async () => {
      if (tab === 'bank' && accountNumber.length === 10 && bankCode) {
        setResolvingName(true)
        setRecipientName('')
        setRecipientLookupError('')
        setError('')
        try {
          const result = await resolveAccountName(bankCode, accountNumber)
          if (active && result?.account_name) {
            setRecipientName(result.account_name)
          }
        } catch (err) {
          if (active) {
            setRecipientLookupError('Could not verify account name')
            setRecipientName('')
          }
        } finally {
          if (active) {
            setResolvingName(false)
          }
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

  const handlePinPress = (val) => {
    if (val === 'delete') {
      setPin((prev) => prev.slice(0, -1))
    } else if (pin.length < 4) {
      setPin((prev) => prev + val)
    }
  }

  const completeTransfer = async (authPayload = {}) => {
    const pinToUse = authPayload.pin || pin
    const authCode = authPayload.auth_code
    setError('')
    setLoading(true)

    try {
      if (transactionMethod === 'pin' && !hasPin) {
        try {
          await setWalletPin(pinToUse)
          setHasPin(true)
          markWalletHasPinInCache()
        } catch (pinErr) {
          if (String(pinErr?.message || '').toLowerCase().includes('already set')) {
            setHasPin(true)
            markWalletHasPinInCache()
          } else {
            throw pinErr
          }
        }
      }

      if (tab === 'bank') {
        const selectedBank = banks.find(b => b.code === bankCode)
        await sendBankTransfer({
          bankCode,
          bankName: selectedBank ? selectedBank.name : bankCode,
          accountNumber,
          amount: numAmount,
          pin: transactionMethod === 'pin' ? pinToUse : undefined,
          auth_code: authCode,
        })
        navigate('/app/wallet')
      } else {
        const result = await sendWalletTransfer({
          recipient,
          amount: numAmount,
          pin: transactionMethod === 'pin' ? pinToUse : undefined,
          auth_code: authCode,
        })
        const transaction = result?.data?.transaction
        if (transaction?.id) {
          navigate(`/app/wallet/receipt/${transaction.id}`, { state: { tx: transaction } })
        } else {
          navigate('/app/wallet')
        }
      }
    } catch (err) {
      setError(err?.message || 'Transfer failed.')
      submittedRef.current = false
      if (transactionMethod === 'pin') {
        resetPinEntry()
      }
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!showPin) {
      submittedRef.current = false
      return
    }

    if (pin.length !== 4 || loading || submittedRef.current) {
      return
    }

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

  if (showPin) {
    if (transactionMethod !== 'pin') {
      return (
        <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
          <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
            <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
              <button onClick={closePinScreen} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Send Money</h1>
            </div>
            <SecurityAuthPanel
              purpose="transaction"
              method={transactionMethod}
              title="Authorize Payment"
              subtitle={tab === 'rapid' && recipientName
                ? `Send ₦${numAmount.toLocaleString()} to ${recipientName}`
                : `Confirm transaction of ₦${numAmount.toLocaleString()}`}
              onCancel={closePinScreen}
              onVerified={(payload) => {
                submittedRef.current = true
                setError('')
                completeTransfer(payload)
              }}
            />
            {error ? <p className="px-5 pb-6 text-sm text-red-600 text-center">{error}</p> : null}
            {loading ? <p className="px-5 pb-6 text-sm text-gray-500 text-center">Processing transfer…</p> : null}
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
          <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
            <button onClick={closePinScreen} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Send Money</h1>
          </div>

          <div className="flex-1 flex flex-col pt-6 md:pt-8 md:pb-8">
            <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-8 w-full">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">Authorize Payment</h2>
              <p className="text-[13px] text-gray-500 mb-2 text-center">
                {tab === 'rapid' && recipientName
                  ? <>Sending <span className="font-semibold text-gray-900">₦{numAmount.toLocaleString()}</span> to <span className="font-semibold text-gray-900">{recipientName}</span></>
                  : <>Confirm transaction of ₦{numAmount.toLocaleString()}</>}
              </p>
              {!hasPin && pinSetupStep === 'create' ? (
                <p className="text-xs text-gray-500 mb-6 text-center">Create a 4-digit PIN to secure future transfers.</p>
              ) : null}
              {!hasPin && pinSetupStep === 'confirm' ? (
                <p className="text-xs text-gray-500 mb-6 text-center">Confirm your 4-digit PIN.</p>
              ) : null}
              {hasPin ? (
                <p className="text-xs text-gray-500 mb-6 text-center">Enter your 4-digit PIN to authorize this transfer.</p>
              ) : null}
              {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

              <div className="flex gap-4 mb-10">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all ${
                      i < pin.length ? 'bg-[#4F46E5] scale-110' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '#', 0, 'delete'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => key !== '#' && handlePinPress(key === 'delete' ? 'delete' : String(key))}
                    className={`h-14 md:h-16 rounded-xl flex items-center justify-center text-[22px] md:text-[24px] font-semibold transition-all hover:bg-gray-50 active:scale-95 ${
                      key === 'delete'
                        ? 'text-red-500'
                        : key === '#'
                          ? 'text-gray-300 pointer-events-none'
                          : 'text-gray-900'
                    }`}
                  >
                    {key === 'delete' ? <Delete size={24} className="text-red-400" /> : key}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Send Money</h1>
        </div>

        <div className="px-5 md:px-8 w-full flex-1 flex flex-col pt-4 md:pt-8 md:pb-8">
          <div className="flex bg-[#F0F0F5] p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setTab('rapid')}
              className={`flex-1 py-2.5 md:py-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all ${
                tab === 'rapid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              To Rapid User
            </button>
            <button
              type="button"
              onClick={() => setTab('bank')}
              className={`flex-1 py-2.5 md:py-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all ${
                tab === 'bank' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              To Bank Account
            </button>
          </div>

          {tab === 'bank' ? (
            <>
              <div className="mb-4">
                <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 block">Bank</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <select 
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                    className="flex-1 text-[14px] md:text-[15px] outline-none bg-transparent"
                  >
                    {banks.map(bank => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 block">Account Number</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit account number"
                    maxLength={10}
                    className="flex-1 text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
                {resolvingName && (
                  <p className="text-[12px] text-gray-500 mt-2 flex items-center gap-2">
                    <span className="w-3 h-3 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></span>
                    Resolving account name...
                  </p>
                )}
                {recipientLookupError ? (
                  <p className="text-[12px] text-red-600 mt-2">{recipientLookupError}</p>
                ) : null}
                {recipientName && (
                  <div className="mt-2 bg-green-50 border border-green-100 text-green-700 px-3 py-2.5 rounded-lg text-[13px] font-bold flex items-center gap-2">
                    <User size={14} className="text-green-600" />
                    {recipientName}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="mb-6">
              <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 block">Recipient</label>
              <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 flex items-center gap-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => {
                    const next = e.target.value
                    setRecipient(next)
                    setRecipientLookupError('')
                    if (next.trim().toLowerCase() !== resolvedRecipientRef.current) {
                      setRecipientName('')
                    }
                  }}
                  onBlur={() => {
                    const trimmed = recipient.trim()
                    if (isRecipientReadyToResolve(trimmed)) {
                      lookupRecipientNow(trimmed)
                    }
                  }}
                  placeholder="email or phone number"
                  className="flex-1 text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                />
                <User size={18} className="text-[#4F46E5] md:w-5 md:h-5" />
              </div>
              {resolvingName && (
                <p className="text-[12px] text-gray-500 mt-2 flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></span>
                  Looking up recipient...
                </p>
              )}
              {recipientLookupError ? (
                <p className="text-[12px] text-red-600 mt-2">{recipientLookupError}</p>
              ) : null}
              {recipientName ? (
                <div className="mt-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-green-700/80">Recipient</p>
                    <p className="text-[15px] font-bold">{recipientName}</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div className="mb-4">
            <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2 block">Amount</label>
            <div className={`bg-white md:bg-gray-50 rounded-xl border px-5 py-4 flex items-center gap-2 focus-within:ring-2 transition-all ${
              insufficient ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-50' : 'border-gray-200 focus-within:border-[#4F46E5] focus-within:ring-indigo-50'
            }`}>
              <span className={`text-[28px] md:text-[32px] font-bold ${insufficient ? 'text-red-500' : 'text-gray-900'}`}>₦</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
                className={`text-[28px] md:text-[32px] font-bold outline-none bg-transparent flex-1 ${
                  insufficient ? 'text-red-500' : 'text-gray-900'
                }`}
              />
            </div>
          </div>

          {insufficient && (
            <div className="flex items-center gap-2 mb-6 px-1">
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-[12px] text-red-500 font-medium">Insufficient Funds (Balance: ₦{balance.toLocaleString()})</span>
            </div>
          )}

          {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}

          <div className="mt-auto pb-6 md:pb-0">
            <button
              type="button"
              onClick={async () => {
                if (tab === 'bank') {
                  if (accountNumber.length < 10) {
                    setError('Enter a valid 10-digit account number.')
                    return
                  }
                  if (!recipientName) {
                    setError(recipientLookupError || 'Could not verify account name.')
                    return
                  }
                } else {
                  const trimmed = recipient.trim()
                  if (!trimmed) {
                    setError('Enter a recipient email or phone number.')
                    return
                  }
                  if (resolvedRecipientRef.current !== trimmed.toLowerCase() || !recipientName) {
                    const result = await lookupRecipientNow(trimmed)
                    if (!result?.name) {
                      setError(recipientLookupError || 'Could not verify recipient. Check the email or phone number.')
                      return
                    }
                  }
                }
                if (numAmount < 100) {
                  setError('Minimum transfer amount is ₦100.')
                  return
                }
                await openPinScreen()
              }}
              disabled={insufficient || !amount || loading || pinStatusLoading || resolvingName}
              className={`w-full py-4 md:py-4.5 rounded-xl font-bold text-[15px] md:text-[16px] transition-all ${
                insufficient || !amount || loading || pinStatusLoading || resolvingName
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98]'
              }`}
            >
              {pinStatusLoading ? 'Checking PIN…' : loading ? 'Sending…' : 'Review Transfer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
