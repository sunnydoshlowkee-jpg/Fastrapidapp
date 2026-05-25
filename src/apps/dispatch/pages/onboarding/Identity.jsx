import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, Camera, User, Info } from 'lucide-react'

export default function RiderIdentity() {
  const navigate = useNavigate()
  const [govId, setGovId] = useState(null)
  const [selfie, setSelfie] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto px-6 pt-5 pb-8">

      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:bg-gray-200 transition-colors">
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5B5BFF' }}>
          Step 2 of 4
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        <div className="h-1.5 flex-1 rounded-full" style={{ background: '#5B5BFF' }} />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
      </div>

      {/* Heading */}
      <h1 className="text-[26px] font-black text-gray-900 leading-tight mb-2">
        Verify Your Identity
      </h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        We need to confirm who you are for safety and security within the Rapid network.
      </p>

      {/* Upload cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Government ID */}
        <label className="cursor-pointer">
          <input type="file" accept="image/*" className="hidden"
            onChange={e => setGovId(e.target.files?.[0]?.name || true)} />
          <div className={`rounded-2xl border-2 p-6 flex flex-col items-center gap-3 transition-all ${govId ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <BadgeCheck size={22} style={{ color: govId ? '#5B5BFF' : '#9CA3AF' }} />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-sm">Government ID</p>
              <p className="text-gray-400 text-xs mt-0.5">{govId ? 'Uploaded ✓' : 'Tap to upload'}</p>
            </div>
          </div>
        </label>

        {/* Selfie Photo */}
        <label className="cursor-pointer">
          <input type="file" accept="image/*" capture="user" className="hidden"
            onChange={e => setSelfie(e.target.files?.[0]?.name || true)} />
          <div className={`rounded-2xl border-2 p-6 flex flex-col items-center gap-3 transition-all ${selfie ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Camera size={22} style={{ color: selfie ? '#5B5BFF' : '#9CA3AF' }} />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900 text-sm">Selfie Photo</p>
              <p className="text-gray-400 text-xs mt-0.5">{selfie ? 'Captured ✓' : 'Look straight'}</p>
            </div>
          </div>
        </label>
      </div>

      {/* Profile Photo */}
      <div className="mb-8">
        <p className="font-bold text-gray-900 text-base mb-4">Profile Photo</p>
        <div className="flex flex-col items-center gap-3">
          <label className="cursor-pointer relative">
            <input type="file" accept="image/*" className="hidden"
              onChange={e => setProfilePhoto(e.target.files?.[0]?.name || true)} />
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={36} className="text-gray-400" />
            </div>
            {/* Camera badge */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}>
              <Camera size={14} className="text-white" />
            </div>
          </label>
          <p className="text-gray-400 text-xs">This photo will be visible to customers</p>
        </div>
      </div>

      {/* Verification note */}
      <div className="rounded-2xl p-4 mb-8 flex gap-3" style={{ background: '#FEF3E2' }}>
        <Info size={18} className="shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
        <div>
          <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: '#92400E' }}>
            Verification Note
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#78350F' }}>
            Documents are usually verified within 24 hours. Ensure your photos are clear and all text is readable.
          </p>
        </div>
      </div>

      <div className="flex-1" />

      {/* Continue */}
      <button
        onClick={() => navigate('/dispatch/onboarding/vehicle')}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Continue
      </button>
    </div>
  )
}
