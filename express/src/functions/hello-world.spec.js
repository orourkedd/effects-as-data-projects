const { success } = require('effects-as-data')
const actions = require('../actions')
const { helloWorld } = require('./hello-world')
const { testIt } = require('effects-as-data/test')

const testHelloWorld = testIt(helloWorld)

test('helloWorld() should "Hello World"', testHelloWorld(() => {
  return [
    [null, { body: 'Hello World' }]
  ]
}))
