import { useNavigate } from 'react-router-dom'
import { Clock, BadgeCheck, Truck, FileText } from 'lucide-react'

const CREDENTIALS = [
  {
    icon: <BadgeCheck size={18} />,
    title: 'Identity Verification',
    sub: 'National ID Card & Photo',
  },
  {
    icon: <Truck size={18} />,
    title: 'Vehicle Documents',
    sub: 'Registration & Insurance',
  },
  {
    icon: <FileText size={18} />,
    title: 'Background Check',
    sub: 'Police Clearance Certificate',
  },
]

export default function RiderSuccess() {
  const navigate = useNavigate()

  // Get name from sessionStorage
  const personal = JSON.parse(sessionStorage.getItem('rider_reg_personal') || '{}')
  const firstName = personal.firstName || 'Rider'

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-30 pointer-events-none"
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(91,91,255,0.1) 0%, rgba(255,255,255,0) 70%)'
           }}
      />

      {/* Clock icon with badge */}
      <div className="flex justify-center mb-8 z-10">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-36 h-36 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(91,91,255,0.08)', border: '3px solid rgba(91,91,255,0.15)' }}>
            {/* Inner circle */}
            <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center">
              <Clock size={40} style={{ color: '#5B5BFF' }} strokeWidth={1.5} />
            </div>
          </div>
          {/* Orange badge */}
          <div className="absolute top-2 right-2 w-9 h-9 rounded-full bg-orange-400 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 13l5 5L20 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center z-10 mb-12">
        <h1 className="text-[32px] font-black text-gray-900 leading-tight mb-3">
          Welcome aboard,<br/>{firstName}!
        </h1>
        <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px] mx-auto">
          Your rider application is now under review by our operations team.
        </p>
      </div>

      {/* Submitted credentials */}
      <div className="bg-white rounded-3xl p-4 mb-6 shadow-sm border border-gray-100 w-full max-w-sm z-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 px-2">
          Submitted Credentials
        </p>
        <div className="flex flex-col gap-1">
          {CREDENTIALS.map((c, i) => (
            <div key={i} className="flex items-center gap-4 px-2 py-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                {c.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">{c.title}</p>
                <p className="text-gray-400 text-xs">{c.sub}</p>
              </div>
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-amber-100">
                <Clock size={12} className="text-amber-600" strokeWidth={2.5} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Check status button */}
      <button
        onClick={() => navigate('/dispatch/pending')}
        className="w-full max-w-sm py-4 rounded-2xl font-bold text-base border-2 mb-4 transition-all active:opacity-80"
        style={{ borderColor: '#5B5BFF', color: '#5B5BFF', background: 'white' }}
      >
        Check Status Dashboard
      </button>

      <p className="text-center text-gray-400 text-xs mb-8 leading-relaxed">
        We'll notify you via SMS and Email once your account is activated.
      </p>

      {/* Support */}
      <div className="text-center mt-auto">
        <p className="text-gray-400 text-sm">
          Need help?{' '}
          <button className="font-bold" style={{ color: '#5B5BFF' }}>
            Contact Support
          </button>
        </p>
      </div>
    </div>
  )
}
