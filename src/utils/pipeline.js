export function pipelineBasePath() {
  return typeof window !== 'undefined' &&
    String(window.location.pathname).startsWith('/pipeline-admin')
    ? '/pipeline-admin'
    : '/admin/pipeline'
}

export const PIPELINE_STAGES = [
  { key: 'signal', label: 'Signal', color: 'amber', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500', bgColor: '#FEF3C7', textColor: '#92400E' },
  { key: 'diagnosis', label: 'Diagnosis', color: 'blue', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500', bgColor: '#DBEAFE', textColor: '#1E40AF' },
  { key: 'solution', label: 'Solution', color: 'violet', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500', bgColor: '#EDE9FE', textColor: '#6D28D9' },
  { key: 'shipped', label: 'Shipped', color: 'emerald', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500', bgColor: '#D1FAE5', textColor: '#065F46' },
]

export const PIPELINE_TYPES = [
  { key: 'competitor_signal', label: 'Competitor Signal', color: 'rose', icon: 'Eye', bgColor: '#FFF1F2', textColor: '#9F1239' },
  { key: 'internal_update', label: 'Internal Update', color: 'sky', icon: 'RefreshCw', bgColor: '#E0F2FE', textColor: '#075985' },
  { key: 'document_push', label: 'Document Push', color: 'amber', icon: 'FileText', bgColor: '#FEF3C7', textColor: '#92400E' },
  { key: 'consultant_input', label: 'Consultant Input', color: 'violet', icon: 'Users', bgColor: '#EDE9FE', textColor: '#5B21B6' },
]

export function getStageConfig(key) {
  return PIPELINE_STAGES.find(s => s.key === key) || PIPELINE_STAGES[0]
}

export function getTypeConfig(key) {
  return PIPELINE_TYPES.find(t => t.key === key) || PIPELINE_TYPES[0]
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
