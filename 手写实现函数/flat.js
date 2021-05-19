// 任意维度的数组 转换成 1维 的数组

const a = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [1, [2, 3, 4]],
]

/**
 *
 * @param {any[]} array
 * @returns
 */
function flat(array) {
  const result = []

  let ele
  for (let i = 0; i < array.length; i++) {
    ele = array[i]
    if (!Array.isArray(ele)) {
      result.push(ele)
      continue
    }
    result.push(...flat(ele))
  }

  return result
}

console.log(flat(a))
