import { lerp } from "canvas-sketch-util/math"
import { noise2D } from "canvas-sketch-util/random"
import { map } from "../utils/helpers"
import { range } from "canvas-sketch-util/random"

class Orb {
  constructor(pos, r) {
    this.pos = pos
    this.r = 0
    this.delay_factor = 0
    this.nFreq = 0.0
    this.nAmp = 20
    this.dots = 1000
    this.dotSizeFrom = 3
    this.dotSizeTo = 2
    this.seed1 = Math.random() * 1000
    this.seed2 = Math.random() * 1000
    this.orbHue = range(330, 400)
  }

  updateRadius(t) {
    this.nAmp = map(Math.cos(Math.PI * 2 * t), -1, 1, 40, 0)
    this.nFreq = map(Math.cos(Math.PI * 2 * t), -1, 1, 0.005, 0)
    this.dots = map(Math.cos(Math.PI * 2 * t), -1, 1, 2000, 50)
    this.r = map(Math.cos(Math.PI * 2 * t), -1, 1, 300, 0)
  }

  x(t) {
    const a = Math.PI * 2 * t
    return (
      this.pos.x +
      this.r * noise2D(this.seed1 + Math.cos(a), this.seed1 + Math.sin(a), 1, 1)
    )
  }

  y(t) {
    const a = Math.PI * 2 * t
    return (
      this.pos.y +
      this.r * noise2D(this.seed2 + Math.cos(a), this.seed2 + Math.sin(a), 1, 1)
    )
  }

  connect(other, t, c) {
    for (let i = 0; i < this.dots; i++) {
      const p = i / this.dots
      const n = noise2D(
        Math.cos(Math.PI * 2 * p),
        Math.sin(Math.PI * 2 * p),
        this.nFreq,
        this.nAmp
      )
      const x = lerp(this.x(t + this.delay_factor * p - n), other.x(t - n), p)
      const y = lerp(this.y(t + this.delay_factor * p - n), other.y(t - n), p)

      const size = map(p, 0, 1, this.dotSizeFrom, this.dotSizeTo)

      c.beginPath()
      c.arc(x, y, size, 0, Math.PI * 2, false)
      c.fillStyle = `hsla(200, 0%, 0%, 0.1)`
      c.fill()
    }
  }

  display(c, t) {
    // Root
    // c.beginPath()
    // c.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2, false)
    // c.fillStyle = 'lightgrey'
    // c.fill()

    // Orb
    c.beginPath()
    c.arc(this.x(t), this.y(t), 7, 0, Math.PI * 2, false)
    c.fillStyle = `hsla(${this.orbHue}, 60%, 50%, 1.0)`
    c.fill()
    c.strokeStyle = `hsla(200, 50%, 0%, 1.0)`
    c.stroke()
  }
}

export default Orb
