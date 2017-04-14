const actions = require('../actions')

function * readContent () {
  //  @see https://github.com/orourkedd/effects-as-data#readfile
  return yield actions.readFile('content.txt', { encoding: 'utf8' })
}

module.exports = {
  readContent
}
