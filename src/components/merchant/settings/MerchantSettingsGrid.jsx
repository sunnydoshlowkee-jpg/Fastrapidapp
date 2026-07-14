import MerchantSettingsCard from './MerchantSettingsCard'

export default function MerchantSettingsGrid({ cards, onSelectCard, variant = 'desktop' }) {
  const isMobile = variant === 'mobile'

  return (
    <div
      className={
        isMobile ? 'flex flex-col gap-3' : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5'
      }
    >
      {cards.map((card) => (
        <MerchantSettingsCard
          key={card.id}
          card={card}
          variant={variant}
          onSelect={onSelectCard}
        />
      ))}
    </div>
  )
}
