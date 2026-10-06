import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, CreditCard, Hash, CheckCircle2, AlertCircle, ArrowLeft, Loader2, Lock } from 'lucide-react'
import { getKycStatus, verifyBvn, verifyNin } from '../../../services/kycService'
import { useAuth } from '../../../context/AuthContext'
import BrandedLoader from '../../../components/ui/BrandedLoader'

export default function KycVerification() {
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()
  const [step, setStep] = useState('loading')
  const [method, setMethod] = useState(null)
  const [identifier, setIdentifier] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [kycStatus, setKycStatus] = useState(null)

  useEffect(() => {
    loadKycStatus()
  }, [])

  async function loadKycStatus() {
    try {
      const status = await getKycStatus()
      setKycStatus(status)
      if (status?.current_tier?.level >= 1) {
        setStep('already_verified')
      } else {
        setStep('choose')
      }
    } catch {
      setStep('choose')
    }
  }

  function selectMethod(m) {
    setMethod(m)
    setIdentifier('')
    setError('')
    setStep('input')
  }

  function formatIdentifier(value, type) {
    const digits = value.replace(/\D/g, '')
    if (type === 'bvn') return digits.slice(0, 11)
    if (type === 'nin') return digits.slice(0, 11)
    return digits
  }

  async function handleSubmit() {
    if (identifier.length !== 11) {
      setError(`${method.toUpperCase()} must be exactly 11 digits.`)
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = method === 'bvn'
        ? await verifyBvn(identifier)
        : await verifyNin(identifier)

      if (result?.success) {
        setSuccess(true)
        setStep('success')
        await refreshUser({ background: true })
      } else {
        setError(result?.message || `Verification failed. Please try again.`)
      }
    } catch (err) {
      setError(err?.message || 'Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function goToWallet() {
    navigate('/app/wallet', { replace: true })
  }

  if (step === 'loading') {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <BrandedLoader size="lg" />
      </div>
    )
  }

  if (step === 'already_verified') {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8">
        <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 border-b md:border-none border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900">Identity Verification</h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Already Verified</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Your identity has been verified. You have full access to your wallet.
          </p>
          <button
            onClick={goToWallet}
            className="bg-[#4F46E5] text-white font-semibold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Go to Wallet
          </button>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8">
        <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 border-b md:border-none border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900">Identity Verification</h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-5">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Verification Successful</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Your identity has been verified. You now have access to your wallet and all financial features.
          </p>
          <button
            onClick={goToWallet}
            className="bg-[#4F46E5] text-white font-semibold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Continue to Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8">
      {/* Header */}
      <div className="px-5 md:px-8 pt-app md:pt-8 pb-3 border-b md:border-none border-gray-100">
        <div className="flex items-center gap-3">
          <button onClick={() => step === 'input' ? setStep('choose') : navigate(-1)} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-[20px] md:text-[24px] font-bold text-gray-900">Verify Your Identity</h1>
        </div>
      </div>

      <div className="px-5 md:px-8 pt-6 w-full max-w-md mx-auto">

        {step === 'choose' && (
          <>
            {/* Info Card */}
            <div className="bg-indigo-50/60 rounded-2xl p-5 border border-indigo-100/50 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4F46E5] flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Why verify your identity?</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    To use wallet features like sending, receiving, and managing money, we need to verify your identity
                    in line with regulatory requirements. This is a one-time process.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-3">
              Choose verification method
            </h2>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => selectMethod('bvn')}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-[#4F46E5] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                  <CreditCard size={22} />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">Bank Verification Number (BVN)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Verify using your 11-digit BVN</p>
                </div>
                <div className="text-gray-300">&rsaquo;</div>
              </button>

              <button
                onClick={() => selectMethod('nin')}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-[#4F46E5] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
                  <Hash size={22} />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-gray-900 text-sm">National Identification Number (NIN)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Verify using your 11-digit NIN</p>
                </div>
                <div className="text-gray-300">&rsaquo;</div>
              </button>
            </div>

            {/* Consent Notice */}
            <div className="mt-6 flex items-start gap-2">
              <Lock size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-gray-400 leading-relaxed">
                By continuing, you consent to FastRapid using your identity information for verification
                and compliance purposes in accordance with our Privacy Policy and applicable regulations.
              </p>
            </div>
          </>
        )}

        {step === 'input' && (
          <>
            <div className="mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5] mb-3">
                {method === 'bvn' ? <CreditCard size={22} /> : <Hash size={22} />}
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Enter your {method === 'bvn' ? 'BVN' : 'NIN'}
              </h2>
              <p className="text-sm text-gray-500">
                Enter your 11-digit {method === 'bvn' ? 'Bank Verification Number' : 'National Identification Number'}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="mb-4">
              <input
                type="text"
                inputMode="numeric"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(formatIdentifier(e.target.value, method))
                  setError('')
                }}
                placeholder={method === 'bvn' ? 'e.g. 22345678901' : 'e.g. 12345678901'}
                maxLength={11}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-lg font-mono tracking-widest text-center text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-all"
                disabled={loading}
              />
              <p className="text-xs text-gray-400 mt-2 text-center">
                {identifier.length}/11 digits
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || identifier.length !== 11}
              className="w-full bg-[#4F46E5] text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Verify {method === 'bvn' ? 'BVN' : 'NIN'}
                </>
              )}
            </button>

            <div className="mt-4 flex items-start gap-2">
              <Lock size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Your {method === 'bvn' ? 'BVN' : 'NIN'} is encrypted and securely transmitted for verification.
                It is never stored in plain text.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
