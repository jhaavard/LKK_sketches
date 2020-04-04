import { noise4D, range } from "canvas-sketch-util/random"
import { map } from "../utils/helpers"
import Vec from "../utils/Vec"

class NoiseCircle {
  constructor(pos, radius) {
    this.pos = pos
    this.r = radius
    this.points = []
    this.segments = radius / 1
    this.pointMaxSize = 1
    this.pointMinSize = 7
    this.hueStart = 200
    this.hueStop = 400
    this.hueRange = 50
    this.seed1 = Math.random() * 10000
    this.seed2 = Math.random() * 10000
    this.nFreq = 0.5
    this.nAmp = 3
    this.mRange = 50
    this.sinPeriode = 4

    for (let i = 0; i <= this.segments; i++) {
      const arr = []
      for (let j = 0; j <= this.segments; j++) {
        const width = this.r * 2
        const x = this.pos.x - this.r + (width / this.segments) * i
        const y = this.pos.y - this.r + (width / this.segments) * j

        const currentPoint = new Vec(x, y)
        const dist = this.pos.copy().sub(currentPoint).mag()

        if (dist < this.r && Math.random() < 0.5)
          arr.push({
            pos: new Vec(x, y),
            size: range(this.pointMinSize, this.pointMaxSize),
            hue: range(this.hueStart, this.hueStop),
          })
        else arr.push(undefined)
      }
      this.points.push(arr)
    }
  }

  setSinePeriode(val) {
    this.sinPeriode = val
  }

  display(c, t) {
    for (let i = 0; i < this.points.length; i++) {
      const pi = i / this.points.length
      for (let j = 0; j < this.points[i].length; j++) {
        const pj = j / this.points[i].length
        // SIMPLEX NOISE 1
        const xoff1 = this.seed1 + Math.sin(Math.PI * 2 * pi)
        const yoff1 = this.seed1 + Math.cos(Math.PI * 2 * pj)
        const zoff1 = this.seed1 + Math.sin(Math.PI * 2 * t)
        const woff1 = this.seed1 + Math.cos(Math.PI * 2 * t)
        const n1 = noise4D(xoff1, yoff1, zoff1, woff1, this.nFreq, this.nAmp)
        const noise1 = map(n1, -1, 1, -this.mRange, this.mRange)
        // SIMPLEX NOISE 2
        const xoff2 = this.seed2 + Math.sin(Math.PI * 2 * pi)
        const yoff2 = this.seed2 + Math.cos(Math.PI * 2 * pj)
        const zoff2 = this.seed2 + Math.sin(Math.PI * 2 * t)
        const woff2 = this.seed2 + Math.cos(Math.PI * 2 * t)
        const n2 = noise4D(xoff2, yoff2, zoff2, woff2, this.nFreq, this.nAmp)
        const noise2 = map(n2, -1, 1, -this.mRange, this.mRange)

        // SINE WAVE
        const sine = 100 * Math.sin(this.sinPeriode * Math.PI * 2 * (t + pi))
        const cosine = 100 * Math.cos(this.sinPeriode * Math.PI * 2 * (t - pj))

        if (this.points[i][j] != undefined) {
          const { x, y } = this.points[i][j].pos

          // DISTANCE
          const center = new Vec(this.pos.x, this.pos.y)
          const dist = center.sub(this.points[i][j].pos).mag()
          const mDist = map(dist, 0, this.r, 0, 1)

          // COLOR
          const h = map(
            mDist,
            0,
            1,
            this.points[i][j].hue - this.hueRange,
            this.points[i][j].hue + this.hueRange
          )
          const s = map(mDist, 0, 1, 20, 90)
          const l = map(mDist, 0, 1, 0, 40)
          const a = map(mDist, 0, 1, 0.2, 0.08)
          const size = this.points[i][j].size

          c.beginPath()
          c.arc(
            x + (cosine + noise1),
            y + (sine + noise2),
            size,
            0,
            Math.PI * 2,
            false
          )
          c.fillStyle = `hsla(${h},${s}%,${l}%,${a} )`
          c.fill()
        }
      }
    }
  }
}

export default NoiseCircle
