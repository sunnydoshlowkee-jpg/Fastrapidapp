import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Phone, MessageCircle, Flag, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

const SUPPORT_OPTIONS = [
  { icon: Phone,         label: 'Call',      sub: '24/7 line',  color: '#22c55e' },
  { icon: MessageCircle, label: 'Whatsapp',  sub: 'Quick reply', color: '#22c55e' },
  { icon: Flag,          label: 'Report',    sub: 'An issue',    color: '#f59e0b' },
  { icon: HelpCircle,    label: 'FAQs',      sub: 'Browse',      color: '#5B5BFF' },
]

const FAQS = [
  'How are delivery fares calculated?',
  'What do if a customer is absent?',
  'Updating vehicle documentation',
  'Instant cash out requirements',
]

export default function HelpCenter() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const filteredFaqs = FAQS.filter(faq => faq.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-8">

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Support</h1>
      </div>

      <div className="px-5 space-y-6">

        {/* Heading */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-snug mb-1">
            How can we{' '}
            <span style={{ color: '#5B5BFF' }}>help you today?</span>
          </h2>
          <p className="text-gray-400 text-sm">Our dedicated team is ready to assist you 24/7</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Ongoing request */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Ongoing Request</p>
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="font-bold text-gray-900 text-sm">Payment Discrepancy #JK22</p>
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                style={{ background: 'rgba(91,91,255,0.1)', color: '#5B5BFF' }}>
                IN PROGRESS
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              We are reviewing your dispute regarding the missing payout. Estimated resolution in 24hrs.
            </p>
            <button className="w-full py-2.5 rounded-xl text-white text-xs font-bold"
              style={{ background: '#1a1a2e' }}>
              View Chat History
            </button>
          </div>
        </div>

        {/* Instant support */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Instant Support</p>
          <div className="grid grid-cols-4 gap-3">
            {SUPPORT_OPTIONS.map(({ icon: Icon, label, sub, color }) => (
              <button key={label} onClick={() => {
                if (label === 'Call') window.location.href = 'tel:+2348000000000';
                else if (label === 'Whatsapp') window.location.href = 'https://wa.me/2348000000000';
                else if (label === 'Report') window.location.href = 'mailto:support@rapid.com';
                else document.getElementById('faqs-section').scrollIntoView({ behavior: 'smooth' });
              }} className="flex flex-col items-center gap-2 active:opacity-70 transition-opacity">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: '#1a1a2e' }}>
                  <Icon size={22} style={{ color }} />
                </div>
                <p className="text-xs font-bold text-gray-900">{label}</p>
                <p className="text-[9px] text-gray-400 -mt-1">{sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Popular questions */}
        <div id="faqs-section">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Popular Questions</p>
          <div className="flex flex-col gap-2">
            {filteredFaqs.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No matching questions found.</p>
            ) : (
              filteredFaqs.map((faq, i) => (
                <button key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-3.5 border-b border-gray-100 text-left last:border-0 transition-colors">
                  <span className="text-sm font-semibold text-gray-900 pr-3">{faq}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                    : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                  }
                </button>
              ))
            )}
          </div>
        </div>

        {/* Safety guide card */}
        <div className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #5B5BFF 0%, #4444EE 100%)' }}>
          <div className="p-5">
            <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-widest">
              Safety Guide
            </span>
            <h3 className="text-white font-black text-lg mt-3 mb-1">
              Rider Safety & Wellness Protocol 2024
            </h3>
            <p className="text-white/70 text-xs mb-4 leading-relaxed">
              Stay protected on the road with the latest safety standards and insurance coverage offered by Rapid.
            </p>
            <button onClick={() => window.open('/safety-manual.pdf', '_blank')} className="bg-white text-[#5B5BFF] font-black text-xs px-4 py-2.5 rounded-xl active:opacity-80 transition-opacity">
              Read Safety Manual
            </button>
          </div>
          {/* Bike image placeholder */}
          <div className="mx-4 mb-4 rounded-2xl overflow-hidden h-32 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.2)' }}>
            <span className="text-6xl">🏍</span>
          </div>
        </div>

      </div>
    </div>
  )
}
