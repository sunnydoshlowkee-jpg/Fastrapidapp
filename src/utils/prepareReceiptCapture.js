import { RECEIPT_LOGO_DATA_URL } from '../assets/receiptLogoData'

export function getReceiptLogoDataUrl() {
  return Promise.resolve(RECEIPT_LOGO_DATA_URL)
}

export async function prepareElementForCapture(element) {
  if (!element) return

  element.querySelectorAll('[data-receipt-logo]').forEach((node) => {
    if (node.tagName === 'IMG') {
      node.src = RECEIPT_LOGO_DATA_URL
      node.setAttribute('data-capture-src', RECEIPT_LOGO_DATA_URL)
      return
    }

    node.style.backgroundImage = `url(${RECEIPT_LOGO_DATA_URL})`
    node.style.backgroundSize = 'contain'
    node.style.backgroundRepeat = 'no-repeat'
    node.style.backgroundPosition = 'center'
  })
}

export function applyReceiptLogoToClone(clonedRoot) {
  if (!clonedRoot) return

  clonedRoot.querySelectorAll('[data-receipt-logo]').forEach((node) => {
    if (node.tagName === 'IMG') {
      node.src = RECEIPT_LOGO_DATA_URL
      node.removeAttribute('crossorigin')
      return
    }

    node.style.backgroundImage = `url(${RECEIPT_LOGO_DATA_URL})`
    node.style.backgroundSize = 'contain'
    node.style.backgroundRepeat = 'no-repeat'
    node.style.backgroundPosition = 'center'
  })
}
