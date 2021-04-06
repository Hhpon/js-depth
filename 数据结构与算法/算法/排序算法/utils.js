class Compare {
  static LESS_THAN = "LESS_THAN"
  static BIGGER_THAN = "BIGGER_THAN"
}

function defaultCompare(a, b) {
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

function swap(array, a, b) {
  ;[array[a], array[b]] = [array[b], array[a]]
}

module.exports = { Compare, defaultCompare, swap }
