import assert from 'node:assert/strict'
import test from 'node:test'
import {start, cont, name} from './index.js'

test('estree-util-is-identifier-name', () => {
  assert.ok(start('a'.charCodeAt(0)), 'should say `a` is a start code')
  assert.ok(start('_'.charCodeAt(0)), 'should say `_` is a start code')
  assert.ok(!start('1'.charCodeAt(0)), 'should not say `1` is a start code')
  assert.ok(!start('-'.charCodeAt(0)), 'should not say `-` is a start code')

  assert.ok(cont('a'.charCodeAt(0)), 'should say `a` is a cont code')
  assert.ok(cont('_'.charCodeAt(0)), 'should say `_` is a cont code')
  assert.ok(cont('1'.charCodeAt(0)), 'should say `1` is a cont code')
  assert.ok(!cont('-'.charCodeAt(0)), 'should not say `-` is a cont code')

  assert.ok(!name(''), 'should not say `` (empty string) is a name')
  assert.ok(name('a'), 'should say `a` is a name')
  assert.ok(name('_'), 'should say `_` is a name')
  assert.ok(!name('1'), 'should not say `1` is a name')
  assert.ok(!name('-'), 'should not say `-` is a name')
  assert.ok(name('a1'), 'should say `a1` is a name')
  assert.ok(!name('a-b'), 'should not say `a-b` is a name')
  assert.ok(name('_a$b9'), 'should say `_a$b9` is a name')
  assert.ok(!name('aaa-'), 'should not say `aaa-` is a name')
  assert.ok(!name('-aaa'), 'should not say `-aaa` is a name')
})
