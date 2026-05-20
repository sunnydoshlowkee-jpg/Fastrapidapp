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
      className={`flex w-full items-center justify-center rounded-lg bg-[linear-gradient(178deg,#2419E9_0%,#4342FF_100%)] px-4 py-[17px] font-sans text-sm font-semibold leading-[21px] tracking-[0.025em] text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:bg-merchant-primary md:py-4 md:text-base md:leading-6 md:tracking-normal md:shadow-merchant-btn md:hover:bg-[#3837e6] ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
