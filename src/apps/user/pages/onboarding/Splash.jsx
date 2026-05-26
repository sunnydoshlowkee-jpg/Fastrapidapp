import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

export default function Splash() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('one')

  useEffect(() => {
    // Switch to second splash screen after 1.5 seconds
    const t1 = setTimeout(() => setPhase('two'), 1500)
    // Navigate to slider after another 2 seconds
    const t2 = setTimeout(() => navigate('/onboarding/slider', { replace: true }), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [navigate])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#4F46E5' }}>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex items-center gap-3">
          {/* F/R combined Logo icon placeholder */}
          <div className="flex items-center justify-center">
            <Logo variant="icon" height={48} />
          </div>
          
          {phase === 'two' && (
            <span className="text-white text-4xl font-semibold tracking-tight animate-fade-in">
              Fastrapid
            </span>
          )}
        </div>

        {phase === 'two' && (
          <p className="text-white/80 text-sm mt-3 tracking-wide animate-fade-in">
            Fast · Fresh · Reliable
          </p>
        )}
      </div>

      {/* Bottom area */}
      <div className="absolute bottom-16 w-full flex flex-col items-center justify-center">
        {phase === 'one' ? (
          // Three dots loader
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        ) : (
          // Loading bar
          <div className="flex flex-col items-center w-full px-12 max-w-xs animate-fade-in">
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-4 relative">
              <div className="h-full bg-white w-1/3 rounded-full absolute left-0 top-0 animate-[loading_1.5s_ease-in-out_infinite]" />
            </div>
            <p className="text-white/60 text-[10px] uppercase tracking-[0.15em] font-medium">
              Initializing Delivery Network
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
