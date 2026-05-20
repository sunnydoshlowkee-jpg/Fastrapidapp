/** Desktop [272:7238](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-7238) · Mobile [622:1513](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-1513) */
export const MERCHANT_MENU_IMPORT_SUCCESS_PATH = '/merchant/menu/import/success'

export const MERCHANT_MENU_IMPORT_SUCCESS = {
  pageTitle: 'Inventory',
  importedCount: 47,
  headline: (count) => `${count} products imported successfully`,
  description:
    'Your inventory has been updated and is now live. All stock levels and pricing structures have been synchronized across your storefront.',
  actions: {
    returnToInventory: 'Return to Inventory',
    viewImportLogs: 'View Import Logs',
  },
  stats: [
    {
      id: 'new-items',
      label: 'New Items',
      value: 32,
      badge: '+ Catalog Growth',
      badgeTone: 'primary',
      icon: 'plus',
    },
    {
      id: 'updates',
      label: 'Updates',
      value: 15,
      badge: 'Stock Synced',
      badgeTone: 'primary',
      icon: 'sync',
    },
    {
      id: 'errors',
      label: 'Errors',
      value: 0,
      badge: 'Clean Import',
      badgeTone: 'success',
      icon: 'check',
    },
  ],
  nextSteps: {
    title: 'Next Steps',
    items: [
      {
        id: 'batch-pricing',
        title: 'Set Batch Pricing',
        description: 'Apply discounts to new items.',
        icon: 'tag',
      },
      {
        id: 'print-barcodes',
        title: 'Print Barcodes',
        description: 'Generate tags for physical stock.',
        icon: 'barcode',
      },
    ],
  },
  warehouse: {
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
    headline: 'Your warehouse operations are perfectly in sync.',
    lastSync: 'Last sync: Just now',
  },
  mobile: {
    description:
      'Your inventory has been updated and is now live across all active sales channels.',
    stats: [
      {
        id: 'new-items',
        label: 'New',
        value: 32,
        subtext: 'Catalog Growth',
        icon: 'plus',
        iconTone: 'primary',
      },
      {
        id: 'updates',
        label: 'Updates',
        value: 15,
        subtext: 'Stock Synced',
        icon: 'sync',
        iconTone: 'primary',
      },
      {
        id: 'errors',
        label: 'Errors',
        value: 0,
        subtext: 'Clean Import',
        icon: 'check',
        iconTone: 'muted',
      },
    ],
    nextSteps: {
      title: 'Next Steps',
      items: [
        {
          id: 'batch-pricing',
          title: 'Set Batch Pricing',
          description: 'Apply discounts or margins',
          icon: 'tag',
        },
        {
          id: 'print-barcodes',
          title: 'Print Barcodes',
          description: 'Generate labels and tags',
          icon: 'qrcode',
        },
      ],
    },
    warehouse: {
      imageUrl:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop',
      caption: 'Your warehouse operations are perfectly in sync.',
    },
  },
}
