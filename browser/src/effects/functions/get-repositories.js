import actions from '../actions';
import { isFailure } from 'effects-as-data';

function * getRepositories (username) {
  yield actions.setState('loading', true);
  const repos = yield actions.httpGet(`/users/${username}/repos`);
  if (isFailure(repos)) {
    const a1 = actions.setState('loading', false);
    const a2 = actions.setState('failed', true);
    return yield [a1, a2];
  }
  yield actions.setState('loading', false);
  yield actions.setState('repos', repos.payload);
}

module.exports = {
  getRepositories
}
