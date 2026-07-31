import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { cacheKey, getCached, setCached } from '../utils/requestCache'

export const WALLET_CACHE_KEY = cacheKey(['wallet'])

export function markWalletHasPinInCache() {
  const cached = getCached(WALLET_CACHE_KEY)
  if (cached?.data) {
    setCached(WALLET_CACHE_KEY, { ...cached.data, has_pin: true })
  }
}

export async function getWalletData() {
  try {
    return await api.get('/user/wallet')
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function getWalletTransactions(params) {
  return api.get('/user/wallet/transactions', { params })
}

export async function getWalletTransaction(id) {
  try {
    const { data } = await api.get(`/user/wallet/transactions/${id}`)
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}



export async function getBanks() {
  try {
    const { data } = await api.get('/user/wallet/banks')
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function resolveAccountName(bankCode, accountNumber) {
  try {
    const { data } = await api.post('/user/wallet/resolve-account', {
      bank_code: bankCode,
      account_number: accountNumber
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function resolveRecipient(recipient) {
  try {
    const { data } = await api.post('/user/wallet/resolve-recipient', { recipient })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function sendBankTransfer(payload) {
  try {
    const { data } = await api.post('/user/wallet/transfer/bank', {
      amount: payload.amount,
      account_number: payload.accountNumber,
      bank_code: payload.bankCode,
      bank_name: payload.bankName,
      pin: payload.pin,
      auth_code: payload.auth_code,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function getVirtualAccountBanks() {
  try {
    const { data } = await api.get('/user/wallet/virtual-account/banks')
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function provisionVirtualAccount(preferredBank) {
  try {
    const payload = preferredBank ? { preferred_bank: preferredBank } : {}
    const { data } = await api.post('/user/wallet/virtual-account', payload)
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function initializeWalletFunding(amount) {
  try {
    const { data } = await api.post('/user/wallet/fund/initialize', { amount })
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function verifyWalletFunding(reference) {
  try {
    const { data } = await api.post('/user/wallet/fund/verify', { reference })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function sendWalletTransfer({ recipient, amount, pin, auth_code }) {
  try {
    const payload = { recipient, amount }
    if (pin) payload.pin = pin
    if (auth_code) payload.auth_code = auth_code
    const { data } = await api.post('/user/wallet/send', payload)
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function setWalletPin(pin) {
  try {
    await api.post('/user/wallet/pin', { pin })
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function changeWalletPin({ newPin, currentPin, authCode } = {}) {
  try {
    await api.post('/user/wallet/pin/change', {
      new_pin: newPin,
      current_pin: currentPin,
      auth_code: authCode,
    })
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function purchaseAirtime({ network, phone, amount, pin, auth_code }) {
  try {
    const { data } = await api.post('/user/wallet/bills/airtime', {
      network,
      phone,
      amount,
      pin,
      auth_code,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function getDataPlans(network) {
  try {
    const { data } = await api.get('/user/wallet/bills/data-plans', { params: { network } })
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function purchaseData({ network, phone, planId, amount, pin, auth_code }) {
  try {
    const { data } = await api.post('/user/wallet/bills/data', {
      network,
      phone,
      plan_id: planId,
      amount,
      pin,
      auth_code,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function verifyMeter({ serviceId, meterNumber, type }) {
  try {
    const { data } = await api.post('/user/wallet/bills/electricity/verify', { service_id: serviceId, meter_number: meterNumber, type })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function purchaseElectricity({ serviceId, meterNumber, type, amount, phone, pin, auth_code }) {
  try {
    const { data } = await api.post('/user/wallet/bills/electricity', {
      service_id: serviceId,
      meter_number: meterNumber,
      type,
      amount,
      phone,
      pin,
      auth_code,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function getCablePlans(service) {
  try {
    const { data } = await api.get('/user/wallet/bills/cable-plans', { params: { service } })
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function verifySmartcard({ service, smartcardNumber }) {
  try {
    const { data } = await api.post('/user/wallet/bills/cable/verify', {
      service,
      smartcard_number: smartcardNumber,
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function purchaseCable({ service, smartcardNumber, planId, phone, amount, pin, auth_code }) {
  try {
    const { data } = await api.post('/user/wallet/bills/cable', {
      service,
      smartcard_number: smartcardNumber,
      plan_id: planId,
      phone,
      amount,
      pin,
      auth_code,
    })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export function walletTransactionLabel(tx) {
  if (tx.description) return tx.description
  const labels = {
    fund_card: 'Card funding',
    fund_transfer: 'Bank transfer',
    p2p_send: 'Transfer sent',
    p2p_receive: 'Transfer received',
    airtime: 'Airtime purchase',
    data: 'Data bundle',
    electricity: 'Electricity',
    cable: 'Cable TV',
    order_debit: 'Order payment',
    order_refund: 'Order refund',
    bank_transfer: 'Bank transfer',
    bank_transfer_refund: 'Bank transfer refund',
    airtime_refund: 'Airtime refund',
    data_refund: 'Data refund',
    electricity_refund: 'Electricity refund',
    cable_refund: 'Cable TV refund',
  }
  return labels[tx.category] || tx.reference || 'Wallet transaction'
}

export function walletTransactionPaymentMethod(tx) {
  if (tx?.payment_method) return tx.payment_method

  const methods = {
    fund_card: 'Card',
    fund_transfer: 'Bank Transfer',
    p2p_send: 'Rapid Wallet',
    p2p_receive: 'Rapid Wallet',
    airtime: 'Rapid Wallet',
    data: 'Rapid Wallet',
    electricity: 'Rapid Wallet',
    cable: 'Rapid Wallet',
    bank_transfer: 'Rapid Wallet',
    bank_transfer_refund: 'Bank Transfer',
    order_debit: 'Rapid Wallet',
    order_refund: 'Rapid Wallet',
  }

  return methods[tx?.category] || 'Rapid Wallet'
}

export function walletTransactionCategoryLabel(tx) {
  if (tx?.category_label) return tx.category_label

  const labels = {
    fund_card: 'Card Funding',
    fund_transfer: 'Bank Funding',
    p2p_send: 'Wallet Transfer',
    p2p_receive: 'Wallet Transfer',
    bank_transfer: 'Bank Transfer',
    bank_transfer_refund: 'Bank Transfer Refund',
    airtime: 'Airtime',
    data: 'Data Bundle',
    electricity: 'Electricity',
    cable: 'Cable TV',
    order_debit: 'Order Payment',
    order_refund: 'Order Refund',
    airtime_refund: 'Airtime Refund',
    data_refund: 'Data Refund',
    electricity_refund: 'Electricity Refund',
    cable_refund: 'Cable TV Refund',
  }

  return labels[tx?.category] || 'Wallet Transaction'
}
