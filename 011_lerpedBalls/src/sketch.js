const canvasSketch = require("canvas-sketch")
import Line from "./Line"
import Vec from "../utils/Vec"
import { range } from "canvas-sketch-util/random"
import { createMotionBlur } from "../utils/createMotionBlur"
const settings = {
  animate: true,
  totalFrames: 200,
  dimensions: [2048, 2048]
}

const sketch = ({ context, width, height }) => {
  const c = context
  const nLines = 15
  const lines = []
  for (let i = 0; i < nLines; i++) {
    const p = i / nLines
    const v = new Vec(width / 2, 255 + i * 110)
    const p1Radius = Math.sin(Math.PI * p) * 70
    const p2Radius = Math.sin(Math.PI * p) * 70
    const p1Period = 1
    const p2Period = 1.8
    const ballSize = range(15, 40)
    const lineLength = 1500 //Math.sin(Math.PI * p) * 1500
    const linePercent = p
    const lineIndex = i
    lines.push(
      new Line({
        pos: v,
        p1Radius,
        p2Radius,
        p1Period,
        p2Period,
        ballSize,
        linePercent,
        lineLength,
        lineIndex
      })
    )
  }

  const render = ({ playhead }) => {
    context.fillStyle = "white"
    context.fillRect(0, 0, width, height)

    for (let i = 0; i < lines.length; i++) {
      const p = i / lines.length
      lines[i].display(c, playhead + p / 2)
    }
  }

  return createMotionBlur(render)
}

canvasSketch(sketch, settings)
