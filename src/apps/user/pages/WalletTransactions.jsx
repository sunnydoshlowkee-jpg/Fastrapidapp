import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, ChevronDown } from 'lucide-react'
import { getWalletTransactions, walletTransactionLabel } from '../../../services/walletService'

export default function WalletTransactions() {
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        const { data } = await getWalletTransactions({ page: 1 })
        setTransactions(data.data || [])
        setHasMore(data.current_page < data.last_page)
        setPage(1)
      } catch (err) {
        console.error('Failed to fetch transactions', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const { data } = await getWalletTransactions({ page: nextPage })
      setTransactions(prev => [...prev, ...(data.data || [])])
      setHasMore(data.current_page < data.last_page)
      setPage(nextPage)
    } catch (err) {
      console.error('Failed to load more transactions', err)
    } finally {
      setLoadingMore(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const formatTime = (isoString) => {
    return new Intl.DateTimeFormat('en-NG', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(new Date(isoString))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-8 items-center md:justify-center">
      <div className="w-full max-w-md mx-auto flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:shadow-gray-200/50 md:border md:border-gray-100 md:min-h-0 md:my-12 overflow-hidden flex-1 md:flex-initial">
        
        {/* Header */}
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 md:pb-6 flex items-center justify-between bg-[#FAFAFA] md:bg-transparent border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white md:bg-gray-50 md:border md:border-gray-200 md:rounded-full hover:bg-gray-100 transition-colors shadow-sm md:shadow-none md:w-10 md:h-10 md:flex md:items-center md:justify-center">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Transaction History</h1>
          </div>
        </div>

        <div className="px-5 md:px-8 w-full flex-1 flex flex-col pt-4 md:pt-6 pb-6">
          {loading ? (
            <div className="text-center py-10 text-gray-500 text-sm">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No transactions yet.</div>
          ) : (
            <div className="flex flex-col gap-5">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between bg-white md:bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900">{walletTransactionLabel(tx)}</h4>
                      <p className="text-[11px] text-gray-400 font-medium">
                        {new Date(tx.created_at).toLocaleDateString()} • {formatTime(tx.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-[14px] ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                  </div>
                </div>
              ))}

              {hasMore && (
                <button 
                  onClick={loadMore} 
                  disabled={loadingMore} 
                  className="mt-4 w-full bg-white md:bg-gray-50 border border-gray-200 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm md:shadow-none text-[14px] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loadingMore ? 'Loading...' : 'Load More'} <ChevronDown size={18} />
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
