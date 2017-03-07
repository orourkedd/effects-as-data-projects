import http from 'effects-as-data-http';
import { mergeAll } from 'ramda';

function setState (key, payload) {
  return {
    type: 'setState',
    key,
    payload
  }
}

export default mergeAll([http.actions, { setState }]);
