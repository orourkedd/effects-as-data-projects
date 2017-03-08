export function setState (setter) {
  return function ({ payload }) {
    setter(payload)
  }
}
