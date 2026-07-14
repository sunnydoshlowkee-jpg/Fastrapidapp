/**
 * Support tickets [330:698](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=330-698) · Detail [400:3](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=400-3)
 * Mobile support tickets list [297:21100](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=297-21100)
 */
export const ADMIN_SUPPORT_PATH = '/admin/support'

export const ADMIN_SUPPORT_TICKETS = {
  searchPlaceholder: 'Search tickets, users, orders...',
  listTitle: 'Active Tickets',
  mobileTitle: 'Support Center',
  newTicketLabel: 'New ticket',
  tabs: [
    { id: 'all', label: 'All Tickets', mobileLabel: 'All' },
    { id: 'open', label: 'Open' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'resolved', label: 'Resolved' },
  ],
  defaultSelectedId: 'TK-8492',
  assignLabel: 'Assign to me',
  resolveLabel: 'Resolve',
  internalNoteLabel: 'Internal Note',
  messagePlaceholder: 'Type a message to Ayo...',
  tickets: [
    {
      id: 'TK-8492',
      status: 'open',
      statusLabel: 'Open',
      statusBadge: { label: 'OPEN', tone: 'red' },
      categoryLabel: 'PAYMENT ISSUE',
      priority: 'high',
      priorityLabel: 'High',
      priorityLabelLong: 'High Priority',
      title: 'Driver app crashing on delivery confirmation',
      listTitle: 'Driver app crashing on delivery confirmation',
      description:
        'The application consistently crashes when I try to upload the proof of delivery photo. I’ve tried…',
      requesterName: 'Sarah Jenkins',
      requesterInitials: 'SJ',
      requesterAvatarTone: 'bg-rose-100 text-rose-700',
      requesterAvatarUrl: null,
      assignee: { name: 'Ayo O.', initials: 'AO', avatarTone: 'bg-violet-100 text-violet-700' },
      time: '10 mins ago',
      detail: {
        meta: 'Via In-App Chat • Created Today, 09:42 AM',
        timestampLabel: 'Today, 09:42 AM',
        customer: {
          name: 'Oluwaseun A.',
          email: 'oluwaseun.a@example.com',
          phone: '+234 812 345 6789',
          initials: 'OA',
          avatarTone: 'bg-violet-100 text-violet-700',
          totalOrders: '42',
          joinedLabel: 'Joined Mar 2023',
          online: true,
          userBadge: 'USER',
        },
        messages: [
          {
            id: 'm1',
            type: 'user',
            body: "Hi team, I tried processing a payment for my recent transaction but it keeps saying 'Gateway Timeout'. I've tried twice and don't want to be charged double. Can you look into this?",
            time: '10:00 AM',
          },
          {
            id: 'm2',
            type: 'internal',
            body: "Checked Stripe logs. The user's bank rejected the transaction due to a temporary hold. No charges went through. We should advise them to contact their bank.",
            time: '10:15 AM',
            author: 'System Admin',
          },
          {
            id: 'm3',
            type: 'admin',
            body: "Hello Oluwaseun, I've checked our payment logs. Your bank placed a temporary hold on the transaction, so no charges were processed on our end. Please reach out to your bank to clear the hold, and try again. Let us know if you need further help!",
            time: '10:30 AM',
            author: 'AD',
          },
        ],
        draftMessage: '',
        composer: {
          internalReplyLabel: 'Internal Reply',
          placeholder: 'Type your message...',
        },
      },
    },
    {
      id: 'TK-8491',
      status: 'open',
      statusLabel: 'Open',
      priority: 'normal',
      priorityLabel: 'Normal',
      priorityLabelLong: 'Normal',
      title: 'Update billing address for next cycle',
      listTitle: 'Update billing address for next cycle',
      description:
        'Please update my company’s billing address on file to the new corporate headquarters before the…',
      requesterName: 'Michael Chang',
      requesterInitials: 'MC',
      requesterAvatarTone: 'bg-gray-100 text-gray-500',
      requesterAvatarUrl: null,
      assignee: { name: 'Chidi A.', initials: 'CA', avatarTone: 'bg-orange-100 text-rapid-orange' },
      time: '1 hour ago',
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
      id: 'TK-8488',
      status: 'in_progress',
      statusLabel: 'In Progress',
      priority: 'normal',
      priorityLabel: 'Normal',
      priorityLabelLong: 'Normal',
      title: 'Question about bulk shipment pricing tier',
      listTitle: 'Question about bulk shipment pricing tier',
      description:
        'We are looking to increase our volume next month and would like to understand if we qualify for the…',
      requesterName: 'David Rodriguez',
      requesterInitials: 'DR',
      requesterAvatarTone: 'bg-amber-100 text-amber-700',
      requesterAvatarUrl: null,
      assignee: null,
      time: '3 hours ago',
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
      id: 'TK-8485',
      status: 'open',
      statusLabel: 'Open',
      priority: 'high',
      priorityLabel: 'High',
      priorityLabelLong: 'High Priority',
      title: 'Missing cargo manifest for flight LAX-JFK',
      listTitle: 'Missing cargo manifest for flight LAX-JFK',
      description:
        'Urgent: We cannot locate the manifest for the afternoon flight. This is blocking offloading…',
      requesterName: 'Elena Rostova',
      requesterInitials: 'ER',
      requesterAvatarTone: 'bg-gray-100 text-gray-500',
      requesterAvatarUrl: null,
      assignee: { name: 'Sarah J.', initials: 'SJ', avatarTone: 'bg-emerald-100 text-emerald-700' },
      time: 'Yesterday',
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
