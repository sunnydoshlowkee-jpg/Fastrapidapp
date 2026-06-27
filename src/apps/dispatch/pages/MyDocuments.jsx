import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle, FileText, Info, Eye } from 'lucide-react'
import { getRiderMe, getRiderDocuments } from '../../../services/riderAuthService'
import { uploadRiderDocument } from '../../../services/riderOnboardingService'
import { validateImageFile } from '../../../utils/imageUpload'

const DOC_LABELS = {
  government_id: 'Government ID',
  selfie: 'Selfie Verification',
}

function statusColor(status) {
  if (status === 'approved') return '#5B5BFF'
  if (status === 'rejected') return '#EF4444'
  return '#9CA3AF'
}

export default function MyDocuments() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [documents, setDocuments] = useState([])

  const load = async () => {
    setLoading(true)
    try {
      const [meRes, docsRes] = await Promise.all([getRiderMe(), getRiderDocuments()])
      setAvatarUrl(meRes.data?.data?.user?.avatar_url || null)
      setDocuments(docsRes.data?.data?.documents || docsRes.data?.documents || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const docByType = (type) => documents.find((d) => d.document_type === type)

  const handleUpload = async (documentType, file) => {
    const validation = validateImageFile(file, { maxBytes: 5 * 1024 * 1024, label: 'Document' })
    if (validation) {
      alert(validation)
      return
    }
    setUploading(documentType)
    try {
      await uploadRiderDocument(documentType, file)
      await load()
    } catch (e) {
      alert(e.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(null)
    }
  }

  const renderDocCard = (type) => {
    const doc = docByType(type)
    const label = DOC_LABELS[type] || type
    const isUploaded = Boolean(doc?.document_url)

    return (
      <div key={type} className="border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-bold text-gray-900 text-sm">{label}</p>
            <p className="text-xs capitalize" style={{ color: statusColor(doc?.verification_status) }}>
              {doc?.verification_status || 'Not uploaded'}
            </p>
          </div>
          {isUploaded && (
            <CheckCircle size={20} fill="#5B5BFF" className="text-white flex-shrink-0" />
          )}
        </div>

        {isUploaded ? (
          <div className="relative mx-3 mb-3 rounded-xl overflow-hidden bg-gray-100" style={{ height: '90px' }}>
            <img src={doc.document_url} alt={label} className="w-full h-full object-cover" />
            <a
              href={doc.document_url}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full"
            >
              <Eye size={11} className="text-white" />
              <span className="text-white text-[10px] font-bold">View</span>
            </a>
          </div>
        ) : (
          <label className="cursor-pointer block mx-3 mb-3">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading === type}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleUpload(type, file)
              }}
            />
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-5 py-5 flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(91,91,255,0.1)' }}>
                <Camera size={20} style={{ color: '#5B5BFF' }} />
              </div>
              <p className="font-bold text-gray-900 text-sm">
                {uploading === type ? 'Uploading…' : `Upload ${label}`}
              </p>
              <p className="text-xs text-gray-400 text-center">Clear photo, JPG or PNG</p>
            </div>
          </label>
        )}

        {isUploaded && (
          <div className="px-4 pb-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading === type}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(type, file)
                }}
              />
              <span className="text-[10px] font-black px-3 py-1.5 rounded-xl border-2"
                style={{ borderColor: '#5B5BFF', color: '#5B5BFF' }}>
                {uploading === type ? 'UPLOADING…' : 'REPLACE'}
              </span>
            </label>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading documents…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">

      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="font-black text-gray-900">My Documents</p>
        <div className="w-9" />
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
          <div className="flex flex-col gap-3">
            {renderDocCard('government_id')}
            {renderDocCard('selfie')}
          </div>
        </div>

        <div className="flex items-start gap-3 bg-gray-50 rounded-2xl px-4 py-4">
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            All documents are encrypted and only used for identity verification. Processing usually takes 12–24 hours.
          </p>
        </div>
      </div>
    </div>
  )
}
