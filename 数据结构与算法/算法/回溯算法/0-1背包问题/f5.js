// 增加了价值选项 尝试找到最大的价值 
// 动态规划

const w = 9
const n = 5
const weight = [2, 2, 4, 6, 3]
const value = [3, 4, 8, 9, 6]
let maxValue = 0
const resStore = new Array(w + 1).fill(-1)

resStore[0] = 0
if (weight[0] <= w) resStore[weight[0]] = value[0]

function f() {
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (resStore[j] > -1) {
        if (j + weight[i] <= w) {
          resStore[j + weight[i]] = resStore[j] + value[i]
        }
      }
    }
  }
  for (let i = 0; i < resStore.length; i++) {
    if (maxValue < resStore[i]) maxValue = resStore[i]
  }
}

f()

console.log(resStore)
console.log(maxValue)