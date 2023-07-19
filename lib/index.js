const startRe = /[$_\p{ID_Start}]/u
const contRe = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u
const re = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u

/**
 * Checks if the given code point can start an identifier.
 *
 * @param {number | undefined} code
 *   Code point to check.
 * @returns {boolean}
 *   Whether `code` can start an identifier.
 */
// Note: `undefined` is supported so you can pass the result from `''.codePointAt`.
export function start(code) {
  return code ? startRe.test(String.fromCodePoint(code)) : false
}

/**
 * Checks if the given code point can continue an identifier.
 *
 * @param {number | undefined} code
 *   Code point to check.
 * @returns {boolean}
 *   Whether `code` can continue an identifier.
 */
// Note: `undefined` is supported so you can pass the result from `''.codePointAt`.
export function cont(code) {
  return code ? contRe.test(String.fromCodePoint(code)) : false
}

/**
 * Checks if the given value is a valid identifier name.
 *
 * @param {string} name
 *   Identifier to check.
 * @returns {boolean}
 *   Whether `name` can be an identifier.
 */
export function name(name) {
  return re.test(name)
}
