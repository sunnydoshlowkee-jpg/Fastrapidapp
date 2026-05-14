import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

export default function Splash() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('draw')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 1600)
    const t2 = setTimeout(() => navigate('/onboarding/welcome', { replace: true }), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [navigate])

  return (
    <div className="h-screen w-full bg-[#1A1AF5] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3a3aff_0%,_#1A1AF5_60%,_#0d0dcc_100%)]" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          className={`transition-all duration-700 ${
            phase === 'draw' ? 'opacity-100 scale-100' : 'opacity-100 scale-90'
          }`}
        >
          <Logo variant="icon" height={80} />
        </div>

        <div
          className={`text-center transition-all duration-700 ${
            phase === 'reveal' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-white text-3xl font-bold tracking-tight">Fastrapid</p>
          <p className="text-blue-200 text-sm mt-1.5 tracking-wide">Fast. Fresh. Reliable.</p>
        </div>
      </div>

      <p
        className={`absolute bottom-10 text-blue-300 text-[11px] tracking-[0.2em] uppercase z-10 transition-all duration-700 ${
          phase === 'reveal' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Redefining Delivery Network
      </p>

      {/* Progress dots */}
      <div className="absolute bottom-24 flex gap-2 z-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block rounded-full transition-all duration-500 ${
              i === (phase === 'draw' ? 0 : 1)
                ? 'w-5 h-2 bg-white'
                : 'w-2 h-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
