import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Info, Share2 } from 'lucide-react'
import {
  getWalletTransaction,
  walletTransactionCategoryLabel,
  walletTransactionLabel,
  walletTransactionPaymentMethod,
} from '../../../services/walletService'
import { captureElementAsPngBlob, downloadElementAsPng } from '../../../utils/downloadReceiptImage'
import { prepareElementForCapture } from '../../../utils/prepareReceiptCapture'
import { shareReceiptImage } from '../../../utils/shareReceiptImage'
import ReceiptDownloadCard from '../../../components/wallet/ReceiptDownloadCard'

async function waitForImages(element) {
  await prepareElementForCapture(element)
}

export default function WalletReceipt() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useLocation()
  const receiptRef = useRef(null)
  const [tx, setTx] = useState(state?.tx ?? null)
  const [loading, setLoading] = useState(!state?.tx)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [shareHint, setShareHint] = useState('')

  useEffect(() => {
    if (state?.tx || !id) return undefined

    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        const data = await getWalletTransaction(id)
        if (!cancelled) {
          setTx(data)
          setError(data ? '' : 'Transaction not found.')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Could not load transaction.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [id, state?.tx])

  const receiptFilename = () => {
    const reference = tx?.reference || `RD-TX-${tx?.id}`
    return `rapid-receipt-${reference}.png`
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      setError('')
      await waitForImages(receiptRef.current)
      await downloadElementAsPng(receiptRef.current, receiptFilename())
    } catch (err) {
      setError(err?.message || 'Could not download receipt image.')
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    try {
      setSharing(true)
      setError('')
      setShareHint('')
      await waitForImages(receiptRef.current)
      const blob = await captureElementAsPngBlob(receiptRef.current)
      const result = await shareReceiptImage(blob, receiptFilename())

      if (result.method === 'download') {
        setShareHint('Image sharing is not supported here. The receipt PNG was saved to your device instead.')
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setError(err?.message || 'Could not share receipt image.')
      }
    } finally {
      setSharing(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center">
        <p className="text-gray-500">Loading receipt…</p>
      </div>
    )
  }

  if (!tx) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] items-center justify-center px-6 text-center">
        <p className="text-gray-500 mb-4">{error || 'Transaction not found.'}</p>
        <button onClick={() => navigate(-1)} className="text-[#4F46E5] font-bold">Go Back</button>
      </div>
    )
  }

  const statusLabel = tx.status === 'success' ? 'Successful' : (tx.status || 'Successful')
  const description = tx.description || walletTransactionLabel(tx)
  const counterparty = tx.counterparty
  const counterpartyLabel = tx.type === 'credit' ? 'Sender' : 'Recipient'
  const categoryLabel = walletTransactionCategoryLabel(tx)
  const paymentMethod = walletTransactionPaymentMethod(tx)
  const actionBusy = downloading || sharing

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] pb-44 md:pb-8">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        <div className="px-5 md:px-8 pt-12 md:pt-8 pb-3 flex items-center gap-3 bg-[#FAFAFA] sticky top-0 z-20">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm w-10 h-10 flex items-center justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[17px] md:text-[20px] font-bold text-gray-900">Receipt</h1>
        </div>

        <div className="px-5 md:px-8 w-full flex flex-col items-center pt-2">
          <div ref={receiptRef} className="w-full flex justify-center">
            <ReceiptDownloadCard
              tx={tx}
              statusLabel={statusLabel}
              description={description}
              counterparty={counterparty}
              counterpartyLabel={counterpartyLabel}
              categoryLabel={categoryLabel}
              paymentMethod={paymentMethod}
            />
          </div>

          {error ? <p className="mt-4 text-sm text-red-600 text-center">{error}</p> : null}
          {shareHint ? <p className="mt-3 text-sm text-[#4F46E5] text-center font-medium">{shareHint}</p> : null}

          <div className="hidden md:flex w-full mt-8 flex-col items-center gap-3">
            <div className="w-full grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleShare}
                disabled={actionBusy}
                className="bg-white border border-gray-200 text-[#4F46E5] py-4 rounded-xl font-bold text-[15px] hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Share2 size={18} />
                {sharing ? 'Preparing image…' : 'Share Image'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={actionBusy}
                className="bg-[#4F46E5] text-white py-4 rounded-xl font-bold text-[15px] shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Download size={18} />
                {downloading ? 'Preparing…' : 'Download Receipt'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => navigate('/app/profile/help')}
              className="w-full border border-gray-200 bg-white text-red-500 py-4 rounded-xl font-bold text-[15px] hover:bg-red-50 transition-all flex items-center justify-center gap-2"
            >
              <Info size={18} />
              Need Help?
            </button>
            <button
              type="button"
              onClick={() => navigate('/app/wallet')}
              className="text-[14px] font-semibold text-gray-500 hover:text-gray-700 transition-colors py-2"
            >
              Back to Wallet
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-5 pt-4 pb-mobile-nav shadow-[0_-8px_30px_rgba(15,23,42,0.08)] md:hidden">
        <div className="w-full max-w-md mx-auto flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleShare}
              disabled={actionBusy}
              className="bg-white border-2 border-[#4F46E5] text-[#4F46E5] py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Share2 size={17} />
              {sharing ? 'Preparing…' : 'Share Image'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={actionBusy}
              className="bg-[#4F46E5] text-white py-3.5 rounded-xl font-bold text-[14px] shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Download size={17} />
              {downloading ? 'Preparing…' : 'Download'}
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate('/app/wallet')}
            className="text-[13px] font-semibold text-gray-500 py-1"
          >
            Back to Wallet
          </button>
        </div>
      </div>
    </div>
  )
}
