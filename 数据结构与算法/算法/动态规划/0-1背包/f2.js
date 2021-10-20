let maxWeight = 0
const weight = [2, 2, 4, 6, 3]
const n = weight.length
const w = 9

function f() {
  const states = new Array(n)
  for (let i = 0; i < states.length; i++) {
    states[i] = new Array(w + 1).fill(0)
  }
  states[0][0] = 1
  if (weight[0] <= w) {
    states[0][weight[0]] = 1
  }
  for (let i = 1; i < states.length; i++) {
    for (let j = 0; j < states[i].length; j++) {
      if (states[i - 1][j] === 1) {
        states[i][j] = states[i - 1][j]
        if (j + weight[i] <= w) {
          states[i][j + weight[i]] = 1
        }
      }
    }
  }
  for (let i = 0; i < states[n - 1].length; i++) {
    if (states[n - 1][i] === 1) {
      maxWeight = i
    }
  }
}

f()
console.log(maxWeight)
