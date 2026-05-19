import { useRef, useState } from 'react'
import { Download, FileSpreadsheet, UploadCloud } from 'lucide-react'

export default function MerchantMenuUploadCsvCard({ csvUpload, onUpload, onDownloadTemplate }) {
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
    <article className="flex h-full flex-col rounded-merchant-stat bg-merchant-surface p-6 shadow-merchant-stat md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-merchant-nav-active text-merchant-primary">
        <FileSpreadsheet size={24} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-bold text-merchant-ink">{csvUpload.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-merchant-muted">{csvUpload.description}</p>

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
        className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 transition-colors ${
          dragOver
            ? 'border-merchant-primary bg-merchant-nav-active/50'
            : 'border-merchant-divider bg-merchant-canvas hover:border-merchant-primary/40'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <UploadCloud size={32} className="text-merchant-muted" strokeWidth={1.5} aria-hidden />
        <p className="mt-3 text-center text-sm text-merchant-muted">
          {csvUpload.dropzoneHint}{' '}
          <span className="font-semibold text-merchant-primary">{csvUpload.browseLabel}</span>
        </p>
        {fileName && (
          <p className="mt-2 text-xs font-medium text-merchant-ink">Selected: {fileName}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="mt-4 w-full rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
      >
        {csvUpload.uploadLabel}
      </button>

      <button
        type="button"
        onClick={onDownloadTemplate}
        className="mt-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-merchant-primary hover:text-[#3837e6]"
      >
        <Download size={16} strokeWidth={2} aria-hidden />
        {csvUpload.templateLabel}
      </button>
    </article>
  )
}
