import { useState } from 'react'
import { Star, Loader2, CheckCircle2 } from 'lucide-react'
import { submitReview } from '../../services/orderService'

export default function OrderReviewPanel({ orderId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const { data } = await submitReview(orderId, { rating, comment })
      setSuccess(true)
      if (onReviewSubmitted) {
        onReviewSubmitted(data.data)
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="bg-[#F8F9FA] rounded-[24px] p-6 border border-gray-100 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-1">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-[16px] font-bold text-gray-900">Review Submitted!</h3>
        <p className="text-[13px] text-gray-500">Thank you for your feedback.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-6 md:mb-0">
      <h3 className="text-[16px] font-bold text-gray-900 mb-4">Rate your order</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Star Rating */}
        <div className="flex gap-2 justify-center py-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                size={36}
                className={`transition-colors ${
                  star <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-100 text-gray-200'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment Input */}
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you liked (optional)"
            className="w-full bg-[#F4F5F7] rounded-xl p-4 text-[13px] outline-none border border-transparent focus:border-indigo-500 focus:bg-white transition-colors resize-none h-24 text-gray-900 placeholder-gray-400"
            disabled={submitting}
          />
        </div>

        {error && (
          <p className="text-red-500 text-[12px] font-medium px-1 text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || rating === 0}
          className="w-full bg-[#2D2AEE] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors text-[14px] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {submitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  )
}
