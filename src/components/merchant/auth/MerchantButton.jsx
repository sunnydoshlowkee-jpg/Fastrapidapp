export default function MerchantButton({
  children,
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`flex w-full items-center justify-center rounded bg-[linear-gradient(106.84deg,#3E3CFB_0%,#2F29F0_100%)] px-4 py-3.5 font-sans text-sm font-bold leading-5 text-[#FAF6FF] shadow-merchant-cta transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
