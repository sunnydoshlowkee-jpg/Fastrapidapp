import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAdminFinanceOverview } from '../../../services/adminFinanceService'
import AdminTransactionStatusBadge from '../transactions/AdminTransactionStatusBadge'

export default function AdminFinanceOverviewPage() {
  const [data, setData] = useState({ kpis: [], recent: [], attention: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const overview = await fetchAdminFinanceOverview()
        if (!cancelled) setData(overview)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load finance overview.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Finance</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Operations control</h1>
        <p className="mt-1 text-sm text-gray-500">
          Live ledger KPIs and recent wallet activity. Demo charts and sample money figures have been removed.
        </p>
      </header>

      {data.attention ? (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-bold text-emerald-900">{data.attention.title}</p>
          <p className="mt-1 text-sm text-emerald-800">{data.attention.body}</p>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading finance overview…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {(data.kpis || []).map((kpi) => (
              <article key={kpi.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{kpi.label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{kpi.value}</p>
                {kpi.hint ? <p className="mt-1 text-xs text-gray-500">{kpi.hint}</p> : null}
              </article>
            ))}
          </div>

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Recent ledger activity</h2>
              <Link to="/admin/transactions" className="text-sm font-bold text-rapid-orange hover:underline">
                View all
              </Link>
            </div>
            {(data.recent || []).length === 0 ? (
              <p className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
                No wallet transactions yet.
              </p>
            ) : (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
                  <thead className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    <tr>
                      <th className="px-4 py-3">Actor</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">When</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(data.recent || []).map((row) => (
                      <tr key={row.id}>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-gray-900">{row.actor_name || '—'}</p>
                          <p className="text-xs text-gray-400">{row.reference || row.id}</p>
                        </td>
                        <td className="px-4 py-3 capitalize text-gray-700">
                          {row.type || row.category || '—'}
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900">{row.amount_label}</td>
                        <td className="px-4 py-3">
                          <AdminTransactionStatusBadge status={row.status} />
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {row.created_at ? new Date(row.created_at).toLocaleString() : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/admin/transactions"
          className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white hover:bg-[#E84A15]"
        >
          Open ledger
        </Link>
        <Link
          to="/admin/payouts"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
        >
          Withdrawals
        </Link>
      </div>
    </div>
  )
}
