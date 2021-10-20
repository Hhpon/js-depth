let maxWeight = 0
const weight = [2, 2, 4, 6, 3]
const n = weight.length
const w = 9

function f(i, cw) {
  if (i === n || cw === w) {
    if (cw > maxWeight) maxWeight = cw
    return
  }
  f(i + 1, cw)
  if (cw + weight[i] <= w) {
    f(i + 1, cw + weight[i])
  }
}

f(0,0)

console.log(maxWeight)