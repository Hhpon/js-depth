// 硬币找零 回溯算法

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (amount === 0) return 0
  let minCount = -1
  const mem = new Array(amount + 1)
  for (let i = 0; i < mem.length; i++) {
    mem[i] = new Array()
  }
  console.log(mem)
  function f(curAmount, count) {
    if (curAmount == 0) {
      if (minCount == -1 || count < minCount) {
        console.log(count)
        minCount = count
      }
      return
    }
    for (let i = 0; i < coins.length; i++) {
      if (curAmount - coins[i] >= 0) {
        if (mem[curAmount - coins[i]][count + 1]) return
        mem[curAmount - coins[i]][count + 1] = 1
        f(curAmount - coins[i], count + 1)
      }
    }
  }
  f(amount, 0)
  console.log(mem)
  console.log(minCount)
  return minCount
};

coinChange([1, 2, 5], 11)