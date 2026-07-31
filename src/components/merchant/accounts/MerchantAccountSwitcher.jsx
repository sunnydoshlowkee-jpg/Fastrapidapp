import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftRight, Check, Plus, Store } from 'lucide-react'
import { removeMerchantAccount } from '../../../services/merchantAccountStore'
import {
  getMerchantAccountLabel,
  getStoredMerchantSession,
  listMerchantAccounts,
  merchantLogout,
  switchMerchantAccount,
} from '../../../services/merchantAuthService'

/**
 * Switch between signed-in merchant accounts or add another.
 */
export default function MerchantAccountSwitcher({
  compact = false,
  onClose,
  className = '',
}) {
  const navigate = useNavigate()
  const [busyId, setBusyId] = useState(null)
  const [error, setError] = useState('')
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => setVersion((value) => value + 1), [])

  // version bumps list after local remove
  void version
  const session = getStoredMerchantSession()
  const accounts = listMerchantAccounts()
  const activeUserId = session?.user?.id != null ? String(session.user.id) : null

  const handleSwitch = (userId) => {
    if (String(userId) === activeUserId) {
      onClose?.()
      return
    }

    setError('')
    setBusyId(String(userId))
    try {
      onClose?.()
      switchMerchantAccount(userId)
    } catch (err) {
      setBusyId(null)
      setError(err.message || 'Could not switch merchant.')
    }
  }

  const handleAdd = () => {
    onClose?.()
    navigate('/merchant/login?add=1')
  }

  const handleRemove = async (userId, event) => {
    event?.stopPropagation?.()
    setError('')
    setBusyId(`remove-${userId}`)
    try {
      const isActive = String(userId) === activeUserId
      if (isActive) {
        const { switchedTo } = await merchantLogout({ switchToRemaining: true })
        onClose?.()
        if (switchedTo) {
          window.location.assign('/merchant')
        } else {
          navigate('/merchant/login', { replace: true })
        }
        return
      }

      removeMerchantAccount(userId)
      setBusyId(null)
      refresh()
    } catch (err) {
      setBusyId(null)
      setError(err.message || 'Could not remove account.')
    }
  }

  if (compact) {
    return (
      <div className={className}>
        {accounts.length > 1 ? (
          <div className="border-t border-gray-100 py-1">
            <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-400">
              Switch merchant
            </p>
            {accounts.map((account) => {
              const id = String(account.user.id)
              const isActive = id === activeUserId
              const label = getMerchantAccountLabel(account.user)
              return (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  disabled={Boolean(busyId)}
                  onClick={() => handleSwitch(account.user.id)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                >
                  <Store size={16} className="shrink-0 text-merchant-primary" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                  {isActive ? <Check size={14} className="shrink-0 text-merchant-primary" /> : null}
                </button>
              )
            })}
          </div>
        ) : null}

        <button
          type="button"
          role="menuitem"
          onClick={handleAdd}
          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          <Plus size={16} className="text-merchant-primary" strokeWidth={1.75} />
          Add merchant
        </button>

        {error ? <p className="px-4 pb-2 text-xs text-red-600">{error}</p> : null}
      </div>
    )
  }

  return (
    <section className={`rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat sm:p-6 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-merchant-primary/10 text-merchant-primary">
          <ArrowLeftRight size={18} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-merchant-ink">Switch merchant</h2>
          <p className="mt-1 text-sm text-merchant-body">
            Stay signed in to multiple merchant accounts and switch between them anytime.
          </p>
        </div>
      </div>

      <ul className="mt-5 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
        {accounts.map((account) => {
          const id = String(account.user.id)
          const isActive = id === activeUserId
          const label = getMerchantAccountLabel(account.user)
          const email = account.user.email || ''
          const busy = busyId === id || busyId === `remove-${id}`

          return (
            <li key={id} className="flex items-center gap-3 bg-white px-4 py-3">
              <button
                type="button"
                disabled={busy || isActive}
                onClick={() => handleSwitch(account.user.id)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-default"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-merchant-primary">
                  <Store size={18} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-merchant-ink">{label}</p>
                  {email ? <p className="truncate text-xs text-merchant-muted">{email}</p> : null}
                </div>
                {isActive ? (
                  <span className="shrink-0 rounded-full bg-merchant-primary/10 px-2.5 py-1 text-[11px] font-semibold text-merchant-primary">
                    Active
                  </span>
                ) : (
                  <span className="shrink-0 text-xs font-medium text-merchant-link">Switch</span>
                )}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={(event) => handleRemove(account.user.id, event)}
                className="shrink-0 text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                {isActive ? 'Sign out' : 'Remove'}
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-merchant-field-border bg-white px-4 py-3 text-sm font-semibold text-merchant-primary hover:bg-merchant-primary/5"
      >
        <Plus size={16} strokeWidth={1.75} />
        Add merchant account
      </button>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </section>
  )
}
