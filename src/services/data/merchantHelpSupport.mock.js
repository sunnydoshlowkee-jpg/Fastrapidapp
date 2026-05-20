/** Desktop [272:11280](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-11280) · Mobile [622:2285](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-2285) */
export const MERCHANT_HELP_SUPPORT_PATH = '/merchant/support'

export const MERCHANT_HELP_SUPPORT = {
  pageTitle: 'Help & Support',
  user: {
    businessName: "John's Bistro",
    role: 'Merchant Admin',
  },
  hero: {
    title: 'How can we help you today?',
    subtitle:
      'Find answers to common questions or reach out to our dedicated merchant support team.',
    searchPlaceholder: 'Search for help...',
  },
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        id: 'payout',
        question: 'How do I request a payout?',
        answer:
          'Payouts are processed automatically every Tuesday for all completed orders from the previous week. You can also trigger an instant payout manually from your Wallet tab, provided your balance is above ₦50.',
        open: true,
      },
      {
        id: 'menu',
        question: 'How to update menu?',
        answer:
          'Go to Inventory in the sidebar, then add items manually or upload a CSV. Changes sync to customer apps within a few minutes.',
        open: false,
      },
      {
        id: 'radius',
        question: 'Can I change my delivery radius?',
        answer:
          'Yes. Open Business Profile under Settings to update your service area and delivery preferences.',
        open: false,
      },
      {
        id: 'pos',
        question: 'Integration with POS systems',
        answer:
          'Contact our support team to connect supported POS partners. We will guide you through API keys and menu sync setup.',
        open: false,
      },
    ],
  },
  quickLinks: [
    {
      id: 'docs',
      title: 'Documentation',
      description: 'Detailed guides for everything.',
      icon: 'book',
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Speak with a human now.',
      icon: 'message',
    },
  ],
  ticket: {
    title: 'Submit a Ticket',
    intro: "Can't find what you're looking for? Our team usually responds within 2 hours.",
    categories: ['Technical Issue', 'Billing', 'Orders', 'Account'],
    defaultCategory: 'Technical Issue',
    fields: {
      category: 'Category',
      subject: 'Subject',
      description: 'Description',
    },
    subjectPlaceholder: 'Briefly describe the issue',
    descriptionPlaceholder: 'Provide as much detail as possible...',
    submitLabel: 'Submit Ticket',
    agentsOnlineLabel: 'Agents currently online',
    extraAgentsCount: 4,
    agents: [
      { id: '1', initials: 'AO', color: '#4342FF' },
      { id: '2', initials: 'KM', color: '#E67E22' },
      { id: '3', initials: 'LT', color: '#10B981' },
    ],
  },
  mobile: {
    merchantId: '88291',
    hero: {
      title: 'How can we help you today?',
      subtitle:
        'Find answers to common questions or reach out to our dedicated merchant support team.',
      searchPlaceholder: 'Search knowledge base...',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          id: 'payout',
          question: 'How do I request a payout?',
          answer:
            'Payouts are processed automatically every week for completed orders. You can also request a manual payout from your Dashboard Wallet. Instant withdrawals include a 1.5% processing fee.',
          open: true,
        },
        {
          id: 'menu',
          question: 'How to update menu?',
          answer:
            'Go to Inventory, then add items manually or upload a CSV. Changes sync to customer apps within a few minutes.',
          open: false,
        },
        {
          id: 'radius',
          question: 'Can I change my delivery radius?',
          answer:
            'Yes. Open Business Profile under Settings to update your service area and delivery preferences.',
          open: false,
        },
      ],
    },
    quickLinks: [
      {
        id: 'docs',
        title: 'Documentation',
        description: 'Read our comprehensive guides and API references.',
        icon: 'book',
      },
      {
        id: 'chat',
        title: 'Live Chat',
        description: 'Connect with a support agent instantly.',
        icon: 'message',
        agentsOnlineLabel: '4 Agents currently online',
        agents: [
          { id: '1', initials: 'AO', color: '#4342FF' },
          { id: '2', initials: 'KM', color: '#E67E22' },
        ],
      },
    ],
    ticket: {
      title: 'Submit a Ticket',
      categories: ['Technical Issue', 'Billing', 'Orders', 'Account'],
      defaultCategory: 'Technical Issue',
      fields: {
        category: 'Category',
        subject: 'Subject',
        description: 'Description',
      },
      subjectPlaceholder: 'Brief summary of your issue',
      descriptionPlaceholder: 'Provide details about the problem...',
      submitLabel: 'Submit Ticket',
    },
  },
}
