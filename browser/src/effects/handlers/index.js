import http from 'effects-as-data-http';
import { setState } from './set-state';
import { mergeAll } from 'ramda';
import { getLocal, setLocal, clearLocal } from './store';

function blowUp () {
  throw new Error('This handler blew up.')
}

export default (stateSetter) => {
  return mergeAll([http.handlers, { getLocal, setLocal, clearLocal, blowUp }, {
    setState: setState(stateSetter)
  }]);
};
