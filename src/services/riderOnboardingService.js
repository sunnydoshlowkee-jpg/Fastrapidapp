import { uploadProfileAvatar } from './authService'
import api from './api'
import { dataUrlToFile } from '../utils/imageUpload'

export const RIDER_IDENTITY_STORAGE_KEY = 'rider_reg_identity'

const IDENTITY_FIELDS = {
  govId: 'government_id',
  selfie: 'selfie',
  profilePhoto: 'profile_photo',
}

export function getStoredRiderIdentity() {
  try {
    const raw = sessionStorage.getItem(RIDER_IDENTITY_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function storeRiderIdentityField(field, payload) {
  const current = getStoredRiderIdentity()
  current[field] = payload
  sessionStorage.setItem(RIDER_IDENTITY_STORAGE_KEY, JSON.stringify(current))
}

export function clearStoredRiderIdentity() {
  sessionStorage.removeItem(RIDER_IDENTITY_STORAGE_KEY)
}

export async function uploadRiderDocument(documentType, file) {
  const formData = new FormData()
  formData.append('document_type', documentType)
  formData.append('document', file)

  return api.post('/rider/documents', formData)
}

export async function uploadStoredRiderIdentityAssets() {
  const stored = getStoredRiderIdentity()
  const uploads = []

  if (stored.profilePhoto?.dataUrl) {
    const file = await dataUrlToFile(
      stored.profilePhoto.dataUrl,
      stored.profilePhoto.name || 'profile-photo.jpg',
    )
    uploads.push(uploadProfileAvatar(file))
  }

  if (stored.govId?.dataUrl) {
    const file = await dataUrlToFile(stored.govId.dataUrl, stored.govId.name || 'government-id.jpg')
    uploads.push(uploadRiderDocument(IDENTITY_FIELDS.govId, file))
  }

  if (stored.selfie?.dataUrl) {
    const file = await dataUrlToFile(stored.selfie.dataUrl, stored.selfie.name || 'selfie.jpg')
    uploads.push(uploadRiderDocument(IDENTITY_FIELDS.selfie, file))
  }

  if (uploads.length === 0) {
    return
  }

  await Promise.all(uploads)
  clearStoredRiderIdentity()
}

export { IDENTITY_FIELDS }
