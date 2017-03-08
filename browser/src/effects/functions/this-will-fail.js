import { blowUp } from '../actions';

function * thisWillFail () {
  yield blowUp()
}

module.exports = {
  thisWillFail
}
