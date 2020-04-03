const canvasSketch = require('canvas-sketch')
import { createMotionBlur } from '../utils/createMotionBlur'
import Ball from './Ball'

const settings = {
  animate: true,
  totalFrames: 200,
  dimensions: [2048, 2048]
}

const sketch = ({ context, width, height }) => {
  const c = context
  const ball = new Ball()

  const render = ({ playhead }) => {
    c.fillStyle = `hsla(200, 20%, 100%, 1)`
    c.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)
    ball.display(c, playhead)
    c.restore()
  }

  return createMotionBlur(render, {
    samplesPerFrame: 4,
    shutterAngle: 0.5
  })
}

canvasSketch(sketch, settings)
