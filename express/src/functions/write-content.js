const actions = require('../actions')
const { success, isFailure } = require('effects-as-data')

//  @see https://github.com/orourkedd/effects-as-data#writefile
function * writeContent ({ body }) {
  const writeResult = yield actions.writeFile('content.txt', body.content, { encoding: 'utf8' })
  if (isFailure(writeResult)) return writeResult
  return {
    body: {
      success: true
    }
  }
}

module.exports = {
  writeContent
}
