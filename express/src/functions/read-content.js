const actions = require('../actions')

//  @see https://github.com/orourkedd/effects-as-data#readfile
function * readContent () {
  return yield actions.readFile('content.txt', { encoding: 'utf8' })
}

module.exports = {
  readContent
}
