/** Desktop [272:7115](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-7115) · Mobile [622:1641](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-1641) */
export const MERCHANT_MENU_NEW_PATH = '/merchant/menu/new'

export function merchantMenuItemEditPath(productId) {
  return `/merchant/menu/${productId}/edit`
}

export const MERCHANT_MENU_ITEM_CREATE = {
  headerTitle: 'Menu Upload',
  pageTitle: 'Create Menu Item',
  subtitle:
    'Add a new dish to your digital menu catalogue. Focus on high-quality visuals.',
  fields: {
    media: {
      label: 'Media',
      title: 'Upload product photo',
      hint: '16:9 ratio recommended. High resolution JPG or PNG.',
    },
    productName: {
      label: 'Product Name',
      placeholder: 'e.g. Signature Smoky Jollof',
    },
    category: {
      label: 'Category',
      placeholder: 'Select category',
    },
    stockQuantity: {
      label: 'Stock Quantity',
      placeholder: '0',
    },
    price: {
      label: 'Price (₦)',
      placeholder: '0.00',
    },
    description: {
      label: 'Description',
      placeholder: 'Tell your customers about the ingredients and flavor profile...',
    },
    announce: {
      label: 'Announce',
      hint: 'Notify all Rapid users that this item is now available in your store.',
    },
  },
  categories: [],
  actions: {
    cancel: 'Cancel',
    submit: 'Create Menu Item',
  },
  proTip: {
    title: 'Pro Tip for Merchants',
    body:
      'Detailed descriptions with clear bullet points improve search discoverability by up to 40% on the Rapid marketplace.',
  },
  mobile: {
    subtitle: 'Add a new dish to your digital menu catalogue.',
    fields: {
      media: {
        hint: '16:9 ratio recommended.',
        showLabel: false,
      },
      price: {
        label: 'Price',
      },
      description: {
        placeholder: 'Describe the ingredients and flavor profile...',
      },
    },
    proTip: {
      title: 'Pro Tip for Merchants',
      body:
        'Detailed descriptions with key ingredients improve search discoverability on the platform.',
    },
  },
}
