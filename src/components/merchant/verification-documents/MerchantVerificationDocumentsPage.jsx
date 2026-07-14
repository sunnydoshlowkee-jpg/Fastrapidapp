import { useCallback, useEffect, useState } from 'react'
import { MERCHANT_VERIFICATION_DOCUMENTS } from '../../../services/data/merchantVerificationDocuments.mock'
import {
  deleteMerchantDocument,
  fetchMerchantVerificationDocuments,
  mapUploadedDocumentToFileState,
  uploadMerchantDocument,
} from '../../../services/merchantVerificationDocumentsService'
import { mergeVerificationDocumentTemplates } from '../../../utils/merchantVerificationDocuments'
import MerchantVerificationDocumentsDesktop from './MerchantVerificationDocumentsDesktop'
import MerchantVerificationDocumentsMobile from './MerchantVerificationDocumentsMobile'

export default function MerchantVerificationDocumentsPage() {
  const [documents, setDocuments] = useState(MERCHANT_VERIFICATION_DOCUMENTS.documents)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const saved = await fetchMerchantVerificationDocuments()
        if (!cancelled) {
          setDocuments(
            mergeVerificationDocumentTemplates(
              MERCHANT_VERIFICATION_DOCUMENTS.documents,
              saved,
            ),
          )
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || 'Unable to load saved documents.')
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const handleUpload = useCallback(async (documentId, file) => {
    const saved = await uploadMerchantDocument(documentId, file)
    const fileState = mapUploadedDocumentToFileState(saved)

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? { ...doc, status: 'uploaded', file: fileState }
          : doc,
      ),
    )
  }, [])

  const handleRemove = useCallback(async (documentId) => {
    await deleteMerchantDocument(documentId)
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId ? { ...doc, status: 'empty', file: undefined } : doc,
      ),
    )
  }, [])

  const sharedProps = {
    data: MERCHANT_VERIFICATION_DOCUMENTS,
    documents,
    loadError,
    onUpload: handleUpload,
    onRemove: handleRemove,
  }

  return (
    <>
      <MerchantVerificationDocumentsMobile {...sharedProps} />
      <MerchantVerificationDocumentsDesktop {...sharedProps} />
    </>
  )
}
