import html2canvas from 'html2canvas'
import { applyReceiptLogoToClone, prepareElementForCapture } from './prepareReceiptCapture'

async function renderElementToCanvas(element) {
  if (!element) {
    throw new Error('Receipt is not ready to download yet.')
  }

  await prepareElementForCapture(element)

  return html2canvas(element, {
    backgroundColor: '#FFFFFF',
    scale: Math.max(2, Math.min(window.devicePixelRatio || 1, 3)),
    useCORS: true,
    allowTaint: false,
    logging: false,
    imageTimeout: 15000,
    onclone: (clonedDoc) => {
      applyReceiptLogoToClone(clonedDoc.body)
    },
  })
}

export async function captureElementAsPngBlob(element) {
  const canvas = await renderElementToCanvas(element)
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Could not generate receipt image.'))
    }, 'image/png', 1.0)
  })
}

export async function downloadElementAsPng(element, filename) {
  const canvas = await renderElementToCanvas(element)
  const dataUrl = canvas.toDataURL('image/png', 1.0)
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
