import { Link } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'
import DesktopNav from '../../../../components/onboarding/DesktopNav'
import DesktopFooter from '../../../../components/onboarding/DesktopFooter'

function MobileWelcome() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mt-8 mb-6">
          <Logo height={28} />
        </div>
        <div className="w-full text-right mb-4">
          <Link to="/app" className="text-[#1A1AF5] text-sm font-medium">Continue as a guest</Link>
        </div>

        {/* Illustration */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center h-56 mb-8 overflow-hidden relative">
          <div className="flex gap-2 items-end px-4">
            {[{ w: 'w-16 h-20' }, { w: 'w-14 h-24' }, { w: 'w-12 h-16' }].map((b, i) => (
              <div key={i} className={`${b.w} rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
                <div className="w-6 h-6 rounded-full bg-white/60" />
              </div>
            ))}
          </div>
          <p className="absolute bottom-3 right-4 text-white/70 text-xs italic">ẹ Káàbọ̀ sívome</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Create an account or log in to continue your journey.</p>
        <p className="text-sm text-gray-500 mb-3">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#1A1AF5] font-semibold">Log In</Link>
        </p>
        <Link to="/onboarding/account-type" className="w-full bg-[#1A1AF5] text-white text-sm font-semibold py-4 rounded-2xl text-center flex items-center justify-center gap-2 hover:bg-[#1515d4] transition-colors">
          Create Account →
        </Link>
      </div>
    </div>
  )
}

function DesktopWelcome() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DesktopNav />
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-12 flex flex-col items-center text-center">
          {/* Blue icon square */}
          <div className="w-16 h-16 rounded-2xl bg-[#1A1AF5] flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
            <Logo variant="icon" height={32} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-500 text-sm mb-8">
            Create an account or log in to continue your journey.
          </p>

          <Link
            to="/onboarding/account-type"
            className="w-full bg-[#1A1AF5] text-white font-semibold py-3.5 rounded-xl text-center hover:bg-[#1515d4] transition-colors mb-3 text-sm"
          >
            Create Account →
          </Link>

          <p className="text-sm text-gray-500 mb-2">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-[#1A1AF5] font-semibold">Log In</Link>
          </p>
          <Link to="/app" className="text-sm text-[#1A1AF5] font-medium">Continue as a guest</Link>

          <p className="text-xs text-gray-400 mt-6">
            By continuing, you agree to our{' '}
            <span className="text-[#1A1AF5]">Terms of Service</span> and{' '}
            <span className="text-[#1A1AF5]">Privacy Policy</span>.
          </p>
        </div>
      </div>
      <DesktopFooter />
    </div>
  )
}

export default function Welcome() {
  return (
    <>
      <div className="md:hidden"><MobileWelcome /></div>
      <div className="hidden md:block"><DesktopWelcome /></div>
    </>
  )
}
