import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function AdminRoleEditorModal({
  isOpen,
  onClose,
  role = null,
  initialPermissions = [],
  groups = [],
  onSubmit,
}) {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [working, setWorking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    setName(role ? role.label : '')
    setSelected(new Set(initialPermissions || []))
    setError('')
  }, [isOpen, role, initialPermissions])

  if (!isOpen) return null

  const toggle = (permissionName) => {
    const next = new Set(selected)
    if (next.has(permissionName)) {
      next.delete(permissionName)
    } else {
      next.add(permissionName)
    }
    setSelected(next)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setWorking(true)
    setError('')
    try {
      await onSubmit({ name, permissions: [...selected] })
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save the role.')
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
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-gray-900">
            {role ? `Edit ${role.label}` : 'Create role'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex min-h-0 flex-1 flex-col">
          {error ? (
            <div role="alert" className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <label className="block shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Role name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. logistics_admin"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
            />
          </label>

          <p className="mt-4 shrink-0 text-xs font-bold uppercase tracking-wider text-gray-400">
            Permissions ({selected.size} selected)
          </p>

          <div className="mt-3 min-h-0 flex-1 space-y-5 overflow-y-auto pr-1">
            {groups.map((group) => (
              <div key={group.key}>
                <div className="flex items-center justify-between border-b border-gray-100 pb-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-600">{group.group}</p>
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-rapid-orange"
                    onClick={() => {
                      const next = new Set(selected)
                      const allHeld = group.permissions.every((p) => next.has(p.name))
                      group.permissions.forEach((p) => (allHeld ? next.delete(p.name) : next.add(p.name)))
                      setSelected(next)
                    }}
                  >
                    {group.permissions.every((p) => selected.has(p.name)) ? 'Clear all' : 'Select all'}
                  </button>
                </div>
                <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {group.permissions.map((p) => {
                    const checked = selected.has(p.name)
                    return (
                      <label
                        key={p.id}
                        className={`flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 transition-colors ${
                          checked ? 'border-orange-100 bg-orange-50' : 'border-gray-100 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(p.name)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-rapid-orange"
                        />
                        <span className="text-sm text-gray-800">{p.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
            {groups.length === 0 ? (
              <p className="text-sm text-gray-500">No permissions available.</p>
            ) : null}
          </div>

          <div className="mt-5 flex shrink-0 items-center justify-end gap-3 border-t border-gray-100 pt-4">
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
              {working ? 'Saving…' : 'Save role'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
