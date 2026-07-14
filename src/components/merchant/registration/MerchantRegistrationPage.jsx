import { useEffect, useState } from 'react'
import { fetchMerchantRegistrationDraft } from '../../../services/merchantRegistrationService'
import MerchantRegistrationDesktop from './MerchantRegistrationDesktop'
import MerchantRegistrationMobile from './mobile/MerchantRegistrationMobile'

export default function MerchantRegistrationPage() {
  const [draft, setDraft] = useState(null)
  const [draftStatus, setDraftStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    async function loadDraft() {
      const loaded = await fetchMerchantRegistrationDraft()
      if (!cancelled) {
        setDraft(loaded)
        setDraftStatus('ready')
      }
    }

    loadDraft()

    return () => {
      cancelled = true
    }
  }, [])

  const formKey = draft?.values
    ? `draft-${draft.values.businessEmail || 'merchant'}`
    : draftStatus

  return (
    <>
      <MerchantRegistrationMobile
        key={`mobile-${formKey}`}
        initialValues={draft?.values}
        initialLogoUrl={draft?.logoUrl}
      />
      <MerchantRegistrationDesktop
        key={`desktop-${formKey}`}
        initialValues={draft?.values}
        initialLogoUrl={draft?.logoUrl}
      />
    </>
  )
}
