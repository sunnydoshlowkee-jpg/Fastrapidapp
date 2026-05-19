import { Star } from 'lucide-react'

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-merchant-divider'}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  )
}

export default function MerchantAnalyticsFeedback({ feedback }) {
  const { rating, reviewCount, reviews } = feedback

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <h2 className="text-base font-semibold text-merchant-ink">Recent Customer Feedback</h2>

      <div className="mt-4 flex items-center gap-4 border-b border-merchant-divider pb-4">
        <p className="text-4xl font-bold text-merchant-ink">{rating}</p>
        <div>
          <StarRating count={5} />
          <p className="mt-1 text-sm text-merchant-muted">Based on {reviewCount} reviews</p>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-merchant-divider pb-4 last:border-0 last:pb-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-merchant-ink">{review.name}</p>
              <p className="text-xs text-merchant-muted">{review.timeAgo}</p>
            </div>
            <StarRating count={review.stars} />
            <p className="mt-2 inline-block rounded-md bg-merchant-input px-2 py-1 text-xs text-merchant-muted">
              {review.orderLabel}
            </p>
            <p className="mt-2 text-sm text-merchant-body">{review.text}</p>
            <button
              type="button"
              className="mt-2 text-sm font-semibold text-merchant-primary hover:underline"
            >
              Reply
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
