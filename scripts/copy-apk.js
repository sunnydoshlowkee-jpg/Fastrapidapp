import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const releasesDir = join(root, 'releases')
const outputName = process.env.APK_OUTPUT_NAME
const flavor = process.env.APK_FLAVOR || process.env.ANDROID_FLAVOR || 'user'

const candidates = [
  {
    source: join(root, 'android', 'app', 'build', 'outputs', 'apk', flavor, 'release', `app-${flavor}-release.apk`),
    target: join(releasesDir, outputName || `FastRapid-${flavor}-release.apk`),
  },
  {
    source: join(root, 'android', 'app', 'build', 'outputs', 'apk', flavor, 'release', `app-${flavor}-release-unsigned.apk`),
    target: join(releasesDir, outputName || `FastRapid-${flavor}-release-unsigned.apk`),
  },
  {
    source: join(root, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'),
    target: join(releasesDir, outputName || 'FastRapid-release.apk'),
  },
  {
    source: join(root, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'),
    target: join(releasesDir, outputName || 'FastRapid-debug.apk'),
  },
]

const found = candidates.find((item) => existsSync(item.source))

if (!found) {
  console.error('APK not found. Build may have failed. Checked:')
  for (const item of candidates) {
    console.error(' -', item.source)
  }
  process.exit(1)
}

mkdirSync(releasesDir, { recursive: true })
copyFileSync(found.source, found.target)
console.log(`\nAPK ready for install:\n${found.target}\n`)
