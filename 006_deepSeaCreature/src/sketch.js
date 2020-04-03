const canvasSketch = require("canvas-sketch")
import Circle from "./Circle"

const settings = {
  animate: true,
  totalFrames: 500,
  dimensions: [2048, 2048],
}

const sketch = ({ context, width, height }) => {
  const c = context
  const circle = new Circle()
  const circle2 = new Circle()

  return ({ playhead }) => {
    c.fillStyle = "white"
    c.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)
    c.rotate(Math.PI * 2 * playhead)
    circle.display(c, playhead)
    c.restore()
  }
}

canvasSketch(sketch, settings)
