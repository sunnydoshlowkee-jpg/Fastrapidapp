export default function AdminLoginButton({
  children,
  disabled,
  type = 'submit',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-lg bg-gradient-to-b from-[#FF6B2C] to-[#A84A18] px-4 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0px_4px_14px_0px_rgba(232,90,31,0.35)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
