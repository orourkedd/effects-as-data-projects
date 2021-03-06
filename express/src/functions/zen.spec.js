const { success, failure } = require('effects-as-data')
const actions = require('../actions')
const { zen } = require('./zen')
const { testIt } = require('effects-as-data/test')

const testZen = testIt(zen)

test('zen() should return zen from the cache if the cache is less than 5 seconds old', testZen(() => {
  const cacheTime = 1492180435000
  const now = cacheTime + 2 * 1000

  return [
    [null, [actions.now(), actions.getState(['zen', 'time'])]],
    [[now, { zen: 'foo', time: cacheTime }], { body: 'foo' }]
  ]
}))

test('zen() should cache miss if cache is empty', testZen(() => {
  const now = 1492180435000

  return [
    [null, [actions.now(), actions.getState(['zen', 'time'])]],
    [[now, { zen: null, time: null }], actions.httpGet('https://api.github.com/zen')],
    ['foo', actions.setState({ zen: 'foo', time: now })],
    [null, { body: 'foo' }]
  ]
}))

test('zen() should cache miss if cache is older than 5 seconds, get zen from github, save to cache, and return', testZen(() => {
  const cacheTime = 1492180435000
  const now = cacheTime + 10 * 1000

  return [
    [null, [actions.now(), actions.getState(['zen', 'time'])]],
    [[now, { zen: 'foo', time: cacheTime }], actions.httpGet('https://api.github.com/zen')],
    ['foo', actions.setState({ zen: 'foo', time: now })],
    [null, { body: 'foo' }]
  ]
}))

test('zen() should return http GET failure', testZen(() => {
  const now = 1492180435000

  return [
    [null, [actions.now(), actions.getState(['zen', 'time'])]],
    [[now, { zen: null, time: null }], actions.httpGet('https://api.github.com/zen')],
    [failure('oops'), failure('oops')]
  ]
}))
