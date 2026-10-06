import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const FLAVORS = {
  user: { letter: 'U', color: '#4F46E5' },
  dispatch: { letter: 'D', color: '#059669' },
  merchant: { letter: 'M', color: '#F59E0B' },
}

const DENSITIES = [
  { dir: 'mipmap-mdpi', scale: 1.0, legacy: 48 },
  { dir: 'mipmap-hdpi', scale: 1.5, legacy: 72 },
  { dir: 'mipmap-xhdpi', scale: 2.0, legacy: 96 },
  { dir: 'mipmap-xxhdpi', scale: 3.0, legacy: 144 },
  { dir: 'mipmap-xxxhdpi', scale: 4.0, legacy: 192 },
]

const FONT = 'DejaVu Sans, Cantarell, sans-serif'
const CANVAS = 1024
const ORIGINAL = join(root, 'android', 'app', 'src', 'main', 'res', 'mipmap-xxxhdpi')

function badgeSvg(f) {
  const cx = 730
  const cy = 730
  const r = 150
  const fs = 190
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${f.color}" stroke="#ffffff" stroke-width="14"/>
    <text x="${cx}" y="${cy + fs * 0.35}" text-anchor="middle" font-family="${FONT}" font-weight="bold" font-size="${fs}" fill="#ffffff">${f.letter}</text>
  </svg>`
}

async function composite(f) {
  const bg = await sharp(join(ORIGINAL, 'ic_launcher_background.png')).resize(CANVAS, CANVAS).toBuffer()
  const fg = await sharp(join(ORIGINAL, 'ic_launcher_foreground.png')).resize(CANVAS, CANVAS).toBuffer()
  const badge = await sharp(Buffer.from(badgeSvg(f))).png().toBuffer()
  const out = await sharp(bg)
    .composite([{ input: fg }, { input: badge }])
    .png()
    .toBuffer()
  return out
}

async function main() {
  for (const [flavor, f] of Object.entries(FLAVORS)) {
    const full = await composite(f)
    const roundSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}"><defs><clipPath id="c"><circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${CANVAS / 2}"/></clipPath></defs><g clip-path="url(#c)"><image width="${CANVAS}" height="${CANVAS}" href="data:image/png;base64,${full.toString('base64')}"/></g></svg>`

    for (const d of DENSITIES) {
      const dir = join(root, 'android', 'app', 'src', flavor, 'res', d.dir)
      mkdirSync(dir, { recursive: true })
      const fgSize = Math.round(108 * d.scale)

      const solidBg = await sharp({ create: { width: fgSize, height: fgSize, channels: 4, background: '#000000' } }).png().toBuffer()

      await sharp(full).resize(fgSize, fgSize).png().toFile(join(dir, 'ic_launcher_foreground.png'))
      writeFileSync(join(dir, 'ic_launcher_background.png'), solidBg)
      await sharp(full).resize(d.legacy, d.legacy).png().toFile(join(dir, 'ic_launcher.png'))
      const round = await sharp(Buffer.from(roundSvg)).resize(d.legacy, d.legacy).png().toBuffer()
      writeFileSync(join(dir, 'ic_launcher_round.png'), round)
    }

    const colors = join(root, 'android', 'app', 'src', flavor, 'res', 'values')
    mkdirSync(colors, { recursive: true })
    writeFileSync(join(colors, 'ic_launcher_background.xml'),
      `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#000000</color>\n</resources>\n`)
    console.log('Generated icons for', flavor)
  }
  console.log('Done.')
}

main().catch((e) => { console.error(e); process.exit(1) })
