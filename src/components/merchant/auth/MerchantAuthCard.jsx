export default function MerchantAuthCard({ children, footer, bordered = false, className = '' }) {
  return (
    <article
      className={`flex w-full flex-col gap-8 rounded-xl bg-white px-6 py-10 md:gap-8 md:rounded-lg md:px-10 md:pb-10 md:pt-10 ${
        bordered
          ? 'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:shadow-[0px_8px_40px_0px_rgba(25,28,29,0.04)]'
          : 'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] md:shadow-merchant-card'
      } ${className}`}
    >
      {children}
      {footer && (
        <footer className="pt-8 md:border-t md:border-merchant-divider">
          {footer}
        </footer>
      )}
    </article>
  )
}
