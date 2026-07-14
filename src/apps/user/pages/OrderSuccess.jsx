import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, Clock, Truck, Star } from 'lucide-react'
import { getOrder } from '../../../services/orderService'
import { resolveStorageUrl } from '../../../utils/mediaUrl'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const { data } = await getOrder(id)
        setOrder(data.data)
      } catch (err) {
        console.error('Failed to fetch order', err)
        setOrder(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  const merchant = order?.items?.[0]?.product?.merchant
  const itemCount = useMemo(
    () => (order?.items || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [order]
  )
  const deliveryAddress = order?.delivery_address?.address || 'Your saved address'
  const merchantLogo = resolveStorageUrl(merchant?.logo_path)
  const orderLabel = `#RD-${id}`

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] text-sm text-gray-500">
        Loading order details...
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] px-6 text-center">
        <p className="text-gray-500">We could not load this order.</p>
        <button onClick={() => navigate('/app/orders')} className="mt-4 font-bold text-[#4F46E5]">
          View orders
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
      <div className="md:hidden w-full max-w-md mx-auto flex flex-col items-center px-6 py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
            <Check size={28} strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order placed!</h1>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">{orderLabel}</p>
        <p className="text-sm text-gray-500 text-center mb-8">
          {merchant?.business_name || 'Your vendor'} is preparing your order.
        </p>

        <div className="bg-[#F4F5F7] w-full rounded-2xl p-5 flex items-center justify-between mb-4 border border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Estimated Arrival</p>
            <p className="text-xl font-bold text-gray-900">25-35 min</p>
          </div>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400">
            <Clock size={20} />
          </div>
        </div>

        <div className="w-full bg-white rounded-2xl p-4 mb-8 border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
            {merchantLogo ? (
              <img src={merchantLogo} alt={merchant?.business_name || 'Vendor'} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#1A1A1A]" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-gray-900 text-sm truncate">{merchant?.business_name || 'Vendor'}</h4>
            <p className="text-xs text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'} • Delivery to {deliveryAddress}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => navigate(`/app/track/${id}`)}
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm"
          >
            Track my order
          </button>
          <button
            onClick={() => navigate('/app')}
            className="w-full bg-[#F4F5F7] text-gray-900 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            Back to home
          </button>
        </div>
      </div>

      <div className="hidden md:flex w-full max-w-[800px] mx-auto flex-col items-center justify-center py-20 px-10 relative">
        <div className="w-[140px] h-[140px] bg-gradient-to-tr from-[#3B38F6] to-[#4F46E5] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/40">
          <Check size={64} className="text-white" strokeWidth={3} />
        </div>

        <h1 className="text-[42px] font-bold text-gray-900 mb-3">Order placed!</h1>
        <p className="text-[16px] text-gray-500 mb-12 max-w-[360px] text-center leading-relaxed">
          Your order has been received and is being prepared by {merchant?.business_name || 'the merchant'}.
        </p>

        <div className="flex gap-4 w-full max-w-[600px] mb-8">
          <div className="flex-1 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-2">Order ID</span>
            <span className="text-[20px] font-bold text-gray-900">{orderLabel}</span>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100">
            <span className="text-[11px] font-bold text-red-500 tracking-widest uppercase mb-2">Estimated Arrival</span>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-red-500" />
              <span className="text-[20px] font-bold text-gray-900">25–35 min</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full max-w-[600px] mb-12">
          <button
            onClick={() => navigate(`/app/track/${id}`)}
            className="flex-1 bg-[#2D2AEE] text-white py-4 rounded-xl font-bold text-[15px] hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <Truck size={18} /> Track Order
          </button>
          <button
            onClick={() => navigate('/app')}
            className="flex-1 bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-bold text-[15px] transition-colors"
          >
            Back to Home
          </button>
        </div>

        <div className="w-full max-w-[600px] bg-[#F8F9FA] border border-gray-100 rounded-3xl p-6 flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-5 min-w-0">
            <div className="w-16 h-16 rounded-2xl flex-shrink-0 border border-gray-200 overflow-hidden bg-gray-100">
              {merchantLogo ? (
                <img src={merchantLogo} alt={merchant?.business_name || 'Vendor'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#1A1A1A]" />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-[16px] text-gray-900 mb-0.5 truncate">
                {merchant?.business_name || 'Vendor'}
              </h4>
              <p className="text-[13px] text-gray-500 line-clamp-2">
                {itemCount} {itemCount === 1 ? 'Item' : 'Items'} • Delivery to {deliveryAddress}
              </p>
            </div>
          </div>
          {merchant?.business_type ? (
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm text-[13px] font-bold text-gray-900 shrink-0">
              <Star size={14} className="fill-[#2D2AEE] text-[#2D2AEE]" /> {merchant.business_type}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
