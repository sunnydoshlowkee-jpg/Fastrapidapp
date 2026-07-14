import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { uploadProfileAvatar } from '../services/authService'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'
import { setCached } from '../utils/requestCache'

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/gif']
const UPLOAD_TIMEOUT_MS = 60_000
const AUTH_USER_CACHE_KEY = 'auth-user'

function clearPreview(previewUrlRef) {
  if (previewUrlRef.current) {
    URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = null
  }
}

async function uploadWithTimeout(file) {
  return Promise.race([
    uploadProfileAvatar(file),
    new Promise((_, reject) => {
      window.setTimeout(
        () => reject(new Error('Upload timed out. Check your connection and try again.')),
        UPLOAD_TIMEOUT_MS,
      )
    }),
  ])
}

export function useProfileAvatarUpload() {
  const fileInputRef = useRef(null)
  const previewUrlRef = useRef(null)
  const { user, refreshUser, setUser } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (previewUrlRef.current) return
    setAvatarUrl(resolveStorageUrl(user?.avatar_url))
  }, [user?.avatar_url])

  useEffect(() => () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const clearError = () => {
    if (error) setError('')
  }

  const openFilePicker = () => {
    if (!uploading) fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    clearError()

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      setError('Profile photo must be a JPG, GIF, or PNG file.')
      return
    }

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      setError('Profile photo must be 2 MB or smaller.')
      return
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }

    const preview = URL.createObjectURL(file)
    previewUrlRef.current = preview
    setAvatarUrl(preview)

    setUploading(true)
    try {
      const { data } = await uploadWithTimeout(file)
      const updatedUser = data?.data?.user
      clearPreview(previewUrlRef)

      if (updatedUser) {
        setUser(updatedUser)
        setCached(AUTH_USER_CACHE_KEY, updatedUser)
        setAvatarUrl(resolveStorageUrl(updatedUser.avatar_url))
      } else {
        setAvatarUrl(resolveStorageUrl(user?.avatar_url))
      }
    } catch (err) {
      clearPreview(previewUrlRef)
      setAvatarUrl(resolveStorageUrl(user?.avatar_url))
      const message = err?.message === 'Upload timed out. Check your connection and try again.'
        ? err.message
        : getApiFieldError(err, 'avatar') || 'Could not upload profile photo. Try again.'
      setError(message)
    } finally {
      setUploading(false)
    }

    refreshUser().catch(() => {})
  }

  return {
    avatarUrl,
    uploading,
    error,
    fileInputRef,
    openFilePicker,
    handleFileChange,
    clearError,
  }
}
