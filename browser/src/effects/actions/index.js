import http from 'effects-as-data-http';
import { mergeAll } from 'ramda';

function setState (payload) {
  return {
    type: 'setState',
    payload
  }
}

function getLocal (key) {
  return {
    type: 'getLocal',
    key
  }
}

function setLocal (key, value) {
  return {
    type: 'setLocal',
    key,
    value
  }
}

function clearLocal (key) {
  return {
    type: 'clearLocal',
    key
  }
}

function blowUp (key) {
  return {
    type: 'blowUp'
  }
}

module.exports = mergeAll([http.actions, { getLocal, setLocal, clearLocal, blowUp }, { setState }]);
