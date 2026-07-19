import { useState, useEffect } from 'react'
import { Star, Loader2, MessageSquare } from 'lucide-react'
import { getVendorReviews } from '../../services/discoveryService'

export default function VendorReviewsTab({ merchantId }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const response = await getVendorReviews(merchantId)
        setData(response.data.data)
      } catch (err) {
        setError('Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [merchantId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin text-gray-400" size={24} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  const { rating, count, reviews } = data

  return (
    <div className="flex flex-col gap-6">
      
      {/* Overview Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
        <h3 className="text-[32px] font-bold text-gray-900 leading-tight">{rating.toFixed(1)}</h3>
        <div className="flex gap-1 text-yellow-400 my-2">
          {[1, 2, 3, 4, 5].map(star => (
            <Star key={star} size={20} className={star <= Math.round(rating) ? 'fill-yellow-400' : 'text-gray-200'} />
          ))}
        </div>
        <p className="text-[13px] text-gray-500 font-medium">Based on {count} {count === 1 ? 'review' : 'reviews'}</p>
      </div>

      {/* Review List */}
      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <div className="bg-[#F8F9FA] rounded-[24px] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
              <MessageSquare size={20} />
            </div>
            <p className="font-bold text-gray-900 text-[15px]">No reviews yet</p>
            <p className="text-[13px] text-gray-500 mt-1">Check back later after users have placed orders.</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    {review.user?.avatar ? (
                      <img src={review.user.avatar} alt={review.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-bold text-gray-400 text-[14px]">{(review.user?.name || 'U').charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-[14px]">{review.user?.name || 'Anonymous'}</p>
                    <p className="text-[11px] text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={12} className={star <= review.rating ? 'fill-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
              </div>
              {review.comment && (
                <p className="text-[14px] text-gray-700 leading-relaxed pl-[52px]">
                  {review.comment}
                </p>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  )
}
