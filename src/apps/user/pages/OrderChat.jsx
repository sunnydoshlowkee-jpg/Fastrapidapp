import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Phone, Send } from 'lucide-react'
import { fetchOrderChat, sendOrderChat } from '../../../services/deliveryChatService'
import BrandedLoader from '../../../components/ui/BrandedLoader'

const MAX_LENGTH = 1000
const POLL_MS = 3000

function mapMessage(msg) {
  return {
    id: msg.id,
    text: msg.body,
    sender: msg.sender_role,
    time: msg.time || '',
  }
}

export default function OrderChat() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [peer, setPeer] = useState({ name: 'Rider', phone: null })
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)
  const lastIdRef = useRef(0)

  const mergeMessages = useCallback((incoming) => {
    if (!incoming?.length) return
    setMessages((prev) => {
      const byId = new Map(prev.map((m) => [m.id, m]))
      incoming.forEach((raw) => {
        const mapped = mapMessage(raw)
        byId.set(mapped.id, mapped)
        if (mapped.id > lastIdRef.current) lastIdRef.current = mapped.id
      })
      return Array.from(byId.values()).sort((a, b) => a.id - b.id)
    })
  }, [])

  const loadThread = useCallback(
    async ({ incremental = false } = {}) => {
      if (!id) return
      try {
        if (!incremental) setError('')
        const thread = await fetchOrderChat(
          id,
          incremental && lastIdRef.current ? lastIdRef.current : null,
        )
        setPeer(thread.peer || { name: 'Rider' })
        if (incremental) {
          mergeMessages(thread.messages)
        } else {
          const mapped = (thread.messages || []).map(mapMessage)
          setMessages(mapped)
          lastIdRef.current = mapped.reduce((max, m) => Math.max(max, m.id), 0)
        }
      } catch (err) {
        if (!incremental) {
          setError(err.response?.data?.message || err.message || 'Unable to load chat.')
        }
      } finally {
        if (!incremental) setLoading(false)
      }
    },
    [id, mergeMessages],
  )

  useEffect(() => {
    setLoading(true)
    lastIdRef.current = 0
    loadThread({ incremental: false })
    const timer = window.setInterval(() => loadThread({ incremental: true }), POLL_MS)
    return () => window.clearInterval(timer)
  }, [loadThread])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const trimmed = input.trim()
  const canSend = trimmed.length > 0 && trimmed.length <= MAX_LENGTH && !sending

  const validationHint = useMemo(() => {
    if (input.length > MAX_LENGTH) return `Message is too long (${input.length}/${MAX_LENGTH})`
    return ''
  }, [input])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!canSend) return

    setSending(true)
    setError('')
    const body = trimmed
    setInput('')

    try {
      const message = await sendOrderChat(id, body)
      mergeMessages([message])
    } catch (err) {
      setInput(body)
      setError(err.response?.data?.message || err.message || 'Failed to send message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] max-w-md mx-auto">
      <div className="sticky top-0 z-50 bg-white px-5 pt-app pb-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{peer.name || 'Rider'}</p>
            <p className="text-xs text-gray-500">Order #{id}</p>
          </div>
        </div>
        {peer.phone ? (
          <a
            href={`tel:${peer.phone}`}
            className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-[#4F46E5] rounded-full"
          >
            <Phone size={18} />
          </a>
        ) : null}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
        {loading ? (
          <BrandedLoader size="md" />
        ) : error && messages.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <p className="text-sm text-red-500">{error}</p>
            <button
              type="button"
              onClick={() => loadThread({ incremental: false })}
              className="text-sm font-bold text-[#4F46E5]"
            >
              Try again
            </button>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-10">
            No messages yet. You can chat with your rider here.
          </p>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === 'customer'
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} gap-1 max-w-[85%] ${
                  isMe ? 'self-end' : 'self-start'
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    isMe
                      ? 'bg-[#4F46E5] text-white rounded-tr-sm'
                      : 'bg-white border border-gray-100 text-gray-900 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1.5 px-1">
                  <span className="text-[10px] font-bold text-gray-400">{msg.time}</span>
                  {isMe ? <CheckCircle2 size={12} className="text-[#4F46E5]" /> : null}
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white border-t border-gray-100 px-5 py-4 pb-safe">
        {error && messages.length > 0 ? (
          <p className="mb-2 text-xs text-red-500">{error}</p>
        ) : null}
        {validationHint ? <p className="mb-2 text-xs text-amber-600">{validationHint}</p> : null}
        <form onSubmit={handleSend} className="flex items-end gap-3">
          <div className="flex-1 bg-gray-50 rounded-3xl border border-gray-200 px-4 py-3 focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-indigo-50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message your rider..."
              className="w-full bg-transparent outline-none resize-none text-[15px] max-h-32 min-h-[24px]"
              rows={1}
              maxLength={MAX_LENGTH + 50}
              disabled={sending || loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!canSend}
            className="w-12 h-12 rounded-full bg-[#4F46E5] flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50"
          >
            <Send size={20} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  )
}
