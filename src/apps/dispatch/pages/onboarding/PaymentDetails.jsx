import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, CheckCircle, Info, ShieldCheck, AlertCircle, XCircle, Loader2, Search } from 'lucide-react'
import { register, getRiderBanks, resolveRiderAccountName, persistRiderSession, extractRiderSession } from '../../../../services/riderAuthService'
import { uploadStoredRiderIdentityAssets } from '../../../../services/riderOnboardingService'

export default function RiderPayment() {
  const navigate = useNavigate()
  const [banks, setBanks] = useState([])
  const [bankCode, setBankCode] = useState('')
  const [showBanks, setShowBanks] = useState(false)
  const [bankSearch, setBankSearch] = useState('')
  const bankPickerRef = useRef(null)
  const bankSearchRef = useRef(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [resolvingName, setResolvingName] = useState(false)
  const [resolveError, setResolveError] = useState('')
  const [loadingBanks, setLoadingBanks] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [accountNumberTouched, setAccountNumberTouched] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const selectedBank = banks.find((bank) => bank.code === bankCode)
  const bankName = selectedBank?.name || ''

  const filteredBanks = useMemo(() => {
    const query = bankSearch.trim().toLowerCase()
    if (!query) return banks

    return banks.filter((bank) => bank.name.toLowerCase().includes(query))
  }, [banks, bankSearch])

  const accountNumberError = accountNumber.length > 0 && accountNumber.length < 10
    ? 'Account number must be exactly 10 digits.'
    : ''
  const isResolved = accountNumber.length === 10 && !!accountName && !resolvingName && !resolveError

  useEffect(() => {
    let active = true

    const loadBanks = async () => {
      try {
        const banksList = await getRiderBanks()
        if (!active) return
        setBanks(banksList)
      } catch (err) {
        if (active) {
          setError('Could not load banks. Please refresh and try again.')
        }
      } finally {
        if (active) {
          setLoadingBanks(false)
        }
      }
    }

    loadBanks()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const resolveName = async () => {
      if (accountNumber.length !== 10 || !bankCode) {
        setAccountName('')
        setResolveError('')
        setResolvingName(false)
        return
      }

      setResolvingName(true)
      setResolveError('')
      setAccountName('')

      try {
        const result = await resolveRiderAccountName(bankCode, accountNumber)
        if (active && result?.account_name) {
          setAccountName(result.account_name)
        }
      } catch (err) {
        if (active) {
          setResolveError(err?.response?.data?.message || 'Could not verify this account number.')
          setAccountName('')
        }
      } finally {
        if (active) {
          setResolvingName(false)
        }
      }
    }

    const timer = setTimeout(resolveName, 500)

    return () => {
      active = false
      clearTimeout(timer)
    }
  }, [accountNumber, bankCode])

  useEffect(() => {
    if (!showBanks) return undefined

    const timer = setTimeout(() => bankSearchRef.current?.focus(), 50)

    const handlePointerDown = (event) => {
      if (!bankPickerRef.current?.contains(event.target)) {
        setShowBanks(false)
        setBankSearch('')
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [showBanks])

  const openBankPicker = () => {
    if (loadingBanks || banks.length === 0) return
    setBankSearch('')
    setShowBanks(true)
  }

  const selectBank = (code) => {
    setBankCode(code)
    setShowBanks(false)
    setBankSearch('')
    setSubmitError('')
  }

  const handleBankSearchChange = (value) => {
    setBankSearch(value)
    setShowBanks(true)
    if (bankCode) {
      setBankCode('')
      setAccountName('')
      setResolveError('')
    }
  }

  const handleSubmit = async () => {
    setAccountNumberTouched(true)
    if (accountNumber.length !== 10) return

    const phone = sessionStorage.getItem('rider_reg_phone') || ''
    const personal = JSON.parse(sessionStorage.getItem('rider_reg_personal') || '{}')
    const vehicle = JSON.parse(sessionStorage.getItem('rider_reg_vehicle') || '{}')
    const password = sessionStorage.getItem('rider_reg_password') || ''

    if (!personal.email) {
      setError('Please complete personal information first.')
      navigate('/dispatch/onboarding/personal')
      return
    }

    if (!password) {
      setSubmitError('Please set your password on the personal information step.')
      navigate('/dispatch/onboarding/personal')
      return
    }

    if (!isResolved || !accountName.trim()) {
      setError('Enter a valid account number to verify the account name.')
      return
    }

    const registerData = {
      first_name: personal.firstName,
      last_name: personal.lastName,
      email: personal.email,
      phone: personal.phone || phone,
      password: password,
      date_of_birth: personal.dob || null,
      vehicle_type: vehicle.vehicleType || 'motorcycle',
      vehicle_brand: vehicle.make || undefined,
      vehicle_year: vehicle.year ? parseInt(vehicle.year) : undefined,
      plate_number: vehicle.plate || 'ABC-1234',
      payout_bank_name: bankName,
      payout_bank_code: bankCode,
      payout_account_number: accountNumber,
      payout_account_name: accountName,
    }

    setLoading(true)
    setSubmitError('')
    try {
      const response = await register(registerData)
      const session = extractRiderSession(response)

      persistRiderSession(session)

      try {
        await uploadStoredRiderIdentityAssets()
      } catch (uploadErr) {
        console.error('Document upload failed', uploadErr)
      }

      sessionStorage.removeItem('rider_reg_phone')
      sessionStorage.removeItem('rider_reg_personal')
      sessionStorage.removeItem('rider_reg_vehicle')
      sessionStorage.removeItem('rider_reg_password')

      navigate('/dispatch/onboarding/success')
    } catch (err) {
      console.error(err)
      const errs = err.response?.data?.errors
      const msg = errs
        ? Object.values(errs).flat().join(' • ')
        : err.response?.data?.message || 'Registration failed. Please check your details.'
      setSubmitError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-5 pb-8">

      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5B5BFF' }}>
          Step 4 of 4
        </span>
      </div>

      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
      </div>

      <h1 className="text-[26px] font-black text-gray-900 leading-tight mb-2">
        Payment Details
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        This is where your earnings will be sent
      </p>

      <div className="flex flex-col gap-5">

        <div ref={bankPickerRef}>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Bank Name
          </label>
          <div className="relative">
            <div className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-4">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                ref={bankSearchRef}
                type="text"
                value={showBanks ? bankSearch : (bankName || bankSearch)}
                onChange={(e) => handleBankSearchChange(e.target.value)}
                onFocus={openBankPicker}
                disabled={loadingBanks || banks.length === 0}
                placeholder={loadingBanks ? 'Loading banks...' : 'Search bank name...'}
                className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => (showBanks ? setShowBanks(false) : openBankPicker())}
                disabled={loadingBanks || banks.length === 0}
                className="shrink-0 text-gray-400 disabled:opacity-60"
                aria-label="Toggle bank list"
              >
                <ChevronDown size={16} className={`transition-transform ${showBanks ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showBanks && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                <div className="max-h-56 overflow-y-auto">
                  {filteredBanks.length === 0 ? (
                    <p className="px-4 py-6 text-center text-sm text-gray-500">No banks match your search.</p>
                  ) : (
                    filteredBanks.map((bank) => (
                      <button
                        key={bank.code}
                        type="button"
                        onClick={() => selectBank(bank.code)}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-gray-50 ${bank.code === bankCode ? 'text-[#5B5BFF] font-bold bg-[#F5F5FF]' : 'text-gray-700'}`}
                      >
                        {bank.name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
            Account Number
          </label>
          <input
            type="tel"
            maxLength={10}
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value.replace(/\D/g, ''))
              setSubmitError('')
              setError('')
            }}
            onBlur={() => setAccountNumberTouched(true)}
            placeholder="0123456789"
            className={`w-full rounded-2xl px-4 py-4 text-gray-900 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              accountNumberTouched && accountNumberError
                ? 'bg-red-50 ring-2 ring-red-300'
                : 'bg-gray-100'
            }`}
          />
          {accountNumberTouched && accountNumberError && (
            <div className="flex items-center gap-1.5 mt-2">
              <AlertCircle size={13} className="text-red-500 shrink-0" />
              <p className="text-xs font-medium text-red-500">{accountNumberError}</p>
            </div>
          )}
        </div>

        {accountNumber.length === 10 && (
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Account Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={resolvingName ? 'Verifying account...' : accountName}
                readOnly
                placeholder="Account name will appear here"
                className={`w-full rounded-2xl px-4 py-4 pr-12 text-sm font-medium placeholder-gray-400 focus:outline-none ${
                  resolveError
                    ? 'bg-red-50 text-red-600'
                    : accountName
                      ? 'bg-green-50 text-gray-900'
                      : 'bg-gray-100 text-gray-500'
                }`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {resolvingName ? (
                  <Loader2 size={18} className="animate-spin text-[#5B5BFF]" />
                ) : accountName ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : null}
              </div>
            </div>
            {resolveError && (
              <div className="flex items-center gap-1.5 mt-2">
                <AlertCircle size={13} className="text-red-500 shrink-0" />
                <p className="text-xs font-medium text-red-500">{resolveError}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

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

      <div className="mt-5 rounded-2xl overflow-hidden relative flex items-end" style={{ height: '100px', background: 'linear-gradient(135deg, #1a1a3e, #0d0d1f)' }}>
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

      {submitError && (
        <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 p-4 flex gap-3 items-start">
          <XCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-600 mb-0.5">Submission failed</p>
            <p className="text-xs text-red-500 leading-relaxed">{submitError}</p>
          </div>
          <button onClick={() => setSubmitError('')} className="text-red-400 hover:text-red-600">
            <XCircle size={16} />
          </button>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || loadingBanks || !bankCode || !isResolved}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80 mt-6 disabled:opacity-40"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  )
}
