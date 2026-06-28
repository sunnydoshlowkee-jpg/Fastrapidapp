import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, AlertCircle, Delete } from 'lucide-react'
import { getWalletData, sendWalletTransfer, sendBankTransfer, setWalletPin, getBanks, resolveAccountName } from '../../../services/walletService'

export default function SendMoney() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('rapid')
  const [recipient, setRecipient] = useState('')
  const [banks, setBanks] = useState([])
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [pin, setPin] = useState('')
  const [balance, setBalance] = useState(0)
  const [hasPin, setHasPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [resolvingName, setResolvingName] = useState(false)
  const submittedRef = useRef(false)

  useEffect(() => {
    const load = async () => {
      // Load wallet data independently so it doesn't block banks
      getWalletData().then(({ data }) => {
        setBalance(data?.data?.balance || 0)
        setHasPin(Boolean(data?.data?.has_pin))
      }).catch(console.error)

      // Load banks immediately
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

  useEffect(() => {
    let active = true
    const resolveName = async () => {
      if (tab === 'bank' && accountNumber.length === 10 && bankCode) {
        setResolvingName(true)
        setRecipientName('')
        setError('')
        try {
          const result = await resolveAccountName(bankCode, accountNumber)
          if (active && result?.account_name) {
            setRecipientName(result.account_name)
          }
        } catch (err) {
          if (active) {
            setError('Could not verify account name')
            setRecipientName('')
          }
        } finally {
          if (active) {
            setResolvingName(false)
          }
        }
      } else {
        setRecipientName('')
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

  const completeTransfer = async () => {
    setError('')
    setLoading(true)

    try {
      if (!hasPin && pin.length === 4) {
        await setWalletPin(pin)
      }

      if (tab === 'bank') {
        const selectedBank = banks.find(b => b.code === bankCode)
        await sendBankTransfer({
          bankCode,
          bankName: selectedBank ? selectedBank.name : bankCode,
          accountNumber,
          amount: numAmount,
          pin: hasPin || pin.length === 4 ? pin : undefined,
        })
      } else {
        await sendWalletTransfer({
          recipient,
          amount: numAmount,
          pin: hasPin || pin.length === 4 ? pin : undefined,
        })
      }

      navigate('/app/wallet')
    } catch (err) {
      setError(err?.message || 'Transfer failed.')
      setShowPin(false)
      setPin('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!showPin) {
      submittedRef.current = false
      return
    }

    if (pin.length === 4 && !loading && !submittedRef.current) {
      submittedRef.current = true
      completeTransfer()
    }
  }, [showPin, pin, loading])

  if (showPin) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
          <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
            <button onClick={() => setShowPin(false)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Send Money</h1>
          </div>

          <div className="flex-1 flex flex-col pt-6 md:pt-8 md:pb-8">
            <div className="flex-1 flex flex-col items-center justify-center px-5 md:px-8 w-full">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">Authorize Payment</h2>
              <p className="text-[13px] text-gray-500 mb-8">Confirm transaction of ₦{numAmount.toLocaleString()}</p>
              {!hasPin ? (
                <p className="text-xs text-gray-500 mb-6 text-center">Create a 4-digit PIN to secure future transfers.</p>
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
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
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
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="email or phone number"
                  className="flex-1 text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                />
                <User size={18} className="text-[#4F46E5] md:w-5 md:h-5" />
              </div>
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
              onClick={() => {
                if (tab === 'bank') {
                  if (accountNumber.length < 10) {
                    setError('Enter a valid 10-digit account number.')
                    return
                  }
                } else {
                  if (!recipient.trim()) {
                    setError('Enter a recipient email or phone number.')
                    return
                  }
                }
                if (numAmount < 100) {
                  setError('Minimum transfer amount is ₦100.')
                  return
                }
                setError('')
                setShowPin(true)
              }}
              disabled={insufficient || !amount || loading}
              className={`w-full py-4 md:py-4.5 rounded-xl font-bold text-[15px] md:text-[16px] transition-all ${
                insufficient || !amount || loading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.98]'
              }`}
            >
              {loading ? 'Sending…' : 'Review Transfer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
