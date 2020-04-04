import Vec from "../utils/Vec"
import { noise4D, range } from "canvas-sketch-util/random"
import { lerp } from "canvas-sketch-util/math"
import { map } from "../utils/helpers"

class Circle {
  constructor() {
    this.pos = new Vec(0, 0)
    this.r1 = 600
    this.r2 = 20
    this.rOffset = 10
    this.numPoints = 25
    this.seed1 = range(10000)
    this.seed2 = range(10000)
    this.nFreq1 = 0.8
    this.nFreq2 = 0.01
    this.nAmp1 = 1
    this.nAmp2 = 0
  }

  x(step, radius) {
    return radius * Math.cos(Math.PI * 2 * step)
  }
  y(step, radius) {
    return radius * Math.sin(Math.PI * 2 * step)
  }

  display(c, t) {
    for (let i = 0; i < this.numPoints; i++) {
      const p = i / this.numPoints

      // NOISE 1
      const nx1 = Math.cos(this.seed1 + Math.PI * 2 * p)
      const ny1 = Math.sin(this.seed1 + Math.PI * 2 * p)
      const nz1 = Math.cos(this.seed1 + Math.PI * 2 * t)
      const nw1 = Math.sin(this.seed1 + Math.PI * 2 * t)
      const noise1 = noise4D(nx1, ny1, nz1, nw1, this.nFreq1, this.nAmp1)
      const mN1 = map(
        noise1,
        -1,
        1,
        this.r1 - this.rOffset,
        this.r1 + this.rOffset
      )
      // NOISE 2
      const nx2 = Math.cos(this.seed2 + Math.PI * 2 * p)
      const ny2 = Math.sin(this.seed2 + Math.PI * 2 * p)
      const nz2 = Math.cos(this.seed2 + Math.PI * 2 * t)
      const nw2 = Math.sin(this.seed2 + Math.PI * 2 * t)
      const noise2 = noise4D(nx2, ny2, nz2, nw2, this.nFreq2, this.nAmp2)
      const mN2 = map(
        noise2,
        -1,
        1,
        this.r2 - this.rOffset,
        this.r2 + this.rOffset
      )

      const v1 = new Vec(this.x(p, mN1), this.y(p, mN1))
      const v2 = new Vec(this.x(p, mN2), this.y(p, mN2))

      // Connecting lines
      const dots = 1000
      const delay = 20
      for (let i = 0; i < dots; i++) {
        const step = i / dots
        const periods = 1
        const phaseX =
          Math.cos(
            Math.sin(Math.PI * 2 * p) * this.seed1 +
              periods * Math.PI * 2 * (step - t)
          ) / 800
        const phaseY =
          Math.sin(
            Math.sin(Math.PI * 2 * p) * this.seed2 +
              periods * Math.PI * 2 * (step - t)
          ) / 800

        const x = lerp(
          this.x(p - delay * phaseX, mN1),
          this.x(p - delay * phaseX, mN2),
          step
        )
        const y = lerp(
          this.y(p - delay * phaseY, mN1),
          this.y(p + delay * phaseY, mN2),
          step
        )

        const size = Math.pow(map(Math.sin(Math.PI * step), -1, 1, 0, 0.9), -4)
        const h = map(step, 0, 1, 0, 200)
        const s = map(step, 0, 1, 80, 0)
        const l = map(step, 0, 1, 50, 20)
        const a = map(Math.sin(Math.PI * step), -1, 1, 0, 0.1)

        c.beginPath()
        c.arc(x, y, size, 0, Math.PI * 2, false)
        c.fillStyle = `hsla(${h},${s}%,${l}%,${a})`
        c.fill()
      }
    }
  }
}

export default Circle
