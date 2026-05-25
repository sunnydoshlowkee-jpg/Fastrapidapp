import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, BadgeCheck, Truck, FileText } from 'lucide-react'

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

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-6 pt-5 pb-10"
      style={{ background: '#F7F7FF' }}>

      {/* Back */}
      <button onClick={() => navigate(-1)}
        className="w-10 h-10 rounded-full bg-white flex items-center justify-center active:bg-gray-100 transition-colors mb-8 shadow-sm">
        <ArrowLeft size={18} className="text-gray-700" />
      </button>

      {/* Clock icon with badge */}
      <div className="flex justify-center mb-8">
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
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-black text-gray-900 mb-3">Application Sent!</h1>
        <p className="text-gray-500 text-sm leading-relaxed px-4">
          Your rider application is now under review by our operations team.
        </p>
      </div>

      {/* Submitted credentials */}
      <div className="bg-white rounded-3xl p-4 mb-6 shadow-sm">
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
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#5B5BFF' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Check status button */}
      <button
        onClick={() => navigate('/dispatch')}
        className="w-full py-4 rounded-2xl font-bold text-base border-2 mb-4 transition-all active:opacity-80"
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
