import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle, FileText, ShieldCheck, Info, Eye, Loader2 } from 'lucide-react'
import { getDocuments, uploadDocument } from '../../../services/riderAuthService'

export default function MyDocuments() {
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState(null) // { message, type }

  const fetchDocs = () => {
    getDocuments()
      .then(res => {
        const docs = res.data?.data?.documents || [];
        setDocuments(Array.isArray(docs) ? docs : [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  const handleUpload = async (file, documentType) => {
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('document', file)
    formData.append('document_type', documentType)

    try {
      await uploadDocument(formData)
      setToast({ message: 'Document uploaded successfully', type: 'success' })
      fetchDocs() // refresh
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Upload failed', type: 'error' })
    } finally {
      setUploading(false)
      setTimeout(() => setToast(null), 3000)
    }
  }

  const getDoc = (type) => documents.find(d => d.document_type === type)

  const hasLicence = getDoc('drivers_license')
  const hasNin = getDoc('national_id')
  const hasProof = getDoc('vehicle_proof_of_ownership')
  const hasInsurance = getDoc('vehicle_insurance')

  const isAllUploaded = hasLicence && hasNin && hasProof && hasInsurance

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col relative">

      {toast && (
        <div className={`absolute top-0 left-5 right-5 mt-4 p-3 rounded-xl flex items-center justify-between text-sm font-bold text-white z-50 transition-all ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="font-black text-gray-900">Rapid Rider</p>
        <div className="flex items-center gap-1.5">
          {!isAllUploaded && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
          <span className={`text-[10px] font-black uppercase tracking-wider ${isAllUploaded ? 'text-green-500' : 'text-red-500'}`}>
            {isAllUploaded ? 'Verified' : 'Verify Identity'}
          </span>
        </div>
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5 pb-6">

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}>
                👤
              </div>
            )}
          </div>
          <div className="text-center">
            <h2 className="font-black text-gray-900 text-base">Identity Documents</h2>
            <p className="text-xs text-gray-400 mt-0.5">Submit high-quality photos for faster approval.</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} className="text-gray-400" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Required Documents</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-4"><Loader2 size={24} className="mx-auto animate-spin" /></div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Driver's License */}
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleUpload(e.target.files[0], 'drivers_license')} />
                <div className={`rounded-2xl border-2 px-5 py-5 flex flex-col items-center gap-2 transition-all ${hasLicence ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(91,91,255,0.1)' }}>
                    <Camera size={20} style={{ color: hasLicence ? '#5B5BFF' : '#9CA3AF' }} />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{hasLicence ? "Driver's License ✓" : "Driver's License"}</p>
                </div>
              </label>

              {/* National ID */}
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleUpload(e.target.files[0], 'national_id')} />
                <div className={`rounded-2xl border-2 px-5 py-5 flex flex-col items-center gap-2 transition-all ${hasNin ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(91,91,255,0.1)' }}>
                    <Camera size={20} style={{ color: hasNin ? '#5B5BFF' : '#9CA3AF' }} />
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{hasNin ? 'National ID (NIN) ✓' : 'National ID (NIN)'}</p>
                </div>
              </label>
            </div>
          )}
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
                  onChange={(e) => handleUpload(e.target.files[0], 'vehicle_proof_of_ownership')} />
                <span className="text-[10px] font-black px-3 py-1.5 rounded-xl border-2 transition-colors"
                  style={{
                    borderColor: hasProof ? '#5B5BFF' : '#5B5BFF',
                    color: hasProof ? '#fff' : '#5B5BFF',
                    background: hasProof ? '#5B5BFF' : 'transparent',
                  }}>
                  {hasProof ? 'DONE' : 'UPLOAD'}
                </span>
              </label>
            </div>

            {/* Insurance */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(91,91,255,0.1)' }}>
                <ShieldCheck size={18} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">Insurance Policy</p>
                <p className="text-xs text-gray-400">Current valid insurance</p>
              </div>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleUpload(e.target.files[0], 'vehicle_insurance')} />
                <span className="text-[10px] font-black px-3 py-1.5 rounded-xl border-2 transition-colors"
                  style={{
                    borderColor: hasInsurance ? '#5B5BFF' : '#5B5BFF',
                    color: hasInsurance ? '#fff' : '#5B5BFF',
                    background: hasInsurance ? '#5B5BFF' : 'transparent',
                  }}>
                  {hasInsurance ? 'DONE' : 'UPLOAD'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-3 bg-gray-50 rounded-2xl px-4 py-4">
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            All documents are encrypted and only used for identity verification. Processing usually takes 12–24 hours.
          </p>
        </div>

        <div className="flex-1" />

        {/* Submit */}
        <button
          onClick={() => {
            if (isAllUploaded) {
              setToast({ message: 'All documents submitted successfully!', type: 'success' })
              setTimeout(() => { setToast(null); navigate(-1); }, 2000)
            } else {
              setToast({ message: 'Please upload all required documents first.', type: 'error' })
              setTimeout(() => setToast(null), 3000)
            }
          }}
          disabled={uploading}
          className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity active:opacity-80 flex items-center justify-center gap-2 disabled:opacity-50"
          style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
        >
          {uploading && <Loader2 size={18} className="animate-spin" />}
          {uploading ? 'Uploading...' : 'Submit for Review'}
        </button>
      </div>
    </div>
  )
}
