import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Store, Bike } from 'lucide-react'
import AuthLayout from '../../../../components/layout/AuthLayout'

const MERCHANT_LOGIN_PATH = '/merchant/login'
const MERCHANT_SIGNUP_PATH = '/merchant/signup'
const CUSTOMER_PHONE_PATH = '/onboarding/location'
const CUSTOMER_LOGIN_PATH = '/auth/login'
const RIDER_WELCOME_PATH = '/dispatch/welcome'
const RIDER_LOGIN_PATH = '/dispatch/login'

export default function AccountType() {
  const navigate = useNavigate()
  const [type, setType] = useState('customer')

  const handleContinue = () => {
    if (type === 'merchant') {
      navigate(MERCHANT_LOGIN_PATH)
      return
    }
    if (type === 'rider') {
      navigate(RIDER_WELCOME_PATH)
      return
    }
    navigate(CUSTOMER_PHONE_PATH)
  }

  const loginPath = type === 'rider' ? RIDER_LOGIN_PATH : type === 'merchant' ? MERCHANT_LOGIN_PATH : CUSTOMER_LOGIN_PATH

  return (
    <AuthLayout 
      illustration="/welcome-hero.png" 
      showBackButton={true} 
      backTo="/onboarding/welcome"
    >
      <div className="flex-1 flex flex-col justify-center w-full pt-2">
        <h1 className="text-3xl font-extrabold text-[#111827] mb-2 tracking-tight">Who are you?</h1>
        <p className="text-[#6B7280] text-[16px] mb-8">
          Select your account type
        </p>

        <div className="flex flex-col gap-4 mb-12">
          {/* Customer Option */}
          <button
            onClick={() => setType('customer')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
              type === 'customer'
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm'
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                type === 'customer' ? 'bg-[#4342FF] text-white' : 'bg-transparent text-[#4342FF]'
              }`}>
                <User size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[18px] text-[#111827]">Customer</span>
            </div>
            {/* Radio circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              type === 'customer' ? 'border-[#4342FF] bg-[#4342FF]' : 'border-gray-300 bg-white'
            }`} />
          </button>

          {/* Merchant Option */}
          <button
            onClick={() => setType('merchant')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
              type === 'merchant'
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm'
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                type === 'merchant' ? 'bg-[#4342FF] text-white' : 'bg-transparent text-[#4342FF]'
              }`}>
                <Store size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[18px] text-[#111827]">Merchant</span>
            </div>
            {/* Radio circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              type === 'merchant' ? 'border-[#4342FF] bg-[#4342FF]' : 'border-gray-300 bg-white'
            }`} />
          </button>

          {/* Rider Option */}
          <button
            onClick={() => setType('rider')}
            className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
              type === 'rider'
                ? 'bg-indigo-50/50 border-[#4342FF] shadow-sm'
                : 'bg-[#F3F4F6] border-transparent hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                type === 'rider' ? 'bg-[#4342FF] text-white' : 'bg-transparent text-[#4342FF]'
              }`}>
                <Bike size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-[18px] text-[#111827]">Rider / Dispatch</span>
            </div>
            {/* Radio circle */}
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              type === 'rider' ? 'border-[#4342FF] bg-[#4342FF]' : 'border-gray-300 bg-white'
            }`} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white text-[16px] font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/30 mb-8 active:scale-[0.98]"
        >
          Continue
        </button>

        <p className="text-[15px] text-[#4B5563] text-center">
          {type === 'merchant' ? (
            <>
              New to Fastrapid?{' '}
              <Link to={MERCHANT_SIGNUP_PATH} className="text-[#4342FF] font-bold hover:underline">
                Create Account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to={loginPath} className="text-[#4342FF] font-bold hover:underline">
                {type === 'rider' ? 'Rider Log In' : 'Log In'}
              </Link>
            </>
          )}
        </p>
      </div>
    </AuthLayout>
  )
}
