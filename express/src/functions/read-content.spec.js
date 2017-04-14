const { success } = require('effects-as-data')
const actions = require('../actions')
const { readContent } = require('./read-content')
const { testIt } = require('effects-as-data/test')

const testReadContent = testIt(readContent)

test('readContent() should return contents of file', testReadContent(() => {
  return [
    [null, actions.readFile('content.txt', { encoding: 'utf8' })],
    [success('the file contents'), success('the file contents')]
  ]
}))
