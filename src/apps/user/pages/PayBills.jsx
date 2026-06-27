import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, HelpCircle, ChevronDown } from 'lucide-react'
import { purchaseAirtime, getDataPlans, purchaseData } from '../../../services/walletService'

const providers = [
  { id: 'mtn', name: 'MTN', color: 'bg-yellow-400', textColor: 'text-yellow-900' },
  { id: 'airtel', name: 'Airtel', color: 'bg-red-500', textColor: 'text-white' },
  { id: 'glo', name: 'Glo', color: 'bg-green-500', textColor: 'text-white' },
  { id: '9mobile', name: '9mobile', color: 'bg-green-700', textColor: 'text-white' },
]

const recentAmounts = ['₦500', '₦1,000', '₦2,000']

export default function PayBills() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('type') === 'data' ? 'data' : 'airtime'
  const [tab, setTab] = useState(initialTab)
  const [provider, setProvider] = useState('mtn')
  const [phone, setPhone] = useState('')
  const [amount, setAmount] = useState('500')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dataPlans, setDataPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [showPlanDropdown, setShowPlanDropdown] = useState(false)

  useEffect(() => {
    if (tab === 'data') {
      getDataPlans(provider).then(plans => {
        setDataPlans(plans)
        if (plans.length > 0) {
          setSelectedPlanId(plans[0].id)
          setAmount(plans[0].price.toString())
        }
      })
    }
  }, [tab, provider])

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'airtime' || type === 'data') {
      setTab(type)
    }
  }, [searchParams])

  const handlePay = async () => {
    setError('')

    if (!phone.trim()) {
      setError('Enter a recipient phone number.')
      return
    }

    setLoading(true)
    try {
      if (tab === 'data') {
        if (!selectedPlanId) throw new Error('Select a data plan.')
        await purchaseData({
          network: provider,
          phone: phone.trim(),
          planId: selectedPlanId,
        })
      } else {
        const parsedAmount = Number.parseFloat(amount)
        if (!Number.isFinite(parsedAmount) || parsedAmount < 50) {
          throw new Error('Minimum airtime amount is ₦50.')
        }
        await purchaseAirtime({
          network: provider,
          phone: phone.trim(),
          amount: parsedAmount,
        })
      }
      navigate('/app/wallet')
    } catch (err) {
      setError(err?.message || 'Could not complete purchase.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center justify-between bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
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
          
          {/* Tab Switcher */}
          <div className="flex bg-[#F0F0F5] p-1 rounded-xl mb-6 md:mb-8">
            <button 
              onClick={() => setTab('airtime')}
              className={`flex-1 py-2.5 md:py-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all ${
                tab === 'airtime' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Airtime
            </button>
            <button 
              onClick={() => setTab('data')}
              className={`flex-1 py-2.5 md:py-3 text-[12px] md:text-[13px] font-semibold rounded-lg transition-all ${
                tab === 'data' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Data Bundle
            </button>
          </div>

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

          {/* Amount */}
          <div className={`mb-4 md:mb-6 ${tab === 'data' ? 'opacity-50 pointer-events-none' : ''}`}>
            <label className="text-[12px] font-semibold text-gray-500 mb-2 block">Amount</label>
            <div className="bg-white md:bg-gray-50 rounded-xl border border-gray-200 px-4 py-3.5 md:py-4 flex items-center gap-2 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
              <span className="text-[16px] md:text-[18px] font-bold text-gray-900">₦</span>
              <input 
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                readOnly={tab === 'data'}
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
              disabled={loading}
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
