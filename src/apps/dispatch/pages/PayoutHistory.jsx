import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building2, Clock, Calendar, Search } from 'lucide-react'
import { useRiderEarnings } from '../../../hooks/useRiderEarnings'

export default function PayoutHistory() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const { earnings, refresh } = useRiderEarnings()

  useEffect(() => {
    refresh()
  }, [refresh])

  const recentEarnings = earnings?.earnings?.recent || []

  const filtered = recentEarnings.filter(p => 
    String(p.amount).includes(search) || 
    p.status.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-6">
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-full">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Earnings History</h1>
      </div>

      <div className="px-5 space-y-4 pt-4">
        {/* Search */}
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

        <div className="flex flex-col gap-3 mt-4">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-gray-500 font-medium text-sm">
              No earnings found
            </div>
          ) : (
            filtered.map(p => (
              <div key={p.id} className="bg-gray-50 rounded-2xl px-4 py-4 flex items-start gap-3 border border-gray-100/50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: p.status === 'completed' ? 'rgba(34,197,94,0.1)' : 
                                p.status === 'failed' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)',
                  }}>
                  {p.status === 'completed'
                    ? <Building2 size={18} className="text-green-500" />
                    : <Clock size={18} className="text-orange-500" />
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-gray-900 text-sm truncate pr-2">Delivery Earned</p>
                    <p className="font-black text-gray-900 text-sm whitespace-nowrap">₦{Number(p.amount).toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1.5">
                        <Calendar size={12} /> {new Date(p.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md"
                      style={{ 
                        background: p.status === 'completed' ? 'rgba(34,197,94,0.1)' : p.status === 'failed' ? 'rgba(239,68,68,0.1)' : 'rgba(249,115,22,0.1)',
                        color: p.status === 'completed' ? '#22c55e' : p.status === 'failed' ? '#ef4444' : '#f97316' 
                      }}>
                      {p.status}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
