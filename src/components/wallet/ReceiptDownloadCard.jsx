import { RECEIPT_LOGO_DATA_URL } from '../../assets/receiptLogoData'
import { CheckCircle2, ArrowUp, User } from 'lucide-react'

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)
}

function formatTime(isoString) {
  return new Intl.DateTimeFormat('en-NG', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(isoString))
}

function formatDate(isoString) {
  return new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(isoString))
}

function DetailRow({ label, value }) {
  if (!value) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
      <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>{value}</span>
    </div>
  )
}

export default function ReceiptDownloadCard({
  tx,
  statusLabel,
  description,
  counterparty,
  counterpartyLabel,
  categoryLabel,
  paymentMethod,
}) {
  const reference = tx.reference || `TXN-${tx.id}`
  const isCredit = tx.type === 'credit'
  const typeLabel = isCredit ? 'Credit' : 'Debit'

  return (
    <div
      style={{
        width: '390px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Inter, SF Pro Text, sans-serif',
        background: '#FFFFFF',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
        borderTop: '6px solid #5B52E8',
      }}
    >
      {/* Header section */}
      <div style={{ padding: '32px 24px 24px', textAlign: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#5B52E8',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img 
            src={RECEIPT_LOGO_DATA_URL} 
            alt="Rapid Logo" 
            style={{ width: '32px', height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
          />
        </div>
        
        {/* Amount */}
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          color: '#111827', 
          margin: '0 0 12px 0',
          letterSpacing: '-0.5px'
        }}>
          {isCredit ? '+ ' : '- '}{formatCurrency(tx.amount)}
        </h1>

        {/* Status Badge */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px',
          background: '#DEF7EC', 
          padding: '6px 12px', 
          borderRadius: '20px',
          color: '#03543F',
          fontSize: '12px',
          fontWeight: 600
        }}>
          <CheckCircle2 size={14} color="#03543F" />
          {statusLabel || 'Successful'}
        </div>
      </div>

      {/* Scallop Divider with Dashed Line */}
      <div style={{ position: 'relative', height: '24px', width: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          left: '-12px',
          width: '24px',
          height: '24px',
          backgroundColor: '#F4F4FF', // matches app background
          borderRadius: '50%',
          zIndex: 2
        }} />
        <div style={{
          flex: 1,
          borderBottom: '1.5px dashed #E5E7EB',
          margin: '0 12px',
        }} />
        <div style={{
          position: 'absolute',
          right: '-12px',
          width: '24px',
          height: '24px',
          backgroundColor: '#F4F4FF', // matches app background
          borderRadius: '50%',
          zIndex: 2
        }} />
      </div>

      {/* Details Section */}
      <div style={{ padding: '24px' }}>
        <DetailRow label="Date & Time" value={`${formatDate(tx.created_at)} • ${formatTime(tx.created_at)}`} />
        <DetailRow label="Reference No" value={reference} />
        <DetailRow label="Type" value={categoryLabel || typeLabel} />
        <DetailRow label="Fee" value="₦0.00" />
        {description && <DetailRow label="Description" value={description} />}
        {paymentMethod && <DetailRow label="Payment" value={paymentMethod} />}

        {/* Sender/Receiver Card */}
        <div style={{
          marginTop: '24px',
          background: '#F9FAFB',
          border: '1px solid #F3F4F6',
          borderRadius: '12px',
          padding: '16px',
          position: 'relative'
        }}>
          
          {/* Vertical Connecting Line */}
          <div style={{
            position: 'absolute',
            left: '32px',
            top: '46px',
            bottom: '46px',
            width: '2px',
            backgroundColor: '#E5E7EB',
            zIndex: 1
          }} />

          {/* Sender */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#E0E7FF',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <ArrowUp size={16} color="#5B52E8" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>From</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', color: '#111827', fontWeight: 600 }}>
                {isCredit ? (counterparty || 'Wallet Funding') : 'My Wallet'}
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Wallet</p>
            </div>
          </div>

          <div style={{ height: '24px' }} />

          {/* Receiver */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#F3F4F6',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <User size={16} color="#6B7280" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>To</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', color: '#111827', fontWeight: 600 }}>
                {isCredit ? 'My Wallet' : (counterparty || 'Wallet Withdrawal')}
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Wallet</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
