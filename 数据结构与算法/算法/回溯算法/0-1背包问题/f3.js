// 增加了价值选项 尝试找到最大的价值 
// 回溯算法

const w = 9
const n = 5
const weight = [2, 2, 4, 6, 3]
const value = [3, 4, 8, 9, 6]
let maxValue = 0

function f(i, cw, cv) {
  if (i === n || cw === w) {
    if (cv > maxValue) maxValue = cv
    return
  }
  f(i + 1, cw, cv)
  if (cw + weight[i] <= w) f(i + 1, cw + weight[i], cv + value[i])
}

f(0, 0, 0)
console.log(maxValue)