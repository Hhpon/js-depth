class Compare {
  static LESS_THAN = "LESS_THAN"
  static BIGGER_THAN = "BIGGER_THAN"
}

function compareFn(a, b) {
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

function mergeSort(array, compareFn) {
  if (array.length > 1) {
    const { length } = array
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle), compareFn)
    const right = mergeSort(array.slice(middle, length), compareFn)
    array = merge(left, right, compareFn)
  }
  return array
}

function merge(left, right, compareFn) {
  let i = 0
  let j = 0
  const result = []
  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[i]) === Compare.LESS_THAN ? left[i++] : right[j++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

const array = [8, 7, 6, 5, 4, 3, 2, 1]

console.log(mergeSort(array, compareFn))
