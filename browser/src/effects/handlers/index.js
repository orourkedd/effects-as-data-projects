import http from 'effects-as-data-http';
import { setState } from './set-state';
import { mergeAll } from 'ramda';

export default (stateSetter) => {
  return mergeAll([http.handlers, {
    setState: setState(stateSetter)
  }]);
};
