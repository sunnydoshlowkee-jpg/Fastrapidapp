import { useCallback, useEffect, useState } from 'react'
import { MERCHANT_ONBOARDING_BANK_DETAILS } from '../../../services/data/merchantOnboardingBankDetails.mock'
import { fetchMerchantPayout, fetchMerchantPayoutBanks } from '../../../services/merchantPayoutService'
import { completePayoutOnboardingStep, merchantRedirectPath } from '../../../services/merchantOnboardingService'
import { useNavigate } from 'react-router-dom'
import MerchantOnboardingBankDetailsDesktop from './MerchantOnboardingBankDetailsDesktop'
import MerchantOnboardingBankDetailsMobile from './MerchantOnboardingBankDetailsMobile'

const template = MERCHANT_ONBOARDING_BANK_DETAILS

export default function MerchantOnboardingBankDetailsPage() {
  const navigate = useNavigate()
  const [banks, setBanks] = useState([])
  const [initialPayout, setInitialPayout] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [bankList, saved] = await Promise.all([
          fetchMerchantPayoutBanks(),
          fetchMerchantPayout(),
        ])
        if (cancelled) {
          return
        }
        setBanks(bankList)
        setInitialPayout(saved)
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || 'Unable to load bank details.')
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  const bankOptions = banks.map((bank) => ({
    value: bank.code,
    label: bank.name,
  }))

  const fields = {
    ...template.fields,
    bank: {
      ...template.fields.bank,
      options: bankOptions.length > 0 ? bankOptions : template.fields.bank.options,
    },
  }

  const goNext = useCallback(
    async (payoutPayload) => {
      setFormError('')
      setSubmitting(true)
      try {
        const result = await completePayoutOnboardingStep(payoutPayload)
        navigate(merchantRedirectPath(result.onboarding), { replace: true })
      } catch (err) {
        setFormError(err.message || 'Unable to continue.')
      } finally {
        setSubmitting(false)
      }
    },
    [navigate],
  )

  const sharedProps = {
    data: { ...template, fields },
    initialPayout,
    loadError,
    formError,
    submitting,
    onSaveNext: goNext,
    onSkip: () => goNext(null),
  }

  return (
    <>
      <MerchantOnboardingBankDetailsMobile {...sharedProps} />
      <MerchantOnboardingBankDetailsDesktop {...sharedProps} />
    </>
  )
}
