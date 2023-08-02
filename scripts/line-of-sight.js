var d = parseFloat(process.argv[2])

if (!d) {
  console.log('Usage: line-of-sight.js <distance>')
  process.exit()
}

var r = 6378.395
var c = 2 * Math.PI * r
var g = 360 / c
var a = g * d
var b = a / 2
var e = b * (Math.PI / 180)
var x = Math.cos(e) * r
var h = r - x

console.log({ d, r, c, g, a, b, e, x, h })

// Alternative one-liner formula
var h2 = r - Math.cos(((g * d) / 2) * (Math.PI / 180)) * r
