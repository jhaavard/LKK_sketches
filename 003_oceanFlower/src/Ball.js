import Vec from "../utils/Vec"
import { noise2D, noise1D } from "canvas-sketch-util/random"
import { lerp } from "canvas-sketch-util/math"
import { map } from "../utils/helpers"

class Ball {
  constructor() {
    this.coreRadius = 100
    this.numPoints = 30
    this.surfacePoints = []
    this.orbitPoints = []
    this.orbitPointRadius = 750
    this.orbRadius = 400
    this.nFreq = 0.2
    this.nAmp = 0.7
    this.dotSizes = []

    // Create surface - and orbit points
    for (let i = 0; i < this.numPoints; i++) {
      const p = i / this.numPoints
      const x = this.coreRadius * Math.cos(Math.PI * 2 * p)
      const y = this.coreRadius * Math.sin(Math.PI * 2 * p)
      const sPoint = new Vec(x, y)
      this.surfacePoints.push(sPoint)
      const oPoint = sPoint.copy().normalize().mult(this.orbitPointRadius)
      const seed = Math.floor(Math.random() * 1000)
      this.orbitPoints.push({ oPoint, seed })
    }
  }

  // Position relative to the origin
  x(origin, t) {
    return (
      origin.oPoint.x +
      this.orbRadius *
        noise2D(
          origin.seed + Math.cos(Math.PI * 2 * t),
          Math.sin(Math.PI * 2 * t),
          this.nFreq,
          this.nAmp
        )
    )
  }
  y(origin, t) {
    return (
      origin.oPoint.y +
      this.orbRadius *
        noise2D(
          origin.seed + Math.sin(Math.PI * 2 * t),
          Math.sin(Math.PI * 2 * t),
          this.nFreq,
          this.nAmp
        )
    )
  }

  offset(p) {
    return 40 * Math.pow(p, 2.0)
    // return 40 * Math.pow(p, 2.0)
  }

  display(c, t) {
    // Core
    // c.beginPath()
    // c.arc(0, 0, this.coreRadius, 0, Math.PI * 2, false)
    // c.fillStyle = `hsla(200, 50%, 15%, 1)`
    // c.fill()

    // Surface points
    // this.surfacePoints.forEach(p => {
    //   c.beginPath()
    //   c.arc(p.x, p.y, 7, 0, Math.PI * 2, false)
    //   c.fillStyle = 'black'
    //   c.fill()
    // })

    // Orbit points
    this.orbitPoints.forEach((p, i) => {
      //   c.beginPath()
      //   c.arc(p.oPoint.x, p.oPoint.y, 20, 0, Math.PI * 2, false)
      //   c.fillStyle = 'lightgrey'
      //   c.fill()

      // Orbs
      // c.beginPath()
      // c.arc(this.x(p, t), this.y(p, t), 5, 0, Math.PI * 2, false)
      // c.fillStyle = `hsla(200, 50%, 50%, 1)`
      // c.fill()

      // Connecting lines between orbs and surface points
      const numDots = 200
      const delay = 0.5
      let xoff = p.seed

      for (let j = 0; j < numDots; j++) {
        this.dotSizes = []
        const step = j / numDots

        const x = lerp(
          this.x(p, t + delay * step),
          this.surfacePoints[i].x,
          step
        )
        const y = lerp(
          this.y(p, t + delay * step),
          this.surfacePoints[i].y,
          step
        )

        const size = this.offset(map(noise1D(xoff, 1.2, 1), -1, 1, 0, 1))
        const h = this.offset(map(noise1D(xoff, 1.2, 1), -1, 1, 0, 0.5))
        const s = this.offset(map(noise1D(xoff, 1.2, 1), -1, 1, 0, 5))
        const l = map(noise1D(xoff), -1, 1, 0, 40)
        const a = map(noise1D(xoff), -1, 1, 0.01, 0.15)

        c.beginPath()
        c.arc(x, y, size, 0, Math.PI * 2, false)
        c.fillStyle = `hsla(${h}, ${s}%, ${l}%, ${a})`
        c.fill()

        xoff += 0.02
      }
    })
  }
}

export default Ball
