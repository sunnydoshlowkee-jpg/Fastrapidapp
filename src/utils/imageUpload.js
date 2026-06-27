export const MAX_PROFILE_IMAGE_BYTES = 2 * 1024 * 1024
export const MAX_DOCUMENT_IMAGE_BYTES = 5 * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

export function validateImageFile(file, { label = 'Image', maxBytes = MAX_PROFILE_IMAGE_BYTES } = {}) {
  if (!file) {
    return `${label} is required.`
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return `${label} must be a JPG, PNG, or GIF file.`
  }

  if (file.size > maxBytes) {
    const maxMb = Math.round(maxBytes / (1024 * 1024))
    return `${label} must be ${maxMb} MB or smaller.`
  }

  return ''
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Could not read the selected file.'))
    reader.readAsDataURL(file)
  })
}

export async function dataUrlToFile(dataUrl, filename) {
  const response = await fetch(dataUrl)
  const blob = await response.blob()

  return new File([blob], filename, { type: blob.type || 'image/jpeg' })
}
