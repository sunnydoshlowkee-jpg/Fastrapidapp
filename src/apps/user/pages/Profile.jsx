import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, MapPin, CreditCard, Gift, HelpCircle, LogOut, ChevronRight, CheckCircle2, Shield, Camera, Edit2 } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { formatPhoneDisplay, getDisplayName } from '../../../utils/userDisplay'

export default function Profile() {
  const navigate = useNavigate()
  const { user, loading, logout, refreshUser } = useAuth()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  useEffect(() => {
    if (!loading && !localStorage.getItem('rapid_token')) {
      navigate('/auth/login', { replace: true })
    }
  }, [loading, navigate])

  const displayName = getDisplayName(user) || 'Your profile'
  const displayPhone = formatPhoneDisplay(user?.phone) || '—'
  const membershipLabel = user?.membership_label || 'Member'
  const ordersCount = user?.orders_count ?? 0

  const handleLogout = async () => {
    setShowLogoutModal(false)
    await logout()
    navigate('/auth/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] text-gray-500">
        Loading profile…
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12 relative">

      <div className="md:hidden flex items-center justify-between px-6 pt-12 pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <button type="button" onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Profile</h1>
        <button type="button" className="p-1 -mr-1 text-[#4F46E5] rounded-full transition-colors relative">
          <Bell size={22} />
          <div className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
      </div>

      <div className="md:hidden px-6 w-full max-w-md mx-auto pt-4 flex flex-col items-center">
        <div className="bg-white w-full rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md bg-[#3B82F6] flex items-center justify-center">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-[#FEF38D]">
                {(user?.first_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
              </span>
            )}
            <div className="absolute bottom-1 right-1 bg-white rounded-full p-0.5">
              <CheckCircle2 size={18} className="text-[#4F46E5] fill-white" strokeWidth={3} />
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-0.5">{displayName}</h2>
          <p className="text-xs font-semibold text-gray-400 mb-6">{displayPhone}</p>

          <button
            type="button"
            onClick={() => navigate('/app/profile/edit')}
            className="w-full bg-white text-[#4F46E5] border border-[#4F46E5] py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-colors text-[13px]"
          >
            Edit Profile
          </button>
        </div>

        <div className="w-full flex flex-col gap-1 mb-8">
          <div onClick={() => navigate('/app/profile/addresses')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors group">
            <div className="flex items-center gap-4">
              <MapPin size={20} className="text-gray-400 group-hover:text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-800">Saved Addresses</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          <div onClick={() => navigate('/app/profile/payment-methods')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors group">
            <div className="flex items-center gap-4">
              <CreditCard size={20} className="text-gray-400 group-hover:text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-800">Payment Methods</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          <div onClick={() => navigate('/app/profile/refer-earn')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors group">
            <div className="flex items-center gap-4">
              <Gift size={20} className="text-gray-400 group-hover:text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-800">Refer & Earn</span>
              <span className="bg-yellow-400 text-yellow-900 text-[9px] font-bold px-2 py-0.5 rounded-full">Earn ₦2,000</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          <div onClick={() => navigate('/app/profile/help')} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-2xl transition-colors group">
            <div className="flex items-center gap-4">
              <HelpCircle size={20} className="text-gray-400 group-hover:text-gray-600" />
              <span className="text-[13px] font-semibold text-gray-800">Help Center</span>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="w-full bg-[#FFE5E5] text-[#D92D20] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors text-[13px]"
        >
          <LogOut size={18} strokeWidth={2.5} /> Log out
        </button>
      </div>

      <div className="hidden md:flex flex-1 w-full mx-auto px-10 pt-10 pb-12 gap-10 items-start max-w-[1000px]">
        <div className="flex-1 w-full">

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex items-center justify-between mb-10 relative overflow-hidden border-t-[6px] border-t-red-600">
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 bg-[#2C3440] rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-[#FCD34D]">
                    {(user?.first_name?.[0] || user?.email?.[0] || '?').toUpperCase()}
                  </span>
                )}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D2AEE] rounded-full flex items-center justify-center text-white border-[3px] border-white cursor-pointer z-10 hover:bg-blue-700 transition-colors">
                  <Camera size={14} />
                </div>
              </div>

              <div>
                <div className="bg-indigo-50 text-[#2D2AEE] text-[10px] font-bold px-3 py-1.5 rounded-full w-max tracking-widest uppercase mb-2">
                  {membershipLabel}
                </div>
                <h1 className="text-[32px] font-bold text-gray-900 leading-none mb-2">{displayName}</h1>
                <p className="text-[15px] text-gray-500 font-medium flex items-center gap-2">
                  <span className="text-gray-400 text-lg">📞</span> {displayPhone}
                </p>
                {user?.email ? (
                  <p className="text-[14px] text-gray-400 mt-1">{user.email}</p>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/app/profile/edit')}
              className="bg-[#F4F5F7] hover:bg-gray-200 text-gray-900 font-bold px-6 py-3.5 rounded-xl transition-colors flex items-center gap-2 text-[14px] shadow-sm"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase mb-4 pl-1">Account Settings</p>
              <div className="flex flex-col gap-3">
                <div onClick={() => navigate('/app/profile/addresses')} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-[#2D2AEE]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-0.5 group-hover:text-[#2D2AEE] transition-colors">Saved Addresses</h4>
                      <p className="text-[12px] text-gray-400 font-medium">Manage your home and office delivery locations</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>

                <div onClick={() => navigate('/app/profile/payment-methods')} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-0.5 group-hover:text-green-500 transition-colors">Payment Methods</h4>
                      <p className="text-[12px] text-gray-400 font-medium">Mastercard ending in 4242, and RapidPay</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>

                <div onClick={() => navigate('/app/profile/refer-earn')} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
                      <Gift size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-0.5 group-hover:text-orange-500 transition-colors">Refer & Earn</h4>
                      <p className="text-[12px] text-gray-400 font-medium">Invite friends and get ₦2,000 off next order</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded uppercase">Hot</span>
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-bold tracking-widest text-gray-400 uppercase mb-4 pl-1">Support & Info</p>
              <div className="flex flex-col gap-3">
                <div onClick={() => navigate('/app/profile/help')} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F4F5F7] rounded-xl flex items-center justify-center text-[#2D2AEE]">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-0.5 group-hover:text-[#2D2AEE] transition-colors">Help</h4>
                      <p className="text-[12px] text-gray-400 font-medium">FAQs and Chat support</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:border-gray-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F4F5F7] rounded-xl flex items-center justify-center text-gray-600">
                      <Shield size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">Legal</h4>
                      <p className="text-[12px] text-gray-400 font-medium">Terms, Privacy, and Licenses</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </div>

                <div onClick={() => setShowLogoutModal(true)} className="bg-red-50/50 rounded-2xl p-5 border border-red-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-red-50 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#D92D20] rounded-xl flex items-center justify-center text-white shadow-sm shadow-red-200">
                      <LogOut size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#D92D20] text-[15px] mb-0.5">Log Out</h4>
                      <p className="text-[12px] text-red-400/80 font-medium">Securely sign out of your account</p>
                    </div>
                  </div>
                  <ArrowLeft size={18} className="text-red-300 rotate-180" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#2D2AEE] to-[#1a19b8] rounded-[32px] p-8 flex items-center justify-between text-white shadow-xl shadow-blue-500/20">
            <div>
              <h3 className="text-[24px] font-bold mb-1">Your RAPID Journey</h3>
              <p className="text-blue-200 text-[14px]">
                {ordersCount > 0
                  ? `You've placed ${ordersCount} order${ordersCount === 1 ? '' : 's'} with RAPID.`
                  : 'Place your first order to start your journey.'}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl py-4 px-6 text-center border border-white/20 min-w-[110px]">
                <p className="text-[28px] font-bold leading-none mb-1">{ordersCount}</p>
                <p className="text-[10px] uppercase tracking-widest text-blue-200 font-bold">Orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 relative z-10 shadow-2xl scale-100 transition-transform">
            <div className="text-center mb-8">
              <h2 className="text-[22px] font-bold text-gray-900 mb-2">Log out of RAPID?</h2>
              <p className="text-[15px] text-gray-500 font-medium">You will need to sign back in.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-[#D92D20] text-white py-4 rounded-xl font-bold shadow-md hover:bg-red-700 transition-colors text-[15px]"
              >
                Log Out
              </button>
              <button
                type="button"
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
