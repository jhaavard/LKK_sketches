import { lerp } from "canvas-sketch-util/math"
import { noise4D } from "canvas-sketch-util/random"
import { map } from "../utils/helpers"

class Line {
  constructor({
    pos,
    p1Radius,
    p2Radius,
    p1Period,
    p2Period,
    ballSize,
    lineLength,
    lineIndex,
    linePercent
  }) {
    this.pos = pos
    this.pDistance = lineLength
    this.p1Radius = p1Radius
    this.p2Radius = p2Radius
    this.p1Period = p1Period
    this.p2Period = p2Period
    this.numDots = 800
    this.lineIndex = lineIndex
    this.linePercent = linePercent
    this.delay_factor = 2
    this.ballSize = ballSize
    this.trail = []
  }

  x1(t) {
    return (
      this.pos.x -
      this.pDistance / 2 +
      this.p1Radius * Math.cos(this.p1Period * Math.PI * 2 * t)
    )
  }
  y1(t) {
    return (
      this.pos.y + this.p1Radius * Math.sin(this.p1Period * Math.PI * 2 * t)
    )
  }
  x2(t) {
    return (
      this.pos.x +
      this.pDistance / 2 +
      this.p2Radius * Math.cos(this.p2Period * Math.PI * 2 * t)
    )
  }
  y2(t) {
    return (
      this.pos.y + this.p2Radius * Math.sin(this.p2Period * Math.PI * 2 * t)
    )
  }

  display(c, t) {
    const sinTime = Math.sin(Math.PI * 2 * t) * 0.5 + 0.5

    const xoff = Math.cos(Math.PI * 2 * (t - this.linePercent))
    const yoff = Math.sin(Math.PI * 2 * (t + this.linePercent))
    const zoff = Math.cos(Math.PI * 2 * (t + this.lineIndex))
    const woff = Math.sin(Math.PI * 2 * (t - this.lineIndex))
    const n = noise4D(xoff, yoff, zoff, woff, 0.3, 0.1)
    const mNoise = map(n, -1, 1, 0, 5)

    // Lerped line
    for (let i = 0; i < this.numDots; i++) {
      const p = i / this.numDots

      const x = lerp(
        this.x1(p - this.delay_factor * (p - mNoise)),
        this.x2(p - this.delay_factor * (p - mNoise)),
        p
      )
      const y = lerp(
        this.y1(p - this.delay_factor * (p - mNoise)),
        this.y2(p - this.delay_factor * (p - mNoise)),
        p
      )

      const h = map(this.linePercent, 0, 1, 170, 200)
      // const s = map(this.linePercent, 0, 1, 0, 0)
      const s = map(this.linePercent, 0, 1, 60, 70)
      const l = map(this.linePercent, 0, 1, 40, 20)
      const a = map(this.linePercent, 0, 1, 0.1, 0.1)
      const size = map(this.linePercent, 0, 1, 5, 5)
      c.beginPath()
      c.arc(x, y, size, 0, Math.PI * 2, false)
      c.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
      c.fill()
    }

    // Moving point 1
    const mx = lerp(
      this.x1(sinTime - this.delay_factor * (sinTime - mNoise)),
      this.x2(sinTime - this.delay_factor * (sinTime - mNoise)),
      sinTime
    )
    const my = lerp(
      this.y1(sinTime - this.delay_factor * (sinTime - mNoise)),
      this.y2(sinTime - this.delay_factor * (sinTime - mNoise)),
      sinTime
    )

    const bh = map(this.linePercent, 0, 1, 180, 200)
    const bs = map(this.linePercent, 0, 1, 0, 90)
    // const bs = map(this.linePercent, 0, 1, 40, 80)
    const bl = map(this.linePercent, 0, 1, 90, 0)
    // const bl = map(this.linePercent, 0, 1, 0, 100)
    const ba = map(this.linePercent, 0, 1, 1, 1)
    // const ballSize = 20 //this.lineIndex * 5

    // const trailPoint = new Vec(mx, my)
    // if (this.trail.length > 5) {
    //   this.trail.shift()
    // } else {
    //   this.trail.push(trailPoint)
    // }

    // for (let i = 0; i < this.trail.length; i++) {
    //   const p = i / this.trail.length
    //   const { x, y } = this.trail[i]
    //   c.beginPath()
    //   c.arc(x, y, 10*p, 0, Math.PI * 2, false)
    //   c.fillStyle = `hsla(${bh}, ${bs}%, ${bl}%, ${ba})`
    //   c.fill()
    // }

    c.beginPath()
    c.arc(mx, my - this.ballSize, this.ballSize, 0, Math.PI * 2, false)
    c.fillStyle = `hsla(${bh}, ${bs}%, ${bl}%, ${ba})`
    c.fill()
    c.strokeStyle = `hsla(100, 80%, 20%, 1)`
    c.lineWidth = 3
    c.stroke()
  }
}

export default Line
