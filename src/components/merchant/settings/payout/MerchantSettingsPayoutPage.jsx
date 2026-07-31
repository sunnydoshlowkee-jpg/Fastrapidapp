import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import BrandedLoader from '../../../ui/BrandedLoader'
import { MERCHANT_ONBOARDING_BANK_DETAILS } from '../../../../services/data/merchantOnboardingBankDetails.mock'
import { MERCHANT_SETTINGS_PAYOUT } from '../../../../services/data/merchantSettingsPayout.mock'
import {
  fetchMerchantPayout,
  fetchMerchantPayoutBanks,
  saveMerchantPayout,
} from '../../../../services/merchantPayoutService'
import { getStoredMerchantSession } from '../../../../services/merchantAuthService'
import MerchantOnboardingBankDetailsForm from '../../onboarding-bank-details/MerchantOnboardingBankDetailsForm'
import MerchantOperatingHoursToast from '../operating-hours/MerchantOperatingHoursToast'

const template = MERCHANT_ONBOARDING_BANK_DETAILS

export default function MerchantSettingsPayoutPage() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext() || {}
  const copy = MERCHANT_SETTINGS_PAYOUT
  const [banks, setBanks] = useState([])
  const [initialPayout, setInitialPayout] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    if (!getStoredMerchantSession()) {
      navigate('/merchant/login', { replace: true })
      return
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const [bankList, saved] = await Promise.all([
          fetchMerchantPayoutBanks(),
          fetchMerchantPayout(),
        ])
        if (cancelled) return
        setBanks(bankList)
        setInitialPayout(saved)
      } catch (err) {
        if (!cancelled) {
          setLoadError(err.message || 'Unable to load bank details.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [navigate])

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

  const page = {
    ...template.page,
    title: copy.pageTitle,
    subtitle: copy.subtitle,
    saveNextLabel: copy.saveLabel,
    mobileFinishLabel: copy.saveLabel,
    skipLabel: 'Back to settings',
    mobileSkipLabel: 'Back',
  }

  const handleSave = useCallback(
    async (payload) => {
      setFormError('')
      setSubmitting(true)
      try {
        const saved = await saveMerchantPayout(payload)
        setInitialPayout(saved)
        setToastVisible(true)
        window.setTimeout(() => setToastVisible(false), 3200)
      } catch (err) {
        setFormError(err.message || 'Unable to save payout details.')
      } finally {
        setSubmitting(false)
      }
    },
    [],
  )

  const handleSkip = useCallback(() => {
    navigate('/merchant/settings')
  }, [navigate])

  if (loading) {
    return <BrandedLoader fill className="p-8" />
  }

  return (
    <div className="relative flex flex-1 flex-col gap-6 p-4 lg:p-8">
      <div className="flex items-center justify-between gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => openMobileNav?.()}
          className="text-sm font-semibold text-merchant-primary"
        >
          Menu
        </button>
        <h1 className="text-base font-bold text-merchant-ink">{copy.pageTitle}</h1>
        <span className="w-10" />
      </div>

      <div className="hidden lg:block">
        <h1 className="text-2xl font-bold text-merchant-ink">{copy.pageTitle}</h1>
        <p className="mt-2 text-sm text-merchant-muted">{copy.subtitle}</p>
      </div>

      <MerchantOnboardingBankDetailsForm
        page={page}
        fields={fields}
        panel={template.panel}
        initialPayout={initialPayout}
        loadError={loadError}
        formError={formError}
        submitting={submitting}
        onSaveNext={handleSave}
        onSkip={handleSkip}
        variant="desktop"
      />

      <MerchantOperatingHoursToast message={copy.successMessage} visible={toastVisible} />
    </div>
  )
}
