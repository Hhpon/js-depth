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

console.log(mergeSort([8, 7, 6, 5, 4, 3, 2, 1]))
