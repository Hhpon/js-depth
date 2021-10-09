// 一个背包 总容量 w = 9 n = 5 weight = [2, 2, 4, 6, 3] maxWeight = 0
// 回溯算法

const w = 9
const n = 5
const weight = [2, 2, 4, 6, 3]
let maxWeight = 0
const resStore = []

for (let i = 0; i < w; i++) {
  resStore.push([])
}

function f(i, cw) {
  if (resStore[i][cw]) return
  resStore[i][cw] = true
  if (i === n || cw <= w) {
    if (maxWeight < w) maxWeight = w
    return
  }
  f(i + 1, cw)
  if (cw + weight[i] < w) f(i + 1, cw + weight[i])
}

f(0, 0)
console.log(maxWeight)