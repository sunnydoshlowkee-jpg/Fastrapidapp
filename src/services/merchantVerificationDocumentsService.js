import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchMerchantVerificationDocuments() {
  try {
    const { data } = await api.get('/merchant/documents')
    return data?.data?.documents ?? []
  } catch (err) {
    if (err.response?.status === 404) {
      return []
    }
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function uploadMerchantDocument(documentType, file) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post(`/merchant/documents/${documentType}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return data?.data?.document ?? null
  } catch (err) {
    const message = getApiFieldError(err, 'file')
    const error = new Error(message)
    error.code = 'UPLOAD_FAILED'
    throw error
  }
}

export async function deleteMerchantDocument(documentType) {
  try {
    await api.delete(`/merchant/documents/${documentType}`)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export function mapUploadedDocumentToFileState(document) {
  if (!document) return undefined

  const sizeLabel =
    document.file_size >= 1024 * 1024
      ? `${(document.file_size / (1024 * 1024)).toFixed(1)} MB`
      : document.file_size >= 1024
        ? `${(document.file_size / 1024).toFixed(1)} KB`
        : `${document.file_size || 0} B`

  return {
    name: document.file_name,
    meta: `Uploaded just now • ${sizeLabel}`,
    url: document.file_url,
  }
}
