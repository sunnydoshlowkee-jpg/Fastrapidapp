import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, ChevronDown, ChevronUp, MessageSquare, MapPin, Plus } from 'lucide-react'
import { getFaqs } from '../../../services/faqService'
import BrandedLoader from '../../../components/ui/BrandedLoader'

export default function Help() {
  const navigate = useNavigate()
  const [activeTab] = useState('profile')
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true)
        const { data } = await getFaqs()
        setFaqs(data.data || [])
      } catch (err) {
        console.error('Failed to fetch FAQs', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFaqs()
  }, [])

  const filteredFaqs = faqs.filter(faq => {
    return faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
           faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-24 md:pb-12">
      
      {/* -------------------------------------------------------------------------------- */}
      {/*                                 MOBILE LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 pt-app pb-4 bg-[#FAFAFA] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-[#4F46E5] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">Help & Support</h1>
        </div>
      </div>

      <div className="md:hidden flex-1 px-6 w-full max-w-md mx-auto pt-2 flex flex-col">
        
        {/* Search */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-900 mb-3">How can we help?</h3>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search topics, orders, or issues..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F4F5F7] rounded-2xl py-3.5 pl-11 pr-4 text-[13px] text-gray-900 outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-2">
            {loading ? (
              <BrandedLoader size="md" />
            ) : (
              filteredFaqs.map(faq => (
                <div key={faq.id} className="flex flex-col">
                  <button 
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="flex items-center justify-between py-4 text-left"
                  >
                    <span className={`text-[13px] font-bold pr-4 ${openFaq === faq.id ? 'text-[#4F46E5]' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    {openFaq === faq.id ? (
                      <ChevronUp size={18} className="text-[#4F46E5] flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="bg-[#F8F9FA] rounded-2xl p-5 mb-2 border border-gray-100">
                      <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-auto flex flex-col items-center">
          <div className="relative w-full h-[140px] rounded-[24px] overflow-hidden mb-6 shadow-sm border border-gray-100">
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-teal-100 flex items-center justify-center">
              <span className="text-5xl">👨🏽‍💻👩🏽‍💻👨🏽‍💻</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur p-4">
              <p className="text-white text-[13px] font-bold">Our team is here for you 24/7</p>
            </div>
          </div>
          
          <button className="w-full bg-[#4F46E5] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors text-[13px] mb-4">
            <MessageSquare size={16} /> Chat with Us
          </button>
          
          <p className="text-[11px] text-gray-400 font-medium">Average Response Time: 2 Mins</p>
        </div>

      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/*                                DESKTOP LAYOUT                                      */}
      {/* -------------------------------------------------------------------------------- */}
      
      <div className="hidden md:flex w-full px-10 pt-8 pb-6 items-center border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-40">
        <div className="flex-1 max-w-2xl bg-[#F4F5F7] rounded-xl px-5 py-3.5 flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search for food, groceries, or essentials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="flex-1 px-12 pt-12 max-w-[1100px]">
          
          <div className="max-w-[600px] mb-12">
            <h1 className="text-[42px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4">
              How can we help you <span className="text-[#2D2AEE]">move faster</span> today?
            </h1>
            <p className="text-[16px] text-gray-500 leading-relaxed font-medium">
              Access our 24/7 documentation, track your active tickets, or start a live conversation with our Lagos-based support team.
            </p>
          </div>

          <div className="flex items-start gap-12 mb-12">
            
            {/* FAQ List */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-[20px] font-bold text-gray-900">Frequently Asked Questions</h2>
                <button className="text-[#2D2AEE] text-[12px] font-bold tracking-widest uppercase hover:underline">
                  View All Docs
                </button>
              </div>
              
              <div className="flex flex-col gap-4">
                {loading && <BrandedLoader size="md" />}
                {!loading && filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 transition-all">
                    <div 
                      className="flex justify-between items-start gap-4 cursor-pointer"
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    >
                      <h3 className={`font-bold text-[15px] leading-snug ${openFaq === faq.id ? 'text-[#4F46E5]' : 'text-gray-900'}`}>
                        {faq.question}
                      </h3>
                      <button className="text-gray-400 mt-0.5">
                        {openFaq === faq.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                    {openFaq === faq.id && (
                      <div className="mt-4 pt-4 border-t border-gray-50">
                        <p className="text-[13px] text-gray-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                {!loading && filteredFaqs.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500 text-[14px]">No FAQs found matching your criteria.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Cards */}
            <div className="w-[340px] shrink-0 flex flex-col gap-6">
              
              {/* Active Ticket */}
              <div className="bg-[#F4F5F7] rounded-3xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">Track Active Ticket</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                  Ticket #RD-8829 is currently being reviewed by our team.
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="w-[65%] h-full bg-[#2D2AEE] rounded-full"></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-[12px] font-bold text-gray-900">65%</span>
                </div>
              </div>

              {/* Community Forum */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 text-[15px] mb-4">Community Forum</h3>
                <div className="flex items-center gap-[-8px] mb-4">
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200 z-30">
                    <img src="/driver.png" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-300 z-20 -ml-2">
                    <img src="/grocery-hero.png" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-400 z-10 -ml-2">
                    <img src="/pizza.png" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'}} />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center -ml-2 text-[10px] font-bold text-gray-500 z-0">
                    +12k
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  Join 12,000+ users discussing tips and tricks in our community lounge.
                </p>
              </div>

            </div>
          </div>

          <div className="w-full border-t border-red-100 pt-12 pb-6">
            <div className="w-full bg-[#2D2AEE] rounded-[32px] p-10 flex items-center justify-between shadow-xl shadow-blue-500/20 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-[28px] font-bold text-white mb-2">Still need assistance?</h2>
                <p className="text-[14px] text-blue-100 font-medium max-w-[400px]">
                  Our experts are standing by to resolve your issues in real-time. Don't wait, let's talk.
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-end gap-3">
                <button className="bg-white text-[#2D2AEE] font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-[15px] flex items-center gap-3">
                  <MessageSquare size={20} /> Chat with Us
                </button>
                <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-white text-[11px] font-bold tracking-widest uppercase">Average Response Time: 2 Mins</span>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
              <div className="absolute top-0 left-1/2 w-64 h-64 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
