const actions = require('../actions')
const { success, isFailure } = require('effects-as-data')

function * zen () {
  //  Check the in-memory cache for some zen
  //  @see https://github.com/orourkedd/effects-as-data#getstate
  const cachedZen = yield actions.getState(['zen'])
  if (cachedZen.payload.zen) return { body: cachedZen.payload.zen }

  //  Get some zen
  //  @see https://github.com/orourkedd/effects-as-data#httpget
  const zen = yield actions.httpGet('https://api.github.com/zen')
  if (isFailure(zen)) return zen

  //  Write to in-memory cache
  //  If this fails, we still want to return "zen".  effects-as-data will
  //  automatically handle this failure so it doesn't need to be handled here.
  //  @see https://github.com/orourkedd/effects-as-data#setstate
  yield actions.setState({
    zen: zen.payload
  })

  return {
    body: zen.payload
  }
}

module.exports = {
  zen
}
