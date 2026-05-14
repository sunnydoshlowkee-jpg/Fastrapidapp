import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import OtpInput from '../../../../components/ui/OtpInput'
import DesktopNav from '../../../../components/onboarding/DesktopNav'
import DesktopFooter from '../../../../components/onboarding/DesktopFooter'

export default function VerifyIdentity() {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[520px]">
          <div className="px-5 pt-5">
            <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <ArrowLeft size={18} className="text-[#1A1AF5]" />
            </button>
          </div>
          <div className="px-6 pb-8 pt-6 flex flex-col flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
            <p className="text-sm text-gray-500 mb-8">
              We've sent a 6-digit code to <span className="font-semibold text-gray-700">+234 089 7373 093</span>.{' '}
              <button className="text-[#1A1AF5] font-medium">Edit</button>
            </p>
            <OtpInput length={6} value={otp} onChange={setOtp} />
            <p className="text-center text-sm text-gray-400 mt-5">Resend code in 0:45</p>
            <div className="mt-auto pt-8">
              <button disabled={otp.length < 6} onClick={() => navigate('/app')}
                className="w-full bg-[#1A1AF5] text-white font-bold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed tracking-widest"
              >VERIFY</button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col min-h-screen bg-gray-50">
        <DesktopNav />
        <div className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-10 flex flex-col items-center text-center">
            {/* Lock icon */}
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
              <Lock size={24} className="text-[#1A1AF5]" />
            </div>

            <h1 className="text-xl font-bold text-gray-900 mb-2">Verify Identity</h1>
            <p className="text-sm text-gray-500 mb-8">
              We've sent a 6-digit code to <span className="font-semibold text-gray-700">+234 089 7373 093</span>.{' '}
              <button className="text-[#1A1AF5] font-medium">Edit</button>
            </p>

            <OtpInput length={6} value={otp} onChange={setOtp} />

            <p className="text-sm text-gray-400 mt-4">
              Didn't receive this code?{' '}
              <button className="text-[#1A1AF5] font-medium">Resend in 0:44</button>
            </p>

            <button disabled={otp.length < 6} onClick={() => navigate('/app')}
              className="w-full bg-[#1A1AF5] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 mt-6"
            >Verify →</button>

            <button onClick={() => navigate('/auth/login')} className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Return to login
            </button>
          </div>
        </div>
        <DesktopFooter />
      </div>
    </>
  )
}
