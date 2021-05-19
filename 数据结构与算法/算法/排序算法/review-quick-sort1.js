/**
 *
 * @param {number[]} array
 */
function quickSort(array) {
  return quick(array, 0, array.length - 1)
}

/**
 *
 * @param {number[]} array
 * @param {number} left
 * @param {number} right
 */
function quick(array, left, right) {
  if (array.length > 1) {
    const index = partition(array, left, right)
    if (left < index - 1) {
      quick(array, left, index - 1)
    }
    if (index < right) {
      quick(array, index, right)
    }
  }
  return array
}

/**
 *
 * @param {number[]} array
 * @param {number} left
 * @param {number} right
 */
function partition(array, left, right) {
  const povit = array[Math.floor((left + right) / 2)]
  let i = left,
    j = right
  while (i <= j) {
    while (array[i] > povit) {
      i++
    }
    while (povit > array[j]) {
      j--
    }
    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

function swap(array, i, j) {
  ;[array[i], array[j]] = [array[j], array[i]]
}

console.log(quickSort([3, 5, 4, 1, 6, 2]))
