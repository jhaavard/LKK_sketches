import Vec from "../utils/Vec"
import random from "canvas-sketch-util/random"
import { map } from "../utils/helpers"
const randomInstance = random.createRandom()
randomInstance.setSeed(1000)

class Orb {
  constructor(pos) {
    this.pos = pos
    this.r = 2
    this.nPoints = 1
    this.points = []
  }

  field(x, y, t) {
    const amount = 1.5
    const scale = 0.002
    const nFreq = 1
    const nAmp = 150

    const xoff1 = scale * x
    const yoff1 = scale * y
    const zoff1 = Math.cos(Math.PI * 2 * t)
    const woff1 = Math.sin(Math.PI * 2 * t)
    const noiseX = randomInstance.noise4D(
      xoff1,
      yoff1,
      zoff1,
      woff1,
      nFreq,
      nAmp
    )

    const xoff2 = 1000 + scale * x
    const yoff2 = scale * y
    const zoff2 = Math.cos(Math.PI * 2 * t)
    const woff2 = Math.sin(Math.PI * 2 * t)
    const noiseY = randomInstance.noise4D(
      xoff2,
      yoff2,
      zoff2,
      woff2,
      nFreq,
      nAmp
    )

    const parameter1 = Math.round(noiseX) / 100.0
    const parameter2 = Math.round(noiseY) / 100.0

    return new Vec(amount * parameter1, amount * parameter2)
  }

  display(c, t) {
    // Generate points based on origin
    this.points = []
    for (let i = 0; i < this.nPoints; i++) {
      const angle = Math.PI * 2 * (i / this.nPoints)
      this.points.push(
        new Vec(
          this.pos.x + this.r * Math.cos(angle),
          this.pos.y + this.r * Math.sin(angle)
        )
      )

      // Origin
      c.beginPath()
      c.arc(this.pos.x, this.pos.y, 2, 0, Math.PI * 2, false)
      c.fillStyle = `hsla(${0}, ${100}%, ${0}%, ${1})`
      c.fill()

      // Points
      this.points.forEach(p => {
        const pos = p.copy()
        const nDots = 300
        for (let k = 0; k < nDots; k++) {
          const percent = k / nDots
          const res = this.field(pos.x, pos.y, t)
          res.mult(0.8)
          pos.x += res.x
          pos.y += res.y

          const size = map(Math.pow(percent, 5), 0, 1, 1, 5)
          const h = map(percent, 0, 1, 300, 500)
          const s = map(Math.pow(percent, 2), 0, 1, 0, 100)
          const l = map(Math.pow(percent, 2), 0, 1, 60, 0)
          const a = map(percent, 0, 1, 0, 1)

          c.beginPath()
          c.arc(pos.x, pos.y, size, 0, Math.PI * 2, false)
          c.fillStyle = `hsla(${h}, ${0}%, ${l}%, ${a})`
          c.fill()
        }
      })
    }
  }
}

export default Orb
