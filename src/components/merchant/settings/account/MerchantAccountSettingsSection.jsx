export default function MerchantAccountSettingsSection({ aside, children, danger }) {
  return (
    <section
      className={`grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-10 ${
        danger ? 'lg:items-start' : ''
      }`}
    >
      <aside className="lg:pt-1">{aside}</aside>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
