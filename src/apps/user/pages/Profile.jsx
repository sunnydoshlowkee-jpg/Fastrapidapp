import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, MapPin, CreditCard, Gift, HelpCircle, LogOut, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../../store/useStore'

export default function Profile() {
  const navigate = useNavigate()
  const { user } = useStore()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-8 relative">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-[#1A1AF5] w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        </div>
        <button className="text-[#1A1AF5] hover:opacity-80 transition-opacity">
          <Bell size={24} />
        </button>
      </div>

      <div className="px-4 lg:px-8 max-w-6xl mx-auto w-full flex-1 pt-4 lg:pt-8">
        
        {/* Desktop Title (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
        </div>

        {/* --- Top User Card (Mobile: unified white box, Desktop: standalone top banner) --- */}
        <div className="bg-white rounded-[2rem] lg:rounded-2xl p-6 lg:p-8 shadow-sm mb-6 lg:mb-10 lg:border-t-4 lg:border-red-600 relative flex flex-col lg:flex-row lg:items-center justify-between">
          
          {/* User Info */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-4 lg:gap-6 mb-6 lg:mb-0">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl lg:rounded-xl object-cover bg-gray-100 shadow-sm" />
              <div className="absolute -bottom-3 lg:-bottom-2 -right-3 lg:-right-2 bg-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 size={24} className="text-[#1A1AF5] fill-[#1A1AF5] text-white" />
              </div>
            </div>
            
            <div className="lg:mt-2">
              <div className="hidden lg:inline-block bg-blue-100 text-[#1A1AF5] text-[10px] font-bold px-2 py-1 rounded mb-2 uppercase tracking-wider">
                Gold Member
              </div>
              <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">{user.name}</h2>
              <p className="text-gray-500 font-medium">{user.phone}</p>
            </div>
          </div>

          <button 
            onClick={() => navigate('/app/profile/edit')}
            className="w-full lg:w-auto border border-[#1A1AF5] lg:border-gray-200 lg:bg-gray-100 text-[#1A1AF5] lg:text-gray-700 font-bold py-3.5 lg:py-3 lg:px-6 rounded-xl hover:bg-blue-50 lg:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <span className="hidden lg:inline-block">Edit Profile</span>
            <span className="lg:hidden">Edit Profile</span>
          </button>
        </div>

        {/* --- Menus Grid (Desktop) / List (Mobile) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:mb-10">
          
          {/* Column 1: Account Settings */}
          <div>
            <h3 className="hidden lg:block text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase">Account Settings</h3>
            <div className="flex flex-col gap-2 lg:gap-4 bg-white lg:bg-transparent rounded-[2rem] lg:rounded-none p-6 lg:p-0 shadow-sm lg:shadow-none">
              
              <button 
                onClick={() => navigate('/app/profile/addresses')}
                className="flex items-center justify-between py-4 lg:py-5 lg:px-6 lg:bg-white lg:rounded-2xl lg:shadow-sm group hover:lg:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full lg:rounded-xl bg-blue-50 flex items-center justify-center text-[#1A1AF5]">
                    <MapPin size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900">Saved Addresses</span>
                    <span className="hidden lg:block text-xs text-gray-500 mt-0.5">Manage your home and office delivery locations</span>
                  </div>
                </div>
                <ChevronRight />
              </button>

              <button 
                onClick={() => navigate('/app/profile/payment-methods')}
                className="flex items-center justify-between py-4 lg:py-5 lg:px-6 lg:bg-white lg:rounded-2xl lg:shadow-sm group hover:lg:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full lg:rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <CreditCard size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900">Payment Methods</span>
                    <span className="hidden lg:block text-xs text-gray-500 mt-0.5">Mastercard ending in 4242, and RapidPay</span>
                  </div>
                </div>
                <ChevronRight />
              </button>

              <button 
                onClick={() => navigate('/app/profile/refer-earn')}
                className="flex items-center justify-between py-4 lg:py-5 lg:px-6 lg:bg-white lg:rounded-2xl lg:shadow-sm group hover:lg:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full lg:rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                    <Gift size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900">Refer & Earn</span>
                    <span className="hidden lg:block text-xs text-gray-500 mt-0.5">Invite friends and get ₦2,000 off next order</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Hot</span>
                  <ChevronRight />
                </div>
              </button>

              {/* Mobile-only Help Center inside the white box */}
              <div className="lg:hidden">
                <button 
                  onClick={() => navigate('/app/profile/help')}
                  className="flex items-center justify-between py-4 w-full group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1A1AF5]">
                      <HelpCircle size={20} />
                    </div>
                    <span className="font-bold text-gray-900">Help Center</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>

              {/* Mobile-only Log Out inside the white box */}
              <button 
                onClick={() => setShowLogoutModal(true)}
                className="lg:hidden w-full mt-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut size={20} />
                Log out
              </button>

            </div>
          </div>

          {/* Column 2: Support & Info (Desktop Only structure) */}
          <div className="hidden lg:block">
            <h3 className="text-xs font-bold text-gray-400 tracking-wider mb-4 uppercase">Support & Info</h3>
            <div className="flex flex-col gap-4">
              
              <button 
                onClick={() => navigate('/app/profile/help')}
                className="flex items-center justify-between py-5 px-6 bg-white rounded-2xl shadow-sm group hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#1A1AF5]">
                    <HelpCircle size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900">Help</span>
                    <span className="block text-xs text-gray-500 mt-0.5">FAQs and Chat support</span>
                  </div>
                </div>
                <ChevronRight />
              </button>

              <button className="flex items-center justify-between py-5 px-6 bg-white rounded-2xl shadow-sm group hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-gray-900">Legal</span>
                    <span className="block text-xs text-gray-500 mt-0.5">Terms, Privacy, and Licenses</span>
                  </div>
                </div>
                <ChevronRight />
              </button>

              <button 
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center justify-between py-5 px-6 bg-[#fdeeee] rounded-2xl shadow-sm group hover:shadow-md transition-all mt-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#b82121] flex items-center justify-center text-white">
                    <LogOut size={20} />
                  </div>
                  <div className="text-left text-[#b82121]">
                    <span className="block font-bold">Log Out</span>
                    <span className="block text-xs opacity-80 mt-0.5">Securely sign out of your account</span>
                  </div>
                </div>
                <ArrowLeft className="rotate-180 text-[#b82121] w-5 h-5 opacity-50" />
              </button>

            </div>
          </div>
          
        </div>

        {/* Desktop Bottom Banner */}
        <div className="hidden lg:flex bg-gradient-to-r from-[#2B2BFF] to-[#1A1A99] rounded-2xl p-8 items-center justify-between text-white shadow-lg shadow-blue-500/20 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-2">Your 2024 RAPID Journey</h3>
            <p className="text-blue-200">You've saved over 45 hours using RAPID delivery.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px] border border-white/20">
              <p className="text-2xl font-bold">128</p>
              <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold mt-1">Orders</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px] border border-white/20">
              <p className="text-2xl font-bold">₦4.2k</p>
              <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold mt-1">Saved</p>
            </div>
          </div>
        </div>

      </div>

      {/* Logout Modal Overlay */}
        
      {/* Logout Modal Overlay */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center md:items-center p-0 md:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-t-[2rem] md:rounded-3xl p-6 md:p-8 animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
            
            {/* Handle bar for mobile */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 md:hidden"></div>
            
            {/* Desktop Icon */}
            <div className="hidden md:flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-[#b82121]">
                <LogOut size={28} />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Log out of RAPID?</h2>
              <p className="text-gray-500 text-sm">Are you sure you want to log out? You will need to re-authenticate to access your marketplace dashboard.</p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowLogoutModal(false)
                  // navigate('/login')
                }}
                className="w-full bg-[#b82121] hover:bg-red-800 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-red-500/20"
              >
                Log Out
              </button>
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="w-full bg-gray-100 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
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

function ChevronRight() {
  return <ArrowLeft className="rotate-180 text-gray-300 w-5 h-5" />
}
