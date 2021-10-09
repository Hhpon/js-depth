// 动态规划 降低空间复杂度 二维数组转一维数组

const w = 9
const n = 5
const weight = [2, 2, 4, 6, 3]
let maxWeight = 0
const resStore = new Array(w + 1)

resStore[0] = true
if (weight[0] <= w) resStore[weight[0]] = true

function f() {

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < w + 1; j++) {
      if (resStore[j]) {
        if (j + weight[i] <= w) {
          resStore[j + weight[i]] = true
        }
      }
    }
  }

  for (let i = 0; i < w + 1; i++) {
    if (resStore[i]) {
      maxWeight = i
    }
  }
}

f()
console.log(maxWeight)