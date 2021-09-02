
/**
 * 
 * @param {any[]} arr 
 * 
 * 功能: 快速排序
 * 边界: 数组长度小于1 数组为空/数组只有一个值
 * 终止: 元素个数为一或者零
 * 时间复杂度: O(nlogn)
 * 空间复杂度: 
 */
function quickSort(arr) {
  if (arr.length > 1) {
    quick(arr, 0, arr.length - 1)
  }
  console.log(arr)
}

function quick(arr, p, r) {
  const index = partition(arr, p, r)
  if (index - 1 > p) {
    quick(p, index - 1)
  }
  if (index + 1 < r) {
    quick(index + 1, r)
  }
}

function partition(arr, p, r) {
  const pivot = arr[r]
  let i = p
  for (let j = p; j < r - 1; j++) {
    if (pivot > arr[j]) {
      swap(arr, i, j)
      i++
    }
  }
  swap(arr, i, r)
  return i
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

quickSort([3, 1, 1])