'use strict'

exports.start = start
exports.cont = cont
exports.name = name

var id = require('./regex')

// To do: support astrals.
function start(code) {
  return id.start.test(String.fromCharCode(code))
}

// To do: support astrals.
function cont(code) {
  var character = String.fromCharCode(code)
  return id.start.test(character) || id.cont.test(character)
}

function name(name) {
  var index = -1

  while (++index < name.length) {
    if (!(index ? cont : start)(name.charCodeAt(index))) return false
  }

  // `false` if `name` is empty.
  return index > 0
}
