export function setState (setter) {
  return function ({ key, payload }) {
    setter(key, payload)
  }
}
