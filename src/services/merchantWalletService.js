import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { getCached, setCached } from '../utils/requestCache'

export const MERCHANT_WALLET_CACHE_KEY = 'merchant_wallet_v1'

export async function getMerchantWalletData() {
  try {
    return await api.get('/merchant/wallet')
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load wallet.')
  }
}

export async function getMerchantWalletTransactions({ page = 1, perPage = 20 } = {}) {
  try {
    const { data } = await api.get('/merchant/wallet/transactions', {
      params: { page, per_page: perPage },
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load transactions.')
  }
}

export async function provisionMerchantVirtualAccount(preferredBank) {
  try {
    const payload = preferredBank ? { preferred_bank: preferredBank } : {}
    const { data } = await api.post('/merchant/wallet/virtual-account', payload)
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not set up virtual account.')
  }
}

export async function getMerchantBanks() {
  try {
    const { data } = await api.get('/merchant/wallet/banks')
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load banks.')
  }
}

export async function resolveMerchantAccountName(bankCode, accountNumber) {
  try {
    const { data } = await api.post('/merchant/wallet/resolve-account', {
      bank_code: bankCode,
      account_number: accountNumber,
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not verify account name.')
  }
}

export async function resolveMerchantRecipient(recipient) {
  try {
    const { data } = await api.post('/merchant/wallet/resolve-recipient', { recipient })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'No Rapid user found for that recipient.')
  }
}

export async function sendMerchantWalletTransfer({ recipient, amount, pin }) {
  try {
    const { data } = await api.post('/merchant/wallet/send', {
      recipient,
      amount,
      pin,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Transfer failed.')
  }
}

export async function withdrawMerchantToLinkedBank({ amount, pin }) {
  try {
    const { data } = await api.post('/merchant/wallet/withdraw', { amount, pin })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Withdrawal failed.')
  }
}

export async function sendMerchantBankTransfer({ bankCode, bankName, accountNumber, amount, pin }) {
  try {
    const { data } = await api.post('/merchant/wallet/transfer/bank', {
      bank_code: bankCode,
      bank_name: bankName,
      account_number: accountNumber,
      amount,
      pin,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Bank transfer failed.')
  }
}

export async function setMerchantWalletPin(pin) {
  try {
    const { data } = await api.post('/merchant/wallet/pin', { pin })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not save PIN.')
  }
}

export function markMerchantWalletHasPinInCache() {
  const cached = getCached(MERCHANT_WALLET_CACHE_KEY)
  if (cached?.data) {
    setCached(MERCHANT_WALLET_CACHE_KEY, { ...cached.data, has_pin: true })
  }
}

export function merchantWalletTransactionLabel(tx) {
  if (tx?.category_label) return tx.category_label
  if (tx?.description) return tx.description
  return tx?.type === 'credit' ? 'Credit' : 'Debit'
}
