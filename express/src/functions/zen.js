const actions = require('../actions')
const { success, isFailure } = require('effects-as-data')

//  Get wisdom from github and cache for 5 seconds before you have to learn new wisdom

function * zen () {
  //  Check the in-memory cache for some zen.  Run these actions in parallel
  //  For actions.getState, @see https://github.com/orourkedd/effects-as-data#getstate
  //  For actions.now, @see https://github.com/orourkedd/effects-as-data#now
  const fiveSeconds = 1000 * 5
  const [now, state] = yield [actions.now(), actions.getState(['zen', 'time'])]
  //  @see https://github.com/orourkedd/simple-protocol for understanding `payload`
  const cacheIsFresh = now.payload - state.payload.time < fiveSeconds
  if (state.payload.zen && cacheIsFresh) {
    return { body: state.payload.zen }
  }

  //  Get some zen
  //  @see For actions.httpGet, https://github.com/orourkedd/effects-as-data#httpget
  const zen = yield actions.httpGet('https://api.github.com/zen')
  //  @see For isFailure, https://github.com/orourkedd/simple-protocol
  if (isFailure(zen)) return zen

  //  Write to in-memory cache
  //  If this fails, we still want to return "zen".  effects-as-data will
  //  automatically handle this failure so it doesn't need to be handled here.
  //  @see For handling failures automatically, https://github.com/orourkedd/effects-as-data#logging-action-failures
  //  @see For actions.setState, https://github.com/orourkedd/effects-as-data#setstate for the setState action
  yield actions.setState({
    zen: zen.payload,
    time: now.payload
  })

  return {
    body: zen.payload
  }
}

module.exports = {
  zen
}
