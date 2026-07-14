import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const assetsDir = join(root, 'android', 'app', 'src', 'main', 'assets')
const publicDir = join(assetsDir, 'public')

const personaLabels = {
  user: 'Fast Rapid',
  dispatch: 'Rapid Rider',
  merchant: 'Rapid Merchant',
}

function syncWebAssets() {
  if (!existsSync(distDir)) {
    throw new Error('dist/ not found. Run vite build first.')
  }

  rmSync(publicDir, { recursive: true, force: true })
  mkdirSync(publicDir, { recursive: true })
  cpSync(distDir, publicDir, { recursive: true })

  const persona = process.env.VITE_APP_PERSONA || 'user'
  const configPath = join(assetsDir, 'capacitor.config.json')
  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  config.appName = personaLabels[persona] || personaLabels.user
  writeFileSync(configPath, `${JSON.stringify(config, null, '\t')}\n`)

  console.log(`Synced web assets for persona: ${persona}`)
}

syncWebAssets()
