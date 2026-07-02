import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ensureAndroidSdk } from './ensure-android-sdk.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const androidDir = join(root, 'android')
const isWindows = process.platform === 'win32'

ensureAndroidSdk()

try {
  if (isWindows) {
    execFileSync('cmd.exe', ['/c', 'gradlew.bat', 'assembleDebug'], {
      cwd: androidDir,
      stdio: 'inherit',
    })
  } else {
    execFileSync('./gradlew', ['assembleDebug'], {
      cwd: androidDir,
      stdio: 'inherit',
    })
  }
} catch (error) {
  process.exit(error.status ?? 1)
}
