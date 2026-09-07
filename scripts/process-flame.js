import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'

const srcPath = 'C:/Users/Ruhaan Kakar/.gemini/antigravity-ide/brain/701714db-50cd-47f1-9b93-de36a73e2cd4/.user_uploaded/media_1788789597818.png'
const rawData = fs.readFileSync(srcPath)
const srcPng = PNG.sync.read(rawData)

console.log('Original flame:', srcPng.width, 'x', srcPng.height)

// The flame is centered. The bottom ~50px has the "Licensable" bar.
// Let's crop to where the flame actually exists.
// Flame top: ~40px, bottom: ~480px, left: ~30px, right: ~317px.
const cropTop = 30
const cropBottom = 485
const cropLeft = 20
const cropRight = 327

const targetW = cropRight - cropLeft
const targetH = cropBottom - cropTop

const outPng = new PNG({ width: targetW, height: targetH })

for (let y = 0; y < targetH; y++) {
  for (let x = 0; x < targetW; x++) {
    const srcX = cropLeft + x
    const srcY = cropTop + y
    const srcIdx = (srcY * srcPng.width + srcX) * 4
    const outIdx = (y * targetW + x) * 4

    const r = srcPng.data[srcIdx]
    const g = srcPng.data[srcIdx + 1]
    const b = srcPng.data[srcIdx + 2]

    // Calculate luminance / max channel for fire alpha
    const maxC = Math.max(r, Math.max(g, b))
    const lum = 0.299 * r + 0.587 * g + 0.114 * b

    // Soft threshold for black background noise
    let alpha = 0
    if (maxC > 8) {
      // Smooth ramp from 8 to 255
      alpha = Math.min(255, Math.round(Math.pow((maxC - 8) / 247, 0.85) * 255))
    }

    if (alpha === 0) {
      outPng.data[outIdx] = 0
      outPng.data[outIdx + 1] = 0
      outPng.data[outIdx + 2] = 0
      outPng.data[outIdx + 3] = 0
    } else {
      // Keep rich fiery colors
      outPng.data[outIdx] = r
      outPng.data[outIdx + 1] = g
      outPng.data[outIdx + 2] = b
      outPng.data[outIdx + 3] = alpha
    }
  }
}

const outBuffer = PNG.sync.write(outPng)
const publicCursorDir = path.resolve(process.cwd(), 'public', 'cursor')
if (!fs.existsSync(publicCursorDir)) {
  fs.mkdirSync(publicCursorDir, { recursive: true })
}

const flamePath = path.join(publicCursorDir, 'flame.png')
fs.writeFileSync(flamePath, outBuffer)
console.log(`Saved transparent flame to ${flamePath} (${targetW}x${targetH}, ${outBuffer.length} bytes)`)
