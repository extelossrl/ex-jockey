module.exports = function(fn, de) {
  try {
    return fn()
  } catch {
    return de
  }
}
