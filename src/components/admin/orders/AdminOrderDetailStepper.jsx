import { Bike, Check, ChefHat, Home } from 'lucide-react'

const icons = {
  check: Check,
  cooking: ChefHat,
  bike: Bike,
  home: Home,
}

export default function AdminOrderDetailStepper({ steps }) {
  const activeIndex = steps.findIndex((s) => s.status === 'active')
  const lastCompleteIndex = steps.reduce(
    (acc, s, i) => (s.status === 'complete' ? i : acc),
    -1,
  )

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <ol className="flex items-start justify-between gap-2">
        {steps.map((step, index) => {
          const Icon = icons[step.icon] ?? Check
          const isComplete = step.status === 'complete'
          const isActive = step.status === 'active'
          const lineFilled = index < activeIndex || (activeIndex === -1 && isComplete)

          return (
            <li key={step.id} className="relative flex flex-1 flex-col items-center">
              {index < steps.length - 1 ? (
                <span
                  className={`absolute left-[calc(50%+1.25rem)] right-[calc(-50%+1.25rem)] top-5 h-0.5 ${
                    lineFilled || (index < lastCompleteIndex)
                      ? 'bg-rapid-orange'
                      : 'bg-gray-200'
                  }`}
                  aria-hidden
                />
              ) : null}
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  isComplete
                    ? 'border-amber-700 bg-amber-700 text-white'
                    : isActive
                      ? 'border-rapid-orange bg-rapid-orange text-white'
                      : 'border-gray-200 bg-white text-gray-400'
                }`}
              >
                {isComplete ? (
                  <Check size={18} strokeWidth={2.5} aria-hidden />
                ) : (
                  <Icon size={18} strokeWidth={2} aria-hidden />
                )}
              </span>
              <span
                className={`mt-2 text-center text-xs font-semibold ${
                  isActive ? 'text-rapid-orange' : isComplete ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
