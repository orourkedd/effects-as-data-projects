import { setState, getLocal, setLocal, httpGet } from '../actions';
import { isFailure, success, failure } from 'effects-as-data';

function * getRepositories (username) {
  //  Do some validation
  if (!username) {
    const f = failure('username is required.');
    yield setState(failureState(f));
    return f;
  }
  //  Check local cache for repos
  const cached = yield getLocal(`${username}:repos`)

  //  If repos in cache, set state
  if (cached.payload) return yield setState(successState(cached.payload));

  //  Show loading message
  yield setState(loadingState());

  //  Get repos from Github API
  const repos = yield httpGet(`/users/${username}/repos`);

  //  Handle failure, show failure message
  if (isFailure(repos)) {
    yield setState(failureState(repos));
    return repos;
  }

  //  Set the repos on the state
  yield setState(successState(repos.payload));

  //  Cache the repos in local storage
  yield setLocal(`${username}:repos`, repos.payload);

  //  Return success by convention (not required)
  return success();
}

function loadingState () {
  return { repos: [], loading: true, failure: false };
}

function successState (repos) {
  return { repos, loading: false, failure: false };
}

function failureState (failure) {
  return { repos: [], loading: false, failure };
}

module.exports = {
  getRepositories
}
