import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Info, CheckCircle2, Download } from 'lucide-react'

export default function OrderDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const subtotal = 13000
  const deliveryFee = 1200
  const serviceCharge = 500
  const total = subtotal + deliveryFee + serviceCharge

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      
      {/* Header */}
      <div className="px-4 py-5 bg-white sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 shadow-sm md:px-8">
        <button onClick={() => navigate(-1)} className="text-gray-900 w-10 h-10 flex items-center justify-start">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Order #{id || 'RD-4821'}</h1>
        <span className="bg-blue-50 text-[#1A1AF5] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
          Delivered
        </span>
      </div>

      <div className="px-4 md:px-8 py-6 flex-1 max-w-3xl mx-auto w-full flex flex-col gap-6">
        
        {/* Vendor Header */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col items-center text-center">
          <img src="/pizza.png" alt="Vendor" className="w-20 h-20 rounded-2xl object-cover mb-3" />
          <h2 className="font-bold text-gray-900 text-lg">Kitchen Culture Lagos</h2>
          <p className="text-xs text-gray-500 mb-5">Delivered on Oct 24, 2023 • 2:45 PM</p>
          
          <div className="flex gap-3 w-full">
            <button className="flex-1 bg-[#1A1AF5] text-white py-3 rounded-xl font-bold hover:bg-[#1515d4] transition-colors shadow-sm shadow-blue-500/20 text-sm">
              Reorder
            </button>
            <button className="flex-1 bg-white text-red-500 border border-red-100 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors shadow-sm text-sm">
              Need Help?
            </button>
          </div>
        </div>

        {/* Items Summary */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 mb-3 ml-1">Items Summary</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col gap-4">
            
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <span className="font-bold text-[#1A1AF5]">1x</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Smokey Jollof Rice (Party Style)</h4>
                  <p className="text-xs text-gray-500 mt-1">Extra Spicy, Side of Coleslaw</p>
                </div>
              </div>
              <span className="font-bold text-gray-900 text-sm">₦4,500</span>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <span className="font-bold text-[#1A1AF5]">2x</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Grilled Turkey Wings</h4>
                  <p className="text-xs text-gray-500 mt-1">Peppered Glaze</p>
                </div>
              </div>
              <span className="font-bold text-gray-900 text-sm">₦6,000</span>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <span className="font-bold text-[#1A1AF5]">1x</span>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Fresh Chapman</h4>
                  <p className="text-xs text-gray-500 mt-1">Ice and Mint</p>
                </div>
              </div>
              <span className="font-bold text-gray-900 text-sm">₦2,500</span>
            </div>

            {/* Sub Order Summary inside Items box */}
            <div className="bg-gray-50 rounded-xl p-4 mt-2">
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium text-gray-900">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center gap-1">
                    Service Charge <Info size={12} className="text-gray-400" />
                  </span>
                  <span className="font-medium text-gray-900">₦{serviceCharge.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-sm">Total Amount</span>
                <span className="font-bold text-[#1A1AF5] text-xl">₦{total.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Status Timeline */}
        <div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
               <div>
                 <p className="text-xs text-gray-500">Status</p>
                 <h3 className="text-lg font-bold text-[#1A1AF5]">Delivered</h3>
               </div>
               <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#1A1AF5]">
                 <CheckCircle2 size={20} />
               </div>
            </div>

            <div className="flex flex-col gap-4 relative ml-1">
              <div className="absolute left-[3px] top-2 bottom-2 w-[1.5px] bg-gray-200 z-0"></div>
              
              <div className="flex gap-4 relative z-10">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 ring-4 ring-white"></div>
                <div>
                  <h4 className="font-bold text-gray-700 text-sm">Ordered</h4>
                  <p className="text-[10px] text-gray-400">12:00 PM</p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 ring-4 ring-white"></div>
                <div>
                  <h4 className="font-bold text-gray-700 text-sm">Accepted</h4>
                  <p className="text-[10px] text-gray-400">12:05 PM</p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="w-2 h-2 rounded-full bg-[#1A1AF5] mt-1.5 ring-4 ring-blue-50"></div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Delivered</h4>
                  <p className="text-[10px] text-[#1A1AF5] font-semibold">12:45 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div>
          <h3 className="text-sm font-bold text-gray-600 mb-3 ml-1">Delivery Details</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0 mt-1">
              <MapPin size={20} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Home</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Block 4, Flat 12, Admiralty Way,<br />Lekki Phase 1, Lagos
              </p>
            </div>
          </div>
          
          <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors mb-4 text-sm">
            <Download size={18} /> Download Receipt
          </button>
          
          <button className="w-full text-red-500 font-bold py-2 text-sm hover:underline">
            Need Help?
          </button>
        </div>

      </div>
    </div>
  )
}
