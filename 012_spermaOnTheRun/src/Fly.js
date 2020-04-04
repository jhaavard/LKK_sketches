import Vec from "../utils/Vec"
import { noise4D } from "canvas-sketch-util/random"
import { map } from "../utils/helpers"
import { lerp } from "canvas-sketch-util/math"

class Fly {
  constructor() {
    this.pos = new Vec(0, 0)
    this.nDots = 500
    this.seed1 = Math.random() * 10000
    this.seed2 = Math.random() * 10000
    this.seed3 = Math.random() * 10000
    this.seed4 = Math.random() * 10000
    this.delay_factor = 0.2
    this.nFreq = 0.6
    this.nAmp = 15
    this.rangeX = 60
    this.rangeY = 60
  }

  x(t) {
    const xoff = Math.cos(this.seed1 + Math.PI * 2 * t)
    const yoff = Math.sin(this.seed1 + Math.PI * 2 * t)
    const zoff = Math.cos(this.seed2 + Math.PI * 2 * t)
    const woff = Math.sin(this.seed2 + Math.PI * 2 * t)
    return map(
      noise4D(xoff, yoff, zoff, woff, this.nFreq, this.nAmp),
      -1,
      1,
      -this.rangeX,
      this.rangeX
    )
  }
  y(t) {
    const xoff = Math.cos(this.seed3 + Math.PI * 2 * t)
    const yoff = Math.sin(this.seed3 + Math.PI * 2 * t)
    const zoff = Math.cos(this.seed4 + Math.PI * 2 * t)
    const woff = Math.sin(this.seed4 + Math.PI * 2 * t)
    return map(
      noise4D(xoff, yoff, zoff, woff, this.nFreq, this.nAmp),
      -1,
      1,
      -this.rangeY,
      this.rangeY
    )
  }

  display(c, t) {
    c.beginPath()
    c.arc(this.x(t), this.y(t), 20, 0, Math.PI * 2, false)
    c.fillStyle = `hsla(${0}, ${50}%, ${0}%, 1)`
    c.fill()

    for (let i = 0; i < this.nDots; i++) {
      const p = i / this.nDots
      const x = lerp(this.x(t - this.delay_factor * p), 0, p)
      const y = lerp(this.y(t - this.delay_factor * p), 0, p)

      const size = map(Math.pow(p, 0.2), 0, 1, 20, 0)
      const s = map(p, 0, 1, 0, 0)
      const l = map(p, 0, 1, 0, 100)
      const a = map(p, 0, 1, 0.2, 0.1)
      c.beginPath()
      c.arc(x, y, size, 0, Math.PI * 2, false)
      c.fillStyle = `hsla(${200}, ${s}%, ${0}%, ${a})`
      c.fill()
    }
  }
}

export default Fly
