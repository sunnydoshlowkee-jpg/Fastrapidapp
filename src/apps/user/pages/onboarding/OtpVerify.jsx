import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import OnboardingShell from '../../../../components/onboarding/OnboardingShell'
import OtpInput from '../../../../components/ui/OtpInput'

export default function OtpVerify() {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(59)
  const navigate = useNavigate()

  return (
    <OnboardingShell>
      {/* Icon */}
      <div className="flex justify-center my-6">
        <div className="w-20 h-20 rounded-2xl bg-[#1A1AF5] flex items-center justify-center shadow-lg shadow-blue-200">
          <Mail size={36} className="text-white" />
        </div>
      </div>

      <h1 className="text-xl font-bold text-gray-900 text-center mb-2">Check your phone</h1>
      <p className="text-sm text-gray-500 text-center mb-8">
        We've sent a 6-digit code to{' '}
        <span className="font-semibold text-gray-700">+234 803 123 4567</span>{' '}
        <button className="text-[#1A1AF5] font-medium">Edit</button>
      </p>

      <OtpInput length={6} value={otp} onChange={setOtp} />

      <div className="text-center mt-5">
        {countdown > 0 ? (
          <p className="text-sm text-gray-400">
            Didn't get a code?{' '}
            <span className="text-gray-500">Resend in 0:{String(countdown).padStart(2, '0')}</span>
          </p>
        ) : (
          <button className="text-sm text-[#1A1AF5] font-medium">Resend code</button>
        )}
      </div>

      <div className="mt-auto pt-8">
        <button
          disabled={otp.length < 6}
          onClick={() => navigate('/onboarding/profile')}
          className="w-full bg-[#1A1AF5] text-white font-semibold py-4 rounded-2xl hover:bg-[#1515d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Verify ✓
        </button>
      </div>
    </OnboardingShell>
  )
}
