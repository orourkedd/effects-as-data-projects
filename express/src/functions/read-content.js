const actions = require('../actions')

function * readContent () {
  return yield actions.readFile('content.txt', { encoding: 'utf8' })
}

module.exports = {
  readContent
}
