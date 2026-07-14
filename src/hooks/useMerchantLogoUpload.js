import { useEffect, useRef, useState } from 'react'
import { uploadMerchantBusinessLogo } from '../services/merchantBusinessProfileService'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'

const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024
const ACCEPTED_LOGO_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const UPLOAD_TIMEOUT_MS = 60_000

function clearPreview(previewUrlRef) {
  if (previewUrlRef.current) {
    URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = null
  }
}

async function uploadWithTimeout(file) {
  return Promise.race([
    uploadMerchantBusinessLogo(file),
    new Promise((_, reject) => {
      window.setTimeout(
        () => reject(new Error('Upload timed out. Check your connection and try again.')),
        UPLOAD_TIMEOUT_MS,
      )
    }),
  ])
}

export function useMerchantLogoUpload({ initialLogoUrl, onSuccess }) {
  const fileInputRef = useRef(null)
  const previewUrlRef = useRef(null)
  const [logoUrl, setLogoUrl] = useState(() => resolveStorageUrl(initialLogoUrl))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (previewUrlRef.current) return
    setLogoUrl(resolveStorageUrl(initialLogoUrl))
  }, [initialLogoUrl])

  useEffect(() => () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const openFilePicker = () => {
    if (!uploading) fileInputRef.current?.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (error) setError('')

    if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
      setError('Business logo must be a JPG, PNG, GIF, or WebP file.')
      return
    }

    if (file.size > MAX_LOGO_SIZE_BYTES) {
      setError('Business logo must be 5 MB or smaller.')
      return
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }

    const preview = URL.createObjectURL(file)
    previewUrlRef.current = preview
    setLogoUrl(preview)

    setUploading(true)
    try {
      const profile = await uploadWithTimeout(file)
      clearPreview(previewUrlRef)
      const nextLogoUrl = profile?.businessInfo?.logoUrl ?? profile?.mobile?.businessInfo?.logoUrl
      setLogoUrl(resolveStorageUrl(nextLogoUrl))
      onSuccess?.(profile)
    } catch (err) {
      clearPreview(previewUrlRef)
      setLogoUrl(resolveStorageUrl(initialLogoUrl))
      const message = err?.message === 'Upload timed out. Check your connection and try again.'
        ? err.message
        : getApiFieldError(err, 'logo') || 'Could not upload business logo. Try again.'
      setError(message)
    } finally {
      setUploading(false)
    }
  }

  return {
    logoUrl,
    uploading,
    error,
    fileInputRef,
    openFilePicker,
    handleFileChange,
  }
}
