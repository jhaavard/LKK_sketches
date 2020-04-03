import Vec from "../utils/Vec"
import { map, ease } from "../utils/helpers"
import { lerp } from "canvas-sketch-util/math"
import { noise2D } from "canvas-sketch-util/random"

class Circle {
  constructor() {
    this.centerPoint = new Vec(0, 0)
    this.moveRadius = 500
    this.radius = 1000
    this.numPoints = 20
    this.seed = Math.floor(Math.random() * 1000)
  }

  x(t, percent) {
    return percent * this.radius * Math.cos(this.seed + Math.PI * 2 * t)
  }
  y(t, percent) {
    return percent * this.radius * Math.sin(this.seed + Math.PI * 2 * t)
  }

  move(t) {
    const x = this.moveRadius * Math.cos(Math.PI * 2 * t)
    const y = this.moveRadius * Math.sin(Math.PI * 2 * t)
    this.centerPoint.x = x
    this.centerPoint.y = y
  }

  display(c, t) {
    // Points
    for (let i = 1; i <= this.numPoints; i++) {
      const timeStep = i / this.numPoints
      const nx = Math.cos(Math.PI * 2 * t + timeStep)
      const ny = Math.sin(Math.PI * 2 * t + timeStep)

      const easedTime = noise2D(nx, ny, 0.4, 0.5)
      const mEasedTime = map(easedTime, -1, 1, -2, 2)
      const percent = i / this.numPoints
      const x = this.x(mEasedTime, percent)
      const y = this.y(mEasedTime, percent)

      // Lines
      const numDots = 500
      const delay = 0.4
      for (let i = 0; i < numDots; i++) {
        const step = i / numDots
        const n = noise2D(
          Math.cos(Math.PI * 2 * t + step),
          Math.sin(Math.PI * 2 * t + step),
          2,
          0.4
        )
        const dx = lerp(
          this.x(mEasedTime + delay * step, percent),
          this.centerPoint.x,
          step
        )
        const dy = lerp(
          this.y(mEasedTime - delay * step, percent),
          this.centerPoint.y,
          step
        )

        const size = map(step, 0, 1, 1, 30)
        const h = map(n, -1, 1, 100, 400)
        const s = map(step, 0, 1, 0, 50)
        const l = map(step, 0, 1, 100, 0)
        const a = map(n, -1, 1, 0, 0.08)

        c.beginPath()
        c.arc(dx, dy, size, 0, Math.PI * 2, false)
        c.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
        c.fill()
      }
    }
  }
}

export default Circle
