const canvasSketch = require("canvas-sketch")
import Vec from "../utils/Vec"
import Ring from "./Ring"

const settings = {
  animate: true,
  totalFrames: 300,
  dimensions: [2048, 2048],
}

const sketch = ({ context, width, height }) => {
  const c = context
  const ring = new Ring(new Vec(0, 0))

  return ({ playhead }) => {
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)
    c.save()
    c.translate(width / 2, height / 2)
    ring.display(c, playhead)
    c.restore()
  }
}

canvasSketch(sketch, settings)
