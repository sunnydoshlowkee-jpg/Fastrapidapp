import { useNavigate } from 'react-router-dom'
import { ArrowLeft, X, Minus, Plus, Info, Trash2, ArrowRight, Search, MapPin, ShoppingCart } from 'lucide-react'
import { useCart } from '../../../context/CartContext'

// Mobile Mock Data
const mobileCartItems = [
  { id: 1, name: 'Party Jollof Rice & Chicken', price: '₦4,500', quantity: 1, img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500&h=500&fit=crop' },
  { id: 2, name: 'Pounded Yam & Efo Riro', price: '₦5,200', quantity: 1, img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=500&fit=crop' },
  { id: 3, name: 'Beef Meat Pie (2pcs)', price: '₦1,800', quantity: 1, img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop' }
]

// Desktop Mock Data
const desktopCartItems = [
  { id: 101, name: 'Elite Runner 300', specs: 'Size: 42 • Color: Electric Red', price: '₦120.00', qty: 1, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop' },
  { id: 102, name: 'Studio Beats Pro', specs: 'Connectivity: Wireless • Color: Matte Black', price: '₦299.00', qty: 1, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop' },
  { id: 103, name: 'Nomad Classic Watch', specs: 'Strap: Genuine Leather • Movement: Quartz', price: '₦185.00', qty: 1, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop' },
]

export default function CartDetail() {
  const navigate = useNavigate()
  const { items, updateQty, remove, count, subtotal, deliveryFee, serviceCharge, total, clear } = useCart()

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center gap-3 px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-6 flex flex-col">
        {/* Cart Items */}
        <div className="flex flex-col gap-6 mb-8 border-b border-gray-100 pb-8 max-h-[400px] overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-[13px] leading-tight pr-4">{item.name}</h3>
                  <button onClick={() => remove(item.id)} className="text-red-500 p-0.5 hover:bg-red-50 rounded">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-gray-900 text-sm">{item.price}</span>
                  <div className="flex items-center gap-4 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-5 h-5 flex items-center justify-center text-[#4F46E5] disabled:opacity-50">
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="text-[13px] font-bold text-gray-900 w-2 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-5 h-5 flex items-center justify-center text-[#4F46E5]">
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* Order Summary */}
        <h3 className="text-sm font-bold text-gray-900 mb-4">Order Summary</h3>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-gray-500">Delivery fee</span>
            <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <div className="flex items-center gap-1 text-gray-500">
              Service fee <Info size={12} className="text-gray-400" />
            </div>
            <span className="font-medium text-gray-900">₦{serviceCharge.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold text-gray-900 mt-2 pt-4 border-t border-gray-100">
            <span>Total</span>
            <span className="text-[#4F46E5]">₦{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <button 
            disabled={items.length === 0}
            onClick={() => navigate('/app/checkout')}
            className="w-full bg-[#4F46E5] text-white py-3.5 rounded-2xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-[13px] disabled:opacity-50 disabled:shadow-none"
          >
            Checkout
          </button>
          <button onClick={clear} className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]">
            Clear Cart
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      {/* Desktop Top Bar */}
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="flex-1 flex justify-center px-8">
          <div className="w-full max-w-2xl bg-gray-100/70 hover:bg-gray-100 rounded-xl px-5 py-3.5 flex items-center gap-3 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-500 border border-transparent">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for food, groceries, or essentials..." 
              className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <MapPin size={20} className="text-[#4F46E5]" strokeWidth={2} />
            <span className="font-semibold text-[#4F46E5] text-[15px]">Lagos, NG</span>
          </div>
          <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
            <ShoppingCart size={24} className="text-gray-700" />
            {count > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">{count}</span>}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1200px] mx-auto px-10 pt-10 pb-12">
        <h1 className="text-[28px] font-bold text-gray-900 mb-8">My Cart</h1>

        <div className="flex gap-10 items-start">
          
          {/* Left Column (Cart Items) */}
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[18px] font-bold text-gray-900">Items ({count})</span>
              <button onClick={clear} className="text-[14px] font-bold text-red-500 hover:text-red-600 transition-colors">Remove All</button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto max-h-[600px] pr-2">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-all">
                  <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-gray-50 shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-1">
                    <h3 className="font-bold text-[18px] text-gray-900">{item.name}</h3>
                    <p className="text-[13px] text-gray-500">{item.desc || 'Special item'}</p>
                    
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-4 bg-gray-50 rounded-lg px-2 py-1.5 border border-gray-200">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded shadow-sm transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="text-[14px] font-bold text-gray-900 w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-white rounded shadow-sm transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="shrink-0 pl-6 border-l border-gray-100 h-full flex flex-col justify-center">
                    <span className="font-bold text-[20px] text-gray-900">{item.price}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Your cart is empty.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Summary) */}
          <div className="w-[380px] shrink-0 sticky top-[120px]">
            <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
              <h2 className="text-[20px] font-bold text-gray-900 mb-8">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500 font-medium">Delivery Fee</span>
                  <span className="font-bold text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px]">
                  <span className="text-gray-500 font-medium">Service Tax (5%)</span>
                  <span className="font-bold text-gray-900">₦{serviceCharge.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6 border-y border-gray-100 mb-8">
                <span className="text-[20px] font-bold text-gray-900">Total</span>
                <span className="text-[24px] font-bold text-[#2D2AEE]">₦{total.toLocaleString()}</span>
              </div>

              <div className="mb-8">
                <label className="block text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-3">Promo Code</label>
                <div className="flex gap-3">
                  <input 
                    id="promo-input"
                    type="text" 
                    placeholder="Enter code" 
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                  />
                  <button onClick={() => {
                    const el = document.getElementById('promo-input');
                    if (el && el.value) {
                      alert('Validating promo code ' + el.value + ' with server...');
                      // Here you would call promotionService.applyPromo(...)
                    } else {
                      alert('Please enter a promo code first.');
                    }
                  }} className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-xl text-[14px] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <button 
                disabled={items.length === 0}
                onClick={() => navigate('/app/checkout')}
                className="w-full bg-[#2D2AEE] text-white py-4.5 rounded-xl font-bold text-[16px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:shadow-none"
              >
                Checkout Now <ArrowRight size={20} />
              </button>
            </div>
            
            {/* Red decorative line at bottom matching screenshot */}
            <div className="w-[80%] mx-auto h-[2px] bg-red-200 mt-8 rounded-full" />
          </div>

        </div>
      </div>

    </div>
  )
}
