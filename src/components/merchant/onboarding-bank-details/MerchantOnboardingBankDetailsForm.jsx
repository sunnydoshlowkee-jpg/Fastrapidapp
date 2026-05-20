import { useState } from 'react'
import { ArrowRight, Check, Lock, RefreshCw, Shield, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import MerchantButton from '../auth/MerchantButton'
import MerchantRegistrationField from '../registration/MerchantRegistrationField'
import {
  merchantOnboardingShellClass,
  merchantRegistrationFieldClass,
  merchantRegistrationLabelClass,
} from '../registration/merchantRegistrationStyles'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../services/data/merchantHelpSupport.mock'
import MerchantOnboardingBankDetailsEnterpriseCard from './MerchantOnboardingBankDetailsEnterpriseCard'

const ACCOUNT_NUMBER_LENGTH = 10

const MOBILE_BANK_LABEL_CLASS =
  'text-[11px] font-bold uppercase tracking-[0.06em] text-merchant-ink'

export default function MerchantOnboardingBankDetailsForm({
  page,
  fields,
  panel,
  onSaveNext,
  onSkip,
  variant = 'desktop',
}) {
  const isMobile = variant === 'mobile'
  const [bank, setBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [resolving, setResolving] = useState(false)

  const resolveAccountName = async (number) => {
    if (number.length !== ACCOUNT_NUMBER_LENGTH) {
      setAccountName('')
      return
    }
    setResolving(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    setAccountName(fields.accountName.resolvedName)
    setResolving(false)
  }

  const handleAccountNumberChange = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, ACCOUNT_NUMBER_LENGTH)
    setAccountNumber(next)
    if (next.length === ACCOUNT_NUMBER_LENGTH) {
      resolveAccountName(next)
    } else {
      setAccountName('')
    }
  }

  const handleRefresh = () => {
    if (accountNumber.length === ACCOUNT_NUMBER_LENGTH) {
      resolveAccountName(accountNumber)
    }
  }

  const finishLabel = page.mobileFinishLabel ?? page.saveNextLabel
  const verifiedBannerLabel = fields.accountName.verifiedBannerLabel ?? fields.accountName.label

  const accountVerifiedBanner = accountName ? (
    isMobile ? (
      <div className="flex items-center gap-3 rounded-xl bg-merchant-primary px-4 py-3.5 text-white shadow-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
          <User size={18} strokeWidth={1.75} className="text-white" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 text-left">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/90">
            {verifiedBannerLabel}
          </p>
          <p className="mt-1 break-words text-sm font-bold uppercase leading-snug tracking-wide">
            {accountName}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
          <Check size={18} strokeWidth={2.5} className="text-white" aria-hidden />
        </span>
      </div>
    ) : (
      <div className="flex items-center gap-3 rounded-lg bg-merchant-nav-active px-4 py-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-primary text-white">
          <User size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-merchant-primary">
            {fields.accountName.label}
          </p>
          <p className="mt-0.5 text-sm font-bold text-merchant-ink">{accountName}</p>
        </div>
      </div>
    )
  ) : null

  return (
    <div className={`mx-auto w-full ${isMobile ? 'max-w-lg' : 'max-w-2xl'} ${merchantOnboardingShellClass}`}>
      {!isMobile ? (
        <>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:text-[1.75rem]">
            {page.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-merchant-body lg:text-base">{page.subtitle}</p>
        </>
      ) : (
        <div className="space-y-1 text-left text-sm leading-relaxed text-merchant-body">
          <p>{page.introLine1}</p>
          <p>{page.introLine2}</p>
        </div>
      )}

      <form
        id={isMobile ? 'merchant-onboarding-bank-mobile-form' : undefined}
        className={isMobile ? 'mt-5' : 'mt-8'}
        onSubmit={(e) => {
          e.preventDefault()
          onSaveNext?.()
        }}
      >
        <article
          className={`rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat md:p-6 ${
            isMobile ? 'border-0' : 'border border-merchant-divider'
          }`}
        >
          <div className="space-y-5">
            <MerchantRegistrationField
              id="onboarding-bank"
              label={fields.bank.label}
              as="select"
              placeholderOption={fields.bank.placeholder}
              options={fields.bank.options}
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              bare={isMobile}
              labelClassName={isMobile ? MOBILE_BANK_LABEL_CLASS : undefined}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="onboarding-account-number"
                className={isMobile ? MOBILE_BANK_LABEL_CLASS : merchantRegistrationLabelClass}
              >
                {fields.accountNumber.label}
              </label>
              <div className="relative">
                <input
                  id="onboarding-account-number"
                  type="text"
                  inputMode="numeric"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  placeholder={fields.accountNumber.placeholder}
                  className={`${merchantRegistrationFieldClass} pr-12 ${
                    isMobile ? 'border-transparent bg-merchant-input focus:border-merchant-primary/25' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={resolving}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-merchant-primary transition-colors hover:text-merchant-link disabled:opacity-50"
                  aria-label="Refresh account name"
                >
                  <RefreshCw
                    size={18}
                    strokeWidth={2}
                    className={resolving ? 'animate-spin' : ''}
                    aria-hidden
                  />
                </button>
              </div>
            </div>

            {accountVerifiedBanner}
          </div>

          {!isMobile ? (
            <>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MerchantButton type="submit" className="gap-2 sm:flex-1">
                  {page.saveNextLabel}
                  <ArrowRight size={18} strokeWidth={2} aria-hidden />
                </MerchantButton>
                <button
                  type="button"
                  onClick={onSkip}
                  className="py-3 text-center text-sm font-semibold text-merchant-body transition-colors hover:text-merchant-ink sm:px-4"
                >
                  {page.skipLabel}
                </button>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 border-t border-merchant-divider pt-5 text-center text-xs text-merchant-muted">
                <Shield size={14} className="shrink-0 text-merchant-primary" strokeWidth={1.75} aria-hidden />
                {page.securityNote}
              </p>
            </>
          ) : null}
        </article>

        {isMobile ? (
          <>
            <div className="mt-4 flex gap-3 rounded-lg bg-merchant-input p-4 text-sm leading-relaxed text-merchant-body">
              <Lock size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
              <p>{page.securityNote}</p>
            </div>

            {panel ? (
              <div className="mt-4">
                <MerchantOnboardingBankDetailsEnterpriseCard panel={panel} />
              </div>
            ) : null}

            <p className="mt-6 text-center text-sm text-merchant-body">
              {page.helpPrefix}{' '}
              <Link
                to={MERCHANT_HELP_SUPPORT_PATH}
                className="font-semibold text-merchant-primary hover:text-merchant-link"
              >
                {page.helpLinkLabel}
              </Link>
            </p>
          </>
        ) : null}
      </form>

      {!isMobile ? (
        <p className="mt-6 text-center text-sm text-merchant-body">
          {page.helpPrefix}{' '}
          <Link
            to={MERCHANT_HELP_SUPPORT_PATH}
            className="font-semibold text-merchant-primary hover:text-merchant-link"
          >
            {page.helpLinkLabel}
          </Link>
        </p>
      ) : null}
    </div>
  )
}
