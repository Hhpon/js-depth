let maxValue = 0
const weight = [2, 2, 4, 6, 3]
const value = [3, 4, 8, 9, 6]
const n = weight.length
const w = 9

function f() {
  const states = new Array(n)
  for (let i = 0; i < states.length; i++) {
    states[i] = new Array(w + 1).fill(-1)
  }
  states[0][0] = 0
  if (weight[0] <= w) {
    states[0][weight[0]] = value[0]
  }
  for (let i = 1; i < states.length; i++) {
    for (let j = 0; j < states[i].length; j++) {
      if (states[i - 1][j] > -1) {
        states[i][j] = Math.max(states[i][j], states[i - 1][j])
        if (j + weight[i] <= w) { states[i][j + weight[i]] = Math.max(states[i][j + weight[i]], states[i - 1][j] + value[i]) }
      }
    }
  }
  for (let i = 0; i < states[n - 1].length; i++) {
    maxValue = states[n - 1][i]
  }
  console.log(states)
}

f()
console.log(maxValue)