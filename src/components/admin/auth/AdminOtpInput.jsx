import { useRef } from 'react'

export default function AdminOtpInput({
  length = 6,
  value = '',
  onChange,
  id = 'admin-otp',
  split = true,
}) {
  const inputs = useRef([])

  const handleChange = (e, idx) => {
    const digit = e.target.value.replace(/\D/, '').slice(-1)
    const next = value.split('')
    next[idx] = digit
    const newVal = next.join('').slice(0, length)
    onChange(newVal)
    if (digit && idx < length - 1) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
      const next = value.split('')
      next[idx - 1] = ''
      onChange(next.join(''))
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    onChange(pasted)
    inputs.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  const cellClass =
    'h-12 w-11 rounded-lg border-0 bg-gray-100 text-center text-lg font-semibold text-gray-900 outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-rapid-orange/30 sm:h-14 sm:w-12'

  const renderCell = (i) => (
    <input
      key={i}
      ref={(el) => {
        inputs.current[i] = el
      }}
      id={`${id}-${i}`}
      type="text"
      inputMode="numeric"
      autoComplete={i === 0 ? 'one-time-code' : 'off'}
      maxLength={1}
      value={value[i] || ''}
      onChange={(e) => handleChange(e, i)}
      onKeyDown={(e) => handleKeyDown(e, i)}
      onPaste={i === 0 ? handlePaste : undefined}
      aria-label={`Digit ${i + 1} of ${length}`}
      className={cellClass}
      placeholder="•"
    />
  )

  if (!split) {
    return (
      <div
        className="flex items-center justify-center gap-2"
        role="group"
        aria-labelledby={`${id}-label`}
      >
        {Array.from({ length }).map((_, i) => renderCell(i))}
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center gap-2 sm:gap-3"
      role="group"
      aria-labelledby={`${id}-label`}
    >
      <div className="flex gap-2">{Array.from({ length: 3 }).map((_, i) => renderCell(i))}</div>
      <span className="select-none px-0.5 text-lg font-light text-gray-300" aria-hidden>
        -
      </span>
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => renderCell(i + 3))}
      </div>
    </div>
  )
}
