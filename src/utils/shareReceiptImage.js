function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function shareReceiptImage(blob, filename) {
  const file = new File([blob], filename, {
    type: 'image/png',
    lastModified: Date.now(),
  })

  if (typeof navigator.share === 'function') {
    const payloads = [
      { files: [file], title: 'FastRapid Transaction Receipt' },
      { files: [file] },
    ]

    for (const payload of payloads) {
      try {
        await navigator.share(payload)
        return { method: 'share' }
      } catch (err) {
        if (err?.name === 'AbortError') {
          throw err
        }
      }
    }
  }

  downloadBlob(blob, filename)
  return { method: 'download' }
}
