// 动态规划

const w = 9
const n = 5
const weight = [2, 2, 4, 6, 3]
let maxWeight = 0

const resStore = new Array(n).fill([])

resStore[0][0] = true
// resStore[0][weight[0]] = true  // 没有考虑weight[0]超过背包容量的情况

if(weight[0] <= w) resStore[0][weight[0]] = true

function f() {
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < w + 1; j++) {
      if (resStore[i - 1][j]) {
        resStore[i][j] = true
        if (j + weight[i] <= w) {
          resStore[i][j + weight[i]] = true
        }
      }
    }
  }
  for (let i = 0; i < w + 1; i++) {
    if (resStore[n - 1][i]) {
      maxWeight = i
    }
  }
}

f()
console.log(maxWeight)