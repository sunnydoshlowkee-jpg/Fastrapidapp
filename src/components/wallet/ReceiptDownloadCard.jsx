import { RECEIPT_LOGO_DATA_URL } from '../../assets/receiptLogoData'

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
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoString))
}

function ReceiptScallopEdge() {
  const width = 390
  const step = 20
  const radius = 10
  const count = Math.ceil(width / step)

  return (
    <svg
      width={width}
      height="14"
      viewBox={`0 0 ${width} 14`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '14px' }}
    >
      <rect width={width} height="7" fill="#5B52E8" />
      {Array.from({ length: count }).map((_, index) => (
        <circle
          key={index}
          cx={step / 2 + index * step}
          cy="7"
          r={radius}
          fill="#FFFFFF"
        />
      ))}
    </svg>
  )
}

function DetailRow({ label, value, isLast = false }) {
  if (!value) return null

  return (
    <tr>
      <td
        style={{
          padding: '13px 18px',
          fontSize: '12px',
          color: '#64748B',
          fontWeight: 500,
          verticalAlign: 'top',
          width: '40%',
          borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: '13px 18px',
          fontSize: '13px',
          color: '#0F172A',
          fontWeight: 600,
          textAlign: 'right',
          verticalAlign: 'top',
          wordBreak: 'break-word',
          lineHeight: 1.45,
          borderBottom: isLast ? 'none' : '1px solid #F1F5F9',
        }}
      >
        {value}
      </td>
    </tr>
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
  const reference = tx.reference || `RD-TX-${tx.id}`
  const isCredit = tx.type === 'credit'
  const typeLabel = isCredit ? 'Credit' : 'Debit'

  const rows = [
    { label: 'Reference', value: reference },
    { label: 'Date', value: formatDate(tx.created_at) },
    { label: 'Time', value: formatTime(tx.created_at) },
    { label: 'Type', value: categoryLabel },
    { label: 'Description', value: description },
    { label: counterpartyLabel, value: counterparty },
    { label: 'Payment', value: paymentMethod },
    { label: 'Debit / Credit', value: typeLabel },
    { label: 'Status', value: statusLabel },
  ].filter((row) => row.value)

  return (
    <div
      style={{
        width: '390px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Helvetica, Arial, sans-serif',
        background: '#FFFFFF',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
      }}
    >
      <div
        style={{
          background: '#5B52E8',
          padding: '28px 22px 0',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '10px 16px',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
            marginBottom: '20px',
          }}
        >
          <div
            data-receipt-logo
            role="img"
            aria-label="FastRapid"
            style={{
              height: '34px',
              width: '168px',
              margin: '0 auto',
              backgroundImage: `url(${RECEIPT_LOGO_DATA_URL})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
        </div>
      </div>

      <ReceiptScallopEdge />

      <div
        style={{
          background: '#FFFFFF',
          padding: '28px 22px 22px',
          textAlign: 'center',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <p
          style={{
            margin: '0 0 10px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '1.4px',
            textTransform: 'uppercase',
            color: '#94A3B8',
          }}
        >
          Amount
        </p>
        <p
          style={{
            margin: 0,
            color: '#334155',
            fontSize: '34px',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {formatCurrency(tx.amount)}
        </p>
      </div>

      <div style={{ padding: '16px' }}>
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 18px',
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#64748B',
              }}
            >
              Transaction Details
            </p>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#FFFFFF' }}>
            <tbody>
              {rows.map((row, index) => (
                <DetailRow
                  key={row.label}
                  label={row.label}
                  value={row.value}
                  isLast={index === rows.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
