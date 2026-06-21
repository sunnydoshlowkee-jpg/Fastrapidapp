import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, PhoneCall, MapPin, ShoppingCart, Home, Clock, Wallet, User, ChevronDown, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { getOrders } from '../../../services/orderService'
import { useCart } from '../../../context/CartContext'

export default function Orders() {
  const navigate = useNavigate()
  const { items: cartItems = [], total, count, subtotal, deliveryFee, serviceCharge, updateQty, remove } = useCart()
  const [activeTab, setActiveTab] = useState('Ongoing') // Cart | Ongoing | Completed
  const [activeTabDesktop, setActiveTabDesktop] = useState('Orders') // Just for sidebar
  
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const { data } = await getOrders()
        setOrders(data.data || [])
      } catch (err) {
        console.error('Failed to fetch orders', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const ongoingOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
  const completedOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled')

  const filterOrder = (o) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      getOrderVendor(o).toLowerCase().includes(query) ||
      getOrderItemsString(o).toLowerCase().includes(query) ||
      String(o.id).includes(query)
    )
  }

  const filteredOngoing = ongoingOrders.filter(filterOrder)
  const filteredCompleted = completedOrders.filter(filterOrder)

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
  }

  const getOrderItemsString = (order) => {
    if (!order.items || order.items.length === 0) return 'No items'
    return order.items.map(i => `${i.quantity}x ${i.product?.name || 'Item'}`).join(', ')
  }

  const getOrderVendor = (order) => {
    if (!order.items || order.items.length === 0) return 'Unknown Vendor'
    return order.items[0]?.product?.merchant?.business_name || 'Vendor'
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="md:hidden flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30 h-[88px]">
          {!isSearching ? (
            <>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-900">Orders</h1>
              </div>
              <button onClick={() => setIsSearching(true)} className="p-1 text-gray-400 hover:text-[#4F46E5] transition-colors">
                <Search size={22} />
              </button>
            </>
          ) : (
            <div className="flex items-center w-full gap-3 h-full animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm focus-within:border-[#4F46E5] focus-within:ring-1 focus-within:ring-[#4F46E5] transition-all">
                <Search size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search orders, items..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <button onClick={() => { setIsSearching(false); setSearchQuery('') }} className="text-gray-500 font-medium text-[13px] hover:text-gray-700 transition-colors">
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="px-6 w-full max-w-md mx-auto pt-4 flex-1">
          
          {/* Tabs */}
          <div className="flex bg-[#F4F5F7] p-1.5 rounded-2xl mb-8">
            {['Cart', 'Ongoing', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-[13px] font-semibold rounded-xl transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CART TAB */}
          {activeTab === 'Cart' && (
            <div className="flex flex-col gap-6">
              {cartItems.length > 0 ? (
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                        <ShoppingCart className="text-orange-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm mb-0.5">Your Cart</h3>
                        <p className="text-[11px] font-medium text-gray-500">{count} items • {formatCurrency(total)}</p>
                      </div>
                    </div>
                    <button onClick={() => navigate('/app/cart')} className="text-[#4F46E5] text-[11px] font-bold">
                      View items
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button onClick={() => navigate('/app/checkout')} className="w-full bg-[#4F46E5] text-white py-3.5 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors text-[13px]">
                      Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 text-sm">Your cart is empty.</div>
              )}
            </div>
          )}

          {/* ONGOING TAB */}
          {activeTab === 'Ongoing' && (
            <div className="flex flex-col gap-6">
              {loading ? (
                <div className="text-center py-10 text-gray-500 text-sm">Loading orders...</div>
              ) : filteredOngoing.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">No ongoing orders found.</div>
              ) : (
                filteredOngoing.map(order => (
                  <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-200">
                            {getOrderVendor(order).substring(0, 2).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm mb-1">{getOrderVendor(order)}</h3>
                          <p className="text-[11px] text-gray-500 font-medium">Order #{order.id} •</p>
                          <p className="text-[11px] text-gray-500 font-medium">Status: <span className="capitalize">{order.status}</span></p>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold bg-indigo-50 text-[#4F46E5] uppercase`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => navigate(`/app/track/${order.id}`)}
                        className="flex-1 bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]"
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* COMPLETED TAB */}
          {activeTab === 'Completed' && (
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="text-center py-10 text-gray-500 text-sm">Loading orders...</div>
              ) : filteredCompleted.length === 0 ? (
                <div className="text-center py-10 text-gray-500 text-sm">No completed orders found.</div>
              ) : (
                filteredCompleted.map(order => (
                  <div key={order.id} className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xl">
                        {getOrderVendor(order).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-gray-900 text-[15px]">{getOrderVendor(order)}</h3>
                          <span className="font-bold text-gray-900 text-sm">{formatCurrency(order.total_amount)}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 mb-3">{new Date(order.created_at).toLocaleDateString()}</p>
                        <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">{getOrderItemsString(order)}</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/app/order/${order.id}`)}
                      className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]"
                    >
                      View order details
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
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
            <div className="flex-1 max-w-3xl bg-[#F4F5F7] rounded-xl px-5 py-3.5 flex items-center gap-3">
              <Search size={20} className="text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, vendors, items..." 
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
                {cartItems.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{count}</span>}
              </div>
            </div>
          </div>

          <div className="px-10 pt-10 pb-12 bg-[#FAFAFA] flex-1">
            <div className="max-w-[1000px]">
              
              {/* Desktop Tabs */}
              <div className="flex bg-[#F4F5F7] p-1.5 rounded-xl mb-12 w-max">
                {['Cart', 'Ongoing', 'Completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-2.5 text-[14px] font-bold rounded-lg transition-all ${
                      activeTab === tab
                        ? 'bg-white text-[#2D2AEE] shadow-sm'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* DESKTOP CART TAB */}
              {activeTab === 'Cart' && (
                <div className="flex gap-10 items-start">
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[18px] font-bold text-gray-900">Items ({count})</span>
                      {cartItems.length > 0 && (
                        <button onClick={() => navigate('/app/cart')} className="text-[14px] font-bold text-[#2D2AEE] hover:text-blue-700 transition-colors">
                          Open full cart
                        </button>
                      )}
                    </div>

                    {cartItems.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm flex items-center gap-6">
                            <div className="w-[88px] h-[88px] rounded-xl overflow-hidden bg-gray-50 shrink-0">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-[17px] text-gray-900 mb-1">{item.name}</h3>
                              <p className="text-[13px] text-gray-500 truncate">{item.desc || 'Menu item'}</p>
                              <div className="flex items-center gap-5 mt-4">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900">
                                    <Minus size={14} />
                                  </button>
                                  <span className="text-[14px] font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900">
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                            <div className="shrink-0 font-bold text-[18px] text-gray-900">{item.price}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 bg-white rounded-[24px] border border-gray-100 text-gray-500 text-sm">
                        Your cart is empty.
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="w-[360px] shrink-0 sticky top-[120px]">
                      <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h2 className="text-[20px] font-bold text-gray-900 mb-6">Order Summary</h2>
                        <div className="flex flex-col gap-4 mb-6">
                          <div className="flex justify-between text-[15px]">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-bold text-gray-900">{formatCurrency(subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-[15px]">
                            <span className="text-gray-500">Delivery Fee</span>
                            <span className="font-bold text-gray-900">{formatCurrency(deliveryFee)}</span>
                          </div>
                          <div className="flex justify-between text-[15px]">
                            <span className="text-gray-500">Service Charge</span>
                            <span className="font-bold text-gray-900">{formatCurrency(serviceCharge)}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center py-5 border-y border-gray-100 mb-6">
                          <span className="text-[18px] font-bold text-gray-900">Total</span>
                          <span className="text-[22px] font-bold text-[#2D2AEE]">{formatCurrency(total)}</span>
                        </div>
                        <button
                          onClick={() => navigate('/app/checkout')}
                          className="w-full bg-[#2D2AEE] text-white py-4 rounded-xl font-bold text-[16px] hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          Checkout <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* DESKTOP ONGOING TAB */}
              {activeTab === 'Ongoing' && (
                <div className="flex flex-col gap-6">
                  {loading ? (
                    <div className="text-center py-10 text-gray-500 text-sm">Loading orders...</div>
                  ) : filteredOngoing.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">No ongoing orders found.</div>
                  ) : (
                    filteredOngoing.map(order => (
                      <div key={order.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#2D2AEE]">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-[20px] mb-1">{getOrderVendor(order)}</h3>
                              <p className="text-[14px] text-gray-500 font-medium">Order #{order.id}</p>
                            </div>
                          </div>
                          <div className="bg-red-50 text-red-500 font-bold px-4 py-2 rounded-full text-[12px] uppercase tracking-wider flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            {order.status}
                          </div>
                        </div>

                        <div className="w-full h-[240px] rounded-2xl overflow-hidden relative mb-6 shadow-sm border border-gray-200 group cursor-pointer" onClick={() => navigate(`/app/order/${order.id}`)}>
                          <img src="/grocery-hero.png" className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700" onError={(e) => {e.target.style.display='none'}} />
                          
                          <div className="absolute left-6 bottom-6 right-6">
                            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg border border-white/50">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 overflow-hidden border-2 border-white shadow-sm">
                                  <img src="/driver.png" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900 text-[14px] mb-0.5">Your Courier</h4>
                                  <p className="text-[12px] text-gray-500 font-medium">Driver</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col mt-8 border-t border-gray-100 pt-8 gap-4">
                          <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase">Order Details</p>
                          <div className="flex justify-between items-center text-[14px]">
                            <span className="text-gray-600 line-clamp-1">{getOrderItemsString(order)}</span>
                            <span className="font-bold text-gray-900 shrink-0">{formatCurrency(order.total_amount)}</span>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <button onClick={() => navigate(`/app/track/${order.id}`)} className="flex-1 bg-[#2D2AEE] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors text-[14px] flex items-center justify-center gap-2">
                            Track Order <MapPin size={18} />
                          </button>
                          <button onClick={() => navigate(`/app/order/${order.id}`)} className="flex-1 bg-gray-100 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors text-[14px]">
                            View Receipt
                          </button>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              )}

              {/* DESKTOP COMPLETED TAB */}
              {activeTab === 'Completed' && (
                <div className="flex flex-col gap-6">
                  {loading ? (
                    <div className="text-center py-10 text-gray-500 text-sm">Loading orders...</div>
                  ) : filteredCompleted.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">No completed orders found.</div>
                  ) : (
                    filteredCompleted.map((order, i) => (
                      <div key={i} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center text-white overflow-hidden shadow-sm shrink-0 font-bold text-2xl uppercase">
                            {getOrderVendor(order).charAt(0)}
                          </div>
                          
                          <div className="flex items-center gap-12">
                            <div>
                              <p className="text-[10px] font-bold text-[#2D2AEE] uppercase tracking-wider mb-1">Vendor</p>
                              <h3 className="font-bold text-gray-900 text-[18px] mb-1 leading-tight">{getOrderVendor(order)}</h3>
                              <p className="text-[13px] text-gray-500">Order #{order.id}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                              <p className="font-bold text-gray-900 text-[15px] mb-1 leading-tight">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="max-w-[150px]">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Items & Total</p>
                              <p className="font-bold text-gray-900 text-[14px] mb-1 leading-tight truncate">{getOrderItemsString(order)}</p>
                              <p className="font-bold text-gray-900 text-[16px]">{formatCurrency(order.total_amount)}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 shrink-0">
                          <div className={`font-bold px-4 py-2 rounded-full text-[12px] flex items-center gap-2 ${order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            <div className={`w-2 h-2 rounded-full ${order.status === 'delivered' ? 'bg-green-500' : 'bg-red-500'}`}></div> <span className="capitalize">{order.status}</span>
                          </div>
                          <div className="flex flex-col gap-2 w-[140px]">
                            <button onClick={() => navigate(`/app/order/${order.id}`)} className="w-full bg-gray-100 text-gray-900 font-bold py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-[13px]">
                              View Receipt
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}

                  {completedOrders.length > 0 && (
                    <div className="mt-6 flex justify-center">
                      <button className="bg-white border border-gray-200 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[14px] flex items-center gap-2">
                        Load More History <ChevronDown size={18} />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
