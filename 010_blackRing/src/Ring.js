import Vec from "../utils/Vec"
import { map } from "../utils/helpers"
import { noise4D } from "canvas-sketch-util/random"

class Ring {
  constructor(pos) {
    this.pos = pos
    this.innerRadius = 250
    this.outerRadius = 500
    this.segments = 1000
    this.points = []
    this.seed1 = Math.random() * 1000
    this.seed2 = Math.random() * 1000
    this.nFreq = 1
    this.nAmp = 30
    this.motionRange = 30

    for (let i = 0; i <= this.segments; i++) {
      const arr = []
      for (let j = 0; j <= this.segments; j++) {
        const segSize = (this.outerRadius * 2) / this.segments
        const x = this.pos.x - this.outerRadius + segSize * i
        const y = this.pos.y - this.outerRadius + segSize * j
        const v = new Vec(x, y)
        const origin = new Vec(this.pos.x, this.pos.y)
        const distToCenter = origin.sub(v).mag()

        if (
          distToCenter < this.outerRadius &&
          distToCenter > this.innerRadius &&
          Math.random() < 0.5
        ) {
          const mDist = map(
            distToCenter,
            this.innerRadius,
            this.outerRadius,
            0,
            1
          )
          const falloff = Math.sin(Math.PI * mDist)
          arr.push({ v, falloff, linearFalloff: mDist })
        } else {
          arr.push(undefined)
        }
      }
      this.points.push(arr)
    }
  }

  display(c, t) {
    for (let i = 0; i < this.points.length; i++) {
      const pi = i / this.points.length
      for (let j = 0; j < this.points[i].length; j++) {
        const pj = j / this.points[i].length
        // Noise X
        const xoff1 = this.seed1 + Math.cos(Math.PI * 2 * pi)
        const yoff1 = this.seed1 + Math.sin(Math.PI * 2 * pj)
        const zoff1 = this.seed1 + Math.cos(Math.PI * 2 * t - pi)
        const woff1 = this.seed1 + Math.sin(Math.PI * 2 * t + pj)
        const n1 = map(
          noise4D(xoff1, yoff1, zoff1, woff1, this.nFreq, this.nAmp),
          -1,
          1,
          -this.motionRange,
          this.motionRange
        )
        // Noise Y
        const xoff2 = this.seed2 + Math.cos(Math.PI * 2 * pi)
        const yoff2 = this.seed2 + Math.sin(Math.PI * 2 * pj)
        const zoff2 = this.seed2 + Math.cos(Math.PI * 2 * t + pi)
        const woff2 = this.seed2 + Math.sin(Math.PI * 2 * t - pj)
        const n2 = map(
          noise4D(xoff2, yoff2, zoff2, woff2, this.nFreq, this.nAmp),
          -1,
          1,
          -this.motionRange,
          this.motionRange
        )

        if (this.points[i][j] !== undefined) {
          const { x, y } = this.points[i][j].v
          const fo = this.points[i][j].falloff
          const lfo = this.points[i][j].linearFalloff
          const size = map(fo, 0, 1, 2, 4)
          const inverseFalloff = map(fo, 0, 1, 1, 0)

          const h = map(fo, 0, 1, 100, 200)
          const s = map(inverseFalloff, 0, 1, 80, 100)
          const l = map(inverseFalloff, 0, 1, 0, 50)
          const a = map(inverseFalloff, 0, 1, 0.05, 0.01)

          c.beginPath()
          c.arc(
            x + inverseFalloff * n1,
            y + inverseFalloff * n2,
            size,
            0,
            Math.PI * 2,
            false
          )
          c.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
          c.fill()
        }
      }
    }
  }
}

export default Ring
