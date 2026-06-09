const fs = require('fs');
const path = require('path');

const dir = 'src/apps/user/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find index of "{/* Bottom Nav"
  const startIdx = content.indexOf('{/* Bottom Nav');
  if (startIdx === -1) return;
  
  // Backtrack to the start of the line with spaces
  let lineStart = startIdx;
  while (lineStart > 0 && content[lineStart - 1] === ' ') {
    lineStart--;
  }

  // Find the ending structure:
  //     </div>
  //   )
  // }
  
  const endRegex = /    <\/div>\s*\)\s*}\s*$/;
  const match = content.match(endRegex);
  
  if (match) {
    const newContent = content.substring(0, lineStart) + match[0];
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not find end for ${file}`);
  }
});
