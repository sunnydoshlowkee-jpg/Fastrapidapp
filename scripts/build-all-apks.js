import { execSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const personas = [
  { persona: 'user', flavor: 'user', apk: 'FastRapid-User-release.apk' },
  { persona: 'dispatch', flavor: 'dispatch', apk: 'FastRapid-Dispatch-release.apk' },
  { persona: 'merchant', flavor: 'merchant', apk: 'FastRapid-Merchant-release.apk' },
]

for (const { persona, flavor, apk } of personas) {
  console.log(`\n=== Building ${persona} APK (${flavor}) ===\n`)

  execSync('npm run build', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, VITE_APP_PERSONA: persona },
  })

  execSync('node scripts/manual-cap-sync.js', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, VITE_APP_PERSONA: persona },
  })

  execSync('node scripts/gradle-build.js', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ANDROID_FLAVOR: flavor },
  })

  execSync('node scripts/copy-apk.js', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, APK_OUTPUT_NAME: apk, APK_FLAVOR: flavor },
  })
}

// DocumentRoot is dist/ — persona APK builds must not leave the site pinned to one app.
console.log('\n=== Restoring full web production build (no persona pin) ===\n')
const env = { ...process.env }
delete env.VITE_APP_PERSONA
execSync('npm run build', {
  cwd: root,
  stdio: 'inherit',
  env,
})

console.log('\nAll persona APKs are ready in releases/')
console.log('Web dist/ restored for app.fastrapid.com (admin / merchant / user / dispatch).\n')
