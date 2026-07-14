/**
 * Dummy payload — desktop drawer [272:8940](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-8940),
 * mobile sheet [622:2](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-2).
 */
export const MERCHANT_INCOMING_ORDER = {
  id: '8821',
  orderNumber: 'Order #8821',
  eyebrow: 'New Incoming Order',
  statusLine: 'Order Placed • Just now',
  customer: {
    name: 'Adaeze',
    location: 'Yaba area, Lagos',
    phone: '+2348012345678',
  },
  lineItems: [
    {
      id: 'li-1',
      name: 'Bunker Classic',
      units: 'x2 units',
      price: '₦7,000',
      image: '/burger.png',
    },
    {
      id: 'li-2',
      name: 'Truffle Fries',
      units: 'x1 unit',
      price: '₦1,800',
      image: '/pizza.png',
    },
  ],
  subtotal: '₦8,800',
  deliveryFee: '₦1,200',
  commission: '-₦1,320',
  merchantPayout: '₦8,680',
}
