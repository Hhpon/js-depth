// 有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21。
// 链接：https://leetcode-cn.com/problems/get-kth-magic-number-lcci

/**
 * @param {number} k
 * @return {number}
 */
var getKthMagicNumber = function (k) {
  const num1 = 3
  const num2 = 5
  const num3 = 7
  const queue = []
  queue[0] = 1
  for (let i = 0; i < k; i++) {
    // queue.push()
    console.log(num1 * num1 * i + num2 * num2 * i + num3 * num3 * i)
  }
}

getKthMagicNumber(5)
