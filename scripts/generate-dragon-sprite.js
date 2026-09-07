import fs from 'node:fs'
import path from 'node:path'
import { Resvg } from '@resvg/resvg-js'

const WIDTH = 1024
const HEIGHT = 128
const FRAMES = 8
const FRAME_W = 128

function generateSVG() {
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    <defs>
      <linearGradient id="dragonBodyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ff4726" />
        <stop offset="50%" stop-color="#d9381e" />
        <stop offset="100%" stop-color="#991b1b" />
      </linearGradient>

      <linearGradient id="dragonBellyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#fcd34d" />
        <stop offset="100%" stop-color="#f59e0b" />
      </linearGradient>

      <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="60%" stop-color="#0284c7" />
        <stop offset="100%" stop-color="#0f172a" />
      </linearGradient>
    </defs>
`

  for (let i = 0; i < FRAMES; i++) {
    // 8 frames across 0 to 2*PI
    const phase = (i / FRAMES) * Math.PI * 2
    const wingStroke = Math.sin(phase)

    // Upstroke: wings lift high; Downstroke: wings flap down, sweeping back along flank
    const backAngle = -wingStroke * 12 - 4
    const frontAngle = -wingStroke * 10 - 2
    const wingScaleY = (0.92 + (wingStroke + 1) * 0.16).toFixed(3)
    const wingScaleX = (1.04 - (wingStroke + 1) * 0.04).toFixed(3)

    // Down-flap squash: slight squash when wings push down
    const downFlap = Math.max(0, -wingStroke)
    const bodySy = (1 - downFlap * 0.05).toFixed(3)
    const bodySx = (1 + downFlap * 0.03).toFixed(3)
    const bodyDip = (downFlap * 2).toFixed(2)

    // Tail flame slight flare on downflap
    const flameScale = (1 + downFlap * 0.25).toFixed(2)

    const frameX = i * FRAME_W

    svgContent += `
    <!-- Frame ${i} -->
    <g transform="translate(${frameX}, 0)">
      <svg width="128" height="128" viewBox="0 0 200 200">
        <!-- Background Wing -->
        <g transform="translate(120, 90) rotate(${backAngle.toFixed(2)}) scale(${wingScaleX}, ${wingScaleY}) translate(-120, -90)">
          <path
            d="M120,85 C145,45 175,40 185,55 C180,75 160,95 130,105 Z"
            fill="url(#wingGrad)"
            opacity="0.8"
          />
          <path
            d="M125,85 L180,55 M145,75 L170,80"
            stroke="#0ea5e9"
            stroke-width="2"
            stroke-linecap="round"
          />
        </g>

        <!-- Entire Body & Head Group with Center of Mass Squash -->
        <g transform="translate(110, 110) translate(0, ${bodyDip}) scale(${bodySx}, ${bodySy}) translate(-110, -110)">
          <!-- Tail -->
          <path
            d="M80,140 C50,155 35,145 25,160 C35,168 60,165 95,148 Z"
            fill="url(#dragonBodyGrad)"
          />

          <!-- Tail Flame -->
          <g transform="translate(20, 155) scale(${flameScale}) translate(-20, -155)">
            <polygon
              points="22,160 8,163 18,152 11,145 25,150"
              fill="#f59e0b"
            />
            <polygon
              points="20,158 12,160 17,153 14,148 22,151"
              fill="#fef08a"
            />
          </g>

          <!-- Main Body -->
          <ellipse cx="105" cy="120" rx="35" ry="28" fill="url(#dragonBodyGrad)" />

          <!-- Armored Golden Belly Scales -->
          <path
            d="M85,115 C90,135 115,140 125,128 C120,118 105,112 85,115 Z"
            fill="url(#dragonBellyGrad)"
          />
          <line x1="90" y1="122" x2="115" y2="122" stroke="#b45309" stroke-width="1.5" />
          <line x1="95" y1="128" x2="120" y2="128" stroke="#b45309" stroke-width="1.5" />

          <!-- Foreground Wing (attached to shoulder 110, 95) -->
          <g transform="translate(110, 95) rotate(${frontAngle.toFixed(2)}) scale(${wingScaleX}, ${wingScaleY}) translate(-110, -95)">
            <path
              d="M110,95 C135,35 180,30 190,50 C185,75 155,100 120,115 Z"
              fill="url(#wingGrad)"
            />
            <path
              d="M115,95 L185,50 M140,80 L175,70 M135,100 L160,95"
              stroke="#7dd3fc"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <polygon points="183,48 193,45 188,54" fill="#f59e0b" />
          </g>

          <!-- Neck & Head -->
          <path
            d="M115,105 C125,85 140,75 155,75 C165,75 175,82 170,95 C155,105 130,115 115,105 Z"
            fill="url(#dragonBodyGrad)"
          />

          <!-- Snout & Jaw -->
          <polygon points="160,78 185,84 165,96 150,92" fill="url(#dragonBodyGrad)" />
          <circle cx="182" cy="84" r="2" fill="#f59e0b" />

          <!-- Piercing Golden Eye -->
          <polygon points="154,80 162,82 157,86 152,83" fill="#0a0c16" />
          <circle cx="157" cy="83" r="2" fill="#fcd34d" />
          <circle cx="157" cy="83" r="1" fill="#0a0c16" />

          <!-- Dragon Horns -->
          <path
            d="M142,75 C145,55 135,45 130,40 C138,50 148,65 148,74 Z"
            fill="#f59e0b"
          />
          <path
            d="M148,75 C155,58 150,48 145,43 C152,53 156,66 154,75 Z"
            fill="#fbbf24"
          />

          <!-- Cute Dragon Arm & Claws -->
          <path
            d="M130,118 C140,122 145,126 142,130 C136,132 130,125 125,122 Z"
            fill="#d9381e"
          />
          <circle cx="143" cy="128" r="1.5" fill="#f59e0b" />
          <circle cx="141" cy="131" r="1.5" fill="#f59e0b" />
        </g>
      </svg>
    </g>`
  }

  svgContent += `\n</svg>`
  return svgContent
}

const svg = generateSVG()
const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: WIDTH,
  },
})
const pngData = resvg.render()
const pngBuffer = pngData.asPng()

const publicDir = path.resolve(process.cwd(), 'public', 'companion')
const srcDir = path.resolve(process.cwd(), 'src', 'components', 'companion')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true })
}

const publicPath = path.join(publicDir, 'dragon-sprite.png')
const srcPath = path.join(srcDir, 'dragon-sprite.png')

fs.writeFileSync(publicPath, pngBuffer)
fs.writeFileSync(srcPath, pngBuffer)
console.log(`Generated ${publicPath} and ${srcPath} (${pngBuffer.length} bytes)`)
