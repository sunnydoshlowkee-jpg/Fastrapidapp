import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { uploadProfileAvatar } from '../services/authService'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/gif']

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
      const { data } = await uploadProfileAvatar(file)
      const updatedUser = data?.data?.user
      if (updatedUser) {
        setUser(updatedUser)
        setAvatarUrl(resolveStorageUrl(updatedUser.avatar_url))
      }
      await refreshUser()
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = null
      }
    } catch (err) {
      setAvatarUrl(resolveStorageUrl(user?.avatar_url))
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = null
      }
      setError(getApiFieldError(err, 'avatar') || 'Could not upload profile photo. Try again.')
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
