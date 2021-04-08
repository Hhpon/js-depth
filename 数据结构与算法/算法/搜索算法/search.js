const quickSort = require("../排序算法/quick-sort")
const { defaultEquals, defaultCompare, Compare, defaultDiff } = require("./utils")

const DOES_NOT_EXIST = -1

function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) {
    if (equalsFn(array[i], value)) {
      return i
    }
  }
  return DOES_NOT_EXIST
}

function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array)
  let low = 0
  let high = array.length - 1
  while (lesserOrEquals(low, high, compareFn)) {
    let mid = Math.floor((low + high) / 2)
    let element = sortedArray[mid]
    if (compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1
    } else if (compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1
    } else {
      return mid
    }
  }
}

function lesserOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b)
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

function biggerOrEquals(a, b, compareFn) {
  const comp = compareFn(a, b)
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS
}

function interpolationSearch(array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) {
  let low = 0
  let high = array.length - 1
  let position = -1
  let delta = -1
  while (
    lesserOrEquals(low, high, compareFn) &&
    biggerOrEquals(array[high], value, compareFn) &&
    lesserOrEquals(array[low], value, compareFn)
  ) {
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low])
    position = low + Math.floor(delta * (high - low))
    if (equalsFn(array[position], value)) {
      return position
    }
    if (compareFn(array[position], value) === Compare.BIGGER_THAN) {
      high = position - 1
    } else if (compareFn(array[position], value) === Compare.LESS_THAN) {
      low = position + 1
    }
  }
  return DOES_NOT_EXIST
}

console.log(binarySearch([0, 1, 2, 3, 4], 1))
console.log(interpolationSearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4))
