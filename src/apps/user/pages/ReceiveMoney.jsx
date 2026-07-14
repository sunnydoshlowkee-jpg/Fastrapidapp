import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, Copy } from 'lucide-react'
import { getWalletData } from '../../../services/walletService'

export default function ReceiveMoney() {
  const navigate = useNavigate()
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copyMessage, setCopyMessage] = useState('')

  const loadWallet = async () => {
    try {
      const { data } = await getWalletData()
      setWallet(data?.data ?? null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWallet()
    const interval = window.setInterval(loadWallet, 15000)
    return () => window.clearInterval(interval)
  }, [])

  const virtualAccount = wallet?.virtual_account
  const receiveTag = wallet?.receive_tag || '@rapid-user'

  const copyValue = async (value, label) => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopyMessage(`${label} copied`)
      window.setTimeout(() => setCopyMessage(''), 2000)
    } catch {
      setCopyMessage(`Could not copy ${label.toLowerCase()}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center gap-3 bg-[#FAFAFA] md:bg-transparent border-b border-transparent md:border-gray-100">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Receive Money</h1>
        </div>

        <div className="px-5 md:px-8 w-full flex flex-col items-center pt-2 md:pt-8 md:pb-8">
          
          <p className="text-[13px] md:text-[14px] text-gray-500 mb-6 text-center">
            Share your Rapid tag or transfer to your dedicated virtual account
          </p>

          <p className="text-[14px] md:text-[15px] font-semibold text-gray-700 mb-8 px-4 py-1.5 bg-gray-100 rounded-full">{receiveTag}</p>

          <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={18} className="text-[#4F46E5]" />
              <h3 className="font-bold text-gray-900 text-[14px]">Bank Transfer Details</h3>
            </div>

            {loading ? (
              <p className="text-sm text-gray-500">Loading account details…</p>
            ) : virtualAccount?.account_number ? (
              <div className="bg-white md:bg-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Bank Name</p>
                  <p className="font-semibold text-gray-900 text-[14px]">{virtualAccount?.bank_name || 'Setting up…'}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Account Number</p>
                    <p className="font-bold text-gray-900 text-[16px] md:text-[18px] tracking-wide">
                      {virtualAccount?.account_number || '—'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyValue(virtualAccount?.account_number, 'Account number')}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-[#4F46E5] hover:border-[#4F46E5] hover:shadow-sm transition-all active:scale-95"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Account Name</p>
                  <p className="font-semibold text-gray-900 text-[14px]">{virtualAccount?.account_name || '—'}</p>
                </div>
              </div>
            ) : virtualAccount?.status === 'failed' ? (
              <p className="text-sm text-red-600">{virtualAccount.error || 'Could not set up your transfer account.'}</p>
            ) : (
              <p className="text-sm text-gray-500">Your bank transfer account is being set up. This usually takes a moment.</p>
            )}

            {copyMessage ? <p className="mt-3 text-sm text-[#4F46E5] font-medium">{copyMessage}</p> : null}
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Transfers to this account are credited automatically. Your balance refreshes every few seconds.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
