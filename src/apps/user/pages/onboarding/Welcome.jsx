import { Link } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

function MobileWelcome() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <Logo variant="full" height={24} />
        <Link to="/app" className="text-[#4F46E5] text-sm font-medium">
          Continue as a guest
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4 text-center">Welcome</h1>
        <p className="text-gray-500 text-sm text-center mb-10 px-4">
          Create an account or log in to continue your journey.
        </p>

        {/* Illustration */}
        <div className="w-full aspect-square bg-[#F5F7FA] rounded-[2.5rem] flex items-center justify-center mb-12 relative overflow-hidden">
          <img src="/grocery-hero.png" alt="Welcome" className="w-full h-full object-cover" />
        </div>

        <Link
          to="/onboarding/account-type"
          className="w-full bg-[#4F46E5] text-white text-base font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-6"
        >
          Create Account <span className="text-lg leading-none">→</span>
        </Link>

        <p className="text-base text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#4F46E5] font-semibold">Log In</Link>
        </p>
      </div>
    </div>
  )
}

function DesktopWelcome() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 flex overflow-hidden">
          
          {/* Left: Illustration */}
          <div className="flex-1 bg-[#F5F7FA] flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute top-8 left-8 z-10">
               <Logo variant="full" height={28} />
             </div>
             <img src="/grocery-hero.png" alt="Welcome" className="w-full h-full object-cover" />
          </div>

          {/* Right: Content */}
          <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="absolute top-8 right-8">
              <Link to="/app" className="text-[#4F46E5] text-sm font-medium">
                Continue as a guest
              </Link>
            </div>

            <div className="max-w-sm mx-auto w-full text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
              <p className="text-gray-500 text-base mb-12">
                Create an account or log in to continue your journey.
              </p>

              <Link
                to="/onboarding/account-type"
                className="w-full bg-[#4F46E5] text-white font-medium py-4 rounded-xl text-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-8 flex items-center justify-center gap-2 text-base"
              >
                Create Account <span className="text-lg leading-none">→</span>
              </Link>

              <p className="text-base text-gray-600">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-[#4F46E5] font-semibold">Log In</Link>
              </p>
            </div>
          </div>

        </div>
      </div>
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
