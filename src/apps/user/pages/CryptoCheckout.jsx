import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, CheckCircle2, AlertCircle, Clock, Bitcoin } from 'lucide-react'
import { useCart } from '../../../context/CartContext'

const BTC_EXCHANGE_RATE = 110500000 // Fake rate for 1 BTC to NGN

export default function CryptoCheckout() {
  const navigate = useNavigate()
  const { total, clear } = useCart()
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 mins
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('pending') // pending, confirming, success

  const btcAmount = (total / BTC_EXCHANGE_RATE).toFixed(8)
  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  useEffect(() => {
    if (total === 0) navigate('/app/cart')

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate network confirmation after 10 seconds
    const confirmTimer = setTimeout(() => {
      setStatus('confirming')
    }, 10000)

    // Simulate success after 15 seconds
    const successTimer = setTimeout(() => {
      setStatus('success')
      clear()
      setTimeout(() => navigate('/app/order-success/crypto-req-123'), 2000)
    }, 15000)

    return () => {
      clearInterval(timer)
      clearTimeout(confirmTimer)
      clearTimeout(successTimer)
    }
  }, [total, navigate, clear])

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-5 pt-app pb-4 flex items-center justify-between sticky top-0 z-50 bg-[#111]/90 backdrop-blur-md border-b border-gray-800">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full active:scale-95 transition-transform">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-lg font-bold">Crypto Checkout</h1>
        <div className="w-10 h-10" />
      </div>

      <div className="px-5 py-8 flex-1 flex flex-col items-center">
        {/* Status Badge */}
        <div className={`mb-8 px-4 py-2 rounded-full flex items-center gap-2 border ${
          status === 'pending' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
          status === 'confirming' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
          'bg-green-500/10 border-green-500/20 text-green-500'
        }`}>
          {status === 'pending' && <Clock size={16} className="animate-pulse" />}
          {status === 'confirming' && <AlertCircle size={16} className="animate-spin" />}
          {status === 'success' && <CheckCircle2 size={16} />}
          <span className="text-sm font-bold capitalize">
            {status === 'pending' ? `Awaiting Payment (${formatTime(timeLeft)})` :
             status === 'confirming' ? 'Confirming on Network...' :
             'Payment Successful!'}
          </span>
        </div>

        {/* Amount */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Send Exactly</p>
          <div className="flex items-center justify-center gap-3">
            <Bitcoin size={36} className="text-orange-500" />
            <span className="text-4xl font-black">{btcAmount}</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">≈ ₦{total.toLocaleString()}</p>
        </div>

        {/* QR Code Placeholder */}
        <div className="w-64 h-64 bg-white rounded-3xl p-4 mb-8 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Fake QR pattern */}
            <div className="w-48 h-48 border-8 border-black grid grid-cols-5 grid-rows-5 gap-1 p-2">
               {Array.from({length: 25}).map((_, i) => (
                 <div key={i} className={`bg-black ${Math.random() > 0.4 ? 'opacity-100' : 'opacity-0'}`} />
               ))}
            </div>
            <div className="absolute w-12 h-12 bg-white flex items-center justify-center rounded-lg">
              <Bitcoin size={32} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Wallet Address */}
        <div className="w-full">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">BTC Wallet Address</p>
          <div className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between border border-gray-800">
            <span className="font-mono text-sm text-gray-300 truncate pr-4">{walletAddress}</span>
            <button 
              onClick={handleCopy}
              className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
            >
              {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-400 leading-relaxed">
            Only send Bitcoin (BTC) to this address. Sending any other digital asset will result in permanent loss.
          </p>
        </div>
      </div>
    </div>
  )
}
