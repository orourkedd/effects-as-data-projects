import store from 'store';

export function getLocal ({ key }) {
  return store.get(key);
}

export function setLocal ({ key, value }) {
  return store.set(key, value);
}

export function clearLocal () {
  return store.clearAll()
}
