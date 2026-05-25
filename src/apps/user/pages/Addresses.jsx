import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, Briefcase, Home, MapPin, Plus, Edit2, User, Clock, CreditCard, Wallet, Bell, Shield, LogOut } from 'lucide-react'

export default function Addresses() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('Work') // Work | Home | Other
  const [activeTab, setActiveTab] = useState('addresses')
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">Addresses</h1>
        </div>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-2">
        {/* Mobile Filters */}
        <div className="flex gap-3 mb-6">
          {['Work', 'Home', 'Other'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 py-2 rounded-full text-[11px] font-bold transition-all border ${
                activeFilter === filter
                  ? 'border-[#4F46E5] text-[#4F46E5] bg-white'
                  : 'border-gray-200 text-gray-500 bg-[#F4F5F7]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors text-[13px] mb-8">
          <Plus size={16} strokeWidth={3} /> Add New Address
        </button>

        <div className="flex flex-col gap-6">
          {/* Mobile Address Card 1 */}
          <div className="bg-[#F8F9FA] rounded-[24px] p-5 shadow-sm border border-gray-100 relative">
            <button className="absolute top-5 right-5 text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={16} />
            </button>
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-indigo-200">
                <Briefcase size={18} />
              </div>
              <div className="pr-6">
                <h3 className="font-bold text-gray-900 text-sm mb-1">The Hive Coworking</h3>
                <p className="text-[11px] text-gray-500 leading-snug">12B Adetokunbo Ademola St, Victoria Island, Lagos</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-[#4F46E5]">Default Address</span>
              <div className="w-10 h-6 bg-[#4F46E5] rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm transition-transform"></div>
              </div>
            </div>
          </div>

          {/* Mobile Address Card 2 */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative">
            <button className="absolute top-5 right-5 text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={16} />
            </button>
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
                <Home size={18} />
              </div>
              <div className="pr-6">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Lekki Residence</h3>
                <p className="text-[11px] text-gray-500 leading-snug">Block A4, Apartment 302, Richmond Gate Estate, Lekki Phase 1</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-900">Set as Default</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-32 rounded-[24px] overflow-hidden shadow-sm">
            <img src="/grocery-hero.png" alt="Banner" className="w-full h-full object-cover filter grayscale opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-5">
              <p className="text-white text-[11px] font-medium leading-tight w-3/4">Save your most frequent stops for faster checkouts.</p>
            </div>
          </div>

          {/* Mobile Address Card 3 */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 relative">
            <button className="absolute top-5 right-5 text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={16} />
            </button>
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div className="pr-6">
                <h3 className="font-bold text-gray-900 text-sm mb-1">Gym & Wellness</h3>
                <p className="text-[11px] text-gray-500 leading-snug">Fitness Center, Palms Mall, Oniru Street, Lagos</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-900">Set as Default</span>
              <div className="w-10 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full shadow-sm transition-transform"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <button onClick={() => navigate(-1)} className="mr-6 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[24px] font-bold text-gray-900">Account Settings</h1>
      </div>

      <div className="hidden md:flex flex-1 w-full max-w-[1200px] mx-auto px-10 pt-10 pb-12 gap-10 items-start">
        
        {/* Sidebar Navigation */}
        <div className="w-[320px] bg-white rounded-3xl border border-gray-100 shadow-sm p-6 shrink-0 sticky top-[120px]">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200">
               <img src="/driver.png" alt="Babajide Johnson" className="w-full h-full object-cover" onError={(e) => {e.target.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzNCODJGNiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjRkVGMzhDIi8+PHBhdGggZD0iTTMwIDEwMCBDMzAgNjAgNzAgNjAgNzAgMTAwIiBmaWxsPSIjRkVGMzhDIi8+PC9zdmc+'}} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[16px]">Babajide Johnson</h3>
              <p className="text-[13px] text-gray-500">babajide.j@example.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { id: 'personal', label: 'Personal Information', icon: User, path: '/app/profile' },
              { id: 'orders', label: 'Order History', icon: Clock, path: '/app/profile' },
              { id: 'payment', label: 'Payment Methods', icon: CreditCard, path: '/app/profile/payment-methods' },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin, path: '/app/profile/addresses' },
              { id: 'wallet', label: 'RAPID Wallet', icon: Wallet, path: '/app/profile' },
              { id: 'notifications', label: 'Notifications', icon: Bell, path: '/app/profile' },
              { id: 'security', label: 'Security Settings', icon: Shield, path: '/app/profile' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 p-4 rounded-xl font-bold text-[14px] transition-colors text-left ${
                  activeTab === item.id 
                    ? 'bg-indigo-50/50 text-[#2D2AEE]' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'text-[#2D2AEE]' : 'text-gray-400'} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="my-6 border-t border-gray-100"></div>

          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-4 p-4 rounded-xl font-bold text-[14px] text-red-500 hover:bg-red-50 transition-colors w-full text-left"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>

        {/* Desktop Addresses Content */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-10 min-h-[600px]">
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
            <h2 className="text-[24px] font-bold text-gray-900">Saved Addresses</h2>
            <button className="bg-[#2D2AEE] hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20 text-[15px] flex items-center gap-2">
              <Plus size={18} strokeWidth={3} /> Add New Address
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            
            {/* Desktop Address Card 1 (Default) */}
            <div className="bg-[#F4F5F7] rounded-2xl p-6 border-2 border-[#2D2AEE] shadow-sm relative group">
              <div className="absolute top-6 right-6 flex gap-3">
                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-[#2D2AEE] shadow-sm transition-colors border border-gray-200">
                  <Edit2 size={16} />
                </button>
                <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 shadow-sm transition-colors border border-gray-200">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-start gap-4 mb-4 pr-24">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2D2AEE] shrink-0 shadow-sm border border-indigo-100">
                  <Home size={22} />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 text-[18px]">Lekki Residence</h3>
                    <span className="bg-[#2D2AEE] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">Default</span>
                  </div>
                  <p className="text-[14px] text-gray-500 leading-relaxed">Block A4, Apartment 302, Richmond Gate Estate, Lekki Phase 1, Lagos</p>
                </div>
              </div>
            </div>

            {/* Desktop Address Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 shadow-sm relative group transition-colors">
              <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#2D2AEE] transition-colors border border-gray-200">
                  <Edit2 size={16} />
                </button>
                <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors border border-gray-200">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-start gap-4 mb-6 pr-24">
                <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center text-gray-500 shrink-0">
                  <Briefcase size={22} />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-[18px] mb-1">The Hive Coworking</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">12B Adetokunbo Ademola St, Victoria Island, Lagos</p>
                </div>
              </div>
              <button className="text-[14px] font-bold text-gray-500 hover:text-[#2D2AEE] transition-colors">
                Set as Default
              </button>
            </div>

            {/* Desktop Address Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 shadow-sm relative group transition-colors">
              <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 hover:text-[#2D2AEE] transition-colors border border-gray-200">
                  <Edit2 size={16} />
                </button>
                <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors border border-gray-200">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-start gap-4 mb-6 pr-24">
                <div className="w-12 h-12 bg-[#F4F5F7] rounded-full flex items-center justify-center text-gray-500 shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gray-900 text-[18px] mb-1">Gym & Wellness</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed">Fitness Center, Palms Mall, Oniru Street, Lagos</p>
                </div>
              </div>
              <button className="text-[14px] font-bold text-gray-500 hover:text-[#2D2AEE] transition-colors">
                Set as Default
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)}></div>
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 relative z-10 shadow-2xl scale-100 transition-transform">
            <div className="text-center mb-8">
              <h2 className="text-[22px] font-bold text-gray-900 mb-2">Log out of RAPID?</h2>
              <p className="text-[15px] text-gray-500 font-medium">You will need to sign back in.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowLogoutModal(false)
                  navigate('/login')
                }}
                className="w-full bg-[#D92D20] text-white py-4 rounded-xl font-bold shadow-md hover:bg-red-700 transition-colors text-[15px]"
              >
                Log Out
              </button>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-white text-gray-700 border border-gray-200 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors text-[15px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
