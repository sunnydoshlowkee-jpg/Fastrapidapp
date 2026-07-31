import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import MerchantBusinessProfileDocumentRow from './MerchantBusinessProfileDocumentRow'
import { merchantBusinessProfileCardClass } from './merchantBusinessProfileCardStyles'

export default function MerchantBusinessProfileDocuments({ documents, onUpload, onReupload }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const pendingType = documents.items.find((item) => !item.status)?.id || documents.items[0]?.id

  const handleUpload = async (file) => {
    if (!file || !pendingType || !onUpload) return
    setUploading(true)
    setError('')
    try {
      await onUpload(pendingType, file)
    } catch (err) {
      setError(err?.message || 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className={merchantBusinessProfileCardClass}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-merchant-ink lg:text-lg">{documents.title}</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-merchant-muted">
            {documents.description}
          </p>
          {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => handleUpload(e.target.files?.[0])}
        />
        <button
          type="button"
          disabled={uploading || !pendingType}
          onClick={() => inputRef.current?.click()}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-merchant-input px-4 py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile disabled:opacity-60"
        >
          <Upload size={16} strokeWidth={2} aria-hidden />
          {uploading ? 'Uploading…' : documents.uploadLabel}
        </button>
      </div>

      <ul className="mt-5 space-y-3 lg:mt-6">
        {documents.items.map((item) => (
          <MerchantBusinessProfileDocumentRow
            key={item.id}
            document={item}
            onReupload={onReupload}
          />
        ))}
      </ul>
    </section>
  )
}
