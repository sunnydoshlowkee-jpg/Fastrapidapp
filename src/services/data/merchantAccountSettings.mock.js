/** Desktop [272:10938](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-10938) · Mobile [622:2621](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-2621) */
export const MERCHANT_SETTINGS_ACCOUNT_PATH = '/merchant/settings/account'

export const MERCHANT_ACCOUNT_SETTINGS = {
  pageTitle: 'Settings',
  profile: {
    title: 'Account Settings',
    description: 'Manage your personal information and contact preferences for the portal.',
    fields: {
      fullName: { label: 'Full Name', value: 'Babajide Alade' },
      email: { label: 'Email Address', value: 'b.alade@kaabo-rapid.com' },
      phone: { label: 'Phone Number', value: '+234 802 345 6789' },
    },
    saveLabel: 'Save Changes',
  },
  team: {
    title: 'Team Members',
    description: 'Add and manage roles for your staff members to control portal access.',
    inviteLabel: 'Invite Member',
    columns: ['Name', 'Role', 'Status'],
    members: [
      {
        id: '1',
        name: 'Babajide Alade',
        email: 'b.alade@kaabo.com',
        initials: 'BA',
        avatarColor: '#4342FF',
        role: 'Owner',
        status: 'active',
      },
      {
        id: '2',
        name: 'Chidi Okoro',
        email: 'chidi.o@kaabo.com',
        initials: 'CO',
        avatarColor: '#E67E22',
        role: 'Manager',
        status: 'active',
      },
      {
        id: '3',
        name: 'Funke Ebi',
        email: 'funke@kaabo.com',
        initials: 'FE',
        avatarColor: '#E85D75',
        role: 'Staff',
        status: 'pending',
      },
    ],
  },
  dangerZone: {
    title: 'Danger Zone',
    description: 'Irreversible actions concerning your account and data.',
    deactivateTitle: 'Deactivate Account',
    deactivateDescription:
      'Permanently delete your merchant profile and all associated store data.',
    deactivateLabel: 'Deactivate Account',
  },
  mobile: {
    merchantId: '88291',
    profile: {
      title: 'Account Profile',
      description: 'Manage your personal information and contact details.',
      fields: {
        fullName: { label: 'Full Name', value: 'Babajide Alade' },
        email: { label: 'Email Address', value: 'b.alade@kaabo-rapid.com' },
        phone: { label: 'Phone Number', value: '+234 801 234 5678' },
      },
      saveLabel: 'Save Changes',
    },
    team: {
      title: 'Team Access',
      description: 'Manage who has access to your merchant portal.',
      inviteLabel: 'Invite Member',
      members: [
        {
          id: '1',
          name: 'Babajide Alade',
          email: 'b.alade@kaabo.com',
          initials: 'BA',
          avatarColor: '#4342FF',
          role: 'Owner',
          status: 'active',
        },
        {
          id: '2',
          name: 'Chidi Okoro',
          email: 'chidi.o@kaabo.com',
          initials: 'CO',
          avatarColor: '#E67E22',
          role: 'Manager',
          status: 'active',
        },
        {
          id: '3',
          name: 'Funke Ebi',
          email: 'funke@kaabo.com',
          initials: 'FE',
          avatarColor: '#E85D75',
          role: 'Staff',
          status: 'pending',
        },
      ],
    },
    dangerZone: {
      title: 'Danger Zone',
      description: 'Permanent actions related to your merchant account.',
      deactivateTitle: 'Deactivate Account',
      deactivateDescription:
        'Once you delete your account, there is no going back. Please be certain.',
      deactivateLabel: 'Deactivate Account',
    },
  },
}
