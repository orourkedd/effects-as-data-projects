const { pick, toPairs, fromPairs, pipe, map } = require('ramda')
const { buildFunctions, isSuccess, isFailure } = require('effects-as-data')
const functions = require('./functions')
const handlers = require('./handlers')

//  Wrap effects-as-data functions in a "express wrapper".  This function
//  returns a route middle function that accepts the request, turns the request into
//  pure data, passes the data to the effects-as-data function, gets the result from
//  the function call, then converts that result in an express response.
function buildRoute (fn) {
  return function (req, res, next) {
    const requestAsData = pick([
      'body',
      'baseUrl',
      'body',
      'cookies',
      'fresh',
      'hostname',
      'ip',
      'ips',
      'method',
      'originalUrl',
      'params',
      'path',
      'protocol',
      'query',
      'route',
      'secure',
      'signedCookies',
      'stale',
      'subdomains',
      'xhr'
    ], req)

    fn(requestAsData)
    .then((result) => {
      //  what are these `success`es and `failure`s?
      //  @see https://github.com/orourkedd/simple-protocol
      //  Simple protocol makes working with errors the same as
      //  working with any other kind of data.  It is loosely
      //  inspired by go's handling of errors.
      if (isSuccess(result)) {
        res.send(result.payload)
      } else if (isFailure(result)) {
        res.status(result.status || 500)
        res.send(result.error)
      } else {
        res.status(result.status || 200)
        res.send(result.body)
      }
    })
    .catch((error) => {
      console.error(error)
      res.status(500)
      res.send(error)
    })
  }
}

//  Build the effects-as-data functions by converting them from pure generator functions to
//  promise-returning functions that can perform side effects.  Take these new functions
//  and turn them all into express middleware.
function buildRoutes () {
  const builtEffectsAsDataFunctions = buildFunctions(handlers, functions)
  const routes = pipe(
    toPairs,
    map(([key, fn]) => [key, buildRoute(fn)]),
    fromPairs
  )(builtEffectsAsDataFunctions)
  return routes
}

module.exports = {
  buildRoute,
  buildRoutes
}
