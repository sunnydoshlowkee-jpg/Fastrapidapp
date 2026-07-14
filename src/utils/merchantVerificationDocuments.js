export function formatDocumentFileSize(bytes) {
  if (!bytes || bytes < 1024) return `${bytes || 0} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/**
 * @param {Array} templates - UI config from mock
 * @param {Array<{ document_type: string, file_name: string, file_size: number, file_url?: string }>} serverDocuments
 */
export function mergeVerificationDocumentTemplates(templates, serverDocuments = []) {
  const byType = Object.fromEntries(
    serverDocuments.map((doc) => [doc.document_type, doc]),
  )

  return templates.map((template) => {
    const saved = byType[template.id]
    if (!saved) {
      return { ...template, status: 'empty', file: undefined }
    }

    return {
      ...template,
      status: 'uploaded',
      file: {
        name: saved.file_name,
        meta: `On file • ${formatDocumentFileSize(saved.file_size)}`,
        url: saved.file_url,
      },
    }
  })
}
