import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Send, ArrowDownLeft, PlusSquare, Phone, Globe, Receipt, Zap, ArrowDown, ArrowUpRight, Copy, Eye, EyeOff } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { getWalletData, provisionVirtualAccount, walletTransactionLabel, WALLET_CACHE_KEY } from '../../../services/walletService'
import { getCached, setCached } from '../../../utils/requestCache'
import BrandedLoader from '../../../components/ui/BrandedLoader'

const WALLET_TTL_MS = 60 * 1000

export default function Wallet() {
  const navigate = useNavigate()
  const [showBalance, setShowBalance] = useState(true)
  const initialCached = getCached(WALLET_CACHE_KEY, { ttlMs: WALLET_TTL_MS })
  const [balance, setBalance] = useState(initialCached?.data?.balance || 0)
  const [virtualAccount, setVirtualAccount] = useState(initialCached?.data?.virtual_account || null)
  const [transactions, setTransactions] = useState(initialCached?.data?.transactions || [])
  const [loading, setLoading] = useState(!initialCached?.data)
  const [copyMessage, setCopyMessage] = useState('')
  const [vaRetrying, setVaRetrying] = useState(false)

  const applyWalletData = useCallback((payload) => {
    if (!payload) return
    setBalance(payload.balance || 0)
    setVirtualAccount(payload.virtual_account || null)
    setTransactions(payload.transactions || [])
    setCached(WALLET_CACHE_KEY, payload)
  }, [])

  const fetchData = useCallback(async ({ showSpinner = false } = {}) => {
    const cached = getCached(WALLET_CACHE_KEY, { ttlMs: WALLET_TTL_MS })
    if (cached?.data) {
      applyWalletData(cached.data)
      setLoading(false)
      if (cached.fresh && !showSpinner) {
        return cached.data.virtual_account
      }
    } else if (showSpinner) {
      setLoading(true)
    }

    try {
      const { data } = await getWalletData()
      if (data?.data) {
        applyWalletData(data.data)
        return data.data.virtual_account
      }
    } catch (err) {
      setVirtualAccount((prev) => ({
        ...(prev || {}),
        status: 'failed',
        error: err?.message || 'Could not load wallet.',
      }))
    } finally {
      setLoading(false)
    }
  }, [applyWalletData])

  useEffect(() => {
    fetchData({ showSpinner: !initialCached?.data })
    const interval = window.setInterval(() => fetchData(), 15000)
    return () => window.clearInterval(interval)
  }, [fetchData, initialCached?.data])

  const copyAccountNumber = async () => {
    if (!virtualAccount?.account_number) return
    try {
      await navigator.clipboard.writeText(virtualAccount.account_number)
      setCopyMessage('Account number copied')
      window.setTimeout(() => setCopyMessage(''), 2000)
    } catch {
      setCopyMessage('Could not copy account number')
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const getIconData = (type) => {
    if (type === 'credit') return { icon: ArrowDown, iconBg: 'bg-green-50', iconColor: 'text-green-500' }
    return { icon: ArrowUpRight, iconBg: 'bg-red-50', iconColor: 'text-red-500' }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8">
      
      {/* Header */}
      <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 flex items-center justify-between border-b md:border-none border-gray-100">
        <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900">Wallet</h1>
        <button onClick={() => navigate('/app/cart')} className="text-gray-600 hover:text-gray-900 transition-colors bg-white border border-gray-200 p-2 rounded-full shadow-sm">
          <ShoppingCart size={20} />
        </button>
      </div>

      <div className="px-5 md:px-8 w-full max-w-md md:max-w-5xl lg:max-w-[1200px] mx-auto flex flex-col pt-2">
        
        <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-12">
          
          {/* Left Column (Desktop) - Balance & Actions */}
          <div className="md:col-span-7 flex flex-col">
            
            {/* Balance Card */}
            <div className="bg-[#4F46E5] rounded-3xl p-5 md:p-8 text-white mb-5 md:mb-8 relative overflow-hidden shadow-xl shadow-indigo-500/20">
              <div className="flex justify-between items-start mb-2 md:mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-200 text-[12px] md:text-[14px] font-medium">Available Balance</span>
                  <button onClick={() => setShowBalance(!showBalance)} className="text-indigo-200 hover:text-white transition-colors">
                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
              <h2 className="text-[32px] md:text-[48px] font-bold mb-6 md:mb-10 tracking-tight">
                {showBalance ? formatCurrency(balance) : '₦•••••••'}
              </h2>
              <div className="bg-white/15 rounded-xl px-3.5 md:px-5 py-2.5 md:py-3 backdrop-blur-sm">
                {virtualAccount?.account_number ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] md:text-[14px] font-medium text-indigo-100">
                      {`${virtualAccount.bank_name || 'Bank'} • ${virtualAccount.account_number}`}
                    </span>
                    <button type="button" onClick={copyAccountNumber} className="text-indigo-200 hover:text-white transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] md:text-[14px] font-medium text-indigo-100">
                      {virtualAccount?.status === 'failed'
                        ? (virtualAccount.error || 'Could not set up your account.')
                        : 'Setting up your transfer account…'}
                    </span>
                    {virtualAccount?.status === 'failed' ? (
                      <button
                        type="button"
                        disabled={vaRetrying}
                        onClick={async () => {
                          try {
                            setVaRetrying(true)
                            const data = await provisionVirtualAccount()
                            applyWalletData(data?.data || data)
                          } catch (err) {
                            setCopyMessage(err?.message || 'Could not retry account setup.')
                          } finally {
                            setVaRetrying(false)
                          }
                        }}
                        className="shrink-0 text-[11px] font-bold uppercase tracking-wide text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg disabled:opacity-60"
                      >
                        {vaRetrying ? 'Retrying…' : 'Retry'}
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
              {copyMessage ? <p className="mt-2 text-xs text-indigo-100">{copyMessage}</p> : null}
              {/* Decorative blob */}
              <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-40 h-40 md:w-80 md:h-80 bg-white/10 rounded-full blur-2xl md:blur-3xl" />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mb-7 md:mb-8">
              <button 
                onClick={() => navigate('/app/wallet/send')}
                className="bg-white rounded-2xl p-4 md:py-6 flex flex-col items-center gap-2.5 md:gap-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#4F46E5] transition-all group"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#EEF2FF] group-hover:bg-[#4F46E5] flex items-center justify-center text-[#4F46E5] group-hover:text-white transition-colors">
                  <Send size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[12px] md:text-[14px] font-bold text-gray-900">Send</span>
              </button>
              <button 
                onClick={() => navigate('/app/wallet/receive')}
                className="bg-white rounded-2xl p-4 md:py-6 flex flex-col items-center gap-2.5 md:gap-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-500 transition-all group"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white transition-colors">
                  <ArrowDownLeft size={22} className="md:w-7 md:h-7" />
                </div>
                <span className="text-[12px] md:text-[14px] font-bold text-gray-900">Receive</span>
              </button>
              <button 
                onClick={() => navigate('/app/wallet/fund')}
                className="bg-white rounded-2xl p-4 md:py-6 flex flex-col items-center gap-2.5 md:gap-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#4F46E5] transition-all group"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-[#EEF2FF] group-hover:bg-[#4F46E5] flex items-center justify-center text-[#4F46E5] group-hover:text-white transition-colors">
                  <PlusSquare size={20} className="md:w-6 md:h-6" />
                </div>
                <span className="text-[12px] md:text-[14px] font-bold text-gray-900">Fund</span>
              </button>
            </div>

            {/* Desktop Only Pro Tip */}
            <div className="hidden md:block bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 mb-8">
              <p className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-widest mb-2">Pro Tip</p>
              <p className="font-bold text-gray-900 text-sm leading-relaxed mb-4">Refer a friend and earn ₦500 on their first fund.</p>
              <button 
                onClick={() => navigate('/app/profile/refer-earn')}
                className="w-full py-3 rounded-xl border border-indigo-200 text-[#4F46E5] font-bold text-sm hover:bg-indigo-100 transition-colors"
              >
                Share Link
              </button>
            </div>

          </div>

          {/* Right Column (Desktop) - Utilities & History */}
          <div className="md:col-span-5 flex flex-col">
            
            {/* Utility Services */}
            <div className="mb-7 md:mb-10">
              <h3 className="text-[11px] md:text-[13px] font-bold text-gray-400 md:text-gray-900 tracking-widest uppercase md:normal-case md:tracking-normal mb-3 md:mb-4 pl-0.5 md:pl-0">
                <span className="md:hidden">Utility Services</span>
                <span className="hidden md:inline">Quick Utilities</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button onClick={() => navigate('/app/wallet/pay-bills?type=airtime')} className="bg-white rounded-2xl p-4 md:py-6 shadow-sm border border-gray-100 flex md:flex-col items-center md:justify-center gap-3 md:gap-4 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EEF2FF] group-hover:bg-indigo-100 flex items-center justify-center text-[#4F46E5] shrink-0 transition-colors">
                    <Phone size={18} className="md:w-5 md:h-5" />
                  </div>
                  <span className="font-semibold text-gray-900 text-[13px] md:text-[14px]">Airtime</span>
                </button>
                <button onClick={() => navigate('/app/wallet/pay-bills?type=data')} className="bg-white rounded-2xl p-4 md:py-6 shadow-sm border border-gray-100 flex md:flex-col items-center md:justify-center gap-3 md:gap-4 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EEF2FF] group-hover:bg-indigo-100 flex items-center justify-center text-[#4F46E5] shrink-0 transition-colors">
                    <Globe size={18} className="md:w-5 md:h-5" />
                  </div>
                  <span className="font-semibold text-gray-900 text-[13px] md:text-[14px] leading-tight">Data Bundles</span>
                </button>
                <button 
                  onClick={() => navigate('/app/wallet/pay-bills?type=cable')}
                  className="bg-white rounded-2xl p-4 md:py-6 shadow-sm border border-gray-100 flex md:flex-col items-center md:justify-center gap-3 md:gap-4 hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EEF2FF] group-hover:bg-indigo-100 flex items-center justify-center text-[#4F46E5] shrink-0 transition-colors">
                    <Receipt size={18} className="md:w-5 md:h-5" />
                  </div>
                  <span className="font-semibold text-gray-900 text-[13px] md:text-[14px]">Pay Bills</span>
                </button>
                <button onClick={() => navigate('/app/wallet/pay-bills?type=electricity')} className="bg-white rounded-2xl p-4 md:py-6 shadow-sm border border-gray-100 flex md:flex-col items-center md:justify-center gap-3 md:gap-4 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#EEF2FF] group-hover:bg-indigo-100 flex items-center justify-center text-[#4F46E5] shrink-0 transition-colors">
                    <Zap size={18} className="md:w-5 md:h-5" />
                  </div>
                  <span className="font-semibold text-gray-900 text-[13px] md:text-[14px]">Electricity</span>
                </button>
              </div>
            </div>

            {/* Transaction History */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 md:mb-4 pl-0.5 md:pl-0">
                <h3 className="text-[11px] md:text-[13px] font-bold text-gray-400 md:text-gray-900 tracking-widest uppercase md:normal-case md:tracking-normal">
                  <span className="md:hidden">Transaction History</span>
                  <span className="hidden md:inline">Recent Activity</span>
                </h3>
                <button onClick={() => navigate('/app/wallet/transactions')} className="text-[#4F46E5] text-[12px] font-semibold hover:underline">View All</button>
              </div>
              
              <div className="flex flex-col gap-3 md:gap-2 md:bg-white md:p-2 md:rounded-3xl md:border md:border-gray-100 md:shadow-sm min-h-[200px]">
                {loading ? (
                  <BrandedLoader size="md" />
                ) : transactions.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm">No recent activity.</div>
                ) : (
                  transactions.map((tx) => {
                    const { icon: TxIcon, iconBg, iconColor } = getIconData(tx.type)
                    return (
                      <button 
                        key={tx.id}
                        onClick={() => navigate(`/app/wallet/receipt/${tx.id}`, { state: { tx } })}
                        className="bg-white md:bg-transparent rounded-2xl md:rounded-xl p-4 md:p-3 shadow-sm md:shadow-none border border-gray-100 md:border-none md:hover:bg-gray-50 flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full ${iconBg} flex items-center justify-center ${iconColor} shrink-0`}>
                            <TxIcon size={18} className="md:w-5 md:h-5" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-900 text-[13px] md:text-[14px] mb-0.5">{walletTransactionLabel(tx)}</h4>
                            <p className="text-[11px] md:text-[12px] text-gray-500 font-medium">{new Date(tx.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`block font-bold text-[13px] md:text-[14px] mb-0.5 ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                            {tx.type === 'credit' ? '+ ' : '- '} {formatCurrency(tx.amount)}
                          </span>
                          <span className={`md:hidden text-[10px] font-bold uppercase tracking-wider ${tx.type === 'credit' ? 'text-green-500' : 'text-gray-400'}`}>{tx.status}</span>
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
