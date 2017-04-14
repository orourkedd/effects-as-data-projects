const { success, failure } = require('effects-as-data')
const actions = require('../actions')
const { zen } = require('./zen')
const { testIt } = require('effects-as-data/test')

const testZen = testIt(zen)

test('zen() should return zen from the cache', testZen(() => {
  return [
    [null, actions.getState(['zen'])],
    [{ zen: 'foo' }, { body: 'foo' }]
  ]
}))

test('zen() should cache miss, get zen from github, save to cache, and return', testZen(() => {
  return [
    [null, actions.getState(['zen'])],
    [{ zen: null }, actions.httpGet('https://api.github.com/zen')],
    ['foo', actions.setState({ zen: 'foo' })],
    [null, { body: 'foo' }]
  ]
}))

test('zen() should return http GET failure', testZen(() => {
  return [
    [null, actions.getState(['zen'])],
    [{ zen: null }, actions.httpGet('https://api.github.com/zen')],
    [failure('oops'), failure('oops')]
  ]
}))
