const canvasSketch = require("canvas-sketch")
import { noise4D } from "canvas-sketch-util/random"
import Vec from "../utils/Vec"
import { map, dist } from "../utils/helpers"

const settings = {
  animate: true,
  totalFrames: 500,
  dimensions: [1024, 1024],
}

const field = (x, y, t) => {
  const amount = 0.3
  const scale = 0.005
  const nFreq = 1
  const nAmp = 500

  const xoff1 = scale * x
  const yoff1 = scale * y
  const zoff1 = Math.cos(Math.PI * 2 * t)
  const woff1 = Math.sin(Math.PI * 2 * t)
  const noiseX = noise4D(xoff1, yoff1, zoff1, woff1, nFreq, nAmp)

  const xoff2 = 1000 + scale * x
  const yoff2 = scale * y
  const zoff2 = Math.cos(Math.PI * 2 * t)
  const woff2 = Math.sin(Math.PI * 2 * t)
  const noiseY = noise4D(xoff2, yoff2, zoff2, woff2, nFreq, nAmp)

  const parameter1 = Math.round(noiseX) / 100.0
  const parameter2 = Math.round(noiseY) / 100.0

  return new Vec(amount * parameter1, amount * parameter2)
}

const sketch = ({ context, width, height }) => {
  const c = context
  return ({ playhead }) => {
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)

    const step = 10
    const margin = 400
    for (let i = margin + 10; i <= width - margin + 10; i += step) {
      for (let j = margin + 10; j <= height - margin + 10; j += step) {
        const point = new Vec(i, j)
        const d = dist(point.x, point.y, width / 2, height / 2)
        if (d < 300) {
          const nPoints = 50
          for (let k = 0; k < nPoints; k++) {
            const p = k / nPoints
            const res = field(point.x, point.y, playhead)
            res.mult(2)
            point.x += res.x
            point.y += res.y

            const size = map(p, 0, 1, 1, 1)
            const a = map(p, 0, 1, 0.001, 1)
            const h = map(p, 0, 1, 0, 0)
            const s = map(p, 0, 1, 0, 0)
            const l = map(p, 0, 1, 0, 100)

            c.beginPath()
            c.arc(point.x, point.y, size, 0, Math.PI * 2, false)
            c.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
            c.fill()
          }
        }
      }
    }
  }
}

canvasSketch(sketch, settings)
