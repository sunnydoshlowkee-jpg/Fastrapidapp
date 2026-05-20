import { useOutletContext } from 'react-router-dom'
import { MERCHANT_HELP_SUPPORT } from '../../../services/data/merchantHelpSupport.mock'
import MerchantHelpSupportFaq from './MerchantHelpSupportFaq'
import MerchantHelpSupportHeader from './MerchantHelpSupportHeader'
import MerchantHelpSupportHero from './MerchantHelpSupportHero'
import MerchantHelpSupportQuickLinks from './MerchantHelpSupportQuickLinks'
import MerchantHelpSupportTicketForm from './MerchantHelpSupportTicketForm'

export default function MerchantHelpSupportDesktop() {
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_HELP_SUPPORT

  return (
    <div className="hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantHelpSupportHeader
        title={data.pageTitle}
        user={data.user}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <MerchantHelpSupportHero hero={data.hero} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] xl:gap-8">
        <div className="flex flex-col gap-6">
          <MerchantHelpSupportFaq faq={data.faq} />
          <MerchantHelpSupportQuickLinks quickLinks={data.quickLinks} />
        </div>

        <MerchantHelpSupportTicketForm ticket={data.ticket} />
      </div>
    </div>
  )
}
