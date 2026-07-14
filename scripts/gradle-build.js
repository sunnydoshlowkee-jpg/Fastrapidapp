import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { ensureAndroidSdk } from './ensure-android-sdk.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const androidDir = join(root, 'android')
const isWindows = process.platform === 'win32'
const flavor = process.env.ANDROID_FLAVOR

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

const task = process.env.ANDROID_BUILD_TASK
  || (flavor ? `assemble${capitalize(flavor)}Release` : 'assembleRelease')

const java21Candidates = [
  '/usr/lib/jvm/java-21-openjdk',
  '/usr/lib/jvm/java-21',
  process.env.JAVA_HOME,
].filter(Boolean)

function resolveJavaHome() {
  for (const candidate of java21Candidates) {
    if (existsSync(join(candidate, 'bin', 'java'))) {
      return candidate
    }
  }
  return process.env.JAVA_HOME
}

ensureAndroidSdk()

const javaHome = resolveJavaHome()
const env = javaHome ? { ...process.env, JAVA_HOME: javaHome } : process.env

try {
  if (isWindows) {
    execFileSync('cmd.exe', ['/c', 'gradlew.bat', task], {
      cwd: androidDir,
      stdio: 'inherit',
      env,
    })
  } else {
    execFileSync('./gradlew', [task], {
      cwd: androidDir,
      stdio: 'inherit',
      env,
    })
  }
} catch (error) {
  process.exit(error.status ?? 1)
}
