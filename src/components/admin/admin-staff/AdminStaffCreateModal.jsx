import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { createAdminInvitation } from '../../../services/adminStaffService'

export default function AdminStaffCreateModal({
  isOpen,
  onClose,
  roles = [],
  onCreated,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!isOpen) return
    setName('')
    setEmail('')
    setRole('')
    setError('')
    setResult(null)
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setWorking(true)
    setError('')
    setResult(null)
    try {
      const res = await createAdminInvitation({ name, email, role })
      setResult(res)
      onCreated?.(res)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create the administrator.')
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
          <h2 className="text-base font-bold text-gray-900">Create Admin</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {result ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <p className="font-semibold">{result.message || 'Administrator invited.'}</p>
            <p className="mt-1 text-emerald-700/80">
              A secure one-time invitation link has been sent to {result.data?.admin?.email}. They will choose their own password and set up MFA.
            </p>
            {result.data?.dev_token ? (
              <div className="mt-2">
                <p className="text-xs font-semibold">Development-only invitation token (email not configured):</p>
                <code className="mt-1 block break-all rounded bg-white px-2 py-1 text-xs text-gray-800">{result.data.dev_token}</code>
              </div>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {error ? (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Doe"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jane@example.com"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
              />
            </label>
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
                {working ? 'Sending invitation…' : 'Send invitation'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}
