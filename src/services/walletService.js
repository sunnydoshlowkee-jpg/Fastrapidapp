import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function getWalletData() {
  return api.get('/user/wallet')
}

export async function getWalletTransactions(params) {
  return api.get('/user/wallet/transactions', { params })
}



export async function sendBankTransfer(payload) {
  // Mock bank transfer for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Transfer to bank successful' })
    }, 1000)
  })
}

export async function provisionVirtualAccount() {
  try {
    const { data } = await api.post('/user/wallet/virtual-account')
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

export async function sendWalletTransfer({ recipient, amount, pin }) {
  try {
    const { data } = await api.post('/user/wallet/send', { recipient, amount, pin })
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

export async function purchaseAirtime({ network, phone, amount }) {
  try {
    const { data } = await api.post('/user/wallet/bills/airtime', { network, phone, amount })
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

export async function purchaseData({ network, phone, planId }) {
  try {
    const { data } = await api.post('/user/wallet/bills/data', { network, phone, plan_id: planId })
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

export async function purchaseElectricity({ serviceId, meterNumber, type, amount, phone }) {
  try {
    const { data } = await api.post('/user/wallet/bills/electricity', { service_id: serviceId, meter_number: meterNumber, type, amount, phone })
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
    order_debit: 'Order payment',
  }
  return labels[tx.category] || tx.reference || 'Wallet transaction'
}
