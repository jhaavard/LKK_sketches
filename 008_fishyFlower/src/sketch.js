const canvasSketch = require("canvas-sketch")
import Vec from "../utils/Vec"
import NoiseCircle from "./NoiseCircle"

const settings = {
  animate: true,
  totalFrames: 500,
  dimensions: [2048, 2048],
}

const sketch = ({ context, width, height }) => {
  const c = context

  const pos = new Vec(width / 2, height / 2)
  const radius = 500
  const circle = new NoiseCircle(pos, radius)

  return ({ playhead }) => {
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)

    circle.display(c, playhead)
  }
}

canvasSketch(sketch, settings)
