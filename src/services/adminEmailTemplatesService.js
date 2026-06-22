import api from './api'

export async function fetchAdminEmailTemplates() {
  const { data } = await api.get('/admin/email-templates')
  return data?.data ?? []
}

export async function fetchAdminEmailTemplate(key) {
  const { data } = await api.get(`/admin/email-templates/${encodeURIComponent(key)}`)
  return data?.data ?? null
}

export async function saveAdminEmailTemplate(key, payload) {
  const { data } = await api.put(`/admin/email-templates/${encodeURIComponent(key)}`, payload)
  return data?.data ?? null
}

export async function createAdminEmailTemplate(payload) {
  const { data } = await api.post('/admin/email-templates', payload)
  return data?.data ?? null
}

export async function previewAdminEmailTemplate(key, { subject, html_body } = {}) {
  const { data } = await api.post(`/admin/email-templates/${encodeURIComponent(key)}/preview`, {
    subject,
    html_body,
  })
  return data?.data ?? null
}

export const AUDIENCE_LABELS = {
  all: 'All users',
  customer: 'Customers',
  merchant: 'Merchants',
  rider: 'Riders',
  admin: 'Admins',
}
