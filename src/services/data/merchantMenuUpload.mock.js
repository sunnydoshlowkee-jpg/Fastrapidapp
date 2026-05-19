/** [Figma 272:6754](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=272-6754) */
export const MERCHANT_MENU_UPLOAD = {
  title: 'Menu Upload',
  intro: {
    heading: 'Add Your Menu Items',
    subheading:
      'Choose your preferred method to populate your inventory. We recommend CSV upload for large menus.',
  },
  manualEntry: {
    title: 'Manual Entry',
    description:
      'Perfect for quick updates or small menus. Add items one by one with full control over descriptions and images.',
    actionLabel: 'Start Entry',
  },
  csvUpload: {
    title: 'CSV Upload',
    description: 'Bulk import your entire menu in seconds using our spreadsheet template.',
    dropzoneHint: 'Drag & drop files here or',
    browseLabel: 'browse',
    uploadLabel: 'Upload',
    templateLabel: 'Download Template',
    templateUrl: '#',
    documentationUrl: '#',
  },
  help: {
    title: 'Need help?',
    bodyBefore: 'Ensure your CSV file follows our structure to avoid errors. You can find detailed formatting guides in our ',
    linkLabel: 'Merchant Documentation',
    bodyAfter:
      '. High-quality images (1:1 aspect ratio) are recommended for best customer engagement.',
  },
}
