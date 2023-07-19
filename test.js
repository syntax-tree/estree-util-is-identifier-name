import assert from 'node:assert/strict'
import test from 'node:test'
import {start, cont, name} from './index.js'
import * as mod from './index.js'

test('isIdentifierName', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['cont', 'name', 'start'],
    'should expose the public api'
  )

  assert.ok(
    !start(''.codePointAt(0)),
    'should not say `undefined` is a start code'
  )
  assert.ok(start('a'.codePointAt(0)), 'should say `a` is a start code')
  assert.ok(start('_'.codePointAt(0)), 'should say `_` is a start code')
  assert.ok(!start('1'.codePointAt(0)), 'should not say `1` is a start code')
  assert.ok(!start('-'.codePointAt(0)), 'should not say `-` is a start code')
  assert.ok(start('ಠ'.codePointAt(0)), 'should say `ಠ` is a start code')
  assert.ok(
    start(0x1_02_a7),
    'should say `0xd8_00 0xde_a7` (together 0x1_02_a7) is a start code'
  )
  assert.ok(!start(0xd8_00), 'should not say `0xd8_00` is a start code')

  assert.ok(
    !cont(''.codePointAt(0)),
    'should not say `undefined` is a cont code'
  )
  assert.ok(cont('a'.codePointAt(0)), 'should say `a` is a cont code')
  assert.ok(cont('_'.codePointAt(0)), 'should say `_` is a cont code')
  assert.ok(cont('1'.codePointAt(0)), 'should say `1` is a cont code')
  assert.ok(!cont('-'.codePointAt(0)), 'should not say `-` is a cont code')
  assert.ok(cont('ಠ'.codePointAt(0)), 'should say `ಠ` is a cont code')
  assert.ok(
    cont(0x1_02_a7),
    'should say `0xd8_00 0xde_a7` (together 0x1_02_a7) is a cont code'
  )
  assert.ok(!cont(0xd8_00), 'should not say `0xd8_00` is a cont code')
  assert.ok(
    !cont('-'.codePointAt(0)),
    'should not say `-` is a cont code normally'
  )
  assert.ok(
    cont('-'.codePointAt(0), {jsx: true}),
    'should say `-` is a cont code w/ `jsx: true`'
  )

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
  assert.ok(name('ಠ_ಠ'), 'should say `ಠ_ಠ` is a name')
  assert.ok(name('𐊧'), 'should say `𐊧` (0x1_02_a7) is a name')
  assert.ok(!name('a-b'), 'should not say `a-b` is a name normally')
  assert.ok(name('a-b', {jsx: true}), 'should say `a-b` is a jsx name')
  assert.ok(name('a-', {jsx: true}), 'should say `a-` is a jsx name')
})
