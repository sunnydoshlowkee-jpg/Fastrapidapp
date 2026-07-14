import { Link } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'
import AuthLayout from '../../../../components/layout/AuthLayout'

export default function Welcome() {
  return (
    <AuthLayout illustration="/welcome-hero.png">
      
      {/* Mobile top header (hidden on desktop) */}
      <div className="flex md:hidden justify-between items-center w-full mb-8">
        <Logo variant="full" height={24} />
        <Link to="/app" className="text-[#4F46E5] text-sm font-medium">
          Continue as a guest
        </Link>
      </div>

      {/* Desktop top action */}
      <div className="hidden md:flex absolute top-10 right-12">
        <Link to="/app" className="text-[#4342FF] font-semibold text-[15px] hover:text-indigo-800 transition-colors">
          Continue as a guest
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full mt-4 md:mt-0">
        
        {/* Mobile image (hidden on desktop) */}
        <div className="w-full aspect-square bg-[#F5F7FA] rounded-[2.5rem] flex items-center justify-center mb-10 relative overflow-hidden md:hidden">
          <img src="/welcome-hero.png" alt="Welcome" className="w-full h-full object-contain p-6" />
        </div>

        <h1 className="text-[28px] md:text-[52px] font-extrabold text-[#111827] mb-4 md:mb-6 text-center leading-[1.1] tracking-tight">
          Welcome
        </h1>
        
        <p className="text-[#4B5563] text-center text-[16px] md:text-[20px] leading-relaxed mb-10 md:mb-14">
          Create an account or log in to continue your journey.
        </p>

        <Link
          to="/onboarding/account-type"
          className="w-full bg-[#4342FF] hover:bg-[#3231d6] text-white py-4 md:py-5 rounded-xl font-bold text-[16px] md:text-[20px] text-center transition-all shadow-lg shadow-indigo-500/30 active:scale-[0.98] mb-8 flex items-center justify-center gap-2"
        >
          Create Account <span className="text-xl leading-none">→</span>
        </Link>

        <p className="text-base md:text-lg text-gray-600 text-center">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-[#4342FF] font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
