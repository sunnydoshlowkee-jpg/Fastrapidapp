import { existsSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const localPropertiesPath = join(root, 'android', 'local.properties')

function toGradlePath(path) {
  return path.replace(/\\/g, '\\\\')
}

function findAndroidSdk() {
  const candidates = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    '/opt/android-sdk',
    process.platform === 'win32'
      ? join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk')
      : join(homedir(), 'Library', 'Android', 'sdk'),
    join(homedir(), 'Android', 'Sdk'),
  ].filter(Boolean)

  return candidates.find((candidate) => existsSync(candidate)) || null
}

export function ensureAndroidSdk() {
  const sdkPath = findAndroidSdk()

  if (!sdkPath) {
    console.error(
      'Android SDK not found. Install Android Studio, then open SDK Manager and install the Android SDK.',
    )
    console.error('Expected location on Windows: %LOCALAPPDATA%\\Android\\Sdk')
    process.exit(1)
  }

  const content = `sdk.dir=${toGradlePath(sdkPath)}\n`
  writeFileSync(localPropertiesPath, content, 'utf8')

  process.env.ANDROID_HOME = sdkPath
  process.env.ANDROID_SDK_ROOT = sdkPath

  console.log(`Using Android SDK: ${sdkPath}`)
  return sdkPath
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  ensureAndroidSdk()
}
