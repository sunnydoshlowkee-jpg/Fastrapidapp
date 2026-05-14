import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import DesktopNav from './DesktopNav'
import DesktopFooter from './DesktopFooter'

export default function OnboardingShell({ children, onBack, hideBack = false }) {
  const navigate = useNavigate()
  const goBack = onBack || (() => navigate(-1))

  return (
    <>
      {/* ── Desktop wrapper ────────────────────────────── */}
      <div className="hidden md:flex flex-col min-h-screen bg-gray-50">
        <DesktopNav />
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {!hideBack && (
              <div className="px-8 pt-6">
                <button
                  onClick={goBack}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft size={16} className="text-gray-700" />
                </button>
              </div>
            )}
            <div className="px-8 pb-8 pt-4">{children}</div>
          </div>
        </div>
        <DesktopFooter />
      </div>

      {/* ── Mobile wrapper ─────────────────────────────── */}
      <div className="md:hidden min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          {!hideBack && (
            <div className="p-5 pb-0">
              <button
                onClick={goBack}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft size={18} className="text-gray-700" />
              </button>
            </div>
          )}
          <div className="flex-1 flex flex-col px-6 pb-8 pt-4">{children}</div>
        </div>
      </div>
    </>
  )
}
