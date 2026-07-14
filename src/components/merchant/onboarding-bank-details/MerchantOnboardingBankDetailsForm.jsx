import { useEffect, useRef, useState } from 'react'
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
import { resolveMerchantBankAccount } from '../../../services/merchantPayoutService'

function payoutMatchesSaved(saved, code, number, name) {
  if (!saved?.verified) {
    return false
  }

  return (
    saved.bank_code === code &&
    saved.account_number === number &&
    saved.account_name === name
  )
}
import MerchantOnboardingBankDetailsEnterpriseCard from './MerchantOnboardingBankDetailsEnterpriseCard'

const ACCOUNT_NUMBER_LENGTH = 10

const MOBILE_BANK_LABEL_CLASS =
  'text-[11px] font-bold uppercase tracking-[0.06em] text-merchant-ink'

export default function MerchantOnboardingBankDetailsForm({
  page,
  fields,
  panel,
  initialPayout,
  loadError,
  formError,
  submitting = false,
  onSaveNext,
  onSkip,
  variant = 'desktop',
}) {
  const isMobile = variant === 'mobile'
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [resolving, setResolving] = useState(false)
  const [resolveError, setResolveError] = useState('')
  const [savedToDatabase, setSavedToDatabase] = useState(false)
  const resolveRequestId = useRef(0)

  useEffect(() => {
    if (!initialPayout) {
      return
    }

    setBankCode(initialPayout.bank_code ?? '')
    setAccountNumber(initialPayout.account_number ?? '')
    setAccountName(initialPayout.account_name ?? '')
    setSavedToDatabase(Boolean(initialPayout.verified))
  }, [initialPayout])

  const resolveAccountName = async (number, code) => {
    if (!code || number.length !== ACCOUNT_NUMBER_LENGTH) {
      setAccountName('')
      setResolveError('')
      return
    }

    const requestId = ++resolveRequestId.current
    setResolving(true)
    setResolveError('')

    try {
      const result = await resolveMerchantBankAccount({
        bankCode: code,
        accountNumber: number,
      })

      if (requestId !== resolveRequestId.current) {
        return
      }

      const resolvedName = result?.account_name ?? ''
      setAccountName(resolvedName)
      setSavedToDatabase(
        payoutMatchesSaved(result, code, number, resolvedName) || Boolean(result?.verified),
      )
    } catch (err) {
      if (requestId !== resolveRequestId.current) {
        return
      }

      setAccountName('')
      setSavedToDatabase(false)
      setResolveError(err.message || 'Could not verify this bank account.')
    } finally {
      if (requestId === resolveRequestId.current) {
        setResolving(false)
      }
    }
  }

  const handleBankChange = (e) => {
    const nextCode = e.target.value
    setBankCode(nextCode)
    setAccountName('')
    setSavedToDatabase(false)
    setResolveError('')

    if (accountNumber.length === ACCOUNT_NUMBER_LENGTH) {
      resolveAccountName(accountNumber, nextCode)
    }
  }

  const handleAccountNumberChange = (e) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, ACCOUNT_NUMBER_LENGTH)
    setAccountNumber(next)
    setResolveError('')
    setSavedToDatabase(false)

    if (next.length === ACCOUNT_NUMBER_LENGTH && bankCode) {
      resolveAccountName(next, bankCode)
    } else {
      setAccountName('')
    }
  }

  const handleRefresh = () => {
    if (accountNumber.length === ACCOUNT_NUMBER_LENGTH && bankCode) {
      resolveAccountName(accountNumber, bankCode)
    }
  }

  const canSubmit =
    bankCode &&
    accountNumber.length === ACCOUNT_NUMBER_LENGTH &&
    accountName &&
    !resolving

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

      {loadError ? (
        <p className="mt-4 rounded-lg border border-merchant-error/30 bg-merchant-error/5 px-4 py-3 text-sm text-merchant-error">
          {loadError}
        </p>
      ) : null}

      <form
        id={isMobile ? 'merchant-onboarding-bank-mobile-form' : undefined}
        className={isMobile ? 'mt-5' : 'mt-8'}
        onSubmit={(e) => {
          e.preventDefault()
          if (!canSubmit) {
            if (!bankCode) {
              setResolveError('Please select your bank.')
            } else if (accountNumber.length !== ACCOUNT_NUMBER_LENGTH) {
              setResolveError('Enter a valid 10-digit account number.')
            } else if (!accountName) {
              setResolveError('Verify your account name before continuing.')
            }
            return
          }

          onSaveNext?.({
            bankCode,
            accountNumber,
            accountName,
          })
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
              value={bankCode}
              onChange={handleBankChange}
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
                  disabled={!bankCode}
                  className={`${merchantRegistrationFieldClass} pr-12 ${
                    isMobile ? 'border-transparent bg-merchant-input focus:border-merchant-primary/25' : ''
                  } ${!bankCode ? 'opacity-60' : ''}`}
                />
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={resolving || !bankCode || accountNumber.length !== ACCOUNT_NUMBER_LENGTH}
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
              {!bankCode ? (
                <p className="text-xs text-merchant-muted">Select a bank first, then enter your account number.</p>
              ) : null}
            </div>

            {resolving ? (
              <p className="text-sm text-merchant-body">Verifying account name…</p>
            ) : null}

            {resolveError ? (
              <p className="rounded-lg border border-merchant-error/30 bg-merchant-error/5 px-4 py-3 text-sm text-merchant-error">
                {resolveError}
              </p>
            ) : null}

            {accountVerifiedBanner}

            {savedToDatabase && accountName ? (
              <p className="text-xs font-medium text-merchant-primary">
                Bank details saved to your merchant profile.
              </p>
            ) : null}
          </div>

          {formError ? (
            <p className="mt-4 rounded-lg border border-merchant-error/30 bg-merchant-error/5 px-4 py-3 text-sm text-merchant-error">
              {formError}
            </p>
          ) : null}

          {!isMobile ? (
            <>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <MerchantButton type="submit" className="gap-2 sm:flex-1" disabled={submitting || !canSubmit}>
                  {page.saveNextLabel}
                  <ArrowRight size={18} strokeWidth={2} aria-hidden />
                </MerchantButton>
                <button
                  type="button"
                  onClick={onSkip}
                  disabled={submitting}
                  className="py-3 text-center text-sm font-semibold text-merchant-body transition-colors hover:text-merchant-ink disabled:opacity-50 sm:px-4"
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
