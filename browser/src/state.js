import { merge } from 'ramda';

//  Poor mans state container
let state = {};

//  Re-render app whenever setState() is called
export function initSetState (render) {
  return function (payload) {
    state = merge(state, payload);
    render(getState, initSetState(render));
  }
}

export function getState () {
  return state;
}
