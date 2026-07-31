import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react'
import {
  purchaseAirtime,
  getDataPlans,
  purchaseData,
  verifyMeter,
  purchaseElectricity,
  getCablePlans,
  verifySmartcard,
  purchaseCable,
  getWalletData,
} from '../../../services/walletService'
import { useAuth } from '../../../context/AuthContext'
import SecurityAuthPanel from '../../../components/security/SecurityAuthPanel'

const providers = [
  { id: 'mtn', name: 'MTN', color: 'bg-yellow-400', textColor: 'text-yellow-900' },
  { id: 'airtel', name: 'Airtel', color: 'bg-red-500', textColor: 'text-white' },
  { id: 'glo', name: 'Glo', color: 'bg-green-500', textColor: 'text-white' },
  { id: '9mobile', name: '9mobile', color: 'bg-green-700', textColor: 'text-white' },
]

const elecProviders = [
  { id: 'ikeja-electric', name: 'IKEDC' },
  { id: 'eko-electric', name: 'EKEDC' },
  { id: 'abuja-electric', name: 'AEDC' },
  { id: 'ibadan-electric', name: 'IBEDC' },
  { id: 'kano-electric', name: 'KEDCO' },
  { id: 'portharcourt-electric', name: 'PHED' },
]

const cableProviders = [
  { id: 'dstv', name: 'DSTV' },
  { id: 'gotv', name: 'GOTV' },
  { id: 'startimes', name: 'Startimes' },
  { id: 'showmax', name: 'Showmax' },
]

const recentAmounts = ['₦500', '₦1,000', '₦2,000']
const VALID_TABS = ['airtime', 'data', 'electricity', 'cable']

export default function PayBills() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const transactionMethod = user?.security?.transaction_method === 'biometric'
    ? 'email'
    : (user?.security?.transaction_method || 'pin')
  const [searchParams] = useSearchParams()
  const typeParam = searchParams.get('type')
  const initialTab = VALID_TABS.includes(typeParam) ? typeParam : 'airtime'
  const [tab, setTab] = useState(initialTab)
  const [provider, setProvider] = useState('mtn')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('500')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAuth, setShowAuth] = useState(false)
  const [dataPlans, setDataPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [showPlanDropdown, setShowPlanDropdown] = useState(false)

  // Electricity State
  const [elecProvider, setElecProvider] = useState('ikeja-electric')
  const [meterNumber, setMeterNumber] = useState('')
  const [meterType, setMeterType] = useState('prepaid')
  const [meterName, setMeterName] = useState('')
  const [verifying, setVerifying] = useState(false)

  // Cable State
  const [cableProvider, setCableProvider] = useState('dstv')
  const [smartcardNumber, setSmartcardNumber] = useState('')
  const [cablePlans, setCablePlans] = useState([])
  const [selectedCablePlanId, setSelectedCablePlanId] = useState('')
  const [showCablePlanDropdown, setShowCablePlanDropdown] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [successResult, setSuccessResult] = useState(null)
  const [billsEnabled, setBillsEnabled] = useState(true)

  useEffect(() => {
    let cancelled = false
    getWalletData()
      .then(({ data }) => {
        if (!cancelled) setBillsEnabled(data?.data?.bills_enabled !== false)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (tab === 'data') {
      setError('')
      getDataPlans(provider).then(plans => {
        setDataPlans(plans)
        if (plans.length > 0) {
          setSelectedPlanId(plans[0].id)
          setAmount(String(plans[0].price))
        } else {
          setSelectedPlanId('')
          setAmount('')
        }
      }).catch(err => setError(err.message))
    }
  }, [tab, provider])

  useEffect(() => {
    if (tab === 'cable') {
      setError('')
      setCustomerName('')
      getCablePlans(cableProvider).then(plans => {
        setCablePlans(plans)
        if (plans.length > 0) {
          setSelectedCablePlanId(plans[0].id)
          setAmount(String(plans[0].price))
        } else {
          setSelectedCablePlanId('')
          setAmount('')
        }
      }).catch(err => setError(err.message))
    }
  }, [tab, cableProvider])

  useEffect(() => {
    const type = searchParams.get('type')
    if (VALID_TABS.includes(type)) {
      setTab(type)
    }
  }, [searchParams])

  useEffect(() => {
    setMeterName('')
  }, [meterNumber, elecProvider, meterType])

  useEffect(() => {
    setCustomerName('')
  }, [smartcardNumber, cableProvider])

  const handleVerify = async () => {
    if (!meterNumber.trim()) {
      setError('Enter a valid meter number')
      return
    }
    setVerifying(true)
    setError('')
    try {
      const details = await verifyMeter({
        serviceId: elecProvider,
        meterNumber: meterNumber.trim(),
        type: meterType
      })
      if (details?.name) {
        setMeterName(details.name)
      } else {
        throw new Error('Meter verification returned no name')
      }
    } catch (err) {
      setError(err?.message || 'Verification failed. Check meter number.')
    } finally {
      setVerifying(false)
    }
  }

  const handleVerifySmartcard = async () => {
    if (!smartcardNumber.trim()) {
      setError('Enter a valid smartcard / IUC number')
      return
    }
    setVerifying(true)
    setError('')
    try {
      const details = await verifySmartcard({
        service: cableProvider,
        smartcardNumber: smartcardNumber.trim(),
      })
      if (details?.name) {
        setCustomerName(details.name)
      } else {
        throw new Error('Smartcard verification returned no name')
      }
    } catch (err) {
      setError(err?.message || 'Verification failed. Check smartcard number.')
    } finally {
      setVerifying(false)
    }
  }

  const handlePay = async () => {
    setError('')

    try {
      if (tab === 'electricity') {
        if (!meterName) {
          throw new Error('Please verify your meter number first.')
        }
        const parsedAmount = Number.parseFloat(amount)
        if (!Number.isFinite(parsedAmount) || parsedAmount < 100) {
          throw new Error('Minimum electricity amount is ₦100.')
        }
        if (!phone.trim()) {
          throw new Error('Enter a contact phone number.')
        }
      } else if (tab === 'cable') {
        if (!customerName) {
          throw new Error('Please verify your smartcard number first.')
        }
        if (!selectedCablePlanId) throw new Error('Select a bouquet / plan.')
        if (!phone.trim()) throw new Error('Enter a contact phone number.')
        const parsedAmount = Number.parseFloat(amount)
        if (!Number.isFinite(parsedAmount) || parsedAmount < 1) {
          throw new Error('Enter a valid amount.')
        }
      } else if (tab === 'data') {
        if (!phone.trim()) throw new Error('Enter a recipient phone number.')
        if (!selectedPlanId) throw new Error('Select a data plan.')
      } else {
        if (!phone.trim()) throw new Error('Enter a recipient phone number.')
        const parsedAmount = Number.parseFloat(amount)
        if (!Number.isFinite(parsedAmount) || parsedAmount < 50) {
          throw new Error('Minimum airtime amount is ₦50.')
        }
      }
      setShowAuth(true)
    } catch (err) {
      setError(err?.message || 'Could not continue.')
    }
  }

  const completePurchase = async (authPayload = {}) => {
    setError('')
    setLoading(true)
    try {
      let result
      if (tab === 'electricity') {
        result = await purchaseElectricity({
          serviceId: elecProvider,
          meterNumber: meterNumber.trim(),
          type: meterType,
          amount: Number.parseFloat(amount),
          phone: phone.trim(),
          pin: authPayload.pin,
          auth_code: authPayload.auth_code,
        })
      } else if (tab === 'cable') {
        result = await purchaseCable({
          service: cableProvider,
          smartcardNumber: smartcardNumber.trim(),
          planId: selectedCablePlanId,
          phone: phone.trim(),
          amount: Number.parseFloat(amount),
          pin: authPayload.pin,
          auth_code: authPayload.auth_code,
        })
      } else if (tab === 'data') {
        result = await purchaseData({
          network: provider,
          phone: phone.trim(),
          planId: selectedPlanId,
          amount: Number.parseFloat(amount) || undefined,
          pin: authPayload.pin,
          auth_code: authPayload.auth_code,
        })
      } else {
        result = await purchaseAirtime({
          network: provider,
          phone: phone.trim(),
          amount: Number.parseFloat(amount),
          pin: authPayload.pin,
          auth_code: authPayload.auth_code,
        })
      }
      setShowAuth(false)
      setSuccessResult({
        tab,
        token: result?.data?.token || result?.token || null,
        message: result?.message || 'Purchase successful',
      })
    } catch (err) {
      setError(err?.message || 'Could not complete purchase.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const switchTab = (next) => {
    setTab(next)
    setError('')
    if (next === 'electricity' || next === 'cable') {
      setAmount('')
    } else if (next === 'airtime') {
      setAmount('500')
    }
  }

  const payDisabled =
    loading ||
    !billsEnabled ||
    (tab === 'electricity' && !meterName) ||
    (tab === 'cable' && !customerName)

  if (successResult) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial px-5 md:px-8 pt-app md:pt-10 pb-10">
          <div className="flex flex-col items-center text-center pt-10">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Payment successful</h1>
            <p className="text-[14px] text-gray-500 mb-6">{successResult.message}</p>
            {successResult.token ? (
              <div className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 mb-6">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Electricity token</p>
                <p className="text-[20px] font-bold text-gray-900 tracking-wide break-all mb-4">{successResult.token}</p>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(String(successResult.token))
                    } catch {
                      /* ignore */
                    }
                  }}
                  className="w-full border border-gray-200 rounded-xl py-3 font-bold text-[14px] text-gray-800 hover:bg-white"
                >
                  Copy token
                </button>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => navigate('/app/wallet')}
              className="w-full bg-[#4F46E5] text-white py-3.5 rounded-xl font-bold text-[15px]"
            >
              Back to wallet
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showAuth) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
        <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
          <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
            <button
              type="button"
              onClick={() => { setShowAuth(false); setError('') }}
              className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Authorize Payment</h1>
          </div>
          <SecurityAuthPanel
            purpose="transaction"
            method={transactionMethod}
            title="Authorize Payment"
            subtitle={`Confirm ₦${Number.parseFloat(amount || '0').toLocaleString()} bill payment`}
            hasExistingPin
            onCancel={() => { setShowAuth(false); setError('') }}
            onVerified={completePurchase}
          />
          {error ? <p className="px-5 pb-6 text-sm text-red-600 text-center">{error}</p> : null}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 md:pb-6 flex items-center justify-between bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Pay Bills</h1>
          </div>
          <button className="text-gray-400 hover:text-[#4F46E5] transition-colors md:bg-gray-50 md:w-10 md:h-10 md:rounded-full md:flex md:items-center md:justify-center">
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="px-5 md:px-8 w-full flex-1 flex flex-col pt-2 md:pt-6 md:pb-8">
          {!billsEnabled ? (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-800">
              Bill payments are temporarily unavailable. VTpass credentials are not configured on the server yet.
            </div>
          ) : null}
          
          {/* Tab Switcher */}
          <div className="flex bg-[#F0F0F5] p-1 rounded-xl mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
            {['airtime', 'data', 'cable', 'electricity'].map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex-1 py-2.5 md:py-3 px-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all whitespace-nowrap capitalize ${
                  tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t === 'cable' ? 'Cable TV' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {(tab === 'airtime' || tab === 'data') && (
            <>
              {/* Select Provider */}
              <div className="mb-6 md:mb-8">
                <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-3 block">Select Provider</label>
                <div className="flex gap-4">
                  {providers.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => setProvider(p.id)}
                      className="flex flex-col items-center gap-1.5 cursor-pointer group"
                    >
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${p.color} flex items-center justify-center ${p.textColor} text-[10px] md:text-[12px] font-bold ring-2 transition-all group-hover:scale-105 ${
                        provider === p.id ? 'ring-[#4F46E5] ring-offset-2' : 'ring-transparent'
                      }`}>
                        {p.name.substring(0, 3).toUpperCase()}
                      </div>
                      <span className={`text-[10px] md:text-[11px] font-semibold ${provider === p.id ? 'text-gray-900' : 'text-gray-500'}`}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-5 md:mb-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Recipient Phone Number</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 000 0000"
                    className="w-full text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Data Plan (shown for data tab) */}
              {tab === 'data' && (
                <div className="mb-5 md:mb-6 relative">
                  <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Select Data Plan</label>
                  <div 
                    onClick={() => setShowPlanDropdown(!showPlanDropdown)}
                    className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 flex items-center justify-between cursor-pointer hover:border-[#4F46E5] transition-colors"
                  >
                    <span className="text-[14px] md:text-[15px] text-gray-900 font-medium">
                      {dataPlans.find(p => p.id === selectedPlanId)?.name || 'Select a plan'}
                    </span>
                    <ChevronDown size={18} className="text-gray-400" />
                  </div>
                  
                  {showPlanDropdown && (
                    <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-10 max-h-[200px] overflow-y-auto">
                      {dataPlans.map(plan => (
                        <div 
                          key={plan.id}
                          onClick={() => {
                            setSelectedPlanId(plan.id)
                            setAmount(plan.price.toString())
                            setShowPlanDropdown(false)
                          }}
                          className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex justify-between items-center"
                        >
                          <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                          <span className="text-sm font-bold text-[#4F46E5]">₦{plan.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {tab === 'cable' && (
            <>
              <div className="mb-5 md:mb-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Cable Provider</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <select
                    value={cableProvider}
                    onChange={(e) => setCableProvider(e.target.value)}
                    className="w-full text-[14px] md:text-[15px] font-medium outline-none bg-transparent"
                  >
                    {cableProviders.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5 md:mb-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Smartcard / IUC Number</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <input
                    type="text"
                    value={smartcardNumber}
                    onChange={(e) => setSmartcardNumber(e.target.value)}
                    placeholder="1212121212"
                    className="w-full text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="mb-5 md:mb-6 relative">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Select Bouquet</label>
                <div
                  onClick={() => setShowCablePlanDropdown(!showCablePlanDropdown)}
                  className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 flex items-center justify-between cursor-pointer hover:border-[#4F46E5] transition-colors"
                >
                  <span className="text-[14px] md:text-[15px] text-gray-900 font-medium">
                    {cablePlans.find(p => p.id === selectedCablePlanId)?.name || 'Select a bouquet'}
                  </span>
                  <ChevronDown size={18} className="text-gray-400" />
                </div>

                {showCablePlanDropdown && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-100 z-10 max-h-[200px] overflow-y-auto">
                    {cablePlans.map(plan => (
                      <div
                        key={plan.id}
                        onClick={() => {
                          setSelectedCablePlanId(plan.id)
                          setAmount(String(plan.price))
                          setShowCablePlanDropdown(false)
                        }}
                        className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex justify-between items-center"
                      >
                        <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                        <span className="text-sm font-bold text-[#4F46E5]">₦{Number(plan.price).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-5 md:mb-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Contact Phone Number</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 000 0000"
                    className="w-full text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {!customerName ? (
                <button
                  type="button"
                  onClick={handleVerifySmartcard}
                  disabled={verifying}
                  className="mb-5 bg-indigo-50 text-indigo-700 font-bold rounded-xl py-3 w-full hover:bg-indigo-100 transition-colors disabled:opacity-50"
                >
                  {verifying ? 'Verifying...' : 'Verify Smartcard'}
                </button>
              ) : (
                <div className="mb-5 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">Smartcard Verified</p>
                    <p className="text-sm font-semibold text-green-900">{customerName}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {tab === 'electricity' && (
            <>
              <div className="mb-5 md:mb-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Distribution Company</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <select 
                    value={elecProvider}
                    onChange={(e) => setElecProvider(e.target.value)}
                    className="w-full text-[14px] md:text-[15px] font-medium outline-none bg-transparent"
                  >
                    {elecProviders.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mb-5 md:mb-6">
                <div className="flex-1">
                  <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Meter Type</label>
                  <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                    <select 
                      value={meterType}
                      onChange={(e) => setMeterType(e.target.value)}
                      className="w-full text-[14px] md:text-[15px] font-medium outline-none bg-transparent"
                    >
                      <option value="prepaid">Prepaid</option>
                      <option value="postpaid">Postpaid</option>
                    </select>
                  </div>
                </div>
                <div className="flex-[2]">
                  <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Meter Number</label>
                  <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                    <input 
                      type="text"
                      value={meterNumber}
                      onChange={(e) => setMeterNumber(e.target.value)}
                      placeholder="12345678901"
                      className="w-full text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5 md:mb-6">
                <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Contact Phone Number</label>
                <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0803 000 0000"
                    className="w-full text-[14px] md:text-[15px] outline-none bg-transparent placeholder-gray-400"
                  />
                </div>
              </div>

              {!meterName ? (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifying}
                  className="mb-5 bg-indigo-50 text-indigo-700 font-bold rounded-xl py-3 w-full hover:bg-indigo-100 transition-colors disabled:opacity-50"
                >
                  {verifying ? 'Verifying...' : 'Verify Meter'}
                </button>
              ) : (
                <div className="mb-5 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="text-green-600 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">Meter Verified</p>
                    <p className="text-sm font-semibold text-green-900">{meterName}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Amount */}
          <div className={`mb-4 md:mb-6 ${tab === 'data' || tab === 'cable' ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Amount</label>
            <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 flex items-center gap-2 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
              <span className="text-[16px] md:text-[18px] font-bold text-gray-900">₦</span>
              <input 
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                readOnly={tab === 'data' || tab === 'cable'}
                className="flex-1 text-[16px] md:text-[18px] font-semibold text-gray-900 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Recent Amounts */}
          {tab === 'airtime' && (
            <div className="mb-8 md:mb-10">
              <label className="text-[11px] font-semibold text-gray-400 mb-2 block">Recent Amounts</label>
              <div className="flex gap-2">
                {recentAmounts.map(a => (
                  <button 
                    key={a}
                    onClick={() => setAmount(a.replace(/[₦,]/g, ''))}
                    className="px-4 py-2 bg-white md:bg-gray-50 rounded-full border border-gray-200 text-[12px] md:text-[13px] font-semibold text-gray-700 hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors shadow-sm md:shadow-none"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error ? <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

          {/* Pay Button */}
          <div className="mt-auto pb-6 md:pb-0">
            <button
              type="button"
              onClick={handlePay}
              disabled={payDisabled}
              className="w-full bg-[#4F46E5] text-white py-4 md:py-4.5 rounded-xl font-bold text-[15px] md:text-[16px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Processing…' : `Pay ₦${parseInt(amount || 0, 10).toLocaleString()}`}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
