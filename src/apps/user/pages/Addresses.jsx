import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Briefcase, Home, MapPin, Trash2, ChevronRight } from 'lucide-react'
import { useStore } from '../../../store/useStore'

export default function Addresses() {
  const navigate = useNavigate()
  const { addresses, setDefaultAddress, deleteAddress } = useStore()
  const [activeTab, setActiveTab] = useState('WORK')

  const getIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'WORK':
        return <Briefcase size={20} />
      case 'HOME':
        return <Home size={20} />
      default:
        return <MapPin size={20} />
    }
  }

  const getIconStyle = (type, isDefault) => {
    if (type.toUpperCase() === 'WORK') return 'bg-[#3B3BFF] text-white'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 md:pb-8 relative">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center w-full gap-3">
        <button onClick={() => navigate(-1)} className="text-[#3B3BFF] w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Addresses</h1>
      </div>

      <div className="px-4 lg:px-8 max-w-6xl mx-auto w-full flex-1 pt-2 lg:pt-8">
        
        {/* Desktop Header */}
        <div className="hidden lg:flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#3B3BFF] tracking-widest uppercase mb-3">
              <span className="text-gray-400">PROFILE</span>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span>ADDRESSES</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Addresses</h1>
            <p className="text-gray-500 text-sm max-w-md leading-relaxed">
              Manage your delivery locations for faster checkout and precise logistics across Nigeria.
            </p>
          </div>
          <button className="bg-[#3B3BFF] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
            <span>+</span> Add New Address
          </button>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-3 mb-6">
          {['WORK', 'HOME', 'OTHER'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all border ${
                activeTab === tab 
                  ? 'border-[#3B3BFF] text-[#3B3BFF] bg-blue-50/50' 
                  : 'border-gray-200 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mobile Add New Address Button */}
        <button className="lg:hidden w-full border border-[#3B3BFF] text-[#3B3BFF] font-bold py-4 rounded-xl mb-6 hover:bg-blue-50 transition-colors">
          + Add New Address
        </button>

        {/* Addresses Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 lg:mb-10">
          
          {/* Work Address */}
          {addresses.map((addr, index) => (
            <div key={addr.id} className="h-full flex flex-col">
              <div className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100 relative flex-1 flex flex-col hover:shadow-md transition-shadow">
                
                {/* Desktop layout differs slightly from mobile, but we can combine them */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconStyle(addr.type, addr.isDefault)}`}>
                    {getIcon(addr.type)}
                  </div>
                  
                  {/* Pill Badge (Desktop mainly, but good for mobile too) */}
                  <div className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {addr.type}
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{addr.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed pr-4">
                    {addr.details}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between mt-auto">
                  
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button 
                      onClick={() => deleteAddress(addr.id)}
                      className="w-8 h-8 rounded-lg bg-gray-100 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold hidden lg:inline-block ${addr.isDefault ? 'text-[#3B3BFF]' : 'text-gray-400'}`}>
                      {addr.isDefault ? 'Default' : ''}
                    </span>
                    <span className={`text-sm font-bold lg:hidden ${addr.isDefault ? 'text-[#3B3BFF]' : 'text-gray-500'}`}>
                      {addr.isDefault ? 'Default Address' : 'Set as Default'}
                    </span>
                    <button 
                      onClick={() => setDefaultAddress(addr.id)}
                      className={`lg:hidden w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                        addr.isDefault ? 'bg-[#3B3BFF]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        addr.isDefault ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Smart Routing Image Card (Desktop Only or merged) */}
          <div className="hidden lg:flex rounded-2xl overflow-hidden relative bg-gray-900 h-full min-h-[220px] items-end p-6 group">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            <div className="relative z-10 w-full">
              <h3 className="text-white font-bold text-lg mb-1">Smart Routing Enabled</h3>
              <p className="text-gray-300 text-sm font-medium leading-relaxed">Your addresses are synced with live Lagos traffic data for faster delivery.</p>
            </div>
          </div>

          {/* Add Frequent Spot Card */}
          <button className="hidden lg:flex flex-col items-center justify-center rounded-2xl p-6 border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-100 transition-colors h-full min-h-[220px] text-center">
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#3B3BFF] mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Add Frequent Spot</h3>
            <p className="text-gray-500 text-sm">Gym, Club, or Friend's Place</p>
          </button>

        </div>
      </div>
    </div>
  )
}
