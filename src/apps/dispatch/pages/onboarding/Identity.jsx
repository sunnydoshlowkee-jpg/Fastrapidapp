import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, Camera, User, Info } from 'lucide-react'
import {
  getStoredRiderIdentity,
  storeRiderIdentityField,
} from '../../../../services/riderOnboardingService'
import {
  MAX_DOCUMENT_IMAGE_BYTES,
  MAX_PROFILE_IMAGE_BYTES,
  readFileAsDataUrl,
  validateImageFile,
} from '../../../../utils/imageUpload'

const FIELD_CONFIG = {
  govId: { label: 'Government ID', maxBytes: MAX_DOCUMENT_IMAGE_BYTES },
  selfie: { label: 'Selfie photo', maxBytes: MAX_DOCUMENT_IMAGE_BYTES },
  profilePhoto: { label: 'Profile photo', maxBytes: MAX_PROFILE_IMAGE_BYTES },
}

export default function RiderIdentity() {
  const navigate = useNavigate()
  const govIdInputRef = useRef(null)
  const selfieInputRef = useRef(null)
  const profilePhotoInputRef = useRef(null)

  const [govId, setGovId] = useState(null)
  const [selfie, setSelfie] = useState(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [savingField, setSavingField] = useState('')

  useEffect(() => {
    const stored = getStoredRiderIdentity()
    if (stored.govId) setGovId(stored.govId)
    if (stored.selfie) setSelfie(stored.selfie)
    if (stored.profilePhoto) setProfilePhoto(stored.profilePhoto)
  }, [])

  const isValid = Boolean(govId?.dataUrl && selfie?.dataUrl && profilePhoto?.dataUrl)

  const handleFileSelect = async (field, file) => {
    const config = FIELD_CONFIG[field]
    const validationError = validateImageFile(file, {
      label: config.label,
      maxBytes: config.maxBytes,
    })

    if (validationError) {
      setErrors((prev) => ({ ...prev, [field]: validationError }))
      return
    }

    setErrors((prev) => ({ ...prev, [field]: '' }))
    setFormError('')
    setSavingField(field)

    try {
      const dataUrl = await readFileAsDataUrl(file)
      const payload = {
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl,
      }

      storeRiderIdentityField(field, payload)

      if (field === 'govId') setGovId(payload)
      if (field === 'selfie') setSelfie(payload)
      if (field === 'profilePhoto') setProfilePhoto(payload)
    } catch {
      setErrors((prev) => ({
        ...prev,
        [field]: `Could not read ${config.label.toLowerCase()}. Try another file.`,
      }))
    } finally {
      setSavingField('')
    }
  }

  const handleContinue = () => {
    if (!isValid) {
      setFormError('Upload your government ID, selfie, and profile photo to continue.')
      return
    }

    navigate('/dispatch/onboarding/vehicle')
  }

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
        <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
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
        <div>
          <input
            ref={govIdInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) handleFileSelect('govId', file)
            }}
          />
          <button
            type="button"
            onClick={() => govIdInputRef.current?.click()}
            disabled={savingField === 'govId'}
            className="w-full text-left"
          >
            <div className={`rounded-2xl border-2 p-6 flex flex-col items-center gap-3 transition-all ${govId ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                {govId?.dataUrl ? (
                  <img src={govId.dataUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <BadgeCheck size={22} style={{ color: govId ? '#5B5BFF' : '#9CA3AF' }} />
                )}
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-sm">Government ID</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {savingField === 'govId' ? 'Saving…' : govId ? 'Uploaded ✓' : 'Tap to upload'}
                </p>
              </div>
            </div>
          </button>
          {errors.govId && <p className="mt-2 text-xs text-red-600">{errors.govId}</p>}
        </div>

        {/* Selfie Photo */}
        <div>
          <input
            ref={selfieInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            capture="user"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) handleFileSelect('selfie', file)
            }}
          />
          <button
            type="button"
            onClick={() => selfieInputRef.current?.click()}
            disabled={savingField === 'selfie'}
            className="w-full text-left"
          >
            <div className={`rounded-2xl border-2 p-6 flex flex-col items-center gap-3 transition-all ${selfie ? 'border-[#5B5BFF] bg-[#F5F5FF]' : 'border-gray-200 bg-gray-50'}`}>
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                {selfie?.dataUrl ? (
                  <img src={selfie.dataUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <Camera size={22} style={{ color: selfie ? '#5B5BFF' : '#9CA3AF' }} />
                )}
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-sm">Selfie Photo</p>
                <p className="text-gray-400 text-xs mt-0.5">
                  {savingField === 'selfie' ? 'Saving…' : selfie ? 'Captured ✓' : 'Look straight'}
                </p>
              </div>
            </div>
          </button>
          {errors.selfie && <p className="mt-2 text-xs text-red-600">{errors.selfie}</p>}
        </div>
      </div>

      {/* Profile Photo */}
      <div className="mb-8">
        <p className="font-bold text-gray-900 text-base mb-4">Profile Photo</p>
        <div className="flex flex-col items-center gap-3">
          <input
            ref={profilePhotoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ''
              if (file) handleFileSelect('profilePhoto', file)
            }}
          />
          <button
            type="button"
            onClick={() => profilePhotoInputRef.current?.click()}
            disabled={savingField === 'profilePhoto'}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
              {profilePhoto?.dataUrl ? (
                <img src={profilePhoto.dataUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <User size={36} className="text-gray-400" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, #5B5BFF, #4444EE)' }}>
              <Camera size={14} className="text-white" />
            </div>
          </button>
          <p className="text-gray-400 text-xs">
            {savingField === 'profilePhoto'
              ? 'Saving photo…'
              : 'JPG, PNG, or GIF up to 2 MB. Visible to customers.'}
          </p>
          {errors.profilePhoto && <p className="text-xs text-red-600">{errors.profilePhoto}</p>}
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

      {formError && (
        <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-600">
          {formError}
        </p>
      )}

      <div className="flex-1" />

      {/* Continue */}
      <button
        onClick={handleContinue}
        className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all active:opacity-80"
        style={{ background: 'linear-gradient(90deg, #5B5BFF, #4444EE)' }}
      >
        Continue
      </button>
    </div>
  )
}
