import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Phone, Send, MoreVertical, CheckCircle2 } from 'lucide-react'
import { useRiderDeliveries } from '../../../hooks/useRiderDeliveries'

export default function CustomerChat() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { fetchDetails } = useRiderDeliveries()
  const [delivery, setDelivery] = useState(null)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I'm your rider. I'm on my way to the pickup location.", sender: 'rider', time: '10:00 AM' },
    { id: 2, text: "Okay, thank you!", sender: 'customer', time: '10:02 AM' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    if (id) {
      fetchDetails(id).then(setDelivery)
    }
  }, [id, fetchDetails])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'rider',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, newMessage])
    setInput('')
    
    // Simulate customer reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Okay, I'll be waiting.",
        sender: 'customer',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 2000)
  }

  const customer = delivery?.order?.user

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-5 pt-12 pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-95 transition-transform">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5B5BFF] flex items-center justify-center text-white text-lg relative">
              👤
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">{customer?.full_name || 'Customer'}</p>
              <p className="text-xs text-green-500 font-medium">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={`tel:${customer?.phone || '000'}`} className="w-10 h-10 flex items-center justify-center bg-blue-50 text-[#5B5BFF] rounded-full active:scale-95 transition-transform">
            <Phone size={18} />
          </a>
          <button className="w-10 h-10 flex items-center justify-center text-gray-400 active:scale-95 transition-transform">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
        {/* System Message */}
        <div className="flex justify-center mb-2">
          <span className="bg-blue-50 text-[#5B5BFF] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Order #{delivery?.order_id || id}
          </span>
        </div>

        {messages.map(msg => {
          const isMe = msg.sender === 'rider'
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 max-w-[85%] ${isMe ? 'self-end' : 'self-start'}`}>
              <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-[#5B5BFF] text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-900 rounded-tl-sm shadow-sm'}`}>
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
              </div>
              <div className="flex items-center gap-1.5 px-1">
                <span className="text-[10px] font-bold text-gray-400">{msg.time}</span>
                {isMe && <CheckCircle2 size={12} className="text-[#5B5BFF]" />}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 px-5 py-4 pb-safe">
        <form onSubmit={handleSend} className="flex items-end gap-3">
          <div className="flex-1 bg-gray-50 rounded-3xl border border-gray-200 px-4 py-3 focus-within:border-[#5B5BFF] focus-within:ring-2 focus-within:ring-blue-50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message..."
              className="w-full bg-transparent outline-none resize-none text-[15px] max-h-32 min-h-[24px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
          </div>
          <button 
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-full bg-[#5B5BFF] flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50 active:scale-95 transition-transform shadow-lg shadow-blue-200"
          >
            <Send size={20} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  )
}
