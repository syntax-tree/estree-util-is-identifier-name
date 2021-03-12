import test from 'tape'
import {start, cont, name} from './index.js'

test('estree-util-is-identifier-name', function (t) {
  t.true(start('a'.charCodeAt(0)), 'should say `a` is a start code')
  t.true(start('_'.charCodeAt(0)), 'should say `_` is a start code')
  t.false(start('1'.charCodeAt(0)), 'should not say `1` is a start code')
  t.false(start('-'.charCodeAt(0)), 'should not say `-` is a start code')

  t.true(cont('a'.charCodeAt(0)), 'should say `a` is a cont code')
  t.true(cont('_'.charCodeAt(0)), 'should say `_` is a cont code')
  t.true(cont('1'.charCodeAt(0)), 'should say `1` is a cont code')
  t.false(cont('-'.charCodeAt(0)), 'should not say `-` is a cont code')

  t.false(name(''), 'should not say `` (empty string) is a name')
  t.true(name('a'), 'should say `a` is a name')
  t.true(name('_'), 'should say `_` is a name')
  t.false(name('1'), 'should not say `1` is a name')
  t.false(name('-'), 'should not say `-` is a name')
  t.true(name('a1'), 'should say `a1` is a name')
  t.false(name('a-b'), 'should not say `a-b` is a name')
  t.true(name('_a$b9'), 'should say `_a$b9` is a name')
  t.false(name('aaa-'), 'should not say `aaa-` is a name')
  t.false(name('-aaa'), 'should not say `-aaa` is a name')

  t.end()
})
