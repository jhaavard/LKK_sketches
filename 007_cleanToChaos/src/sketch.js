const canvasSketch = require('canvas-sketch')
import { createMotionBlur } from '../utils/createMotionBlur'
import Orb from './Orb'
import Vec from '../utils/Vec'

const settings = {
  animate: true,
  totalFrames: 200,
  dimensions: [2048, 2048]
}

const sketch = ({ context, width, height }) => {
  const c = context

  const orbs = []
  const numOrbs = 40
  const radius = 500
  for (let i = 0; i < numOrbs; i++) {
    const a = Math.PI * 2 * (i / numOrbs)
    const x = radius * Math.cos(a)
    const y = radius * Math.sin(a)
    orbs.push(new Orb(new Vec(x, y)))
  }

  const render = ({ playhead }) => {
    c.fillStyle = `hsla(100, 40%, 100%, 1.0)`
    c.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)

    for (let i = 0; i < orbs.length; i++) {
      let nextIndex = i === orbs.length - 1 ? 0 : i + 1
      orbs[i].connect(orbs[nextIndex], playhead, c)
      orbs[i].display(c, playhead)
      orbs[i].updateRadius(playhead, i)
    }

    c.restore()
  }

  return createMotionBlur(render, {
    samplesPerFrame: 4,
    shutterAngle: 0.5
  })
}

canvasSketch(sketch, settings)
