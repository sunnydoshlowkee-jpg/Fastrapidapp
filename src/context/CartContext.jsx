import { createContext, useContext, useState, useEffect, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const local = localStorage.getItem('rapid_cart')
      return local ? JSON.parse(local) : []
    } catch (e) {
      return []
    }
  })

  const deliveryFee = 1500
  const serviceChargePercent = 0.05 // 5%

  useEffect(() => {
    localStorage.setItem('rapid_cart', JSON.stringify(items))
  }, [items])

  const add = (item, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...item, qty }]
    })
  }

  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) { remove(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => setItems([])

  const subtotal = useMemo(() => {
    return items.reduce((sum, i) => {
      const priceStr = String(i.price).replace(/[^0-9.]/g, '')
      const numericPrice = parseFloat(priceStr) || 0
      return sum + numericPrice * i.qty
    }, 0)
  }, [items])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  
  const serviceCharge = useMemo(() => subtotal * serviceChargePercent, [subtotal])
  const total = useMemo(() => items.length > 0 ? subtotal + deliveryFee + serviceCharge : 0, [subtotal, items.length])

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, count, subtotal, serviceCharge, deliveryFee, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
