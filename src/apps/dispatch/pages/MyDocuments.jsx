import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle, FileText, ShieldCheck, Info, Eye } from 'lucide-react'

export default function MyDocuments() {
  const navigate = useNavigate()
  const [ninUploaded, setNinUploaded] = useState(() => {
    return localStorage.getItem('rider_nin_uploaded') === 'true'
  })
  const [proofUploaded, setProofUploaded] = useState(() => {
    return localStorage.getItem('rider_proof_uploaded') === 'true'
  })

  const updateNin = (val) => {
    setNinUploaded(val)
    localStorage.setItem('rider_nin_uploaded', String(val))
  }

  const updateProof = (val) => {
    setProofUploaded(val)
    localStorage.setItem('rider_proof_uploaded', String(val))
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="font-black text-gray-900">Rapid Rider</p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">Verify Identity</span>
        </div>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5 pb-6">

        {/* Avatar + title */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-4xl"
              style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}>
              👨‍💼
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
              style={{ background: '#5B5BFF' }}>
              <Camera size={12} className="text-white" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="font-black text-gray-900 text-base">Documents Verification</h2>
            <p className="text-xs text-gray-400 mt-0.5">Submit high-quality photos for faster approval.</p>
          </div>
        </div>

        {/* ── Personal Identification ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} className="text-gray-400" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal Identification</p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Driver's License — uploaded */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-bold text-gray-900 text-sm">Driver's License</p>
                  <p className="text-xs text-gray-400">Valid till Nov 2025</p>
                </div>
                <CheckCircle size={20} fill="#5B5BFF" className="text-white flex-shrink-0" />
              </div>
              {/* License image preview */}
              <div className="relative mx-3 mb-3 rounded-xl overflow-hidden bg-gray-100"
                style={{ height: '90px' }}>
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #e8e8f0, #d0d0e8)' }}>
                  <div className="text-center">
                    <p className="font-black text-gray-400 text-xs tracking-widest uppercase">DRIVER</p>
                    <p className="font-black text-gray-600 text-sm mt-1">LICENSE</p>
                    <div className="mt-1 flex gap-1 justify-center">
                      {['', '', ''].map((_, i) => (
                        <div key={i} className="h-1 w-8 bg-gray-300 rounded-full" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* View overlay */}
                <button className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Eye size={11} className="text-white" />
                  <span className="text-white text-[10px] font-bold">View</span>
                </button>
              </div>
            </div>

            {/* National ID — not uploaded */}
            <label className="cursor-pointer">
              <input type="file" accept="image/*" className="hidden"
                onChange={() => updateNin(true)} />
              <div className={`rounded-2xl border-2 px-5 py-5 flex flex-col items-center gap-2 transition-all ${ninUploaded ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(91,91,255,0.1)' }}>
                  <Camera size={20} style={{ color: ninUploaded ? '#5B5BFF' : '#9CA3AF' }} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{ninUploaded ? 'NIN Uploaded ✓' : 'National ID (NIN)'}</p>
                {!ninUploaded && (
                  <p className="text-xs text-gray-400 text-center">Upload a clear photo of your original slip</p>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* ── Vehicle Documentation ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">🏍</span>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vehicle Documentation</p>
          </div>

          <div className="flex flex-col gap-3">
            {/* Proof of Ownership */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(91,91,255,0.1)' }}>
                <FileText size={18} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">Proof of Ownership</p>
                <p className="text-xs text-gray-400">Required for registration</p>
              </div>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden"
                  onChange={() => updateProof(true)} />
                <span className="text-[10px] font-black px-3 py-1.5 rounded-xl border-2 transition-colors"
                  style={{
                    borderColor: proofUploaded ? '#5B5BFF' : '#5B5BFF',
                    color: proofUploaded ? '#fff' : '#5B5BFF',
                    background: proofUploaded ? '#5B5BFF' : 'transparent',
                  }}>
                  {proofUploaded ? 'DONE' : 'UPLOAD'}
                </span>
              </label>
            </div>

            {/* Insurance — expired */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239,68,68,0.08)' }}>
                <ShieldCheck size={18} className="text-red-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">Insurance Policy</p>
                <p className="text-xs text-red-500 font-semibold">Expired 2 days ago</p>
              </div>
              <button className="text-[10px] font-black px-3 py-1.5 rounded-xl border-2"
                style={{ borderColor: '#5B5BFF', color: '#5B5BFF' }}>
                UPDATE
              </button>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 bg-gray-50 rounded-2xl px-4 py-4">
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            All documents are encrypted and only used for identity verification purposes. Processing usually takes 12–24 hours.
          </p>
        </div>

        <div className="flex-1" />

        {/* Submit */}
        <button
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          Submit for Review
        </button>
      </div>
    </div>
  )
}
