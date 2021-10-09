// 

let minDist
const n = 3
const w = [
  [1, 3, 5, 9],
  [2, 1, 3, 4],
  [5, 2, 6, 7],
  [6, 8, 4, 3]
]

function f(i, j, dist) {
  if (i === n && j === n) {
    console.log(i,j,dist)
    if (minDist == undefined || minDist > dist) minDist = dist
    return
  }
  if (i + 1 <= n) {
    f(i + 1, j, dist + w[i][j])
  }
  if (j + 1 <= n) {
    f(i, j + 1, dist + w[i][j])
  }
}
f(0, 0, 0)
console.log(minDist)