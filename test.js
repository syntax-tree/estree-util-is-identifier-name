'use strict'

var test = require('tape')
var m = require('.')

test('estree-util-is-identifier-name', function (t) {
  t.true(m.start('a'.charCodeAt(0)), 'should say `a` is a start code')
  t.true(m.start('_'.charCodeAt(0)), 'should say `_` is a start code')
  t.false(m.start('1'.charCodeAt(0)), 'should not say `1` is a start code')
  t.false(m.start('-'.charCodeAt(0)), 'should not say `-` is a start code')

  t.true(m.cont('a'.charCodeAt(0)), 'should say `a` is a cont code')
  t.true(m.cont('_'.charCodeAt(0)), 'should say `_` is a cont code')
  t.true(m.cont('1'.charCodeAt(0)), 'should say `1` is a cont code')
  t.false(m.cont('-'.charCodeAt(0)), 'should not say `-` is a cont code')

  t.false(m.name(''), 'should not say `` (empty string) is a name')
  t.true(m.name('a'), 'should say `a` is a name')
  t.true(m.name('_'), 'should say `_` is a name')
  t.false(m.name('1'), 'should not say `1` is a name')
  t.false(m.name('-'), 'should not say `-` is a name')
  t.true(m.name('a1'), 'should say `a1` is a name')
  t.false(m.name('a-b'), 'should not say `a-b` is a name')
  t.true(m.name('_a$b9'), 'should say `_a$b9` is a name')
  t.false(m.name('aaa-'), 'should not say `aaa-` is a name')
  t.false(m.name('-aaa'), 'should not say `-aaa` is a name')

  t.end()
})
