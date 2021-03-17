class Compare {
  static LESS_THAN = "less"
  static BIGGER_THAN = "big"
}

function mergeSort(array, compareFn) {
  if (array.leng > 1) {
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
    result.push(compareFn(left[i], right[i]) === Compare.LESS_THAN ? left[i++] : right[i++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

// function merge(left, right) {
//   let arr = []
//   // 如果任何一个数组为空，就退出循环
//   while (left.length && right.length) {
//     // 从左右子数组的最小元素中选择较小的元素
//     if (left[0] < right[0]) {
//       arr.push(left.shift())
//     } else {
//       arr.push(right.shift())
//     }
//   }

//   // 连接剩余的元素，防止没有把两个数组遍历完整
//   return [...arr, ...left, ...right]
// }

function compareFn() {
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

const array = [8, 7, 6, 5, 4, 3, 2, 1]

console.log(mergeSort(array, compareFn))
