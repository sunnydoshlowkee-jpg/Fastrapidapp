export default function AdminFinanceSparkline({ points, className = '' }) {
  return (
    <svg
      viewBox="0 0 80 28"
      className={`pointer-events-none absolute bottom-3 right-3 h-10 w-20 text-violet-300/80 ${className}`}
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}
