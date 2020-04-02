class Vec {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  copy() {
    return new Vec(this.x, this.y, this.z)
  }

  add(x, y, z) {
    if (x instanceof Vec) {
      this.x += x.x || 0
      this.y += x.y || 0
      this.z += x.z || 0
      return this
    }
    this.x += x || 0
    this.y += y || 0
    this.z += z || 0
    return this
  }

  sub(x, y, z) {
    if (x instanceof Vec) {
      this.x -= x.x || 0
      this.y -= x.y || 0
      this.z -= x.z || 0
      return this
    }
    this.x -= x || 0
    this.y -= y || 0
    this.z -= z || 0
    return this
  }

  mult(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn('n is undefined or not a finite number')
      return this
    }
    this.x *= n
    this.y *= n
    this.z *= n || 0
    return this
  }

  normalize() {
    let len = this.mag()
    if (len !== 0) this.mult(1 / len)
    return this
  }

  div(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn('n is undefined or not a finite number')
      return this
    }
    if (n === 0) {
      console.warn('divide by 0')
      return this
    }
    this.x /= n
    this.y /= n
    this.z /= n || 1
    return this
  }

  limit(max) {
    let mSq = this.magSq()
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)).mult(max)
    }
    return this
  }
  mag() {
    return Math.sqrt(this.magSq())
  }

  magSq() {
    let x = this.x
    let y = this.y
    let z = this.z || 0
    return x * x + y * y + z * z
  }

  heading() {
    // Returns radians
    return Math.atan2(this.x, this.y)
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  lerp(v, amt) {
    this.x += (v.x - this.x) * amt || 0
    this.y += (v.y - this.y) * amt || 0
    this.z += (v.z - this.z) * amt || 0
    return this
  }
}

export default Vec
