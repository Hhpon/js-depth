/**
 * 最小硬币找零问题
 *
 * @param {number[]} coins
 * @param {number} amount
 */
function minCoinChange(coins, amount) {
  const cache = []
  const makeChange = (value) => {
    if (!value) {
      return []
    }
    if (cache[value]) {
      return cache[value]
    }
    let min = []
    let newMin = 0
    for (let i = 0; i < coins.length; i++) {
      if (coins[i] > value) {
        continue
      } else if (coins[i] === value) {
        min = [coins[i]]
        newMin = min.length
      } else {
        const dp = [coins[i]].concat(makeChange(value - coins[i]))
        if (newMin === 0 || dp.length < newMin) {
          newMin = dp.length
          min = dp
        }
      }
    }
    return (cache[value] = min)
  }
  return makeChange(amount)
}

console.log(minCoinChange([1, 3, 4], 12))
