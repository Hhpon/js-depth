/**
 *
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number[]}
 */
function minCoinChange(coins, amount) {
  if (amount <= 0) {
    return []
  }
  let min = [],
    newMin = [],
    newAmount
  for (let i = 0; i < coins.length; i++) {
    newAmount = amount - coins[i]
    if (newAmount >= 0) {
      newMin = minCoinChange(coins, newAmount)
    }
    if (newAmount >= 0 && (newMin.length < min.length || !min.length) && (newMin.length || !newAmount)) {
      min = [coins[i]].concat(newMin)
    }
  }
  return min
}

console.log(minCoinChange([1, 3, 4], 12))

/**
 * 更加高效一点
 * @param {number[]} coins
 * @param {number} amount
 * @returns
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}
