import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../../components/brand/Logo'

export default function RiderSplash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/dispatch/welcome'), 2400)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #5B5BFF 0%, #4040E8 50%, #3535D4 100%)' }}>

      {/* Subtle background circles */}
      <div className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-60px] left-[-60px] w-60 h-60 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />

      {/* Logo + wordmark */}
      <div className="flex flex-col items-center gap-5 z-10">
        <div className="w-[88px] h-[88px] bg-white/20 backdrop-blur-sm rounded-[24px] flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
          <Logo variant="icon" height={40} className="brightness-0 invert" />
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <p className="text-white text-4xl tracking-tight leading-none">
            <span className="font-black">Rapid</span>
            <span className="font-light"> Rider</span>
          </p>
          <p className="text-white/60 text-[11px] font-bold tracking-[0.22em] uppercase mt-3">
            Deliver. Earn. Grow.
          </p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="absolute bottom-10 left-0 right-0 px-10 z-10">
        {/* Progress dots */}
        <div className="flex gap-2 mb-4">
          <div className="h-1 flex-1 rounded-full bg-white" />
          <div className="h-1 flex-1 rounded-full bg-white/25" />
        </div>
        <p className="text-white/40 text-[10px] font-bold tracking-[0.18em] uppercase text-center">
          Version 2.4.0 • Secure Connection
        </p>
      </div>
    </div>
  )
}
