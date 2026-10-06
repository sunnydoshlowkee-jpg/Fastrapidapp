import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, CreditCard, Hash, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getKycStatus, isWalletAccessible } from '../../services/kycService'

export default function WalletGate({ children }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    checkAccess()
  }, [user])

  async function checkAccess() {
    if (!user) {
      setChecking(false)
      return
    }

    if (isWalletAccessible(user)) {
      setHasAccess(true)
      setChecking(false)
      return
    }

    try {
      const status = await getKycStatus()
      if (status?.current_tier?.level >= 1) {
        setHasAccess(true)
      }
    } catch {
      setHasAccess(false)
    } finally {
      setChecking(false)
    }
  }

  if (checking) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#4F46E5] mb-3" />
        <p className="text-sm text-gray-400">Checking wallet access...</p>
      </div>
    )
  }

  if (hasAccess) {
    return children
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-5">
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
        <Shield size={36} className="text-[#4F46E5]" />
      </div>

      <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
        Wallet Verification Required
      </h2>
      <p className="text-sm text-gray-500 text-center mb-8 max-w-xs leading-relaxed">
        To access your wallet, fund your account, and make transfers, please verify your identity first.
        This is a one-time process.
      </p>

      <div className="w-full max-w-sm space-y-3 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] flex-shrink-0">
            <CreditCard size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">BVN Verification</p>
            <p className="text-xs text-gray-400">Verify with your 11-digit BVN</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] flex-shrink-0">
            <Hash size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">NIN Verification</p>
            <p className="text-xs text-gray-400">Verify with your 11-digit NIN</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/app/kyc/verify')}
        className="w-full max-w-sm bg-[#4F46E5] text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        Verify Identity
        <ArrowRight size={18} />
      </button>

      <button
        onClick={() => navigate('/app')}
        className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        Go back home
      </button>
    </div>
  )
}
