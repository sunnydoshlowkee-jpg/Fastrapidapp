import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle2, User } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { updateProfile, uploadProfileAvatar } from '../../../services/authService'
import { getApiFieldError } from '../../../utils/apiErrors'
import { formatPhoneDisplay, getDisplayName } from '../../../utils/userDisplay'

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const fieldClass = (hasError) =>
  `w-full bg-[#F4F5F7] rounded-2xl p-4 text-[13px] md:text-[15px] text-gray-900 font-medium outline-none transition-all ${
    hasError ? 'ring-2 ring-red-500 bg-red-50/30' : 'focus:ring-2 focus:ring-[#4F46E5]'
  }`

function ProfileAvatar({
  avatarUrl,
  fallbackLetter,
  sizeClass,
  buttonSizeClass,
  iconSize,
  uploading,
  onPickPhoto,
}) {
  return (
    <div className={`relative ${sizeClass}`}>
      <button
        type="button"
        onClick={onPickPhoto}
        disabled={uploading}
        className={`${sizeClass} rounded-full overflow-hidden border-4 border-white shadow-sm flex items-center justify-center bg-[#4F46E5] disabled:opacity-70`}
        aria-label="Upload profile photo"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-3xl md:text-5xl font-bold text-white">
            {fallbackLetter}
          </span>
        )}
      </button>
      <button
        type="button"
        onClick={onPickPhoto}
        disabled={uploading}
        className={`absolute ${buttonSizeClass} bg-[#4F46E5] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm disabled:opacity-70`}
        aria-label="Upload profile photo"
      >
        <Camera size={iconSize} />
      </button>
    </div>
  )
}

export default function EditProfile() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const previewUrlRef = useRef(null)
  const { user, loading, refreshUser, setUser } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  useEffect(() => {
    if (!loading && !localStorage.getItem('rapid_token')) {
      navigate('/auth/login', { replace: true })
    }
  }, [loading, navigate])

  useEffect(() => {
    if (!user) return
    setFirstName(user.first_name || '')
    setLastName(user.last_name || '')
    setEmail(user.email || '')
    setAvatarUrl(user.avatar_url || null)
  }, [user])

  useEffect(() => () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    clearError('avatar')

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: 'Profile photo must be a JPG, GIF, or PNG file.',
      }))
      return
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        avatar: 'Profile photo must be 2 MB or smaller.',
      }))
      return
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }

    const preview = URL.createObjectURL(file)
    previewUrlRef.current = preview
    setAvatarUrl(preview)

    setUploadingAvatar(true)
    try {
      const { data } = await uploadProfileAvatar(file)
      const updatedUser = data?.data?.user
      if (updatedUser) {
        setUser(updatedUser)
        setAvatarUrl(updatedUser.avatar_url || null)
      }
      await refreshUser()
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = null
      }
    } catch (err) {
      setAvatarUrl(user?.avatar_url || null)
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = null
      }
      setErrors((prev) => ({
        ...prev,
        avatar: getApiFieldError(err, 'avatar') || 'Could not upload profile photo. Try again.',
      }))
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleSave = async () => {
    setErrors({})

    const nextErrors = {}
    if (!firstName.trim()) nextErrors.first_name = 'First name is required.'
    if (!lastName.trim()) nextErrors.last_name = 'Last name is required.'
    if (!email.trim()) nextErrors.email = 'Email address is required.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setSaving(true)
    try {
      const { data } = await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        gender: user?.gender ?? undefined,
        date_of_birth: user?.date_of_birth ?? undefined,
      })
      const updatedUser = data?.data?.user
      if (updatedUser) setUser(updatedUser)
      await refreshUser()
      navigate('/app/profile')
    } catch (err) {
      const apiErrors = err.response?.data?.errors
      if (apiErrors) {
        const mapped = {}
        Object.keys(apiErrors).forEach((key) => {
          mapped[key] = apiErrors[key][0]
        })
        setErrors(mapped)
      } else {
        setErrors({ form: getApiFieldError(err, 'form') })
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] text-gray-500">
        Loading profile…
      </div>
    )
  }

  const displayPhone = formatPhoneDisplay(user?.phone)
  const fallbackLetter = (firstName?.[0] || email?.[0] || '?').toUpperCase()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12 relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
        onChange={handleAvatarChange}
      />

      <div className="md:hidden flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">Edit Profile</h1>
        </div>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-6 flex flex-col items-center">
        <div className="mb-6">
          <ProfileAvatar
            avatarUrl={avatarUrl}
            fallbackLetter={fallbackLetter}
            sizeClass="w-24 h-24"
            buttonSizeClass="w-8 h-8 bottom-0 right-0"
            iconSize={14}
            uploading={uploadingAvatar}
            onPickPhoto={openFilePicker}
          />
          <p className="mt-3 text-center text-[11px] text-gray-500">
            {uploadingAvatar ? 'Uploading photo…' : 'JPG, GIF or PNG. Max size 2MB'}
          </p>
          {errors.avatar ? (
            <p className="mt-2 text-center text-sm text-red-600" role="alert">{errors.avatar}</p>
          ) : null}
        </div>

        {errors.form ? (
          <p className="w-full text-sm text-red-600 mb-4" role="alert">{errors.form}</p>
        ) : null}

        <div className="w-full flex flex-col gap-6 mb-8">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); clearError('first_name') }}
              className={fieldClass(errors.first_name)}
            />
            {errors.first_name ? <p className="mt-1 text-sm text-red-600">{errors.first_name}</p> : null}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); clearError('last_name') }}
              className={fieldClass(errors.last_name)}
            />
            {errors.last_name ? <p className="mt-1 text-sm text-red-600">{errors.last_name}</p> : null}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email') }}
              className={fieldClass(errors.email)}
            />
            {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">Phone</label>
            <div className="relative flex items-center">
              <input
                type="tel"
                value={displayPhone}
                readOnly
                className="w-full bg-[#F4F5F7] rounded-2xl p-4 pr-12 text-[13px] text-gray-900 font-medium outline-none"
              />
              <div className="absolute right-4 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={12} strokeWidth={4} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Account Security</h3>
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
            Your phone number is verified. Changes to your primary email address may require a one-time verification code for your security.
          </p>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent pb-safe z-40">
        <div className="w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploadingAvatar}
            className="w-full bg-[#4F46E5] disabled:opacity-60 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <button type="button" onClick={() => navigate(-1)} className="mr-6 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[32px] font-bold text-gray-900">Edit profile</h1>
      </div>

      <div className="hidden md:flex flex-1 w-full mx-auto pb-12 px-10 pt-10">
        <div className="w-full max-w-[800px]">
          {errors.form ? (
            <p className="text-sm text-red-600 mb-6" role="alert">{errors.form}</p>
          ) : null}

          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-12 mb-8">
            <div className="flex flex-col items-center mb-12">
              <ProfileAvatar
                avatarUrl={avatarUrl}
                fallbackLetter={fallbackLetter}
                sizeClass="w-32 h-32"
                buttonSizeClass="w-10 h-10 bottom-2 right-2 border-[3px]"
                iconSize={18}
                uploading={uploadingAvatar}
                onPickPhoto={openFilePicker}
              />
              <h3 className="font-bold text-gray-900 text-[18px] mb-1 mt-4">{getDisplayName(user) || 'Your profile'}</h3>
              <p className="text-[13px] text-gray-500">
                {uploadingAvatar ? 'Uploading photo…' : 'JPG, GIF or PNG. Max size 2MB'}
              </p>
              {errors.avatar ? (
                <p className="mt-2 text-sm text-red-600" role="alert">{errors.avatar}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); clearError('first_name') }}
                    className={`w-full bg-[#F4F5F7] border rounded-xl py-4 pl-12 pr-4 text-[15px] font-medium outline-none transition-all ${
                      errors.first_name ? 'border-red-500' : 'border-transparent focus:border-[#2D2AEE] focus:bg-white'
                    }`}
                  />
                </div>
                {errors.first_name ? <p className="mt-1 text-sm text-red-600">{errors.first_name}</p> : null}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => { setLastName(e.target.value); clearError('last_name') }}
                  className={`w-full bg-[#F4F5F7] border rounded-xl py-4 px-4 text-[15px] font-medium outline-none transition-all ${
                    errors.last_name ? 'border-red-500' : 'border-transparent focus:border-[#2D2AEE] focus:bg-white'
                  }`}
                />
                {errors.last_name ? <p className="mt-1 text-sm text-red-600">{errors.last_name}</p> : null}
              </div>

              <div className="col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                  className={`w-full bg-[#F4F5F7] border rounded-xl py-4 px-4 text-[15px] font-medium outline-none transition-all ${
                    errors.email ? 'border-red-500' : 'border-transparent focus:border-[#2D2AEE] focus:bg-white'
                  }`}
                />
                {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
              </div>

              <div className="col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={displayPhone}
                    readOnly
                    className="w-full bg-[#F4F5F7] rounded-xl py-4 px-4 pr-28 text-[15px] font-medium outline-none"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-green-50 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} strokeWidth={3} /> Verified
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate('/app/profile')}
              className="bg-[#F4F5F7] text-gray-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-200 transition-colors text-[15px]"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || uploadingAvatar}
              className="bg-[#2D2AEE] disabled:opacity-60 text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-[15px] flex items-center gap-2"
            >
              {saving ? 'Saving…' : 'Save Changes'} <CheckCircle2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
