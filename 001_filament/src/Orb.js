import { lerp } from 'canvas-sketch-util/math'
import { map } from '../utils/helpers'

class Orb {
  constructor(pos) {
    this.pos = pos
    this.r = 100
    this.lineDensity = 600
    this.delay_factor = 5
  }

  x(t, offset) {
    const xoff = Math.PI * 2 * offset
    return this.pos.x + this.r * Math.cos(Math.PI * 2 * t + xoff)
  }
  y(t, offset) {
    const yoff = Math.PI * 2 * offset
    return this.pos.y + this.r * Math.sin(Math.PI * 2 * t + yoff)
  }

  display(c, t, offset) {
    // ORB
    c.beginPath()
    c.arc(this.x(t, offset), this.y(t, offset), 0, Math.PI * 2, false)

    // CONNECTING LINE
    for (let i = 0; i <= this.lineDensity; i++) {
      const p = i / this.lineDensity
      const x = lerp(this.x(t - this.delay_factor * p, offset), 0, p)
      const y = lerp(this.y(t - this.delay_factor * p, offset), 0, p)
      const size = map(p, 0, 1, 45, 0)
      const brightness = map(p, 0, 1, 5, 100)
      const hue = map(p, 0, 1, 520, 610)
      const alpha = map(p, 0, 1, 0, 0.1)

      c.beginPath()
      c.arc(x, y, size, Math.PI * 2, false)
      c.fillStyle = `hsla(${hue}, 50%, ${brightness}%, ${alpha}`
      c.fill()
    }
  }
}

export default Orb
