const fs = require('fs');
const files = [
  'src/apps/user/pages/Addresses.jsx',
  'src/apps/user/pages/EditProfile.jsx',
  'src/apps/user/pages/Help.jsx',
  'src/apps/user/pages/OrderDetail.jsx',
  'src/apps/user/pages/Orders.jsx',
  'src/apps/user/pages/Profile.jsx',
  'src/apps/user/pages/Promotions.jsx',
  'src/apps/user/pages/ReferEarn.jsx',
  'src/apps/user/pages/Search.jsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Regular expression to match from {/* Sidebar Navigation */} to right before {/* Content Area */}
  const newContent = content.replace(/[ \t]*\{\/\* Sidebar Navigation \*\/\}(.|\n)*?(?=[ \t]*\{\/\* Content Area \*\/\})/g, '');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
}
