import { create } from 'zustand'

export const useStore = create((set) => ({
  // --- User State ---
  user: {
    name: 'Babajide Johnson',
    phone: '+234 810 000 0000',
    email: 'jide.j@rapid.ng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=e2e8f0', // Using a placeholder avatar
    walletBalance: 32500,
  },
  
  // User Actions
  updateUser: (data) => set((state) => ({ user: { ...state.user, ...data } })),

  // --- Address State ---
  addresses: [
    { 
      id: 1, 
      type: 'Work', 
      name: 'The Hive Coworking', 
      details: '12B Adetokunbo Ademola St, Victoria Island, Lagos', 
      isDefault: true 
    },
    { 
      id: 2, 
      type: 'Home', 
      name: 'Lekki Residence', 
      details: 'Block A4, Apartment 302, Richmond Gate Estate, Lekki Phase 1', 
      isDefault: false 
    },
    { 
      id: 3, 
      type: 'Other', 
      name: 'Gym & Wellness', 
      details: 'iFitness Center, Palms Mall, Oniru Street, Lagos', 
      isDefault: false 
    },
  ],
  
  // Address Actions
  setDefaultAddress: (id) => set((state) => ({
    addresses: state.addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
  })),
  deleteAddress: (id) => set((state) => ({
    addresses: state.addresses.filter(addr => addr.id !== id)
  })),

  // --- Cart State ---
  cart: [
    {
      id: 1,
      name: "Party Jollof Rice & Chicken",
      price: 4500,
      qty: 1,
      img: "/burger.png" // placeholder
    },
    {
      id: 2,
      name: "Pounded Yam & Efo Riro",
      price: 5200,
      qty: 1,
      img: "/pizza.png" // placeholder
    },
    {
      id: 3,
      name: "Beef Meat Pie (2pcs)",
      price: 1800,
      qty: 1,
      img: "/burger.png" // placeholder
    }
  ],

  // Cart Actions
  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.id === item.id)
    if (existing) {
      return { cart: state.cart.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) }
    }
    return { cart: [...state.cart, { ...item, qty: 1 }] }
  }),
  removeFromCart: (id) => set((state) => ({ 
    cart: state.cart.filter((i) => i.id !== id) 
  })),
  updateQuantity: (id, qty) => set((state) => ({ 
    cart: state.cart.map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i) 
  })),
  clearCart: () => set({ cart: [] }),
}))
