import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Share2, Search, MapPin, Home, Clock, Wallet, User, Send, ShoppingCart, Gift, Users, ChevronDown } from 'lucide-react'
import { getReferrals } from '../../../services/referralService'

export default function ReferEarn() {
  const navigate = useNavigate()
  const [activeTab] = useState('profile')
  const [referralData, setReferralData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        setLoading(true)
        const { data } = await getReferrals()
        setReferralData(data.data)
      } catch (err) {
        console.error('Failed to fetch referral data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReferralData()
  }, [])

  const copyToClipboard = () => {
    if (referralData?.referral_code) {
      navigator.clipboard.writeText(referralData.referral_code)
      alert('Referral code copied!')
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount || 0)
  }

  if (loading || !referralData) {
    return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">Loading referral stats...</div>
  }

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
          <h1 className="text-[17px] font-bold text-gray-900">Refer & Earn</h1>
        </div>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-2 flex flex-col items-center">
        
        {/* Top Image */}
        <div className="w-full h-[280px] rounded-3xl overflow-hidden mb-6 bg-gray-200">
           <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
             <span className="text-8xl">🎁</span>
           </div>
        </div>

        {/* Copy */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Gift ₦500, Get ₦500</h2>
          <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-[280px] mx-auto">
            Your friend gets ₦500 off their first order. You get ₦500 when they complete it.
          </p>
        </div>

        {/* Referral Code Box */}
        <div className="w-full bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Your Referral Code</p>
          <div className="bg-[#F4F5F7] rounded-2xl p-4 flex items-center justify-between">
            <span className="font-bold text-gray-900 text-lg tracking-wider">{referralData.referral_code}</span>
            <button onClick={copyToClipboard} className="text-[#4F46E5] p-2 hover:bg-indigo-50 rounded-xl transition-colors">
              <Copy size={20} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 w-full mb-8">
          <div className="flex-1 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
            <p className="text-[11px] font-bold text-gray-500 mb-1">Successful Refers</p>
            <p className="text-2xl font-bold text-gray-900">{referralData.successful}</p>
          </div>
          <div className="flex-1 bg-indigo-50/50 rounded-[24px] p-5 shadow-sm border border-indigo-50 flex flex-col justify-center">
            <p className="text-[11px] font-bold text-[#4F46E5] mb-1">Earnings</p>
            <p className="text-2xl font-bold text-[#4F46E5]">{formatCurrency(referralData.earnings)}</p>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col items-center">
          <button className="w-full bg-[#4F46E5] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-sm mb-4">
            <Share2 size={18} /> Share My Code
          </button>
          <p className="text-[10px] text-gray-400 font-bold">Terms and Conditions apply</p>
        </div>

      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-3 w-[280px] shrink-0">
          <h1 className="text-[24px] font-bold text-gray-900">Refer & Earn</h1>
        </div>
        <div className="flex-1 max-w-2xl bg-[#F4F5F7] rounded-xl px-5 py-3.5 flex items-center gap-3 mx-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search rewards..." 
            className="w-full bg-transparent outline-none text-[15px] placeholder-gray-500 text-gray-900"
          />
        </div>
        <div className="flex items-center gap-6 shrink-0 ml-auto">
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <MapPin size={20} className="text-gray-500" strokeWidth={2} />
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
            <ShoppingCart size={20} className="text-gray-500" strokeWidth={2} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full border border-gray-200 transition-colors">
            <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
               <img src="/driver.png" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
            </div>
            <ChevronDown size={16} className="text-gray-500 mr-1" />
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-1 w-full mx-auto pb-12">
        
        {/* Content Area */}
        <div className="flex-1 px-12 pt-8 max-w-[1200px]">
          
          {/* Hero Banner */}
          <div className="relative w-full h-[320px] rounded-[32px] overflow-hidden mb-10 shadow-sm group cursor-pointer">
            <div className="absolute inset-0 bg-[#2C2E3E]">
              {/* Fallback pattern for the hero graphic */}
              <div className="w-full h-full bg-gradient-to-r from-gray-900 via-[#1a1b26] to-[#2d3748] flex items-center justify-end pr-20">
                <span className="text-[150px] opacity-20">👨🏽‍💼</span>
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col justify-center p-12 w-2/3">
              <div className="bg-[#D92D20] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded w-max mb-6">
                Exclusive Rewards
              </div>
              <h1 className="text-[48px] font-bold text-white leading-[1.1] tracking-tight mb-4 text-shadow-sm">
                Share the speed,<br />get rewarded.
              </h1>
              <p className="text-[16px] text-gray-300 font-medium mb-8 max-w-md">
                Invite your friends to RAPID. When they complete their first order, you both get ₦500 in your wallet.
              </p>
              <button className="bg-[#2D2AEE] hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20 text-[15px] w-max flex items-center gap-2">
                Get Started Now <ArrowLeft size={18} className="rotate-180" />
              </button>
            </div>
          </div>

          <div className="flex gap-8 mb-10 items-start">
            
            {/* Left Column (Referral Code & Steps) */}
            <div className="flex-1 flex flex-col gap-8">
              
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 text-[18px] mb-1">Your Referral Code</h3>
                <p className="text-[14px] text-gray-500 mb-6">Share this unique code with your network to start earning.</p>
                
                <div className="bg-[#F4F5F7] border border-gray-200 border-dashed rounded-2xl p-5 flex items-center justify-between mb-6">
                  <span className="font-bold text-[#2D2AEE] text-[20px] tracking-wider">{referralData.referral_code}</span>
                  <button onClick={copyToClipboard} className="text-[#2D2AEE] font-bold text-[13px] flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">
                    <Copy size={16} /> COPY
                  </button>
                </div>

                <button className="w-full bg-[#2D2AEE] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors text-[15px] mb-6">
                  <Share2 size={18} /> Share My Code
                </button>

                <div className="flex gap-4">
                  {['bg-[#1DB954]', 'bg-[#1877F2]', 'bg-black'].map((color, i) => (
                    <button key={i} className={`flex-1 ${color} rounded-xl py-3.5 flex justify-center items-center text-white hover:opacity-90 transition-opacity`}>
                      <div className="w-5 h-5 bg-white/20 rounded-md"></div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-[#2D2AEE] mb-4">
                    <Send size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-[14px] mb-2">Send Invite</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Share your link or code with friends.</p>
                </div>
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                    <ShoppingCart size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-[14px] mb-2">Friend Orders</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">They make their first purchase on RAPID.</p>
                </div>
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 mb-4">
                    <Wallet size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-[14px] mb-2">Both Earn</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed">Wallet credited instantly after order completion.</p>
                </div>
              </div>

            </div>

            {/* Right Column (Stats & Recent) */}
            <div className="w-[360px] shrink-0 flex flex-col gap-6">
              
              <div className="bg-gradient-to-br from-[#1E1E2F] to-[#12121D] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden border border-white/5">
                <div className="absolute top-8 right-8 text-gray-400/30">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-2">Lifetime Earnings</p>
                <h3 className="text-[42px] font-bold mb-10">{formatCurrency(referralData.earnings)}</h3>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Referrals</p>
                    <p className="text-[20px] font-bold">{referralData.total_referrals}</p>
                  </div>
                  <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pending</p>
                    <p className="text-[20px] font-bold">{referralData.pending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-[16px]">Recent Successes</h3>
                  <button className="text-[#2D2AEE] text-[12px] font-bold">View All</button>
                </div>
                
                <div className="flex flex-col gap-6">
                  {referralData.recent.map((user, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-[14px] mb-0.5">{user.name}</p>
                          <p className="text-[12px] text-gray-500">{user.status}</p>
                        </div>
                      </div>
                      <span className={`font-bold ${user.color}`}>{user.amount}</span>
                    </div>
                  ))}
                  {referralData.recent.length === 0 && (
                    <p className="text-[12px] text-gray-400">No referrals yet.</p>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Elite Banner */}
          <div className="w-full bg-[#F8F9FF] rounded-[32px] border border-indigo-100 p-8 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#2D2AEE] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Gift size={28} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[20px] mb-1">Join the Rapid Elite Circle</h3>
                <p className="text-[14px] text-gray-500">Refer 20 friends to unlock Elite Merchant perks, including 0% delivery fees for a month.</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-[-8px]">
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 z-30">
                  <img src="/driver.png" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-300 z-20 -ml-3">
                  <img src="/grocery-hero.png" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center -ml-3 text-[10px] font-bold text-gray-500 z-10 shadow-sm">
                  +8k
                </div>
              </div>
              <p className="text-[#2D2AEE] text-[12px] font-bold">8,421 users joined this week</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
