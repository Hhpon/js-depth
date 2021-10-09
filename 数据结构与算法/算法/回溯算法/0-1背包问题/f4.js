// 增加了价值选项 尝试找到最大的价值 
// 动态规划

const w = 9
const n = 5
const weight = [2, 2, 4, 6, 3]
const value = [3, 4, 8, 9, 6]
let maxValue = 0
const resStore = new Array(n).fill(new Array(w + 1).fill(-1))

resStore[0][0] = 0

if (weight[0] <= w) resStore[0][weight[0]] = value[0]

function f() {
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (resStore[i - 1][j] > -1) {
        resStore[i][j] = resStore[i - 1][j]
        if (j + weight[i] <= w) {
          resStore[i][j + weight[i]] = resStore[i - 1][j] + value[i]
        }
      }
    }
  }

  for(let i = 0; i <= w; i++) {
    if (resStore[n-1][i] > maxValue) maxValue = resStore[n-1][i]
  }
}

f()
console.log(resStore)
console.log(maxValue)