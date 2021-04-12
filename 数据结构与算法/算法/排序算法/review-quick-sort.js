const { swap } = require("./utils")

function quickSort(array) {
  return quick(array, 0, array.length - 1)
}

/**
 *
 * @param {any[]} array
 * @param {number} left
 * @param {number} right
 */
function quick(array, left, right) {
  if (array.length > 1) {
    const index = partition(array, left, right)
    if (left < index - 1) {
      quick(array, left, index - 1)
    }
    if (right > index) {
      quick(array, index, right)
    }
  }
  return array
}

function partition(array, left, right) {
  let i = left,
    j = right
  const pivot = array[Math.floor((left + right) / 2)]
  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
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

const array = [3, 5, 1, 6, 4, 7, 2]
console.log(quickSort(array))
