import { Star } from 'lucide-react'

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-merchant-divider'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function MerchantAnalyticsMobileFeedback({ feedback }) {
  const { rating, reviewCount, reviews } = feedback

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">Recent Customer Feedback</h2>

      <div className="mt-4 flex items-center gap-3 border-b border-merchant-divider pb-4">
        <p className="text-3xl font-bold text-merchant-ink">{rating}</p>
        <div>
          <StarRating count={5} />
          <p className="mt-0.5 text-xs text-merchant-muted">Based on {reviewCount} reviews</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {reviews.map((review) => (
          <li key={review.id} className="rounded-lg bg-merchant-input p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-merchant-ink">{review.name}</p>
              <p className="text-xs text-merchant-muted">{review.timeAgo}</p>
            </div>
            <div className="mt-1">
              <StarRating count={review.stars} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-merchant-body">{review.text}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
