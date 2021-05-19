const { defaultCompare, Compare } = require("./utils")

/**
 *
 * @param {number[]} array
 */
function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) {
    const mid = Math.floor(array.length / 2)
    const left = mergeSort(array.slice(0, mid))
    const right = mergeSort(array.slice(mid))
    array = merge(left, right, compareFn)
  }
  return array
}

function merge(left, right, compareFn) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

const array = [3, 5, 1, 6, 4, 7, 2]

console.log(mergeSort(array))
