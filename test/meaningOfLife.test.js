const test = require('ava')
const meaningOfLife = require('../lib/meaningOfLife')

test('Real meaning of life', (t) => {
  t.is(meaningOfLife(), 42)
})
