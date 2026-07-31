import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Phone, MessageCircle, Flag, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

const SUPPORT_EMAIL = 'support@fastrapid.com'

const SUPPORT_OPTIONS = [
  { icon: Phone, label: 'Call', sub: 'Email us', color: '#22c55e', action: 'email' },
  { icon: MessageCircle, label: 'Whatsapp', sub: 'Coming soon', color: '#22c55e', action: 'soon' },
  { icon: Flag, label: 'Report', sub: 'An issue', color: '#f59e0b', action: 'email' },
  { icon: HelpCircle, label: 'FAQs', sub: 'Browse', color: '#5B5BFF', action: 'faqs' },
]

const FAQS = [
  {
    q: 'How are delivery fares calculated?',
    a: 'Customers pay a delivery fee based on distance and merchant type. You earn 80% of that fee after a successful delivery.',
  },
  {
    q: 'What do if a customer is absent?',
    a: 'Call the customer from the active delivery screen. If you cannot reach them, contact support before cancelling so payouts stay accurate.',
  },
  {
    q: 'Updating vehicle documentation',
    a: 'Upload documents from your rider profile / documents section. An admin reviews them before your account stays fully active.',
  },
  {
    q: 'Instant cash out requirements',
    a: 'Withdrawals go to the Nigerian bank account you verified at signup. Minimum is ₦100 and your account must be approved.',
  },
]

export default function HelpCenter() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [notice, setNotice] = useState('')

  const filteredFaqs = FAQS.filter((faq) =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase())
    || faq.a.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSupport = (action) => {
    if (action === 'email') {
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=Rider%20support`
      return
    }
    if (action === 'faqs') {
      document.getElementById('faqs-section')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setNotice('WhatsApp support will be available soon. Email support@fastrapid.com for help.')
    window.setTimeout(() => setNotice(''), 4000)
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-8">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center gap-3">
        <button type="button" onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-xl font-black text-gray-900">Support</h1>
      </div>

      <div className="px-5 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-snug mb-1">
            How can we{' '}
            <span style={{ color: '#5B5BFF' }}>help you today?</span>
          </h2>
          <p className="text-gray-400 text-sm">Email {SUPPORT_EMAIL} for account or payout help.</p>
        </div>

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

        {notice ? (
          <p className="rounded-xl bg-indigo-50 px-3 py-2 text-sm text-[#5B5BFF]">{notice}</p>
        ) : null}

        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact</p>
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="font-bold text-gray-900 text-sm mb-1">No open tickets</p>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Need help with a payout or delivery? Email support and include your rider ID.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="block w-full py-2.5 rounded-xl text-white text-xs font-bold text-center"
              style={{ background: '#1a1a2e' }}
            >
              Email Support
            </a>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Instant Support</p>
          <div className="grid grid-cols-4 gap-3">
            {SUPPORT_OPTIONS.map(({ icon: Icon, label, sub, color, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleSupport(action)}
                className="flex flex-col items-center gap-2 active:opacity-70 transition-opacity"
              >
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

        <div id="faqs-section">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Popular Questions</p>
          <div className="flex flex-col gap-2">
            {filteredFaqs.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No matching questions found.</p>
            ) : (
              filteredFaqs.map((faq, i) => (
                <div key={faq.q} className="border-b border-gray-100 last:border-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-3.5 text-left transition-colors"
                  >
                    <span className="text-sm font-semibold text-gray-900 pr-3">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                      : <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />}
                  </button>
                  {openFaq === i ? (
                    <p className="pb-3 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #5B5BFF 0%, #4444EE 100%)' }}>
          <div className="p-5">
            <span className="text-[9px] font-black px-3 py-1 rounded-full bg-white/20 text-white uppercase tracking-widest">
              Safety
            </span>
            <h3 className="text-white font-black text-lg mt-3 mb-1">
              Rider Safety Tips
            </h3>
            <p className="text-white/70 text-xs mb-4 leading-relaxed">
              Stay visible, confirm addresses before leaving pickup, and never share OTP codes with customers.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Safety%20question`}
              className="inline-block bg-white text-[#5B5BFF] font-black text-xs px-4 py-2.5 rounded-xl"
            >
              Ask Safety Team
            </a>
          </div>
          <div className="mx-4 mb-4 rounded-2xl overflow-hidden h-32 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.2)' }}>
            <span className="text-6xl">🏍</span>
          </div>
        </div>
      </div>
    </div>
  )
}
