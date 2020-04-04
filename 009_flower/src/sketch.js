const canvasSketch = require("canvas-sketch")
import Circle from "./Circle"

const settings = {
  animate: true,
  totalFrames: 200,
  dimensions: [2048, 2048],
}

const sketch = ({ context, width, height }) => {
  const c = context
  const circles = []

  for (let i = 0; i < 1; i++) {
    circles.push(new Circle())
  }

  return ({ playhead }) => {
    c.fillStyle = "white"
    c.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)
    for (let i = 0; i < circles.length; i++) {
      circles[i].display(c, playhead)
    }
    c.restore()
  }
}

canvasSketch(sketch, settings)
