import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Camera,
  CheckCircle,
  FileText,
  Info,
  Loader2,
  User,
  AlertCircle,
  Clock,
} from 'lucide-react'
import {
  getDocuments,
  uploadDocument,
  getProfile,
  uploadRiderAvatar,
  getRiderApprovalStatus,
} from '../../../services/riderAuthService'
import { validateImageFile, MAX_DOCUMENT_IMAGE_BYTES, MAX_PROFILE_IMAGE_BYTES } from '../../../utils/imageUpload'

const REQUIRED_DOCS = [
  {
    type: 'government_id',
    label: 'Government ID',
    description: 'Clear photo of your valid government-issued ID',
  },
  {
    type: 'selfie',
    label: 'Selfie Photo',
    description: 'A clear selfie for identity verification',
  },
]

const STATUS_META = {
  approved: { label: 'Approved', className: 'text-emerald-600', icon: CheckCircle },
  pending: { label: 'Pending Review', className: 'text-amber-600', icon: Clock },
  rejected: { label: 'Rejected — re-upload', className: 'text-red-600', icon: AlertCircle },
  missing: { label: 'Not Uploaded', className: 'text-gray-500', icon: AlertCircle },
}

function getDocStatus(doc) {
  if (!doc) return 'missing'
  return doc.verification_status || 'pending'
}

export default function MyDocuments() {
  const navigate = useNavigate()
  const profileInputRef = useRef(null)
  const [documents, setDocuments] = useState([])
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploadingType, setUploadingType] = useState('')
  const [toast, setToast] = useState(null)
  const approvalStatus = getRiderApprovalStatus()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchDocs = async () => {
    try {
      const [docsRes, profileRes] = await Promise.all([
        getDocuments(),
        getProfile(),
      ])

      const docs = docsRes.data?.data?.documents || docsRes.data?.documents || []
      setDocuments(Array.isArray(docs) ? docs : [])

      const profile = profileRes.data?.data ?? profileRes.data
      setAvatarUrl(profile?.user?.avatar_url || null)
    } catch (err) {
      console.error(err)
      showToast('Could not load your documents. Pull to refresh or try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  const getDoc = (type) => documents.find((doc) => doc.document_type === type)

  const handleUpload = async (file, documentType) => {
    if (!file) return

    const config = documentType === 'profile_photo'
      ? { label: 'Profile photo', maxBytes: MAX_PROFILE_IMAGE_BYTES }
      : { label: 'Document', maxBytes: MAX_DOCUMENT_IMAGE_BYTES }

    const validationError = validateImageFile(file, config)
    if (validationError) {
      showToast(validationError, 'error')
      return
    }

    setUploadingType(documentType)

    try {
      if (documentType === 'profile_photo') {
        await uploadRiderAvatar(file)
      } else {
        const formData = new FormData()
        formData.append('document', file)
        formData.append('document_type', documentType)
        await uploadDocument(formData)
      }

      showToast('Uploaded successfully. Our team will review it shortly.')
      await fetchDocs()
    } catch (err) {
      showToast(err.response?.data?.message || 'Upload failed. Please try again.', 'error')
    } finally {
      setUploadingType('')
    }
  }

  const requiredUploaded = REQUIRED_DOCS.every((doc) => getDoc(doc.type))
  const allPendingReview = REQUIRED_DOCS.every((doc) => {
    const status = getDocStatus(getDoc(doc.type))
    return status === 'pending' || status === 'approved'
  })

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col relative">

      {toast && (
        <div
          className={`absolute top-0 left-5 right-5 mt-4 p-3 rounded-xl text-sm font-bold text-white z-50 ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="sticky top-0 z-40 bg-white px-5 pt-12 pb-4 flex items-center justify-between">
        <button type="button" onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <p className="font-black text-gray-900">My Documents</p>
        <div className="w-9" />
      </div>

      <div className="px-5 flex-1 flex flex-col gap-5 pb-8">

        {approvalStatus === 'pending' && (
          <div className="rounded-2xl p-4 flex gap-3" style={{ background: 'rgba(91,91,255,0.06)' }}>
            <Clock size={18} className="text-[#5B5BFF] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-gray-900 text-sm">Application under review</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Upload your government ID and selfie below. An admin must approve them before you can go online.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => profileInputRef.current?.click()}
            disabled={uploadingType === 'profile_photo'}
            className="relative"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}
              >
                <User size={32} className="text-white" />
              </div>
            )}
            <span
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center shadow-md"
              style={{ background: '#5B5BFF' }}
            >
              {uploadingType === 'profile_photo' ? (
                <Loader2 size={12} className="text-white animate-spin" />
              ) : (
                <Camera size={12} className="text-white" />
              )}
            </span>
          </button>
          <input
            ref={profileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) handleUpload(file, 'profile_photo')
            }}
          />
          <div className="text-center">
            <h2 className="font-black text-gray-900 text-base">Verification Documents</h2>
            <p className="text-xs text-gray-400 mt-0.5">Upload or re-upload your identity documents.</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} className="text-gray-400" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Required Documents</p>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-8">
              <Loader2 size={24} className="mx-auto animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {REQUIRED_DOCS.map((docConfig) => {
                const doc = getDoc(docConfig.type)
                const status = getDocStatus(doc)
                const statusMeta = STATUS_META[status] || STATUS_META.missing
                const StatusIcon = statusMeta.icon
                const isUploading = uploadingType === docConfig.type

                return (
                  <div
                    key={docConfig.type}
                    className={`rounded-2xl border-2 px-4 py-4 transition-all ${
                      status === 'approved'
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : status === 'missing' || status === 'rejected'
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-[#5B5BFF]/30 bg-[#F5F5FF]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{docConfig.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{docConfig.description}</p>
                        <div className={`flex items-center gap-1.5 mt-2 ${statusMeta.className}`}>
                          <StatusIcon size={13} />
                          <span className="text-[10px] font-bold uppercase tracking-wide">{statusMeta.label}</span>
                        </div>
                        {doc?.document_url ? (
                          <a
                            href={doc.document_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-2 text-xs font-semibold text-[#5B5BFF] hover:underline"
                          >
                            View uploaded file
                          </a>
                        ) : null}
                      </div>

                      <label className="cursor-pointer shrink-0">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif"
                          className="hidden"
                          disabled={isUploading}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            e.target.value = ''
                            if (file) handleUpload(file, docConfig.type)
                          }}
                        />
                        <span
                          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white"
                          style={{ background: isUploading ? '#9CA3AF' : '#5B5BFF' }}
                        >
                          {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
                          {doc ? 'Replace' : 'Upload'}
                        </span>
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-start gap-3 bg-gray-50 rounded-2xl px-4 py-4">
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Documents are encrypted and used only for verification. Re-upload if a file was rejected or did not save during signup.
          </p>
        </div>

        {requiredUploaded && allPendingReview && approvalStatus === 'pending' && (
          <button
            type="button"
            onClick={() => navigate('/dispatch/pending')}
            className="w-full py-4 rounded-2xl text-white font-bold text-base"
            style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
          >
            Back to Application Status
          </button>
        )}
      </div>
    </div>
  )
}
