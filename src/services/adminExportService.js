import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

async function downloadAdminCsv(path, params = {}, fallbackName = 'export.csv') {
  try {
    const response = await api.get(path, {
      params,
      responseType: 'blob',
    })

    const disposition = response.headers?.['content-disposition'] || ''
    const match = /filename="?([^"]+)"?/i.exec(disposition)
    const filename = match?.[1] || fallbackName
    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not download export.')
  }
}

export function exportAdminTransactionsCsv({
  search = '',
  audience = 'all',
  status = 'all',
  type = 'all',
} = {}) {
  return downloadAdminCsv(
    '/admin/transactions/export',
    {
      search: search.trim() || undefined,
      audience,
      status,
      type,
    },
    'admin-transactions.csv',
  )
}

export function exportAdminOrdersCsv({ search = '', status = 'all' } = {}) {
  return downloadAdminCsv(
    '/admin/orders/export',
    {
      search: search.trim() || undefined,
      status,
    },
    'admin-orders.csv',
  )
}
