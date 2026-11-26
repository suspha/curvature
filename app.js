var http = require('node:http')
var fsp = require('node:fs').promises
var path = require('node:path')

var layout = require('./app/layouts/main.js')

var port = process.env.APP_PORT || 5188
var assetPath = path.join(__dirname, 'app', 'assets')

var routes = {
  '/': require('./app/pages/index.js'),
  '/what': require('./app/pages/what.js'),
  '/why': require('./app/pages/why.js'),
  '/how': require('./app/pages/how.js')
}

var mimes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
}

async function asset(req, res, pathname) {
  if (pathname.includes('..') || pathname.includes('\0')) {
    return false
  }

  var file = path.join(assetPath, pathname)

  try {
    var stat = await fsp.stat(file)
    if (!stat.isFile()) return false
    var data = await fsp.readFile(file)
    var type = mimes[path.extname(file).toLowerCase()]
    res.writeHead(200, {
      'content-type': type || 'application/octet-stream',
      'content-length': data.length
    })
    res.end(req.method === 'HEAD' ? undefined : data)
    return true
  } catch {
    return false
  }
}

var server = http.createServer(async function (req, res) {
  var state = { req, res }

  try {
    var pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)

    var page = routes[pathname]
    if (page) {
      state.content = await page(state)
      var html = await layout(state)
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
      return res.end(html)
    }

    if (await asset(req, res, pathname)) return

    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
  } catch (e) {
    console.error(e)
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end('Server error')
  }
})

server.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`)
})
