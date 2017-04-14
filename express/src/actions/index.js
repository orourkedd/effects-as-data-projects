const { actions } = require('effects-as-data/node')

//  effects-as-data has several built-in actions/handlers making
//  it easy to perform and test complex, side effect producing operations:
//  @see https://github.com/orourkedd/effects-as-data#actions-packaged-with-effects-as-data

//  You can add your own actions here by
//  merging them into the actions object.  Actions
//  will require a corresponding handler (@see /handlers).
//  Action creating functions return JSON objects that
//  describe side effects; handlers accept these actions
//  and perfom the described side effect.

module.exports = actions
