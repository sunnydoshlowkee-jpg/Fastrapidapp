import Logo from '../brand/Logo'

const SIZE = {
  sm: { icon: 28, box: 40, wrap: 'min-h-[3rem] py-3' },
  md: { icon: 40, box: 56, wrap: 'min-h-[6rem] py-6' },
  lg: { icon: 52, box: 72, wrap: 'min-h-[8rem] py-8' },
  full: { icon: 48, box: 64, wrap: 'min-h-[40vh]' },
  screen: { icon: 56, box: 80, wrap: 'min-h-screen' },
}

/**
 * Branded loader using the real app logo mark (logo-icon.png).
 */
export default function BrandedLoader({
  size = 'md',
  label = null,
  className = '',
  fill = false,
}) {
  const config = SIZE[size] || SIZE.md
  const wrapClass = fill
    ? 'flex flex-1 flex-col items-center justify-center'
    : `flex flex-col items-center justify-center ${config.wrap}`

  return (
    <div
      className={`${wrapClass} ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: config.box, height: config.box }}
      >
        <span
          className="absolute inset-0 rounded-full bg-[#4342FF]/10 animate-pulse"
          aria-hidden
        />
        <div className="relative z-[1] animate-branded-loader-pulse">
          <Logo variant="icon" height={config.icon} />
        </div>
      </div>
      {label ? (
        <p className="mt-3 text-sm text-gray-500">{label}</p>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </div>
  )
}
