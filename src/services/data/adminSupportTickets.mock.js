/** Support tickets [330:698](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-698) · Detail [400:3](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=400-3) */
export const ADMIN_SUPPORT_PATH = '/admin/support'

export const ADMIN_SUPPORT_TICKETS = {
  searchPlaceholder: 'Search tickets, users, orders...',
  listTitle: 'Active Tickets',
  tabs: [
    { id: 'all', label: 'All Tickets' },
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
  ],
  defaultSelectedId: 'TK-1024',
  assignLabel: 'Assign to me',
  resolveLabel: 'Resolve',
  internalNoteLabel: 'Internal Note',
  messagePlaceholder: 'Type a message to Ayo...',
  tickets: [
    {
      id: 'TK-1024',
      status: 'open',
      statusLabel: 'Open',
      priority: 'high',
      priorityLabel: 'High Priority',
      title: 'Missing item from Order #ORD-8821',
      listTitle: 'Missing item from Order #ORD-8821',
      description:
        'Customer reporting that their delivery was missing the extra side of plantains they ordered and paid for.',
      assignee: { name: 'Ayo O.', initials: 'AO', avatarTone: 'bg-violet-100 text-violet-700' },
      time: '10m ago',
      detail: {
        meta: 'Via In-App Chat • Created Today, 10:42 AM',
        customer: {
          name: 'Ayo Oluwaseun',
          email: 'ayo.oluwaseun@email.com',
          phone: '+234 812 345 6789',
          initials: 'AO',
          avatarTone: 'bg-violet-100 text-violet-700',
          totalOrders: '42',
        },
        messages: [
          {
            id: 'm1',
            type: 'user',
            body: 'Hello, I just received my order #ORD-8821 but the extra side of plantain is missing. I paid for it!',
            time: '10:42 AM',
            link: { label: 'View Order #ORD-8821', href: '/admin/orders/ORD-8821' },
          },
          {
            id: 'm2',
            type: 'admin',
            body: 'Hi Ayo, I am so sorry to hear that. Let me check with the merchant right away.',
            time: '10:45 AM',
            author: 'You (Admin)',
          },
          {
            id: 'm3',
            type: 'internal',
            body: 'Called the merchant (Tantalizers). They confirmed the plantain was left out due to a packaging error. They are offering to refund the side or send a rider with just the plantain.',
            time: '10:47 AM',
            author: 'Internal Note (You)',
          },
          {
            id: 'm4',
            type: 'admin',
            body: 'Update: We spoke with the restaurant. They are preparing the missing plantain now and a rider will be dispatched to you within 15 minutes.',
            time: '10:50 AM',
            author: 'You (Admin)',
          },
        ],
        draftMessage: '',
      },
    },
    {
      id: 'TK-1023',
      status: 'open',
      statusLabel: 'Open',
      priority: 'normal',
      priorityLabel: 'Normal',
      title: 'App crashing on checkout',
      listTitle: 'App crashing on checkout',
      description:
        'Every time I try to add my card details, the app closes automatically on my iPhone 12.',
      assignee: { name: 'Chidi A.', initials: 'CA', avatarTone: 'bg-orange-100 text-rapid-orange' },
      time: '1h ago',
      detail: {
        meta: 'Via Email • Created Today, 9:30 AM',
        customer: {
          name: 'Chidi Adebayo',
          email: 'chidi.a@email.com',
          phone: '+234 803 221 4455',
          initials: 'CA',
          avatarTone: 'bg-orange-100 text-rapid-orange',
          totalOrders: '18',
        },
        messages: [
          {
            id: 'm1',
            type: 'user',
            body: 'The app keeps closing when I enter my card on checkout. iPhone 12, latest iOS.',
            time: '9:30 AM',
          },
        ],
        draftMessage: '',
      },
    },
    {
      id: 'TK-1021',
      status: 'in_progress',
      statusLabel: 'In Progress',
      priority: 'urgent',
      priorityLabel: 'Urgent',
      title: 'Rider never arrived, marked delivered',
      listTitle: 'Rider never arrived, marked delivered',
      description:
        'My food says delivered 20 minutes ago but nobody called me and there is nothing at my door.',
      assignee: null,
      time: '2h ago',
      detail: {
        meta: 'Via In-App Chat • Created Today, 8:15 AM',
        customer: {
          name: 'Kabiru Musa',
          email: 'kabiru.m@email.com',
          phone: '+234 701 998 2210',
          initials: 'KM',
          avatarTone: 'bg-gray-200 text-gray-700',
          totalOrders: '7',
        },
        messages: [
          {
            id: 'm1',
            type: 'user',
            body: 'Order shows delivered but nothing arrived. Please help urgently.',
            time: '8:15 AM',
            link: { label: 'View Order #ORD-8810', href: '/admin/orders/ORD-8810' },
          },
        ],
        draftMessage: '',
      },
    },
    {
      id: 'TK-1018',
      status: 'resolved',
      statusLabel: 'Resolved',
      priority: 'normal',
      priorityLabel: 'Normal',
      title: 'Refund not received after 5 days',
      listTitle: 'Refund not received after 5 days',
      description: 'Customer confirmed bank account details and is awaiting settlement.',
      assignee: { name: 'Sarah J.', initials: 'SJ', avatarTone: 'bg-emerald-100 text-emerald-700' },
      time: '1d ago',
      detail: {
        meta: 'Via Email • Created 5 days ago',
        customer: {
          name: 'Sarah Jenkins',
          email: 'sarah.j@email.com',
          phone: '+234 802 555 1234',
          initials: 'SJ',
          avatarTone: 'bg-emerald-100 text-emerald-700',
          totalOrders: '31',
        },
        messages: [],
        draftMessage: '',
      },
    },
  ],
}

export function getSupportTicketById(ticketId) {
  return ADMIN_SUPPORT_TICKETS.tickets.find((t) => t.id === ticketId) ?? ADMIN_SUPPORT_TICKETS.tickets[0]
}
