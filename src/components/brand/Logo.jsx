/**
 * Logo variants:
 *  - full (default): horizontal lockup — icon + "Fastrapid" wordmark
 *  - icon: just the R mark (white on dark bg)
 *  - white: full lockup forced white (for dark/blue backgrounds)
 */
export default function Logo({ variant = 'full', className = '', height = 32 }) {
  if (variant === 'icon') {
    return (
      <img
        src="/logo-icon.png"
        alt="Fast Rapid"
        style={{ height }}
        className={className}
      />
    )
  }

  if (variant === 'white') {
    // Full lockup inverted — use the icon (white) + white wordmark text
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        <img src="/logo-icon.png" alt="Fast Rapid" style={{ height }} />
        <span
          className="text-white font-bold tracking-tight"
          style={{ fontSize: height * 0.85, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Fast Rapid
        </span>
      </div>
    )
  }

  // Default: full colour lockup from the PNG
  return (
    <img
      src="/logo-full.png"
      alt="Fast Rapid"
      style={{ height }}
      className={className}
    />
  )
}
