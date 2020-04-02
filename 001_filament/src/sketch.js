const canvasSketch = require('canvas-sketch')
import { createMotionBlur } from '../utils/createMotionBlur'
import Orb from './Orb'
import Vec from '../utils/Vec'
import { noise4D } from 'canvas-sketch-util/random'
import { map } from '../utils/helpers'

const settings = {
  dimensions: [1024, 1024],
  totalFrames: 150,
  animate: true
}

const sketch = ({ context, width, height }) => {
  const c = context
  const nPoints = 7
  const r = 700

  const render = ({ playhead }) => {
    c.fillStyle = `hsla(180, 0%, 7%, 1)`
    c.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)

    // ROOT
    c.beginPath()
    c.arc(0, 0, 0, Math.PI * 2, false)
    c.fillStyle = `hsla(200, 50%, 80%, 0.5)`
    c.fill()

    // POINTS
    for (let i = 0; i < nPoints; i++) {
      const p = i / nPoints
      const offset = noise4D(
        Math.cos(Math.PI * 2 * p + Math.PI * 2 * playhead),
        Math.sin(Math.PI * 2 * p + Math.PI * 2 * playhead),
        Math.cos(Math.PI * 2 * playhead),
        Math.sin(Math.PI * 2 * playhead),
        0.5,
        1
      )
      const mOffset = map(offset, -1, 1, 0, Math.PI * 2)

      const x = r * Math.cos(Math.PI * 2 * p)
      const y = r * Math.sin(Math.PI * 2 * p)
      const orb = new Orb(new Vec(x, y))
      orb.display(c, playhead, mOffset)
    }
    c.restore()
  }

  return createMotionBlur(render, {
    samplesPerFrame: 4,
    shutterAngle: 0.5
  })
}

canvasSketch(sketch, settings)
