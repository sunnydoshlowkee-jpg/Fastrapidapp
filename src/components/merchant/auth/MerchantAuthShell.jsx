import Logo from '../../brand/Logo'
import MerchantAuthFooter from './MerchantAuthFooter'

export default function MerchantAuthShell({
  children,
  footerVariant = 'login',
  withGradient = false,
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-merchant-canvas">
      {withGradient && (
        <>
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-80"
            style={{
              background:
                'radial-gradient(circle, rgba(67, 66, 255, 0.09) 0%, rgba(67, 66, 255, 0) 70%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-40 -right-24 h-[480px] w-[480px] rounded-full opacity-80"
            style={{
              background:
                'radial-gradient(circle, rgba(36, 25, 233, 0.07) 0%, rgba(36, 25, 233, 0) 70%)',
            }}
            aria-hidden
          />
        </>
      )}

      <header className="relative z-10 hidden shrink-0 justify-center px-4 pb-8 pt-[102px] md:flex">
        <Logo height={40} className="h-10 w-auto max-w-[243px]" />
      </header>

      <main className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-8 md:px-4 md:pb-6">
        <div className="mx-auto flex w-full max-w-[440px] flex-col md:gap-4">
          <div className="flex justify-center pb-2 md:hidden">
            <Logo height={26} className="h-[26px] w-auto max-w-[162px]" />
          </div>
          {children}
          <MerchantAuthFooter variant={footerVariant} />
        </div>
      </main>
    </div>
  )
}
