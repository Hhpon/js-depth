function defaultEquals(a, b) {
  return a === b
}

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
}

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
}

function defaultCompare(a, b) {
  if (a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

module.exports = { defaultEquals, Compare, defaultCompare, BalanceFactor }
