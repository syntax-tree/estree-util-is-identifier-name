const startRe = /[$_\p{ID_Start}]/u
const contRe = /[$_\u{200C}\u{200D}\p{ID_Continue}]/u
const re = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u

/**
 * Checks if the given character code can start an identifier.
 *
 * @param {number} code
 *   Character code to check.
 * @returns {boolean}
 *   Whether `code` can start an identifier.
 */
// To do: support astrals.
export function start(code) {
  return startRe.test(String.fromCharCode(code))
}

/**
 * Checks if the given character code can continue an identifier.
 *
 * @param {number} code
 *   Character code to check.
 * @returns {boolean}
 *   Whether `code` can continue an identifier.
 */
// To do: support astrals.
export function cont(code) {
  return contRe.test(String.fromCharCode(code))
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
