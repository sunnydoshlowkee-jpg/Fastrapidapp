import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, PhoneCall, MapPin, ShoppingCart, Home, Clock, Wallet, User, ChevronDown } from 'lucide-react'

// Mock Data
const carts = [
  {
    id: 1,
    vendor: "Mama's Kitchen",
    itemsCount: 5,
    total: "₦5,300",
    img: "/pizza.png"
  }
]

const ongoingOrders = [
  {
    id: '#9283-441',
    vendor: "Mama's Kitchen",
    status: "IN TRANSIT",
    statusType: "preparing", // preparing, delivered-pending
    eta: "Estimated arrival: 1:35 PM",
    img: "/pizza.png"
  }
]

const completedOrders = [
  {
    id: "ORD-88234",
    store: "Burger Shop Deluxe",
    date: "Today, 2:45 PM",
    items: "2x Cheeseburger, 1x Large Fries, 2x Coke",
    total: "₦8,500",
    status: "delivered",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop"
  },
  {
    id: "ORD-88231",
    store: "The Salad Bar",
    date: "May 10, 12:30 PM",
    items: "1x Greek Salad, 1x Fresh Juice",
    total: "₦3,800",
    status: "cancelled",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop"
  },
  {
    id: "ORD-88230",
    store: "Fresh Market Reserve",
    date: "May 5, 4:00 PM",
    items: "Grocery Bundle (10 items)",
    total: "₦15,400",
    status: "delivered",
    img: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=500&h=500&fit=crop"
  }
]

export default function Orders() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Ongoing') // Cart | Ongoing | Completed
  const [activeTabDesktop, setActiveTabDesktop] = useState('Orders') // Just for sidebar

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
            <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          </div>
          <button className="p-1 text-gray-400">
            <Search size={22} />
          </button>
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
              {carts.map(cart => (
                <div key={cart.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shadow-orange-200">
                          MK
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm mb-0.5">{cart.vendor}</h3>
                        <p className="text-[11px] font-medium text-gray-500">{cart.itemsCount} items • {cart.total}</p>
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
                    <button className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]">
                      Clear cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ONGOING TAB */}
          {activeTab === 'Ongoing' && (
            <div className="flex flex-col gap-6">
              {ongoingOrders.map(order => (
                <div key={order.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md shadow-orange-200">
                          MK
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{order.vendor}</h3>
                        <p className="text-[11px] text-gray-500 font-medium">Order {order.id} •</p>
                        <p className="text-[11px] text-gray-500 font-medium">{order.eta}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold ${order.statusType === 'preparing' ? 'bg-indigo-50 text-[#4F46E5]' : 'bg-gray-100 text-gray-700'}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  {order.statusType === 'preparing' ? (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => navigate(`/app/track/${order.id.replace('#', '')}`)}
                        className="flex-1 bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]"
                      >
                        Track Order
                      </button>
                      <button className="w-[52px] h-[52px] bg-[#F4F5F7] text-gray-900 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <PhoneCall size={20} />
                      </button>
                    </div>
                  ) : (
                    <button className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]">
                      I have received my order
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* COMPLETED TAB */}
          {activeTab === 'Completed' && (
            <div className="flex flex-col gap-4">
              {completedOrders.map(order => (
                <div key={order.id} className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img src={order.img} alt={order.vendor} className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900 text-[15px]">{order.vendor}</h3>
                        <span className="font-bold text-gray-900 text-sm">{order.total}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mb-3">{order.date} • {order.time}</p>
                      <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">{order.items}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/app/order/${order.id.replace('#', '')}`)}
                    className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]"
                  >
                    View order details
                  </button>
                </div>
              ))}
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
                placeholder="Search for food, groceries, or essentials..." 
                className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
              />
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-auto">
              <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                <MapPin size={20} className="text-[#2D2AEE]" strokeWidth={2} />
                <span className="font-semibold text-[#2D2AEE] text-[15px]">Lagos, NG</span>
              </div>
              <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <ShoppingCart size={20} className="text-gray-700" strokeWidth={2} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">3</span>
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

              {/* DESKTOP ONGOING TAB */}
              {activeTab === 'Ongoing' && (
                <div className="flex flex-col gap-6">
                  {ongoingOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#2D2AEE]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-[20px] mb-1">{order.vendor}</h3>
                            <p className="text-[14px] text-gray-500 font-medium">Order {order.id}</p>
                          </div>
                        </div>
                        <div className="bg-red-50 text-red-500 font-bold px-4 py-2 rounded-full text-[12px] uppercase tracking-wider flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          {order.status}
                        </div>
                      </div>

                      <div className="w-full h-[240px] rounded-2xl overflow-hidden relative mb-6 shadow-sm border border-gray-200 group cursor-pointer" onClick={() => navigate(`/app/order/${order.id.replace('#', '')}`)}>
                        <img src="/grocery-hero.png" className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700" onError={(e) => {e.target.style.display='none'}} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="absolute w-[200px] h-[100px] border-2 border-dashed border-[#2D2AEE] opacity-30 transform -skew-x-12 -skew-y-12 rounded-3xl"></div>
                        </div>
                        
                        <div className="absolute left-6 bottom-6 right-6">
                          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-lg border border-white/50">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-orange-100 overflow-hidden border-2 border-white shadow-sm">
                                <img src="/driver.png" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-[14px] mb-0.5">Tunde Adebayo</h4>
                                <p className="text-[12px] text-gray-500 font-medium">Your Courier</p>
                              </div>
                            </div>
                            <button className="w-12 h-12 bg-[#2D2AEE] rounded-full flex items-center justify-center text-white shadow-sm hover:bg-blue-700 transition-colors">
                              <PhoneCall size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-12 relative">
                        <div className="absolute top-3 left-4 right-4 h-1 bg-gray-100 rounded-full z-0"></div>
                        <div className="absolute top-3 left-4 w-1/2 h-1 bg-[#2D2AEE] rounded-full z-0"></div>
                        
                        <div className="flex flex-col items-center flex-1 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-[#2D2AEE] border-4 border-white mb-3 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <p className="font-bold text-gray-900 text-[13px] text-center mb-1">Order Placed</p>
                          <p className="text-[11px] text-gray-500 text-center">12:45 PM • Successfully confirmed</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-[#2D2AEE] border-4 border-white mb-3 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <p className="font-bold text-gray-900 text-[13px] text-center mb-1">Being Prepared</p>
                          <p className="text-[11px] text-gray-500 text-center">1:02 PM • Mama's Kitchen is cooking</p>
                        </div>
                        <div className="flex flex-col items-center flex-1 relative z-10">
                          <div className="w-6 h-6 rounded-full bg-red-500 border-4 border-white mb-3 flex items-center justify-center shadow-md shadow-red-200">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <p className="font-bold text-gray-900 text-[13px] text-center mb-1">On the way</p>
                          <p className="text-[11px] text-red-500 font-bold text-center">Estimated arrival: 1:35 PM</p>
                        </div>
                      </div>

                      <div className="flex flex-col mt-8 border-t border-gray-100 pt-8 gap-4">
                        <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase">Order Details</p>
                        <div className="flex justify-between items-center text-[14px]">
                          <span className="text-gray-600">2x Jollof Rice (Party Style)</span>
                          <span className="font-bold text-gray-900">₦12,400</span>
                        </div>
                        <div className="flex justify-between items-center text-[14px]">
                          <span className="text-gray-600">1x Grilled Croaker Fish</span>
                          <span className="font-bold text-gray-900">₦4,500</span>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-8">
                        <button className="flex-1 bg-[#2D2AEE] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors text-[14px] flex items-center justify-center gap-2">
                          Track Order <MapPin size={18} />
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors text-[14px]">
                          View Receipt
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

              {/* DESKTOP COMPLETED TAB */}
              {activeTab === 'Completed' && (
                <div className="flex flex-col gap-6">
                  {completedOrders.map((order, i) => (
                    <div key={i} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                      
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center text-white overflow-hidden shadow-sm shrink-0">
                          {order.img ? (
                            <img src={order.img} className="w-full h-full object-cover opacity-80" onError={(e) => {e.target.style.display='none'}} />
                          ) : (
                            <span className="font-bold text-xl">{order.vendor.charAt(0)}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-12">
                          <div>
                            <p className="text-[10px] font-bold text-[#2D2AEE] uppercase tracking-wider mb-1">Vendor</p>
                            <h3 className="font-bold text-gray-900 text-[18px] mb-1 leading-tight">{order.vendor}</h3>
                            <p className="text-[13px] text-gray-500">Order {order.id}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                            <p className="font-bold text-gray-900 text-[15px] mb-1 leading-tight">{order.date}</p>
                            <p className="text-[13px] text-gray-500">{order.time}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Items & Total</p>
                            <p className="font-bold text-gray-900 text-[15px] mb-1 leading-tight">{order.items}</p>
                            <p className="font-bold text-gray-900 text-[16px]">{order.total}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 shrink-0">
                        <div className="bg-green-50 text-green-600 font-bold px-4 py-2 rounded-full text-[12px] flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div> Delivered
                        </div>
                        <div className="flex flex-col gap-2 w-[140px]">
                          <button className="w-full bg-[#2D2AEE] text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm text-[13px]">
                            Reorder
                          </button>
                          <button className="w-full bg-gray-100 text-gray-900 font-bold py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-[13px]">
                            View Receipt
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}

                  <div className="mt-6 flex justify-center">
                    <button className="bg-white border border-gray-200 text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[14px] flex items-center gap-2">
                      Load More History <ChevronDown size={18} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
