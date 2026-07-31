import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const personas = {
  user: {
    bundleId: 'com.fastrapid.user',
    displayName: 'Fast Rapid',
  },
  dispatch: {
    bundleId: 'com.fastrapid.rider',
    displayName: 'Rapid Rider',
  },
  merchant: {
    bundleId: 'com.fastrapid.merchant',
    displayName: 'Rapid Merchant',
  },
}

const persona = process.env.VITE_APP_PERSONA || process.argv[2] || 'user'
const config = personas[persona]

if (!config) {
  throw new Error(`Unknown persona "${persona}". Use user, dispatch, or merchant.`)
}

const pbxprojPath = join(root, 'ios', 'App', 'App.xcodeproj', 'project.pbxproj')
const infoPlistPath = join(root, 'ios', 'App', 'App', 'Info.plist')
const capConfigPath = join(root, 'ios', 'App', 'App', 'capacitor.config.json')

if (!existsSync(pbxprojPath) || !existsSync(infoPlistPath)) {
  throw new Error('iOS project not found. Run: npx cap add ios')
}

let pbxproj = readFileSync(pbxprojPath, 'utf8')
pbxproj = pbxproj.replace(
  /PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g,
  `PRODUCT_BUNDLE_IDENTIFIER = ${config.bundleId};`,
)
pbxproj = pbxproj.replace(/MARKETING_VERSION = [^;]+;/g, 'MARKETING_VERSION = 1.1;')
pbxproj = pbxproj.replace(/CURRENT_PROJECT_VERSION = [^;]+;/g, 'CURRENT_PROJECT_VERSION = 2;')
writeFileSync(pbxprojPath, pbxproj)

let infoPlist = readFileSync(infoPlistPath, 'utf8')
infoPlist = infoPlist.replace(
  /(<key>CFBundleDisplayName<\/key>\s*<string>)[^<]*(<\/string>)/,
  `$1${config.displayName}$2`,
)
writeFileSync(infoPlistPath, infoPlist)

if (existsSync(capConfigPath)) {
  const capConfig = JSON.parse(readFileSync(capConfigPath, 'utf8'))
  capConfig.appId = config.bundleId
  capConfig.appName = config.displayName
  writeFileSync(capConfigPath, `${JSON.stringify(capConfig, null, '\t')}\n`)
}

console.log(`Prepared iOS persona: ${persona}`)
console.log(`  Bundle ID: ${config.bundleId}`)
console.log(`  Display name: ${config.displayName}`)
