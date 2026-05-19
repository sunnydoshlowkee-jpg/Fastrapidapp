/**
 * Desktop [272:5936](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-5936),
 * mobile [622:681](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-681).
 */
export const MERCHANT_ORDER_DETAIL = {
  id: 'KA-8921',
  displayId: 'Order #KA-8921',
  statusBadge: 'NEW ORDER',
  respondWithinSeconds: 165,
  urgencyPercent: 60,
  customer: {
    name: 'Tunde Adebayo',
    memberSince: 'Verified Member since 2022',
    rating: '4.9',
    address: '14 Babs Animashaun St, Yaba, Lagos',
    instructions:
      'Please leave at the gate with the security personnel. Call me once delivered.',
  },
  itemsHeader: {
    countLabel: '3 Items to Prepare',
    totalValue: '₦18,450.00',
  },
  lineItems: [
    {
      id: 'li-1',
      name: 'Party Jollof Rice (Large)',
      description: 'Extra Spicy, Add Moin-Moin',
      quantityLabel: '1 x ₦6,500',
      sku: 'FOOD-JR-01',
      image: '/burger.png',
    },
    {
      id: 'li-2',
      name: 'Grilled Peppered Snail',
      description: 'Standard Pack (4 pcs)',
      quantityLabel: '2 x ₦4,500',
      sku: 'FOOD-PS-04',
      image: '/pizza.png',
    },
    {
      id: 'li-3',
      name: 'Organic Zobo (500ml)',
      description: 'Chilled, Less Sugar',
      quantityLabel: '2 x ₦1,475',
      sku: 'DRK-ZB-05',
      image: '/grocery-hero.png',
    },
  ],
  pricing: {
    subtotal: '₦15,450.00',
    deliveryFee: '₦2,500.00',
    serviceCharge: '₦500.00',
    grandTotal: '₦18,450.00',
  },
  acceptDisclaimer:
    'Accepting this order confirms you have the items in stock and ready for immediate preparation.',
  mobile: {
    totalValue: '₦18,450',
    lineItems: [
      {
        id: 'li-1',
        name: 'Party Jollof Rice (Large)',
        quantity: 'x1',
        price: '₦4,500',
        image: '/burger.png',
      },
      {
        id: 'li-2',
        name: 'Grilled Peppered Snail',
        quantity: 'x2',
        price: '₦4,500',
        image: '/pizza.png',
      },
      {
        id: 'li-3',
        name: 'Organic Zobo 500ml',
        quantity: 'x2',
        price: '₦1,475',
        image: '/grocery-hero.png',
      },
    ],
    pricing: {
      subtotal: '₦15,450',
      deliveryFee: '₦2,500',
      serviceCharge: '₦500',
      grandTotal: '₦18,450',
    },
  },
}

/**
 * Desktop preparing [272:6129](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-6129),
 * mobile preparing [622:810](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-810).
 */
export const MERCHANT_ORDER_DETAIL_PREPARING = {
  id: 'KA-8921',
  displayId: 'Order #KA-8921',
  statusBadge: 'NEW ORDER',
  phase: 'preparing',
  progress: {
    currentStep: 'preparing',
    steps: [
      { id: 'accepted', label: 'Accepted' },
      { id: 'preparing', label: 'Preparing' },
      { id: 'ready', label: 'Ready' },
      { id: 'dispatched', label: 'Dispatched' },
      { id: 'delivered', label: 'Delivered' },
    ],
  },
  preparing: {
    title: 'Preparing Order',
    targetCompletion: '12 mins remaining',
  },
  lineItems: [
    {
      id: 'pi-1',
      name: '2x Party Jollof Rice',
      note: 'Extra plantain, No coleslaw',
      price: '₦24.00',
    },
    {
      id: 'pi-2',
      name: '1x Grilled Peppered Snail',
      note: 'Spicy',
      price: '₦18.50',
    },
    {
      id: 'pi-3',
      name: '3x Organic Zobo',
      note: 'Chilled',
      price: '₦12.00',
    },
  ],
  pricing: {
    subtotal: '₦54.50',
    taxAndFees: '₦4.25',
    total: '₦58.75',
  },
  customer: {
    initials: 'TA',
    name: 'Tunde Adebayo',
    subtext: 'First-time customer',
    phone: '+2348012345678',
  },
  delivery: {
    address: '14B Admiralty Way, Lekki Phase 1, Lagos',
    instructions: 'Leave at the reception. Call when downstairs.',
  },
  mobile: {
    statusBadge: 'PREPARING',
    progressSteps: [
      { id: 'accepted', label: 'Accepted' },
      { id: 'preparing', label: 'Preparing' },
      { id: 'ready', label: 'Ready' },
      { id: 'dispatched', label: 'Dispatched' },
    ],
    customerNote: 'Extra spicy please',
    lineItems: [
      { id: 'pi-1', quantity: '2x', name: 'Party Jollof Rice', price: '₦24,000' },
      { id: 'pi-2', quantity: '1x', name: 'Grilled Peppered Snail', price: '₦4,500' },
      { id: 'pi-3', quantity: '3x', name: 'Organic Zobo', price: '₦2,212.50' },
    ],
    pricing: {
      subtotal: '₦30,712.50',
      taxAndFees: '₦1,200.00',
      total: '₦31,912.50',
    },
    customer: {
      initials: 'TA',
      name: 'Tunde Adebayo',
      badge: 'First-time customer',
      phone: '+2348012345678',
    },
    delivery: {
      address: '14 Admiralty Way, Lekki Phase 1, Lagos',
    },
  },
}

export function getOrderDetailPhase(searchParams) {
  return searchParams.get('status') === 'preparing' ? 'preparing' : 'new'
}

export function getMerchantOrderDetail(orderId, phase = 'new') {
  if (phase === 'preparing') {
    if (!orderId || orderId === MERCHANT_ORDER_DETAIL_PREPARING.id) {
      return MERCHANT_ORDER_DETAIL_PREPARING
    }
    return {
      ...MERCHANT_ORDER_DETAIL_PREPARING,
      id: orderId,
      displayId: `Order #${orderId}`,
    }
  }

  if (!orderId || orderId === MERCHANT_ORDER_DETAIL.id) {
    return MERCHANT_ORDER_DETAIL
  }

  return {
    ...MERCHANT_ORDER_DETAIL,
    id: orderId,
    displayId: `Order #${orderId}`,
  }
}

export function orderDetailPreparingPath(orderId) {
  return `/merchant/orders/${orderId}?status=preparing`
}
