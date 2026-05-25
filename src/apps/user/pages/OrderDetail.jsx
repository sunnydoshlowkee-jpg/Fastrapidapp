import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Download, CheckCircle2, Info, Search, Home, Clock, Wallet, User, ShoppingCart, CreditCard, Copy, PhoneCall } from 'lucide-react'

// Mock Data
const orderItems = [
  {
    id: 1,
    quantity: 1,
    name: 'Smokey Jollof Rice (Party Style)',
    description: 'Extra Spicy, Side of Coleslaw',
    price: '₦4,500'
  },
  {
    id: 2,
    quantity: 2,
    name: 'Grilled Turkey Wings',
    description: 'Peppered Glaze',
    price: '₦6,000'
  },
  {
    id: 3,
    quantity: 1,
    name: 'Fresh Chapman',
    description: 'Ice and Mint',
    price: '₦2,500'
  }
]

export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTabDesktop] = useState('orders')

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
            <h1 className="text-[17px] font-bold text-gray-900">Order #{id || 'RD-4821'}</h1>
          </div>
          <div className="bg-indigo-50 px-3 py-1.5 rounded-full text-[#4F46E5] font-bold text-[10px] tracking-widest uppercase">
            Delivered
          </div>
        </div>

        <div className="flex-1 px-6 w-full max-w-md mx-auto pt-2 flex flex-col gap-8">
          
          {/* Vendor Header */}
          <div className="flex flex-col items-center mb-2">
            <div className="w-24 h-24 rounded-3xl overflow-hidden mb-4 shadow-sm border border-gray-100">
              <img src="/pizza.png" alt="Vendor" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">Kitchen Culture Lagos</h2>
            <p className="text-[11px] text-gray-500 font-medium">Delivered on Oct 24, 2023 • 2:45 PM</p>
            
            <div className="flex gap-4 w-full mt-6">
              <button className="flex-1 bg-[#4F46E5] text-white py-3.5 rounded-2xl font-semibold shadow-sm hover:bg-indigo-700 transition-colors text-[13px]">
                Reorder
              </button>
              <button className="flex-1 bg-white text-red-500 py-3.5 rounded-2xl font-semibold hover:bg-red-50 transition-colors text-[13px] border border-red-100">
                Need Help?
              </button>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Items Summary</h3>
            <div className="bg-[#F8F9FA] rounded-[24px] p-5 flex flex-col gap-5 border border-gray-100">
              {orderItems.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-3">
                  <span className="text-[#4F46E5] font-bold text-[13px] w-5">{item.quantity}x</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-[13px] mb-1">{item.name}</h4>
                    <p className="text-[11px] text-gray-400">{item.description}</p>
                  </div>
                  <span className="font-bold text-gray-900 text-[13px]">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F8F9FA] rounded-[24px] p-5 border border-gray-100">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">₦13,000</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-bold text-gray-900">₦1,200</span>
              </div>
              <div className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-1 text-gray-500">
                  Service Charge <Info size={12} className="text-gray-400" />
                </div>
                <span className="font-bold text-gray-900">₦500</span>
              </div>
              <div className="flex justify-between items-center mt-3 pt-4 border-t border-gray-200">
                <span className="text-sm font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-[#4F46E5]">₦14,700</span>
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
            <h3 className="text-[15px] font-bold text-[#4F46E5] mb-6">Delivered</h3>
            
            <div className="relative pl-2.5 mb-2">
              <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex gap-5 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#A0AAB2] mt-1.5 ring-4 ring-[#FAFAFA]"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Ordered</h4>
                    <p className="text-[11px] text-gray-400">12:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#A0AAB2] mt-1.5 ring-4 ring-[#FAFAFA]"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Accepted</h4>
                    <p className="text-[11px] text-gray-400">12:05 PM</p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#4F46E5] mt-1.5 ring-4 ring-indigo-50"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5">Delivered</h4>
                    <p className="text-[11px] text-[#4F46E5] font-bold">12:45 PM</p>
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
                <h4 className="font-bold text-gray-900 text-[13px] mb-0.5">Home</h4>
                <p className="text-[11px] text-gray-500 leading-snug">Block 4, Admiralty Way, Lekki Phase 1, Lagos</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 mt-2">
            <button className="w-full bg-[#E8EAE6] text-gray-900 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-[13px]">
              <Download size={16} /> Download Receipt
            </button>
            <button className="text-red-500 text-[13px] font-bold hover:underline mb-4">
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
              <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <ShoppingCart size={20} className="text-gray-700" strokeWidth={2} />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">3</span>
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
                      <p className="text-[12px] text-gray-500 text-center font-medium">12:00 PM</p>
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className="w-9 h-9 rounded-full bg-[#2D2AEE] border-[4px] border-white mb-3 flex items-center justify-center text-white">
                        <CheckCircle2 size={16} />
                      </div>
                      <p className="font-bold text-gray-900 text-[14px] text-center mb-1">Accepted</p>
                      <p className="text-[12px] text-gray-500 text-center font-medium">12:05 PM</p>
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className="w-9 h-9 rounded-full bg-[#2D2AEE] border-[4px] border-white mb-3 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                      <p className="font-bold text-[#2D2AEE] text-[14px] text-center mb-1">On the way</p>
                      <p className="text-[12px] text-gray-500 text-center font-medium">1:20 PM</p>
                    </div>
                    
                    <div className="flex flex-col items-center relative z-10 w-24">
                      <div className="w-9 h-9 rounded-full bg-gray-200 border-[4px] border-white mb-3 flex items-center justify-center text-white">
                      </div>
                      <p className="font-bold text-gray-400 text-[14px] text-center mb-1">Arriving</p>
                      <p className="text-[12px] text-gray-400 text-center font-medium">Est. 1:35 PM</p>
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
                      <h4 className="font-bold text-gray-900 text-[14px] mb-1">Alexander Mitchell</h4>
                      <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                        Block 4, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                      </p>
                      <p className="text-[13px] text-gray-500 font-medium mt-2">+1 (555) 0123-4567</p>
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
                        <div className="bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded">VISA</div>
                        <h4 className="font-bold text-gray-900 text-[14px]">•••• •••• •••• 4242</h4>
                      </div>
                      <p className="text-[13px] text-gray-500 font-medium mt-3">
                        Total paid: <span className="font-bold text-gray-900">₦14,700</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Map */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex flex-col h-[320px]">
                  <h3 className="text-[16px] font-bold text-gray-900 mb-4">Delivery Map</h3>
                  <div className="w-full flex-1 rounded-2xl overflow-hidden relative border border-gray-200 bg-gray-100 group cursor-pointer">
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-[#e8eae6] opacity-50"></div>
                    <div className="absolute w-full h-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 Q 25 25, 50 50 T 100 50\' fill=\'none\' stroke=\'%23d1d5db\' stroke-width=\'2\'/%3E%3C/svg%3E")', backgroundSize: '100px 100px' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="absolute w-[60%] h-[60%] border-[3px] border-dashed border-[#2D2AEE] opacity-40 transform -skew-x-12 -skew-y-12 rounded-[40px]"></div>
                    </div>
                    
                    {/* Courier Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="bg-white rounded-full p-1 shadow-lg mb-1">
                        <div className="w-8 h-8 bg-orange-100 rounded-full overflow-hidden border border-gray-200">
                           <img src="/driver.png" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        Tunde is 5 mins away
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Receipt) */}
              <div className="w-[380px] shrink-0 flex flex-col gap-6">
                
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                  <h2 className="text-[20px] font-bold text-gray-900 mb-6">Order Receipt</h2>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                      <img src="/pizza.png" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-[16px] mb-1">Kitchen Culture Lagos</h3>
                      <p className="text-[13px] text-gray-500 font-medium">Oct 24, 2023 • 2:45 PM</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 mb-6">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex justify-between items-start gap-3">
                        <span className="text-gray-400 font-bold text-[14px] w-5">{item.quantity}x</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-[14px] mb-1">{item.name}</h4>
                          <p className="text-[12px] text-gray-500">{item.description}</p>
                        </div>
                        <span className="font-bold text-gray-900 text-[14px]">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F4F5F7] rounded-2xl p-5 border border-transparent flex flex-col gap-4 mb-8">
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="font-bold text-gray-900">₦13,000</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <span className="text-gray-500 font-medium">Delivery Fee</span>
                      <span className="font-bold text-gray-900">₦1,200</span>
                    </div>
                    <div className="flex justify-between items-center text-[14px]">
                      <div className="flex items-center gap-1 text-gray-500 font-medium">
                        Service Charge <Info size={14} className="text-gray-400" />
                      </div>
                      <span className="font-bold text-gray-900">₦500</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-200 border-dashed">
                      <span className="text-[16px] font-bold text-gray-900">Total Amount</span>
                      <span className="text-[24px] font-bold text-[#2D2AEE]">₦14,700</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-1">Transaction ID</p>
                      <p className="text-[14px] font-bold text-gray-900">#TRX-8829-441-A</p>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D2AEE] shadow-sm hover:bg-gray-100 transition-colors">
                      <Copy size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="w-full bg-[#2D2AEE] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors text-[14px]">
                    <Download size={18} /> Download Receipt
                  </button>
                  <button className="w-full bg-white border border-gray-200 text-red-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors text-[14px]">
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
