import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import {
  changeAdminRole,
  deleteAdmin,
  resendAdminInvitation,
  setAdminStatus,
  updateAdminProfile,
} from '../../../services/adminStaffService'

const ACTION_META = {
  edit: {
    title: 'Edit administrator',
    tone: 'primary',
  },
  role: {
    title: 'Change role',
    tone: 'primary',
  },
  suspend: {
    title: 'Suspend administrator',
    description: 'Suspend this administrator? They will not be able to sign in until activated again.',
    confirmLabel: 'Suspend',
    tone: 'danger',
  },
  activate: {
    title: 'Activate administrator',
    description: 'Activate this administrator? They will regain access immediately.',
    confirmLabel: 'Activate',
    tone: 'primary',
  },
  deactivate: {
    title: 'Deactivate administrator',
    description: 'Deactivate this administrator? This is a permanent action that preserves audit history.',
    confirmLabel: 'Deactivate',
    tone: 'danger',
  },
  resend: {
    title: 'Resend invitation',
    description: 'Send a new invitation email to this pending administrator? Their previous invitation will be cancelled.',
    confirmLabel: 'Resend invitation',
    tone: 'primary',
  },
  delete: {
    title: 'Delete administrator',
    description: 'Permanently delete this administrator account and revoke their access? This cannot be undone.',
    confirmLabel: 'Delete admin',
    tone: 'danger',
  },
}

export default function AdminStaffActionsModal({
  isOpen,
  onClose,
  action,
  admin,
  roles = [],
  onSuccess,
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')
  const [devToken, setDevToken] = useState('')
  const [resultMessage, setResultMessage] = useState('')

  useEffect(() => {
    if (!isOpen || !admin) return
    setName(admin.name || '')
    setPhone(admin.phone || '')
    setRole(admin.role || '')
    setError('')
    setDevToken('')
    setResultMessage('')
  }, [isOpen, admin])

  if (!isOpen || !admin) return null
  const meta = ACTION_META[action] || {}

  const isForm = action === 'edit' || action === 'role'

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setWorking(true)
    setError('')
    try {
      if (action === 'edit') {
        await updateAdminProfile(admin.id, { name, phone })
        setResultMessage('Administrator updated.')
      } else if (action === 'role') {
        await changeAdminRole(admin.id, role)
        setResultMessage('Administrator role updated.')
      } else if (action === 'suspend') {
        await setAdminStatus(admin.id, 'suspend')
        setResultMessage('Administrator suspended.')
      } else if (action === 'activate') {
        await setAdminStatus(admin.id, 'activate')
        setResultMessage('Administrator activated.')
      } else if (action === 'deactivate') {
        await setAdminStatus(admin.id, 'deactivate')
        setResultMessage('Administrator deactivated.')
      } else if (action === 'resend') {
        const res = await resendAdminInvitation(admin.id)
        setResultMessage('Invitation resent.')
        if (res?.data?.dev_token) setDevToken(res.data.dev_token)
      } else if (action === 'delete') {
        await deleteAdmin(admin.id)
        setResultMessage('Administrator deleted.')
      }
      onSuccess?.()
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to complete the action.')
    } finally {
      setWorking(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/50"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-gray-900">{meta.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {resultMessage ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {resultMessage}
            {devToken ? (
              <div className="mt-2">
                <p className="text-xs font-semibold text-emerald-700">Development-only invitation token (email not configured):</p>
                <code className="mt-1 block break-all rounded bg-white px-2 py-1 text-xs text-gray-800">{devToken}</code>
              </div>
            ) : null}
          </div>
        ) : null}
        {error ? (
          <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!resultMessage ? (
          isForm ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {action === 'edit' ? (
                <>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Full name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Phone number</span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
                    />
                  </label>
                </>
              ) : (
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Role</span>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
                  >
                    <option value="" disabled>Select a role…</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.name}>{r.label}</option>
                    ))}
                  </select>
                </label>
              )}
              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={working}
                  className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#E84A15] disabled:opacity-60"
                >
                  {working ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="mt-3 text-sm text-gray-600">{meta.description}</p>
              <div className="mt-4 rounded-lg bg-gray-50 px-4 py-3">
                <p className="text-sm font-bold text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={working}
                  className={`rounded-lg px-4 py-2 text-sm font-bold text-white transition-colors disabled:opacity-60 ${
                    meta.tone === 'danger'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-rapid-orange hover:bg-[#E84A15]'
                  }`}
                >
                  {working ? 'Working…' : meta.confirmLabel}
                </button>
              </div>
            </>
          )
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            Done
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}
