import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Download, CheckCircle2, Info, Search, Home, Clock, Wallet, User, ShoppingCart, CreditCard, Copy, PhoneCall } from 'lucide-react'
import { getOrder } from '../../../services/orderService'
import { useCart } from '../../../context/CartContext'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { echo } from '../../../services/echo'
import OrderReviewPanel from '../../../components/orders/OrderReviewPanel'
import { Star } from 'lucide-react'

export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { cartItems } = useCart()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const { data } = await getOrder(id)
        setOrder(data.data)
      } catch (err) {
        console.error('Failed to fetch order details', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()

    const channel = echo.channel(`orders.${id}`)
    channel.listen('OrderUpdated', (e) => {
      console.log('Real-time order update received:', e)
      if (e.order) {
        setOrder(e.order)
      }
    })

    return () => {
      echo.leaveChannel(`orders.${id}`)
    }
  }, [id])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const getOrderDate = () => {
    return order?.created_at ? new Date(order.created_at) : new Date(Date.now() - ((100 - (order?.id || 0)) * 86400000));
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const getOrderVendor = () => {
    if (!order?.items || order.items.length === 0) return 'Unknown Vendor'
    return order.items[0]?.product?.merchant?.business_name || 'Vendor'
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <p className="text-gray-500">Order not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#4F46E5] font-bold">Go Back</button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-[17px] font-bold text-gray-900">Order #{order.id}</h1>
          </div>
          <div className={`px-3 py-1.5 rounded-full font-bold text-[10px] tracking-widest uppercase ${order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-[#4F46E5]'}`}>
            {order.status}
          </div>
        </div>

        <div className="flex-1 px-6 w-full max-w-md mx-auto pt-2 flex flex-col gap-8">
          
          {/* Vendor Header */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-24 h-24 rounded-3xl overflow-hidden mb-4 shadow-sm border border-gray-100 bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-2xl uppercase">
              {getOrderVendor().charAt(0)}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">{getOrderVendor()}</h2>
            <p className="text-[11px] text-gray-500 font-medium">Placed on {getOrderDate().toLocaleString()}</p>
            
            <div className="flex gap-4 w-full mt-6">
              <button className="flex-1 bg-[#4F46E5] text-white py-3.5 rounded-2xl font-semibold shadow-sm hover:bg-indigo-700 transition-colors text-[13px]">
                Reorder
              </button>
              <button onClick={() => navigate('/app/profile/help')} className="flex-1 bg-white text-red-500 py-3.5 rounded-2xl font-semibold hover:bg-red-50 transition-colors text-[13px] border border-red-100">
                Need Help?
              </button>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Items Summary</h3>
            <div className="bg-[#F8F9FA] rounded-[24px] p-5 flex flex-col gap-5 border border-gray-100">
              {order.items?.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-3">
                  <span className="text-[#4F46E5] font-bold text-[13px] w-5">{item.quantity}x</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-[13px] mb-1">{item.product?.name || 'Item'}</h4>
                  </div>
                  <span className="font-bold text-gray-900 text-[13px]">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F8F9FA] rounded-[24px] p-5 border border-gray-100">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">{formatCurrency(order.total_amount)}</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-bold text-gray-900">{formatCurrency(order.delivery_fee)}</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-4 border-t border-gray-200">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-[#4F46E5]">{formatCurrency(Number(order.total_amount) + Number(order.delivery_fee))}</span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13px] text-gray-500 font-bold">Status</h3>
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <h3 className="text-[15px] font-bold text-[#4F46E5] mb-6 capitalize">{order.status}</h3>
            
            <div className="relative pl-2.5 mb-2">
              <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex gap-5 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#4F46E5] mt-1.5 ring-4 ring-[#FAFAFA] z-10"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Ordered</h4>
                    <p className="text-[11px] text-gray-400">{formatTime(getOrderDate())}</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ring-4 ring-[#FAFAFA] z-10 ${order.status !== 'pending' ? 'bg-[#4F46E5]' : 'bg-[#A0AAB2]'}`}></div>
                  <div>
                    <h4 className={`font-bold text-sm mb-0.5 ${order.status !== 'pending' ? 'text-gray-900' : 'text-gray-400'}`}>Accepted</h4>
                    {order.status !== 'pending' && <p className="text-[11px] text-gray-400">{formatTime(new Date(getOrderDate().getTime() + 2 * 60000))}</p>}
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ring-4 ring-[#FAFAFA] z-10 ${order.status === 'en_route' || order.status === 'delivered' ? 'bg-[#4F46E5]' : 'bg-[#A0AAB2]'}`}></div>
                  <div>
                    <h4 className={`font-bold text-sm mb-0.5 ${order.status === 'en_route' || order.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>On the way</h4>
                    {(order.status === 'en_route' || order.status === 'delivered') && <p className="text-[11px] text-gray-400">{formatTime(new Date(getOrderDate().getTime() + 15 * 60000))}</p>}
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ring-4 ring-[#FAFAFA] z-10 ${order.status === 'delivered' ? 'bg-[#4F46E5]' : 'bg-[#A0AAB2]'}`}></div>
                  <div>
                    <h4 className={`font-bold text-sm mb-0.5 ${order.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</h4>
                    {order.status === 'delivered' && <p className="text-[11px] text-gray-400">{formatTime(new Date(getOrderDate().getTime() + 25 * 60000))}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">Delivery Details</h3>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex flex-col items-center justify-center flex-shrink-0 text-gray-500">
                <MapPin size={18} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[13px] mb-0.5">{order.delivery_address?.label || 'Address'}</h4>
                <p className="text-[11px] text-gray-500 leading-snug">{order.delivery_address?.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Review Section */}
          {order.status === 'delivered' && (
            <div className="mt-2">
              {!order.review ? (
                <OrderReviewPanel 
                  orderId={order.id} 
                  onReviewSubmitted={(review) => setOrder({...order, review})} 
                />
              ) : (
                <div className="bg-[#F8F9FA] rounded-[24px] p-5 border border-gray-100 mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[14px] font-bold text-gray-900">Your Review</h3>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={14} className={star <= order.review.rating ? 'fill-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                  </div>
                  {order.review.comment && (
                    <p className="text-[13px] text-gray-500 italic mt-2">"{order.review.comment}"</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 mt-2">
            <button onClick={() => window.print()} className="w-full bg-[#E8EAE6] text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-[13px]">
              <Download size={16} /> Download Receipt
            </button>
            <button onClick={() => navigate('/app/profile/help')} className="text-red-500 text-[13px] font-bold hover:underline mb-4">
              Need Help?
            </button>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="hidden md:flex flex-1 w-full mx-auto">
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-screen">
          
          {/* Top Header */}
          <div className="w-full px-10 pt-8 pb-6 flex items-center border-b border-gray-100 bg-white sticky top-0 z-30">
            <button onClick={() => navigate(-1)} className="mr-6 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 max-w-2xl bg-[#F4F5F7] rounded-xl px-5 py-3.5 flex items-center gap-3">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for food, groceries, or essentials..." 
                className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
              />
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-auto">
              <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <MapPin size={20} className="text-[#2D2AEE]" strokeWidth={2} />
                <span className="font-semibold text-[#2D2AEE] text-[15px]">Lagos, NG</span>
              </div>
              <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => navigate('/app/cart')}>
                <ShoppingCart size={20} className="text-gray-700" strokeWidth={2} />
                {cartItems?.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{cartItems.length}</span>}
              </div>
            </div>
          </div>

          <div className="px-10 pt-10 pb-12 bg-[#FAFAFA] flex-1">
            <div className="max-w-[1200px] flex gap-10">
              
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-6">
                
                {/* Delivery Status */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[20px] font-bold text-gray-900">Delivery Status</h2>
                    <div className="bg-green-50 text-green-600 font-bold px-4 py-2 rounded-full text-[12px] uppercase tracking-wider flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Delivered
                    </div>
                  </div>

                  <div className="flex items-center justify-between relative px-4">
                    <div className="absolute top-4 left-10 right-10 h-1 bg-gray-100 rounded-full z-0"></div>
                    <div className="absolute top-4 left-10 right-10 h-1 bg-[#2D2AEE] rounded-full z-0"></div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className="w-9 h-9 rounded-full bg-[#2D2AEE] border-[4px] border-white mb-3 flex items-center justify-center text-white">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="font-bold text-gray-900 text-[14px] text-center mb-1">Ordered</p>
                      <p className="text-[12px] text-gray-500 text-center font-medium">{formatTime(getOrderDate())}</p>
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className={`w-9 h-9 rounded-full border-[4px] border-white mb-3 flex items-center justify-center text-white ${order.status === 'delivered' || order.status === 'en_route' || order.status === 'preparing' ? 'bg-[#2D2AEE]' : 'bg-gray-200'}`}>
                        {order.status !== 'pending' && <CheckCircle2 size={16} />}
                      </div>
                      <p className={`font-bold text-[14px] text-center mb-1 ${order.status !== 'pending' ? 'text-gray-900' : 'text-gray-400'}`}>Accepted</p>
                      {order.status !== 'pending' && <p className="text-[12px] text-gray-500 text-center font-medium">{formatTime(new Date(getOrderDate().getTime() + 2 * 60000))}</p>}
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className={`w-9 h-9 rounded-full border-[4px] border-white mb-3 flex items-center justify-center text-white shadow-md ${order.status === 'delivered' || order.status === 'en_route' ? 'bg-[#2D2AEE] shadow-blue-500/20' : 'bg-gray-200 shadow-none'}`}>
                        {order.status === 'en_route' ? <div className="w-2.5 h-2.5 bg-white rounded-full"></div> : order.status === 'delivered' ? <CheckCircle2 size={16} /> : null}
                      </div>
                      <p className={`font-bold text-[14px] text-center mb-1 ${order.status === 'en_route' || order.status === 'delivered' ? 'text-[#2D2AEE]' : 'text-gray-400'}`}>On the way</p>
                      {(order.status === 'en_route' || order.status === 'delivered') && <p className="text-[12px] text-gray-500 text-center font-medium">{formatTime(new Date(getOrderDate().getTime() + 15 * 60000))}</p>}
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className={`w-9 h-9 rounded-full border-[4px] border-white mb-3 flex items-center justify-center text-white ${order.status === 'delivered' ? 'bg-[#2D2AEE]' : 'bg-gray-200'}`}>
                         {order.status === 'delivered' && <CheckCircle2 size={16} />}
                      </div>
                      <p className={`font-bold text-[14px] text-center mb-1 ${order.status === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</p>
                      {order.status === 'delivered' && <p className="text-[12px] text-gray-500 text-center font-medium">{formatTime(new Date(getOrderDate().getTime() + 25 * 60000))}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  {/* Delivery Address */}
                  <div className="flex-1 bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#2D2AEE]">
                        <Home size={18} />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Delivery Address</h3>
                    </div>
                    <div className="bg-[#F4F5F7] rounded-2xl p-5 border border-transparent hover:border-gray-200 transition-colors">
                      <h4 className="font-bold text-gray-900 text-[14px] mb-1">{order.delivery_address?.label || 'Address'}</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                        {order.delivery_address?.address || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex-1 bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#2D2AEE]">
                        <CreditCard size={18} />
                      </div>
                      <h3 className="text-[16px] font-bold text-gray-900">Payment Method</h3>
                    </div>
                    <div className="bg-[#F4F5F7] rounded-2xl p-5 border border-transparent hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">{order.payment_status || 'Paid'}</div>
                        <h4 className="font-bold text-gray-900 text-[14px] capitalize">{order.payment_method || 'Wallet'}</h4>
                      </div>
                      <p className="text-[13px] text-gray-500 font-medium mt-3">
                        Total: <span className="font-bold text-gray-900">{formatCurrency(Number(order.total_amount) + Number(order.delivery_fee))}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Map */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col h-[320px]">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4">Delivery Map</h3>
                  <div className="w-full flex-1 rounded-2xl overflow-hidden relative border border-gray-200 bg-gray-100 group cursor-pointer">
                    <MapContainer 
                      center={[6.5244, 3.3792]} 
                      zoom={13} 
                      zoomControl={false}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[6.5244, 3.3792]}>
                        <Popup>
                          Delivery Location<br/>
                          {order.delivery_address?.address || 'N/A'}
                        </Popup>
                      </Marker>
                      
                      {order.delivery?.rider && (
                        <Marker position={[6.51, 3.37]}>
                          <Popup>
                            Rider: {order.delivery.rider.first_name || 'Assigned'}
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  </div>
                </div>

              </div>

              {/* Right Column (Receipt) */}
              <div className="w-[380px] shrink-0 flex flex-col gap-6">
                
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <h2 className="text-[20px] font-bold text-gray-900 mb-6">Order Receipt</h2>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden font-bold text-xl uppercase">
                      {getOrderVendor().charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-[16px] mb-1">{getOrderVendor()}</h3>
                      <p className="text-[13px] text-gray-500 font-medium">{getOrderDate().toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 mb-6">
                    {order.items?.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-3">
                        <span className="text-gray-400 font-bold text-[14px] w-5">{item.quantity}x</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-[14px] mb-1">{item.product?.name || 'Item'}</h4>
                        </div>
                        <span className="font-bold text-gray-900 text-[14px]">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F4F5F7] rounded-2xl p-5 border border-transparent flex flex-col gap-4 mb-8">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="font-bold text-gray-900">{formatCurrency(order.total_amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-gray-500 font-medium">Delivery Fee</span>
                      <span className="font-bold text-gray-900">{formatCurrency(order.delivery_fee)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-200 border-dashed">
                      <span className="text-[16px] font-bold text-gray-900">Total Amount</span>
                      <span className="text-[24px] font-bold text-[#2D2AEE]">{formatCurrency(Number(order.total_amount) + Number(order.delivery_fee))}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Transaction ID</p>
                      <p className="text-[14px] font-bold text-gray-900">{order.transaction_id || order.reference || `#ORD-${(order.id || 0).toString().padStart(5, '0')}`}</p>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2AEE] shadow-sm hover:bg-gray-100 transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                {/* Desktop Review Section */}
                {order.status === 'delivered' && (
                  <div>
                    {!order.review ? (
                      <OrderReviewPanel 
                        orderId={order.id} 
                        onReviewSubmitted={(review) => setOrder({...order, review})} 
                      />
                    ) : (
                      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-[16px] font-bold text-gray-900">Your Review</h3>
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} size={16} className={star <= order.review.rating ? 'fill-yellow-400' : 'text-gray-300'} />
                            ))}
                          </div>
                        </div>
                        {order.review.comment && (
                          <p className="text-[14px] text-gray-500 italic">"{order.review.comment}"</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button onClick={() => window.print()} className="w-full bg-[#2D2AEE] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors text-[14px]">
                    <Download size={18} /> Download Receipt
                  </button>
                  <button onClick={() => navigate('/app/profile/help')} className="w-full bg-white border border-gray-200 text-red-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors text-[14px]">
                    Need Help?
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
