export const formatCurrency = (amount, currency = 'NGN') =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount)

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))

export const truncate = (str, n = 40) =>
  str.length > n ? str.slice(0, n) + '…' : str

export const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
