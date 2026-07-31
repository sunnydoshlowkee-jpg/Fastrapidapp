import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')

const personaLabels = {
  user: 'Fast Rapid',
  dispatch: 'Rapid Rider',
  merchant: 'Rapid Merchant',
}

const personaIds = {
  user: 'com.fastrapid.user',
  dispatch: 'com.fastrapid.rider',
  merchant: 'com.fastrapid.merchant',
}

/**
 * Source of truth for plugins / server / platform flags.
 * Keep in sync with capacitor.config.ts (especially CapacitorHttp.enabled).
 */
const SOURCE_CAPACITOR_CONFIG = {
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    contentInset: 'automatic',
  },
  plugins: {
    // CapHttp OFF — breaks axios FormData multipart (avatar uploads hang).
    CapacitorHttp: {
      enabled: false,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
}

function buildSyncedConfig({ persona, setAppId }) {
  return {
    appId: setAppId
      ? (personaIds[persona] || personaIds.user)
      : 'com.fastrapid.app',
    appName: personaLabels[persona] || personaLabels.user,
    ...SOURCE_CAPACITOR_CONFIG,
  }
}

function syncPlatform(publicDir, configPath, { setAppId = false } = {}) {
  if (!existsSync(distDir)) {
    throw new Error('dist/ not found. Run vite build first.')
  }

  rmSync(publicDir, { recursive: true, force: true })
  mkdirSync(publicDir, { recursive: true })
  cpSync(distDir, publicDir, { recursive: true })

  if (!existsSync(dirname(configPath))) {
    mkdirSync(dirname(configPath), { recursive: true })
  }

  const persona = process.env.VITE_APP_PERSONA || 'user'
  const config = buildSyncedConfig({ persona, setAppId })
  // Preserve existing appId on Android multi-flavor builds unless setAppId is requested.
  if (!setAppId && existsSync(configPath)) {
    try {
      const previous = JSON.parse(readFileSync(configPath, 'utf8'))
      if (previous.appId) config.appId = previous.appId
    } catch {
      // ignore corrupt previous config
    }
  }
  writeFileSync(configPath, `${JSON.stringify(config, null, '\t')}\n`)
}

function syncWebAssets() {
  const persona = process.env.VITE_APP_PERSONA || 'user'
  const targets = []

  const androidPublic = join(root, 'android', 'app', 'src', 'main', 'assets', 'public')
  const androidConfig = join(root, 'android', 'app', 'src', 'main', 'assets', 'capacitor.config.json')
  if (existsSync(dirname(androidPublic)) || existsSync(join(root, 'android'))) {
    syncPlatform(androidPublic, androidConfig)
    targets.push('android')
  }

  const iosPublic = join(root, 'ios', 'App', 'App', 'public')
  const iosConfig = join(root, 'ios', 'App', 'App', 'capacitor.config.json')
  if (existsSync(join(root, 'ios', 'App', 'App'))) {
    syncPlatform(iosPublic, iosConfig, { setAppId: true })
    targets.push('ios')
  }

  if (!targets.length) {
    throw new Error('No native platforms found (android/ or ios/).')
  }

  console.log(`Synced web assets for persona: ${persona} → ${targets.join(', ')}`)
  console.log('CapacitorHttp.enabled =', SOURCE_CAPACITOR_CONFIG.plugins.CapacitorHttp.enabled)
}

syncWebAssets()
