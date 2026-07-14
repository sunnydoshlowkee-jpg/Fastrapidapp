import { MERCHANT_HELP_SUPPORT } from '../../../services/data/merchantHelpSupport.mock'
import MerchantHelpSupportMobileFaq from './mobile/MerchantHelpSupportMobileFaq'
import MerchantHelpSupportMobileHeader from './mobile/MerchantHelpSupportMobileHeader'
import MerchantHelpSupportMobileHero from './mobile/MerchantHelpSupportMobileHero'
import MerchantHelpSupportMobileQuickLinks from './mobile/MerchantHelpSupportMobileQuickLinks'
import MerchantHelpSupportMobileTicketForm from './mobile/MerchantHelpSupportMobileTicketForm'

export default function MerchantHelpSupportMobile() {
  const data = MERCHANT_HELP_SUPPORT
  const mobile = data.mobile

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-5 lg:hidden">
      <MerchantHelpSupportMobileHeader title={data.pageTitle} merchantId={mobile.merchantId} />

      <MerchantHelpSupportMobileHero hero={mobile.hero} />
      <MerchantHelpSupportMobileFaq faq={mobile.faq} />
      <MerchantHelpSupportMobileQuickLinks quickLinks={mobile.quickLinks} />
      <MerchantHelpSupportMobileTicketForm ticket={mobile.ticket} />
    </div>
  )
}
