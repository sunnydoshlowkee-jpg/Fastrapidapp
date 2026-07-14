import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../brand/Logo'

/**
 * CenteredLayout
 * A responsive centered layout for authentication and onboarding flows.
 * Acts like a standard mobile layout on small screens.
 * Centers the content horizontally and vertically on desktop.
 * 
 * Props:
 * - children: The form/content to display.
 * - showBackButton: Boolean to show a back button.
 * - backTo: String path to navigate to when back is clicked (defaults to -1).
 */
export default function CenteredLayout({ children, showBackButton = false, backTo }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backTo) {
      navigate(backTo)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-hidden">
      
      {/* Optional decorative background elements for desktop */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 h-64 bg-[#F8F9FA] -z-10" style={{ clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)' }}></div>
      <div className="hidden md:block absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      
      {/* Top Header area */}
      <div className="w-full flex items-center justify-between px-6 pt-12 pb-4 md:px-12 md:pt-12 absolute top-0 left-0 right-0 z-10">
        <div>
          {showBackButton && (
            <button 
              onClick={handleBack}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors bg-white shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
        <div className="hidden md:block">
          <Logo variant="full" height={32} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-6 pt-[100px] pb-10 w-full min-h-screen">
        <div className="w-full max-w-md md:max-w-xl mx-auto flex-1 flex flex-col md:justify-center md:pb-20">
          {children}
        </div>
      </div>
      
    </div>
  )
}
