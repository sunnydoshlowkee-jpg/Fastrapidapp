import { useRef } from 'react'

export default function MerchantOtpInput({ length = 6, value = '', onChange, id = 'merchant-otp' }) {
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

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-labelledby={`${id}-label`}>
      {Array.from({ length }).map((_, i) => (
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
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1} of ${length}`}
          className="h-[52px] w-[52px] rounded-lg border border-[rgba(198,196,218,0.5)] bg-merchant-input text-center text-base font-semibold text-merchant-ink outline-none transition-colors focus:border-merchant-primary focus:ring-2 focus:ring-merchant-primary/10 md:h-14 md:w-14 md:text-lg"
        />
      ))}
    </div>
  )
}
