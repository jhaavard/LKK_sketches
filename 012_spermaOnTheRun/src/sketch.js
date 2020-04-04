const canvasSketch = require("canvas-sketch")
import Circle from "./Circle"
import Fly from "./Fly"

const settings = {
  animate: true,
  totalFrames: 200,
  dimensions: [2048, 2048],
}

const sketch = ({ context, width, height }) => {
  const c = context
  const circle = new Circle()
  const fly1 = new Fly()
  // const fly2 = new Fly()
  // const fly3 = new Fly()

  return ({ playhead }) => {
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)
    circle.display(c, playhead)
    fly1.display(c, playhead)
    // fly2.display(c, playhead)
    // fly3.display(c, playhead)
    c.restore()
  }
}

canvasSketch(sketch, settings)
