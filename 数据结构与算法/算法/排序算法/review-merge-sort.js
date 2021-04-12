/**
 *
 * @param {number[]} array
 */
function mergeSort(array) {
  if (array.length > 1) {
    const mid = Math.floor(array.length / 2)
    const left = mergeSort(array.slice(0, mid))
    const right = mergeSort(array.slice(mid))
    array = merge(left, right)
  }
  return array
}

/**
 *
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number[]}
 */
function merge(left, right) {
  let i = 0,
    j = 0
  const result = []
  while (i < left.length && j < right.length) {
    result.push(left[i] > right[j] ? right[j++] : left[i++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

const array = [3, 5, 1, 6, 4, 7, 2]
console.log(mergeSort(array))
