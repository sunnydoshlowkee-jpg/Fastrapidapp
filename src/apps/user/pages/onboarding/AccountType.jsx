import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Store } from 'lucide-react'

function MobileAccountType() {
  const navigate = useNavigate()
  const [type, setType] = useState('customer')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-center px-6 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Who are you?</h1>
        <p className="text-gray-500 text-sm mb-8">
          Select your account type
        </p>

        <div className="flex flex-col gap-4 mb-16">
          {/* Customer Option */}
          <button
            onClick={() => setType('customer')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
              type === 'customer'
                ? 'bg-indigo-50/50 border-[#4F46E5]'
                : 'bg-gray-50 border-transparent hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                type === 'customer' ? 'bg-[#4F46E5] text-white' : 'bg-transparent text-[#4F46E5]'
              }`}>
                <User size={20} strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-gray-900">Customer</span>
            </div>
            {/* Radio circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              type === 'customer' ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-gray-300'
            }`} />
          </button>

          {/* Merchant Option */}
          <button
            onClick={() => setType('merchant')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
              type === 'merchant'
                ? 'bg-indigo-50/50 border-[#4F46E5]'
                : 'bg-gray-50 border-transparent hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                type === 'merchant' ? 'bg-[#4F46E5] text-white' : 'bg-transparent text-[#4F46E5]'
              }`}>
                <Store size={20} strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-gray-900">Merchant</span>
            </div>
            {/* Radio circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              type === 'merchant' ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-gray-300'
            }`} />
          </button>
        </div>

        <button
          onClick={() => navigate('/onboarding/phone')}
          className="w-full bg-[#4F46E5] text-white text-base font-medium py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-6"
        >
          Continue
        </button>

        <p className="text-base text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#4F46E5] font-semibold">Log In</Link>
        </p>
      </div>
    </div>
  )
}

function DesktopAccountType() {
  const navigate = useNavigate()
  const [type, setType] = useState('customer')

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Who are you?</h1>
          <p className="text-gray-500 text-base mb-10">
            Select your account type
          </p>

          <div className="flex flex-col gap-4 mb-12">
            {/* Customer Option */}
            <button
              onClick={() => setType('customer')}
              className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                type === 'customer'
                  ? 'bg-indigo-50/30 border-[#4F46E5]'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  type === 'customer' ? 'bg-[#4F46E5] text-white' : 'bg-[#E0E7FF] text-[#4F46E5]'
                }`}>
                  <User size={24} strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-lg text-gray-900">Customer</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                type === 'customer' ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-gray-300'
              }`} />
            </button>

            {/* Merchant Option */}
            <button
              onClick={() => setType('merchant')}
              className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
                type === 'merchant'
                  ? 'bg-indigo-50/30 border-[#4F46E5]'
                  : 'bg-gray-50 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  type === 'merchant' ? 'bg-[#4F46E5] text-white' : 'bg-[#E0E7FF] text-[#4F46E5]'
                }`}>
                  <Store size={24} strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-lg text-gray-900">Merchant</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 transition-colors ${
                type === 'merchant' ? 'border-[#4F46E5] bg-[#4F46E5]' : 'border-gray-300'
              }`} />
            </button>
          </div>

          <button
            onClick={() => navigate('/onboarding/phone')}
            className="w-full bg-[#4F46E5] text-white text-base font-medium py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-8"
          >
            Continue
          </button>

          <p className="text-base text-gray-600 text-center">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-[#4F46E5] font-semibold">Log In</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default function AccountType() {
  return (
    <>
      <div className="md:hidden"><MobileAccountType /></div>
      <div className="hidden md:block"><DesktopAccountType /></div>
    </>
  )
}
