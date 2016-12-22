const test = require('ava')
const awesomeModule = require('../index')

test('Works nicely together', (t) => {
  t.is(awesomeModule(), 84)
})
