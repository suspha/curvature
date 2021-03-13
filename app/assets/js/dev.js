(function() {
  var ws, done, url = location.origin.replace(/^http/, 'ws')
  function reload() {
    setTimeout(function() {
      ws = new WebSocket(url)
      ws.onopen = function() {
        if (done) location.reload()
      }
      ws.onclose = function() {
        done = true
        reload()
      }
    }, 200)
  }
  reload()
})()
