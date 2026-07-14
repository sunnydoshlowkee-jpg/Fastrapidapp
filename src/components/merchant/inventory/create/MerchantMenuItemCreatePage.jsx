import MerchantMenuItemCreateDesktop from './MerchantMenuItemCreateDesktop'
import MerchantMenuItemCreateMobile from './MerchantMenuItemCreateMobile'
import useMerchantMenuItemCreate from './useMerchantMenuItemCreate'

export default function MerchantMenuItemCreatePage() {
  const menuItemCreate = useMerchantMenuItemCreate()

  return (
    <>
      <MerchantMenuItemCreateMobile {...menuItemCreate} />
      <MerchantMenuItemCreateDesktop {...menuItemCreate} />
    </>
  )
}
