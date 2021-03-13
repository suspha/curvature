async function load(path, into) {
  var res = await fetch(path)
  res = await res.text()
  if (into) {
    var el = html(into, res)
    qa('script', el, function (script) {
      if (!script.loaded) {
        script.loaded = true
        eval(script.textContent)
      }
    })
  }
  return res
}

function sleep(time, s = 0.5) {
  return new Promise(r => setTimeout(r, s*1000))
}

function clearErrors(field) {
  var el = q(`.${field.name}-errors`, field.parentNode)
  if (!el) return
  el.style.opacity = 0
  setTimeout(function () {
    text(el, '')
    el.style.opacity = 1
  }, 210)
}

function showErrors(result, options = {}) {
  if (!result.error) return
  options = Object.assign({ class: 'error' }, options)
  qa('form em', function(el) { text(el, '') })
  flash(result.error.message, options)
  for (var key in result) {
    if (key !== 'error') {
      for (var field in result[key]) {
        text(`.${field}-errors`, result[key][field][0])
      }
    }
  }
  return true
}

async function cache(name, id) {
  var doc = store(`${name}-cache`)
  async function get() {
    doc = await api({ action: `v1/${name}/get`, query: { id } })
    store(`${name}-cache`, doc)
  }
  if (!doc || doc.id != id) {
    await get()
  } else {
    setTimeout(get)
  }
  return doc
}

function goBack() {
  history.go(-(store('root') || 1))
}

function navCount(add) {
  if (!add) {
    store('root', null)
    store('last', null)
    return
  }
  var path = location.pathname
  var last = store('last')
  if (!last || last != path) {
    store('root', (store('root') || 0) + 1)
  }
  store('last', path)
}

function isImage(name) {
  return /\.(gif|jpe?g|tiff|png|bmp|svg)$/i.test(name)
}

function closeWindow(e) {
  if (e.code == 'Escape') {
    goBack()
  }
}

function tr(str = '', size = 32) {
  return str.length > size ? str.substring(0, size).trim() + ' ...' : str
}

async function handleEditorUpload(event, config) {
  if (!config) config = { resize: [1220, 'auto'] }
  var attachment = event.attachment
  if (!attachment || !attachment.file) return
  var result = await api({ action: 'v1/upload/create', config }, { files: [attachment.file] })
  if (result.error) {
    return flash(result.error.message, { scroll: false, class: 'error' })
  }
  if (!result || !result.length) return
  var url = result[0].url
  var href = url + '?content-disposition=attachment'
  attachment.setAttributes({ url, href })
}

function loadEditorContent(html) {
  q('trix-editor').editor.insertHTML(html)
  document.body.tabIndex = -1
  document.body.focus()
  window.scrollTo(0, 0)
}

function toggleVisibility(options = {}, fn) {
  var pub = options.pub || 'public'
  var priv = options.priv || 'private'
  var selector = '.' + pub + ',.' + priv
  var session = cookie(options.cookie || 'session')
  var toggle = fn || function(el) {
    var isPublic = el.classList.contains(pub)
    var isPrivate = el.classList.contains(priv)
    if (session && isPublic || !session && isPrivate) {
      el.style.display = 'none'
    }
  }
  document.querySelectorAll(selector).forEach(toggle)
}

function setActiveLink(options = {}) {
  document.querySelectorAll(options.selector || 'a').forEach(function(el) {
    if (el.pathname == location.pathname) {
      el.classList.add(options.active || 'active')
    }
  })
}

function handleLogout(options = {}, fn) {
  var name = options.cookie || 'session'
  if (cookie(name)) cookie(name, null)
  if (fn) fn()
}
