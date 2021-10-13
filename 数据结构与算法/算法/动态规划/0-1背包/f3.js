let maxValue = 0
const weight = [2, 2, 4, 6, 3]
const value = [3, 4, 8, 9, 6]
const n = weight.length
const w = 9

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
