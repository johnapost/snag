const test = require('ava')
const multiply = require('../lib/multiply')

test('Can multiply numbers', (t) => {
  t.is(multiply(10), 20)
})

test('Throws when you try to multiply non-number value', (t) => {
  t.throws(() => multiply('ohai!'), 'Only numbers can be multiplied!')
})
