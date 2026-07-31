import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, MapPin, ShoppingCart, ChevronDown, Home, Clock, Wallet, User, Rocket } from 'lucide-react'
import { getPromotions } from '../../../services/promotionService'
import BrandedLoader from '../../../components/ui/BrandedLoader'

export default function Promotions() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('discovery')
  const [filter, setFilter] = useState('All')
  const [promotions, setPromotions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true)
        const { data } = await getPromotions()
        setPromotions(data.data || [])
      } catch (err) {
        console.error('Failed to fetch promotions', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPromotions()
  }, [])

  const filteredPromotions = promotions.filter(promo => {
    if (filter === 'All') return true
    if (filter === 'Food') return promo.category.toLowerCase().includes('food')
    if (filter === 'Groceries') return promo.category.toLowerCase().includes('grocer')
    if (filter === 'New Users') return promo.category.toLowerCase().includes('onboarding') || promo.category.toLowerCase().includes('new user')
    return true
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-0">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="md:hidden flex flex-col h-full">
        <div className="px-6 pt-app pb-4 bg-[#FAFAFA] sticky top-0 z-30 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">Promotions</h1>
        </div>
        <div className="px-6 pt-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
            {['All', 'Food', 'Groceries', 'New Users'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-[12px] font-bold shrink-0 transition-colors ${
                  filter === f ? 'bg-[#2D2AEE] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 mt-2">
            {loading && <BrandedLoader size="md" />}
            {!loading && filteredPromotions.map(promo => (
              <div key={promo.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
                <div className="h-[120px] relative">
                  <img src={promo.img} className="w-full h-full object-cover" />
                  {promo.tag && (
                    <span className={`absolute top-4 left-4 ${promo.tag_color || 'bg-[#2D2AEE]'} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm`}>
                      {promo.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-[#2D2AEE] text-[10px] font-bold tracking-widest uppercase mb-1">{promo.category}</p>
                  <h3 className="font-bold text-gray-900 text-[16px] mb-2">{promo.title}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-[20px] font-bold text-[#2D2AEE]">{promo.discount} <span className="text-[12px] text-gray-400 font-medium">{promo.discount.includes('FREE') ? '' : 'OFF'}</span></p>
                      <p className="text-[10px] text-gray-400">CODE: {promo.code}</p>
                    </div>
                    <button className="bg-[#2D2AEE] text-white px-4 py-2 rounded-xl text-[12px] font-bold">Claim</button>
                  </div>
                </div>
              </div>
            ))}
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
            <div className="flex-1 max-w-3xl bg-[#F4F5F7] rounded-xl px-5 py-3.5 flex items-center gap-3">
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

          <div className="px-10 pt-10 pb-12 bg-white flex-1">
            <div className="max-w-[1000px]">
              
              <div className="mb-10">
                <h1 className="text-[32px] font-bold text-gray-900 mb-2">Current Promotions</h1>
                <p className="text-[15px] text-gray-500 font-medium max-w-[600px]">
                  Exclusive deals curated for your lifestyle. Save on your favorite brands across Lagos with RAPID.
                </p>
              </div>

              <div className="flex gap-3 mb-8">
                {['All', 'Food', 'Groceries', 'New Users'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-colors ${
                      filter === f ? 'bg-[#2D2AEE] text-white shadow-md shadow-blue-500/20' : 'bg-[#F4F5F7] text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Promotions Grid */}
              <div className="grid grid-cols-2 gap-6 mb-16">
                
                {loading && (
                  <div className="col-span-2">
                    <BrandedLoader size="md" />
                  </div>
                )}
                {!loading && filteredPromotions.map((promo, idx) => {
                  let borderColor = 'border-l-[#2D2AEE]'
                  if (idx % 2 !== 0) borderColor = 'border-l-[#D92D20]'
                  
                  let claimBg = 'bg-[#2D2AEE]'
                  let claimHover = 'hover:bg-blue-700'
                  if (idx % 2 !== 0) {
                    claimBg = 'bg-[#D92D20]'
                    claimHover = 'hover:bg-red-700'
                  }

                  let colorText = 'text-[#2D2AEE]'
                  if (idx % 2 !== 0) colorText = 'text-[#D92D20]'

                  return (
                    <div key={promo.id} className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-6 border-l-8 ${borderColor} relative`}>
                      <div className="w-[180px] h-[180px] rounded-2xl overflow-hidden shrink-0 relative shadow-sm">
                        <img src={promo.img} className="w-full h-full object-cover" />
                        {promo.tag && (
                          <span className={`absolute top-4 left-4 ${promo.tag_color || 'bg-[#2D2AEE]'} text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm`}>
                            {promo.tag}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-col py-1 flex-1 justify-between">
                        <div>
                          <p className={`text-[11px] font-bold tracking-widest uppercase mb-1.5 ${colorText}`}>
                            {promo.category}
                          </p>
                          <h3 className="font-bold text-gray-900 text-[20px] mb-2 leading-tight">{promo.title}</h3>
                          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                            {promo.desc}
                          </p>
                        </div>
                        
                        <div className="flex items-end justify-between mt-4">
                          <div>
                            <p className={`text-[28px] font-bold leading-none mb-1 ${colorText}`}>
                              {promo.discount} <span className="text-[16px] text-gray-900 opacity-60 ml-0.5">{promo.discount.includes('FREE') ? '' : 'OFF'}</span>
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium">CODE: {promo.code}</p>
                          </div>
                          <button className={`${claimBg} ${claimHover} text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-[13px] shadow-sm`}>
                            Claim Offer
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Featured Partners */}
              <div className="mb-12">
                <h2 className="text-[20px] font-bold text-gray-900 mb-6">Featured Partners</h2>
                
                <div className="flex gap-6">
                  {/* Partner Card */}
                  <div className="flex-1 h-[280px] rounded-[32px] overflow-hidden relative shadow-sm group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale brightness-50 contrast-125" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c29]/90 via-[#1a1c29]/40 to-transparent p-10 flex flex-col justify-end">
                      <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg w-max mb-3 border border-white/10">
                        Partner of the Month
                      </div>
                      <h3 className="text-[32px] font-bold text-white mb-2 leading-tight">Cafe Neo Selection</h3>
                      <p className="text-[15px] text-gray-300 mb-6 max-w-[360px] font-medium leading-relaxed">
                        Experience the finest Lagos roast delivered to your doorstep within 20 minutes.
                      </p>
                      <button className="bg-white text-gray-900 font-bold px-8 py-3.5 rounded-xl transition-colors hover:bg-gray-100 text-[14px] w-max">
                        Explore Menu
                      </button>
                    </div>
                  </div>

                  {/* Invite & Earn */}
                  <div className="w-[340px] h-[280px] bg-[#4F46E5] rounded-[32px] p-10 shadow-lg shadow-indigo-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white mb-6 relative z-10 backdrop-blur-sm bg-white/5">
                      <Rocket size={28} />
                    </div>
                    <h3 className="text-[24px] font-bold text-white mb-3 relative z-10">Invite & Earn</h3>
                    <p className="text-[13px] text-indigo-100 leading-relaxed mb-8 relative z-10 max-w-[200px]">
                      Refer a friend and get ₦10 in RAPID credits when they place their first order.
                    </p>
                    <button className="w-full bg-white text-[#4F46E5] font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[15px] relative z-10">
                      Share Invite
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer text */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-8 pb-4">
                <p className="text-[12px] text-gray-400 font-medium">© 2024 RAPID Marketplace. All rights reserved.</p>
                <div className="flex gap-6">
                  <a href="/legal/privacy.html" className="text-[12px] text-gray-400 hover:text-gray-600 font-medium transition-colors">Privacy Policy</a>
                  <a href="/legal/terms.html" className="text-[12px] text-gray-400 hover:text-gray-600 font-medium transition-colors">Terms of Service</a>
                  <a href="mailto:support@fastrapid.com" className="text-[12px] text-gray-400 hover:text-gray-600 font-medium transition-colors">Help Center</a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
