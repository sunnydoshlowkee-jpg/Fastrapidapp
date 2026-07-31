import { useNavigate } from 'react-router-dom'
import { Clock, FileText, ShieldCheck, Upload } from 'lucide-react'
import { getCachedRiderProfile, getRiderApprovalStatus } from '../../../services/riderAuthService'

export default function PendingApproval() {
  const navigate = useNavigate()
  const profile = getCachedRiderProfile()
  const firstName = profile?.user?.first_name || 'Rider'
  const approvalStatus = getRiderApprovalStatus()

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-app pb-10">
      <div className="flex justify-center mb-8">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(91,91,255,0.08)', border: '3px solid rgba(91,91,255,0.15)' }}
        >
          <Clock size={42} style={{ color: '#5B5BFF' }} strokeWidth={1.5} />
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">
          {approvalStatus === 'rejected' ? 'Application Needs Attention' : 'Pending Review'}
        </p>
        <h1 className="text-[28px] font-black text-gray-900 leading-tight mb-3">
          Application Under Review
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Hi {firstName}, your account must be approved before you can go online and accept deliveries.
          {approvalStatus === 'pending'
            ? ' Upload your government ID and selfie if you have not done so yet.'
            : ' Please review your documents and re-upload if needed.'}
        </p>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5 mb-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
          What happens next
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5B5BFF] shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Document review</p>
              <p className="text-gray-500 text-xs mt-0.5">Our team verifies your government ID and selfie.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5B5BFF] shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Account activation</p>
              <p className="text-gray-500 text-xs mt-0.5">You will be notified once you can start taking orders.</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/dispatch/profile/documents')}
        className="w-full py-4 rounded-2xl text-white font-bold text-base mb-3 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        <Upload size={18} />
        Upload / Re-upload Documents
      </button>

      <button
        type="button"
        onClick={() => navigate('/dispatch/profile')}
        className="w-full max-w-sm mx-auto py-4 rounded-2xl font-bold text-base border-2"
        style={{ borderColor: '#5B5BFF', color: '#5B5BFF', background: 'white' }}
      >
        Go to Profile
      </button>
    </div>
  )
}
