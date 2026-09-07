import fs from 'node:fs'
import path from 'node:path'
import { PNG } from 'pngjs'

const srcPath = path.resolve(process.cwd(), 'public', 'companion', 'test-dragon-clean.png')
const raw = fs.readFileSync(srcPath)
const srcPng = PNG.sync.read(raw)

const sw = srcPng.width
const sh = srcPng.height

// 1. Find bounding box of the dragon in srcPng
let minX = sw, maxX = 0, minY = sh, maxY = 0
for (let y = 0; y < sh; y++) {
  for (let x = 0; x < sw; x++) {
    const idx = (y * sw + x) * 4
    if (srcPng.data[idx + 3] > 20) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

console.log(`Dragon bounds: x=[${minX}, ${maxX}] (${maxX - minX + 1}px), y=[${minY}, ${maxY}] (${maxY - minY + 1}px)`)

const dw = maxX - minX + 1
const dh = maxY - minY + 1

// Crop tight dragon
const dragonCrop = new PNG({ width: dw, height: dh })
for (let y = 0; y < dh; y++) {
  for (let x = 0; x < dw; x++) {
    const sidx = ((minY + y) * sw + (minX + x)) * 4
    const didx = (y * dw + x) * 4
    dragonCrop.data[didx] = srcPng.data[sidx]
    dragonCrop.data[didx + 1] = srcPng.data[sidx + 1]
    dragonCrop.data[didx + 2] = srcPng.data[sidx + 2]
    dragonCrop.data[didx + 3] = srcPng.data[sidx + 3]
  }
}

// Clean up any remaining white artifact under the 3rd upper tooth
// In dragonCrop coordinates:
for (let y = Math.floor(dh * 0.55); y < Math.floor(dh * 0.68); y++) {
  for (let x = Math.floor(dw * 0.78); x < dw; x++) {
    const idx = (y * dw + x) * 4
    const r = dragonCrop.data[idx]
    const g = dragonCrop.data[idx + 1]
    const b = dragonCrop.data[idx + 2]
    // If white/gray artifact under upper teeth
    if (r > 180 && g > 180 && b > 180) {
      dragonCrop.data[idx + 3] = 0
    }
  }
}

// Frame parameters
const FRAME_SIZE = 128
const FRAMES = 8
const TOTAL_W = FRAME_SIZE * FRAMES

const outPng = new PNG({ width: TOTAL_W, height: FRAME_SIZE })

// We want the dragon to be around 108px wide x 104px high to leave comfortable margin inside 128x128
const baseScale = Math.min(108 / dw, 104 / dh)
const targetDw = dw * baseScale
const targetDh = dh * baseScale

// Center of the dragon in frame coordinates
const frameCx = FRAME_SIZE / 2
const frameCy = FRAME_SIZE / 2 + 2

// Shoulder pivot relative to crop bounds (roughly top wing base: x ~ 35%, y ~ 32%)
const shoulderNormX = 0.36
const shoulderNormY = 0.32

for (let f = 0; f < FRAMES; f++) {
  const phase = (f / FRAMES) * Math.PI * 2
  const wingStroke = Math.sin(phase)

  // Down-flap squash: when wingStroke < 0 (downstroke)
  const downFlap = Math.max(0, -wingStroke)
  const squashX = 1 + downFlap * 0.05
  const squashY = 1 - downFlap * 0.06
  const bobY = Math.sin(phase) * 3 // slight lift on upstroke, dip on downstroke

  // Wing flap angle
  const flapAngle = -wingStroke * 0.16 // radians (~9.2 degrees)

  const frameOffset = f * FRAME_SIZE

  // Sample target frame pixels (inverse mapping for smooth bilinear interpolation)
  for (let fy = 0; fy < FRAME_SIZE; fy++) {
    for (let fx = 0; fx < FRAME_SIZE; fx++) {
      // Current pixel relative to frame center
      const relX = (fx - frameCx) / squashX
      const relY = (fy - frameCy - bobY) / squashY

      // Convert to normalized crop space [-0.5 to 0.5]
      const normX = relX / targetDw + 0.5
      const normY = relY / targetDh + 0.5

      let srcNormX = normX
      let srcNormY = normY

      // Wing area: normY < 0.42 && normX < 0.65
      // Apply smooth rotational flap deformation to the wing region
      if (normX >= 0 && normX <= 0.7 && normY >= 0 && normY <= 0.45) {
        // Distance from wing tip to shoulder
        const wingWeight = Math.min(1, Math.hypot(normX - shoulderNormX, normY - shoulderNormY) / 0.35)
        const angle = -flapAngle * wingWeight

        // Rotate backwards around shoulder
        const dx = normX - shoulderNormX
        const dy = normY - shoulderNormY
        const cosA = Math.cos(angle)
        const sinA = Math.sin(angle)

        srcNormX = shoulderNormX + (dx * cosA - dy * sinA)
        srcNormY = shoulderNormY + (dx * sinA + dy * cosA)
      }

      // Convert back to crop pixel space
      const srcPx = srcNormX * dw
      const srcPy = srcNormY * dh

      // Bilinear interpolation if within bounds
      if (srcPx >= 0 && srcPx < dw - 1 && srcPy >= 0 && srcPy < dh - 1) {
        const x0 = Math.floor(srcPx)
        const y0 = Math.floor(srcPy)
        const x1 = x0 + 1
        const y1 = y0 + 1
        const wx = srcPx - x0
        const wy = srcPy - y0

        const idx00 = (y0 * dw + x0) * 4
        const idx10 = (y0 * dw + x1) * 4
        const idx01 = (y1 * dw + x0) * 4
        const idx11 = (y1 * dw + x1) * 4

        const a00 = dragonCrop.data[idx00 + 3]
        const a10 = dragonCrop.data[idx10 + 3]
        const a01 = dragonCrop.data[idx01 + 3]
        const a11 = dragonCrop.data[idx11 + 3]

        const alpha = (1 - wx) * (1 - wy) * a00 + wx * (1 - wy) * a10 + (1 - wx) * wy * a01 + wx * wy * a11

        if (alpha > 5) {
          const r = Math.round((1 - wx) * (1 - wy) * dragonCrop.data[idx00] + wx * (1 - wy) * dragonCrop.data[idx10] + (1 - wx) * wy * dragonCrop.data[idx01] + wx * wy * dragonCrop.data[idx11])
          const g = Math.round((1 - wx) * (1 - wy) * dragonCrop.data[idx00 + 1] + wx * (1 - wy) * dragonCrop.data[idx10 + 1] + (1 - wx) * wy * dragonCrop.data[idx01 + 1] + wx * wy * dragonCrop.data[idx11 + 1])
          const b = Math.round((1 - wx) * (1 - wy) * dragonCrop.data[idx00 + 2] + wx * (1 - wy) * dragonCrop.data[idx10 + 2] + (1 - wx) * wy * dragonCrop.data[idx01 + 2] + wx * wy * dragonCrop.data[idx11 + 2])

          const outIdx = (fy * TOTAL_W + (frameOffset + fx)) * 4
          outPng.data[outIdx] = r
          outPng.data[outIdx + 1] = g
          outPng.data[outIdx + 2] = b
          outPng.data[outIdx + 3] = Math.min(255, Math.round(alpha))
        }
      }
    }
  }

  // Add a subtle glowing fire breath ember particle inside the roaring throat!
  // Throat center is roughly fx = frameCx + 18, fy = frameCy + 8 + bobY
  const throatX = Math.round(frameCx + 16 * squashX)
  const throatY = Math.round(frameCy + 10 * squashY + bobY)
  const emberPulse = 0.6 + 0.4 * Math.sin(phase * 2)

  for (let dy = -6; dy <= 6; dy++) {
    for (let dx = -6; dx <= 6; dx++) {
      const dist = Math.hypot(dx, dy)
      if (dist < 6) {
        const glow = Math.pow(1 - dist / 6, 1.5) * emberPulse * 0.75
        const px = throatX + dx
        const py = throatY + dy
        if (px >= 0 && px < FRAME_SIZE && py >= 0 && py < FRAME_SIZE) {
          const oidx = (py * TOTAL_W + (frameOffset + px)) * 4
          if (outPng.data[oidx + 3] > 100) {
            // Screen blend glowing ember over dark mouth
            outPng.data[oidx] = Math.min(255, Math.round(outPng.data[oidx] + 255 * glow))
            outPng.data[oidx + 1] = Math.min(255, Math.round(outPng.data[oidx + 1] + 160 * glow))
            outPng.data[oidx + 2] = Math.min(255, Math.round(outPng.data[oidx + 2] + 20 * glow))
          }
        }
      }
    }
  }
}

const finalBuffer = PNG.sync.write(outPng)
const pubPath = path.resolve(process.cwd(), 'public', 'companion', 'dragon-sprite.png')
const srcDirPath = path.resolve(process.cwd(), 'src', 'components', 'companion', 'dragon-sprite.png')

fs.writeFileSync(pubPath, finalBuffer)
fs.writeFileSync(srcDirPath, finalBuffer)
console.log(`Generated authentic Drag'n'Boom sprite sheet to ${pubPath} and ${srcDirPath} (${finalBuffer.length} bytes)`)
