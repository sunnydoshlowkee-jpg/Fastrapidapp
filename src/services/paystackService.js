import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

const PAYSTACK_SCRIPT_URL = 'https://js.paystack.co/v2/inline.js'

function loadPaystackScript() {
  if (typeof window.PaystackPop === 'function') {
    return Promise.resolve(window.PaystackPop)
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PAYSTACK_SCRIPT_URL}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.PaystackPop))
      existing.addEventListener('error', () => reject(new Error('Could not load Paystack.')))
      return
    }

    const script = document.createElement('script')
    script.src = PAYSTACK_SCRIPT_URL
    script.async = true
    script.onload = () => resolve(window.PaystackPop)
    script.onerror = () => reject(new Error('Could not load Paystack.'))
    document.body.appendChild(script)
  })
}

export async function initializePaystackCheckout(payload) {
  try {
    const { data } = await api.post('/user/payments/paystack/initialize', payload)
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function openPaystackCheckout({
  email,
  amountKobo,
  reference,
  publicKey,
  accessCode,
  onSuccess,
  onClose,
}) {
  const key = publicKey || import.meta.env.VITE_PAYSTACK_KEY

  if (!accessCode && !key) {
    throw new Error('Paystack public key is not configured.')
  }

  const PaystackPop = await loadPaystackScript()
  const paystack = new PaystackPop()

  return new Promise((resolve, reject) => {
    const transactionConfig = {
      onSuccess: (transaction) => {
        const result = {
          reference: transaction?.reference || reference,
          ...transaction,
        }
        onSuccess?.(result)
        resolve(result)
      },
      onCancel: () => {
        onClose?.()
        reject(new Error('Payment cancelled.'))
      },
    }

    if (accessCode) {
      transactionConfig.accessCode = accessCode
    } else {
      transactionConfig.key = key
      transactionConfig.email = email
      transactionConfig.amount = amountKobo
      transactionConfig.reference = reference
    }

    paystack.newTransaction(transactionConfig)
  })
}
