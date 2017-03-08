import { testIt } from 'effects-as-data/test';
import { getRepositories } from './get-repositories';
import { setState, getLocal, setLocal, httpGet } from '../actions';
import { success, failure } from 'effects-as-data';

const testGetRepositories = testIt(getRepositories);

describe('getRepositories()', () => {
  it('should get repositories from github and return a success', testGetRepositories(() => {
    const repos = [{ foo: 'bar' }];
    return [
      ['orourkedd', getLocal('orourkedd:repos')],
      [null, setState({ repos: [], loading: true, failure: false })],
      [null, httpGet(`/users/orourkedd/repos`)],
      [repos, setState({ repos, loading: false, failure: false })],
      [null, setLocal(`orourkedd:repos`, repos)],
      [null, success()]
    ];
  }));

  it('should handle falsey username', testGetRepositories(() => {
    const repos = [{ foo: 'bar' }];
    const theFailure = failure('username is required.');
    return [
      [null, setState({ repos: [], loading: false, failure: theFailure })],
      [null, theFailure]
    ];
  }));

  it('should set state from local cache and return a success', testGetRepositories(() => {
    const repos = [{ foo: 'bar' }];
    return [
      ['orourkedd', getLocal('orourkedd:repos')],
      [repos, setState({ repos, loading: false, failure: false })],
      [null, success()]
    ];
  }));

  it('should handle GET failure and return failure', testGetRepositories(() => {
    const repos = [{ foo: 'bar' }];
    return [
      ['orourkedd', getLocal('orourkedd:repos')],
      [null, setState({ repos: [], loading: true, failure: false })],
      [null, httpGet(`/users/orourkedd/repos`)],
      [failure('network error'), setState({ repos: [], loading: false, failure: failure('network error') })],
      [null, failure('network error')]
    ];
  }));
})
