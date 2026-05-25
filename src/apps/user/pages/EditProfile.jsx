import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, CheckCircle2, User, Clock, CreditCard, MapPin, Wallet, Bell, Shield, LogOut } from 'lucide-react'

export default function EditProfile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('personal')
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12 relative">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">Edit Profile</h1>
        </div>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-6 flex flex-col items-center">
        
        {/* Avatar */}
        <div className="relative mb-10">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-orange-100 border-4 border-white shadow-sm flex items-end justify-center pt-2">
            <img src="/driver.png" alt="Profile" className="w-full h-full object-cover" onError={(e) => {e.target.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzNCODJGNiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjRkVGMzhDIi8+PHBhdGggZD0iTTMwIDEwMCBDMzAgNjAgNzAgNjAgNzAgMTAwIiBmaWxsPSIjRkVGMzhDIi8+PC9zdmc+'}} />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
            <Camera size={14} />
          </button>
        </div>

        <div className="w-full flex flex-col gap-6 mb-8">
          
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue="Jide Johnson"
              className="w-full bg-[#F4F5F7] rounded-2xl p-4 text-[13px] text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="jide.j@rapid.ng"
              className="w-full bg-[#F4F5F7] rounded-2xl p-4 text-[13px] text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[11px] font-bold text-gray-500 mb-2">Phone</label>
            <div className="relative flex items-center">
              <input 
                type="tel" 
                defaultValue="+234 803 123 4567"
                className="w-full bg-[#F4F5F7] rounded-2xl p-4 pr-12 text-[13px] text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
                readOnly
              />
              <div className="absolute right-4 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={12} strokeWidth={4} className="text-white" />
              </div>
            </div>
          </div>

        </div>

        {/* Security Box */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Account Security</h3>
          <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
            Your phone number is verified. Changes to your primary email address will require a one-time verification code for your security.
          </p>
        </div>

      </div>

      {/* Mobile Floating Save Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA] to-transparent pb-safe z-40">
        <div className="w-full max-w-md mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="w-full bg-[#4F46E5] text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <button onClick={() => navigate(-1)} className="mr-6 p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 max-w-2xl bg-[#F4F5F7] rounded-xl px-5 py-3.5 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center border-2 border-white">3</span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 w-full mx-auto pb-12">
        
        {/* Content Area */}
        <div className="flex-1 px-10 pt-10">
          <h1 className="text-[32px] font-bold text-gray-900 mb-10">Edit profile</h1>

          <div className="w-full max-w-[800px] bg-white rounded-[32px] shadow-sm border border-gray-100 p-12 mb-8">
            
            <div className="flex flex-col items-center mb-12">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-200 mb-4 bg-gray-50">
                <img src="/driver.png" alt="Profile" className="w-full h-full object-cover" onError={(e) => {e.target.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzNCODJGNiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjIwIiBmaWxsPSIjRkVGMzhDIi8+PHBhdGggZD0iTTMwIDEwMCBDMzAgNjAgNzAgNjAgNzAgMTAwIiBmaWxsPSIjRkVGMzhDIi8+PC9zdmc+'}} />
                <div className="absolute inset-0 bg-black/10"></div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#2D2AEE] rounded-full flex items-center justify-center text-white border-[3px] border-white shadow-sm hover:bg-blue-700 transition-colors">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="font-bold text-gray-900 text-[18px] mb-1">Update Avatar</h3>
              <p className="text-[13px] text-gray-500">JPG, GIF or PNG. Max size 2MB</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    defaultValue="Alexander Mitchell"
                    className="w-full bg-[#F4F5F7] border border-transparent focus:border-[#2D2AEE] focus:bg-white rounded-xl py-4 pl-12 pr-4 text-[15px] text-gray-900 font-medium outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <input 
                    type="email" 
                    defaultValue="alex.m@rapid.io"
                    className="w-full bg-[#F4F5F7] border border-transparent focus:border-[#2D2AEE] focus:bg-white rounded-xl py-4 pl-12 pr-4 text-[15px] text-gray-900 font-medium outline-none transition-all"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-[13px] font-bold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  <input 
                    type="tel" 
                    defaultValue="+1 (555) 0123-4567"
                    className="w-full bg-[#F4F5F7] border border-transparent focus:border-[#2D2AEE] focus:bg-white rounded-xl py-4 pl-12 pr-24 text-[15px] text-gray-900 font-medium outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-green-50 text-green-600 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 size={12} strokeWidth={3} /> Verified
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div className="w-full max-w-[800px] flex gap-4 justify-center">
            <button className="bg-[#F4F5F7] text-gray-900 font-bold px-10 py-4 rounded-xl hover:bg-gray-200 transition-colors text-[15px]">
              Discard
            </button>
            <button className="bg-[#2D2AEE] text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-[15px] flex items-center gap-2">
              Save Changes <CheckCircle2 size={18} />
            </button>
          </div>

        </div>

      </div>

    </div>
  )
}
