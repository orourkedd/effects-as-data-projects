const { success, failure } = require('effects-as-data')
const actions = require('../actions')
const { writeContent } = require('./write-content')
const { testIt } = require('effects-as-data/test')

const testWriteContent = testIt(writeContent)

test('writeContent() should write body.content to file', testWriteContent(() => {
  const body = { content: 'foo' }
  const res = {
    body: {
      success: true
    }
  }

  return [
    [{ body }, actions.writeFile('content.txt', 'foo', { encoding: 'utf8' })],
    [success(), res]
  ]
}))

test('writeContent() should return write failure', testWriteContent(() => {
  const body = { content: 'foo' }

  return [
    [{ body }, actions.writeFile('content.txt', 'foo', { encoding: 'utf8' })],
    [failure(), failure()]
  ]
}))
