import { Check } from 'lucide-react'

function stepIndex(steps, currentId) {
  return steps.findIndex((s) => s.id === currentId)
}

export default function MerchantOrderDetailProgressStepperMobile({ steps, currentStepId }) {
  const currentIndex = stepIndex(steps, currentStepId)

  return (
    <nav aria-label="Order progress" className="w-full rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex
          const isActive = index === currentIndex
          const isPending = index > currentIndex

          return (
            <li key={step.id} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-0.5 flex-1 ${index <= currentIndex ? 'bg-merchant-primary' : 'bg-merchant-divider'}`}
                    aria-hidden
                  />
                )}
                <div
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isComplete
                      ? 'bg-merchant-primary text-white'
                      : isActive
                        ? 'bg-white ring-2 ring-merchant-primary'
                        : 'bg-merchant-icon-tile'
                  }`}
                >
                  {isComplete ? (
                    <Check size={16} strokeWidth={2.5} aria-hidden />
                  ) : isActive ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-merchant-primary" aria-hidden />
                  ) : null}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${index < currentIndex ? 'bg-merchant-primary' : 'bg-merchant-divider'}`}
                    aria-hidden
                  />
                )}
              </div>
              <p
                className={`mt-2 text-center text-[10px] font-medium leading-tight ${
                  isActive
                    ? 'font-bold text-merchant-ink'
                    : isPending
                      ? 'text-merchant-muted'
                      : 'text-merchant-ink'
                }`}
              >
                {step.label}
              </p>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
