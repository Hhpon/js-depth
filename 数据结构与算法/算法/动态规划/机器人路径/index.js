/**
 * 
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。
 * 一个机器人从坐标 [0, 0] 的格子开始移动，
 * 它每次可以向左、右、上、下移动一格（不能移动到方格外），
 * 也不能进入行坐标和列坐标的数位之和大于k的格子。
 * 例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。
 * 但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？
 * 
 * @param {*} m 
 * @param {*} n 
 * @param {*} k 
 * @returns 
 */

var movingCount = function (m, n, k) {
  let result = 0
  for (let i = 0; i < m; i++) {
    let canAvailabel = false
    for (let j = 0; j < n; j++) {
      if (sum(i) + sum(j) <= k) {
        console.log(i, j, sum(i) + sum(j))
        result++
        canAvailabel = true
      }
    }
    if (!canAvailabel) {
      break
    }
  }
  return result
};

function sum(x) {
  let result = 0
  while (x != 0) {
    result += x % 10
    x = Math.floor(x / 10)
  }
  return result
}

console.log(movingCount(20, 20, 9));