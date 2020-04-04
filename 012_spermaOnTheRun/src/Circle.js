import Vec from "../utils/Vec"
import { map } from "../utils/helpers"
import { noise4D } from "canvas-sketch-util/random"

class Circle {
  constructor() {
    this.pos = new Vec(0, 0)
    this.nCircles = 30
    this.nDots = 100
    this.sizeMidpoint = 300
    this.sizeRange = 10
    this.nFreq = 0.6
    this.nAmp = 15
  }

  display(c, t) {
    for (let i = 0; i < this.nCircles; i++) {
      const p = i / this.nCircles

      const radius = i * 60 * p

      for (let j = 0; j < this.nDots; j++) {
        const pp = j / this.nDots
        const x = radius * Math.cos(Math.PI * 2 * pp)
        const y = radius * Math.sin(Math.PI * 2 * pp)

        const xoff = Math.cos(Math.PI * 2 * (pp - t))
        const yoff = Math.sin(Math.PI * 2 * (pp + t))
        const zoff = Math.cos(Math.PI * 2 * (t + p))
        const woff = Math.sin(Math.PI * 2 * (t + p))
        const n = noise4D(xoff, yoff, zoff, woff, this.nFreq, this.nAmp)

        const size = map(
          n,
          -1,
          1,
          this.sizeMidpoint - this.sizeRange * p,
          this.sizeMidpoint + this.sizeRange * p
        )

        const h = map(p, 0, 1, 0, 0)
        const s = map(p, 0, 1, 0, 0)
        const l = Math.pow(map(p, 0, 1, 100, 0), 1)
        c.beginPath()
        c.arc(x, y, size, 0, Math.PI * 2, false)
        c.fillStyle = `hsla(${h}, ${s}%, ${l}%, 0.2)`
        c.fill()
      }
    }
  }
}

export default Circle
