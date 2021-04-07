class Compare {
  static LESS_THAN = "LESS_THAN"
  static BIGGER_THAN = "BIGGER_THAN"
  static EQUALS = "EQUALS"
}

function defaultCompare(a, b) {
  if (a < b) {
    return Compare.LESS_THAN
  } else if (a > b) {
    return Compare.BIGGER_THAN
  } else {
    return Compare.EQUALS
  }
}

function swap(array, a, b) {
  ;[array[a], array[b]] = [array[b], array[a]]
}

function defaultEquals(a, b) {
  return a === b
}

function defaultDiff(a, b) {
  return a - b
}

module.exports = { Compare, defaultCompare, swap, defaultEquals, defaultDiff }
