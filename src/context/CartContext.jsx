import { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react'
import { resolveStorageUrl } from '../utils/mediaUrl'
import { fetchUserCart, saveUserCart, getConsumerAuthToken } from '../services/cartService'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'rapid_cart'
const DEFAULT_DELIVERY_FEE = 800

function normalizeCartItem(item) {
  if (!item) return item
  return {
    ...item,
    img: resolveStorageUrl(item.img) || item.img,
    delivery_fee: Number(item.delivery_fee) || DEFAULT_DELIVERY_FEE,
  }
}

function readLocalCart() {
  try {
    const local = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = local ? JSON.parse(local) : []
    return Array.isArray(parsed) ? parsed.map(normalizeCartItem) : []
  } catch {
    return []
  }
}

function itemsSignature(list) {
  return JSON.stringify(
    (list || []).map((item) => ({
      id: item.id,
      qty: item.qty,
      price: item.price,
      name: item.name,
      delivery_fee: item.delivery_fee,
    })),
  )
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readLocalCart)
  const [hydrated, setHydrated] = useState(false)
  const skipNextSync = useRef(false)

  useEffect(() => {
    let active = true

    const hydrateCart = async () => {
      const token = getConsumerAuthToken()

      if (!token) {
        if (active) {
          setHydrated(true)
        }
        return
      }

      try {
        const serverItems = (await fetchUserCart()).map(normalizeCartItem)
        const localItems = readLocalCart()

        if (!active) return

        if (serverItems.length > 0) {
          skipNextSync.current = true
          setItems(serverItems)
        } else if (localItems.length > 0) {
          skipNextSync.current = true
          setItems(localItems)
          const validated = (await saveUserCart(localItems)).map(normalizeCartItem)
          if (active) {
            skipNextSync.current = true
            setItems(validated)
          }
        }
      } catch (err) {
        console.error('Failed to sync cart from server', err)
      } finally {
        if (active) {
          setHydrated(true)
        }
      }
    }

    hydrateCart()
    window.addEventListener('rapid-auth-changed', hydrateCart)

    return () => {
      active = false
      window.removeEventListener('rapid-auth-changed', hydrateCart)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!hydrated) return undefined

    const token = getConsumerAuthToken()
    if (!token) return undefined

    if (skipNextSync.current) {
      skipNextSync.current = false
      return undefined
    }

    const timer = setTimeout(() => {
      saveUserCart(items)
        .then((validatedRaw) => {
          const validated = validatedRaw.map(normalizeCartItem)
          if (itemsSignature(validated) !== itemsSignature(items)) {
            skipNextSync.current = true
            setItems(validated)
          }
        })
        .catch((err) => {
          console.error('Failed to save cart to server', err)
        })
    }, 400)

    return () => clearTimeout(timer)
  }, [items, hydrated])

  const add = (item, qty = 1) => {
    const nextItem = normalizeCartItem(item)
    setItems((prev) => {
      const existing = prev.find((i) => i.id === nextItem.id)
      if (existing) {
        return prev.map((i) => (i.id === nextItem.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...nextItem, qty }]
    })
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) {
      remove(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clear = () => setItems([])

  const subtotal = useMemo(() => {
    return items.reduce((sum, i) => {
      const priceStr = String(i.price).replace(/[^0-9.]/g, '')
      const numericPrice = parseFloat(priceStr) || 0
      return sum + numericPrice * i.qty
    }, 0)
  }, [items])

  const deliveryFee = useMemo(() => {
    if (items.length === 0) return 0
    return Math.max(...items.map((i) => Number(i.delivery_fee) || DEFAULT_DELIVERY_FEE))
  }, [items])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const serviceChargePercent = 0.05
  const serviceCharge = useMemo(() => subtotal * serviceChargePercent, [subtotal])
  const total = useMemo(
    () => (items.length > 0 ? subtotal + deliveryFee + serviceCharge : 0),
    [subtotal, items.length, serviceCharge, deliveryFee],
  )

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        updateQty,
        clear,
        count,
        subtotal,
        serviceCharge,
        deliveryFee,
        total,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
