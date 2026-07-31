import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { uploadProfileAvatar } from '../services/authService'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'
import { setCached } from '../utils/requestCache'

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/pjpeg', 'image/x-png']
const ACCEPTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']
const UPLOAD_TIMEOUT_MS = 60_000
const AUTH_USER_CACHE_KEY = 'auth-user'

function clearPreview(previewUrlRef) {
  if (previewUrlRef.current) {
    URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = null
  }
}

function extensionOf(file) {
  const name = String(file?.name || '')
  const parts = name.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}

function isAcceptedAvatar(file) {
  const type = String(file?.type || '').toLowerCase()
  const ext = extensionOf(file)

  if (type && ACCEPTED_AVATAR_TYPES.includes(type)) return true
  // Android camera/gallery sometimes omits MIME type.
  if (!type && ACCEPTED_EXTENSIONS.includes(ext)) return true
  if (type.startsWith('image/') && ACCEPTED_EXTENSIONS.includes(ext)) return true
  return false
}

function normalizeAvatarFile(file) {
  const type = String(file?.type || '').toLowerCase()
  if (type && type !== 'image/jpg') return file

  const ext = extensionOf(file) || 'jpg'
  const mime = ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif' : 'image/jpeg'
  return new File([file], file.name || `avatar.${ext}`, { type: mime, lastModified: file.lastModified })
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
    const rawFile = event.target.files?.[0]
    event.target.value = ''

    if (!rawFile) return

    clearError()

    if (!isAcceptedAvatar(rawFile)) {
      setError('Profile photo must be a JPG, GIF, or PNG file.')
      return
    }

    if (rawFile.size > MAX_AVATAR_SIZE_BYTES) {
      setError('Profile photo must be 2 MB or smaller.')
      return
    }

    const file = normalizeAvatarFile(rawFile)

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
        const refreshed = await refreshUser({ background: false }).catch(() => null)
        setAvatarUrl(resolveStorageUrl(refreshed?.avatar_url || user?.avatar_url))
      }
    } catch (err) {
      clearPreview(previewUrlRef)
      setAvatarUrl(resolveStorageUrl(user?.avatar_url))
      const message = err?.message === 'Upload timed out. Check your connection and try again.'
        ? err.message
        : getApiFieldError(err, 'avatar') || err?.response?.data?.message || 'Could not upload profile photo. Try again.'
      setError(message)
    } finally {
      setUploading(false)
    }
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
