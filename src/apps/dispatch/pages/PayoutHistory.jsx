import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, Clock, Calendar, Search, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { getRiderWalletTransactions } from '../../../services/riderWalletService'

export default function PayoutHistory() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await getRiderWalletTransactions({ limit: 40 })
        if (active) setRows(Array.isArray(data) ? data : [])
      } catch (err) {
        if (active) setError(err.message || 'Unable to load history.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const filtered = rows.filter((p) =>
    String(p.amount).includes(search) ||
    String(p.status || '').toLowerCase().includes(search.toLowerCase()) ||
    String(p.description || '').toLowerCase().includes(search.toLowerCase()) ||
    String(p.category || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-6">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center gap-3 border-b border-gray-100">
        <button type="button" onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Wallet History</h1>
      </div>

      <div className="px-5 space-y-4 pt-4">
        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by amount, status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex flex-col gap-3 mt-4">
          {loading ? (
            <div className="text-center py-10 text-gray-500 font-medium text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium text-sm">
              No wallet activity yet
            </div>
          ) : (
            filtered.map((p) => {
              const status = String(p.status || 'pending').toLowerCase()
              const isDebit = String(p.type).toLowerCase() === 'debit'
              const isOk = status === 'success' || status === 'completed'
              const isFail = status === 'failed' || status === 'reversed' || status === 'refunded'
              const signedAmount = `${isDebit ? '−' : '+'}₦${Number(p.amount).toLocaleString()}`
              return (
                <div key={p.id} className="bg-gray-50 rounded-2xl px-4 py-4 flex items-start gap-3 border border-gray-100/50">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: isFail
                        ? 'rgba(239,68,68,0.1)'
                        : isDebit
                          ? 'rgba(91,91,255,0.1)'
                          : isOk
                            ? 'rgba(34,197,94,0.1)'
                            : 'rgba(249,115,22,0.1)',
                    }}
                  >
                    {isDebit ? (
                      <ArrowUpRight size={18} style={{ color: '#5B5BFF' }} />
                    ) : isOk ? (
                      <ArrowDownLeft size={18} className="text-green-500" />
                    ) : (
                      <Clock size={18} className="text-orange-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-gray-900 text-sm truncate pr-2">
                        {p.description || (isDebit ? 'Withdrawal' : 'Wallet credit')}
                      </p>
                      <p className={`font-black text-sm whitespace-nowrap ${isDebit ? 'text-gray-900' : 'text-green-600'}`}>
                        {signedAmount}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5">
                          <Calendar size={12} />{' '}
                          {p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}
                        </p>
                        {p.category ? (
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Building2 size={10} /> {p.category}
                          </p>
                        ) : null}
                      </div>
                      <p
                        className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md"
                        style={{
                          background: isOk
                            ? 'rgba(34,197,94,0.1)'
                            : isFail
                              ? 'rgba(239,68,68,0.1)'
                              : 'rgba(249,115,22,0.1)',
                          color: isOk ? '#16a34a' : isFail ? '#dc2626' : '#ea580c',
                        }}
                      >
                        {status}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
