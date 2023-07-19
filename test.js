import assert from 'node:assert/strict'
import test from 'node:test'
import {cont, name, start} from './index.js'

test('isIdentifierName', async function (t) {
  await t.test('core', async function (t) {
    await t.test('should expose the public api', async function () {
      assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
        'cont',
        'name',
        'start'
      ])
    })
  })

  await t.test('cont', async function (t) {
    await t.test(
      'should not say `undefined` is a cont code',
      async function () {
        assert.ok(!cont(''.codePointAt(0)))
      }
    )

    await t.test('should say `a` is a cont code', async function () {
      assert.ok(cont('a'.codePointAt(0)))
    })

    await t.test('should say `_` is a cont code', async function () {
      assert.ok(cont('_'.codePointAt(0)))
    })

    await t.test('should say `1` is a cont code', async function () {
      assert.ok(cont('1'.codePointAt(0)))
    })

    await t.test('should not say `-` is a cont code', async function () {
      assert.ok(!cont('-'.codePointAt(0)))
    })

    await t.test('should say `ಠ` is a cont code', async function () {
      assert.ok(cont('ಠ'.codePointAt(0)))
    })

    await t.test(
      'should say `0xd8_00 0xde_a7` (together 0x1_02_a7) is a cont code',
      async function () {
        assert.ok(cont(0x1_02_a7))
      }
    )

    await t.test('should not say `0xd8_00` is a cont code', async function () {
      assert.ok(!cont(0xd8_00))
    })

    await t.test(
      'should not say `-` is a cont code normally',
      async function () {
        assert.ok(!cont('-'.codePointAt(0)))
      }
    )

    await t.test(
      'should say `-` is a cont code w/ `jsx: true`',
      async function () {
        assert.ok(cont('-'.codePointAt(0), {jsx: true}))
      }
    )
  })

  await t.test('name', async function (t) {
    await t.test(
      'should not say `` (empty string) is a name',
      async function () {
        assert.ok(!name(''))
      }
    )

    await t.test('should say `a` is a name', async function () {
      assert.ok(name('a'))
    })

    await t.test('should say `_` is a name', async function () {
      assert.ok(name('_'))
    })

    await t.test('should not say `1` is a name', async function () {
      assert.ok(!name('1'))
    })

    await t.test('should not say `-` is a name', async function () {
      assert.ok(!name('-'))
    })

    await t.test('should say `a1` is a name', async function () {
      assert.ok(name('a1'))
    })

    await t.test('should not say `a-b` is a name', async function () {
      assert.ok(!name('a-b'))
    })

    await t.test('should say `_a$b9` is a name', async function () {
      assert.ok(name('_a$b9'))
    })

    await t.test('should not say `aaa-` is a name', async function () {
      assert.ok(!name('aaa-'))
    })

    await t.test('should not say `-aaa` is a name', async function () {
      assert.ok(!name('-aaa'))
    })

    await t.test('should say `ಠ_ಠ` is a name', async function () {
      assert.ok(name('ಠ_ಠ'))
    })

    await t.test('should say `𐊧` (0x1_02_a7) is a name', async function () {
      assert.ok(name('𐊧'))
    })

    await t.test('should not say `a-b` is a name normally', async function () {
      assert.ok(!name('a-b'))
    })

    await t.test('should say `a-b` is a jsx name', async function () {
      assert.ok(name('a-b', {jsx: true}))
    })

    await t.test('should say `a-` is a jsx name', async function () {
      assert.ok(name('a-', {jsx: true}))
    })
  })

  await t.test('start', async function (t) {
    await t.test(
      'should not say `undefined` is a start code',
      async function () {
        assert.ok(!start(''.codePointAt(0)))
      }
    )

    await t.test('should say `a` is a start code', async function () {
      assert.ok(start('a'.codePointAt(0)))
    })

    await t.test('should say `_` is a start code', async function () {
      assert.ok(start('_'.codePointAt(0)))
    })

    await t.test('should not say `1` is a start code', async function () {
      assert.ok(!start('1'.codePointAt(0)))
    })

    await t.test('should not say `-` is a start code', async function () {
      assert.ok(!start('-'.codePointAt(0)))
    })

    await t.test('should say `ಠ` is a start code', async function () {
      assert.ok(start('ಠ'.codePointAt(0)))
    })

    await t.test(
      'should say `0xd8_00 0xde_a7` (together 0x1_02_a7) is a start code',
      async function () {
        assert.ok(start(0x1_02_a7))
      }
    )

    await t.test('should not say `0xd8_00` is a start code', async function () {
      assert.ok(!start(0xd8_00))
    })
  })
})
