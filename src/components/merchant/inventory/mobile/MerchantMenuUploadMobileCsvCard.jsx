import { useRef, useState } from 'react'
import { Download, FileSpreadsheet, Upload, UploadCloud } from 'lucide-react'

export default function MerchantMenuUploadMobileCsvCard({
  csvUpload,
  mobileCsv,
  onUpload,
  onDownloadTemplate,
}) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = (files) => {
    const file = files?.[0]
    if (file) setFileName(file.name)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
          <FileSpreadsheet size={20} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-merchant-ink">{csvUpload.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">{csvUpload.description}</p>
        </div>
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 transition-colors ${
          dragOver
            ? 'border-merchant-primary bg-merchant-nav-active/50'
            : 'border-merchant-divider bg-merchant-canvas'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud size={28} className="text-merchant-muted" strokeWidth={1.5} aria-hidden />
        <p className="mt-2 text-center text-sm text-merchant-muted">
          {csvUpload.dropzoneHint}{' '}
          <span className="font-semibold text-merchant-primary">{csvUpload.browseLabel}</span>
        </p>
        <p className="mt-1 text-xs text-merchant-muted">{mobileCsv.dropzoneSubtext}</p>
        {fileName && (
          <p className="mt-2 text-xs font-medium text-merchant-ink">Selected: {fileName}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
      >
        <Upload size={18} strokeWidth={2} aria-hidden />
        {mobileCsv.uploadLabel}
      </button>

      <button
        type="button"
        onClick={onDownloadTemplate}
        className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-semibold text-merchant-primary hover:text-[#3837e6]"
      >
        <Download size={16} strokeWidth={2} aria-hidden />
        {mobileCsv.templateLabel}
      </button>
    </article>
  )
}
