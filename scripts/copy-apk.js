import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const source = join(root, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk')
const releasesDir = join(root, 'releases')
const target = join(releasesDir, 'FastRapid-debug.apk')

if (!existsSync(source)) {
  console.error('APK not found. Build may have failed:', source)
  process.exit(1)
}

mkdirSync(releasesDir, { recursive: true })
copyFileSync(source, target)
console.log(`\nAPK ready for install:\n${target}\n`)
