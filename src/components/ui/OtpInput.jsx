import { useRef } from 'react'

export default function OtpInput({ length = 6, value = '', onChange }) {
  const inputs = useRef([])

  const handleChange = (e, idx) => {
    const digit = e.target.value.replace(/\D/, '').slice(-1)
    const next = value.split('')
    next[idx] = digit
    const newVal = next.join('').padEnd(length, '').slice(0, length)
    onChange(newVal.trimEnd())
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
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
            ${value[i]
              ? 'bg-[#1A1AF5] text-white border-[#1A1AF5]'
              : 'bg-gray-50 text-gray-900 border-gray-200 focus:border-[#1A1AF5]'
            }`}
        />
      ))}
    </div>
  )
}
