const canvasSketch = require("canvas-sketch")
import { noise4D } from "canvas-sketch-util/random"
import { map } from "../utils/helpers"
import Orb from "./Orb"
import Vec from "../utils/Vec"

const settings = {
  animate: true,
  totalFrames: 500,
  dimensions: [1024, 1024],
}

const sketch = ({ context, width, height }) => {
  const c = context

  return ({ playhead }) => {
    c.fillStyle = "white"
    c.fillRect(0, 0, width, height)

    c.save()
    c.translate(width / 2, height / 2)

    const nOrbs = 50
    for (let i = 0; i < nOrbs; i++) {
      const p = i / nOrbs

      const xoff = Math.cos(Math.PI * 2 * p)
      const yoff = Math.sin(Math.PI * 2 * p)
      const zoff = Math.cos(Math.PI * 2 * (playhead - p))
      const woff = Math.sin(Math.PI * 2 * (playhead + p))
      const noise = noise4D(xoff, yoff, zoff, woff, 1, 1)

      const radius = map(noise, -1, 1, 150, 200)

      const angle = p * (Math.PI * 2)
      const x = radius * Math.cos(angle)
      const y = radius * Math.sin(angle)
      const pos = new Vec(x, y)
      const orb = new Orb(pos)
      orb.display(c, playhead)
    }
    c.restore()
  }
}

canvasSketch(sketch, settings)
