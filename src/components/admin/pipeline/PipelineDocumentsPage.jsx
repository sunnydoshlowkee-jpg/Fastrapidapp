import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, File, FileText, Image, Search } from 'lucide-react'
import pipelineService from '../../../services/adminPipelineService'
import BrandedLoader from '../../ui/BrandedLoader'

function getFileIcon(filename) {
  const ext = filename?.split('.').pop()?.toLowerCase()
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(ext)) return Image
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'csv', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)) return FileText
  return File
}

function formatFileSize(bytes) {
  if (!bytes && bytes !== 0) return '—'
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

function getFileExtension(filename) {
  return filename?.split('.').pop()?.toUpperCase() || '—'
}

export default function PipelineDocumentsPage() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await pipelineService.listItems({ per_page: 100 })
        const items = res.data.data || []
        const results = await Promise.allSettled(
          items.map((item) => pipelineService.getItem(item.id))
        )

        if (cancelled) return

        const rows = []
        results.forEach((result) => {
          if (result.status !== 'fulfilled') return
          const detail = result.value.data.data
          if (!detail) return
          const attachments = detail.attachments || []
          for (const att of attachments) {
            rows.push({
              id: att.id,
              filename: att.file_name || 'Untitled',
              url: att.file_url || att.file_path || '#',
              itemTitle: detail.title,
              itemId: detail.id,
              uploadedBy: att.uploaded_by || detail.owner?.name || '—',
              fileType: att.file_type || '',
              fileSize: att.file_size || 0,
              uploadDate: att.created_at || '',
            })
          }
        })

        rows.sort((a, b) => (b.uploadDate ? new Date(b.uploadDate) : 0) - (a.uploadDate ? new Date(a.uploadDate) : 0))
        setDocuments(rows)
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load documents.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return documents
    const q = search.toLowerCase()
    return documents.filter(
      (d) => d.filename.toLowerCase().includes(q) || d.itemTitle.toLowerCase().includes(q)
    )
  }, [documents, search])

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and search all files attached to pipeline items.
        </p>
      </header>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file name or item title…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100"
          />
        </div>
      </div>

      {loading ? (
        <BrandedLoader size="md" label="Loading documents…" />
      ) : error ? (
        <div className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">
          <File size={40} className="mx-auto text-gray-300" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-medium text-gray-500">
            {search ? 'No documents match your search.' : 'No documents found.'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">File Name</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Pipeline Item</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Uploaded By</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Type</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Size</th>
                  <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Upload Date</th>
                  <th className="w-12 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => {
                  const Icon = getFileIcon(doc.filename)
                  return (
                    <tr
                      key={`${doc.itemId}-${doc.id}`}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <Icon size={18} className="text-gray-500" strokeWidth={1.5} />
                          </div>
                          <span className="text-sm font-semibold text-gray-900 truncate max-w-[220px]">{doc.filename}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-700 max-w-[200px] truncate">{doc.itemTitle}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                          {getFileExtension(doc.filename)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-600">{formatFileSize(doc.fileSize)}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {doc.uploadDate
                          ? new Date(doc.uploadDate).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-rapid-orange"
                          aria-label={`Download ${doc.filename}`}
                        >
                          <ExternalLink size={16} strokeWidth={2} />
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <footer className="border-t border-gray-100 px-5 py-3">
            <p className="text-sm text-gray-500">{filtered.length} document{filtered.length !== 1 ? 's' : ''}</p>
          </footer>
        </div>
      )}
    </div>
  )
}