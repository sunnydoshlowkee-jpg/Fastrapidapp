import { Check, Circle, ConciergeBell, Home, Truck } from 'lucide-react'

const stepIcons = {
  accepted: Check,
  preparing: Circle,
  ready: ConciergeBell,
  dispatched: Truck,
  delivered: Home,
}

function stepIndex(steps, currentId) {
  return steps.findIndex((s) => s.id === currentId)
}

export default function MerchantOrderDetailProgressStepper({ steps, currentStepId }) {
  const currentIndex = stepIndex(steps, currentStepId)

  return (
    <nav aria-label="Order progress" className="w-full">
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex
          const isActive = index === currentIndex
          const isPending = index > currentIndex
          const Icon = stepIcons[step.id] || Circle

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
                  className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${
                    isComplete || isActive
                      ? 'bg-merchant-primary text-white'
                      : 'bg-merchant-icon-tile text-merchant-muted'
                  }`}
                >
                  {isComplete ? (
                    <Check size={18} strokeWidth={2.5} aria-hidden />
                  ) : isActive ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-white" aria-hidden />
                  ) : (
                    <Icon size={16} strokeWidth={1.75} aria-hidden />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 ${index < currentIndex ? 'bg-merchant-primary' : 'bg-merchant-divider'}`}
                    aria-hidden
                  />
                )}
              </div>
              <p
                className={`mt-2 hidden text-center text-xs font-medium sm:block ${
                  isActive
                    ? 'font-semibold text-merchant-primary'
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
      <p className="mt-2 text-center text-xs font-semibold text-merchant-primary sm:hidden">
        {steps[currentIndex]?.label}
      </p>
    </nav>
  )
}
