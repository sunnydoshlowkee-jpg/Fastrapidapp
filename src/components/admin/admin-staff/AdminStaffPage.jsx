import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
} from 'lucide-react'
import {
  buildPaginationPages,
  fetchAdminStaff,
  formatAdminDate,
  formatPaginationSummary,
  mapAdminStaffFromApi,
} from '../../../services/adminStaffService'
import { fetchAdminRoles } from '../../../services/adminRolesService'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import AdminStaffStatusBadge from './AdminStaffStatusBadge'
import AdminStaffActionsModal from './AdminStaffActionsModal'
import AdminStaffCreateModal from './AdminStaffCreateModal'

const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'suspended', label: 'Suspended' },
  { id: 'deactivated', label: 'Deactivated' },
]

export default function AdminStaffPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(1)
  const [admins, setAdmins] = useState([])
  const [pagination, setPagination] = useState(null)
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionModal, setActionModal] = useState(null) // { action, admin }
  const [createOpen, setCreateOpen] = useState(false)
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [menuPos, setMenuPos] = useState(null)
  const menuTriggerRefs = useRef({})

  const loadRoles = useCallback(async () => {
    try {
      const result = await fetchAdminRoles()
      setRoles(result.roles.map((r) => ({ id: r.id, name: r.name, label: r.label })))
    } catch {
      setRoles([])
    }
  }, [])

  const loadAdmins = useCallback(async () => {
    if (!getAdminAuthToken()) {
      setError('Please sign in to view administrators.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await fetchAdminStaff({
        search,
        status: activeTab,
        role: roleFilter,
        page,
        perPage: 15,
      })
      setAdmins(result.admins.map(mapAdminStaffFromApi))
      setPagination(result.pagination)
    } catch (err) {
      setAdmins([])
      setPagination(null)
      setError(err.response?.data?.message || 'Unable to load administrators.')
    } finally {
      setLoading(false)
    }
  }, [activeTab, page, roleFilter, search])

  useEffect(() => {
    const timer = setTimeout(loadAdmins, search ? 300 : 0)
    return () => clearTimeout(timer)
  }, [loadAdmins])

  useEffect(() => {
    loadRoles()
  }, [loadRoles])

  const refresh = useCallback(() => {
    loadAdmins()
  }, [loadAdmins])

  const paginationMeta = useMemo(() => {
    if (!pagination) {
      return { pages: [1], activePage: 1, lastPage: 1, showingRange: '0 to 0', showingSuffix: '' }
    }
    const summary = formatPaginationSummary(pagination)
    return {
      pages: buildPaginationPages(pagination),
      activePage: pagination.current_page,
      lastPage: pagination.last_page,
      showingRange: summary.showingRange,
      showingSuffix: summary.showingSuffix,
    }
  }, [pagination])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setPage(1)
  }

  const closeMenu = () => {
    setMenuOpenId(null)
    setMenuPos(null)
  }

  const toggleMenu = (adminId) => {
    if (menuOpenId === adminId) {
      closeMenu()
      return
    }
    const button = menuTriggerRefs.current[adminId]
    const rect = button?.getBoundingClientRect()
    setMenuPos(rect ? { top: rect.bottom + 6, right: window.innerWidth - rect.right } : null)
    setMenuOpenId(adminId)
  }

  const openAction = (action, admin) => {
    setMenuOpenId(null)
    setMenuPos(null)
    setActionModal({ action, admin })
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col p-6">
      <header className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-bold text-gray-900">Admin Users</h1>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#E84A15]"
        >
          <Plus size={16} strokeWidth={2} aria-hidden />
          Create Admin
        </button>
      </header>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search by name or email…"
              className="w-full rounded-lg bg-gray-100 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-rapid-orange/30"
            />
          </div>
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value)
                setPage(1)
              }}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-rapid-orange/30"
            >
              <option value="">All roles</option>
              {roles.map((r) => (
                <option key={r.name} value={r.name}>{r.label}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
          </div>
        </div>

        <nav className="flex flex-wrap gap-6 border-b border-gray-200" aria-label="Admin status filters">
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`-mb-px border-b-2 pb-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-rapid-orange text-rapid-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {error ? (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Administrator</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Email</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Role</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Last Login</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Created</th>
                <th className="w-12 px-6 py-3" aria-label="Row actions" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    Loading administrators…
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    No administrators match this filter.
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50/40 last:border-0">
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/admins/${admin.id}`}
                        className="flex items-center gap-3 transition-opacity hover:opacity-90"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-rapid-orange">
                          {(admin.name || admin.email || '?')
                            .split(' ')
                            .filter(Boolean)
                            .map((p) => p[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                        <p className="text-sm font-bold text-gray-900 hover:text-rapid-orange">{admin.name}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{admin.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{admin.roleLabel}</td>
                    <td className="px-6 py-4">
                      <AdminStaffStatusBadge status={admin.status} label={admin.statusLabel} />
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{formatAdminDate(admin.lastLoginAt)}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">{formatAdminDate(admin.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          ref={(el) => {
                            menuTriggerRefs.current[admin.id] = el
                          }}
                          onClick={() => toggleMenu(admin.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                          aria-label={`Actions for ${admin.name}`}
                          aria-haspopup="menu"
                          aria-expanded={menuOpenId === admin.id}
                        >
                          <MoreVertical size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-700">{paginationMeta.showingRange}</span> {paginationMeta.showingSuffix}
        </p>
        <nav className="flex items-center gap-1.5" aria-label="Pagination">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 disabled:opacity-40"
            aria-label="Previous page"
            disabled={loading || page <= 1}
          >
            <ChevronLeft size={14} strokeWidth={2} />
          </button>
          {paginationMeta.pages.map((pageNumber, idx) =>
            pageNumber === '…' ? (
              <span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-400">…</span>
            ) : (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`flex h-7 min-w-[1.75rem] items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors ${
                  pageNumber === paginationMeta.activePage
                    ? 'bg-rapid-orange text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-current={pageNumber === paginationMeta.activePage ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => setPage((p) => (paginationMeta.lastPage ? Math.min(paginationMeta.lastPage, p + 1) : p + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40"
            aria-label="Next page"
            disabled={loading || !paginationMeta.lastPage || page >= paginationMeta.lastPage}
          >
            <ChevronRight size={14} strokeWidth={2} />
          </button>
        </nav>
      </footer>

      <AdminStaffActionsModal
        isOpen={Boolean(actionModal)}
        onClose={() => setActionModal(null)}
        action={actionModal?.action}
        admin={actionModal?.admin}
        roles={roles}
        onSuccess={refresh}
      />
      <AdminStaffCreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        roles={roles}
        onCreated={refresh}
      />

      {menuOpenId && menuPos
        ? createPortal(
            <div style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, zIndex: 50 }}>
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={closeMenu}
              />
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <div
                className={`relative z-50 w-48 rounded-xl border border-gray-100 bg-white py-1 shadow-xl ${
                  menuPos.top > window.innerHeight - 260 ? 'mt-0' : ''
                }`}
              >
                {admins
                  .filter((a) => a.id === menuOpenId)
                  .map((admin) => (
                    <RowMenu key={admin.id} admin={admin} openAction={openAction} />
                  ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

function RowMenu({ admin, openAction }) {
  return (
    <>
      <MenuItem onClick={() => openAction('edit', admin)}>Edit profile</MenuItem>
      <MenuItem onClick={() => openAction('role', admin)}>Change role</MenuItem>
      {admin.status === 'pending' ? (
        <MenuItem onClick={() => openAction('resend', admin)}>Resend invitation</MenuItem>
      ) : null}
      {admin.status === 'suspended' || admin.status === 'deactivated' ? (
        <MenuItem onClick={() => openAction('activate', admin)}>Activate</MenuItem>
      ) : null}
      {admin.status === 'active' || admin.status === 'pending' ? (
        <MenuItem onClick={() => openAction('suspend', admin)} tone="danger">Suspend</MenuItem>
      ) : null}
      {admin.status === 'active' ? (
        <MenuItem onClick={() => openAction('deactivate', admin)} tone="danger">Deactivate</MenuItem>
      ) : null}
      <div className="my-1 border-t border-gray-100" />
      <MenuItem onClick={() => openAction('delete', admin)} tone="danger">Delete admin</MenuItem>
    </>
  )
}

function MenuItem({ children, onClick, tone = 'default' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
        tone === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </button>
  )
}
