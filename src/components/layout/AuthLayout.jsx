import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../brand/Logo'

/**
 * AuthLayout
 * A responsive split-screen layout for authentication and onboarding flows.
 * 
 * Props:
 * - children: The form/content to display on the right (or center on mobile).
 * - illustration: The image path or React Node to display on the left (desktop only).
 * - showBackButton: Boolean to show a back button on the right panel.
 * - backTo: String path to navigate to when back is clicked (defaults to -1).
 */
export default function AuthLayout({ children, illustration, showBackButton = false, backTo }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (backTo) {
      navigate(backTo)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      
      {/* Left Panel (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-[#FAF9FD] relative flex-col items-center justify-center overflow-hidden border-r border-gray-100">
        {/* Brand Logo */}
        <div className="absolute top-10 left-12 z-20">
          <Logo variant="blue" height={36} />
        </div>

        {/* Hero Image / Illustration */}
        <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-center p-12">
          {typeof illustration === 'string' ? (
            <img 
              src={illustration} 
              alt="Illustration" 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" 
            />
          ) : (
            illustration
          )}
        </div>
      </div>

      {/* Right Panel (Mobile & Desktop) */}
      <div className="w-full md:w-1/2 flex flex-col relative px-6 md:px-16 lg:px-24 pt-6 pb-10 min-h-screen">
        
        {/* Top Header area (Back button) */}
        <div className="w-full flex items-center min-h-[48px] mb-6 md:mb-8 md:mt-4">
          {showBackButton && (
            <button 
              onClick={handleBack}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col max-w-md w-full mx-auto md:mx-0">
          {children}
        </div>
        
      </div>
    </div>
  )
}
