import Vec from './Vec'

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomFromRange(min, max) {
  return Math.random() * (max - min) + min
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function dist(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function map(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180)
}

function toDegrees(radians) {
  return radians * (180 / Math.PI)
}

function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low)
}

function ease(percent, intensity) {
  if (percent < 0.5) return 0.5 * Math.pow(2 * percent, intensity)
  else return 1 - 0.5 * Math.pow(2 * (1 - percent), intensity)
}

//======================
// Static vector methods
//======================

function fromAngle(angle, length) {
  if (typeof length === 'undefined') {
    length = 1
  }
  return new Vec(length * Math.cos(angle), length * Math.sin(angle), 0)
}

function random2D() {
  return fromAngle(Math.random() * Math.PI * 2)
}

// Finding angle between two vectors:
//  1) Find dot product = (v1.x * v2.x) + (v1.y * v2.y)
//  2) Use inverse Math.cos to find theta = Math.acos
//  3) theta = Math.acos(dotProduct / (v1-magnutide * v2-magnitude))
function angleBetween(v1, v2) {
  const dot = v1.dot(v2)
  const theta = Math.acos(dot / (v1.mag() * v2.mag()))
  // Returns radians
  return theta
}

function getNormalPoint(point, vstart, vend) {
  const p = point.copy()
  const a = vstart.copy()
  const b = vend.copy()
  let ap = p.sub(a) // Vec that points from a to p
  let ab = b.sub(a) // Vec that points from a to b

  ab.normalize() // Using dot product for scalar projection
  ab.mult(ap.dot(ab))

  let normalPoint = a.add(ab)
  return normalPoint
}

// Subtract vB from vA
function subVecs(v1, v2) {
  return new Vec(v1.x - v2.x, v1.y - v2.y)
}

module.exports = {
  randomIntFromRange,
  randomFromRange,
  randomColor,
  dist,
  map,
  toRadians,
  toDegrees,
  constrain,
  ease,
  fromAngle,
  random2D,
  angleBetween,
  getNormalPoint,
  subVecs
}
