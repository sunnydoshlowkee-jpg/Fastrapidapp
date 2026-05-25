import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Truck, Wallet, Award, MapPin, ShieldCheck, TrendingUp } from 'lucide-react'

const TABS = ['All', 'Orders', 'Earnings', 'System']

export default function Notifications() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center -ml-2">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Notifications</h1>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border-2 transition-all"
            style={{
              background: activeTab === tab ? '#5B5BFF' : 'transparent',
              borderColor: activeTab === tab ? '#5B5BFF' : '#E5E7EB',
              color: activeTab === tab ? '#fff' : '#6B7280',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-6">
        {/* TODAY SECTION */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Today</p>
          
          <div className="flex flex-col gap-5">
            {/* New Order */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(91,91,255,0.15)' }}>
                <Truck size={20} style={{ color: '#5B5BFF' }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-gray-900 text-sm">New Order available</p>
                  <p className="text-[10px] font-bold text-gray-400">2m ago</p>
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  Pick up at "The Grill Master" - 4.2km away. Est. Earning: ₦3,500.
                </p>
                <button className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-opacity active:opacity-80"
                  style={{ background: '#5B5BFF' }}>
                  View Details
                </button>
              </div>
            </div>

            {/* Earnings */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.15)' }}>
                <Wallet size={20} style={{ color: '#22c55e' }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-gray-900 text-sm">Earnings credited</p>
                  <p className="text-[10px] font-bold text-gray-400">45m ago</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  ₦12,450.00 from your morning shift has been deposited to your wallet.
                </p>
              </div>
            </div>

            {/* Bonus (Highlight) */}
            <div className="relative flex gap-4 pl-4 py-1">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ background: '#F59E0B' }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.15)' }}>
                <Award size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-sm" style={{ color: '#F59E0B' }}>Bonus unlocked!</p>
                  <p className="text-[10px] font-bold" style={{ color: '#F59E0B' }}>3h ago</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  You've completed 10 deliveries today. ₦2,500 streak bonus added!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* YESTERDAY SECTION */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Yesterday</p>
          
          <div className="flex flex-col gap-5">
            {/* Zone update */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gray-200">
                <MapPin size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-gray-900 text-sm">Zone update</p>
                  <p className="text-[10px] font-bold text-gray-400">Yesterday</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The "Ikeja North" zone boundaries have been expanded. View the updated map.
                </p>
              </div>
            </div>

            {/* Documents verified */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gray-200">
                <ShieldCheck size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-gray-900 text-sm">Documents verified</p>
                  <p className="text-[10px] font-bold text-gray-400">Yesterday</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your insurance renewal document has been approved by the Rapid team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROMO BANNER */}
        <div className="rounded-3xl p-5 relative overflow-hidden mt-2"
          style={{ background: 'linear-gradient(135deg, #5B5BFF 0%, #4444EE 100%)' }}>
          
          {/* Chart decoration */}
          <div className="absolute right-0 bottom-0 opacity-40">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
              <path d="M0 60 L30 40 L60 50 L90 20 L120 30" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="30" cy="40" r="6" fill="white" />
              <circle cx="60" cy="50" r="6" fill="white" />
              <circle cx="90" cy="20" r="6" fill="white" />
              {/* Stars */}
              <path d="M90 0 L93 8 L101 11 L93 14 L90 22 L87 14 L79 11 L87 8 Z" fill="white" opacity="0.6"/>
              <path d="M110 10 L112 15 L117 17 L112 19 L110 24 L108 19 L103 17 L108 15 Z" fill="white" opacity="0.4"/>
            </svg>
          </div>

          <div className="relative z-10">
            <p className="text-[9px] font-black text-white/70 uppercase tracking-widest mb-1">Earning Insights</p>
            <h3 className="text-white font-black text-lg mb-2">Maximize your weekend</h3>
            <p className="text-white/80 text-xs mb-4 leading-relaxed pr-8">
              Drivers in your area are earning 1.5x more near central markets today.
            </p>
            <button className="bg-white text-[#5B5BFF] font-black text-xs px-4 py-2.5 rounded-xl transition-opacity active:opacity-80">
              View Zones
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
