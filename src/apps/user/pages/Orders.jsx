import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronRight, PhoneCall } from 'lucide-react'

// Mock Data
const carts = [
  {
    id: 1,
    vendor: "Mama's Kitchen",
    itemsCount: 5,
    total: "₦5,300",
    img: "/pizza.png" // Using placeholder
  }
]

const ongoingOrders = [
  {
    id: '#9284',
    vendor: "Mama's Kitchen",
    status: "Preparing",
    eta: "12 mins",
    img: "/pizza.png"
  }
]

const completedOrders = [
  {
    id: '#4821',
    vendor: "Mama's Kitchen",
    date: "12 Oct, 2023 • 14:30",
    status: "Delivered",
    items: "Jollof Rice, Grilled Chicken, Fried Plantain",
    total: "₦4,500",
    img: "/pizza.png"
  },
  {
    id: '#4820',
    vendor: "The Burger Bar",
    date: "08 Oct, 2023 • 19:15",
    status: "Delivered",
    items: "Double Wagyu Burger, Sweet Potato Fries,...",
    total: "₦8,200",
    img: "/burger.png"
  }
]

export default function Orders() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Cart') // Cart | Ongoing | Completed

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-0">
      
      {/* Header */}
      <div className="px-4 md:px-8 py-4 bg-white sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 md:hidden">
        <h1 className="text-xl font-bold text-gray-900 mx-auto">Orders</h1>
        <button className="absolute right-4 text-gray-400">
          <Search size={22} />
        </button>
      </div>

      <div className="hidden md:flex justify-between items-center px-8 py-6 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
      </div>

      <div className="max-w-3xl mx-auto w-full px-4 md:px-8 py-4">
        
        {/* Tabs */}
        <div className="flex bg-gray-200/50 p-1 rounded-xl mb-6">
          {['Cart', 'Ongoing', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CART TAB CONTENT */}
        {activeTab === 'Cart' && (
          <div className="flex flex-col gap-4">
            {carts.map(cart => (
              <div key={cart.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center p-1">
                      <img src={cart.img} alt={cart.vendor} className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{cart.vendor}</h3>
                      <p className="text-xs text-gray-500">{cart.itemsCount} item • {cart.total}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/cart')}
                    className="text-[#1A1AF5] text-xs font-bold flex items-center hover:underline"
                  >
                    View items <ChevronRight size={14} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => navigate('/app/checkout')}
                    className="w-full bg-[#1A1AF5] text-white py-3 rounded-xl font-semibold hover:bg-[#1515d4] transition-colors text-sm"
                  >
                    Checkout
                  </button>
                  <button className="w-full bg-white text-[#1A1AF5] border-2 border-[#1A1AF5] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm">
                    Clear cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ONGOING TAB CONTENT */}
        {activeTab === 'Ongoing' && (
          <div className="flex flex-col gap-4">
            {ongoingOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center p-1">
                      <img src={order.img} alt={order.vendor} className="w-10 h-10 rounded-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{order.vendor}</h3>
                      <p className="text-xs text-gray-500">Order {order.id} • Arriving in {order.eta}</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-[#1A1AF5] px-2 py-1 rounded text-[10px] font-bold">
                    {order.status}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => navigate(`/app/track/${order.id.replace('#', '')}`)}
                    className="flex-1 bg-white text-[#1A1AF5] border-2 border-[#1A1AF5] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm"
                  >
                    Track Order
                  </button>
                  <button className="w-12 h-12 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <PhoneCall size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMPLETED TAB CONTENT */}
        {activeTab === 'Completed' && (
          <div className="flex flex-col gap-4">
            {completedOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={order.img} alt={order.vendor} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{order.vendor}</h3>
                      <p className="text-[10px] text-gray-400">{order.date}</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] font-bold">
                    {order.status}
                  </span>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">{order.items}</p>
                <p className="font-bold text-gray-900 mb-4">{order.total}</p>
                
                <button 
                  onClick={() => navigate(`/app/order/${order.id.replace('#', '')}`)}
                  className="w-full bg-white text-[#1A1AF5] border border-[#1A1AF5] py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  View order details
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
