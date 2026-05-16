import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, MessageSquare, Plus, CheckCircle2 } from 'lucide-react'

export default function Help() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24 lg:pb-12 relative">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="lg:hidden px-4 py-5 bg-transparent sticky top-0 z-30 flex items-center w-full gap-3">
        <button onClick={() => navigate(-1)} className="text-[#3B3BFF] w-8 h-8 flex items-center justify-start hover:opacity-80 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Help Center</h1>
      </div>

      <div className="px-4 lg:px-8 max-w-6xl mx-auto w-full flex-1 pt-2 lg:pt-12">
        
        {/* Desktop Header */}
        <div className="hidden lg:block mb-10">
          <div className="bg-red-50 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full inline-block uppercase tracking-wider mb-4">
            Support Hub
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight max-w-xl leading-tight">
            How can we help you <span className="text-[#3B3BFF]">move faster</span> today?
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Access our 24/7 documentation, track your active tickets, or start a live conversation with our Lagos-based support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 mb-12">
          
          {/* FAQ Accordion */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <button className="text-[#3B3BFF] text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity hidden lg:block">
                View All Docs
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                "How do I track my RAPID delivery?",
                "Can I change my delivery address after ordering?",
                "What is the \"Wallet\" refund policy?",
                "How to verify my merchant account?"
              ].map((q, i) => (
                <button key={i} className="bg-white rounded-2xl p-5 lg:p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all text-left">
                  <span className="font-bold text-gray-900 pr-4">{q}</span>
                  <Plus className="text-gray-400 group-hover:text-[#3B3BFF] transition-colors flex-shrink-0" size={24} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column Content */}
          <div className="flex flex-col gap-4 lg:gap-6">
            
            {/* Track Active Ticket */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
              <h3 className="font-bold text-gray-900 mb-2">Track Active Ticket</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed relative z-10">
                Ticket #RD-8829 is currently being reviewed by our team.
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-[#3B3BFF] rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-gray-900">65%</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-50 rounded-full border border-gray-100 mix-blend-multiply opacity-50"></div>
            </div>

            {/* Community Forum */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Community Forum</h3>
              <div className="flex items-center gap-1 mb-4">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-gray-100" alt="User 1"/>
                  <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-gray-100" alt="User 2"/>
                  <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-gray-100" alt="User 3"/>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm z-10">
                  +12k
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Join 12,000+ users discussing tips and tricks in our community lounge.
              </p>
            </div>

          </div>

        </div>

        <div className="w-full h-px bg-red-100 lg:my-10 hidden lg:block"></div>

        {/* Bottom Banner */}
        <div className="bg-[#1A1AF5] rounded-[2rem] lg:rounded-3xl p-6 lg:p-10 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
          <div>
            <h2 className="text-2xl font-bold mb-2">Still need assistance?</h2>
            <p className="text-blue-100 text-sm max-w-sm leading-relaxed">
              Our experts are standing by to resolve your issues in real-time. Don't wait, let's talk.
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-3">
            <button className="w-full lg:w-auto bg-white text-[#1A1AF5] font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm">
              <MessageSquare size={20} />
              Chat with Us
            </button>
            <div className="flex items-center gap-2 bg-blue-900/50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Average response time: 2 mins</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
