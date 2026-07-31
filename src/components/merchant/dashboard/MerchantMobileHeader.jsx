import MerchantHeaderActions from '../layout/MerchantHeaderActions'

export default function MerchantMobileHeader({ variant = 'inline' }) {
  const isBar = variant === 'bar'

  return (
    <header
      className={
        isBar
          ? 'sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 bg-merchant-input px-4 pt-app pb-2 lg:hidden'
          : 'flex items-center justify-between gap-4'
      }
    >
      <h1
        className={
          isBar
            ? 'text-base font-bold leading-6 tracking-[-0.4px] text-merchant-ink'
            : 'text-base font-bold uppercase tracking-[0.06em] text-merchant-ink'
        }
      >
        {isBar ? 'MERCHANT PORTAL' : 'Merchant Portal'}
      </h1>
      <MerchantHeaderActions />
    </header>
  )
}
