import { useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Copy, Eye, EyeOff, RefreshCw, Send, Wallet as WalletIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import {
  getMerchantWalletData,
  merchantWalletTransactionLabel,
  MERCHANT_WALLET_CACHE_KEY,
  provisionMerchantVirtualAccount,
} from '../../../services/merchantWalletService'
import { getCached, setCached } from '../../../utils/requestCache'

const WALLET_TTL_MS = 60 * 1000

export default function MerchantWallet() {
  const navigate = useNavigate()
  const [showBalance, setShowBalance] = useState(true)
  const initialCached = getCached(MERCHANT_WALLET_CACHE_KEY, { ttlMs: WALLET_TTL_MS })
  const [balance, setBalance] = useState(initialCached?.data?.balance || 0)
  const [virtualAccount, setVirtualAccount] = useState(initialCached?.data?.virtual_account || null)
  const [transactions, setTransactions] = useState(initialCached?.data?.transactions || [])
  const [loading, setLoading] = useState(!initialCached?.data)
  const [copyMessage, setCopyMessage] = useState('')
  const [provisioning, setProvisioning] = useState(false)

  const applyWalletData = useCallback((payload) => {
    if (!payload) return
    setBalance(payload.balance || 0)
    setVirtualAccount(payload.virtual_account || null)
    setTransactions(payload.transactions || [])
    setCached(MERCHANT_WALLET_CACHE_KEY, payload)
  }, [])

  const fetchData = useCallback(async ({ showSpinner = false } = {}) => {
    const cached = getCached(MERCHANT_WALLET_CACHE_KEY, { ttlMs: WALLET_TTL_MS })
    if (cached?.data) {
      applyWalletData(cached.data)
      setLoading(false)
      if (cached.fresh && !showSpinner) {
        return
      }
    } else if (showSpinner) {
      setLoading(true)
    }

    try {
      const { data } = await getMerchantWalletData()
      if (data?.data) {
        applyWalletData(data.data)
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

  const retryProvision = async () => {
    setProvisioning(true)
    try {
      const data = await provisionMerchantVirtualAccount()
      if (data) applyWalletData(data)
    } catch (err) {
      setVirtualAccount((prev) => ({
        ...(prev || {}),
        status: 'failed',
        error: err?.message || 'Could not set up account.',
      }))
    } finally {
      setProvisioning(false)
    }
  }

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount || 0)

  const formatTime = (value) => {
    if (!value) return ''
    try {
      return new Date(value).toLocaleString('en-NG', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] pb-24 lg:pb-8">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 pb-3 pt-12 md:border-none md:px-8 md:pt-8">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900 md:text-[24px]">Wallet</h1>
          <p className="mt-1 text-sm text-gray-500">Order payments land here instantly</p>
        </div>
        <button
          type="button"
          onClick={() => fetchData({ showSpinner: true })}
          className="rounded-full border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition-colors hover:text-gray-900"
          aria-label="Refresh wallet"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col px-5 pt-2 md:max-w-5xl md:px-8 lg:max-w-[1200px]">
        <div className="md:grid md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="flex flex-col md:col-span-7">
            <div className="relative mb-5 overflow-hidden rounded-3xl bg-[#4342FF] p-5 text-white shadow-xl shadow-indigo-500/20 md:mb-8 md:p-8">
              <div className="mb-2 flex items-start justify-between md:mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-indigo-100 md:text-[14px]">Available Balance</span>
                  <button
                    type="button"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-indigo-100 transition-colors hover:text-white"
                  >
                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm md:h-12 md:w-12">
                  <WalletIcon size={20} />
                </div>
              </div>

              <h2 className="mb-6 text-[32px] font-bold tracking-tight md:mb-10 md:text-[48px]">
                {loading && !balance ? '…' : showBalance ? formatCurrency(balance) : '₦•••••••'}
              </h2>

              <div className="rounded-xl bg-white/15 px-3.5 py-2.5 backdrop-blur-sm md:px-5 md:py-3">
                {virtualAccount?.account_number ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[12px] font-medium text-indigo-100 md:text-[14px]">
                      {`${virtualAccount.bank_name || 'Bank'} • ${virtualAccount.account_number}`}
                    </span>
                    <button
                      type="button"
                      onClick={copyAccountNumber}
                      className="text-indigo-100 transition-colors hover:text-white"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <span className="text-[12px] font-medium text-indigo-100 md:text-[14px]">
                      {virtualAccount?.status === 'failed'
                        ? virtualAccount.error || 'Could not set up your settlement account.'
                        : 'Setting up your settlement account…'}
                    </span>
                    {virtualAccount?.status === 'failed' ? (
                      <button
                        type="button"
                        disabled={provisioning}
                        onClick={retryProvision}
                        className="self-start rounded-lg bg-white/20 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/30 disabled:opacity-60"
                      >
                        {provisioning ? 'Retrying…' : 'Try again'}
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
              {copyMessage ? <p className="mt-2 text-xs text-indigo-100">{copyMessage}</p> : null}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl md:-right-20 md:-top-20 md:h-80 md:w-80 md:blur-3xl" />
            </div>

            <div className="mb-6 grid grid-cols-2 gap-3 md:gap-5">
              <button
                type="button"
                onClick={() => navigate('/merchant/wallet/send?tab=linked')}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-[#4342FF] hover:shadow-md md:py-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4342FF] md:h-14 md:w-14 md:rounded-2xl">
                  <ArrowUpRight size={20} />
                </div>
                <span className="text-[12px] font-bold text-gray-900 md:text-[14px]">Withdraw</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/merchant/wallet/send')}
                className="flex flex-col items-center gap-2.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-[#4342FF] hover:shadow-md md:py-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4342FF] md:h-14 md:w-14 md:rounded-2xl">
                  <Send size={20} />
                </div>
                <span className="text-[12px] font-bold text-gray-900 md:text-[14px]">Send</span>
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-indigo-100/60 bg-indigo-50/50 p-5">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#4342FF]">How it works</p>
              <p className="text-sm font-medium leading-relaxed text-gray-800">
                When a customer pays for an order, your product total is credited here immediately.
                Withdraw to your linked bank, send to Rapid users, or transfer to any Nigerian bank.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 md:text-[13px] md:normal-case md:tracking-normal md:text-gray-900">
                Recent Activity
              </h3>
              <button
                type="button"
                onClick={() => navigate('/merchant/orders')}
                className="text-xs font-bold text-[#4342FF]"
              >
                View orders
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {loading && transactions.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-gray-500">Loading activity…</p>
              ) : transactions.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-gray-500">
                  No wallet activity yet. Paid orders will show up here.
                </p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {transactions.map((tx) => {
                    const isCredit = tx.type === 'credit'
                    const Icon = isCredit ? ArrowDown : ArrowUpRight
                    return (
                      <li key={tx.id} className="flex items-center gap-3 px-4 py-3.5">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            isCredit ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-gray-900">
                            {merchantWalletTransactionLabel(tx)}
                          </p>
                          <p className="text-[11px] text-gray-400">{formatTime(tx.created_at)}</p>
                        </div>
                        <p
                          className={`shrink-0 text-sm font-bold ${
                            isCredit ? 'text-green-600' : 'text-red-500'
                          }`}
                        >
                          {isCredit ? '+' : '-'}
                          {formatCurrency(tx.amount)}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
