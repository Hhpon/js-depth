/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
  quickSort(arr)
  return arr.slice(0, k)
};

function quickSort(arr) {
  quick(arr, 0, arr.length - 1)
}

function quick(arr, left, right) {
  if (arr.length > 1) {
    const index = partition(arr, left, right)
    if (index - 1 > left) {
      quick(arr, left, index - 1)
    }
    if (index < right) {
      quick(arr, index, right)
    }
  }
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)]
  let i = left
  let j = right

  while (i <= j) {
    while (arr[i] < pivot) {
      i++
    }
    while (arr[j] > pivot) {
      j--
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }
  return i
}

getLeastNumbers([3, 2, 1], 2)